import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export type Lesson = CollectionEntry<'lessons'>;

/** Numerischer Schlüssel: Modul * 1000 + Lektionsnummer (aus Slug). */
function lessonOrder(l: Lesson): number {
  const m = l.data.module;
  const match = l.data.slug.match(/^modul-\d+-(?:[a-z-]+-)?(\d+)-/);
  const n = match ? parseInt(match[1], 10) : 0;
  return m * 1000 + n;
}

/** Lektionen in Kursreihenfolge (Modul 0→17, Lektion aufsteigend). */
export async function getSortedLessons(): Promise<Lesson[]> {
  const all = await getCollection('lessons');
  return all.sort((a, b) => lessonOrder(a) - lessonOrder(b));
}

/**
 * Basis-Pfad (GitHub Pages) an einen Pfad anhängen.
 * Astro präfixiert absolute Pfade bereits selbst – daher relative Pfade nutzen.
 */
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const rel = path.replace(/^\/+/, '');
  return base + '/' + rel;
}
