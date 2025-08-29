import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ReactMarkdown from "react-markdown";
import { contentService } from "../services";
import {
  isAnimationEnabled,
  getAnimationConfig,
  getColor,
} from "../config/theme";

/**
 * Section Item Component
 * Specialized component for sections that need item-based rendering
 * Extends SectionComponent with item-specific styling and animations
 */
const SectionItemComponent = ({
  sectionKey,
  title,
  itemClassName = "section-item",
  itemContainerClassName = "section-item-container",
  customItemComponents = {},
  itemAnimation = null,
  itemAnimationIn = null,
  itemTransition = null,
  staggerDelay = null,
  animationType = "slideUp",
  ...sectionProps
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const content = contentService.getMarkdownContent(sectionKey);

  // Get animation configuration from theme
  const animConfig = getAnimationConfig(animationType);
  const animationsEnabled = isAnimationEnabled("scroll");

  // Use theme defaults if not provided
  const finalItemAnimation = itemAnimation || animConfig.hidden;
  const finalItemAnimationIn = itemAnimationIn || animConfig.visible;
  const finalItemTransition = itemTransition || {
    duration: animConfig.duration,
    ease: animConfig.ease,
  };
  const finalStaggerDelay = staggerDelay || animConfig.staggerDelay;

  // Item-specific animation variants
  const itemVariants = {
    hidden: finalItemAnimation,
    visible: {
      ...finalItemAnimationIn,
      transition: finalItemTransition,
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: finalStaggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  // Default item components
  const defaultItemComponents = {
    h3: ({ children }) => (
      <motion.h3 variants={itemVariants} className="item-title">
        {children}
      </motion.h3>
    ),
    p: ({ children }) => (
      <motion.p variants={itemVariants} className="item-info">
        {children}
      </motion.p>
    ),
    ul: ({ children }) => (
      <motion.ul variants={itemVariants} className="item-description">
        {children}
      </motion.ul>
    ),
    li: ({ children }) => (
      <motion.li variants={itemVariants} className="item-list-item">
        {children}
      </motion.li>
    ),
    strong: ({ children }) => (
      <motion.strong
        variants={itemVariants}
        className="item-strong"
        style={{ color: "#1a365d", fontWeight: 600 }}
      >
        {children}
      </motion.strong>
    ),
    hr: () => (
      <motion.hr
        variants={itemVariants}
        className="item-divider"
        style={{
          border: "none",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, #e2e8f0, transparent)",
          margin: "2rem 0",
        }}
      />
    ),
  };

  // Merge custom components with defaults
  const finalComponents = { ...defaultItemComponents, ...customItemComponents };

  return (
    <motion.div
      ref={ref}
      initial={animationsEnabled ? "hidden" : "visible"}
      animate={inView && animationsEnabled ? "visible" : "visible"}
      variants={animationsEnabled ? containerVariants : undefined}
      className="section"
    >
      {title && (
        <motion.h2
          initial={animationsEnabled ? { opacity: 0, x: -20 } : "visible"}
          animate={
            inView && animationsEnabled ? { opacity: 1, x: 0 } : "visible"
          }
          transition={
            animationsEnabled ? { duration: 0.8, delay: 0.2 } : undefined
          }
          className="section-title"
        >
          {title}
        </motion.h2>
      )}

      <div className={itemContainerClassName}>
        <ReactMarkdown components={finalComponents}>{content}</ReactMarkdown>
      </div>
    </motion.div>
  );
};

export default SectionItemComponent;
