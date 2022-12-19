import React, { PropsWithChildren } from "react";
import DifficultySelector from "./DifficultySelector";
import CategoriesSelector from "./CategoriesSelector";
import { Category, Difficulty } from "../services/utils";

type parameterType = {
  categories: Category[];
  difficultyHandler: (difficulty: Difficulty) => void;
  isDropdownOpenHandler: (isOpen: boolean) => void;
  categoryHandler: (category: Category) => void;
};

const OptionSelector: React.FC<parameterType> = ({
  difficultyHandler,
  isDropdownOpenHandler,
  categoryHandler,
  categories,
}) => {
  console.log("option selector build");
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
