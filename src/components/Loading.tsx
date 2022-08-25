import { FC } from "react";

const Loading: FC = () => {
    return ( <div>
        <div style={ { borderTopColor: "transparent" } }
            className="w-16 my-10 h-16 border-8 border-cyan-800 border-double rounded-full animate-spin"></div>
    </div> );
};
export default Loading;