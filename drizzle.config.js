import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.js',
  dialect: 'postgresql',
  driver:'pglite',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
