// tools/check.mjs
//
// Meet de indexpagina in een headless Chromium, op 320, 375, 768, 1024 en 1600px,
// in licht en donker: geen horizontale overflow, lege console, geen mislukt of
// extern verzoek, Archivo 700 en 900 geladen en niets anders, elke afbeelding
// met width en height gelijk aan de echte maten, en robots.txt, sitemap.xml en
// og.png die een 200 geven. Draai dit na elke wijziging aan opmaak, kaarten of
// afbeeldingen:
//
//   NODE_PATH=/opt/node22/lib/node_modules node tools/check.mjs
//
// De repo wordt over een lokale http-server geserveerd, niet via file://, zodat
// je dezelfde pagina test als die GitHub Pages serveert.
//
// Playwright wordt niet in deze repo geinstalleerd (geen package.json, geen
// node_modules): het script gebruikt een globale installatie via NODE_PATH of
// de map in PLAYWRIGHT_MODULE, en de browser via PLAYWRIGHT_CHROMIUM. Zonder
// Playwright zegt het script wat er ontbreekt en stopt met code 2.

import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, join, extname, normalize } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const PAGES = ['/'];
const WIDTHS = [320, 375, 768, 1024, 1600];
const THEMES = ['light', 'dark'];
const STATIC = ['/robots.txt', '/sitemap.xml', '/og.png'];
const FONTS = ['Archivo 700', 'Archivo 900'];

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.woff2': 'font/woff2',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};

let chromium;
try {
  const require = createRequire(import.meta.url);
  const from = process.env.PLAYWRIGHT_MODULE
    ? join(process.env.PLAYWRIGHT_MODULE, 'index.js')
    : 'playwright';
  ({ chromium } = require(from));
} catch {
  console.error(
    'Playwright niet gevonden. Zet NODE_PATH naar een globale node_modules of\n' +
      'PLAYWRIGHT_MODULE naar de map van het playwright-pakket.'
  );
  process.exit(2);
}

const server = createServer(async (req, res) => {
  let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (path.endsWith('/')) path += 'index.html';
  const file = normalize(join(root, path));
  if (!file.startsWith(root)) { res.writeHead(403).end(); return; }
  try {
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': MIME[extname(file)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;

const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM || undefined,
});

let failures = 0;
const fail = (msg) => { failures++; console.log('FOUT ' + msg); };

for (const path of PAGES) {
  for (const theme of THEMES) {
    for (const width of WIDTHS) {
      const label = `${path} ${theme.padEnd(5)} ${String(width).padStart(4)}px`;
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      const problems = [];
      page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') problems.push(`console ${m.type()}: ${m.text()}`); });
      page.on('pageerror', (e) => problems.push(`pageerror: ${e.message}`));
      page.on('requestfailed', (r) => problems.push(`mislukt verzoek: ${r.url()}`));
      page.on('request', (r) => { if (!r.url().startsWith(base)) problems.push(`extern verzoek: ${r.url()}`); });
      await page.addInitScript((t) => { try { localStorage.setItem('theme', t); } catch {} }, theme);
      await page.goto(base + path, { waitUntil: 'load' });
      await page.evaluate(() => Promise.all([...document.images].map((i) => { i.loading = 'eager'; return i.decode().catch(() => {}); })));
      const r = await page.evaluate(async () => {
        await document.fonts.ready;
        return {
          scrollWidth: document.documentElement.scrollWidth,
          innerWidth: window.innerWidth,
          fonts: [...document.fonts].map((f) => `${f.family.replace(/"/g, '')} ${f.weight} ${f.status}`),
          images: [...document.images].map((i) => ({
            src: i.getAttribute('src'),
            ok: i.complete && i.naturalWidth === +i.getAttribute('width') && i.naturalHeight === +i.getAttribute('height'),
            natural: `${i.naturalWidth}x${i.naturalHeight}`,
            declared: `${i.getAttribute('width')}x${i.getAttribute('height')}`,
          })),
        };
      });
      if (r.scrollWidth > r.innerWidth) {
        problems.push(`overflow: scrollWidth ${r.scrollWidth} / innerWidth ${r.innerWidth}`);
        const wide = await page.evaluate(() =>
          [...document.querySelectorAll('body *')]
            .map((el) => ({ el, r: el.getBoundingClientRect() }))
            .filter(({ r }) => r.right > window.innerWidth + 0.5)
            .slice(0, 8)
            .map(({ el, r }) => `${el.tagName.toLowerCase()}${el.className ? '.' + String(el.className).split(' ').join('.') : ''} right=${Math.round(r.right)}`)
        );
        problems.push(...wide.map((w) => '  ' + w));
      }
      const loaded = r.fonts.filter((f) => f.endsWith(' loaded'));
      const names = loaded.map((f) => f.replace(' loaded', ''));
      for (const want of FONTS) if (!names.includes(want)) problems.push(`font niet geladen: ${want}`);
      for (const f of r.fonts) if (!FONTS.some((w) => f.startsWith(w + ' ')) ) problems.push(`onverwachte font: ${f}`);
      for (const f of r.fonts) if (f.startsWith('Archivo') && !f.endsWith(' loaded')) problems.push(`font niet geladen: ${f}`);
      for (const i of r.images) if (!i.ok) problems.push(`afbeelding ${i.src}: echt ${i.natural}, attributen ${i.declared}`);
      if (problems.length) { failures++; console.log(`FOUT ${label}\n      ${problems.join('\n      ')}`); }
      else console.log(`ok   ${label}  scrollWidth ${r.scrollWidth} / innerWidth ${r.innerWidth}`);
      await page.close();
    }
  }
}

for (const p of STATIC) {
  const res = await fetch(base + p);
  if (res.status === 200) console.log(`ok   ${p} geeft 200`);
  else fail(`${p} geeft ${res.status}`);
}

await browser.close();
server.close();
if (failures) {
  console.error(`\n${failures} controle(s) mislukt.`);
  process.exit(1);
}
console.log('\nGeen overflow, lege console, geen externe host, fonts en afbeeldingen kloppen.');
