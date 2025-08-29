import React, { createContext, useContext, useState, useEffect } from "react";
import { themeConfig, createCSSVariables } from "../config/theme";

/**
 * Theme Context
 * Provides theme configuration throughout the app
 */
const ThemeContext = createContext();

/**
 * Theme Provider Component
 * Manages theme state and provides theme configuration to child components
 */
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themeConfig);
  const [isPDFMode, setIsPDFMode] = useState(false);

  // Apply CSS custom properties when theme changes
  useEffect(() => {
    const cssVariables = createCSSVariables();
    const root = document.documentElement;

    Object.entries(cssVariables).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
  }, [theme]);

  // Update theme for PDF mode
  useEffect(() => {
    if (isPDFMode) {
      // Disable animations for PDF generation
      setTheme((prevTheme) => ({
        ...prevTheme,
        animations: {
          ...prevTheme.animations,
          enabled: false,
          scrollTriggered: false,
          hoverEffects: false,
          pageLoad: false,
        },
        pdf: {
          ...prevTheme.pdf,
          enableAnimations: false,
        },
      }));
    } else {
      // Restore original theme
      setTheme(themeConfig);
    }
  }, [isPDFMode]);

  const value = {
    theme,
    setTheme,
    isPDFMode,
    setIsPDFMode,
    // Helper functions
    getThemeValue: (path, defaultValue = null) => {
      const keys = path.split(".");
      let value = theme;

      for (const key of keys) {
        if (value && typeof value === "object" && key in value) {
          value = value[key];
        } else {
          return defaultValue;
        }
      }

      return value;
    },
    isAnimationEnabled: (animationType = "general") => {
      if (!theme.animations.enabled) {
        return false;
      }

      switch (animationType) {
        case "scroll":
          return theme.animations.scrollTriggered;
        case "hover":
          return theme.animations.hoverEffects;
        case "pageLoad":
          return theme.animations.pageLoad;
        case "pdf":
          return theme.pdf.enableAnimations;
        default:
          return true;
      }
    },
    getColor: (colorName) => {
      const keys = colorName.split(".");
      let value = theme.colors;

      for (const key of keys) {
        if (value && typeof value === "object" && key in value) {
          value = value[key];
        } else {
          return "#000000";
        }
      }

      return value;
    },
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

/**
 * Custom hook to use theme context
 * @returns {Object} - Theme context value
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default ThemeProvider;

