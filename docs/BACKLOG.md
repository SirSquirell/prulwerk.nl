# Backlog prulwerk.nl

Stories voor de indexpagina. Een nummer is geclaimd zodra het hier op `main` staat; het
eerstvolgende vrije nummer staat onderaan. Status: **eigenaar** (alleen Mathijs kan het
doen), **open** (nog te bouwen), **gebouwd** (klaar, blijft staan als spoor van wat er is
besloten).

Vorm per story: Waarom, Scope, Acceptatiecriteria, Afhankelijkheden, Test. Geen story
zonder test, ook als de test "met de hand, zo" is.

---

## PW-01 Gemergede `claude/*`-branches verwijderen

**Status:** eigenaar

**Waarom.** `origin/claude/go-rjnrlq` (22 aug) en `origin/claude/skills-overview-gvlckf`
(23 aug) staan nog op GitHub. Allebei volledig gemerged, nul commits voor op `main`. Een
branch die niemand meer ziet is waar werk twee keer gedaan wordt; dat is in Claudiclaude al
eens met 23 branches misgegaan.

**Scope.** De branches op de remote verwijderen. Op 12 november, na PW-13, staan er negen,
allemaal zonder werk dat niet in `main` zit, en er is geen open PR:

| Branch | Commits voor op `main` |
|---|---|
| `claude/fable-5-tr3otb` | 0 |
| `claude/go-rjnrlq` | 0 |
| `claude/project-next-steps-8i73w4` | 0 |
| `claude/skills-overview-gvlckf` | 0 |
| `claude/eager-wright-hitcdo` | 0 |
| `prijswacht-kaart` | 0, PR #5 is gemerged |
| `claude/charming-edison-qtea2g` | 0, de vijfde kaart is met PW-13 meegegaan |
| `claude/pensive-hawking-vcjlai` | 0, de branch van PW-13 |
| `claude/keen-carson-b19o5j` | 1, een backlogcommit van 12 september die als squash in `main` zit; de inhoud is sindsdien verder bijgewerkt |

Niets aan `main` zelf.

**Acceptatiecriteria.**
- `git branch -r` toont `origin/main` en alleen branches met een open PR.
- Geen verlies: elke branch stond op 0 commits voor op `main`, of gaf een lege `git diff`
  tegen `main`, voordat hij wegging.

**Afhankelijkheden.** Dit is preciezer dan het eerder stond. Een sessie kan wél pushen en
een PR mergen, maar géén ref verwijderen: `git push origin --delete` geeft HTTP 403 van
GitHub, en de beveiliging van Claude Code blokkeert het daarnaast als destructieve
git-actie. Het blijft dus een handeling van Mathijs, tenzij hij die twee dingen openzet.

Twee dingen die het probleem structureel wegnemen en die hij één keer hoeft aan te zetten:
Settings → General → "Automatically delete head branches" in de repo, en een
Bash-permissieregel voor `git push origin --delete` in zijn instellingen.

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

**Afhankelijkheden.** Geen. asteria.prulwerk.nl is al over: AS-07 daar zette licht op
`#66665F` (4,93 op `#EDEDE9`). Twee pagina's, twee waarden voor hetzelfde token; de skill
kiest er straks één, en dan volgt de andere pagina.

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
Sinds PW-07 staat het in `tools/check.mjs`.

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
script heeft de zone-id uit de skill nodig en een token dat niet in de repo komt.

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

**Status:** gebouwd

**Waarom.** De tekst op de kaart is op 2 september van "elke maandagochtend" naar "elke
ochtend" gegaan omdat de cron in Teamkiezeer al eerder was veranderd en niemand het hier
had bijgewerkt. Een feit dat uit een ander repo komt en met de hand wordt overgetikt,
veroudert opnieuw.

**Scope.** Er waren twee opties:
1. Een test (Node, geen dependencies) die `.github/workflows/data.yml` uit
   `SirSquirell/Teamkiezeer` ophaalt, de `cron`-regel leest en controleert dat hij dagelijks
   is zolang `index.html` "elke ochtend" zegt. Draait in een GitHub Action op een schema.
2. Het feit vervangen door iets dat niet veroudert en de frequentie aan de Even Match-pagina
   zelf laten.

Gekozen: optie 2, op 7 september. Het feit is nu "ratings uit EA FC, automatisch
bijgehouden". Optie 1 zou een workflow zetten in een repo die er bewust geen heeft, voor
één woord dat de bezoeker niets oplevert. "Dagelijkse waarde" op de Asteria-kaart blijft:
dat beschrijft wat de extensie doet, niet hoe vaak een cron elders draait.

**Acceptatiecriteria.** Gehaald: nergens op de pagina staat nog een frequentie die uit een
ander repo komt.

**Afhankelijkheden.** Geen.

**Aanvulling 9 oktober.** Ook het teamaantal op de Pool-regel is weg, om dezelfde reden: het
verloopt bij de volgende game-editie.

**Test.** Lezen: `grep -n "ochtend\|maandag\|wekelijks\|[0-9]\+ teams" index.html` geeft niets terug.

---

## PW-06 Leto als derde project op de indexpagina

**Status:** gebouwd

**Waarom.** `leto.prulwerk.nl` stond live en was nergens vandaan te vinden. De indexpagina
bestaat juist om dat te zijn: de plek waar de projecten bij elkaar staan.

**Scope.** Een derde `<article class="project">` met het merkteken uit de favicon van de
Leto-site, `leto.webp` (600x805, 25 KB, compositieweergave op demogegevens), en in
CLAUDE.md de bestandslijst, het projectaccent `#B79CFF` en de hostnaam/repo-tabel. Buiten
deze repo: `references/zone.md` in de skill `prulwerk-admin` met het CNAME-record en de
subdomeinregel.

**Besloten.** De tweede knop is "Probeer de demo" naar `/demo/` en niet "Broncode", zoals
bij de andere twee kaarten. De extensie staat in `SirSquirell/Trading212helper` en die repo
is privé, dus een Broncode-knop zet een bezoeker op een 404. Wordt die repo publiek, dan
is het één link vervangen en volgt de kaart alsnog het patroon.

**Openstaand, buiten deze repo.** Op leto.prulwerk.nl zelf wijzen zowel "Source" als de
installatieknop naar diezelfde privérepo en zijn releases. Voor iedereen behalve Mathijs
zijn dat dode links. Dat is een keuze over die site, niet over deze pagina, en hoort in het
Leto-project thuis.

**Acceptatiecriteria.** Gehaald op 12 september, PR #3:
- `scrollWidth <= innerWidth` op 320, 375, 768, 1024 en 1600px, in licht en donker.
- Nul consolefouten, nul mislukte verzoeken, geen host buiten de testserver.
- Archivo 700 en 900 als `loaded`, geen ander gewicht gevraagd.
- Alle drie de schermafdrukken geladen, `width` en `height` gelijk aan de echte maten.
- Na de merge: `https://prulwerk.nl/` bevat `leto.webp` en dat bestand geeft een 200.

**Afhankelijkheden.** Geen.

**Test.** Headless Chromium via Playwright tegen een lokale server op de repo-root, plus een
`curl` op de live pagina na de deploy. Sinds PW-07 staat het script in `tools/check.mjs`.

---

## PW-07 De layout- en lettertypecontrole in de repo als `tools/check.mjs`

**Status:** gebouwd

**Waarom.** PW-03 en PW-06 hebben allebei hetzelfde Playwright-script met de hand geschreven
en weer weggegooid; PR #5 (vierde kaart) zou het een derde keer nodig hebben. Een check die
niet in de repo staat wordt bij de volgende kaart overgeslagen of anders gedaan.
asteria.prulwerk.nl heeft hetzelfde patroon al in `tools/check-overflow.mjs`.

**Scope.** Eén bestand, `tools/check.mjs`, zonder package.json of node_modules: het serveert
de repo-root op 127.0.0.1 en meet in headless Chromium op 320, 375, 768, 1024 en 1600px,
in licht en donker. Playwright komt uit een globale installatie (NODE_PATH of
PLAYWRIGHT_MODULE), de browser uit PLAYWRIGHT_CHROMIUM of de standaardlocatie; ontbreekt
dat, dan zegt het script wat er mist en stopt met code 2. CLAUDE.md en README verwijzen
ernaar bij "Een project toevoegen".

**Acceptatiecriteria.** Per viewport en thema:
- `scrollWidth <= innerWidth`.
- Lege console (geen error, warning of pageerror) en nul mislukte verzoeken.
- Geen verzoek naar een host buiten de testserver.
- `document.fonts` toont Archivo 700 en 900 als `loaded` en niets anders.
- Elke `img` is geladen en `naturalWidth`/`naturalHeight` zijn gelijk aan de
  `width`/`height`-attributen.
- `/robots.txt`, `/sitemap.xml` en `/og.png` geven 200 (PW-08).
- Negatief getest: een verkeerd `width`-attribuut op een schermafdruk geeft FOUT.

**Afhankelijkheden.** Geen in de repo. Lokaal een globale Playwright met Chromium.

**Test.** `node tools/check.mjs` eindigt met code 0: tien regels `ok` voor de pagina en drie
voor de statische bestanden. Gedraaid op 9 oktober, groen.

---

## PW-08 Open Graph, canonical, robots.txt, sitemap.xml en og.png

**Status:** gebouwd

**Waarom.** Een gedeelde link naar prulwerk.nl toonde in WhatsApp, Slack of Discord alleen
een kale titel: geen `og:`-tags, geen canonical, geen beeld, geen robots.txt of sitemap.
asteria.prulwerk.nl heeft dat allemaal wel, en dit is de pagina die juist bestaat om te
delen.

**Scope.** In de `<head>`: canonical naar `https://prulwerk.nl/`, `og:type`, `og:url`,
`og:site_name`, `og:locale`, `og:title`, `og:description` (letterlijk de bestaande meta
description), `og:image` met maten en alt, en `twitter:card`. In de root: `robots.txt`
(alles toegestaan, verwijzing naar de sitemap), `sitemap.xml` met één URL en een met de
hand bijgehouden `lastmod`, en `og.png` van 1200x630 in het merkpalet: donker vlak,
wordmark met lime `.nl`, de description, en een lime balk onderaan. Geen projectbeeld erin,
die wisselen. Het beeld wordt gerenderd door `tools/make-og.mjs` uit de zelfgehoste
Archivo, zodat het bij een rebrand opnieuw te maken is.

**Acceptatiecriteria.**
- `grep -c 'og:' index.html` geeft 10 (tien `og:`-regels); `canonical` en `twitter:card`
  staan er één keer.
- `og.png` is 1200x630, onder de 60 KB, en bevat geen tekst die niet ook op de pagina staat.
- Geen nieuw verzoek naar een externe host; `tools/check.mjs` blijft groen.
- Na de deploy: `https://prulwerk.nl/og.png`, `/robots.txt` en `/sitemap.xml` geven 200.

**Afhankelijkheden.** PW-07 voor de controle. `lastmod` in de sitemap wordt met de hand
bijgewerkt bij een inhoudelijke wijziging; er komt geen workflow voor.

**Test.** `tools/check.mjs` groen, en `og.png` bekeken (32 KB). Na de merge een `curl -I` op
de drie nieuwe bestanden.

---

## PW-09 Vijfde kaart: klantwerk, anoniem

**Status:** gebouwd. De kaart stond onder voorwaarden op de branch
`claude/charming-edison-qtea2g`. Op 12 november meldde Mathijs het ene open punt als
afgehandeld en is de kaart met het nieuwe ontwerp meegegaan naar `main` (PW-13).

**Waarom.** Het eerste project hier dat voor iemand anders is gebouwd, en juist dat hoort
op een portfolio. De eerste versie van de kaart noemde de klant bij naam, met haar
beeldmerk en een link naar de demo. De portfolio-manager hield die tegen (PW-11) en Mathijs
besloot op 11 november: anoniem.

**Scope.** Een vijfde `<article class="project">` met de titel "Klantwerk: schoonmaak",
zonder beeldmerk, zonder knoppen en met een schermafdruk die geen link is.
`klantwerk.webp` (600x840, 27 KB) is de homepage van het project in donker op
telefoonbreedte, met de demobalk, de navigatie en het regiolabel verborgen en afgekapt
boven de prijzen. In CLAUDE.md de bestandslijst.
`lastmod` in de sitemap naar 11 november.

**Besloten.**
- Anoniem betekent hier: de kaart linkt nergens heen. Het alternatief was de demo zelf
  ombouwen naar een verzonnen naam en verzonnen tarieven. Dat is niet gedaan, want de demo
  is er om de eigenaar haar eigen site te laten zien.
- Het subdomein van de demo staat om dezelfde reden niet in de hostnaam/repo-tabel in
  CLAUDE.md. Dat is een bewuste uitzondering op PW-04.
- Het feit "Talen" noemt het aantal, niet welke. De alt-tekst omschrijft de schermafdruk
  zonder de kop van de site te citeren.
- Bij de kaart was eerst een algemene regel voor anoniem klantwerk aan CLAUDE.md en aan de
  toets van de portfolio-manager toegevoegd. Die is er weer uit: het besluit ging over
  deze ene kaart, en wie een kaart bouwt hoort de toets niet te herschrijven.
- De eerste versie had een knop "Probeer te boeken". Die was fout: wie in de demo boekt
  met een eigen adres laat echte gegevens achter. Met een kaart zonder link speelt dat niet
  meer.
- De schermafdruk komt van een lokale run van het project, niet van de live demo: die was
  vanuit de cloudsessie niet bereikbaar.

**Acceptatiecriteria.**
- Nergens in deze repo staat de naam van de klant of het adres van de demo:
  `git grep -i` op de naam geeft niets terug.
- In de schermafdruk staat geen naam, beeldmerk, regio of bedrag.
- De kaart bevat geen `<a>`.
- `scrollWidth <= innerWidth` op 320, 375, 768, 1024 en 1600px, in licht en donker; nul
  consolefouten; alle vijf de schermafdrukken geladen op hun echte maten.

**Afhankelijkheden.** PW-10 en PW-11: het oordeel van de portfolio-manager.

**Aanvulling 12 november.** In het ontwerp van PW-13 heeft de kaart geen feitregels meer.
Het label zegt "nog niet live", de alinea is ingekort en eindigt met waarom er geen naam
en geen link staat. De feiten Boeken en Talen zijn vervallen.

**Test.** `node tools/check.mjs` op 11 november: tien regels `ok` voor de pagina en drie
voor de statische bestanden. De kaart bekeken op 1280px in donker en op 375px in licht. De
schermafdruk met het oog nagelopen op naam, beeldmerk, regio en bedragen.

---

## PW-10 Portfolio-manager als poortwachter

**Status:** gebouwd

**Waarom.** Tot nu toe besliste de sessie die een kaart bouwde ook zelf of hij erop mocht.
Bij vier eigen projecten viel dat niet op. Bij de vijfde, werk voor een ander met haar
handelsnaam erop, is "mag dit" een andere vraag dan "past dit", en die hoort niet bij de
bouwer te liggen. Daarnaast linkte één van de vier projecten niet terug naar de
indexpagina, en dat had niemand gezien.

**Scope.** `.claude/agents/portfolio-manager.md`: een read-only agent (Read, Grep, Glob,
WebFetch) met tien toetspunten, zeven voor de link heen en drie voor de link terug, en drie
oordelen: TOELATEN, ONDER VOORWAARDEN, BLOKKEREN. `docs/PORTFOLIO.md` als register met een
rij per project. De regel in CLAUDE.md dat geen kaart of link zonder oordeel naar `main`
gaat, en een verwijzing in de README.

**Besloten.**
- De agent schrijft niet. Een beoordelaar die ook kan aanpassen gaat repareren in plaats
  van oordelen.
- Het register is een bestand en geen geheugen van de agent: een blokkade moet een
  volgende sessie overleven.
- Geen hook of workflow die het afdwingt. De regel staat in CLAUDE.md, net als de rest van
  de werkwijze hier; een workflow in een repo die er bewust geen heeft is te veel voor
  vijf kaarten.
- Werk voor een ander staat zonder naam in het register tot die ander akkoord is, want de
  repo is publiek.

**Acceptatiecriteria.**
- Elke kaart in `index.html` heeft een rij in `docs/PORTFOLIO.md`.
- De agent heeft een expliciete `tools`-lijst zonder Edit, Write of Bash.
- Een nieuwe kaart zonder rij, of met een open "eerst"-voorwaarde, staat niet op `main`.

**Afhankelijkheden.** De agent bestaat alleen als subagent in een sessie die in deze repo
start. Vanuit een andere repo: zie CLAUDE.md onder Portfolio-manager.

**Test.** Met de hand: vijf kaarten, vijf rijen. De eerste ronde (PW-11) hield de vijfde
kaart tegen, ook op punten die de bouwende sessie zelf ok had gevonden.

---

## PW-11 Eerste ronde van de portfolio-manager langs alle kaarten

**Status:** gebouwd

**Waarom.** Even Match, Asteria, Leto en Prijswacht stonden er al voordat de
portfolio-manager bestond en waren nooit getoetst. De vijfde kaart had alleen een oordeel
van de sessie die hem bouwde.

**Scope.** De agent over alle vijf, op de repo's van de projecten. De uitkomst staat in
`docs/PORTFOLIO.md`. In dezelfde ronde: de link terug in Even Match (0.04.3, TK-23 in die
repo). Prijswacht bleek hem al te hebben; een eerdere telling in deze sessie was fout.

**Uitkomst.** Twee onder voorwaarden (Even Match, Asteria), drie geblokkeerd (Leto,
Prijswacht, de vijfde kaart). Wat er met de drie kaarten gebeurt die al live staan is
PW-12.

**Acceptatiecriteria.**
- In `docs/PORTFOLIO.md` staat bij geen enkele rij meer "nog niet getoetst".
- Alle vier de eigen projecten linken terug naar `https://prulwerk.nl/`.

**Afhankelijkheden.** PW-10.

**Test.** Het rapport van de agent, met bestand en regel per bevinding; de dragende
bevindingen zijn daarna met de hand nagelezen in de repo's. Niet gedaan: de live adressen,
die waren vanuit de cloudsessie niet bereikbaar.

---

## PW-12 Besluiten na de eerste ronde

**Status:** gebouwd

**Waarom.** De portfolio-manager had twee kaarten geblokkeerd die al live stonden en bij
een derde gezegd dat de tekst niet klopte. Een kaart van de pagina halen of herschrijven is
een besluit van Mathijs, niet van een sessie.

**Besloten door Mathijs, 11 november 2026.**
- Leto: kaart eerlijk maken. De derde feitregel is nu Status (af, maar nog niet te
  installeren) en "Probeer de demo" is de hoofdknop.
- Prijswacht: tekst rechtzetten, kaart blijft. De lead en de feiten noemen alleen wat nu
  werkt, "Komt nog" zegt wat er nog niet is, en Broncode is de hoofdknop. Daarmee is de
  blokkade "privé zonder demo" opgeheven: de schermafdruk, de titel en de knop "Bekijk
  Prijswacht" gaan nog steeds naar het inlogscherm van een noindex-pagina.
- Even Match: tekst rechtzetten. Twee tegen twee, en de app zegt hoe ver de squad-ratings
  uit elkaar liggen in plaats van dat ze dicht bij elkaar liggen. De clublogo's in de
  schermafdruk zijn aanvaard: het is een schermafdruk van de app, de repo zelf commit ze
  niet.
- Vijfde kaart: anoniem (PW-09). Die staat nog op een branch.

**Nog open.** De live adressen van alle vijf zijn nooit nagelopen: vanuit de cloudsessie
waren ze niet bereikbaar. Dat kan alleen in een browser of een sessie die erbij kan.

**Acceptatiecriteria.**
- Bij elke kaart in `docs/PORTFOLIO.md` staat wat Mathijs besloot, met datum.
- Geen kaart op `main` met een bewering die het project zelf tegenspreekt.

**Afhankelijkheden.** PW-11.

**Test.** `node tools/check.mjs` na de wijzigingen, groen. De portfolio-manager heeft de
drie nieuwe teksten in een tweede ronde nagelezen tegen de repo's van de projecten: alle
drie kloppen.

---

## PW-13 Nieuw ontwerp: de index als rijen, met de letters uit de brandingsheet

**Status:** gebouwd

**Waarom.** De pagina was een stapel kaarten met elk een schermafdruk, drie feitregels en
twee knoppen: veel kader om vijf links. Mathijs liet twee ontwerpen maken (canvas
"prulwerk.nl redesign": v1 grid, v2 index) en koos op 12 november v2. Daarnaast stond de
body nog op `system-ui`, terwijl de brandingsheet Instrument Sans en JetBrains Mono
voorschrijft.

**Scope.**
- `index.html`: een kop tot 128px, en per project een rij met een label in mono, de naam,
  één alinea, één knop en één tekstlink, met rechts de schermafdruk op een vlak met een
  streep van 4px in het projectaccent. Een kleine footer met merkteken, wordmark en een
  tweede themaknop. De feitregels zijn weg.
- `fonts/`: Instrument Sans (één variabel bestand, 30 KB) en JetBrains Mono 400 (21 KB),
  latin-subset, zelf gehost. `tools/check.mjs` verwacht nu vier fonts.
- De vijfde kaart (PW-09) gaat mee.
- CLAUDE.md en README: typografie, de accentregel en "Een project toevoegen". `lastmod`
  in de sitemap naar 12 november.

**Besloten.**
- De teksten uit het ontwerp zijn niet overgenomen. Het ontwerp is van vóór PW-12 en
  beloofde bij Prijswacht weer meldingen, bij Even Match een rating "waar je geen ruzie
  over krijgt", en had bij Leto de pagina met de installatieknop als hoofdknop. De
  alinea's zijn ingekort vanuit de teksten van PW-12 en de knoppen houden de volgorde van
  PW-12.
- Wat in de feitregel Status stond, staat nu in het label (Leto: nog niet te installeren;
  Prijswacht: op uitnodiging; klantwerk: nog niet live) en in de alinea.
- Drie afwijkingen van het ontwerp, omdat het alleen op 1280px is getekend. De kop krimpt
  onder de 550px mee met de breedte: op de 52px uit het ontwerp past "Kleine dingen" niet
  op een telefoon. Het vlak achter de schermafdruk heeft een verhouding in plaats van een
  vaste hoogte van 380px, en de bijna vierkante schermafdruk van Even Match mag 380px
  breed in plaats van 340px: anders hangt hij los in zijn vlak. De merktekens van Leto en
  Prijswacht hebben een rand in de lijnkleur, want hun donkere vlak is even donker als de
  pagina.
- Paars en blauw staan nu ook buiten het merkteken, als streep. Dat sloot CLAUDE.md uit en
  is daar aangepast: de streep is decoratie, geen tekst.
- Het aantal in de hero en de nummering van de labels worden met de hand bijgehouden. Het
  is een getal over deze pagina zelf, niet over een ander repo (PW-05), en er staat een
  commentaarregel bij in `index.html`.
- Instrument Sans is niet teruggesneden tot de gewichten die de pagina gebruikt: dat
  scheelt 2,5 KB en maakt het bestand anders dan de bron.

**Acceptatiecriteria.**
- `node tools/check.mjs` groen: geen overflow van 320 tot 1600px in licht en donker, lege
  console, geen externe host, vier fonts geladen, vijf schermafdrukken op hun echte maten.
- Beide themaknoppen wisselen het thema, de labels van allebei, `theme-color` en de
  opgeslagen keuze.
- Elke schermafdruk loopt onderaan uit zijn vlak, op elke breedte.
- Tekst haalt 4,5:1 op de pagina; elke link en knop is minstens 44px hoog.
- Elke kaart heeft een oordeel van de portfolio-manager op de nieuwe tekst.

**Afhankelijkheden.** PW-09, PW-10 en PW-12. PW-02 staat nog open: de skill
`prulwerk-huisstijl` noemt de labelkleur met de oude waarden, de pagina houdt `#83837E`
en `#6B6B66`.

**Test.** 12 november. `node tools/check.mjs`: tien regels `ok` voor de pagina en drie
voor de statische bestanden. In headless Chromium: een klik op de themaknop boven en
onder, herladen, de tabvolgorde, en de maten van vlak en schermafdruk op 320, 375, 768,
900, 1024, 1280 en 1600px. Bekeken op 1280px in licht en donker en op 375px in donker.
VERDICT_PLACEHOLDER Niet gedaan: de live adressen, die zijn vanuit de cloudsessie niet
bereikbaar.

---

Eerstvolgende vrije nummer: **PW-14**.
