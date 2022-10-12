import { FC } from "react";

const Button: FC<{ buttonTitle: string; onClick: () => void }> = ({
  buttonTitle,
  onClick,
}) => {
  return (
    <button
      className=" click:animate-ping bg-cyan-800 hover:bg-cyan-700 text-white text-xl sm:text-2xl
		font-bold my-2 sm:my-4 py-1 sm:py-2 sm:px-8 px-6 border border-grey-800 hover:border-grey-500 rounded"
      onClick={onClick}
    >
      {buttonTitle}
    </button>
  );
};

export default Button;
