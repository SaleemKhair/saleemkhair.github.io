import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ReactMarkdown from "react-markdown";
import { contentService } from "../services";

const Education = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const content = contentService.getMarkdownContent("education");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="section"
    >
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="section-title"
      >
        Education
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="education-content"
      >
        <ReactMarkdown
          components={{
            strong: ({ children }) => (
              <span className="education-degree">{children}</span>
            ),
            p: ({ children }) => (
              <div className="education-school">{children}</div>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </motion.div>
    </motion.div>
  );
};

export default Education;
