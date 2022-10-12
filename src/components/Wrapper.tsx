import { FC, PropsWithChildren } from "react";
import backgroundImage from "../assets/background.jpg";

const Wrapper: FC<PropsWithChildren> = (props) => {
  return (
    <div
      className="p-2 sm:p-6 m-w-full bg-cover flex flex-col justify-start items-center"
      style={{
        overflowY: "scroll",
        backgroundImage: `url(${backgroundImage})`,
        height: "100vh",
      }}
    >
      {props.children}
    </div>
  );
};

export default Wrapper;
