# Hunters House – ny forside

En moderne, minimalistisk og mobilvenlig forside til [huntershouse.dk](https://huntershouse.dk/).

Ren HTML, CSS og en lille smule JavaScript. Ingen frameworks, ingen build-step, ingen cookies, ingen eksterne skrifttyper eller scripts (godt for både hastighed og GDPR).

## Filer

```
index.html            Forsiden
assets/css/style.css  Al styling (farver og mål samlet øverst som variabler)
assets/js/main.js     Mobilmenu, "Åbent nu"-status og markering af dagens åbningstid
assets/img/favicon.svg
```

## Se siden lokalt

Åbn `index.html` direkte i en browser – eller kør en lille server:

```sh
python3 -m http.server 8000
# åbn http://localhost:8000
```

## Funktioner

- **Søgning** direkte fra forsiden og menuen – bruger den eksisterende søgning på `huntershouse.dk/search/results/`.
- **"Åbent nu / Lukket"** i toppen, beregnet ud fra dansk tid. Dagens åbningstid fremhæves i tabellen.
- **Klik-for-at-ringe**, mail-links og "Find vej" (Google Maps) for begge afdelinger.
- **Mobilmenu** med søgefelt, lukker med Esc.
- **SEO**: beskrivende titel/meta, Open Graph og strukturerede data (schema.org `Store`) med adresse og åbningstider, så Google kan vise dem.
- **Tilgængelighed**: semantisk HTML, "spring til indhold"-link, synligt fokus, god kontrast og respekt for "reducer bevægelse".

Alle kategori- og informationslinks peger på de eksisterende sider på huntershouse.dk, så varekataloget virker uændret.

## Ændringer

- **Åbningstider** skal rettes to steder: tabellen i `index.html` (sektionen `#besoeg`) og `HOURS` øverst i `assets/js/main.js` (minutter efter midnat, fx 17.30 = 1050).
- **Farver**: ret variablerne under `:root` øverst i `style.css`.
- **Kategorier**: hvert kort er et `<li>` i `<ul class="cards">` i `index.html`.

## Tjek før lancering

Teksterne er samlet fra den nuværende hjemmeside via søgemaskiner (siden selv kunne ikke hentes direkte). Bekræft venligst:

- Tallene i talrækken: 9.000+ våben på lager, 2.500 udstillet, 10.000+ varer, 5 bøssemagere.
- Afdelingernes beskrivelser (7 B: våben, jagt & fluefiskeri – 52 A: karpe, mede & fiskegrej).
- Telefonnumre, mail og CVR i footeren.
