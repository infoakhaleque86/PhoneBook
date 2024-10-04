import { BASE_URL } from "../config";
import { TCategory } from "../typings";

export const updateTitle = async (
  title: string,
  categoryId: string
): Promise<TCategory> => {
  const updatedTitleRes = await fetch(`${BASE_URL}/category/${categoryId}`, {
    method: "PUT",
    body: JSON.stringify({ title }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const newTitle = await updatedTitleRes.json();
  return newTitle;
};
 