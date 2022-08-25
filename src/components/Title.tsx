import { FC } from "react";

const Title: FC<{ title: string; }> = ( { title } ) => {
    return ( <div className="border bg-gray-200 rounded-lg bg-opacity-70 p-3 w-2/5"  >
        <p className="text-8xl text-center font-bold text-cyan-800 opacity-90">{ title }</p>
    </div> );
};
export default Title;