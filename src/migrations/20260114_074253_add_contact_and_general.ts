import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // PATCHED: Force clean slate for these tables to ensure new schema is applied
  await db.run(sql`DROP TABLE IF EXISTS \`services_specs\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`services_deliverables\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`services\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`root_page_medias_client_logos\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`root_page_medias\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`about_page_standards\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`about_page\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`general_social_links\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`general\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`contact_page\`;`)
  await db.run(sql`CREATE TABLE \`services_specs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`value\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_specs_order_idx\` ON \`services_specs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_specs_parent_id_idx\` ON \`services_specs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services_deliverables\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_deliverables_order_idx\` ON \`services_deliverables\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_deliverables_parent_id_idx\` ON \`services_deliverables\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`services\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`thumbnail_id\` integer,
  	\`category\` text NOT NULL,
  	\`order\` numeric DEFAULT 0,
  	\`highlight\` text,
  	\`recommended_for\` text,
  	\`price_amount\` numeric NOT NULL,
  	\`price_unit\` text DEFAULT 'Project',
  	\`price_is_starting_at\` integer DEFAULT false,
  	\`conditions\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`thumbnail_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`services_thumbnail_idx\` ON \`services\` (\`thumbnail_id\`);`)
  await db.run(sql`CREATE INDEX \`services_updated_at_idx\` ON \`services\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`services_created_at_idx\` ON \`services\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`root_page_medias_client_logos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`logo_id\` integer NOT NULL,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`root_page_medias\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`root_page_medias_client_logos_order_idx\` ON \`root_page_medias_client_logos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`root_page_medias_client_logos_parent_id_idx\` ON \`root_page_medias_client_logos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`root_page_medias_client_logos_logo_idx\` ON \`root_page_medias_client_logos\` (\`logo_id\`);`)
  await db.run(sql`CREATE TABLE \`root_page_medias\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_video_desktop_type\` text DEFAULT 'upload' NOT NULL,
  	\`hero_video_desktop_url\` text,
  	\`hero_video_desktop_file_id\` integer,
  	\`hero_video_mobile_type\` text DEFAULT 'upload' NOT NULL,
  	\`hero_video_mobile_url\` text,
  	\`hero_video_mobile_file_id\` integer,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_video_desktop_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`hero_video_mobile_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`root_page_medias_hero_video_desktop_hero_video_desktop_f_idx\` ON \`root_page_medias\` (\`hero_video_desktop_file_id\`);`)
  await db.run(sql`CREATE INDEX \`root_page_medias_hero_video_mobile_hero_video_mobile_fil_idx\` ON \`root_page_medias\` (\`hero_video_mobile_file_id\`);`)
  await db.run(sql`CREATE TABLE \`about_page_standards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon_id\` integer,
  	\`title\` text,
  	\`description\` text,
  	FOREIGN KEY (\`icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`about_page_standards_order_idx\` ON \`about_page_standards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`about_page_standards_parent_id_idx\` ON \`about_page_standards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`about_page_standards_icon_idx\` ON \`about_page_standards\` (\`icon_id\`);`)
  await db.run(sql`CREATE TABLE \`about_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_section_show_headline\` integer DEFAULT true,
  	\`hero_section_headline\` text DEFAULT 'Devoted to the Frame' NOT NULL,
  	\`hero_section_show_subtext\` integer DEFAULT false,
  	\`hero_section_subtext\` text,
  	\`hero_section_text_color\` text DEFAULT 'black',
  	\`hero_section_cover_image_id\` integer,
  	\`philosophy_title\` text DEFAULT 'Our Philosophy',
  	\`philosophy_content\` text,
  	\`founder_name\` text NOT NULL,
  	\`founder_role\` text,
  	\`founder_bio\` text,
  	\`founder_portrait_id\` integer,
  	\`founder_years_active\` numeric,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_section_cover_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`founder_portrait_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`about_page_hero_section_hero_section_cover_image_idx\` ON \`about_page\` (\`hero_section_cover_image_id\`);`)
  await db.run(sql`CREATE INDEX \`about_page_founder_founder_portrait_idx\` ON \`about_page\` (\`founder_portrait_id\`);`)
  await db.run(sql`CREATE TABLE \`general_social_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`general\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`general_social_links_order_idx\` ON \`general_social_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`general_social_links_parent_id_idx\` ON \`general_social_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`general\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`footer_text\` text DEFAULT 'Morerolls Studio',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`contact_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`headline\` text DEFAULT 'Let''s Create Something Extraordinary.' NOT NULL,
  	\`email\` text NOT NULL,
  	\`phone\` text NOT NULL,
  	\`visit_us_show_section\` integer DEFAULT true,
  	\`visit_us_address\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  /*
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`services_id\` integer REFERENCES services(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_services_id_idx\` ON \`payload_locked_documents_rels\` (\`services_id\`);`)
  */
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`services_specs\`;`)
  await db.run(sql`DROP TABLE \`services_deliverables\`;`)
  await db.run(sql`DROP TABLE \`services\`;`)
  await db.run(sql`DROP TABLE \`root_page_medias_client_logos\`;`)
  await db.run(sql`DROP TABLE \`root_page_medias\`;`)
  await db.run(sql`DROP TABLE \`about_page_standards\`;`)
  await db.run(sql`DROP TABLE \`about_page\`;`)
  await db.run(sql`DROP TABLE \`general_social_links\`;`)
  await db.run(sql`DROP TABLE \`general\`;`)
  await db.run(sql`DROP TABLE \`contact_page\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`projects_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id", "projects_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id", "projects_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_projects_id_idx\` ON \`payload_locked_documents_rels\` (\`projects_id\`);`)
}
