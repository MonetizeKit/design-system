// Ship src/styles.css as dist/styles.css (the `@monetizekit/ui-react/styles.css` export).
// Runs after `tsup`. See package.json "build".
import { cp, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const pkgDir = resolve(here, "..");
await mkdir(resolve(pkgDir, "dist"), { recursive: true });
await cp(resolve(pkgDir, "src/styles.css"), resolve(pkgDir, "dist/styles.css"));
console.log("ui-react: shipped dist/styles.css");
