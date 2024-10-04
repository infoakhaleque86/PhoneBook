import { createContext, useEffect, useState } from "react";
import { AddCategory } from "./components/AddCategory";
import { TCategory } from "./typings";
import { getCategories } from "./api/getCategories";

type CategoryContextType = {
  categories: TCategory[] | null;
  setCategories: React.Dispatch<React.SetStateAction<TCategory[]>>;
};

const iCategoryContextState = {
  categories: null,
  setCategories: () => {},
};

export const Context = createContext<CategoryContextType>(
  iCategoryContextState
);

function App() {
  const [categories, setCategories] = useState<TCategory[]>([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const resCategories = await getCategories();
      setCategories(resCategories);
    };
    fetchCategory();
  }, []);

  return (
    <div className="">
      <Context.Provider value={{ categories, setCategories }}>
        <AddCategory />
      </Context.Provider>
      <div className="text-zinc-400 fixed text-sm text-center bottom-0 bg-gray-800 py-2 w-full">
        &copy; 2024 PhoneBook | Abdul Khalek
      </div>
    </div>
  );
}

export default App;
