import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Create root_page_medias_locales table for localized hero title/subtitle
  // (root-page-medias global has no localized fields yet, so this table doesn't exist)
  // Using IF NOT EXISTS to be idempotent
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`root_page_medias_locales\` (
    \`hero_video_hero_title\` text DEFAULT 'MOREROLLS STUDIO',
    \`hero_video_hero_subtitle\` text DEFAULT 'Cinematic Visual Storytelling',
    \`id\` integer PRIMARY KEY NOT NULL,
    \`_locale\` text NOT NULL,
    \`_parent_id\` integer NOT NULL,
    FOREIGN KEY (\`_parent_id\`) REFERENCES \`root_page_medias\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );`)
  try {
    await db.run(sql`CREATE UNIQUE INDEX \`root_page_medias_locales_locale_parent_id_unique\` ON \`root_page_medias_locales\` (\`_locale\`,\`_parent_id\`);`)
  } catch {}
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  try { await db.run(sql`DROP TABLE \`root_page_medias_locales\`;`) } catch {}
}
