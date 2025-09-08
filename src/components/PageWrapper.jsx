import { motion } from "framer-motion";
import { useState } from "react";

// Variantes de animación para transiciones de páginas
const variants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

// Wrapper que aplica animación de entrada/salida a las páginas
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
        // Renderiza el contenido solo cuando termina la animación de entrada
        if (definition === "animate") {
          setAnimationFinished(true);
        }
      }}
    >
      {animationFinished ? children : null}
    </motion.div>
  );
}
