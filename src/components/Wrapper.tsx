import { FC, PropsWithChildren } from "react";
import backgroundImage from "../assets/background.jpg";

const Wrapper: FC<PropsWithChildren> = ( props ) => {
    return ( <div
        className="p-6 m-w-full bg-fill flex flex-col justify-start items-center"
        style={ { backgroundImage: `url(${ backgroundImage })`, height: '100vh' } }
    >
        { props.children }
    </div> );
};

export default Wrapper;