import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/dbConfig";
import { PhoneBookModel } from "./model/PhoneBook";
import { categoryRoutes } from "./Routes/categoryRoutes";
import { contactRoutes } from "./Routes/contactRoutes";
dotenv.config();
connectDb();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: `${process.env.VITE_URL}`,
    credentials: true,
  })
);

app.use("/category", categoryRoutes);
app.use("/category", contactRoutes);

app.listen(PORT, () => {
  console.log(`Server started successfully on port : ${PORT}`);
});
