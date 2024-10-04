import { FormEvent, useContext, useState } from "react";
import { Category } from "./Category";
import { Context } from "../App";
import { addCategory } from "../api/addCategory";

export const AddCategory = () => {
  const [category, setCategory] = useState("");
  //   const [categories, setCategories] = useState<TCategory[]>([]);
  const { categories, setCategories } = useContext(Context);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newCategory = await addCategory(category);
    setCategories([...categories!, newCategory]);
    setCategory("");
  };

  return (
    <div className="max-w-5xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="space-x-2 p-10 flex items-center flex-col"
      >
        <img
          className="h-20 w-20 mr-2 -rotate-12 "
          src="https://cdn-icons-png.flaticon.com/512/1687/1687024.png"
          alt="PhoneBook Image"
        />
        <h1 className="text-2xl text-white my-2 tracking-widest text-center">
          Contact Book
        </h1>

        <div className="space-x-2 ">
          <input
            type="text"
            placeholder="Add category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 rounded-lg outline-none focus:outline-yellow-500"
          />
          <button className="p-2 bg-orange-400 rounded-lg">AddCategory</button>
        </div>
      </form>
      <div className="grid grid-cols-4 gap-2">
        {categories?.map((category) => (
          <Category
            key={category._id}
            categoryId={category._id}
            category={category.category}
            contacts={category.contacts}
          />
        ))}
      </div>
    </div>
  );
};
