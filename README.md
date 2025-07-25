# @claro/tokens

A design token package for the Claro design system. This package uses [Style Dictionary](https://amzn.github.io/style-dictionary/) to convert design tokens from JSON format to various platform-specific formats including CSS, SCSS, and JavaScript.

## Installation

```bash
npm install @claro/tokens
```

## Usage

### Using the CSS Variables

You can import the CSS variables directly in your project:

```html
<!-- In HTML -->
<link rel="stylesheet" href="node_modules/@claro/tokens/dist/css/tokens.css">
```

```css
/* In CSS */
@import '@claro/tokens/dist/css/tokens.css';

.my-element {
  color: var(--color-brand-primary);
  font-size: var(--font-size-md);
  padding: var(--spacing-4);
}
```

### Using the SCSS Variables

```scss
// In SCSS
@import '@claro/tokens/dist/scss/tokens';

.my-element {
  color: $color-brand-primary;
  font-size: $font-size-md;
  padding: $spacing-4;
}
```

### Using JavaScript

```javascript
// In JavaScript
import { tokens } from '@claro/tokens';

console.log(tokens.color.brand.primary); // "#0078D4"
```

### Programmatic Usage

You can also build tokens programmatically:

```javascript
import { buildTokens } from '@claro/tokens';

// Build tokens with default configuration
buildTokens();

// Build tokens with custom configuration
buildTokens('./my-config.json');

// Build tokens with custom source
buildTokens(undefined, ['./my-tokens/**/*.json']);
```

## Available Tokens

This package includes the following token categories:

- **Colors**: Brand colors, neutral colors, and feedback colors
- **Typography**: Font families, weights, sizes, and line heights
- **Spacing**: Spacing scale for consistent layout

## Example

An example demonstrating the usage of these tokens can be found in the `example` directory.

## Development

### Building the tokens

```bash
# Install dependencies
npm install

# Build the tokens
npm run build
```

### Customizing tokens

To customize the tokens, modify the JSON files in the `src/tokens` directory.

### Customizing the build configuration

To customize the build configuration, modify the `config.json` file.

## License

MIT
