import express, { Request, Response } from "express";
import { PhoneBookModel } from "../model/PhoneBook";

export const contactRoutes = express.Router();

contactRoutes.post(
  "/:categoryId/contact",
  async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    const { name, description, number } = req.body;
    const category = await PhoneBookModel.findByIdAndUpdate(
      { _id: categoryId },
      { $push: { contacts: { name, description, number } } },
      { new: true }
    );
    res.status(200).json(category);
  }
);

contactRoutes.delete(
  "/:categoryId/contact",
  async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    const { contactId } = req.body;

    const deletedContact = await PhoneBookModel.findByIdAndUpdate(
      { _id: categoryId },
      { $pull: { contacts: { _id: contactId } } },
      { safe: true, multi: false, new: true }
    );
    res.status(200).json(deletedContact);
  }
);

contactRoutes.put(
  "/:categoryId/contact/:contactId",
  async (req: Request, res: Response) => {
    const { categoryId, contactId } = req.params;
    const { name, description, number } = req.body;

    try {
      const updatedContact = await PhoneBookModel.findOneAndUpdate(
        { _id: categoryId, "contacts._id": contactId },
        { $set: { "contacts.$": { name, description, number } } },
        { new: true }
      );

      if (!updatedContact) {
        return res
          .status(404)
          .json({ message: "Category or contact not found." });
      }

      res.status(200).json(updatedContact);
    } catch (error) {
      res.status(500).json({ message: "Error updating contact.", error });
    }
  }
);
