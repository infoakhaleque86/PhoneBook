import { BASE_URL } from "../config";
import { TCategory } from "../typings";

export const deleteCategory = async (
  categoryId: string
): Promise<TCategory> => {
  const res = await fetch(`${BASE_URL}/category`, {
    method: "DELETE",
    body: JSON.stringify({ categoryId }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const deletedCategory = await res.json();
  return deletedCategory;
};
