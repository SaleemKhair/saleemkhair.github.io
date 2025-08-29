# Services Layer

This directory contains all service classes that handle business logic and external integrations, following clean architecture principles.

## Architecture

Services are responsible for:

- **Business Logic**: Complex operations and data processing
- **External Integrations**: API calls, file operations, third-party services
- **State Management**: Managing application state outside of React components
- **Error Handling**: Centralized error handling and logging

## Service Structure

Each service follows this pattern:

```javascript
class ServiceName {
  constructor() {
    // Initialize configuration and dependencies
  }

  // Public methods for external use
  async publicMethod() {
    // Implementation
  }

  // Private helper methods
  _privateMethod() {
    // Internal logic
  }
}

// Export singleton instance
export const serviceName = new ServiceName();
export default ServiceName;
```

## Available Services

### PDFService (`pdfService.js`)

Handles PDF generation and export functionality.

**Features:**

- DOM preparation for PDF generation
- Canvas generation with html2canvas
- PDF creation with jsPDF
- Proper pagination and page breaks
- DOM state restoration
- Configurable PDF options

**Usage:**

```javascript
import { pdfService } from "../services";

// Generate and download PDF
await pdfService.generateAndDownloadPDF();

// Generate PDF with custom options
const pdfBlob = await pdfService.generatePDF(".resume-container", {
  format: "letter",
  orientation: "l",
});

// Get available formats
const formats = pdfService.getAvailableFormats();
```

### ContentService (`contentService.js`)

Handles markdown content loading and management.

**Features:**

- Content caching for performance
- Fallback content for development
- Retry logic for network requests
- Content validation and error handling
- Configurable loading options

**Usage:**

```javascript
import { contentService } from "../services";

// Get content synchronously (with fallback)
const content = contentService.getMarkdownContent("header");

// Load content asynchronously
const content = await contentService.loadMarkdownContent("experience");

// Get cache statistics
const stats = contentService.getCacheStats();

// Clear cache
contentService.clearCache();
```

## Adding New Services

1. Create a new service file: `src/services/newService.js`
2. Follow the service class pattern
3. Export singleton instance and class
4. Add to `src/services/index.js`
5. Update this README

## Best Practices

- **Single Responsibility**: Each service handles one domain
- **Error Handling**: Proper try-catch blocks and error propagation
- **Configuration**: Use constructor for configuration
- **Documentation**: JSDoc comments for all public methods
- **Testing**: Services should be easily testable
- **Dependency Injection**: Accept dependencies in constructor when needed

## Testing Services

Services can be tested independently:

```javascript
import PDFService from "../services/pdfService";

describe("PDFService", () => {
  let pdfService;

  beforeEach(() => {
    pdfService = new PDFService();
  });

  test("should generate PDF", async () => {
    // Test implementation
  });
});
```
