import path from 'path';
import StyleDictionary from 'style-dictionary';
import { registerTransformers } from './transformers';

// Register custom transformers for Claro design tokens
registerTransformers();

// Export the CSS path for consumers to import directly
export const cssPath = path.join(__dirname, 'css', 'tokens.css');

// Export the SCSS path for consumers to import directly
export const scssPath = path.join(__dirname, 'scss', '_tokens.scss');

// Export the JS tokens - we'll dynamically import this at runtime
// since it's generated during the build process
export const getTokens = () => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require('./js/tokens').default;
  } catch (e) {
    console.warn('Tokens not yet built. Run npm run build first.');
    return {};
  }
};

// Export a function to build tokens programmatically
export function buildTokens(
  configPath: string = path.resolve(__dirname, '../config.json'),
  customSource?: string[]
) {
  // Register transformers before extending the dictionary
  registerTransformers();
  
  // Create a new StyleDictionary instance with the config
  const styleDictionary = StyleDictionary.extend(configPath);
  
  // If custom source is provided, override the default source
  if (customSource && styleDictionary.options) {
    // Access source through options instead of directly on config
    styleDictionary.options.source = customSource;
  }
  
  // Build all platforms
  styleDictionary.buildAllPlatforms();
  
  return styleDictionary;
}

// Export the StyleDictionary instance for advanced usage
export { StyleDictionary };
