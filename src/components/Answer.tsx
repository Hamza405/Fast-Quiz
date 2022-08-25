import { FC } from "react";

const Answer: FC<{ answer: string; onClick: ( e: React.MouseEvent<HTMLButtonElement> ) => void; userAnswer: boolean; }> = ( { answer, onClick, userAnswer } ) => {
    return <div className="my-2 m-auto bg-gray-200 rounded-lg
				border border-gray-800 shadow-md">
        <button disabled={ !!userAnswer } onClick={ onClick } value={ answer } className="p-2 text-center w-full">
            <p className="text-center" dangerouslySetInnerHTML={ { __html: answer } } />
        </button>
    </div>;
};
export default Answer;