#!/usr/bin/env npx tsx
/**
 * Auto-generate i18n locale barrel files.
 *
 * Scans `src/locales/en/` for translation modules and:
 * 1. Generates `src/locales/en/index.ts` (barrel)
 * 2. Generates `src/locales/id/index.ts` (barrel)
 * 3. Creates missing module stubs in `id/` for any
 *    module that exists in `en/` but not in `id/`
 *
 * Usage:
 *   npx tsx scripts/generate-i18n.ts
 *   make i18n
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname ?? __dirname, "..");
const LOCALES_DIR = path.join(ROOT, "src/locales");
const LANGS = ["en", "id"] as const;

function getModules(lang: string): string[] {
  const dir = path.join(LOCALES_DIR, lang);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => {
      if (f === "index.ts") return false;
      const full = path.join(dir, f);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) {
        return fs.existsSync(path.join(full, "index.ts"));
      }
      return f.endsWith(".ts") && !f.endsWith(".d.ts");
    })
    .map((f) => (f.endsWith(".ts") ? f.replace(/\.ts$/, "") : f))
    .sort();
}

function toCamelCase(kebab: string): string {
  return kebab.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
}

function generateBarrel(lang: string, modules: string[]): string {
  const imports = modules
    .map((m) => {
      const varName = toCamelCase(m);
      return `import ${varName} from "./${m}";`;
    })
    .join("\n");

  const spread = modules.map((m) => {
    const varName = toCamelCase(m);
    if (m === "common") return `  ...${varName},`;
    return `  ${varName},`;
  });

  return [
    "// AUTO-GENERATED — do not edit manually.",
    `// Run \`make i18n\` to regenerate.`,
    "",
    imports,
    "",
    `const ${lang} = {`,
    ...spread,
    "} as const;",
    "",
    `export default ${lang};`,
    "",
  ].join("\n");
}

function createStub(lang: string, moduleName: string): void {
  const dir = path.join(LOCALES_DIR, lang);
  const modPath = path.join(dir, moduleName);

  // Check if it's a directory in en
  const enModPath = path.join(LOCALES_DIR, "en", moduleName);
  const isDir =
    fs.existsSync(enModPath) && fs.statSync(enModPath).isDirectory();

  if (isDir) {
    const targetDir = modPath;
    const targetFile = path.join(targetDir, "index.ts");
    if (!fs.existsSync(targetFile)) {
      fs.mkdirSync(targetDir, { recursive: true });
      fs.writeFileSync(
        targetFile,
        [
          "// TODO: Add Indonesian translations",
          "export default {} as const;",
          "",
        ].join("\n")
      );
      console.info(`  Created stub: ${lang}/${moduleName}/index.ts`);
    }
  } else {
    const targetFile = `${modPath}.ts`;
    if (!fs.existsSync(targetFile)) {
      fs.writeFileSync(
        targetFile,
        [
          "// TODO: Add Indonesian translations",
          "export default {} as const;",
          "",
        ].join("\n")
      );
      console.info(`  Created stub: ${lang}/${moduleName}.ts`);
    }
  }
}

// ── Main ────────────────────────────────────────────
console.info("Generating i18n barrels...\n");

// Use EN as source of truth
const enModules = getModules("en");
console.info(`Found ${enModules.length} modules in en/`);

// Create missing stubs in other languages
for (const lang of LANGS) {
  if (lang === "en") continue;
  const existing = getModules(lang);
  const missing = enModules.filter((m) => !existing.includes(m));
  if (missing.length > 0) {
    console.info(`\nCreating ${missing.length} missing stubs in ${lang}/:`);
    for (const m of missing) {
      createStub(lang, m);
    }
  }
}

// Generate barrel for each language
for (const lang of LANGS) {
  const modules = getModules(lang);
  const content = generateBarrel(lang, modules);
  const outPath = path.join(LOCALES_DIR, lang, "index.ts");
  fs.writeFileSync(outPath, content);
  console.info(`\nWrote ${lang}/index.ts (${modules.length} modules)`);
}

console.info("\nDone!");
