# Configuration System

This directory contains externalized configuration files that follow the Inversion of Control principle, allowing data to control behavior instead of code.

## 🎯 **Configuration Philosophy**

### **Inversion of Control (IoC)**

- **Data controls behavior** - Configuration files drive component behavior
- **No code changes needed** - Modify behavior by changing configuration
- **Single source of truth** - All settings centralized in configuration files
- **Type safety** - Clear structure and validation for configurations

## 📁 **Configuration Files**

### **1. Theme Configuration** (`theme.js`)

Global theme settings including colors, animations, typography, and component-specific settings.

#### **Key Features:**

- ✅ **Animation Control** - Enable/disable animations globally or by type
- ✅ **Color Scheme** - Centralized color management
- ✅ **Typography** - Font families, sizes, weights, line heights
- ✅ **Component Settings** - Component-specific configurations
- ✅ **PDF Settings** - PDF generation specific configurations

#### **Usage Examples:**

**Disable All Animations:**

```javascript
// In theme.js
export const themeConfig = {
  animations: {
    enabled: false, // Master switch
    scrollTriggered: false,
    hoverEffects: false,
    pageLoad: false,
  },
  // ... rest of config
};
```

**Change Color Scheme:**

```javascript
// In theme.js
export const themeConfig = {
  colors: {
    primary: "#2d3748", // Dark blue
    secondary: "#4299e1", // Light blue
    accent: "#f56565", // Red accent
    // ... rest of colors
  },
  // ... rest of config
};
```

**Custom Animation Types:**

```javascript
// In theme.js
export const themeConfig = {
  animations: {
    defaultDuration: 0.8, // Slower animations
    staggerDelay: 0.3, // Longer stagger delays
    // ... rest of animation config
  },
  // ... rest of config
};
```

### **2. Sections Configuration** (`sections.js`)

Defines all resume sections and their specific requirements.

#### **Key Features:**

- ✅ **Section Types** - Regular, item-based, or special sections
- ✅ **Component Mapping** - Maps sections to appropriate components
- ✅ **Custom Components** - Override default rendering per section
- ✅ **Animation Types** - Different animation types per section
- ✅ **Theme Integration** - Uses theme colors and animations

#### **Usage Examples:**

**Add New Section:**

```javascript
// In sections.js
export const sectionsConfig = {
  // ... existing sections
  projects: {
    type: "item",
    component: "SectionItemComponent",
    title: "Projects",
    animationType: "scale", // Use scale animation
    customComponents: {
      // Custom component overrides
    },
  },
};
```

**Customize Existing Section:**

```javascript
// In sections.js
skills: {
  type: "section",
  component: "SectionComponent",
  title: "Technical Skills",
  animationType: "slideUp", // Different animation
  customComponents: {
    strong: ({ children }) => (
      <motion.strong style={{ color: "red" }}>
        {children}
      </motion.strong>
    ),
  },
},
```

## 🔧 **Configuration Functions**

### **Theme Functions**

#### **`getThemeValue(path, defaultValue)`**

Get configuration value by dot notation path.

```javascript
import { getThemeValue } from "./config/theme";

const primaryColor = getThemeValue("colors.primary", "#000000");
const animationEnabled = getThemeValue("animations.enabled", true);
```

#### **`isAnimationEnabled(animationType)`**

Check if specific animation type is enabled.

```javascript
import { isAnimationEnabled } from "./config/theme";

const scrollEnabled = isAnimationEnabled("scroll");
const hoverEnabled = isAnimationEnabled("hover");
const pdfEnabled = isAnimationEnabled("pdf"); // Always false for PDF
```

#### **`getAnimationConfig(type)`**

Get animation configuration for specific type.

```javascript
import { getAnimationConfig } from "./config/theme";

const fadeConfig = getAnimationConfig("fade");
const slideConfig = getAnimationConfig("slideUp");
const scaleConfig = getAnimationConfig("scale");
```

#### **`getColor(colorName)`**

Get color value by name.

```javascript
import { getColor } from "./config/theme";

const primary = getColor("primary");
const textPrimary = getColor("text.primary");
const backgroundPrimary = getColor("background.primary");
```

### **Sections Functions**

#### **`getSectionConfig(sectionKey)`**

Get configuration for specific section.

```javascript
import { getSectionConfig } from "./config/sections";

const experienceConfig = getSectionConfig("experience");
const skillsConfig = getSectionConfig("skills");
```

#### **`getSectionKeys()`**

Get all available section keys.

```javascript
import { getSectionKeys } from "./config/sections";

const allSections = getSectionKeys(); // ["header", "experience", "skills", ...]
```

## 🎨 **Theme Provider**

### **ThemeProvider Component**

Provides theme configuration throughout the app with dynamic updates.

#### **Features:**

- ✅ **Context Provider** - Makes theme available to all components
- ✅ **PDF Mode** - Automatically disables animations for PDF generation
- ✅ **CSS Variables** - Automatically applies theme as CSS custom properties
- ✅ **Dynamic Updates** - Theme changes apply immediately

#### **Usage:**

```javascript
import { ThemeProvider } from "./components/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      {/* All components have access to theme */}
      <YourComponents />
    </ThemeProvider>
  );
}
```

#### **useTheme Hook:**

```javascript
import { useTheme } from "./components/ThemeProvider";

function MyComponent() {
  const { theme, isAnimationEnabled, getColor } = useTheme();

  const shouldAnimate = isAnimationEnabled("scroll");
  const primaryColor = getColor("primary");

  return <div style={{ color: primaryColor }}>{/* Component content */}</div>;
}
```

## 🚀 **Benefits Achieved**

### **1. No Code Changes for Behavior**

- ✅ **Disable animations** - Change `animations.enabled: false` in theme.js
- ✅ **Change colors** - Modify color values in theme.js
- ✅ **Add sections** - Add configuration in sections.js
- ✅ **Customize animations** - Change animation types per section

### **2. Centralized Configuration**

- ✅ **Single source of truth** - All settings in one place
- ✅ **Easy maintenance** - No hunting through code for settings
- ✅ **Consistent behavior** - Same configuration used everywhere
- ✅ **Version control** - Configuration changes tracked in git

### **3. Type Safety and Validation**

- ✅ **Clear structure** - Well-defined configuration objects
- ✅ **Default values** - Safe fallbacks for missing configurations
- ✅ **Helper functions** - Type-safe access to configuration values
- ✅ **Error handling** - Graceful handling of invalid configurations

### **4. Performance Optimization**

- ✅ **Conditional rendering** - Components only render what's needed
- ✅ **Efficient updates** - Only affected components re-render
- ✅ **CSS variables** - Fast theme application via CSS custom properties
- ✅ **Lazy loading** - Configuration loaded only when needed

## 📝 **Configuration Examples**

### **Complete Animation Disable:**

```javascript
// theme.js
export const themeConfig = {
  animations: {
    enabled: false, // Master switch
    scrollTriggered: false,
    hoverEffects: false,
    pageLoad: false,
  },
  // ... rest unchanged
};
```

### **Custom Color Scheme:**

```javascript
// theme.js
export const themeConfig = {
  colors: {
    primary: "#2d3748",
    secondary: "#4299e1",
    accent: "#f56565",
    background: {
      primary: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      // ... rest unchanged
    },
    // ... rest unchanged
  },
  // ... rest unchanged
};
```

### **PDF-Specific Settings:**

```javascript
// theme.js
export const themeConfig = {
  pdf: {
    enableAnimations: false, // Always false
    backgroundColor: "#ffffff",
    textColor: "#000000",
    pageSize: "a4",
    orientation: "portrait",
    // ... rest unchanged
  },
  // ... rest unchanged
};
```

This configuration system provides a powerful, flexible, and maintainable way to control application behavior without touching code, following modern software engineering principles.

