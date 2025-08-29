import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { getThemeValue } from "../config/theme";

/**
 * PDF Generation Service
 * Handles all PDF export functionality with proper error handling and configuration
 */
class PDFService {
  constructor() {
    this.config = {
      pageWidth: 210, // A4 width in mm
      pageHeight: 295, // A4 height in mm
      scale: 2, // Canvas scale for better quality
      backgroundColor: getThemeValue("pdf.backgroundColor", "#ffffff"),
      format: getThemeValue("pdf.pageSize", "a4"),
      orientation: getThemeValue("pdf.orientation", "p"),
      unit: "mm",
    };
  }

  /**
   * Generate PDF from resume container
   * @param {string} containerSelector - CSS selector for the resume container
   * @param {Object} options - Optional configuration overrides
   * @returns {Promise<Blob>} - PDF blob
   */
  async generatePDF(containerSelector = ".resume-container", options = {}) {
    try {
      const resumeContainer = document.querySelector(containerSelector);
      if (!resumeContainer) {
        throw new Error("Resume container not found");
      }

      // Merge options with default config
      const config = { ...this.config, ...options };

      // Prepare DOM for PDF generation
      const originalState = await this.prepareDOMForPDF(resumeContainer);

      // Generate canvas from container
      const canvas = await this.generateCanvas(resumeContainer, config);

      // Restore DOM to original state
      this.restoreDOM(originalState);

      // Create PDF from canvas
      const pdf = await this.createPDFFromCanvas(canvas, config);

      return pdf;
    } catch (error) {
      console.error("PDF generation failed:", error);
      throw new Error(`PDF generation failed: ${error.message}`);
    }
  }

  /**
   * Prepare DOM elements for PDF generation
   * @param {HTMLElement} container - Resume container element
   * @returns {Object} - Original DOM state to restore later
   */
  async prepareDOMForPDF(container) {
    // Store original scroll position and styles
    const originalState = {
      scrollY: window.scrollY,
      bodyOverflow: document.body.style.overflow,
      containerStyles: {
        height: container.style.height,
        overflow: container.style.overflow,
        position: container.style.position,
      },
      downloadButtons: {
        element: document.querySelector(".download-buttons"),
        originalDisplay: null,
      },
      animatedElements: [],
    };

    // Add PDF mode class
    document.body.classList.add("pdf-mode");

    // Hide download buttons
    if (originalState.downloadButtons.element) {
      originalState.downloadButtons.originalDisplay =
        originalState.downloadButtons.element.style.display;
      originalState.downloadButtons.element.style.display = "none";
    }

    // Handle animated elements
    const animatedElements = container.querySelectorAll(
      '[style*="opacity"], [style*="transform"]'
    );
    animatedElements.forEach((element, index) => {
      originalState.animatedElements[index] = {
        element,
        originalStyles: {
          opacity: element.style.opacity,
          transform: element.style.transform,
          visibility: element.style.visibility,
        },
      };

      // Force visibility
      element.style.opacity = "1";
      element.style.transform = "none";
      element.style.visibility = "visible";
    });

    // Ensure container is fully expanded
    container.style.height = "auto";
    container.style.overflow = "visible";
    container.style.position = "relative";

    // Scroll to top and hide body overflow
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";

    // Force reflow
    const _ = container.offsetHeight;

    // Wait for animations to settle
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return originalState;
  }

  /**
   * Generate canvas from container
   * @param {HTMLElement} container - Resume container element
   * @param {Object} config - PDF configuration
   * @returns {Promise<HTMLCanvasElement>} - Generated canvas
   */
  async generateCanvas(container, config) {
    return await html2canvas(container, {
      scale: config.scale,
      useCORS: true,
      allowTaint: true,
      backgroundColor: config.backgroundColor,
      width: container.scrollWidth,
      height: container.scrollHeight,
      scrollX: 0,
      scrollY: 0,
      windowWidth: container.scrollWidth,
      windowHeight: container.scrollHeight,
      logging: false,
      removeContainer: false,
      foreignObjectRendering: false,
    });
  }

  /**
   * Create PDF from canvas with proper pagination
   * @param {HTMLCanvasElement} canvas - Generated canvas
   * @param {Object} config - PDF configuration
   * @returns {Promise<Blob>} - PDF blob
   */
  async createPDFFromCanvas(canvas, config) {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF(config.orientation, config.unit, config.format);

    // Calculate image dimensions to fit page width
    const imgWidth = config.pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Calculate number of pages needed
    const pagesNeeded = Math.ceil(imgHeight / config.pageHeight);

    // Add first page
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

    // Add additional pages if needed
    for (let i = 1; i < pagesNeeded; i++) {
      pdf.addPage();
      const yOffset = -(i * config.pageHeight);
      pdf.addImage(imgData, "PNG", 0, yOffset, imgWidth, imgHeight);
    }

    return pdf.output("blob");
  }

  /**
   * Restore DOM to original state
   * @param {Object} originalState - Original DOM state
   */
  restoreDOM(originalState) {
    // Restore animated elements
    originalState.animatedElements.forEach(({ element, originalStyles }) => {
      if (originalStyles) {
        element.style.opacity = originalStyles.opacity;
        element.style.transform = originalStyles.transform;
        element.style.visibility = originalStyles.visibility;
      }
    });

    // Restore container styles
    const container = document.querySelector(".resume-container");
    if (container) {
      container.style.height = originalState.containerStyles.height;
      container.style.overflow = originalState.containerStyles.overflow;
      container.style.position = originalState.containerStyles.position;
    }

    // Restore scroll position and body overflow
    window.scrollTo(0, originalState.scrollY);
    document.body.style.overflow = originalState.bodyOverflow;

    // Restore download buttons
    if (
      originalState.downloadButtons.element &&
      originalState.downloadButtons.originalDisplay !== null
    ) {
      originalState.downloadButtons.element.style.display =
        originalState.downloadButtons.originalDisplay;
    }

    // Remove PDF mode class
    document.body.classList.remove("pdf-mode");
  }

  /**
   * Download PDF with custom filename
   * @param {Blob} pdfBlob - PDF blob
   * @param {string} filename - Filename for download
   */
  downloadPDF(pdfBlob, filename = "saleem-khair-resume.pdf") {
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Generate and download PDF in one operation
   * @param {string} containerSelector - CSS selector for resume container
   * @param {Object} options - PDF configuration options
   * @param {string} filename - Filename for download
   * @returns {Promise<void>}
   */
  async generateAndDownloadPDF(
    containerSelector = ".resume-container",
    options = {},
    filename = "saleem-khair-resume.pdf"
  ) {
    const pdfBlob = await this.generatePDF(containerSelector, options);
    this.downloadPDF(pdfBlob, filename);
  }

  /**
   * Get available PDF formats
   * @returns {Array} - Array of available formats
   */
  getAvailableFormats() {
    return [
      "a0",
      "a1",
      "a2",
      "a3",
      "a4",
      "a5",
      "a6",
      "a7",
      "a8",
      "a9",
      "a10",
      "b0",
      "b1",
      "b2",
      "b3",
      "b4",
      "b5",
      "b6",
      "b7",
      "b8",
      "b9",
      "b10",
      "c0",
      "c1",
      "c2",
      "c3",
      "c4",
      "c5",
      "c6",
      "c7",
      "c8",
      "c9",
      "c10",
      "dl",
      "letter",
      "government-letter",
      "legal",
      "junior-legal",
      "ledger",
      "tabloid",
      "credit-card",
    ];
  }

  /**
   * Get available orientations
   * @returns {Array} - Array of available orientations
   */
  getAvailableOrientations() {
    return ["p", "l"]; // portrait, landscape
  }

  /**
   * Get available units
   * @returns {Array} - Array of available units
   */
  getAvailableUnits() {
    return ["pt", "mm", "cm", "in", "px"];
  }
}

// Export singleton instance
export const pdfService = new PDFService();

// Export class for testing or custom instances
export default PDFService;
