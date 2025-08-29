# Component Architecture

This directory contains the new component architecture that follows SOLID principles and implements Inversion of Control.

## Architecture Overview

### 🏗️ **SOLID Principles Implementation**

#### **1. Single Responsibility Principle (SRP)**

- Each component has one clear responsibility
- `SectionComponent` - Handles markdown rendering with animations
- `SectionItemComponent` - Handles item-based sections
- `DynamicSectionRenderer` - Routes to appropriate component based on configuration

#### **2. Open/Closed Principle (OCP)**

- Components are open for extension, closed for modification
- New sections can be added via configuration without changing component code
- Custom components can be injected via props

#### **3. Liskov Substitution Principle (LSP)**

- `SectionItemComponent` can be substituted for `SectionComponent`
- Both components follow the same interface contract

#### **4. Interface Segregation Principle (ISP)**

- Components accept only the props they need
- Configuration is separated from component logic

#### **5. Dependency Inversion Principle (DIP)**

- Components depend on abstractions (configuration) not concrete implementations
- Data controls behavior, not code

## Component Structure

### **Abstract Components**

#### **SectionComponent** (`SectionComponent.js`)

Base component for rendering markdown content with animations.

**Features:**

- Markdown rendering with ReactMarkdown
- Framer Motion animations
- Intersection Observer for scroll triggers
- Customizable components via props
- Default styling and animations

**Usage:**

```javascript
<SectionComponent
  sectionKey="education"
  title="Education"
  customComponents={{...}}
  itemAnimation={{ opacity: 0, y: 20 }}
/>
```

#### **SectionItemComponent** (`SectionItemComponent.js`)

Specialized component for sections with item-based rendering (like experience).

**Features:**

- Extends SectionComponent functionality
- Item-specific animations and styling
- Staggered animations for list items
- Specialized component overrides

**Usage:**

```javascript
<SectionItemComponent
  sectionKey="experience"
  title="Professional Experience"
  staggerDelay={0.2}
  customItemComponents={{...}}
/>
```

#### **DynamicSectionRenderer** (`DynamicSectionRenderer.js`)

Router component that renders sections based on configuration.

**Features:**

- Configuration-driven rendering
- Automatic component selection
- Props forwarding
- Error handling for unknown components

**Usage:**

```javascript
<DynamicSectionRenderer sectionKey="skills" />
```

### **Configuration-Driven Architecture**

#### **Sections Configuration** (`../config/sections.js`)

Defines all sections and their specific requirements.

**Configuration Structure:**

```javascript
{
  sectionKey: {
    type: "section" | "item" | "special",
    component: "SectionComponent" | "SectionItemComponent" | "Header",
    title: "Section Title",
    customComponents: {...},
    animations: {...},
    styling: {...}
  }
}
```

**Benefits:**

- ✅ **Inversion of Control** - Data controls behavior
- ✅ **Single Source of Truth** - All section definitions in one place
- ✅ **Easy Maintenance** - Add/modify sections without touching components
- ✅ **Type Safety** - Clear structure for section configuration

## Usage Examples

### **Adding a New Section**

1. **Add content to contentService:**

```javascript
// In contentService.js
const contentMap = {
  // ... existing content
  newSection: `## New Section Content\n\nYour markdown content here...`,
};
```

2. **Add configuration:**

```javascript
// In sections.js
export const sectionsConfig = {
  // ... existing sections
  newSection: {
    type: "section",
    component: "SectionComponent",
    title: "New Section",
    customComponents: {
      // Custom component overrides if needed
    },
  },
};
```

3. **Done!** The section will automatically appear in the resume.

### **Customizing Existing Sections**

```javascript
// In sections.js
skills: {
  type: "section",
  component: "SectionComponent",
  title: "Technical Skills",
  customComponents: {
    strong: ({ children }) => (
      <motion.strong style={{ color: "red" }}>
        {children}
      </motion.strong>
    )
  }
}
```

## Benefits Achieved

### **Code Reduction**

- **Before:** 6 separate component files (Header, Experience, Skills, etc.)
- **After:** 3 abstract components + 1 configuration file
- **Reduction:** ~70% less component code

### **Maintainability**

- ✅ **Single Responsibility** - Each component has one clear purpose
- ✅ **Open/Closed** - Easy to extend without modifying existing code
- ✅ **Configuration-Driven** - Changes made in data, not code
- ✅ **Reusable** - Components can be used for any section type

### **Flexibility**

- ✅ **Custom Components** - Easy to override default rendering
- ✅ **Animation Control** - Full control over animations per section
- ✅ **Styling Flexibility** - Custom styling per section
- ✅ **Type Safety** - Clear configuration structure

### **Performance**

- ✅ **Lazy Loading** - Components only render when needed
- ✅ **Optimized Animations** - Efficient animation handling
- ✅ **Caching** - Content service provides caching
- ✅ **Minimal Re-renders** - Proper React optimization

## Migration Path

### **Phase 1: ✅ Complete**

- Created abstract components
- Implemented configuration system
- Updated App.js to use dynamic rendering

### **Phase 2: Future**

- Remove old individual component files
- Add more section types
- Implement advanced configuration options
- Add validation for configuration

This architecture provides a solid foundation for scalable, maintainable, and flexible component development following modern React and SOLID principles.

