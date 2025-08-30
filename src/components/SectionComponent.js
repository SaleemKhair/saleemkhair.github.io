import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ReactMarkdown from "react-markdown";
import { contentService } from "../services";
import {
  isAnimationEnabled,
  getAnimationConfig,
} from "../config/theme";

/**
 * Abstract Section Component
 * Handles markdown content rendering with animations for any resume section
 * Follows Single Responsibility Principle and Inversion of Control
 */
const SectionComponent = ({
  sectionKey,
  title,
  customComponents = {},
  containerVariants = null,
  itemVariants = null,
  className = "section",
  titleClassName = "section-title",
  contentClassName = null,
  titleAnimation = null,
  titleAnimationIn = null,
  titleTransition = null,
  containerAnimation = null,
  containerAnimationIn = null,
  containerTransition = null,
  itemAnimation = null,
  itemAnimationIn = null,
  itemTransition = null,
  animationType = "default",
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
  const finalTitleAnimation = titleAnimation || animConfig.hidden;
  const finalTitleAnimationIn = titleAnimationIn || animConfig.visible;
  const finalTitleTransition = titleTransition || {
    duration: animConfig.duration,
    delay: 0.2,
  };

  const finalContainerAnimation = containerAnimation || animConfig.hidden;
  const finalContainerAnimationIn = containerAnimationIn || animConfig.visible;
  const finalContainerTransition = containerTransition || {
    staggerChildren: animConfig.staggerDelay,
    delayChildren: 0.1,
  };

  const finalItemAnimation = itemAnimation || animConfig.hidden;
  const finalItemAnimationIn = itemAnimationIn || animConfig.visible;
  const finalItemTransition = itemTransition || {
    duration: animConfig.duration,
    ease: animConfig.ease,
  };

  // Default animation variants
  const defaultContainerVariants = {
    hidden: finalContainerAnimation,
    visible: {
      ...finalContainerAnimationIn,
      transition: finalContainerTransition,
    },
  };

  const defaultItemVariants = {
    hidden: finalItemAnimation,
    visible: {
      ...finalItemAnimationIn,
      transition: finalItemTransition,
    },
  };

  // Use custom variants if provided, otherwise use defaults
  const finalContainerVariants = containerVariants || defaultContainerVariants;
  const finalItemVariants = itemVariants || defaultItemVariants;

  // Default components for markdown rendering
  const defaultComponents = {
    h1: ({ children }) => (
      <motion.h1 variants={finalItemVariants} className="section-h1">
        {children}
      </motion.h1>
    ),
    h2: ({ children }) => (
      <motion.h2 variants={finalItemVariants} className="section-h2">
        {children}
      </motion.h2>
    ),
    h3: ({ children }) => (
      <motion.h3 variants={finalItemVariants} className="section-h3">
        {children}
      </motion.h3>
    ),
    p: ({ children }) => (
      <motion.p variants={finalItemVariants} className="section-p">
        {children}
      </motion.p>
    ),
    ul: ({ children }) => (
      <motion.ul variants={finalItemVariants} className="section-ul">
        {children}
      </motion.ul>
    ),
    li: ({ children }) => (
      <motion.li variants={finalItemVariants} className="section-li">
        {children}
      </motion.li>
    ),
    strong: ({ children }) => (
      <motion.strong variants={finalItemVariants} className="section-strong">
        {children}
      </motion.strong>
    ),
    a: ({ href, children }) => (
      <motion.a
        variants={finalItemVariants}
        href={href}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className="section-link"
      >
        {children}
      </motion.a>
    ),
    hr: () => (
      <motion.hr
        variants={finalItemVariants}
        className="section-hr"
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

  // Merge custom components with defaults (custom components take precedence)
  const finalComponents = { ...defaultComponents, ...customComponents };

  return (
    <motion.section
      ref={ref}
      initial={animationsEnabled ? "hidden" : "visible"}
      animate={inView && animationsEnabled ? "visible" : "visible"}
      variants={animationsEnabled ? finalContainerVariants : undefined}
      className={className}
    >
      {title && (
        <motion.h2
          initial={animationsEnabled ? finalTitleAnimation : "visible"}
          animate={
            inView && animationsEnabled ? finalTitleAnimationIn : "visible"
          }
          transition={animationsEnabled ? finalTitleTransition : undefined}
          className={titleClassName}
        >
          {title}
        </motion.h2>
      )}

      <div className={contentClassName || `${className}-content`}>
        <ReactMarkdown components={finalComponents}>{content}</ReactMarkdown>
      </div>
    </motion.section>
  );
};

export default SectionComponent;
