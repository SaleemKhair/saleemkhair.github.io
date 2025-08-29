/**
 * Theme Configuration
 * Externalized configuration for global settings
 * Follows Inversion of Control - data controls behavior
 */

export const themeConfig = {
  // Animation Settings
  animations: {
    enabled: true, // Master switch for all animations
    scrollTriggered: true, // Enable/disable scroll-triggered animations
    hoverEffects: true, // Enable/disable hover animations
    pageLoad: true, // Enable/disable page load animations
    staggerDelay: 0.2, // Default stagger delay for list items
    defaultDuration: 0.6, // Default animation duration
    defaultEase: "easeOut", // Default easing function
  },

  // Color Scheme
  colors: {
    primary: "#1a365d", // Primary brand color
    secondary: "#3182ce", // Secondary brand color
    accent: "#e53e3e", // Accent color for highlights
    background: {
      primary: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      secondary: "rgba(255, 255, 255, 0.1)",
      glass: "rgba(255, 255, 255, 0.05)",
    },
    text: {
      primary: "#1a202c", // Main text color
      secondary: "#4a5568", // Secondary text color
      muted: "#718096", // Muted text color
      light: "#ffffff", // Light text color
    },
    borders: {
      primary: "rgba(49, 130, 206, 0.1)",
      secondary: "rgba(49, 130, 206, 0.2)",
      glass: "rgba(255, 255, 255, 0.1)",
    },
    gradients: {
      primary: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      secondary: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      accent: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
  },

  // Typography
  typography: {
    fontFamily: {
      primary: "'Inter', sans-serif",
      secondary: "'Roboto', sans-serif",
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },

  // Spacing
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
    "3xl": "4rem",
  },

  // Border Radius
  borderRadius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    full: "9999px",
  },

  // Shadows
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
  },

  // Breakpoints
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },

  // PDF Generation Settings
  pdf: {
    enableAnimations: false, // Always disable animations for PDF
    backgroundColor: "#ffffff", // White background for PDF
    textColor: "#000000", // Black text for PDF
    pageSize: "a4",
    orientation: "portrait",
    margins: {
      top: "20mm",
      right: "20mm",
      bottom: "20mm",
      left: "20mm",
    },
  },

  // Component-specific settings
  components: {
    header: {
      gradientText: true, // Enable gradient text in header
      iconColors: "#3182ce", // Icon colors in header
      contactCardStyle: true, // Enable card-style contact info
    },
    sections: {
      glassmorphism: true, // Enable glassmorphism effect
      hoverEffects: true, // Enable hover effects on sections
      dividers: true, // Show section dividers
    },
    buttons: {
      hoverScale: true, // Enable scale effect on button hover
      shadowEffects: true, // Enable shadow effects on buttons
    },
  },
};

/**
 * Get theme configuration value by path
 * @param {string} path - Dot notation path to config value
 * @param {*} defaultValue - Default value if path doesn't exist
 * @returns {*} - Configuration value
 */
export const getThemeValue = (path, defaultValue = null) => {
  const keys = path.split(".");
  let value = themeConfig;

  for (const key of keys) {
    if (value && typeof value === "object" && key in value) {
      value = value[key];
    } else {
      return defaultValue;
    }
  }

  return value;
};

/**
 * Check if animations are enabled
 * @param {string} animationType - Type of animation to check
 * @returns {boolean} - Whether animation is enabled
 */
export const isAnimationEnabled = (animationType = "general") => {
  if (!getThemeValue("animations.enabled", true)) {
    return false;
  }

  switch (animationType) {
    case "scroll":
      return getThemeValue("animations.scrollTriggered", true);
    case "hover":
      return getThemeValue("animations.hoverEffects", true);
    case "pageLoad":
      return getThemeValue("animations.pageLoad", true);
    case "pdf":
      return getThemeValue("pdf.enableAnimations", false);
    default:
      return true;
  }
};

/**
 * Get animation configuration
 * @param {string} type - Animation type
 * @returns {Object} - Animation configuration
 */
export const getAnimationConfig = (type = "default") => {
  const baseConfig = {
    duration: getThemeValue("animations.defaultDuration", 0.6),
    ease: getThemeValue("animations.defaultEase", "easeOut"),
    staggerDelay: getThemeValue("animations.staggerDelay", 0.2),
  };

  const typeConfigs = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    slideUp: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
    slideDown: {
      hidden: { opacity: 0, y: -20 },
      visible: { opacity: 1, y: 0 },
    },
    slideLeft: {
      hidden: { opacity: 0, x: 20 },
      visible: { opacity: 1, x: 0 },
    },
    slideRight: {
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1 },
    },
    default: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
  };

  return {
    ...baseConfig,
    ...(typeConfigs[type] || typeConfigs.default),
  };
};

/**
 * Get color by name
 * @param {string} colorName - Color name (e.g., 'primary', 'text.primary')
 * @returns {string} - Color value
 */
export const getColor = (colorName) => {
  return getThemeValue(`colors.${colorName}`, "#000000");
};

/**
 * Get component setting
 * @param {string} component - Component name
 * @param {string} setting - Setting name
 * @returns {*} - Setting value
 */
export const getComponentSetting = (component, setting) => {
  return getThemeValue(`components.${component}.${setting}`, null);
};

/**
 * Create CSS custom properties from theme
 * @returns {Object} - CSS custom properties object
 */
export const createCSSVariables = () => {
  const variables = {};

  // Colors
  Object.entries(themeConfig.colors).forEach(([category, colors]) => {
    if (typeof colors === "object") {
      Object.entries(colors).forEach(([name, value]) => {
        variables[`--color-${category}-${name}`] = value;
      });
    } else {
      variables[`--color-${category}`] = colors;
    }
  });

  // Typography
  Object.entries(themeConfig.typography.fontSize).forEach(([size, value]) => {
    variables[`--font-size-${size}`] = value;
  });

  Object.entries(themeConfig.typography.fontWeight).forEach(
    ([weight, value]) => {
      variables[`--font-weight-${weight}`] = value;
    }
  );

  // Spacing
  Object.entries(themeConfig.spacing).forEach(([size, value]) => {
    variables[`--spacing-${size}`] = value;
  });

  // Border radius
  Object.entries(themeConfig.borderRadius).forEach(([size, value]) => {
    variables[`--border-radius-${size}`] = value;
  });

  return variables;
};

export default themeConfig;

