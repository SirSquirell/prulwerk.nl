# Portfolio-register prulwerk.nl

Wat op de indexpagina staat, mag staan of is tegengehouden, en hoe de links heen en terug
ervoor staan. Het oordeel komt van de agent `portfolio-manager`
(`.claude/agents/portfolio-manager.md`); wie de kaart bouwt, zet het hier neer in dezelfde
commit. De punten verwijzen naar de toets in dat bestand.

Een kaart gaat niet naar `main` zonder rij met TOELATEN, of met ONDER VOORWAARDEN waarvan
elke "eerst"-voorwaarde is afgevinkt. Een BLOKKEREN heft alleen Mathijs op, en dat staat
hier dan met datum.

Deze repo is publiek en Pages serveert ook dit bestand: geen namen van personen, en werk
voor een ander staat hier zonder naam.

| Project | Soort | Stand, 11 nov 2026 | Link heen | Link terug |
|---|---|---|---|---|
| Even Match | eigen | ONDER VOORWAARDEN: live nalopen | `evenmatch.prulwerk.nl` | footer, sinds 0.04.3 |
| Asteria | eigen | ONDER VOORWAARDEN: live nalopen | `asteria.prulwerk.nl` | wordmark in de kop, ook in de handleiding |
| Leto | eigen | blokkade opgeheven door Mathijs, tekst klopt | `leto.prulwerk.nl`, hoofdknop naar de demo | wordmark in de kop en footer |
| Prijswacht | eigen | blokkade opgeheven door Mathijs, tekst klopt | `prijs.prulwerk.nl` (inlogscherm), hoofdknop Broncode | wordmark rechtsboven |
| Klantwerk: schoonmaak | voor een ander, anoniem | ONDER VOORWAARDEN, staat op een branch | geen | geen, hoort ook niet op de echte site (punt 9) |

De agent is twee keer langs geweest, allebei op 11 november en allebei op de repo's van de
projecten. De live adressen waren vanuit de sessie niet bereikbaar, dus punt 1 en 2 zijn
nergens live gezien. `tools/check.mjs` is door de bouwende sessie gedraaid en groen
(punt 7).

## Even Match

- [x] Tekst rechtgezet, besluit Mathijs: twee tegen twee, en de app zegt hoe ver de
  squad-ratings uit elkaar liggen. De rating filtert niet, alleen de sterren. Door de agent
  nagelezen: klopt.
- [x] De twee clublogo's in `evenmatch.webp` zijn door Mathijs aanvaard: het is een
  schermafdruk van de app, de repo zelf commit ze niet (punt 5).
- [x] Link terug (punt 8): 0.04.3 staat op `main` van de Even Match-repo.
- [ ] Live nalopen (punt 1 en 2).

## Asteria

- [ ] Live nalopen (punt 1 en 2). In de repo is niets gevonden wat tegenhoudt.
- Suggestie van de agent: de alt-tekst van de schermafdruk zegt niet dat het demogegevens
  zijn.

## Leto

Eerste ronde: BLOKKEREN. De kaart beval een extensie aan die niemand kan installeren en
zei dat niet, terwijl de Leto-site er zelf eerlijk over is.

- [x] Besluit Mathijs: kaart eerlijk maken. De derde feitregel is Status (af, maar nog niet
  te installeren) en "Probeer de demo" is de hoofdknop. Door de agent nagelezen: klopt.
- [ ] Live nalopen (punt 1 en 2).

## Prijswacht

Eerste ronde: BLOKKEREN. Privé, achter inlog, zonder demo (punt 1 en 2); de kaart noemde
functies die nog niet gebouwd zijn (punt 6); en de pagina is noindex terwijl de kaart hem
vindbaar maakt (punt 10).

- [x] Besluit Mathijs: tekst rechtzetten, de kaart blijft. De lead en de feiten noemen
  alleen wat nu werkt, "Komt nog" zegt wat er nog niet is, en Broncode is de hoofdknop.
  Door de agent nagelezen: de tekst klopt.
- [x] Mathijs heeft daarmee ook de blokkade op punt 1 en 10 opgeheven: de schermafdruk, de
  titel en de knop "Bekijk Prijswacht" gaan nog steeds naar het inlogscherm. De kaart zegt
  dat erbij.
- Niet nagegaan: of bol nog blokkeert en of de Worker nog verzamelt. De bron is de status
  van het project van 9 oktober.
- [ ] Live nalopen (punt 1 en 2).

## Klantwerk: schoonmaak

Eerste ronde: BLOKKEREN, op een versie met de naam en het beeldmerk van de klant en een
link naar haar demo. Besluit Mathijs daarna, letterlijk: "maak maar anoniem en de pagina
zelf hoeft niet indexed te zijn". Uitgevoerd als een kaart zonder naam, beeldmerk, regio,
tarief en link.

Tweede ronde: ONDER VOORWAARDEN. Kaart en werkmap zijn anoniem en de beweringen kloppen.

- [ ] **Eerst:** één open punt bij Mathijs, niet in deze publieke repo beschreven.
- [x] De bouwer had in dezelfde commit de toets en CLAUDE.md verruimd met een algemene
  regel voor anoniem klantwerk. Dat was breder dan het besluit over deze ene kaart en is
  er weer uit.
- [x] De alt-tekst omschrijft de schermafdruk zonder de kop van de site te citeren, en
  Status zegt dat de site nog niet live is.
- Opmerking van de agent, geen blokkade: zonder link kan een bezoeker er niets mee, het is
  een referentie en geen "ding dat af is". Wat hem zou redden is een demo onder een
  verzonnen naam en verzonnen tarieven als knop. Dat is de keuze van Mathijs.
- Punt 5 rust op het besluit van Mathijs, niet op akkoord van de klant.
