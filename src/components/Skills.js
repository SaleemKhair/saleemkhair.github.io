import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ReactMarkdown from "react-markdown";
import { contentService } from "../services";

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const content = contentService.getMarkdownContent("skills");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className="section"
    >
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="section-title"
      >
        Technical Skills
      </motion.h2>

      <div className="skills-content">
        <ReactMarkdown
          components={{
            strong: ({ children }) => (
              <motion.strong
                variants={itemVariants}
                style={{
                  color: "#1a365d",
                  fontWeight: 600,
                  display: "block",
                  marginBottom: "0.5rem",
                  fontSize: "1.1rem",
                }}
              >
                {children}
              </motion.strong>
            ),
            p: ({ children }) => (
              <motion.p
                variants={itemVariants}
                style={{
                  color: "#4a5568",
                  fontSize: "0.95rem",
                  lineHeight: "1.6",
                }}
              >
                {children}
              </motion.p>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </motion.div>
  );
};

export default Skills;
