# Deployment Guide

> **⚠️ Current setup (GitHub Actions not used):** the Actions deploy workflow has been
> removed. GitHub Pages serves the **built files committed to the repo root** of `main`
> (`index.html`, `static/`, `404.html`, `asset-manifest.json`, `favicon.ico`,
> `manifest.json`, `robots.txt`, `sitemap.xml`, `llms.txt`, `.nojekyll`). Everything below about automatic Actions deploys is
> out of date.
>
> To publish a content change (e.g. after editing `src/data/resume.json`):
>
> ```bash
> npm run build
> rm -rf static && cp -r build/index.html build/404.html build/asset-manifest.json \
>   build/favicon.ico build/manifest.json build/robots.txt build/sitemap.xml \
>   build/llms.txt build/static .
> rm -rf build
> git add -A && git commit -m "Rebuild site" && git push
> ```
>
> Don't copy `build/CNAME` (keep the root `CNAME`) or `build/resume.md` (it clashes
> with `resume.MD` on case-insensitive file systems).

## 🚀 **GitHub Pages Automatic Hosting**

This repository is configured for **automatic hosting** on GitHub Pages. Since the repository is named `saleemkhair.github.io`, GitHub will automatically host your site at:

**🌐 Live URL:** `https://saleemkhair.github.io`

## 📋 **How It Works**

### **1. Automatic Deployment**

- ✅ **Push to master** → Site automatically deploys
- ✅ **No manual deployment** needed
- ✅ **GitHub Actions** handles the build process
- ✅ **Instant updates** when you push changes

### **2. Repository Structure**

```
saleemkhair.github.io/
├── .github/workflows/deploy.yml  # Automatic deployment workflow
├── src/                          # React source code
├── public/                       # Static assets
├── package.json                  # Dependencies and scripts
└── README.md                     # Project documentation
```

## 🔄 **Deployment Process**

### **Step 1: Push Your Code**

```bash
# Add all changes
git add .

# Commit changes
git commit -m "Update resume content and styling"

# Push to main branch
git push origin main
```

### **Step 2: Automatic Deployment**

1. **GitHub Actions** automatically triggers on push to `main`
2. **Builds** the React application
3. **Deploys** to GitHub Pages
4. **Site goes live** at `https://saleemkhair.github.io`

### **Step 3: Monitor Deployment**

- Check the **Actions** tab in your GitHub repository
- View deployment status and logs
- Site typically deploys in 2-3 minutes

## ⚙️ **Configuration**

### **GitHub Actions Workflow** (`.github/workflows/deploy.yml`)

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main] # Triggers on main branch

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          publish_dir: ./build
          publish_branch: master
```

### **Package.json Configuration**

```json
{
  "homepage": "https://saleemkhair.github.io",
  "scripts": {
    "build": "GENERATE_SOURCEMAP=true react-scripts build"
  }
}
```

## 🎯 **Benefits of GitHub Pages**

### **1. Zero Configuration**

- ✅ **No server setup** required
- ✅ **No domain configuration** needed
- ✅ **Automatic HTTPS** enabled
- ✅ **Global CDN** for fast loading

### **2. Automatic Updates**

- ✅ **Push to deploy** - No manual steps
- ✅ **Version control** - Track all changes
- ✅ **Rollback capability** - Easy to revert changes
- ✅ **Branch protection** - Safe deployment process

### **3. Professional Features**

- ✅ **Custom domain** support (optional)
- ✅ **Analytics** integration
- ✅ **SEO friendly** URLs
- ✅ **Mobile responsive** by default

## 🔧 **Troubleshooting**

### **Common Issues:**

#### **1. Site Not Updating**

- Check **Actions** tab for deployment status
- Ensure you pushed to `main` branch
- Wait 2-3 minutes for deployment to complete

#### **2. Build Failures**

- Check **Actions** logs for error details
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

#### **3. 404 Errors**

- Ensure `homepage` in `package.json` is correct
- Check that `build` directory contains files
- Verify GitHub Pages is enabled in repository settings

### **Manual Deployment (if needed):**

```bash
# Build locally
npm run build

# Deploy manually (alternative method)
npm run deploy
```

## 📊 **Monitoring**

### **GitHub Actions Dashboard**

- **Repository** → **Actions** tab
- View deployment history
- Check build logs
- Monitor deployment status

### **GitHub Pages Settings**

- **Repository** → **Settings** → **Pages**
- View deployment source
- Check custom domain settings
- Monitor site status

## 🎉 **Success Indicators**

Your site is successfully deployed when:

- ✅ **Actions** tab shows green checkmark
- ✅ Site loads at `https://saleemkhair.github.io`
- ✅ No 404 errors on main pages
- ✅ All assets (CSS, JS, images) load correctly

---

**🎯 Your resume website will be automatically available at `https://saleemkhair.github.io` once you push your code to the main branch!**
