# prulwerk.nl

De indexpagina van prulwerk.nl. Eén statisch bestand, geen buildstap.

- `index.html` bevat alles: opmaak, tekst en de schermafdruk van Even Match als data-URI.
- `CNAME` zet het custom domain voor GitHub Pages.
- `.nojekyll` slaat de Jekyll-verwerking over, die hebben we niet nodig.

## Publiceren

GitHub Pages serveert de root van `main`. Een push is genoeg.

## Een project toevoegen

Kopieer het `<article class="project">` blok in `index.html`, vervang naam,
omschrijving, de drie feiten en de twee links. Voor de schermafdruk: maak een
PNG of JPEG, zet hem in de repo en verwijs er met een gewoon `src` naar, of
plak hem als data-URI zoals bij Even Match.
