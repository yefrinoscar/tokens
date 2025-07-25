#!/usr/bin/env node

import path from 'path';
import { buildTokens } from './index';
import fs from 'fs';

// Get the config path from command line arguments or use default
const configPath = process.argv[2] || path.resolve(__dirname, '../config.json');

// Get the source path from command line arguments
const sourcePath = process.argv[3] ? [process.argv[3]] : undefined;

try {
  console.log('Building tokens...');
  buildTokens(configPath, sourcePath);
  console.log('\n✅ Tokens built successfully!');
  
  // Log the platforms that were built by reading the config file directly
  console.log('\nBuilt platforms:');
  try {
    const configContent = fs.readFileSync(configPath, 'utf8');
    const config = JSON.parse(configContent);
    if (config && config.platforms) {
      Object.keys(config.platforms).forEach(platform => {
        console.log(`- ${platform}`);
      });
    }
  } catch (configError) {
    console.log('Could not read platform information from config file.');
  }
} catch (error) {
  console.error('❌ Error building tokens:', error);
  process.exit(1);
}
