import React from "react";
import { getSectionConfig } from "../config/sections";
import SectionComponent from "./SectionComponent";
import SectionItemComponent from "./SectionItemComponent";
import Header from "./Header";

/**
 * Dynamic Section Renderer
 * Renders sections based on configuration
 * Implements Inversion of Control - configuration drives behavior
 */
const DynamicSectionRenderer = ({ sectionKey, ...props }) => {
  const config = getSectionConfig(sectionKey);

  // Handle special cases
  if (config.type === "special") {
    switch (config.component) {
      case "Header":
        return <Header {...props} />;
      default:
        return <div>Unknown special component: {config.component}</div>;
    }
  }

  // Handle item-based sections
  if (config.type === "item") {
    return (
      <SectionItemComponent
        sectionKey={sectionKey}
        title={config.title}
        customComponents={config.customComponents}
        itemAnimation={config.itemAnimation}
        itemAnimationIn={config.itemAnimationIn}
        itemTransition={config.itemTransition}
        staggerDelay={config.staggerDelay}
        {...props}
      />
    );
  }

  // Handle regular sections
  return (
    <SectionComponent
      sectionKey={sectionKey}
      title={config.title}
      customComponents={config.customComponents}
      containerVariants={config.containerVariants}
      itemVariants={config.itemVariants}
      className={config.className}
      titleClassName={config.titleClassName}
      contentClassName={config.contentClassName}
      titleAnimation={config.titleAnimation}
      titleAnimationIn={config.titleAnimationIn}
      titleTransition={config.titleTransition}
      containerAnimation={config.containerAnimation}
      containerAnimationIn={config.containerAnimationIn}
      containerTransition={config.containerTransition}
      itemAnimation={config.itemAnimation}
      itemAnimationIn={config.itemAnimationIn}
      itemTransition={config.itemTransition}
      {...props}
    />
  );
};

export default DynamicSectionRenderer;

