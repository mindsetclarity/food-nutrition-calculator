/**
 * Shared test setup: importing this installs the extensionless-import resolve
 * hook and exports createTestDb(), an in-memory D1 look-alike over node:sqlite
 * with every migrations/*.sql applied in order.
 */
import { registerHooks } from 'node:module';
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Astro/Vite resolve extensionless relative imports; plain node does not.
registerHooks({
  resolve(spec, ctx, next) {
    if (spec.startsWith('.') && !/\.[cm]?[jt]s$/.test(spec)) {
      try { return next(spec + '.ts', ctx); } catch {}
    }
    return next(spec, ctx);
  }
});

// node:sqlite prints an ExperimentalWarning (emitted on next tick); filter only that one.
const emit = process.emit;
process.emit = function (name, data, ...rest) {
  if (name === 'warning' && data?.name === 'ExperimentalWarning' && /SQLite/.test(data.message)) return false;
  return emit.call(this, name, data, ...rest);
};
const { DatabaseSync } = await import('node:sqlite');

const migrationsDir = fileURLToPath(new URL('../../migrations/', import.meta.url));

export async function createTestDb() {
  const sqlite = new DatabaseSync(':memory:');
  sqlite.exec('PRAGMA foreign_keys = ON');
  for (const f of readdirSync(migrationsDir).filter((f) => f.endsWith('.sql')).sort()) {
    sqlite.exec(readFileSync(migrationsDir + f, 'utf8'));
  }

  const stmt = (sql, args = []) => ({
    bind: (...a) => stmt(sql, a),
    async first(col) {
      const row = sqlite.prepare(sql).get(...args) ?? null;
      return col && row ? row[col] : row;
    },
    async all() { return { results: sqlite.prepare(sql).all(...args) }; },
    async run() {
      const r = sqlite.prepare(sql).run(...args);
      return { meta: { changes: Number(r.changes), last_row_id: Number(r.lastInsertRowid) } };
    },
  });

  return {
    prepare: (sql) => stmt(sql),
    async batch(stmts) {
      sqlite.exec('BEGIN');
      try {
        const out = [];
        for (const s of stmts) out.push(await s.run());
        sqlite.exec('COMMIT');
        return out;
      } catch (e) {
        sqlite.exec('ROLLBACK');
        throw e;
      }
    },
  };
}
