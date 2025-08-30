import React, { useState } from "react";
import { FileText } from "lucide-react";
import { pdfService } from "../services/pdfService";

const PDFDownloadButton = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePDFDownload = async () => {
    try {
      setIsGenerating(true);

      // Use the text-based PDF generation for better control and formatting
      await pdfService.generateTextBasedPDF();

      // Optional: Show success message
      console.log("PDF generated successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      // Optional: Show error message to user
      alert("Error generating PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={handlePDFDownload}
      disabled={isGenerating}
      className="pdf-download-button"
      title="Download Resume as PDF"
    >
      <FileText size={16} />
      <span>{isGenerating ? "Generating..." : "Download PDF"}</span>
    </button>
  );
};

export default PDFDownloadButton;
