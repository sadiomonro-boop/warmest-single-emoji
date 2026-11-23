import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One Emoji, One Smile — make.fun bounty u-0xkianno-one-emoji-one-smile-5470751f
//
// The entry is exactly one emoji: a smiling face with hearts.
// A stranger reads it at a glance as warm, friendly and kind —
// a smile first, hearts second. It is not the default smiley:
// the hearts make it feel chosen for the moment, while the face
// itself stays instantly readable at any age, in any culture,
// with no irony, no in-joke, no intimacy and no flirtation.

const EMOJI = "🥰";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
const outPath = join(outputDir, "entry.txt");
writeFileSync(outPath, EMOJI, "utf8");

// Defensive self-check: the bounty gate accepts UTF-8 text of 1-8
// characters, not only whitespace. Read the file back and fail loudly
// instead of silently submitting a broken entry.
const written = readFileSync(outPath, "utf8");
if ([...written].length !== 1 || written.trim().length === 0) {
  throw new Error(`entry.txt must hold exactly one emoji, got: ${JSON.stringify(written)}`);
}
if (Buffer.byteLength(written, "utf8") > 8) {
  throw new Error(`entry.txt must be at most 8 bytes, got ${Buffer.byteLength(written, "utf8")}`);
}
