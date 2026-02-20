import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`projects_locales\` (
  	\`title\` text NOT NULL,
  	\`client\` text,
  	\`services\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_locales_locale_parent_id_unique\` ON \`projects_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_specs_locales\` (
  	\`label\` text NOT NULL,
  	\`value\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_specs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_specs_locales_locale_parent_id_unique\` ON \`services_specs_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_deliverables_locales\` (
  	\`item\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_deliverables\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_deliverables_locales_locale_parent_id_unique\` ON \`services_deliverables_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_locales\` (
  	\`title\` text NOT NULL,
  	\`highlight\` text,
  	\`recommended_for\` text,
  	\`price_unit\` text DEFAULT 'Project',
  	\`conditions\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`services_locales_locale_parent_id_unique\` ON \`services_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`about_page_standards_locales\` (
  	\`title\` text,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about_page_standards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`about_page_standards_locales_locale_parent_id_unique\` ON \`about_page_standards_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`about_page_locales\` (
  	\`hero_section_headline\` text DEFAULT 'Devoted to the Frame' NOT NULL,
  	\`hero_section_subtext\` text,
  	\`philosophy_title\` text DEFAULT 'Our Philosophy',
  	\`philosophy_content\` text,
  	\`founder_role\` text,
  	\`founder_bio\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`about_page_locales_locale_parent_id_unique\` ON \`about_page_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`general_locales\` (
  	\`footer_text\` text DEFAULT 'Morerolls Studio',
  	\`footer_sub_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`general\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`general_locales_locale_parent_id_unique\` ON \`general_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`contact_page_locales\` (
  	\`headline\` text DEFAULT 'Let''s Create Something Extraordinary.' NOT NULL,
  	\`visit_us_address\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`contact_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`contact_page_locales_locale_parent_id_unique\` ON \`contact_page_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`projects\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`projects\` DROP COLUMN \`client\`;`)
  await db.run(sql`ALTER TABLE \`projects\` DROP COLUMN \`services\`;`)
  await db.run(sql`ALTER TABLE \`projects\` DROP COLUMN \`description\`;`)
  await db.run(sql`ALTER TABLE \`services_specs\` DROP COLUMN \`label\`;`)
  await db.run(sql`ALTER TABLE \`services_specs\` DROP COLUMN \`value\`;`)
  await db.run(sql`ALTER TABLE \`services_deliverables\` DROP COLUMN \`item\`;`)
  await db.run(sql`ALTER TABLE \`services\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`services\` DROP COLUMN \`highlight\`;`)
  await db.run(sql`ALTER TABLE \`services\` DROP COLUMN \`recommended_for\`;`)
  await db.run(sql`ALTER TABLE \`services\` DROP COLUMN \`price_unit\`;`)
  await db.run(sql`ALTER TABLE \`services\` DROP COLUMN \`conditions\`;`)
  await db.run(sql`ALTER TABLE \`about_page_standards\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`about_page_standards\` DROP COLUMN \`description\`;`)
  await db.run(sql`ALTER TABLE \`about_page\` DROP COLUMN \`hero_section_headline\`;`)
  await db.run(sql`ALTER TABLE \`about_page\` DROP COLUMN \`hero_section_subtext\`;`)
  await db.run(sql`ALTER TABLE \`about_page\` DROP COLUMN \`philosophy_title\`;`)
  await db.run(sql`ALTER TABLE \`about_page\` DROP COLUMN \`philosophy_content\`;`)
  await db.run(sql`ALTER TABLE \`about_page\` DROP COLUMN \`founder_role\`;`)
  await db.run(sql`ALTER TABLE \`about_page\` DROP COLUMN \`founder_bio\`;`)
  await db.run(sql`ALTER TABLE \`general\` DROP COLUMN \`footer_text\`;`)
  await db.run(sql`ALTER TABLE \`general\` DROP COLUMN \`footer_sub_description\`;`)
  await db.run(sql`ALTER TABLE \`contact_page\` DROP COLUMN \`headline\`;`)
  await db.run(sql`ALTER TABLE \`contact_page\` DROP COLUMN \`visit_us_address\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`projects_locales\`;`)
  await db.run(sql`DROP TABLE \`services_specs_locales\`;`)
  await db.run(sql`DROP TABLE \`services_deliverables_locales\`;`)
  await db.run(sql`DROP TABLE \`services_locales\`;`)
  await db.run(sql`DROP TABLE \`about_page_standards_locales\`;`)
  await db.run(sql`DROP TABLE \`about_page_locales\`;`)
  await db.run(sql`DROP TABLE \`general_locales\`;`)
  await db.run(sql`DROP TABLE \`contact_page_locales\`;`)
  await db.run(sql`ALTER TABLE \`projects\` ADD \`title\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`projects\` ADD \`client\` text;`)
  await db.run(sql`ALTER TABLE \`projects\` ADD \`services\` text;`)
  await db.run(sql`ALTER TABLE \`projects\` ADD \`description\` text;`)
  await db.run(sql`ALTER TABLE \`services_specs\` ADD \`label\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`services_specs\` ADD \`value\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`services_deliverables\` ADD \`item\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`services\` ADD \`title\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`services\` ADD \`highlight\` text;`)
  await db.run(sql`ALTER TABLE \`services\` ADD \`recommended_for\` text;`)
  await db.run(sql`ALTER TABLE \`services\` ADD \`price_unit\` text DEFAULT 'Project';`)
  await db.run(sql`ALTER TABLE \`services\` ADD \`conditions\` text;`)
  await db.run(sql`ALTER TABLE \`about_page_standards\` ADD \`title\` text;`)
  await db.run(sql`ALTER TABLE \`about_page_standards\` ADD \`description\` text;`)
  await db.run(sql`ALTER TABLE \`about_page\` ADD \`hero_section_headline\` text DEFAULT 'Devoted to the Frame' NOT NULL;`)
  await db.run(sql`ALTER TABLE \`about_page\` ADD \`hero_section_subtext\` text;`)
  await db.run(sql`ALTER TABLE \`about_page\` ADD \`philosophy_title\` text DEFAULT 'Our Philosophy';`)
  await db.run(sql`ALTER TABLE \`about_page\` ADD \`philosophy_content\` text;`)
  await db.run(sql`ALTER TABLE \`about_page\` ADD \`founder_role\` text;`)
  await db.run(sql`ALTER TABLE \`about_page\` ADD \`founder_bio\` text;`)
  await db.run(sql`ALTER TABLE \`general\` ADD \`footer_text\` text DEFAULT 'Morerolls Studio';`)
  await db.run(sql`ALTER TABLE \`general\` ADD \`footer_sub_description\` text;`)
  await db.run(sql`ALTER TABLE \`contact_page\` ADD \`headline\` text DEFAULT 'Let''s Create Something Extraordinary.' NOT NULL;`)
  await db.run(sql`ALTER TABLE \`contact_page\` ADD \`visit_us_address\` text;`)
}
