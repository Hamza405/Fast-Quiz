import { FC } from "react";

const Button: FC<{ buttonTitle: string, onClick: () => void; }> = ( { buttonTitle, onClick } ) => {
    return <button
        className="bg-cyan-800 hover:bg-cyan-700 text-white text-2xl
		font-bold my-8 py-3 px-8 border border-grey-800 hover:border-grey-500 rounded"
        onClick={
            onClick
        }>{ buttonTitle }</button>;
};

export default Button;