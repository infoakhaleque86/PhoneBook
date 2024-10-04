import { BASE_URL } from "../config";

export const getCategories = async () => {
  const res = await fetch(`${BASE_URL}/category`);
  const resCategories = await res.json();
  return resCategories;
};
