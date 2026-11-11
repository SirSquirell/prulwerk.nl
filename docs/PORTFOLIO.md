# Portfolio-register prulwerk.nl

Wat op de indexpagina staat, mag staan of is tegengehouden, en hoe de links heen en terug
ervoor staan. Het oordeel komt van de agent `portfolio-manager`
(`.claude/agents/portfolio-manager.md`); wie de kaart bouwt, zet het hier neer in dezelfde
commit. De punten verwijzen naar de toets in dat bestand.

Een kaart gaat niet naar `main` zonder rij met TOELATEN, of met ONDER VOORWAARDEN waarvan
elke "eerst"-voorwaarde is afgevinkt. Een BLOKKEREN heft alleen Mathijs op. Drie kaarten
stonden al live voordat de portfolio-manager bestond en zijn bij de eerste ronde
geblokkeerd of onder voorwaarden gezet; die blijven staan tot Mathijs per kaart besluit
(PW-12).

Deze repo is publiek en Pages serveert ook dit bestand: geen namen van personen, en werk
voor een ander staat hier zonder naam tot die ander akkoord is.

| Project | Soort | Oordeel, 11 nov 2026 | Link heen | Link terug |
|---|---|---|---|---|
| Even Match | eigen | ONDER VOORWAARDEN | `evenmatch.prulwerk.nl` | footer, sinds 0.04.3 |
| Asteria | eigen | ONDER VOORWAARDEN | `asteria.prulwerk.nl` | wordmark in de kop, ook in de handleiding |
| Leto | eigen | BLOKKEREN, staat nog live | `leto.prulwerk.nl` | wordmark in de kop en footer |
| Prijswacht | eigen | BLOKKEREN, staat nog live | `prijs.prulwerk.nl` | wordmark rechtsboven |
| Vijfde kaart | voor een ander | BLOKKEREN, staat op een branch | demo onder prulwerk.nl | geen, hoort ook niet op de echte site (punt 9) |

## Eerste ronde, 11 november 2026

Door de agent zelf, op de repo's. De live adressen waren vanuit de sessie niet bereikbaar,
dus punt 1 en 2 zijn nergens live gezien. `tools/check.mjs` is door de bouwende sessie
gedraaid en groen (punt 7).

### Even Match: ONDER VOORWAARDEN

- [ ] De kaarttekst belooft meer dan de app doet (punt 6). "Met zijn tweeën": de app is
  voor twee tegen twee. "Een squad-rating die dicht genoeg bij elkaar ligt": de rating
  filtert niet, alleen de sterren, en het oordeel kan "scheef" zijn. Besluit bij Mathijs
  (PW-12).
- [ ] `evenmatch.webp` toont twee clublogo's, terwijl de repo ze bewust nooit commit
  (punt 5). Vervangen of aanvaarden en hier vastleggen: Mathijs.
- [x] Link terug (punt 8): 0.04.3 staat op `main` van de Even Match-repo.
- [ ] Live nalopen (punt 1 en 2).

### Asteria: ONDER VOORWAARDEN

- [ ] Live nalopen (punt 1 en 2). In de repo is niets gevonden wat tegenhoudt.
- Suggestie: de alt-tekst van de schermafdruk zegt niet dat het demogegevens zijn.

### Leto: BLOKKEREN

De kaart beveelt een extensie aan die niemand kan installeren, en zegt dat niet. De
Leto-site zelf is er eerlijk over: de installatieknop staat uit en de demo is alles wat de
pagina biedt (punt 2, 3 en 6).

Opnieuw aankloppen: als de extensie vrij is, of met een kaart die zegt dat hij nog niet te
installeren is, de demo als hoofdknop en een Status-regel. De dode links naar de privérepo
uit PW-06 zijn er niet meer.

### Prijswacht: BLOKKEREN

Privé, achter inlog, zonder demo (punt 1 en 2), en de kaart noemt functies die nog niet
gebouwd zijn (punt 6): meldingen bij een prijsdaling, het oordeel op 90 dagen historie, en
bol in de winkellijst terwijl bol een 403 geeft. Toevoegen gaat met een link, niet door te
zeggen welk product je wilt. De pagina is noindex en volgens de eigen brief geen
landingspagina; de kaart maakt hem toch vindbaar (punt 10).

Opnieuw aankloppen: met een publieke demo op voorbeeldgegevens en een kaart die alleen
noemt wat werkt. De knop Broncode werkt wel: de repo is publiek.

### Vijfde kaart, werk voor een ander: BLOKKEREN

Strenger dan het eerste oordeel van de sessie die de kaart bouwde. Die las punt 4 als ok en
zette er een knop "Probeer te boeken" op; beide waren fout.

- [ ] **Eerst:** akkoord van de eigenaar, met datum, voor haar handelsnaam en beeldmerk op
  een geïndexeerde pagina, en voor haar echte diensten en tarieven op een publieke demo
  (punt 5 en 10). De demo is noindex en bedoeld om aan haar te laten zien. Regelen:
  Mathijs. Tot dan staat de naam nergens op `main` van deze repo.
- [ ] **Eerst:** in de demo een zichtbare aanwijzing om geen echte gegevens in te vullen
  (punt 4). Wie daar boekt met een eigen adres laat naam, adres en telefoon achter, en
  eindigt bij "check je inbox" terwijl er geen mail weggaat. Wijziging in de repo van dat
  project.
- [x] De knop "Probeer te boeken" is van de kaart af.
- [x] De Status-regel zegt wat verzonnen is: klanten en afspraken. Diensten en tarieven
  zijn dat niet.
- [ ] Live nalopen (punt 1 en 2).

Zonder akkoord kan het alleen met een demo en een kaart onder een verzonnen naam en
verzonnen tarieven.
