import { FC, useEffect, useState, useRef } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { Category } from "../services/utils";

const CategoriesSelector: FC<{
  categories: Category[];
  categoryHandler: (category: Category) => void;
  isOpenHandler: (isOpen: boolean) => void;
}> = ({ categories, categoryHandler, isOpenHandler }) => {
  const [firstTime, setFirstTime] = useState(false);
  const [catsShow, setCatsShow] = useState(false);
  const [category, setCategory] = useState<Category>(categories[0]);

  const wrapperRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  useOnClickOutside(wrapperRef, () => {
    setCatsShow(false);
  });

  useEffect(() => {
    categoryHandler(category);
  }, [category]);

  useEffect(() => {
    isOpenHandler(catsShow);
  }, [catsShow]);

  return (
    <div className="flex flex-col" ref={wrapperRef}>
      <button
        id="dropdownDefault"
        data-dropdown-toggle="dropdown"
        className="uppercase w-32 md:w-44 text-white border border-grey-800 bg-cyan-800 hover:bg-cyan-700 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center justify-around"
        type="button"
        onClick={() => setCatsShow(!catsShow)}
      >
        {!firstTime && "Category"}
        {firstTime && category.name}
        <svg
          className="ml-2 w-4 h-4"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      <div
        id="dropdown"
        className={`${
          !catsShow && "hidden"
        } mt-2 z-10 w-32 md:w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 animate-Entering`}
      >
        <ul
          className="overflow-y-auto h-48 py-1 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefault"
        >
          {categories.map((item) => (
            <li
              onClick={() => {
                setCategory(item);
                if (!firstTime) {
                  setFirstTime(true);
                }
                setCatsShow(!catsShow);
              }}
              key={item.id}
              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoriesSelector;
