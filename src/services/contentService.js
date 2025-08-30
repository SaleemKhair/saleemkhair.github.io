import resumeData from '../data/resume.json';

/**
 * JSON-based Content Service
 * 
 * This service provides a single source of truth for all resume content
 * by loading from JSON data and providing DTO-based access patterns.
 * 
 * Benefits:
 * - Single source of truth (JSON file)
 * - Type-safe data access
 * - Easy to maintain and update
 * - Supports multiple output formats (markdown, PDF, etc.)
 * - Extensible for future content types
 */
class ContentService {
  constructor() {
    this.data = resumeData;
    this.cache = new Map();
  }

  // ===== DATA ACCESS METHODS (DTO Pattern) =====

  /**
   * Get header information
   * @returns {Object} Header DTO
   */
  getHeader() {
    return { ...this.data.header };
  }

  /**
   * Get all experience entries
   * @returns {Array} Array of experience DTOs
   */
  getExperience() {
    return [...this.data.experience];
  }

  /**
   * Get specific experience entry by index
   * @param {number} index - Experience entry index
   * @returns {Object} Experience DTO
   */
  getExperienceEntry(index) {
    if (index >= 0 && index < this.data.experience.length) {
      return { ...this.data.experience[index] };
    }
    return null;
  }

  /**
   * Get skills organized by category
   * @returns {Object} Skills DTO
   */
  getSkills() {
    return { ...this.data.skills };
  }

  /**
   * Get education information
   * @returns {Object} Education DTO
   */
  getEducation() {
    return { ...this.data.education };
  }

  /**
   * Get languages
   * @returns {Array} Array of language DTOs
   */
  getLanguages() {
    return [...this.data.languages];
  }

  /**
   * Get references
   * @returns {string} References text
   */
  getReferences() {
    return this.data.references;
  }

  /**
   * Get all content as a single DTO
   * @returns {Object} Complete resume DTO
   */
  getAllContent() {
    return {
      header: this.getHeader(),
      experience: this.getExperience(),
      skills: this.getSkills(),
      education: this.getEducation(),
      languages: this.getLanguages(),
      references: this.getReferences()
    };
  }

  // ===== FORMAT CONVERSION METHODS =====

  /**
   * Generate markdown content for any section
   * @param {string} section - Section name
   * @returns {string} Markdown content
   */
  generateMarkdown(section) {
    const cacheKey = `markdown_${section}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    let markdown = '';
    switch (section) {
      case 'header':
        markdown = this.generateHeaderMarkdown();
        break;
      case 'experience':
        markdown = this.generateExperienceMarkdown();
        break;
      case 'skills':
        markdown = this.generateSkillsMarkdown();
        break;
      case 'education':
        markdown = this.generateEducationMarkdown();
        break;
      case 'languages':
        markdown = this.generateLanguagesMarkdown();
        break;
      case 'references':
        markdown = this.generateReferencesMarkdown();
        break;
      default:
        markdown = '';
    }

    this.cache.set(cacheKey, markdown);
    return markdown;
  }

  /**
   * Generate complete markdown resume
   * @returns {string} Complete markdown resume
   */
  generateFullMarkdown() {
    const cacheKey = 'markdown_full';
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const sections = ['header', 'experience', 'skills', 'education', 'languages', 'references'];
    const markdown = sections.map(section => this.generateMarkdown(section)).join('\n\n');
    
    this.cache.set(cacheKey, markdown);
    return markdown;
  }

  /**
   * Get content optimized for PDF generation (plain text without markdown)
   * @returns {Object} PDF-optimized content DTO
   */
  getPDFContent() {
    const cacheKey = 'pdf_content';
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const content = {
      header: this.getHeader(),
      experience: this.getExperience().map(job => ({
        ...job,
        achievements: job.achievements.map(achievement => 
          achievement.replace(/\*\*(.*?)\*\*/g, '$1')
        )
      })),
      skills: this.getSkills(),
      education: this.getEducation(),
      languages: this.getLanguages(),
      references: this.getReferences()
    };

    this.cache.set(cacheKey, content);
    return content;
  }

  // ===== PRIVATE MARKDOWN GENERATION METHODS =====

  generateHeaderMarkdown() {
    const header = this.data.header;
    return `# ${header.name}\n\n${header.title}\n\n---\n\n**Location**: ${header.location}\n\n**Email**: [${header.email}](mailto:${header.email})\n\n**Mobile No.**: [${header.phone}](tel:${header.phone})\n\n[**LinkedIn Profile**](${header.linkedin})\n\n---`;
  }

  generateExperienceMarkdown() {
    let markdown = '## PROFESSIONAL EXPERIENCE\n\n';
    
    this.data.experience.forEach(job => {
      markdown += `### ${job.title}\n\n**${job.company}** — ${job.location} | **${job.period}**\n\n`;
      
      job.achievements.forEach(achievement => {
        markdown += `- ${achievement}\n`;
      });
      
      markdown += `\n**Tech Stack**: ${job.techStack}\n\n---\n\n`;
    });
    
    return markdown.trim();
  }

  generateSkillsMarkdown() {
    const skills = this.data.skills;
    let markdown = '## TECHNICAL SKILLS\n\n';
    
    Object.entries(skills).forEach(([category, items]) => {
      const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
      markdown += `**${categoryName}**: ${items.join(', ')}\n\n`;
    });
    
    return markdown.trim();
  }

  generateEducationMarkdown() {
    const education = this.data.education;
    return `## EDUCATION\n\n**${education.degree}**\n\n${education.school} — **${education.year}**`;
  }

  generateLanguagesMarkdown() {
    let markdown = '## LANGUAGES\n\n';
    this.data.languages.forEach(lang => {
      markdown += `- **${lang.name}** – ${lang.level}\n`;
    });
    return markdown.trim();
  }

  generateReferencesMarkdown() {
    return `## REFERENCES\n\n${this.data.references} or on [LinkedIn](${this.data.header.linkedin})`;
  }

  // ===== UTILITY METHODS =====

  /**
   * Get available content sections
   * @returns {Array} List of available section names
   */
  getAvailableContent() {
    return ['header', 'experience', 'skills', 'education', 'languages', 'references'];
  }

  /**
   * Clear the content cache
   */
  clearCache() {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   * @returns {Object} Cache statistics
   */
  getCacheStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
      hitRate: this.cache.size > 0 ? 'N/A' : '0%'
    };
  }

  /**
   * Update content (for future content management)
   * @param {Object} newContent - New content to merge
   */
  updateContent(newContent) {
    this.data = { ...this.data, ...newContent };
    this.clearCache(); // Clear cache when content changes
  }

  /**
   * Get content for specific section (for backward compatibility)
   * @param {string} section - Section name
   * @returns {string} Markdown content
   */
  getMarkdownContent(section) {
    return this.generateMarkdown(section);
  }

  /**
   * Validate content structure
   * @returns {Object} Validation result
   */
  validateContent() {
    const requiredSections = ['header', 'experience', 'skills', 'education', 'languages', 'references'];
    const missingSections = requiredSections.filter(section => !this.data[section]);
    
    return {
      isValid: missingSections.length === 0,
      missingSections,
      totalSections: requiredSections.length,
      availableSections: Object.keys(this.data)
    };
  }
}

// Export singleton instance
export const contentService = new ContentService();

// Export class for testing or custom instances
export default ContentService;

