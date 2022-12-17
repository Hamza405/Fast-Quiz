import { FC } from "react";
import { motion } from "framer-motion";

const Button: FC<{
  buttonTitle: string;
  type: string;
  onClick: () => void;
  isDropDown: boolean;
}> = ({ buttonTitle, type, onClick, isDropDown }) => {
  return (
    <motion.div
      initial={
        type === "next"
          ? { y: "100px" }
          : type === "start"
          ? { scale: 0 }
          : { opacity: 0, scale: 1 }
      }
      animate={
        type === "next"
          ? { y: "0", transition: { duration: 0.3 } }
          : type === "start"
          ? {
              scale: 1,
              y: isDropDown ? 15 : 0,
              transition: { duration: 0.3 },
            }
          : { opacity: 1, scale: 1, transition: { duration: 0.8 } }
      }
    >
      <button
        className=" click:animate-ping bg-cyan-800 hover:bg-cyan-700 text-white text-xl sm:text-2xl
      font-bold my-2 sm:my-4 py-1 sm:py-2 sm:px-8 px-6 border border-grey-800 hover:border-grey-500 rounded"
        onClick={onClick}
      >
        {buttonTitle}
      </button>
    </motion.div>
  );
};

export default Button;
