import React from "react";
import { motion } from "framer-motion";
import DynamicSectionRenderer from "./components/DynamicSectionRenderer";
import { getSectionKeys } from "./config/sections";
import { ThemeProvider } from "./components/ThemeProvider";
import "./App.css";

function App() {
  const sectionKeys = getSectionKeys();

  return (
    <ThemeProvider>
      <div className="App">
        <div className="background-gradient">
          <div className="content-container">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="resume-container"
              itemScope
              itemType="https://schema.org/Article"
            >
              <header className="resume-header">
                <meta itemProp="author" content="Saleem Khair" />
                <meta itemProp="datePublished" content="2025-01-01T00:00:00Z" />
                <meta itemProp="dateModified" content="2025-08-30T00:00:00Z" />
                <meta itemProp="publisher" content="Saleem Khair" />
                <meta itemProp="articleSection" content="Professional Resume" />
                <meta
                  itemProp="keywords"
                  content="Backend Engineer, FinTech, Payment Systems, Resume, Portfolio"
                />
              </header>

              <main className="resume-content" itemProp="articleBody">
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
