import { FC, PropsWithChildren } from "react";

const Card: FC<PropsWithChildren> = ( props ) => {
  return ( <div
    className="p-4 m-auto bg-gray-200 rounded-lg
				border border-gray-800 shadow-md flex flex-col items-center gap-4 max-w-xl ">
    { props.children }</div> );
};

export default Card;