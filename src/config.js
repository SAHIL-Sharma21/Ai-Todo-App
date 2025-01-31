// src/config.js
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadEnvConfig() {
  // Try loading from user's current directory first
  const localEnvPath = path.join(process.cwd(), '.env');
  if (fs.existsSync(localEnvPath)) {
    dotenv.config({ path: localEnvPath });
  }

  // Check for required environment variables
  const missingVars = [];
  
  if (!process.env.GOOGLE_API_KEY) {
    missingVars.push('GOOGLE_API_KEY');
  }
  
  if (!process.env.DATABASE_URL) {
    missingVars.push('DATABASE_URL');
  }

  if (missingVars.length > 0) {
    console.error('\nError: Missing required environment variables:');
    console.error(missingVars.join(', '));
    console.error('\nPlease create a .env file in your current directory with:');
    console.error('GOOGLE_API_KEY=your_gemini_api_key_here');
    console.error('DATABASE_URL=your_postgresql_database_url_here');
    console.error('\nOr set them as environment variables before running the app.');
    console.error('\nExample PostgreSQL URL format:');
    console.error('postgresql://username:password@localhost:5432/database_name');
    process.exit(1);
  }

  return {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    DATABASE_URL: process.env.DATABASE_URL
  };
}

export const config = loadEnvConfig();