import React from "react";
import { motion } from "framer-motion";
import DownloadButtons from "./components/DownloadButtons";
import DynamicSectionRenderer from "./components/DynamicSectionRenderer";
import { getSectionKeys } from "./config/sections";
import { ThemeProvider } from "./components/ThemeProvider";
import "./App.css";

function App() {
  const sectionKeys = getSectionKeys();

  return (
    <ThemeProvider>
      <div className="App">
        <DownloadButtons />
        <div className="background-gradient">
          <div className="content-container">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="resume-container"
              itemScope
              itemType="https://schema.org/Person"
            >
              {/* <header className="resume-header" itemProp="name">
                <h1>Saleem Khair</h1>
                <p itemProp="jobTitle">
                  Senior Backend Engineer | FinTech & Payment Systems Expert
                </p>
              </header> */}

              <main className="resume-content">
                {sectionKeys.map((sectionKey) => (
                  <DynamicSectionRenderer
                    key={sectionKey}
                    sectionKey={sectionKey}
                  />
                ))}
              </main>

              <footer className="resume-footer">
                <p>&copy; 2025 Saleem Khair. All rights reserved.</p>
              </footer>
            </motion.article>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
