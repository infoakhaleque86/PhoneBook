import { BASE_URL } from "../config";
import { TCategory } from "../typings";

export const editedContact = async (categoryId : unknown, contactId: string, name : string, description : string, number : string): Promise<TCategory> => {
  const res = await fetch(`${BASE_URL}/category/${categoryId}/contact/${contactId}`, {
    method: "PUT",
    body: JSON.stringify({ name, description, number }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const editedContact: TCategory = await res.json();
  return editedContact;
};
