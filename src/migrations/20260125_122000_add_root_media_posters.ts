import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Wrapped in try/catch to be idempotent (dev mode may have already applied these)
  try { await db.run(sql`ALTER TABLE \`root_page_medias\` ADD COLUMN \`hero_video_desktop_poster_id\` integer REFERENCES \`media\`(\`id\`);`) } catch {}
  try { await db.run(sql`CREATE INDEX \`root_page_medias_desktop_poster_idx\` ON \`root_page_medias\` (\`hero_video_desktop_poster_id\`);`) } catch {}
  try { await db.run(sql`ALTER TABLE \`root_page_medias\` ADD COLUMN \`hero_video_mobile_poster_id\` integer REFERENCES \`media\`(\`id\`);`) } catch {}
  try { await db.run(sql`CREATE INDEX \`root_page_medias_mobile_poster_idx\` ON \`root_page_medias\` (\`hero_video_mobile_poster_id\`);`) } catch {}
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  try { await db.run(sql`ALTER TABLE \`root_page_medias\` DROP COLUMN \`hero_video_desktop_poster_id\`;`) } catch {}
  try { await db.run(sql`ALTER TABLE \`root_page_medias\` DROP COLUMN \`hero_video_mobile_poster_id\`;`) } catch {}
}
