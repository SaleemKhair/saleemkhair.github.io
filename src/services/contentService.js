/**
 * Content Management Service
 * Handles loading and managing markdown content for the resume sections
 */
import {
  headerContent,
  experienceContent,
  skillsContent,
  educationContent,
  referencesContent,
  languagesContent,
} from "../content-modules";

class ContentService {
  constructor() {
    this.contentCache = new Map();
    this.contentModules = {
      header: headerContent,
      experience: experienceContent,
      skills: skillsContent,
      education: educationContent,
      references: referencesContent,
      languages: languagesContent,
    };
    this.config = {
      cacheEnabled: true,
    };
  }

  /**
   * Load markdown content from module
   * @param {string} filename - Name of the content module
   * @param {Object} options - Loading options
   * @returns {Promise<string>} - Markdown content
   */
  async loadMarkdownContent(filename, options = {}) {
    if (!this.validateFilename(filename)) {
      return this.getErrorMessage(filename);
    }

    const config = { ...this.config, ...options };

    // Check cache first
    if (config.cacheEnabled && this.contentCache.has(filename)) {
      return this.contentCache.get(filename);
    }

    // Get content from module
    const content = this.getContentFromModule(filename);

    // Cache the content
    if (config.cacheEnabled) {
      this.contentCache.set(filename, content);
    }

    return content;
  }

  /**
   * Get markdown content from module (synchronous)
   * @param {string} filename - Name of the content module
   * @returns {string} - Markdown content
   */
  getMarkdownContent(filename) {
    if (!this.validateFilename(filename)) {
      return this.getErrorMessage(filename);
    }

    // Check cache first
    if (this.config.cacheEnabled && this.contentCache.has(filename)) {
      return this.contentCache.get(filename);
    }

    // Get content from module
    const content = this.getContentFromModule(filename);

    // Cache the content
    if (this.config.cacheEnabled) {
      this.contentCache.set(filename, content);
    }

    return content;
  }

  /**
   * Get content from module
   * @param {string} filename - Name of the content module
   * @returns {string} - Markdown content
   */
  getContentFromModule(filename) {
    if (this.contentModules[filename]) {
      return this.contentModules[filename];
    }

    console.warn(`Content module not found for: ${filename}`);
    return this.getErrorMessage(filename);
  }

  /**
   * Validate filename
   * @param {string} filename - Filename to validate
   * @returns {boolean} - Whether filename is valid
   */
  validateFilename(filename) {
    return (
      filename && typeof filename === "string" && filename.trim().length > 0
    );
  }

  /**
   * Get error message for invalid or missing content
   * @param {string} filename - Filename that caused the error
   * @returns {string} - Error message in markdown format
   */
  getErrorMessage(filename) {
    if (!this.validateFilename(filename)) {
      console.error("Invalid filename provided to content service:", filename);
      return "# Error: Invalid filename";
    }

    console.warn(`Content not found for filename: ${filename}`);
    return `# Content not found for ${filename}\n\nPlease check the file exists and is accessible.`;
  }

  /**
   * Clear content cache
   */
  clearCache() {
    this.contentCache.clear();
  }

  /**
   * Get cache statistics
   * @returns {Object} - Cache statistics
   */
  getCacheStats() {
    return {
      size: this.contentCache.size,
      keys: Array.from(this.contentCache.keys()),
      enabled: this.config.cacheEnabled,
    };
  }

  /**
   * Update service configuration
   * @param {Object} newConfig - New configuration options
   */
  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * Get current configuration
   * @returns {Object} - Current configuration
   */
  getConfig() {
    return { ...this.config };
  }

  /**
   * Get available content modules
   * @returns {Array} - List of available content modules
   */
  getAvailableContent() {
    return Object.keys(this.contentModules);
  }
}

// Export singleton instance
export const contentService = new ContentService();

// Export class for testing or custom instances
export default ContentService;
