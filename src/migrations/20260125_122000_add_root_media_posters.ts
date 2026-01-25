import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`root_page_medias\` ADD COLUMN \`hero_video_desktop_poster_id\` integer REFERENCES \`media\`(\`id\`);`)
  await db.run(sql`CREATE INDEX \`root_page_medias_desktop_poster_idx\` ON \`root_page_medias\` (\`hero_video_desktop_poster_id\`);`)
  
  await db.run(sql`ALTER TABLE \`root_page_medias\` ADD COLUMN \`hero_video_mobile_poster_id\` integer REFERENCES \`media\`(\`id\`);`)
  await db.run(sql`CREATE INDEX \`root_page_medias_mobile_poster_idx\` ON \`root_page_medias\` (\`hero_video_mobile_poster_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // D1/SQLite doesn't easily support dropping columns without table rebuild in some versions, 
  // but if supported this would be the logic.
  try {
    await db.run(sql`ALTER TABLE \`root_page_medias\` DROP COLUMN \`hero_video_desktop_poster_id\`;`)
    await db.run(sql`ALTER TABLE \`root_page_medias\` DROP COLUMN \`hero_video_mobile_poster_id\`;`)
  } catch (e) {
    // Ignore error if drop column not supported
  }
}
