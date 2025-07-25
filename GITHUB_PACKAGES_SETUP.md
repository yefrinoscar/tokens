# Publishing to GitHub Packages with GitHub Actions

This guide explains how to use the GitHub Actions workflow to publish the `@claro/tokens` package to GitHub Packages.

## Setup Instructions

1. **Update Repository Information**

   Edit the `package.json` file and update the repository URL with your actual GitHub repository:

   ```json
   "repository": {
     "type": "git",
     "url": "git+https://github.com/YOUR_USERNAME/REPO_NAME.git"
   }
   ```

   Replace `YOUR_USERNAME` and `REPO_NAME` with your actual GitHub username and repository name.

2. **GitHub Actions Workflow**

   A GitHub Actions workflow has been set up in `.github/workflows/publish.yml`. This workflow will:
   - Run when a new release is created
   - Run when manually triggered from the Actions tab
   - Build the package
   - Publish it to GitHub Packages

3. **Authentication**

   The workflow uses the built-in `GITHUB_TOKEN` secret for authentication, so no additional setup is required for basic publishing.

## Publishing Your Package

You can publish your package in two ways:

1. **Create a GitHub Release**:
   - Go to your repository on GitHub
   - Navigate to the "Releases" section
   - Click "Create a new release"
   - Tag the version (matching your package.json version)
   - Publish the release

2. **Manual Trigger**:
   - Go to your repository on GitHub
   - Navigate to the "Actions" tab
   - Select the "Publish Package to GitHub Packages" workflow
   - Click "Run workflow"

## Consuming the Package

To use this package in another project:

1. Create a `.npmrc` file in your project with:

   ```
   @claro:registry=https://npm.pkg.github.com
   ```

2. Authenticate with GitHub Packages:

   ```bash
   npm login --registry=https://npm.pkg.github.com --scope=@claro
   ```

3. Install the package:

   ```bash
   npm install @claro/tokens
   ```

## Versioning

Remember to update the version in your `package.json` file before publishing a new version of the package.
