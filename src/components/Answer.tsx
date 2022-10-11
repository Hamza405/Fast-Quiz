import { FC } from "react";
import { motion } from "framer-motion";

const Answer: FC<{
  clicked: boolean;
  correct: boolean;
  answer: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: boolean;
}> = ({ answer, onClick, userAnswer, correct, clicked }) => {
  const pathVariants = {
    notSwitched: {
      fill: "red",
    },
    switched: {
      fill: "green",
    },
  };
  return (
    <motion.div
      animate={{
        scale: !userAnswer ? 1 : correct ? 1.03 : clicked ? 0.97 : 0.97,
        transition: {
          duration: 0.3,
        },
      }}
      className={`my-1 sm:my-2 m-auto ${
        !userAnswer
          ? "bg-gray-200"
          : correct
          ? "bg-green-300"
          : clicked
          ? "bg-red-300"
          : "bg-gray-200"
      }  rounded-lg
				border border-gray-800 shadow-md hover:bg-gray-300`}
    >
      <button
        disabled={!!userAnswer}
        onClick={onClick}
        value={answer}
        className="p-1 sm:p-2 text-center w-full"
      >
        <p
          className="text-center"
          dangerouslySetInnerHTML={{ __html: answer }}
        />
      </button>
    </motion.div>
  );
};
export default Answer;
