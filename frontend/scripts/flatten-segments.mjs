// Runs after `next build` (postbuild).
//
// Next.js 16 static export creates "segment prefetch" files such as
//   dist/services/__next.services.__PAGE__.txt
// and the browser asks the server for exactly that flat file name.
// A Windows build can write them as a folder instead:
//   dist/services/__next.services/__PAGE__.txt
// The server then answers 404 for every link prefetch.
// This script copies the folder form to the flat name. On Linux/Mac it does nothing.
import { existsSync, mkdirSync, readdirSync, statSync, copyFileSync } from "node:fs";
import { join, dirname } from "node:path";

const DIST = "dist";
let created = 0;

function files(dir, rel = []) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...files(full, [...rel, name]));
    else out.push({ full, rel: [...rel, name] });
  }
  return out;
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (!statSync(full).isDirectory()) continue;

    if (name.startsWith("__next.")) {
      for (const f of files(full)) {
        const flat = join(dir, `${name}.${f.rel.join(".")}`);
        if (!existsSync(flat)) {
          mkdirSync(dirname(flat), { recursive: true });
          copyFileSync(f.full, flat);
          created++;
        }
      }
    } else {
      walk(full);
    }
  }
}

if (existsSync(DIST)) {
  walk(DIST);
  console.log(`flatten-segments: ${created} prefetch file(s) created`);
} else {
  console.log("flatten-segments: dist folder not found, skipped");
}
