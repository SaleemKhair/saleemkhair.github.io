import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { contentService } from "./contentService";

class PDFService {
  constructor() {
    this.pdf = null;
    this.currentY = 0;
    this.pageHeight = 0;
    this.margin = 20;
    this.lineHeight = 14;
    this.fontSize = 12;
  }

  async generatePDF() {
    try {
      // Create a new PDF document
      this.pdf = new jsPDF("p", "mm", "a4");
      this.pageHeight = this.pdf.internal.pageSize.height;
      this.currentY = this.margin;

      // Get the resume content
      const resumeContent = document.querySelector(".resume-container");
      if (!resumeContent) {
        throw new Error("Resume content not found");
      }

      // Convert HTML to canvas
      const canvas = await html2canvas(resumeContent, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        width: resumeContent.scrollWidth,
        height: resumeContent.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        windowWidth: resumeContent.scrollWidth,
        windowHeight: resumeContent.scrollHeight,
      });

      // Calculate dimensions
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      // Add first page
      this.pdf.addImage(canvas, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        this.pdf.addPage();
        this.pdf.addImage(canvas, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save the PDF
      this.pdf.save("Saleem_Khair_Resume.pdf");

      return true;
    } catch (error) {
      console.error("Error generating PDF:", error);
      throw error;
    }
  }

  // Alternative method using text-based approach for better control
  async generateTextBasedPDF() {
    try {
      this.pdf = new jsPDF("p", "mm", "a4");
      this.pageHeight = this.pdf.internal.pageSize.height;
      this.currentY = this.margin;

      // Get content from the unified content service
      const content = contentService.getPDFContent();

      // Set font
      this.pdf.setFont("helvetica");
      this.pdf.setFontSize(16);

      // Header
      this.addText(content.header.name, "bold", 16);
      this.addText(content.header.title, "normal", 12);
      this.addSpace(10);

      // Contact Info
      this.addText(`Location: ${content.header.location}`, "normal", 10);
      this.addText(`Email: ${content.header.email}`, "normal", 10);
      this.addText(`Mobile: ${content.header.phone}`, "normal", 10);
      this.addText(`LinkedIn: ${content.header.linkedin}`, "normal", 10);
      this.addSpace(15);

      // Professional Experience
      this.addSectionTitle("PROFESSIONAL EXPERIENCE");

      // Add each experience entry
      content.experience.forEach((job) => {
        this.addJobTitle(job.title);
        this.addCompanyInfo(`${job.company} — ${job.location} | ${job.period}`);

        job.achievements.forEach((achievement) => {
          // Remove markdown formatting for PDF
          const cleanAchievement = achievement.replace(/\*\*(.*?)\*\*/g, "$1");
          this.addBulletPoint(cleanAchievement);
        });

        this.addText(`Tech Stack: ${job.techStack}`, "italic", 9);
        this.addSpace(10);
      });

      // Technical Skills
      this.addSectionTitle("TECHNICAL SKILLS");
      Object.entries(content.skills).forEach(([category, items]) => {
        const categoryName =
          category.charAt(0).toUpperCase() + category.slice(1);
        this.addText(`${categoryName}: ${items.join(", ")}`, "normal", 10);
      });
      this.addSpace(15);

      // Education
      this.addSectionTitle("EDUCATION");
      this.addText(content.education.degree, "bold", 12);
      this.addText(
        `${content.education.school} — ${content.education.year}`,
        "normal",
        10
      );
      this.addSpace(15);

      // Languages
      this.addSectionTitle("LANGUAGES");
      content.languages.forEach((lang) => {
        this.addText(`${lang.name} – ${lang.level}`, "normal", 10);
      });
      this.addSpace(15);

      // References
      this.addSectionTitle("REFERENCES");
      this.addText(content.references, "normal", 10);

      // Save the PDF
      this.pdf.save("Saleem_Khair_Resume.pdf");
      return true;
    } catch (error) {
      console.error("Error generating PDF:", error);
      throw error;
    }
  }

  addText(text, style = "normal", fontSize = 12) {
    if (this.currentY > this.pageHeight - this.margin) {
      this.pdf.addPage();
      this.currentY = this.margin;
    }

    this.pdf.setFontSize(fontSize);
    if (style === "bold") {
      this.pdf.setFont("helvetica", "bold");
    } else if (style === "italic") {
      this.pdf.setFont("helvetica", "italic");
    } else {
      this.pdf.setFont("helvetica", "normal");
    }

    // Handle text wrapping
    const maxWidth = 170; // A4 width minus margins
    const lines = this.pdf.splitTextToSize(text, maxWidth);

    for (let line of lines) {
      if (this.currentY > this.pageHeight - this.margin) {
        this.pdf.addPage();
        this.currentY = this.margin;
      }
      this.pdf.text(line, this.margin, this.currentY);
      this.currentY += fontSize * 0.4;
    }
  }

  addSectionTitle(title) {
    this.addSpace(5);
    this.addText(title, "bold", 14);
    this.addSpace(3);
  }

  addJobTitle(title) {
    this.addText(title, "bold", 12);
  }

  addCompanyInfo(info) {
    this.addText(info, "normal", 10);
    this.addSpace(2);
  }

  addBulletPoint(text) {
    this.addText(`• ${text}`, "normal", 10);
  }

  addSpace(points) {
    this.currentY += points;
  }
}

export const pdfService = new PDFService();
