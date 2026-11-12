# prulwerk.nl

De indexpagina van prulwerk.nl. Eén statisch bestand, geen buildstap.

- `index.html` bevat opmaak, tekst en script. De schermafdrukken staan er als losse
  `.webp`-bestanden naast, de lettertypes in `fonts/`.
- `og.png`, `robots.txt` en `sitemap.xml` staan in de root voor gedeelde links en zoekmachines.
- `docs/BACKLOG.md` is het backlog, PW-01 en verder; het eerstvolgende vrije nummer staat onderaan.
- `favicon*.svg`, `favicon-32.png` en `apple-touch-icon.png` zijn de iconenset uit de huisstijl.
- `CNAME` zet het custom domain voor GitHub Pages.
- `.nojekyll` slaat de Jekyll-verwerking over, die hebben we niet nodig.

## Publiceren

GitHub Pages serveert de root van `main`. Een push is genoeg.

## Een project toevoegen

Eerst langs de portfolio-manager (`.claude/agents/portfolio-manager.md`): die bepaalt of het
project erop mag en of de links heen en terug kloppen. Het oordeel staat in
`docs/PORTFOLIO.md`.

Kopieer een `<article class="project">` blok in `index.html`, vervang het label, de
naam, de alinea en de twee links, en pas het nummer en het aantal in de hero aan. Voor
de schermafdruk: maak een `.webp` van hoogstens 600px breed, zet hem in de root en
verwijs er met een gewoon `src` naar, met `width` en `height` op de echte maten. Geen
data-URI. Controleer daarna met `node tools/check.mjs` (overflow, console, externe hosts,
fonts en afbeeldingsmaten; Playwright globaal, zie het kopcommentaar).
