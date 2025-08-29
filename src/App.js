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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="resume-container"
            >
              {sectionKeys.map((sectionKey) => (
                <DynamicSectionRenderer
                  key={sectionKey}
                  sectionKey={sectionKey}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
