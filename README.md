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

Kopieer het `<article class="project">` blok in `index.html`, vervang naam,
omschrijving, de drie feiten en de twee links. Voor de schermafdruk: maak een
`.webp` van hoogstens 600px breed, zet hem in de root en verwijs er met een
gewoon `src` naar, met `width` en `height` op de echte maten. Geen data-URI.
Controleer daarna met `node tools/check.mjs` (overflow, console, externe hosts, fonts en
afbeeldingsmaten; Playwright globaal, zie het kopcommentaar).
