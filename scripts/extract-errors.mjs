import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const lessonsDir = join(root, 'content', 'lessons');
const files = readdirSync(lessonsDir).filter((f) => f.endsWith('.mdx')).sort();

const entries = [];
let counter = 0;

for (const file of files) {
  const raw = readFileSync(join(lessonsDir, file), 'utf8');
  const fm = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!fm) continue;
  const slug = (fm[1].match(/^slug:\s*"?(.+?)"?\s*$/m) ?? [])[1]?.trim();
  const title = (fm[1].match(/^title:\s*"?(.+?)"?\s*$/m) ?? [])[1]?.trim();
  const module = Number((fm[1].match(/^module:\s*(\d+)\s*$/m) ?? [])[1]);
  if (!slug || !title || Number.isNaN(module)) continue;

  // Abschnitt 4 "Berühmte Fehler + Lösungen" isolieren
  const sec = raw.match(/## 4\.[^\n]*\n([\s\S]*?)(?=\n## 5\.|\n## Ticket-Szenario|\n## 6\.|$)/);
  if (!sec) continue;
  const body = sec[1];

  // Fehlerblöcke: "**Fehler N: "Titel"**" + 5 Felder
  const blocks = body.split(/\n\*+Fehler\s+\d+/).slice(1);
  blocks.forEach((block, i) => {
    const titleM = block.match(/^\s*[:\-–]?\s*"?([^"\n]+)"?\s*\*/);
    const field = (name) => {
      const m = block.match(new RegExp(`^- ${name}:\\s*(.+)$`, 'm'));
      return m ? m[1].trim() : '';
    };
    const symptom = field('Symptom');
    const cause = field('Ursache');
    const diagnosis = field('Diagnose');
    const solution = field('Lösung');
    const prevention = field('Prävention');
    if (!symptom && !cause) return;
    const errTitle = (titleM ? titleM[1] : `Fehler ${i + 1}`).replace(/^["']|["']$/g, '').trim();
    // Tags ableiten aus Schlüsselwörtern
    const tags = [];
    const hay = (errTitle + ' ' + symptom + ' ' + cause).toLowerCase();
    const tagMap = {
      domain: ['domain', 'ad'], dns: ['dns', 'netzwerk'], netzwerk: ['netzwerk', 'dns'],
      vm: ['vm', 'virtualisierung'], snapshot: ['snapshot', 'vm'], backup: ['backup', 'recovery'],
      powershell: ['powershell'], gpo: ['gpo', 'policy'], rdp: ['rdp', 'remote'],
      drucker: ['drucker', 'hardware'], hardware: ['hardware'], disk: ['disk', 'hardware'],
      windows: ['windows'], update: ['update', 'patch'], mfa: ['mfa', 'security'],
      security: ['security'], phishing: ['phishing', 'security'], outlook: ['outlook', 'm365'],
      teams: ['teams', 'm365'], bitlocker: ['bitlocker', 'security'], lizenz: ['lizenz'],
      treiber: ['treiber', 'hardware'], speicher: ['speicher', 'performance'],
      performance: ['performance'], service: ['service', 'dienst'],
      dokumentation: ['documentation'], eskalation: ['eskalation', 'ticket'],
      ticket: ['ticket', 'prozess'], sla: ['sla', 'ticket'], itil: ['itil', 'prozess'],
      projekt: ['project'], karriere: ['career'], zertifikat: ['certification', 'career'],
      prüfung: ['exam'], vlan: ['vlan', 'netzwerk'], firewall: ['firewall', 'netzwerk'],
      dhcp: ['dhcp', 'netzwerk'], wlan: ['wlan', 'netzwerk'], vpn: ['vpn', 'netzwerk'],
      remote: ['remote'], support: ['support'], m365: ['m365'], intune: ['intune'],
      entra: ['entra'], defender: ['defender', 'security'], exchange: ['exchange', 'm365'],
      scripting: ['powershell'], path: ['paths', 'powershell'], installation: ['install'],
    };
    for (const [key, list] of Object.entries(tagMap)) {
      if (hay.includes(key) && list.every((t) => !tags.includes(t))) tags.push(...list);
    }
    if (!tags.length) tags.push('allgemein');
    counter++;
    entries.push({
      id: `E${String(module).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}-${counter}`,
      module,
      lessonSlug: slug,
      lessonTitle: title,
      title: errTitle,
      symptom,
      cause,
      diagnosis,
      solution,
      prevention,
      tags: tags.slice(0, 4),
    });
  });
}

// IDs auf Modul-Lektions-Schema normalisieren: E<mod>-<lektion>-<nr> (global eindeutig)
const perLesson = new Map();
const usedIds = new Set();
const out = entries.map((e) => {
  const key = `${e.module}|${e.lessonSlug}`;
  const n = (perLesson.get(key) ?? 0) + 1;
  perLesson.set(key, n);
  let lessonNo = (e.lessonSlug.match(/^modul-\d+-[a-z-]*?-(\d+)-/) ?? [])[1] ?? '00';
  let id = `E${String(e.module).padStart(2, '0')}-${lessonNo}-${n}`;
  let seq = 1;
  while (usedIds.has(id)) {
    id = `E${String(e.module).padStart(2, '0')}-${String(lessonNo).padStart(2, '0')}${String(seq).padStart(2, '0')}-${n}`;
    seq++;
  }
  usedIds.add(id);
  return { ...e, id };
});

const esc = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
const lines = out.map((e) =>
  `  { id: '${esc(e.id)}', module: ${e.module}, lessonSlug: '${esc(e.lessonSlug)}', lessonTitle: '${esc(e.lessonTitle)}', title: '${esc(e.title)}', symptom: '${esc(e.symptom)}', cause: '${esc(e.cause)}', diagnosis: '${esc(e.diagnosis)}', solution: '${esc(e.solution)}', prevention: '${esc(e.prevention)}', tags: [${e.tags.map((t) => `'${esc(t)}'`).join(', ')}] },`
);

const content = `export interface ErrorEntry {
  id: string;
  module: number;
  lessonSlug: string;
  lessonTitle: string;
  title: string;
  symptom: string;
  cause: string;
  diagnosis: string;
  solution: string;
  prevention: string;
  tags: string[];
}

export const errors: ErrorEntry[] = [
${lines.join('\n')}
];
`;

writeFileSync(join(root, 'src', 'data', 'errors.ts'), content, 'utf8');
console.log('entries:', out.length);
console.log('lessons covered:', perLesson.size);
