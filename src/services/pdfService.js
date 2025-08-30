import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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

      // Set font
      this.pdf.setFont("helvetica");
      this.pdf.setFontSize(16);

      // Header
      this.addText("Saleem Khair", "bold", 16);
      this.addText(
        "Senior Backend Engineer | FinTech | Payment Systems & Infrastructure",
        "normal",
        12
      );
      this.addSpace(10);

      // Contact Info
      this.addText("Location: Amman, Jordan", "normal", 10);
      this.addText("Email: saleemkhair@gmail.com", "normal", 10);
      this.addText("Mobile: +962-79-604-9560", "normal", 10);
      this.addText(
        "LinkedIn: https://www.linkedin.com/in/saleem-khair-359795108",
        "normal",
        10
      );
      this.addSpace(15);

      // Professional Experience
      this.addSectionTitle("PROFESSIONAL EXPERIENCE");

      // Senior Software Engineer
      this.addJobTitle("Senior Software Engineer");
      this.addCompanyInfo("Tamatem Games — on-premise | May 2021 – Present");
      this.addBulletPoint(
        "Designed and built a unified payment integration service handling over 100,000+ transactions and $1.7M+ TPV across providers like Tap, Fawry, Buko (Fortumo), Coda, Razor, and MoneyHash."
      );
      this.addBulletPoint(
        "Led backend architecture and API design for payment workflows used by internal and external clients."
      );
      this.addBulletPoint(
        "Collaborated with DevOps and product teams to optimize scalability, fault-tolerance, and deployment strategies."
      );
      this.addBulletPoint(
        "Managed a team of 6 engineers (senior to junior) and handled the full development lifecycle of multiple services."
      );
      this.addBulletPoint(
        "Integrated observability via OpenTelemetry (OTEL), Prometheus, Grafana, Jaeger, and Loki."
      );
      this.addBulletPoint(
        "Delivered high-level documentation, tech-stack assessments, and technical due diligence for stakeholders and investors."
      );
      this.addText(
        "Tech Stack: Python, FastAPI, PostgreSQL, AWS (Lambda, EKS, RDS, S3), Docker w/ Compose, OpenTelemetry, Grafana",
        "italic",
        9
      );
      this.addSpace(10);

      // Software Development Engineer II
      this.addJobTitle("Software Development Engineer II - Platform");
      this.addCompanyInfo("Expedia Group — Amman | Dec 2019 – May 2021");
      this.addBulletPoint(
        "Delivered cross-platform internal libraries for use across multiple engineering teams."
      );
      this.addBulletPoint(
        "Improved onboarding efficiency through robust documentation and changelogs."
      );
      this.addBulletPoint(
        "Implemented automation around marketing and ad performance pipelines."
      );
      this.addText(
        "Tech Stack: Java, Kotlin, Qubole, AWS (Lambda, S3, EC2, RDS, CodeBuild), Docker, Docker Compose, Splunk, Haystack",
        "italic",
        9
      );
      this.addSpace(10);

      // Software Development Engineer I
      this.addJobTitle(
        "Software Development Engineer I - Marketing Technologies"
      );
      this.addCompanyInfo("Expedia Group — Amman | May 2018 – Dec 2019");
      this.addBulletPoint(
        "Built backend services supporting advertising generation and analytics across multiple channels."
      );
      this.addBulletPoint(
        "Designed and maintained event-driven systems using Kotlin and Spring Boot."
      );
      this.addBulletPoint(
        "Developed automation and data pipelines to support advertisement generation LLM models."
      );
      this.addText(
        "Tech Stack: Java, Kotlin, Scala, Groovy, Spring & Spring Boot, Qubole, AWS (Lambda, S3, EC2, RDS, CodeBuild), Docker, Docker Compose, Splunk, Haystack",
        "italic",
        9
      );
      this.addSpace(10);

      // Java Developer
      this.addJobTitle("Java Developer");
      this.addCompanyInfo("ProgressSoft — Amman | Sep 2016 – Apr 2018");
      this.addBulletPoint(
        "Built banking integrations supporting ACH, RTGS, and EBPP standards under ISO 20022 specifications."
      );
      this.addBulletPoint(
        "Developed modules for Bill Presentment and Payment used by regional banks and payment providers."
      );
      this.addBulletPoint(
        "Practiced agile engineering with TDD, Clean Code, Clean Architecture, pair-programming, and design documentation."
      );
      this.addSpace(10);

      // QA Analyst
      this.addJobTitle("Quality Assurance Analyst - Automation Engineer");
      this.addCompanyInfo("Aspire Infotech — Amman | Jan 2016 – Aug 2016");
      this.addBulletPoint(
        "Built automated UI test suites using Selenium and Appium."
      );
      this.addBulletPoint(
        "Conducted regression and black-box testing on web/mobile platforms."
      );
      this.addSpace(15);

      // Technical Skills
      this.addSectionTitle("TECHNICAL SKILLS");
      this.addText("Languages: Python, Java, Kotlin, Scala", "normal", 10);
      this.addText(
        "Frameworks: FastAPI, Spring, Spring Boot, JPA, Hibernate",
        "normal",
        10
      );
      this.addText(
        "Cloud & Infra: AWS (Lambda, SQS, RDS, CodeBuild, S3, EKS), Docker, Docker Compose, Prometheus, Grafana, Jaeger, Loki",
        "normal",
        10
      );
      this.addText(
        "Concepts & Tools: Microservices, TDD, CI/CD, OpenTelemetry, Agile/Scrum, Clean Architecture",
        "normal",
        10
      );
      this.addText("Databases: PostgreSQL, MySQL", "normal", 10);
      this.addText(
        "Testing: Selenium, Appium, JUnit, pytest, SonarQube",
        "normal",
        10
      );
      this.addText(
        "Others: Apache Camel, JMS, ActiveMQ, RabbitMQ, Linux",
        "normal",
        10
      );
      this.addSpace(15);

      // Education
      this.addSectionTitle("EDUCATION");
      this.addText("Bachelor of Computer Information Systems", "bold", 12);
      this.addText("University of Jordan — 2015", "normal", 10);
      this.addSpace(15);

      // Languages
      this.addSectionTitle("LANGUAGES");
      this.addText("Arabic – Native", "normal", 10);
      this.addText("English – Fluent", "normal", 10);
      this.addSpace(15);

      // References
      this.addSectionTitle("REFERENCES");
      this.addText("Available upon request or on LinkedIn", "normal", 10);

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
