import { FC, PropsWithChildren } from "react";

const Card: FC<PropsWithChildren> = ( props ) => {
    return ( <div
        className="p-4 bg-gray-200 rounded-lg
				border border-gray-800 shadow-md">
        { props.children }</div> );
};

export default Card;