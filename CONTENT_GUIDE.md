# Content Management Guide

This guide explains how to update the content of your resume website without touching any code.

## Quick Start

All content is stored in markdown files in the `src/content/` directory. To update any section, simply edit the corresponding markdown file.

### Download Features
The website includes download buttons in the top-right corner:
- **Markdown Download**: Instantly downloads your resume as a markdown file
- **PDF Download**: Generates a professional PDF version of your resume

## Content Files

### 1. Header Information (`src/content/header.md`)
Contains your name, title, and contact information.

```markdown
# Saleem Khair
## Senior Backend Engineer | FinTech | Payment Systems & Infrastructure

**Location:** Amman, Jordan  
**Email:** [saleemkhair@gmail.com](mailto:saleemkhair@gmail.com)  
**Mobile:** +962-79-604-9560  
**LinkedIn:** [https://www.linkedin.com/in/saleem-khair-359795108](https://www.linkedin.com/in/saleem-khair-359795108)
```

### 2. Professional Experience (`src/content/experience.md`)
Your work history and achievements.

```markdown
## PROFESSIONAL EXPERIENCE

### Job Title
**Company Name** — Location | **Date Range**

* Achievement 1
* Achievement 2
* Achievement 3

**Tech Stack:** Technology 1, Technology 2, Technology 3

---

### Next Job Title
**Company Name** — Location | **Date Range**

* Achievement 1
* Achievement 2
* Achievement 3

**Tech Stack:** Technology 1, Technology 2, Technology 3
```

### 3. Technical Skills (`src/content/skills.md`)
Your technical expertise and tools.

```markdown
## TECHNICAL SKILLS

**Languages:** Python, Java, Kotlin, Scala  
**Frameworks:** FastAPI, Spring, Spring Boot, JPA, Hibernate  
**Cloud & Infra:** AWS (Lambda, SQS, RDS, CodeBuild, S3, EKS), Docker, Docker Compose, Prometheus, Grafana, Jaeger, Loki  
**Concepts & Tools:** Microservices, TDD, CI/CD, OpenTelemetry, Agile/Scrum, Clean Architecture  
**Databases:** PostgreSQL, MySQL  
**Testing:** Selenium, Appium, JUnit, pytest, SonarQube  
**Others:** Apache Camel, JMS, ActiveMQ, RabbitMQ, Linux
```

### 4. Education (`src/content/education.md`)
Your educational background.

```markdown
## EDUCATION

**Degree Name**  
Institution Name — **Year**
```

### 5. Languages (`src/content/languages.md`)
Your language proficiency.

```markdown
## LANGUAGES

* **Language 1** – Proficiency Level
* **Language 2** – Proficiency Level
```

### 6. References (`src/content/references.md`)
Reference information and links.

```markdown
## REFERENCES

Available upon request or on [LinkedIn](https://www.linkedin.com/in/saleem-khair-359795108)
```

## Markdown Formatting Tips

### Bold Text
Use `**text**` for **bold text**

### Links
Use `[link text](url)` for links

### Lists
- Use `* item` for bullet points
- Use `1. item` for numbered lists

### Headers
- `# Header 1` for main headers
- `## Header 2` for section headers
- `### Header 3` for subsection headers

### Emphasis
- `*italic*` for *italic text*
- `**bold**` for **bold text**
- `***bold italic***` for ***bold italic text***

## Updating Process

1. **Edit the markdown file** for the section you want to update
2. **Save the file**
3. **Test locally** (optional): Run `npm start` to see changes
4. **Deploy**: Run `./deploy.sh` or push to GitHub for automatic deployment

## Best Practices

1. **Keep it concise**: Focus on achievements and measurable results
2. **Use action verbs**: Start bullet points with strong action verbs
3. **Quantify achievements**: Include numbers, percentages, and metrics when possible
4. **Maintain consistency**: Use consistent formatting across all sections
5. **Proofread**: Always review your changes before deploying

## Troubleshooting

### Content not updating?
- Make sure you saved the file
- Clear your browser cache
- Check that the markdown syntax is correct

### Build errors?
- Check for syntax errors in markdown files
- Ensure all links are valid
- Verify that special characters are properly escaped

### Deployment issues?
- Check that all files are committed to git
- Verify GitHub Pages settings in your repository
- Check the GitHub Actions logs for errors

## Need Help?

If you encounter any issues:
1. Check the browser console for errors
2. Review the markdown syntax
3. Test changes locally first
4. Check the GitHub Actions logs

For technical support, refer to the main README.md file or contact the developer.
