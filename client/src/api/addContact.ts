import { BASE_URL } from "../config";
import { TCategory } from "../typings";

export const addContact = async (categoryId : string, name : string, description : string, number : string): Promise<TCategory> => {
  const res = await fetch(`${BASE_URL}/category/${categoryId}/contact`, {
    method: "post",
    body: JSON.stringify({ name, description, number }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const newCategory: TCategory = await res.json();
  return newCategory;
};

