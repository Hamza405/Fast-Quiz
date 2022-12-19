import React, { useContext } from "react";
import DifficultySelector from "./DifficultySelector";
import CategoriesSelector from "./CategoriesSelector";
import { contextType, AppContext } from "../store/AppContext";

const OptionSelector: React.FC = () => {
  const {
    categories,
    difficultyHandler,
    categoryHandler,
    isDropdownOpenHandler,
  } = useContext(AppContext) as contextType;

  return (
    <div className="mt-10 mb-4 flex justify-between w-[85%] sm:w-1/2 md:w-1/2 xl:w-1/3">
      <DifficultySelector
        difficultyHandler={difficultyHandler}
        isOpenHandler={isDropdownOpenHandler}
      />
      <CategoriesSelector
        categories={categories}
        categoryHandler={categoryHandler}
        isOpenHandler={isDropdownOpenHandler}
      />
    </div>
  );
};

export default OptionSelector;
