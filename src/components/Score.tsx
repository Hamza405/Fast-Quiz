import React from "react";

type parameterType = { score: number; totalQuestions: number };

const Score: React.FC<parameterType> = ({ score, totalQuestions }) => {
  return (
    <div className="border bg-gray-200 rounded-lg bg-opacity-70 p-2 my-2 ">
      <p className="text-xl text-cyan-800 font-bold">
        Score: {score} / {totalQuestions}
      </p>
    </div>
  );
};

export default Score;
