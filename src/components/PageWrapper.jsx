// components/PageWrapper.jsx
import { motion } from "framer-motion";

const variants = {
  initial: { opacity: 0, x: 15 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -15 },
};

export default function PageWrapper({ children }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ height: "100%" }}
    >
      {children}
    </motion.div>
  );
}
