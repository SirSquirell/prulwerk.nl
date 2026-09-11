# prulwerk.nl

Indexpagina van prulwerk.nl. Eén statisch bestand, geen buildstap, geen dependencies.
GitHub Pages serveert de root van `main`; een push is de deploy.

```
index.html            alles: opmaak, tekst en script, zo'n 17 KB
evenmatch.webp        schermafdruk voor de Even Match-kaart
asteria.webp          schermafdruk voor de Asteria-kaart, 600px breed
leto.webp             schermafdruk voor de Leto-kaart, 600px breed, demo op gegenereerde data
fonts/                Archivo 700 en 900, zelf gehost, latin-subset
docs/BACKLOG.md       genummerde stories, PW-01 en verder
favicon.svg           merkteken donker, drie balken
favicon-light.svg     merkteken licht
favicon-32.png        vaste 32px, balken op hele pixels zodat de tab scherp blijft
apple-touch-icon.png  180px vol vlak, iOS maskeert de hoeken zelf
CNAME                 prulwerk.nl
.nojekyll             Jekyll overslaan
```

## Huisstijl

Brandingsheet v1, augustus 2026. Donker is de basis.

| Rol | Donker | Licht |
|---|---|---|
| Pagina | `#050505` | `#F4F4F1` |
| Kaart | `#101010` | `#FFFFFF` |
| Tekst | `#F2F2F0` | `#12120F` |
| Tekst, label | `#83837E` | `#6B6B66` |
| Accent | `#C9F531` | `#A6D400` |
| Lijn en focus | `#C9F531` | `#718F00` |

De labelkleur is de lichtste tekst die nog als tekst gebruikt wordt (feitlabels op 11,5px,
de footer op 14px) en moet daarom 4,5:1 halen op elk vlak waar hij op staat, ook op de
tweede kaartlaag. `#83837E` haalt 5,35 / 5,00 / 4,62 op pagina, kaart en `#191919`;
`#6B6B66` haalt 4,86 / 5,36 / 4,56 op pagina, kaart en `#EDEDE9`. De oorspronkelijke
`#6B6B67` en `#86867F` uit brandingsheet v1 bleven op 3,1 tot 3,8 steken.

Lime is nooit een heel vlak: knoppen, onderstrepingen en de onderste balk in het icoon.
In licht is de accentkleur een tint dieper, en de lijnvariant nog een tint dieper omdat
een focusrand 3:1 moet halen op elk licht vlak, en de krapste is de tweede kaartlaag
`#EDEDE9`; `#A6D400` komt daar niet verder dan 1,6:1. Het
achtervoegsel `.nl` in de wordmark mag wel de volle accentkleur zijn, want een logotype
valt buiten WCAG 1.4.3.

Projecten houden hun eigen accent binnen hun eigen kaart: Even Match cyaan `#00D9F5`,
Asteria oranje `#F97038`, Leto paars `#B79CFF` (alleen in het merkteken, op zijn eigen
donkere vlak). Die staan los van het prulwerk-palet en gaan niet mee in een rebrand van
de indexpagina.

Een project toevoegen: kopieer een `<article class="project">` blok in `index.html` en
vervang naam, omschrijving, de drie feiten en de twee links. De schermafdruk is een los
`.webp`-bestand in de root, hoogstens 600px breed (de kaart wordt nooit breder dan 300px,
dus dat is al twee keer de renderbreedte), met `width` en `height` op de echte maten.
Niets als data-URI in `index.html`; dat bestand blijft zo rond de 17 KB.

## Domeinbeheer

**Er is een skill `prulwerk-admin` met het volledige runbook.** Gebruik die voor alles wat
DNS, Cloudflare, Vimexx, GitHub Pages, HTTPS of een nieuw subdomein raakt. Hij bevat de
complete recordinventaris (`references/zone.md`), de diagnosestappen
(`references/diagnose.md`) en `scripts/check-domain.py`. Wat hieronder staat is een
samenvatting zodat een sessie zonder die skill niet blind is, geen vervanging ervan.

### Vaste feiten

| Wat | Waarde |
|---|---|
| Registratie | Vimexx, klantaccount 47260 |
| DNS | Cloudflare, Free plan |
| Cloudflare account-id | `7b1b25c1f0b0a98c7f77a7a6a08d868b` |
| Cloudflare zone-id | `cc7585105a1a2c6ac59da0fc192ed6ab` |
| Nameservers | `jocelyn.ns.cloudflare.com`, `lynn.ns.cloudflare.com` |
| Nameserverset bij Vimexx | `(3089469) Cloudflare`, **niet** als accountstandaard |
| GitHub-account | `SirSquirell` |
| Pages-doel voor CNAME's | `sirsquirell.github.io` |
| Hostingpakket | 494480 bij Vimexx, **niet opzeggen**, de MX hangt eraan |

### Elk subdomein is een eigen repo

Repo-naam is de hostnaam, publiek, met in de root een `CNAME` die alleen die hostnaam
bevat, plus een leeg `.nojekyll`. In Cloudflare één record: `CNAME <naam> →
sirsquirell.github.io`, TTL auto, proxy uit. Pages: Deploy from a branch, `main`, `/ (root)`.
Geen deploy-workflow; de root wordt rechtstreeks geserveerd.

| Hostnaam | Repo |
|---|---|
| `prulwerk.nl`, `www` | `SirSquirell/prulwerk.nl` (deze repo) |
| `evenmatch.prulwerk.nl` | `SirSquirell/Teamkiezeer` |
| `asteria.prulwerk.nl` | `SirSquirell/asteria.prulwerk.nl` |
| `demo.asteria.prulwerk.nl` | `SirSquirell/Claudiclaude` |
| `leto.prulwerk.nl` | `SirSquirell/leto.prulwerk.nl` (de extensie zelf staat in `SirSquirell/Trading212helper`, privé) |

### Wat je niet doet

- **De proxy aanzetten.** Cloudflare zet nieuwe A-, AAAA- en CNAME-records standaard op
  geproxied. Met de oranje wolk kan GitHub geen certificaat uitgeven en gaat mail stuk. Zet
  expliciet `proxied: false` en loop na een scan of import elke regel apart na.
- **Een CAA-record toevoegen.** Er staat er bewust geen. Een CAA die Let's Encrypt uitsluit
  blokkeert het certificaat van GitHub Pages. Verschijnt er een die niemand heeft
  aangevraagd, meld dat en verwijder hem niet zonder overleg.
- **De mailrecords aanraken.** De `MX`, de `TXT` op `@`, `_dmarc` en `x._domainkey`, en de
  A/AAAA op `mail`, `smtp`, `pop` en `ftp`. Exacte waarden staan in de skill. Eén wijziging
  per keer, en mailwijzigingen apart van al het andere.
- **De delegatie omzetten voordat de nieuwe nameservers de zone werkelijk antwoorden.** Een
  dashboardstatus is een belofte, een antwoord van een nameserver is bewijs. Een zone die
  via de API is aangemaakt staat op `initializing` en bedient dan niets: de nameservers
  antwoorden REFUSED en resolvers maken daar SERVFAIL van, ook voor mail. Controleer op
  `pending` of `active`, niet op "de zone bestaat".
- **De Cloudflare-nameserverset als accountstandaard zetten bij Vimexx.**
  `prulwerk.online` staat in hetzelfde account, hoort niet bij deze zone en staat nog op de
  nameservers van ZXCS. Die wordt anders meegesleept.
- **Het domein verhuizen of het hostingpakket opzeggen.** Alleen de DNS staat bij
  Cloudflare; de registratie blijft bij Vimexx.

### Diagnose

Begin met `scripts/check-domain.py <hostnaam>` uit de skill. SERVFAIL op elke naam is
vrijwel altijd de delegatie of de zonestatus, geen propagatievertraging: een vertraging
geeft oude antwoorden of NXDOMAIN. Werkt één naam niet en de rest wel, dan is het dat ene
record plus de Pages-instellingen van de bijbehorende repo.

Verandert de recordlijst of komt er een subdomein bij, werk dan de tabel hierboven én
`references/zone.md` in de skill bij. Een runbook dat achterloopt is gevaarlijker dan geen
runbook, want er wordt wel op vertrouwd.
