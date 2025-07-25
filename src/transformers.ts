import StyleDictionary from 'style-dictionary';

/**
 * Register custom transformers for the Claro design tokens
 */
export function registerTransformers() {
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
      return token.value.toLowerCase();
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
}
