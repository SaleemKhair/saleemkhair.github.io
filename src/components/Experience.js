import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ReactMarkdown from "react-markdown";
import { contentService } from "../services";

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const content = contentService.getMarkdownContent("experience");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
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
        Professional Experience
      </motion.h2>

      <div className="experience-content">
        <ReactMarkdown
          components={{
            h3: ({ children }) => (
              <motion.h3 variants={itemVariants} className="job-title">
                {children}
              </motion.h3>
            ),
            p: ({ children }) => (
              <motion.p variants={itemVariants} className="company-info">
                {children}
              </motion.p>
            ),
            ul: ({ children }) => (
              <motion.ul variants={itemVariants} className="job-description">
                {children}
              </motion.ul>
            ),
            li: ({ children }) => (
              <motion.li variants={itemVariants}>{children}</motion.li>
            ),
            strong: ({ children }) => (
              <motion.strong
                variants={itemVariants}
                style={{ color: "#1a365d", fontWeight: 600 }}
              >
                {children}
              </motion.strong>
            ),
            hr: () => (
              <motion.hr
                variants={itemVariants}
                style={{
                  border: "none",
                  height: "1px",
                  background:
                    "linear-gradient(90deg, transparent, #e2e8f0, transparent)",
                  margin: "2rem 0",
                }}
              />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </motion.div>
  );
};

export default Experience;
