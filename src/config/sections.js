import { motion } from "framer-motion";
import { getAnimationConfig, getColor } from "./theme";

/**
 * Resume Sections Configuration
 * Defines all sections and their specific requirements
 * Follows Inversion of Control - data controls the behavior
 */

// Get animation variants from theme
const getItemVariants = () => {
  const config = getAnimationConfig("slideUp");
  return {
    hidden: config.hidden,
    visible: {
      ...config.visible,
      transition: {
        duration: config.duration,
        ease: config.ease,
      },
    },
  };
};

export const sectionsConfig = {
  header: {
    type: "special", // Special handling for header with icons
    component: "Header", // Uses custom Header component
    title: null, // No title needed for header
  },

  experience: {
    type: "item",
    component: "SectionItemComponent",
    title: "Professional Experience",
    customComponents: {
      h3: ({ children }) => (
        <motion.h3 variants={getItemVariants()} className="job-title">
          {children}
        </motion.h3>
      ),
      p: ({ children }) => (
        <motion.p variants={getItemVariants()} className="company-info">
          {children}
        </motion.p>
      ),
      ul: ({ children }) => (
        <motion.ul variants={getItemVariants()} className="job-description">
          {children}
        </motion.ul>
      ),
      li: ({ children }) => (
        <motion.li variants={getItemVariants()}>{children}</motion.li>
      ),
      strong: ({ children }) => (
        <motion.strong
          variants={getItemVariants()}
          style={{ color: getColor("primary"), fontWeight: 600 }}
        >
          {children}
        </motion.strong>
      ),
      hr: () => (
        <motion.hr
          variants={getItemVariants()}
          style={{
            border: "none",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, #e2e8f0, transparent)",
            margin: "2rem 0",
          }}
        />
      ),
    },
    itemAnimation: { opacity: 0, y: 30 },
    itemAnimationIn: { opacity: 1, y: 0 },
    itemTransition: { duration: 0.6, ease: "easeOut" },
    staggerDelay: 0.2,
  },

  skills: {
    type: "section",
    component: "SectionComponent",
    title: "Technical Skills",
    customComponents: {
      strong: ({ children }) => (
        <motion.strong
          variants={getItemVariants()}
          style={{
            color: getColor("primary"),
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
          variants={getItemVariants()}
          style={{
            color: getColor("text.secondary"),
            fontSize: "0.95rem",
            lineHeight: "1.6",
          }}
        >
          {children}
        </motion.p>
      ),
    },
    itemAnimation: { opacity: 0, scale: 0.9 },
    itemAnimationIn: { opacity: 1, scale: 1 },
    itemTransition: { duration: 0.5, ease: "easeOut" },
    staggerDelay: 0.1,
  },

  education: {
    type: "section",
    component: "SectionComponent",
    title: "Education",
    customComponents: {
      strong: ({ children }) => (
        <motion.strong
          variants={getItemVariants()}
          style={{ color: getColor("primary"), fontWeight: 600 }}
        >
          {children}
        </motion.strong>
      ),
    },
  },

  languages: {
    type: "section",
    component: "SectionComponent",
    title: "Languages",
    customComponents: {
      ul: ({ children }) => <ul className="languages-list">{children}</ul>,
      li: ({ children }) => (
        <motion.li
          variants={getItemVariants()}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {children}
        </motion.li>
      ),
    },
    itemAnimation: { opacity: 0, scale: 0.95 },
    itemAnimationIn: { opacity: 1, scale: 1 },
    itemTransition: { duration: 0.5, ease: "easeOut" },
  },

  references: {
    type: "section",
    component: "SectionComponent",
    title: "References",
    customComponents: {
      a: ({ href, children }) => (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="reference-link"
        >
          {children}
        </a>
      ),
    },
  },
};

/**
 * Get section configuration by key
 * @param {string} sectionKey - The section key
 * @returns {Object} - Section configuration
 */
export const getSectionConfig = (sectionKey) => {
  return (
    sectionsConfig[sectionKey] || {
      type: "section",
      component: "SectionComponent",
      title: sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1),
    }
  );
};

/**
 * Get all section keys
 * @returns {Array} - Array of section keys
 */
export const getSectionKeys = () => {
  return Object.keys(sectionsConfig);
};

/**
 * Get sections by type
 * @param {string} type - The section type
 * @returns {Array} - Array of section configurations
 */
export const getSectionsByType = (type) => {
  return Object.entries(sectionsConfig)
    .filter(([key, config]) => config.type === type)
    .map(([key, config]) => ({ key, ...config }));
};
