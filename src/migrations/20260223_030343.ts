import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`projects_screenshots\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  try { await db.run(sql`CREATE INDEX \`projects_screenshots_order_idx\` ON \`projects_screenshots\` (\`_order\`);`) } catch {}
  try { await db.run(sql`CREATE INDEX \`projects_screenshots_parent_id_idx\` ON \`projects_screenshots\` (\`_parent_id\`);`) } catch {}
  try { await db.run(sql`CREATE INDEX \`projects_screenshots_image_idx\` ON \`projects_screenshots\` (\`image_id\`);`) } catch {}
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`projects_screenshots_locales\` (
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects_screenshots\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  try { await db.run(sql`CREATE UNIQUE INDEX \`projects_screenshots_locales_locale_parent_id_unique\` ON \`projects_screenshots_locales\` (\`_locale\`,\`_parent_id\`);`) } catch {}
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`projects_screenshots\`;`)
  await db.run(sql`DROP TABLE \`projects_screenshots_locales\`;`)
}
