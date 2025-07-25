const StyleDictionary = require('style-dictionary');
const path = require('path');
const fs = require('fs');

// Register custom transformers for the Claro design tokens

// Transform token names to kebab case and clean special characters
StyleDictionary.registerTransform({
  name: 'name/kebab',
  type: 'name',
  transformer: (token) => {
    // Remove special characters like $, &, etc.
    const cleanName = token.name.replace(/[$&]/g, '');
    
    // Convert to kebab case
    return cleanName
      .replace(/\s+/g, '-')
      .toLowerCase();
  }
});

// Transform color values to lowercase
StyleDictionary.registerTransform({
  name: 'color/lowercase',
  type: 'value',
  matcher: (token) => token.type === 'color',
  transformer: (token) => {
    return typeof token.value === 'string' ? token.value.toLowerCase() : token.value;
  }
});

// Create custom transform groups
StyleDictionary.registerTransformGroup({
  name: 'custom/css',
  transforms: [
    'attribute/cti',
    'name/kebab',
    'color/lowercase',
    'time/seconds',
    'content/icon',
    'size/rem',
    'color/css'
  ]
});

StyleDictionary.registerTransformGroup({
  name: 'custom/scss',
  transforms: [
    'attribute/cti',
    'name/kebab',
    'color/lowercase',
    'time/seconds',
    'content/icon',
    'size/rem',
    'color/css'
  ]
});

StyleDictionary.registerTransformGroup({
  name: 'custom/js',
  transforms: [
    'attribute/cti',
    'name/kebab',
    'color/lowercase',
    'time/seconds',
    'content/icon',
    'size/rem',
    'color/hex'
  ]
});

// Check if design-tokens.tokens.json exists
const tokenFilePath = path.resolve(__dirname, 'src/tokens/design-tokens.tokens.json');
if (!fs.existsSync(tokenFilePath)) {
  console.error(`❌ Error: Token file not found at ${tokenFilePath}`);
  process.exit(1);
}

// Create StyleDictionary instance with all platforms
const styleDictionary = StyleDictionary.extend({
  source: [tokenFilePath],
  platforms: {
    css: {
      transformGroup: 'custom/css',
      prefix: 'claro',
      buildPath: 'dist/css/',
      files: [{
        destination: 'tokens.css',
        format: 'css/variables'
      }]
    },
    scss: {
      transformGroup: 'custom/scss',
      prefix: 'claro',
      buildPath: 'dist/scss/',
      files: [{
        destination: '_tokens.scss',
        format: 'scss/variables'
      }]
    },
    js: {
      transformGroup: 'custom/js',
      buildPath: 'dist/js/',
      files: [{
        destination: 'tokens.js',
        format: 'javascript/es6'
      }]
    }
  }
});

// Build the tokens
console.log('Building tokens...');
try {
  styleDictionary.buildAllPlatforms();
  console.log('✅ Tokens built successfully!');
} catch (error) {
  console.error('❌ Error building tokens:', error);
  process.exit(1);
}
