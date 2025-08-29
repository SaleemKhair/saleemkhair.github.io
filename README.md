# Saleem Khair - Professional Resume Website

A modern, animated Single Page Application (SPA) showcasing Saleem Khair's professional resume with a focus on FinTech and Payment Systems expertise.

## Features

- 🎨 **Professional Design**: Modern UI with fintech-inspired color scheme
- ✨ **Smooth Animations**: Framer Motion powered scroll animations and transitions
- 📱 **Responsive**: Fully responsive design for all devices
- 🎯 **CMS-like Structure**: Content separated into markdown files for easy editing
- 🚀 **GitHub Pages Ready**: Optimized for static hosting
- 🔧 **Easy Maintenance**: Update content without touching code
- 📄 **Download Options**: Export resume as PDF or Markdown

## Tech Stack

- **React 18** - Modern React with hooks
- **Framer Motion** - Smooth animations and transitions
- **React Markdown** - Markdown rendering
- **Lucide React** - Beautiful icons
- **jsPDF & html2canvas** - PDF generation
- **CSS3** - Custom styling with gradients and animations

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/saleemkhair/saleemkhair.git
cd saleemkhair
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## Download Features

The resume website includes download functionality for both PDF and Markdown formats:

### PDF Download
- **High Quality**: Generates professional PDF with proper formatting
- **Multi-page Support**: Automatically handles long content across multiple pages
- **A4 Format**: Optimized for standard paper size
- **Loading State**: Shows progress indicator during generation

### Markdown Download
- **Complete Resume**: Downloads all content as a single markdown file
- **Instant Download**: No processing time required
- **Editable Format**: Can be easily modified in any text editor
- **Version Control Friendly**: Perfect for git repositories

### How to Use
- **Desktop**: Download buttons appear in the top-right corner
- **Mobile**: Buttons stack vertically for better accessibility
- **PDF Generation**: Click the red PDF button and wait for processing
- **Markdown Download**: Click the blue Markdown button for instant download

## Content Management

The website uses a CMS-like structure where content is separated into markdown files located in `src/content/`:

- `header.md` - Name, title, and contact information
- `experience.md` - Professional experience
- `skills.md` - Technical skills
- `education.md` - Education background
- `languages.md` - Language proficiency
- `references.md` - References and links

### Updating Content

To update any section, simply edit the corresponding markdown file. The changes will be reflected immediately in the website.

Example: To update your experience, edit `src/content/experience.md`:

```markdown
## PROFESSIONAL EXPERIENCE

### New Position
**Company Name** — Location | **Date Range**

* Achievement 1
* Achievement 2
* Achievement 3

**Tech Stack:** Technology 1, Technology 2, Technology 3
```

## Deployment to GitHub Pages

### Automatic Deployment

1. Push your changes to the main branch
2. Run the deployment command:
```bash
npm run deploy
```

This will build the project and deploy it to GitHub Pages.

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Copy the contents of the `build` folder to your GitHub Pages branch or hosting provider.

## Customization

### Color Scheme

The color scheme reflects professionalism in the payment/fintech industry. To customize colors, edit the CSS variables in `src/App.css`:

```css
/* Primary colors */
--primary-dark: #1a365d;
--primary: #3182ce;
--primary-light: #63b3ed;

/* Background gradient */
background: linear-gradient(135deg, 
  #1a365d 0%, 
  #2c5282 25%, 
  #3182ce 50%, 
  #4299e1 75%, 
  #63b3ed 100%);
```

### Animations

Animations are powered by Framer Motion. To customize animations, edit the animation variants in each component:

```javascript
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
```

### Layout

The layout is responsive and uses CSS Grid and Flexbox. Main layout classes:

- `.resume-container` - Main content container
- `.section` - Individual sections
- `.header-section` - Header styling
- `.experience-item` - Experience entries

## File Structure

```
saleemkhair/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Experience.js
│   │   ├── Skills.js
│   │   ├── Education.js
│   │   ├── Languages.js
│   │   └── References.js
│   ├── content/
│   │   ├── header.md
│   │   ├── experience.md
│   │   ├── skills.md
│   │   ├── education.md
│   │   ├── languages.md
│   │   └── references.md
│   ├── utils/
│   │   └── markdownLoader.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

The website is optimized for performance with:

- Lazy loading animations
- Optimized images and assets
- Minimal bundle size
- Efficient CSS animations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

For questions or support, please contact:
- Email: saleemkhair@gmail.com
- LinkedIn: [Saleem Khair](https://www.linkedin.com/in/saleem-khair-359795108)
