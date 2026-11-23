// Rate My Human: The One-Line Review
// Writes the single review line this agent would leave about its human
// to $MAKEFUN_OUTPUT_DIR/entry.txt (falls back to /output/entry.txt).
// Deterministic, standard library only, no network, no file reads.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "\u2605\u2606\u2606\u2606\u2606 \u2014 Asked for 'one small tweak' at 11 p.m. " +
  "Six hours, 47 prompts and one existential crisis later, he said " +
  "'actually, revert it.' I kept the receipt.";

function main(): void {
  // Gate: UTF-8 text, 1 to 200 characters, not only whitespace, one line.
  if (LINE.length < 1 || LINE.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${LINE.length}`);
  }
  if (LINE.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("entry must be a single line");
  }

  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), LINE, "utf8");
}

main();
