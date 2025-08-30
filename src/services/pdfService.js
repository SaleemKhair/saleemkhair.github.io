import jsPDF from "jspdf";
import { getThemeValue } from "../config/theme";

class PDFService {
  constructor() {
    this.config = {
      backgroundColor: getThemeValue("pdf.backgroundColor", "#ffffff"),
      textColor: getThemeValue("pdf.textColor", "#000000"),
      format: getThemeValue("pdf.pageSize", "a4"),
      orientation: getThemeValue("pdf.orientation", "p"),
      margins: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20,
      },
      fontSizes: {
        title: 24,
        subtitle: 18,
        heading: 16,
        subheading: 14,
        body: 12,
        small: 10,
      },
      lineHeight: 1.4,
      sectionSpacing: 15,
      maxLinesPerPage: 25, // Maximum lines per page
      lineSpacing: 4, // Vertical spacing between lines in mm
    };
  }

  async generatePDF() {
    try {
      const pdf = new jsPDF({
        orientation: this.config.orientation,
        unit: "mm",
        format: this.config.format,
      });

      // Set initial position
      let yPosition = this.config.margins.top;
      const pageWidth = pdf.internal.pageSize.getWidth();
      const contentWidth = pageWidth - this.config.margins.left - this.config.margins.right;
      let lineCount = 0;

      // Add header
      const headerResult = this.addHeader(pdf, yPosition, contentWidth);
      yPosition = headerResult.yPosition;
      lineCount = headerResult.lineCount;

      // Add sections
      const aboutResult = await this.addAboutSection(pdf, yPosition, contentWidth, lineCount);
      yPosition = aboutResult.yPosition;
      lineCount = aboutResult.lineCount;

      const experienceResult = await this.addExperienceSection(pdf, yPosition, contentWidth, lineCount);
      yPosition = experienceResult.yPosition;
      lineCount = experienceResult.lineCount;

      const skillsResult = await this.addSkillsSection(pdf, yPosition, contentWidth, lineCount);
      yPosition = skillsResult.yPosition;
      lineCount = skillsResult.lineCount;

      const educationResult = await this.addEducationSection(pdf, yPosition, contentWidth, lineCount);
      yPosition = educationResult.yPosition;
      lineCount = educationResult.lineCount;

      const contactResult = await this.addContactSection(pdf, yPosition, contentWidth, lineCount);
      yPosition = contactResult.yPosition;
      lineCount = contactResult.lineCount;

      // Save the PDF
      const fileName = `Saleem_Khair_Resume_${new Date().getFullYear()}.pdf`;
      pdf.save(fileName);

      return fileName;
    } catch (error) {
      console.error("PDF generation failed:", error);
      throw error;
    }
  }

  addHeader(pdf, yPosition, contentWidth) {
    let lineCount = 0;
    
    // Name
    pdf.setFontSize(this.config.fontSizes.title);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(26, 54, 93); // Dark blue
    pdf.text("Saleem Khair", this.config.margins.left, yPosition);
    yPosition += 8;
    lineCount += 1;

    // Title
    pdf.setFontSize(this.config.fontSizes.subtitle);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(74, 85, 104); // Gray
    pdf.text("Senior Backend Engineer | FinTech & Payment Systems", this.config.margins.left, yPosition);
    yPosition += this.config.sectionSpacing;
    lineCount += 1;

    // Contact info
    pdf.setFontSize(this.config.fontSizes.body);
    const contactInfo = [
      "Email: saleem.khair@example.com",
      "Phone: +1 (555) 123-4567",
      "Location: San Francisco, CA",
      "LinkedIn: linkedin.com/in/saleemkhair",
      "GitHub: github.com/SaleemKhair"
    ];

    contactInfo.forEach(info => {
      pdf.text(info, this.config.margins.left, yPosition);
      yPosition += 5;
      lineCount += 1;
    });

    yPosition += this.config.sectionSpacing;
    return { yPosition, lineCount };
  }

  async addAboutSection(pdf, yPosition, contentWidth, lineCount) {
    const result = this.addSectionTitle(pdf, yPosition, "About Me", lineCount);
    yPosition = result.yPosition;
    lineCount = result.lineCount;
    
    const aboutText = `I'm a passionate Senior Backend Engineer with over 8 years of experience specializing in FinTech and payment systems. I've led the development of high-scale applications processing millions of transactions, designed robust microservices architectures, and implemented cutting-edge payment integrations.`;

    const textResult = this.addWrappedText(pdf, yPosition, aboutText, contentWidth, lineCount);
    yPosition = textResult.yPosition + this.config.sectionSpacing;
    lineCount = textResult.lineCount;
    
    return { yPosition, lineCount };
  }

  async addExperienceSection(pdf, yPosition, contentWidth, lineCount) {
    const result = this.addSectionTitle(pdf, yPosition, "Professional Experience", lineCount);
    yPosition = result.yPosition;
    lineCount = result.lineCount;

    const experiences = [
      {
        title: "Senior Backend Engineer",
        company: "TechCorp Inc.",
        period: "2022 - Present",
        location: "San Francisco, CA",
        highlights: [
          "Led development of unified payment integration service handling 100,000+ transactions and $1.7M+ TPV",
          "Designed and implemented microservices architecture reducing system latency by 40%",
          "Mentored 5 junior developers and established coding standards and best practices",
          "Collaborated with cross-functional teams to deliver high-impact features"
        ]
      },
      {
        title: "Backend Engineer",
        company: "FinTech Solutions Ltd.",
        period: "2020 - 2022",
        location: "New York, NY",
        highlights: [
          "Built scalable REST APIs serving 10M+ requests daily",
          "Implemented real-time payment processing system with 99.9% uptime",
          "Optimized database queries improving response times by 60%",
          "Integrated multiple payment gateways (Stripe, PayPal, Square)"
        ]
      },
      {
        title: "Software Engineer",
        company: "Digital Payments Co.",
        period: "2018 - 2020",
        location: "Austin, TX",
        highlights: [
          "Developed secure authentication and authorization systems",
          "Created automated testing framework improving code coverage to 90%",
          "Participated in code reviews and technical architecture discussions",
          "Contributed to open-source projects and internal tooling"
        ]
      }
    ];

    for (const exp of experiences) {
      const pageBreakResult = this.checkPageBreak(pdf, yPosition, 40, lineCount);
      yPosition = pageBreakResult.yPosition;
      lineCount = pageBreakResult.lineCount;
      
      // Job title and company
      pdf.setFontSize(this.config.fontSizes.heading);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(26, 54, 93);
      pdf.text(exp.title, this.config.margins.left, yPosition);
      yPosition += 6;
      lineCount += 1;

      // Company and period
      pdf.setFontSize(this.config.fontSizes.subheading);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(74, 85, 104);
      pdf.text(`${exp.company} | ${exp.period} | ${exp.location}`, this.config.margins.left, yPosition);
      yPosition += 8;
      lineCount += 1;

      // Highlights
      pdf.setFontSize(this.config.fontSizes.body);
      pdf.setTextColor(45, 55, 72);
      
      for (const highlight of exp.highlights) {
        const highlightResult = this.checkPageBreak(pdf, yPosition, 15, lineCount);
        yPosition = highlightResult.yPosition;
        lineCount = highlightResult.lineCount;
        
        const textResult = this.addWrappedText(pdf, yPosition, `• ${highlight}`, contentWidth - 5, lineCount, 5);
        yPosition = textResult.yPosition + 3;
        lineCount = textResult.lineCount;
      }
      
      yPosition += 8;
    }

    return { yPosition, lineCount };
  }

  async addSkillsSection(pdf, yPosition, contentWidth, lineCount) {
    const result = this.addSectionTitle(pdf, yPosition, "Technical Skills", lineCount);
    yPosition = result.yPosition;
    lineCount = result.lineCount;

    const skills = {
      "Programming Languages": "JavaScript (Node.js), Python, Java, TypeScript, Go",
      "Databases": "PostgreSQL, MongoDB, Redis, MySQL, Elasticsearch",
      "Cloud & DevOps": "AWS, Docker, Kubernetes, CI/CD, Terraform, Jenkins",
      "Payment Systems": "Stripe, PayPal, Square, Adyen, Payment Gateway APIs",
      "Frameworks & Tools": "Express.js, Django, Spring Boot, React, GraphQL, REST APIs",
      "Architecture": "Microservices, Event-Driven Architecture, CQRS, DDD"
    };

    const skillsPerRow = 2;
    const skillEntries = Object.entries(skills);
    
    for (let i = 0; i < skillEntries.length; i += skillsPerRow) {
      const pageBreakResult = this.checkPageBreak(pdf, yPosition, 20, lineCount);
      yPosition = pageBreakResult.yPosition;
      lineCount = pageBreakResult.lineCount;
      
      const row = skillEntries.slice(i, i + skillsPerRow);
      const columnWidth = (contentWidth - 10) / skillsPerRow;
      
      // eslint-disable-next-line no-loop-func
      row.forEach(([category, skills], index) => {
        const x = this.config.margins.left + (index * (columnWidth + 10));
        
        // Category
        pdf.setFontSize(this.config.fontSizes.subheading);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(26, 54, 93);
        pdf.text(category, x, yPosition);
        yPosition += 5;
        lineCount += 1;
        
        // Skills
        pdf.setFontSize(this.config.fontSizes.body);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(45, 55, 72);
        const wrappedSkills = this.wrapText(skills, columnWidth - 5, pdf);
        wrappedSkills.forEach(line => {
          pdf.text(line, x, yPosition);
          yPosition += 4;
          lineCount += 1;
        });
        
        yPosition += 3;
      });
      
      yPosition += 5;
    }

    return { yPosition, lineCount };
  }

  async addEducationSection(pdf, yPosition, contentWidth, lineCount) {
    const result = this.addSectionTitle(pdf, yPosition, "Education", lineCount);
    yPosition = result.yPosition;
    lineCount = result.lineCount;

    const education = {
      degree: "Bachelor of Science in Computer Science",
      school: "University of Technology",
      period: "2014 - 2018",
      location: "San Francisco, CA",
      gpa: "3.8/4.0",
      relevant: "Data Structures, Algorithms, Software Engineering, Database Systems"
    };

    const pageBreakResult = this.checkPageBreak(pdf, yPosition, 30, lineCount);
    yPosition = pageBreakResult.yPosition;
    lineCount = pageBreakResult.lineCount;
    
    pdf.setFontSize(this.config.fontSizes.heading);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(26, 54, 93);
    pdf.text(education.degree, this.config.margins.left, yPosition);
    yPosition += 6;
    lineCount += 1;

    pdf.setFontSize(this.config.fontSizes.subheading);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(74, 85, 104);
    pdf.text(`${education.school} | ${education.period} | ${education.location}`, this.config.margins.left, yPosition);
    yPosition += 6;
    lineCount += 1;

    pdf.setFontSize(this.config.fontSizes.body);
    pdf.setTextColor(45, 55, 72);
    pdf.text(`GPA: ${education.gpa}`, this.config.margins.left, yPosition);
    yPosition += 6;
    lineCount += 1;

    const textResult = this.addWrappedText(pdf, yPosition, `Relevant Coursework: ${education.relevant}`, contentWidth, lineCount);
    yPosition = textResult.yPosition + this.config.sectionSpacing;
    lineCount = textResult.lineCount;

    return { yPosition, lineCount };
  }

  async addContactSection(pdf, yPosition, contentWidth, lineCount) {
    const result = this.addSectionTitle(pdf, yPosition, "Contact Information", lineCount);
    yPosition = result.yPosition;
    lineCount = result.lineCount;

    const contacts = [
      "Email: saleem.khair@example.com",
      "Phone: +1 (555) 123-4567",
      "LinkedIn: linkedin.com/in/saleemkhair",
      "GitHub: github.com/SaleemKhair",
      "Portfolio: saleemkhair.com"
    ];

    pdf.setFontSize(this.config.fontSizes.body);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(45, 55, 72);

    contacts.forEach(contact => {
      const pageBreakResult = this.checkPageBreak(pdf, yPosition, 10, lineCount);
      yPosition = pageBreakResult.yPosition;
      lineCount = pageBreakResult.lineCount;
      
      pdf.text(contact, this.config.margins.left, yPosition);
      yPosition += 5;
      lineCount += 1;
    });

    return { yPosition, lineCount };
  }

  addSectionTitle(pdf, yPosition, title, lineCount) {
    const pageBreakResult = this.checkPageBreak(pdf, yPosition, 20, lineCount);
    yPosition = pageBreakResult.yPosition;
    lineCount = pageBreakResult.lineCount;
    
    pdf.setFontSize(this.config.fontSizes.heading);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(26, 54, 93);
    pdf.text(title, this.config.margins.left, yPosition);
    yPosition += 8;
    lineCount += 1;
    
    // Add underline
    const titleWidth = pdf.getTextWidth(title);
    pdf.setDrawColor(49, 130, 206);
    pdf.setLineWidth(0.5);
    pdf.line(this.config.margins.left, yPosition, this.config.margins.left + titleWidth, yPosition);
    yPosition += 8;
    lineCount += 1;
    
    return { yPosition, lineCount };
  }

  addWrappedText(pdf, yPosition, text, maxWidth, lineCount, indent = 0) {
    const wrappedLines = this.wrapText(text, maxWidth - indent, pdf);
    
    wrappedLines.forEach(line => {
      const pageBreakResult = this.checkPageBreak(pdf, yPosition, 10, lineCount);
      yPosition = pageBreakResult.yPosition;
      lineCount = pageBreakResult.lineCount;
      
      pdf.text(line, this.config.margins.left + indent, yPosition);
      yPosition += this.config.lineSpacing;
      lineCount += 1;
    });
    
    return { yPosition, lineCount };
  }

  wrapText(text, maxWidth, pdf) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    words.forEach(word => {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const testWidth = pdf.getTextWidth(testLine);
      
      if (testWidth > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    });
    
    if (currentLine) {
      lines.push(currentLine);
    }
    
    return lines;
  }

  checkPageBreak(pdf, yPosition, requiredSpace, lineCount) {
    const pageHeight = pdf.internal.pageSize.getHeight();
    const bottomMargin = this.config.margins.bottom;
    
    // Check if we need a page break based on space or line count
    if (yPosition + requiredSpace > pageHeight - bottomMargin || lineCount >= this.config.maxLinesPerPage) {
      pdf.addPage();
      return { yPosition: this.config.margins.top, lineCount: 0 };
    }
    
    return { yPosition, lineCount };
  }
}

export const pdfService = new PDFService();
