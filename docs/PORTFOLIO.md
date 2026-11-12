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

| Project | Soort | Stand, 12 nov 2026 | Link heen | Link terug |
|---|---|---|---|---|
| Even Match | eigen | ONDER VOORWAARDEN: live nalopen | `evenmatch.prulwerk.nl` | footer, sinds 0.04.3 |
| Asteria | eigen | ONDER VOORWAARDEN: live nalopen | `asteria.prulwerk.nl` | wordmark in de kop, ook in de handleiding |
| Leto | eigen | ONDER VOORWAARDEN: live nalopen; blokkade op 11 nov opgeheven door Mathijs | `leto.prulwerk.nl`, knop naar de demo | wordmark in de kop en footer |
| Prijswacht | eigen | ONDER VOORWAARDEN: live nalopen, en uiterlijk 27 nov 2026 opnieuw langs; blokkade op 11 nov opgeheven door Mathijs | `prijs.prulwerk.nl` (inlogscherm), knop Broncode | wordmark rechtsboven |
| Klantwerk: schoonmaak | voor een ander, anoniem | ONDER VOORWAARDEN: opnieuw langs zodra de site live gaat | geen | geen, hoort ook niet op de echte site (punt 9) |

De agent is drie keer langs geweest: twee keer op 11 november en één keer op 12 november,
na het nieuwe ontwerp (PW-13). Telkens op de repo's van de projecten. De live adressen
waren vanuit de sessie niet bereikbaar, dus punt 1 en 2 zijn nergens live gezien.
`tools/check.mjs` is door de bouwende sessie gedraaid en groen (punt 7).

## Derde ronde, 12 november: het nieuwe ontwerp

Alle vijf de kaarten zijn herschreven. De drie feitregels per kaart zijn weg; wat daarvan
moest blijven staat in het label boven de naam of in de alinea. Oordeel van de agent:
niets blokkeert. In geen van de vijf teksten is een bewering bijgekomen of sterker
geworden, en de voorbehouden waar de besluiten van 11 november op rustten staan er nog.

- De streep boven de schermafdruk in het projectaccent: geen bezwaar op punt 7, het accent
  blijft binnen de eigen kaart. Dat paars en blauw daarmee buiten het merkteken staan is
  een wijziging van de huisstijl; die hoort bij het ontwerp dat Mathijs koos.
- Het aantal in de hero en de nummering: punt 6 ok, het telt deze pagina zelf.
  `tools/check.mjs` bewaakt het.
- De heroregel was in het ontwerp een kaal aantal onder "die af zijn". Op aanwijzen van de
  agent staat de lat er weer bij: "Vijf stuks, af genoeg om te delen."

## Even Match

- [x] Tekst rechtgezet, besluit Mathijs: twee tegen twee, en de app zegt hoe ver de
  squad-ratings uit elkaar liggen. De rating filtert niet, alleen de sterren. Door de agent
  nagelezen: klopt.
- [x] De twee clublogo's in `evenmatch.webp` zijn door Mathijs aanvaard: het is een
  schermafdruk van de app, de repo zelf commit ze niet (punt 5).
- [x] Link terug (punt 8): 0.04.3 staat op `main` van de Even Match-repo.
- [x] Derde ronde: beide zinsdelen van het besluit staan er nog; het label "werkt offline"
  klopt met de repo. De schermafdruk staat onafgesneden in zijn vlak, zodat het oordeel
  "net aan" op elke breedte te zien is.
- [ ] Live nalopen (punt 1 en 2).

## Asteria

- [x] Derde ronde: dezelfde drie beweringen als voorheen, korter. Klopt met de site.
- [ ] Live nalopen (punt 1 en 2). In de repo is niets gevonden wat tegenhoudt.
- Suggestie van de agent: de alt-tekst van de schermafdruk zegt niet dat het demogegevens
  zijn.

## Leto

Eerste ronde: BLOKKEREN. De kaart beval een extensie aan die niemand kan installeren en
zei dat niet, terwijl de Leto-site er zelf eerlijk over is.

- [x] Besluit Mathijs: kaart eerlijk maken. De kaart zegt dat hij af is maar nog niet te
  installeren, en "Probeer de demo" is de hoofdknop. Door de agent nagelezen: klopt.
- [x] Derde ronde: het voorbehoud staat in het label ("nog niet te installeren") en als
  slotzin van de alinea. Klopt met de site.
- [ ] Opnieuw langs zodra de vraag over de API-voorwaarden van Trading 212 beantwoord is.
- [ ] Live nalopen (punt 1 en 2).

## Prijswacht

Eerste ronde: BLOKKEREN. Privé, achter inlog, zonder demo (punt 1 en 2); de kaart noemde
functies die nog niet gebouwd zijn (punt 6); en de pagina is noindex terwijl de kaart hem
vindbaar maakt (punt 10).

- [x] Besluit Mathijs: tekst rechtzetten, de kaart blijft. De kaart noemt alleen wat nu
  werkt en zegt wat er nog niet is, en Broncode is de hoofdknop. Door de agent nagelezen:
  de tekst klopt.
- [x] Mathijs heeft daarmee ook de blokkade op punt 1 en 10 opgeheven: de schermafdruk, de
  titel en de link "Bekijk Prijswacht" gaan nog steeds naar het inlogscherm. De kaart zegt
  dat erbij.
- [x] Derde ronde: "op uitnodiging" staat in het label, "zonder account zie je alleen het
  inlogscherm" en "komen nog" in de alinea. De datum, de winkelnamen en "bol blokkeert
  nog" zijn geschrapt; de kaart noemt geen winkels meer. In de schermafdruk staat een
  regel "laagst bij bol": die valt op elke breedte buiten de uitsnede (nagemeten door de
  bouwende sessie).
- [ ] Uiterlijk 27 november 2026 opnieuw langs. De alinea zegt dat het oordeel over Black
  Friday-kortingen nog komt en de schermafdruk telt af naar 27 november; daarna klopt geen
  van beide.
- Niet nagegaan: of de Worker nog verzamelt. "Volgt de prijs" staat in de tegenwoordige
  tijd.
- [ ] Live nalopen (punt 1 en 2).

## Klantwerk: schoonmaak

Eerste ronde: BLOKKEREN, op een versie met de naam en het beeldmerk van de klant en een
link naar haar demo. Besluit Mathijs daarna, letterlijk: "maak maar anoniem en de pagina
zelf hoeft niet indexed te zijn". Uitgevoerd als een kaart zonder naam, beeldmerk, regio,
tarief en link.

Tweede ronde: ONDER VOORWAARDEN. Kaart en werkmap zijn anoniem en de beweringen kloppen.

- [x] **Eerst:** één open punt bij Mathijs, niet in deze publieke repo beschreven.
  Afgevinkt door Mathijs op 12 november 2026: op de vraag of het open punt uit dit
  register is afgehandeld antwoordde hij "Ja, mag mee". De inhoud staat niet in deze repo
  en is niet door de agent nagegaan.
- [x] De bouwer had in dezelfde commit de toets en CLAUDE.md verruimd met een algemene
  regel voor anoniem klantwerk. Dat was breder dan het besluit over deze ene kaart en is
  er weer uit.
- [x] De alt-tekst omschrijft de schermafdruk zonder de kop van de site te citeren, en de
  kaart zegt dat de site nog niet live is.
- [x] Derde ronde: de ingekorte tekst is een deelverzameling van wat in de tweede ronde is
  nagelezen. "Nog niet live" staat in het label, de reden voor geen naam en geen link als
  slotzin.
- [ ] Opnieuw langs zodra de site van de klant live gaat: "nog niet live" klopt dan niet
  meer.
- Opmerking van de agent, geen blokkade: zonder link kan een bezoeker er niets mee, het is
  een referentie en geen "ding dat af is". Wat hem zou redden is een demo onder een
  verzonnen naam en verzonnen tarieven als knop. Dat is de keuze van Mathijs.
- Punt 5 rust op het besluit van Mathijs, niet op akkoord van de klant.
