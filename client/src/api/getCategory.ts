import { BASE_URL } from "../config";
import { TCategory } from "../typings";

export const getCategory = async (categoryId : string) : Promise<TCategory>=> {
  const categoryRes = await fetch(`${BASE_URL}/category/${categoryId}`);
  const Category : TCategory = await categoryRes.json();
  return Category;
};
