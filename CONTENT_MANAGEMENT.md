# Content Management System

This project uses a **JSON-based content management system** that provides a single source of truth for all resume content.

## 🎯 Single Source of Truth

All resume content is stored in `src/data/resume.json`. This JSON file is the **only place** you need to update content.

## 📁 File Structure

```
src/
├── data/
│   └── resume.json          # 🎯 SINGLE SOURCE OF TRUTH
├── services/
│   ├── contentService.js    # JSON-based content service
│   └── pdfService.js        # PDF generation service
└── scripts/
    └── generate-resume-md.js # Auto-generates public/resume.md
```

## 🔄 Content Flow

```
src/data/resume.json
    ↓ (Content Service)
    ├── React Components (Web Display)
    ├── PDF Generation (Download)
    └── Markdown Generation (public/resume.md)
```

## 📝 How to Update Content

### 1. Edit the JSON File
Open `src/data/resume.json` and update the content:

```json
{
  "header": {
    "name": "Your Name",
    "title": "Your Title",
    "location": "Your Location",
    "email": "your.email@example.com",
    "phone": "+1234567890",
    "linkedin": "https://linkedin.com/in/yourprofile"
  },
  "experience": [
    {
      "title": "Job Title",
      "company": "Company Name",
      "location": "Location",
      "period": "Jan 2020 – Present",
      "achievements": [
        "Achievement 1 with **bold text**",
        "Achievement 2 with **bold text**"
      ],
      "techStack": "Tech, Stack, Here"
    }
  ],
  // ... other sections
}
```

### 2. Regenerate Markdown (Optional)
The markdown file is automatically regenerated during build, but you can manually regenerate it:

```bash
npm run generate-resume
```

### 3. Build and Deploy
```bash
npm run build
npm run deploy
```

## 🏗️ Architecture Benefits

### ✅ **Single Source of Truth**
- All content in one JSON file
- No duplicate content across files
- Easy to maintain and update

### ✅ **DTO Pattern**
- Type-safe data access
- Consistent data structure
- Easy to extend with new fields

### ✅ **Multiple Output Formats**
- **Web Display**: React components
- **PDF Download**: Clean text format
- **Markdown**: Static file for direct download

### ✅ **Automated Generation**
- Markdown file auto-generated from JSON
- PDF content auto-generated from JSON
- No manual synchronization needed

### ✅ **Caching & Performance**
- Content service includes caching
- Fast access to frequently used data
- Memory efficient

## 🔧 Technical Details

### Content Service Methods

```javascript
import { contentService } from './services/contentService';

// Get specific data
const header = contentService.getHeader();
const experience = contentService.getExperience();
const skills = contentService.getSkills();

// Generate formatted content
const markdown = contentService.generateMarkdown('experience');
const fullMarkdown = contentService.generateFullMarkdown();
const pdfContent = contentService.getPDFContent();

// Utility methods
const sections = contentService.getAvailableContent();
const validation = contentService.validateContent();
```

### JSON Schema

The resume.json file follows this structure:

```json
{
  "header": {
    "name": "string",
    "title": "string", 
    "location": "string",
    "email": "string",
    "phone": "string",
    "linkedin": "string"
  },
  "experience": [
    {
      "title": "string",
      "company": "string",
      "location": "string", 
      "period": "string",
      "achievements": ["string"],
      "techStack": "string"
    }
  ],
  "skills": {
    "languages": ["string"],
    "frameworks": ["string"],
    "cloudInfra": ["string"],
    "concepts": ["string"],
    "databases": ["string"],
    "testing": ["string"],
    "others": ["string"]
  },
  "education": {
    "degree": "string",
    "school": "string",
    "year": "string"
  },
  "languages": [
    {
      "name": "string",
      "level": "string"
    }
  ],
  "references": "string"
}
```

## 🚀 Migration from Old System

If you're migrating from the old content system:

1. **Content**: Move all content to `src/data/resume.json`
2. **Components**: Update to use `contentService.getXXX()` methods
3. **PDF**: Already updated to use JSON content
4. **Markdown**: Auto-generated from JSON

## 🔍 Validation

The system includes content validation:

```javascript
const validation = contentService.validateContent();
console.log(validation);
// {
//   isValid: true,
//   missingSections: [],
//   totalSections: 6,
//   availableSections: ['header', 'experience', 'skills', ...]
// }
```

## 📚 Best Practices

1. **Always update `resume.json`** - never edit generated files
2. **Use markdown formatting** in achievements for web display
3. **Keep tech stacks concise** - they appear in both web and PDF
4. **Run validation** after major content changes
5. **Test all outputs** after content updates

## 🛠️ Development

### Adding New Sections

1. Add section to `resume.json`
2. Update `contentService.getAvailableContent()`
3. Add markdown generation method
4. Update PDF generation if needed
5. Add validation rules

### Adding New Output Formats

1. Create new service method in `contentService.js`
2. Implement format-specific logic
3. Add caching if needed
4. Update documentation

---

This system ensures **maintainability**, **consistency**, and **scalability** for your resume content management! 🎯
