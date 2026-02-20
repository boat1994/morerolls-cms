import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Wrapped in try/catch to be idempotent (dev mode may have already applied these)
  try { await db.run(sql`ALTER TABLE \`services\` ADD \`price_hide_pricing\` integer DEFAULT false;`) } catch {}
  try { await db.run(sql`ALTER TABLE \`general\` ADD \`footer_sub_description\` text;`) } catch {}
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  try { await db.run(sql`ALTER TABLE \`services\` DROP COLUMN \`price_hide_pricing\`;`) } catch {}
  try { await db.run(sql`ALTER TABLE \`general\` DROP COLUMN \`footer_sub_description\`;`) } catch {}
}
