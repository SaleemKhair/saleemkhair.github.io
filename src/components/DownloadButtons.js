import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileDown } from "lucide-react";
import { pdfService } from "../services";

const DownloadButtons = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadPDF = async () => {
    setIsDownloading(true);
    try {
      await pdfService.generateAndDownloadPDF();
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
      className="download-buttons"
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 1000,
        display: "flex",
        gap: "10px",
      }}
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={downloadPDF}
        disabled={isDownloading}
        className="download-btn pdf-btn"
        style={{
          background: isDownloading
            ? "#718096"
            : "linear-gradient(135deg, #e53e3e, #f56565)",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "12px 16px",
          cursor: isDownloading ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "14px",
          fontWeight: "500",
          boxShadow: "0 4px 12px rgba(229, 62, 62, 0.3)",
          transition: "all 0.3s ease",
          opacity: isDownloading ? 0.7 : 1,
        }}
      >
        {isDownloading ? (
          <>
            <div
              className="loading-spinner"
              style={{
                width: "16px",
                height: "16px",
                border: "2px solid rgba(255,255,255,0.3)",
                borderTop: "2px solid white",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            />
            Generating...
          </>
        ) : (
          <>
            <FileDown size={16} />
            PDF
          </>
        )}
      </motion.button>
    </motion.div>
  );
};

export default DownloadButtons;
