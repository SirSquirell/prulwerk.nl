# Backlog prulwerk.nl

Stories voor de indexpagina. Een nummer is geclaimd zodra het hier op `main` staat; het
eerstvolgende vrije nummer staat onderaan. Status: **eigenaar** (alleen Mathijs kan het
doen), **open** (nog te bouwen), **gebouwd** (klaar, blijft staan als spoor van wat er is
besloten).

Vorm per story: Waarom, Scope, Acceptatiecriteria, Afhankelijkheden, Test. Geen story
zonder test, ook als de test "met de hand, zo" is.

---

## PW-01 Twee gemergede `claude/*` branches verwijderen

**Status:** eigenaar

**Waarom.** `origin/claude/go-rjnrlq` (22 aug) en `origin/claude/skills-overview-gvlckf`
(23 aug) staan nog op GitHub. Allebei volledig gemerged, nul commits voor op `main`. Een
branch die niemand meer ziet is waar werk twee keer gedaan wordt; dat is in Claudiclaude al
eens met 23 branches misgegaan.

**Scope.** De twee branches op de remote verwijderen. `claude/fable-5-tr3otb` gaat mee zodra
de commits van 2 september op `main` staan. Niets aan `main` zelf.

**Acceptatiecriteria.**
- `git branch -r` toont alleen `origin/main`.
- Geen verlies: `git rev-list --count origin/main..<branch>` was 0 voor beide voordat ze
  weggingen.

**Afhankelijkheden.** Schrijfrecht op de repo; een sessie heeft dat niet.

**Test.** `git fetch --prune && git branch -r` na afloop.

---

## PW-02 Skill `prulwerk-huisstijl` meenemen in de tokenwijziging van text-3

**Status:** eigenaar

**Waarom.** De skill noemt in `SKILL.md` en `references/tokens.css` nog `#6B6B67` (donker)
en `#86867F` (licht) als "Tekst, label". Deze pagina en asteria.prulwerk.nl gebruiken die
kleur als echte tekst, en gemeten haalt hij daar 3,1 tot 3,8:1. De pagina is op
2 september naar `#83837E` en `#6B6B66` gegaan (zie CLAUDE.md, palettabel). Zolang de skill
de oude waarde geeft, zet de volgende nieuwe pagina hem er weer in.

**Scope.** De rij "Tekst, label" in `SKILL.md`, de bijbehorende regels in
`references/tokens.css`, en een zin dat de kleur 4,5:1 moet halen op elk vlak waar hij op
staat, inclusief de tweede kaartlaag `#191919` / `#EDEDE9`. `scripts/check-contrast.py`
toetst de labelkleur nu tegen 3,0; dat is de grens voor grafische elementen, niet voor
tekst, en moet naar 4,5 zodat het script de fout de volgende keer zelf vindt. De skill staat buiten deze repo
(gesynchroniseerde skill van Mathijs), dus dit kan alleen hij.

**Acceptatiecriteria.**
- `grep -rn "6B6B67\|86867F"` in de skillmap geeft niets terug.
- `scripts/check-contrast.py` uit de skill meldt voor de labelkleur op alle zes vlakken
  minstens 4,5.

**Afhankelijkheden.** Geen. asteria.prulwerk.nl gebruikt in licht `#6E6E69`; dat haalt op
`#EDEDE9` maar 4,37 en kan bij die gelegenheid mee naar `#6B6B66`.

**Test.** De twee acceptatiecriteria, met de hand.

---

## PW-03 Reviewronde 2 september: tekst, contrast, fonts, afbeelding, docs

**Status:** gebouwd

**Waarom.** Een review vond vijf dingen die elk klein waren en samen een pagina maakten die
iets anders zei dan ze deed: een verkeerde belofte over de verversing, een labelkleur
onder AA, een verzoek naar Google Fonts vanaf een pagina die "geen externe fetch" belooft,
een schermafdruk van vier keer de nodige grootte en documentatie over een data-URI die er
niet meer was.

**Scope.**
- Even Match-feit "elke maandagochtend" naar "elke ochtend"; de `data.yml` in Teamkiezeer
  draait dagelijks op `0 6 * * *`.
- `--text-3` naar `#83837E` / `#6B6B66`, gemeten 4,56 tot 5,36 op elk vlak.
- Archivo 700 en 900 zelf gehost in `fonts/`, dezelfde statische instances als
  asteria.prulwerk.nl (de 900 is byte-voor-byte gelijk). Google Fonts-link en preconnects
  weg.
- `asteria.webp` van 1120x1298 (58.396 bytes) naar 600x695 (20.904 bytes).
- CLAUDE.md en README beschrijven de repo zoals hij is; `demo.asteria.prulwerk.nl` staat in
  de hostnaam/repo-tabel.

**Acceptatiecriteria.** Allemaal gehaald op 2 september:
- Geen host buiten `127.0.0.1` in de resource-timing van de pagina.
- `document.fonts` toont Archivo 700 en 900 als `loaded`; geen ander gewicht gevraagd.
- `scrollWidth <= innerWidth` op 320, 375, 768, 1024 en 1600px, in licht en donker.
- Nul consolefouten, nul mislukte verzoeken.

**Afhankelijkheden.** Geen.

**Test.** Headless Chromium via Playwright tegen een lokale server op de repo-root; het
script staat niet in de repo omdat het voor deze ronde is geschreven. Het meet
`scrollWidth`, `document.fonts`, resource-hosts en consoleberichten per viewport.

---

## PW-04 Subdomeintabel en `zone.md` bijwerken bij elk nieuw subdomein

**Status:** open

**Waarom.** `demo.asteria.prulwerk.nl` bestond al voordat hij in de tabel in CLAUDE.md
stond. De regel in CLAUDE.md zegt dat tabel en `references/zone.md` in de skill
`prulwerk-admin` samen bijgewerkt worden; er is niets dat het afdwingt, en een runbook dat
achterloopt is gevaarlijker dan geen runbook.

**Scope.** Kies een van twee: een checklistregel in de skill `prulwerk-admin` bij "subdomein
toevoegen" die de tabel in deze repo noemt, of een klein script in `tools/` dat de CNAME's
in de Cloudflare-zone vergelijkt met de tabel in CLAUDE.md en de verschillen print. Het
script heeft de zone-id uit CLAUDE.md nodig en een token dat niet in de repo komt.

**Acceptatiecriteria.**
- Een subdomein dat in Cloudflare staat maar niet in de tabel wordt gemeld (of is door de
  checklist uitgesloten).
- Geen secret in de repo; het token komt uit een omgevingsvariabele.

**Afhankelijkheden.** Skill `prulwerk-admin` (buiten deze repo). Bij de scriptvariant een
Cloudflare API-token met alleen leesrecht op DNS.

**Test.** Voeg tijdelijk een regel aan de tabel toe die niet in de zone staat, of
andersom, en controleer dat het gemeld wordt.

---

## PW-05 De Even Match-claim "elke ochtend" laten volgen uit de echte cron, of schrappen

**Status:** open

**Waarom.** De tekst op de kaart is op 2 september van "elke maandagochtend" naar "elke
ochtend" gegaan omdat de cron in Teamkiezeer al eerder was veranderd en niemand het hier
had bijgewerkt. Een feit dat uit een ander repo komt en met de hand wordt overgetikt,
veroudert opnieuw.

**Scope.** Een van twee, kies bewust:
1. Een test (Node, geen dependencies, past bij een repo zonder buildstap) die
   `.github/workflows/data.yml` uit `SirSquirell/Teamkiezeer` ophaalt, de `cron`-regel leest
   en controleert dat hij dagelijks is zolang `index.html` "elke ochtend" zegt. Draait in
   een GitHub Action op een schema, faalt hardop.
2. Het feit vervangen door iets dat niet veroudert, bijvoorbeeld "data van EA FC, automatisch
   bijgehouden", en de frequentie aan de Even Match-pagina zelf laten.

**Acceptatiecriteria.**
- Bij optie 1: de check faalt als de cron in Teamkiezeer naar wekelijks gaat en `index.html`
  nog "elke ochtend" zegt; slaagt nu.
- Bij optie 2: nergens op de pagina staat nog een frequentie die uit een ander repo komt.

**Afhankelijkheden.** Optie 1: leesrecht op de Teamkiezeer-repo (publiek, dus zonder token),
en een workflow in deze repo, terwijl CLAUDE.md nu "geen deploy-workflow" zegt. Dat is een
CI-check en geen deploy, maar zet het er wel bij.

**Test.** Optie 1 test zichzelf. Optie 2: lezen.

---

Eerstvolgende vrije nummer: **PW-06**.
