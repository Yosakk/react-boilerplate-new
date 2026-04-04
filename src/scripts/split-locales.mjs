/* ESM version */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import process from 'node:process';

const inputFile = process.argv[2]; // e.g. src/locales/en.ts
const lang = process.argv[3];      // e.g. en

if (!inputFile || !lang) {
  console.error('Usage: node scripts/split-locales.mjs <inputFile> <lang>');
  process.exit(1);
}

const outDir = path.join(process.cwd(), 'src', 'locales', lang);

const toKebab = (s) =>
  String(s)
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();

const toVar = (s) => {
  let v = String(s).replace(/[^a-zA-Z0-9_]/g, '_');
  if (/^[0-9]/.test(v)) v = '_' + v;
  return v;
};

async function ensureDir(p) {
  if (!existsSync(p)) {
    await mkdir(p, { recursive: true });
  }
}

function sanitizeToCJS(tsSource) {
  // cukup untuk kasus "export default { ... } as const;"
  return tsSource
    .replace(/export\s+default\s+/g, 'module.exports = ')
    .replace(/\s+as\s+const\s*;?/g, ';')
    .concat(tsSource.trim().endsWith(';') ? '' : ';');
}

async function loadObjectFromTs(filePath) {
  const raw = await readFile(filePath, 'utf8');
  const code = sanitizeToCJS(raw);
  const sandbox = { module: { exports: {} }, exports: {} };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: filePath });
  const data = sandbox.module.exports?.default || sandbox.module.exports;
  if (!data || typeof data !== 'object') {
    throw new Error('Locale file did not export an object.');
  }
  return data;
}

async function writeTsObject(filePath, obj) {
  const content = `export default ${JSON.stringify(obj, null, 2)} as const;\n`;
  await writeFile(filePath, content, 'utf8');
}

async function main() {
  const data = await loadObjectFromTs(inputFile);

  await ensureDir(outDir);

  const common = {};
  const featureKeys = [];

  for (const [k, v] of Object.entries(data)) {
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      const folder = path.join(outDir, toKebab(k));
      await ensureDir(folder);
      await writeTsObject(path.join(folder, 'index.ts'), v);
      featureKeys.push(k);
    } else {
      common[k] = v;
    }
  }

  // tulis common
  const commonDir = path.join(outDir, 'common');
  await ensureDir(commonDir);
  await writeTsObject(path.join(commonDir, 'index.ts'), common);

  // tulis aggregator
  const importLines = [
    `import common from './common';`,
    ...featureKeys.map((k) => `import ${toVar(k)} from './${toKebab(k)}';`),
  ].join('\n');

  const spreadLines = [
    '  ...common,',
    ...featureKeys.map((k) => `  ${k}: ${toVar(k)},`),
  ].join('\n');

  const aggregator = `${importLines}

const ${lang} = {
${spreadLines}
} as const;

export default ${lang};
`;

  await writeFile(path.join(outDir, 'index.ts'), aggregator, 'utf8');

  console.log(`✅ Split done for ${lang}: ${outDir}`);
}

main().catch((e) => {
  console.error('❌ Error:', e.message);
  process.exit(1);
});
