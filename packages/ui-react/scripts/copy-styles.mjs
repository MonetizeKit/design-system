// Ship src/styles.css as dist/styles.css (the `@monetizekit/ui-react/styles.css` export) and
// re-assert the "use client" directive on the client entry (esbuild/tsup strips it during bundling).
// Runs after `tsup`. See package.json "build".
import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const pkgDir = resolve(here, "..");
const distDir = resolve(pkgDir, "dist");
await mkdir(distDir, { recursive: true });
await cp(resolve(pkgDir, "src/styles.css"), resolve(distDir, "styles.css"));

// Prepend `"use client";` as the first statement of the client bundle(s) so Next.js treats them as
// a client boundary. Idempotent: only prepends when the directive is not already present.
const DIRECTIVE = '"use client";';
for (const file of ["client.js", "client.cjs"]) {
  const target = resolve(distDir, file);
  let contents;
  try {
    contents = await readFile(target, "utf8");
  } catch {
    continue;
  }
  if (contents.startsWith('"use client"') || contents.startsWith("'use client'")) continue;
  await writeFile(target, `${DIRECTIVE}\n${contents}`, "utf8");
}
console.log('ui-react: shipped dist/styles.css and asserted "use client" on the client entry');
