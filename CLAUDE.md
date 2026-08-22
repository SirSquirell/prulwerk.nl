# prulwerk.nl

Indexpagina van prulwerk.nl. Eén statisch bestand, geen buildstap, geen dependencies.
GitHub Pages serveert de root van `main`; een push is de deploy.

```
index.html     alles: opmaak, tekst, en de Even Match-schermafdruk als data-URI
asteria.webp   schermafdruk voor de Asteria-kaart, los bestand
CNAME          prulwerk.nl
.nojekyll      Jekyll overslaan
```

Een project toevoegen: kopieer een `<article class="project">` blok in `index.html` en
vervang naam, omschrijving, de drie feiten en de twee links. Nieuwe schermafdrukken als
los bestand in de repo, niet als data-URI; `index.html` is al 100 KB.

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
