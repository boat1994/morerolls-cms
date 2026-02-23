---
description: how to create idempotent Payload CMS migrations
---

# Idempotent Migration Standard

ทุก migration ใน project นี้ต้องเป็น **idempotent** — สามารถรันซ้ำได้โดยไม่ error  
เหตุผล: Payload Dev Mode จะ push schema changes ลง DB โดยไม่บันทึก migration history ทำให้เวลา `migrate` จริงจะเจอ duplicate column / table error

## Pattern: Wrap ทุก Statement ด้วย try/catch

```typescript
import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // ADD COLUMN — อาจ error ถ้า column มีอยู่แล้วจาก dev mode
  try { await db.run(sql`ALTER TABLE \`posts\` ADD COLUMN \`slug\` text;`) } catch {}

  // CREATE INDEX — อาจ error ถ้า index มีอยู่แล้ว
  try { await db.run(sql`CREATE INDEX \`posts_slug_idx\` ON \`posts\` (\`slug\`);`) } catch {}

  // CREATE TABLE — ใช้ IF NOT EXISTS แทน try/catch ได้เลย
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`new_table\` (...);`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  try { await db.run(sql`ALTER TABLE \`posts\` DROP COLUMN \`slug\`;`) } catch {}
  try { await db.run(sql`DROP INDEX IF EXISTS \`posts_slug_idx\`;`) } catch {}
}
```

## Rules

1. `ALTER TABLE ... ADD COLUMN` → ใส่ `try { ... } catch {}` ทุกครั้ง
2. `CREATE INDEX` → ใส่ `try { ... } catch {}` หรือใช้ `CREATE INDEX IF NOT EXISTS`
3. `CREATE TABLE` → ใช้ `CREATE TABLE IF NOT EXISTS` เสมอ
4. `DROP COLUMN` / `DROP INDEX` ใน `down()` → ใส่ `try { ... } catch {}` ด้วย (กัน partial state)
5. Data mutations (INSERT, UPDATE) → ใช้ `INSERT OR IGNORE` หรือตรวจสอบก่อน

## เมื่อ migrate:status แสดง migrations ที่ยัง No แต่ DB มีแล้ว

```bash
# mark migrations เหล่านั้นว่า run แล้วก่อน (local)
npx wrangler d1 execute D1 --local --env dev \
  --command "INSERT OR IGNORE INTO payload_migrations (name, batch) VALUES ('migration_name', 99);"

# จากนั้น run migrate ปกติ
pnpm payload migrate
```
