#!/usr/bin/env node

/**
 * SEO Post-Build Step
 *
 * Runs after `react-scripts build` and writes crawler-facing files into build/:
 * - index.html: the resume as static HTML inside #root, so crawlers that don't
 *   run JavaScript still see the content (React replaces it on load)
 * - robots.txt, sitemap.xml, llms.txt
 *
 * All content comes from src/data/resume.json.
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://saleemkhair.com';
const buildDir = path.join(__dirname, '..', 'build');
const resumeDataPath = path.join(__dirname, '..', 'src', 'data', 'resume.json');
const resumeData = JSON.parse(fs.readFileSync(resumeDataPath, 'utf8'));

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Escape first, then turn **bold** markers into <strong>
function inlineMarkdownToHtml(text) {
  return escapeHtml(text).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

function stripMarkdown(text) {
  return String(text).replace(/\*\*(.*?)\*\*/g, '$1');
}

function generateStaticHtml({ header, selectedWork = [], experience, skills, education, languages }) {
  let html = '<main id="static-resume">\n';
  html += `<h1>${escapeHtml(header.name)}</h1>\n`;
  html += `<p>${escapeHtml(header.title)}</p>\n`;
  html += `<p>${escapeHtml(header.location)} · <a href="mailto:${escapeHtml(header.email)}">${escapeHtml(header.email)}</a> · <a href="${escapeHtml(header.linkedin)}">LinkedIn</a></p>\n`;

  html += '<section><h2>Selected Work</h2>\n';
  selectedWork.forEach(work => {
    html += '<article>\n';
    html += `<h3>${escapeHtml(work.title)} — ${escapeHtml(work.organization)}</h3>\n`;
    html += `<p>${escapeHtml(work.period)}</p>\n<ul>\n`;
    if (work.challenge) {
      html += `<li>Challenge: ${inlineMarkdownToHtml(work.challenge)}</li>\n`;
    }
    if (work.approach) {
      html += `<li>What I did: ${inlineMarkdownToHtml(work.approach)}</li>\n`;
    }
    if (work.outcome) {
      html += `<li>Result: ${inlineMarkdownToHtml(work.outcome)}</li>\n`;
    }
    html += '</ul>\n';
    if (work.techStack) {
      html += `<p>Tech Stack: ${escapeHtml(work.techStack)}</p>\n`;
    }
    html += '</article>\n';
  });
  html += '</section>\n';

  html += '<section><h2>Professional Experience</h2>\n';
  experience.forEach(job => {
    html += '<article>\n';
    html += `<h3>${escapeHtml(job.title)} — ${escapeHtml(job.company)}</h3>\n`;
    html += `<p>${escapeHtml(job.location)} | ${escapeHtml(job.period)}</p>\n<ul>\n`;
    job.achievements.forEach(achievement => {
      html += `<li>${inlineMarkdownToHtml(achievement)}</li>\n`;
    });
    html += '</ul>\n';
    if (job.techStack) {
      html += `<p>Tech Stack: ${escapeHtml(job.techStack)}</p>\n`;
    }
    html += '</article>\n';
  });
  html += '</section>\n';

  html += '<section><h2>Technical Skills</h2>\n<ul>\n';
  Object.entries(skills).forEach(([category, items]) => {
    html += `<li>${escapeHtml(category)}: ${escapeHtml(items.join(', '))}</li>\n`;
  });
  html += '</ul>\n</section>\n';

  html += `<section><h2>Education</h2>\n<p>${escapeHtml(education.degree)}, ${escapeHtml(education.school)} (${escapeHtml(education.year)})</p>\n</section>\n`;

  html += '<section><h2>Languages</h2>\n<p>';
  html += languages.map(lang => `${escapeHtml(lang.name)} (${escapeHtml(lang.level)})`).join(', ');
  html += '</p>\n</section>\n</main>';
  return html;
}

function generateRobotsTxt() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
}

function generateSitemapXml() {
  const lastmod = new Date().toISOString().slice(0, 10);
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${lastmod}</lastmod>
  </url>
</urlset>
`;
}

// Format follows the llms.txt proposal (https://llmstxt.org/): H1, blockquote summary, details
function generateLlmsTxt({ header, selectedWork = [], experience, skills, education, languages }) {
  let text = `# ${header.name}\n\n> ${header.title}. Based in ${header.location}.\n\n`;
  text += `- Website: ${SITE_URL}/\n- Email: ${header.email}\n- LinkedIn: ${header.linkedin}\n\n`;

  text += '## Selected Work\n\n';
  selectedWork.forEach(work => {
    text += `### ${work.title} — ${work.organization} (${work.period})\n\n`;
    if (work.challenge) {
      text += `- Challenge: ${stripMarkdown(work.challenge)}\n`;
    }
    if (work.approach) {
      text += `- What I did: ${stripMarkdown(work.approach)}\n`;
    }
    if (work.outcome) {
      text += `- Result: ${stripMarkdown(work.outcome)}\n`;
    }
    if (work.techStack) {
      text += `- Tech: ${work.techStack}\n`;
    }
    text += '\n';
  });

  text += '## Experience\n\n';
  experience.forEach(job => {
    text += `### ${job.title} — ${job.company} (${job.period})\n\n`;
    job.achievements.forEach(achievement => {
      text += `- ${stripMarkdown(achievement)}\n`;
    });
    if (job.techStack) {
      text += `- Tech: ${job.techStack}\n`;
    }
    text += '\n';
  });

  text += '## Skills\n\n';
  Object.entries(skills).forEach(([category, items]) => {
    text += `- ${category}: ${items.join(', ')}\n`;
  });

  text += `\n## Education\n\n- ${education.degree}, ${education.school} (${education.year})\n`;
  text += `\n## Languages\n\n- ${languages.map(lang => `${lang.name} (${lang.level})`).join(', ')}\n`;
  return text;
}

function buildSeo() {
  try {
    console.log('🔄 Writing SEO files into build/...');

    const indexPath = path.join(buildDir, 'index.html');
    const indexHtml = fs.readFileSync(indexPath, 'utf8');
    const rootTag = '<div id="root"></div>';
    if (!indexHtml.includes(rootTag)) {
      throw new Error(`${rootTag} not found in build/index.html`);
    }
    const staticHtml = generateStaticHtml(resumeData);
    fs.writeFileSync(indexPath, indexHtml.replace(rootTag, `<div id="root">${staticHtml}</div>`), 'utf8');

    fs.writeFileSync(path.join(buildDir, 'robots.txt'), generateRobotsTxt(), 'utf8');
    fs.writeFileSync(path.join(buildDir, 'sitemap.xml'), generateSitemapXml(), 'utf8');
    fs.writeFileSync(path.join(buildDir, 'llms.txt'), generateLlmsTxt(resumeData), 'utf8');

    console.log('✅ SEO files written: index.html (static content), robots.txt, sitemap.xml, llms.txt');
    return true;
  } catch (error) {
    console.error('❌ Error writing SEO files:', error);
    return false;
  }
}

if (require.main === module) {
  const success = buildSeo();
  process.exit(success ? 0 : 1);
}

module.exports = buildSeo;
