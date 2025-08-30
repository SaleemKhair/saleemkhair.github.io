import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ReactMarkdown from "react-markdown";
import { MapPin, Mail, Phone, Linkedin } from "lucide-react";
import { contentService } from "../services";

const Header = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const content = contentService.getMarkdownContent("header");
  let paragraphIndex = 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className="header-section"
    >
      <div className="header-content">
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <motion.h1
                variants={itemVariants}
                className="header-name"
                itemProp="headline"
              >
                {children}
              </motion.h1>
            ),
            h2: ({ children }) => (
              <motion.h2
                variants={itemVariants}
                className="header-title"
                itemProp="description"
              >
                {children}
              </motion.h2>
            ),
            p: ({ children }) => {
              paragraphIndex++;

              // The last paragraph (index 1) contains contact information
              if (paragraphIndex === 1) {
                return (
                  <motion.div
                    variants={itemVariants}
                    className="header-contact"
                  >
                    {children}
                  </motion.div>
                );
              }

              // Regular paragraph
              return <motion.p variants={itemVariants}>{children}</motion.p>;
            },
            a: ({ href, children }) => {
              // Determine which icon to use based on the link content
              let IconComponent = null;
              const childrenText = Array.isArray(children)
                ? children.join("")
                : String(children || "");

              if (href === "location" || childrenText.includes("Amman")) {
                IconComponent = MapPin;
              } else if (href.startsWith("mailto:")) {
                IconComponent = Mail;
              } else if (href.startsWith("tel:")) {
                IconComponent = Phone;
              } else if (href.includes("linkedin.com")) {
                IconComponent = Linkedin;
              }

              return (
                <motion.a
                  variants={itemVariants}
                  href={href === "location" ? undefined : href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className="header-contact-link"
                >
                  {IconComponent && <IconComponent size={16} />}
                  {children}
                </motion.a>
              );
            },
            strong: ({ children }) => (
              <motion.strong
                variants={itemVariants}
                style={{ color: "#1a365d", fontWeight: 600 }}
              >
                {children}
              </motion.strong>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </motion.div>
  );
};

export default Header;
