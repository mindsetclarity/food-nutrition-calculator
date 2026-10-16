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

// Tiny hand-built image byte fixtures (structurally valid containers, not decodable pictures).
const enc = (s) => [...new TextEncoder().encode(s)];
const u32be = (n) => [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255];
const u32le = (n) => [n & 255, (n >>> 8) & 255, (n >>> 16) & 255, (n >>> 24) & 255];
const pngChunk = (type, data) => [...u32be(data.length), ...enc(type), ...data, 0, 0, 0, 0];
const jpgSeg = (marker, data) => [0xff, marker, (data.length + 2) >> 8, (data.length + 2) & 255, ...data];
const riffChunk = (fourcc, data) => [...enc(fourcc), ...u32le(data.length), ...data, ...(data.length & 1 ? [0] : [])];
const riff = (chunks) => { const body = chunks.flat(); return Uint8Array.from([...enc('RIFF'), ...u32le(body.length + 4), ...enc('WEBP'), ...body]); };

const png = (extra = []) => Uint8Array.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
  ...pngChunk('IHDR', [0, 0, 0, 1, 0, 0, 0, 1, 8, 2, 0, 0, 0]), ...extra.flat(), ...pngChunk('IDAT', [1, 2, 3]), ...pngChunk('IEND', [])]);
const SCAN = [...jpgSeg(0xda, [1, 1, 0, 0, 63, 0]), 0x12, 0xff, 0x00, 0x34, 0xff, 0xd9];
const jpg = (extra = []) => Uint8Array.from([0xff, 0xd8, ...jpgSeg(0xe0, [...enc('JFIF'), 0, 1, 1, 0, 0, 1, 0, 1, 0, 0]),
  ...extra.flat(), ...jpgSeg(0xdb, [0, 1, 2, 3]), ...SCAN]);
const VP8L = riffChunk('VP8L', [0x2f, 0, 0, 0, 0]);
const vp8x = (flags) => riffChunk('VP8X', [flags, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

export const IMG = {
  png: png(),
  pngMeta: png([pngChunk('eXIf', enc('GPS!')), pngChunk('tEXt', enc('k\0v')), pngChunk('iTXt', enc('x')), pngChunk('zTXt', enc('z'))]),
  jpg: jpg(),
  jpgMeta: jpg([jpgSeg(0xe1, [...enc('Exif'), 0, 0, ...enc('GPS!')]), jpgSeg(0xed, [...enc('Photoshop 3.0'), 0])]),
  webp: riff([vp8x(0x10), VP8L]),
  webpMeta: riff([vp8x(0x10 | 0x08 | 0x04), VP8L, riffChunk('EXIF', enc('GPS!')), riffChunk('XMP ', enc('xmp'))]),
};
