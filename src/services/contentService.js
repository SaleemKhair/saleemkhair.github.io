import React from "react";

/**
 * Content Management Service
 * Handles loading and managing markdown content for the resume sections
 */
class ContentService {
  constructor() {
    this.contentCache = new Map();
    this.config = {
      baseUrl: "/content",
      fallbackEnabled: true,
      cacheEnabled: true,
      retryAttempts: 3,
      retryDelay: 1000,
    };
  }

  /**
   * Load markdown content from file
   * @param {string} filename - Name of the markdown file (without extension)
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

    try {
      const content = await this.fetchContent(filename, config);

      // Cache the content
      if (config.cacheEnabled) {
        this.contentCache.set(filename, content);
      }

      return content;
    } catch (error) {
      console.error(`Error loading markdown content for ${filename}:`, error);

      // Fallback to hardcoded content if enabled
      if (config.fallbackEnabled) {
        return this.getFallbackContent(filename);
      }

      return this.getErrorMessage(filename);
    }
  }

  /**
   * Get markdown content with fallback (synchronous)
   * @param {string} filename - Name of the markdown file
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

    // Return fallback content
    const content = this.getFallbackContent(filename);

    // Cache the content
    if (this.config.cacheEnabled) {
      this.contentCache.set(filename, content);
    }

    return content;
  }

  /**
   * Fetch content from server with retry logic
   * @param {string} filename - Name of the markdown file
   * @param {Object} config - Configuration options
   * @returns {Promise<string>} - Markdown content
   */
  async fetchContent(filename, config) {
    let lastError;

    for (let attempt = 1; attempt <= config.retryAttempts; attempt++) {
      try {
        const response = await fetch(`${config.baseUrl}/${filename}.md`);

        if (!response.ok) {
          throw new Error(
            `Failed to load ${filename}.md: ${response.status} ${response.statusText}`
          );
        }

        return await response.text();
      } catch (error) {
        lastError = error;

        if (attempt < config.retryAttempts) {
          await this.delay(config.retryDelay * attempt);
        }
      }
    }

    throw lastError;
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
   * Get fallback content for development
   * @param {string} filename - Name of the markdown file
   * @returns {string} - Fallback markdown content
   */
  getFallbackContent(filename) {
    const contentMap = {
      header: `# Saleem Khair

## Senior Backend Engineer | FinTech | Payment Systems & Infrastructure

[Amman, Jordan](location) [saleemkhair@gmail.com](mailto:saleemkhair@gmail.com) [+962-79-604-9560](tel:+962796049560) [LinkedIn](https://www.linkedin.com/in/saleem-khair-359795108)`,

      experience: `## PROFESSIONAL EXPERIENCE

### Senior Software Engineer | Driving Principal-Level Initiatives
**Tamatem Games** — on-premise | **May 2021 – Present**

* Designed and built a unified payment integration service handling over **100,000+ transactions** and **\$1.7M+ TPV** across providers like **Tap, Fawry, Buko (Fortumo), Coda, Razor, and MoneyHash**.
* Led backend architecture and API design for payment workflows used by internal and external clients.
* Collaborated with DevOps and product teams to optimize **scalability**, **fault-tolerance**, and **deployment strategies**.
* Managed a **team of 6 engineers** (senior to junior) and handled the full development lifecycle of multiple services.
* Integrated observability via **OpenTelemetry (OTEL)**, **Prometheus**, **Grafana**, **Jaeger**, and **Loki**.
* Delivered high-level documentation, **tech-stack assessments**, and **technical due diligence** for stakeholders and investors.

**Tech Stack:** Python, FastAPI, PostgreSQL, AWS (Lambda, EKS, RDS, S3), Docker w/ Compose, OpenTelemetry, Grafana

---

### Software Development Engineer II - Platform
**Expedia Group** — Amman | **Dec 2019 – May 2021**

* Delivered cross-platform **internal libraries** for use across multiple engineering teams.
* Improved onboarding efficiency through robust documentation and changelogs.
* Implemented automation around marketing and **ad performance pipelines**.

**Tech Stack:** Java, Kotlin, Qubole, AWS (Lambda, S3, EC2, RDS, CodeBuild), Docker, Docker Compose, Splunk, Haystack

---

### Software Development Engineer I - Marketing Technologies
**Expedia Group** — Amman | **May 2018 – Dec 2019**

* Built backend services supporting **advertising generation** and analytics across multiple channels.
* Designed and maintained **event-driven systems** using **Kotlin** and **Spring Boot**.
* Developed automation and data pipelines to support **advertisement generation LLM models**.

**Tech Stack:** Java, Kotlin, Scala, Groovy, Spring & Spring Boot, Qubole, AWS (Lambda, S3, EC2, RDS, CodeBuild), Docker, Docker Compose, Splunk, Haystack

---

### Java Developer
**ProgressSoft** — Amman | **Sep 2016 – Apr 2018**

* Built **banking integrations** supporting **ACH**, **RTGS**, and **EBPP** standards under **ISO 20022** specifications.
* Developed modules for **Bill Presentment and Payment** used by regional banks and payment providers.
* Practiced **agile engineering** with **TDD**, **Clean Code**, **Clean Architecture**, **pair-programming**, and design documentation.

---

### Quality Assurance Analyst - Automation Engineer
**Aspire Infotech** — Amman | **Jan 2016 – Aug 2016**

* Built automated **UI test suites** using **Selenium** and **Appium**.
* Conducted **regression** and **black-box testing** on web/mobile platforms.`,

      skills: `## TECHNICAL SKILLS

**Languages:** Python, Java, Kotlin, Scala  
**Frameworks:** FastAPI, Spring, Spring Boot, JPA, Hibernate  
**Cloud & Infra:** AWS (Lambda, SQS, RDS, CodeBuild, S3, EKS), Docker, Docker Compose, Prometheus, Grafana, Jaeger, Loki  
**Concepts & Tools:** Microservices, TDD, CI/CD, OpenTelemetry, Agile/Scrum, Clean Architecture  
**Databases:** PostgreSQL, MySQL  
**Testing:** Selenium, Appium, JUnit, pytest, SonarQube  
**Others:** Apache Camel, JMS, ActiveMQ, RabbitMQ, Linux`,

      education: `## EDUCATION

**Bachelor of Computer Information Systems**  
University of Jordan — **2015**`,

      languages: `## LANGUAGES

* **Arabic** – Native
* **English** – Fluent`,

      references: `## REFERENCES

Available upon request or on [LinkedIn](https://www.linkedin.com/in/saleem-khair-359795108)`,
    };

    return contentMap[filename] || this.getErrorMessage(filename);
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
   * Get available content files
   * @returns {Array} - List of available content files
   */
  getAvailableContent() {
    return [
      "header",
      "experience",
      "skills",
      "education",
      "languages",
      "references",
    ];
  }

  /**
   * Utility function for delay
   * @param {number} ms - Milliseconds to delay
   * @returns {Promise} - Promise that resolves after delay
   */
  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Export singleton instance
export const contentService = new ContentService();

// Export class for testing or custom instances
export default ContentService;
