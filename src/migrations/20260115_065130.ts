import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`projects\` ADD \`order\` numeric;`)
  await db.run(sql`ALTER TABLE \`projects\` ADD \`is_featured\` integer DEFAULT false;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`projects\` DROP COLUMN \`order\`;`)
  await db.run(sql`ALTER TABLE \`projects\` DROP COLUMN \`is_featured\`;`)
}
