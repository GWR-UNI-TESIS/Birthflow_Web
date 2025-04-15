import { motion } from "framer-motion";
import { useState } from "react";

const variants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

export default function PageWrapper({ children }) {
  const [animationFinished, setAnimationFinished] = useState(false);

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.18, ease: "easeInOut" }}
      style={{ height: "100%" }}
      onAnimationComplete={(definition) => {
        if (definition === "animate") {
          setAnimationFinished(true);
        }
      }}
    >
      {animationFinished ? children : null}
    </motion.div>
  );
}
