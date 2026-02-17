import { readdir } from "node:fs/promises";
import path from "node:path";

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif"]);

function isAllowedImageFile(name: string): boolean {
  const ext = path.extname(name).toLowerCase();
  return IMAGE_EXTENSIONS.has(ext);
}

function encodePathSegments(...segments: string[]): string {
  return segments.map((s) => encodeURIComponent(s)).join("/");
}

function parseLeadingNumber(name: string): number | null {
  // Examples:
  // - "01.늑대와 미녀 (Wolf)" -> 1
  // - "16.Cream Soda" -> 16
  const match = name.match(/^\s*(\d{1,3})\s*[.\-_\s]/);
  if (!match) return null;
  const n = Number(match[1]);
  return Number.isFinite(n) ? n : null;
}

function stripLeadingNumber(name: string): string {
  return name.replace(/^\s*\d{1,3}\s*[.\-_\s]+/, "").trim();
}

function extractEnglishTitle(name: string): string {
  const target = stripLeadingNumber(name);
  const parenMatches = [...target.matchAll(/\(([^)]+)\)/g)].map((m) => m[1]);
  const englishInParens = parenMatches.filter((value) => /[A-Za-z]/.test(value));

  if (englishInParens.length) {
    return englishInParens[englishInParens.length - 1].trim();
  }

  return target
    .replace(/[^A-Za-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function toSlug(name: string): string {
  const stripped = stripLeadingNumber(name);
  const hasHangul = /[\uAC00-\uD7A3]/.test(stripped);
  const base = hasHangul ? extractEnglishTitle(name) : stripped;

  return base
    .replace(/[.]/g, "")
    .replace(/[()]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
    .toLowerCase();
}

export type CheeringSongAsset = {
  type: "image";
  src: string;
  alt: string;
};

export type CheeringSong = {
  id: string; // folder name under public/images/concert/cheering
  slug: string;
  label: string;
  order: number | null;
  coverSrc: string | null;
  youtubeUrl: string | null;
  hasGuide: boolean;
  guideAssets: CheeringSongAsset[];
};

const YOUTUBE_BY_SLUG: Record<string, string> = {
  mama: "https://music.youtube.com/watch?v=uVAdqc1oX7g&si=JbbedrwA0zlRwzF9",
  wolf: "https://music.youtube.com/watch?v=nViHrml-LtU&si=_oQDihgFUChJOreh",
  growl: "https://music.youtube.com/watch?v=qWvVSBUfLfE&si=y4IP2T3oENJAh7iZ",
  overdose: "https://music.youtube.com/watch?v=NWqC0vSVbX4&si=ezsVBOYhEwvIrx1a",
  "call-me-baby": "https://music.youtube.com/watch?v=Wu8halh9DXs&si=gCEvvOiwEEC52G8H",
  "love-me-right": "https://music.youtube.com/watch?v=r4ZPGfwqmI0&si=7fTHstH7g0YM6oEo",
  unfair: "https://music.youtube.com/watch?v=nyhA7ZStGRQ&si=vh1CXb1MfOrcJn3r",
  monster: "https://music.youtube.com/watch?v=KJevaDSz7Nc&si=fdr8JO2Sbdug99iC",
  "lucky-one": "https://music.youtube.com/watch?v=jUkvoXONF3k&si=S_Kqc5EODzchF_Cy",
  lotto: "https://music.youtube.com/watch?v=90USL2nsoDU&si=-bh2OLtQ2IhZPlej",
  "the-eve": "https://music.youtube.com/watch?v=gK8YC0nxNe0&si=yTQxkRm5lIh_o9TB",
  "ko-ko-bop": "https://music.youtube.com/watch?v=J9HqEvgm3CA&si=FgQuV2ehIaqM0XFc",
  power: "https://music.youtube.com/watch?v=K4v7sAgwJCU&si=Vasbq7Q9KkM3sraH",
  tempo: "https://music.youtube.com/watch?v=zJZjiaVPDiM&si=_OYO7rqa-ddOkHkV",
  "ooh-la-la-la": "https://music.youtube.com/watch?v=8l4OGw3bEto&si=kaPcWqhJ-i8TaodL",
  "love-shot": "https://music.youtube.com/watch?v=KmRqHwJrTKQ&si=hTqKq2Du9rE7VXpr",
  obsession: "https://music.youtube.com/watch?v=TadhhUt9BPc&si=X1Umr1McJ2sOmU_h",
  "cream-soda": "https://music.youtube.com/watch?v=mA-2ZBpAbeo&si=Xv7kko9m_JKIYA21",
  crown: "https://music.youtube.com/watch?v=mbiN9853aic&si=aaiWI0lhog30FhM3",
};

async function listFilesIfExists(dirPath: string): Promise<string[]> {
  try {
    const entries = await readdir(dirPath, { withFileTypes: true });
    return entries.filter((e) => e.isFile()).map((e) => e.name);
  } catch {
    return [];
  }
}

export async function getCheeringSongs(): Promise<CheeringSong[]> {
  const rootDir = path.join(process.cwd(), "public", "images", "concert", "cheering");
  const entries = await readdir(rootDir, { withFileTypes: true });

  const dirs = entries
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .filter((name) => !name.startsWith("."));

  const songs = await Promise.all(
    dirs.map(async (dirName) => {
      const order = parseLeadingNumber(dirName);
      const label = stripLeadingNumber(dirName) || dirName;
      const slug = toSlug(dirName);

      const albumArtDir = path.join(rootDir, dirName, "album-art");
      const guideDir = path.join(rootDir, dirName, "guide");

      const albumFiles = (await listFilesIfExists(albumArtDir))
        .filter((n) => !n.startsWith("."))
        .filter(isAllowedImageFile)
        .sort((a, b) => a.localeCompare(b, "ko"));

      const guideFiles = (await listFilesIfExists(guideDir))
        .filter((n) => !n.startsWith("."))
        .filter(isAllowedImageFile)
        .sort((a, b) => a.localeCompare(b, "ko"));

      const coverSrc = albumFiles.length
        ? `/images/concert/cheering/${encodePathSegments(dirName, "album-art", albumFiles[0])}`
        : null;

      const guideAssets: CheeringSongAsset[] = guideFiles.map((file) => ({
        type: "image",
        src: `/images/concert/cheering/${encodePathSegments(dirName, "guide", file)}`,
        alt: `${label} 응원법`,
      }));

      return {
        id: dirName,
        slug,
        label,
        order,
        coverSrc,
        youtubeUrl: YOUTUBE_BY_SLUG[slug] ?? null,
        hasGuide: guideAssets.length > 0,
        guideAssets,
      } satisfies CheeringSong;
    })
  );

  // Sort by leading number DESC (reverse order), then by label.
  songs.sort((a, b) => {
    const ao = a.order;
    const bo = b.order;

    if (ao != null && bo != null) return bo - ao;
    if (ao != null) return -1;
    if (bo != null) return 1;

    return a.label.localeCompare(b.label, "ko");
  });

  return songs;
}

export async function getCheeringSongById(id: string): Promise<CheeringSong | null> {
  const songs = await getCheeringSongs();

  // The URL segment may be encoded; we try best-effort decode.
  let decoded = id;
  try {
    decoded = decodeURIComponent(id);
  } catch {
    // ignore
  }

  return songs.find((s) => s.slug === decoded) ?? null;
}
