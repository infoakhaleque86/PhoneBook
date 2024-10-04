import { FaUserAlt } from "react-icons/fa";
import { Contact, TCategory } from "../typings";
import { Link } from "react-router-dom";
import { FormEvent, useContext } from "react";
import { deleteCategory } from "../api/deleteCatrgory";
import { Context } from "../App";

type Props = {
  categoryId: string;
  category: string;
  contacts: Contact[];
};

export const Category = ({ categoryId, category, contacts }: Props) => {
  const { categories, setCategories } = useContext(Context);

  const handleDeleteCategory = async (e: FormEvent) => {
    e.preventDefault();
    const deletedCategory = await deleteCategory(categoryId);
    setCategories(
      categories?.filter(
        (category) => category._id !== deletedCategory._id
      ) as TCategory[]
    );
  };

  return (
    <div className="bg-transparent border p-2 flex flex-col space-y-4 rounded-lg">
      <h1 className="font-bold text-2xl text-yellow-500 text-center capitalize">
        {category}
      </h1>

      <div className="flex items-center space-x-2">
        <FaUserAlt />
        <p className="text-yellow-500">Contacts : {contacts.length}</p>
      </div>
      <form className="flex space-x-2 mt-auto">
        <Link
          className="p-2 bg-green-500 rounded-lg flex-1 text-center"
          to={`/category/${categoryId}`}
        >
          view
        </Link>
        <button
          onClick={handleDeleteCategory}
          className="p-2 bg-red-600 rounded-lg flex-1 text-white"
        >
          Delete
        </button>
      </form>
    </div>
  );
};
