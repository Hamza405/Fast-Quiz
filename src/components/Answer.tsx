import { FC } from "react";

const Answer: FC<{ clicked: boolean; correct: boolean; answer: string; onClick: ( e: React.MouseEvent<HTMLButtonElement> ) => void; userAnswer: boolean; }> = ( { answer, onClick, userAnswer, correct, clicked } ) => {
    return <div className={ `my-1 sm:my-2 m-auto ${ !userAnswer ? "bg-gray-200" : correct ? "bg-green-200" : clicked ? "bg-red-200" : "bg-gray-200" }  rounded-lg
				border border-gray-800 shadow-md`}>
        <button disabled={ !!userAnswer } onClick={ onClick } value={ answer } className="p-1 sm:p-2 text-center w-full">
            <p className="text-center" dangerouslySetInnerHTML={ { __html: answer } } />
        </button>
    </div>;
};
export default Answer;