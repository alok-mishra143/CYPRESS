import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const CypressIntro = () => {
  const [showContent, setShowContent] = useState(false);

  const cypressVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.5 },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotate: -20 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, scale: 1.2, rotate: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
    },
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2000); // Adjust timing if needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {!showContent && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={cypressVariants}
          className="flex justify-center items-center h-screen relative overflow-hidden"
        >
          <motion.div className="relative flex justify-center items-center">
            {"CYPRESS".split("").map((letter, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className="text-5xl font-bold"
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      )}
      {showContent && (
        <motion.div
          className="flex justify-center items-center bg-primary/10 h-screen overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={contentVariants}
        >
          <motion.div
            className="text-5xl font-bold"
            initial={{ opacity: 1, filter: "blur(0px)", scale: 1, rotate: 0 }}
            animate={{
              opacity: 0,
              filter: "blur(15px)",
              scale: 1.2,
              rotate: 0,
            }}
            transition={{ duration: 1 }}
          >
            CYPRESS
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default CypressIntro;
