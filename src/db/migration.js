import { migrate } from 'drizzle-orm/node-postgres/migrator';
import {db} from './index.js';

async function runMigration() {
  console.log('Running migration...');
  await migrate(db, {migrationsFolder: './drizzle'});
  console.log('Migration completed');
  process.exit(0);
}

runMigration().catch((err) => {
  console.error('Migration failed', err);
  process.exit(1);
});