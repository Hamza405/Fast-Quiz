import { FC, PropsWithChildren } from "react";
import { motion } from "framer-motion";

const Card: FC<PropsWithChildren> = (props) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{
        scale: 1,
      }}
      className="p-4 m-auto bg-cyan-800 rounded-lg
				border border-gray-800 shadow-md flex flex-col items-center gap-4 max-w-xl "
    >
      {props.children}
    </motion.div>
  );
};

export default Card;
