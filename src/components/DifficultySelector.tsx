import { FC, useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { Difficulty } from "../services/utils";

const DifficultySelector: FC<{
  difficultyHandler: (difficulty: Difficulty) => void;
  isOpenHandler: (isOpen: boolean) => void;
}> = ({ difficultyHandler, isOpenHandler }) => {
  const [firstTime, setFirstTime] = useState(false);
  const [difShow, setDifShow] = useState(false);
  const [difficulty, setDifficulty] = useState(Difficulty.EASY);

  const wrapperRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  useOnClickOutside(wrapperRef, () => {
    setDifShow(false);
  });

  useEffect(() => {
    difficultyHandler(difficulty);
  }, [difficulty]);

  useEffect(() => {
    isOpenHandler(difShow);
  }, [difShow]);
  return (
    <motion.div
      initial={{ x: -1000 }}
      animate={{
        x: 0,
        transition: { duration: 0.8 },
      }}
      className="flex flex-col"
      ref={wrapperRef}
    >
      <button
        id="dropdownDefault"
        data-dropdown-toggle="dropdown"
        className="uppercase w-32 md:w-44 text-white border border-grey-800 bg-cyan-800 hover:bg-cyan-700 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center justify-around"
        type="button"
        onClick={() => setDifShow(!difShow)}
      >
        {!firstTime && "Difficulty"}
        {firstTime && difficulty}
        <svg
          className="ml-2 w-4 h-4"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      <div
        id="dropdown"
        className={`${
          !difShow && "hidden"
        } mt-2 z-10 w-32 md:w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 animate-Entering`}
      >
        <ul
          className="py-1 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefault"
        >
          {Object.keys(Difficulty).map((key, index) => (
            <li
              key={key}
              onClick={() => {
                if (!firstTime) {
                  setFirstTime(true);
                }
                setDifficulty(Object.values(Difficulty)[index]);
                setDifShow(!difShow);
              }}
              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
            >
              {key}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default DifficultySelector;
