import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  try {
    await db.run(sql`ALTER TABLE \`projects\` ADD \`order\` numeric;`)
  } catch (e) {
    // Ignore duplicate column error
  }
  try {
    await db.run(sql`ALTER TABLE \`projects\` ADD \`is_featured\` integer DEFAULT false;`)
  } catch (e) {
    // Ignore duplicate column error
  }
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`projects\` DROP COLUMN \`order\`;`)
  await db.run(sql`ALTER TABLE \`projects\` DROP COLUMN \`is_featured\`;`)
}
