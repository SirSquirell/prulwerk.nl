// tools/make-og.mjs
//
// Rendert og.png (1200x630) uit de zelfgehoste Archivo en het merkpalet, zodat het
// beeld bij een rebrand opnieuw te maken is. Geen projectbeelden erin: die wisselen.
//
//   NODE_PATH=/opt/node22/lib/node_modules node tools/make-og.mjs
//
// Playwright komt uit een globale installatie, zie tools/check.mjs.

import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

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

// Als data-URI, want een pagina uit setContent mag geen file:// laden. Alleen in het geheugen.
const font = 'data:font/woff2;base64,' + readFileSync(join(root, 'fonts', 'archivo-900.woff2')).toString('base64');
const html = `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:Archivo;font-weight:900;src:url("${font}") format("woff2")}
html,body{margin:0;width:1200px;height:630px;background:#050505;overflow:hidden}
.t{position:absolute;left:80px;top:190px;font:900 150px/1 Archivo,sans-serif;letter-spacing:-.02em;color:#F2F2F0}
.t span{color:#C9F531}
p{position:absolute;left:84px;top:380px;width:900px;margin:0;font:900 34px/1.4 Archivo,sans-serif;color:#83837E}
.bar{position:absolute;left:0;bottom:0;width:1200px;height:24px;background:#C9F531}
</style>
<div class="t">prulwerk<span>.nl</span></div>
<p>Kleine projecten van Mathijs. Wat af genoeg is om te delen staat hier.</p>
<div class="bar"></div>`;

const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM || undefined,
});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(html);
await page.evaluate(() => document.fonts.load('900 150px Archivo'));
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: join(root, 'og.png'), type: 'png' });
await browser.close();
console.log('og.png geschreven');
