# Teknisk dokumentation for Tema 8 gruppeprojekt

Når man er flere der bidrager til en kodebase, lærer man hurtigt, at ens sædvanlige måder at gøre tingene på ikke nødvendigvis er logisk for alle.

Skriv derfor jeres fælles retningslinjer for punkterne herunder(tilføj gerne flere selv), sådan som det giver bedst mening for jer som gruppe. Dokumentationen sikre, at jeres fælles kodebase forbliver overskuelig, er let at arbejde med og til at forstå for alle, og at I undgå konflikter, og har nemmere ved at hjælpe hinanden undervejs.

## Projektstruktur:

Beslut, hvordan I vil organisere jeres projekt – struktur for mapper og filer.

- Vi holder Farve variabler (og muligvis andre variabler) i variables.css såvel som eksempler på hvordan man benytter fonte.
- Vi holder global css i en style.css fil, hvor de individuelle sider så hver har en tilhørende .css fil også, til specefik styling.
- Knapper for også deres egen css fil buttons.css

- css og js filer er holdt i css og js mapper.
- Billeder vil blive placeret i en img mappe.

## Navngivning:

Beslutte hvordan i vil navngive filer og mapper for at sikre en ensartet struktur og undgå forvirring.

- mapper og filer står alle med småt, og i stedet for mellemrum bruger vi underscore
``ting_ting.html``

- alle tilhørende css og js filer har samme navn som html filerne. f.eks
``index.html index.css index.js``

## Link til scripts:

script links bliver placeret i head, med defer attrubute

## Git branches:

- Vi holder simple navne, alt efter hvad der arbejdes på. F.eks ``opskrifter`` bliver der arbejdet på opskrifter siden

eller ``readme og mappestruktur`` bliver der arbejdet på readme.md og mappestrukturen

## Arbejdsflow:

- Vi kommunikere hyppigt med hinanden om hvad vi vær især arbejder på. Og tilføjer også tasks via trello, for at holde overblik over arbejdet. 

- Vi prøver så vidt muligt at gøre commit beskeder beskrivende, så man kan få overblik over hvad der er arbejdet på.

## Kode:

- Hvordan skriver i funktioner i JavaScript?(fx med function keyword eller som arrow functions)
- Beslut hvilken CSS selector i benyttes til referener i henholdsvis CSS og JavaScript(fx. id'er til JavaScript og Classes til CSS)

- Overordnede funktioner skrives med function keyword, og hvis nødvendigt bruges arrow funktioner inden i, f.eks til at loope over et array eller returneret data fra et API

- CSS selectors bruger vi klasser på generiske ting ligesom knapper, og id til mere specifikke ting, som en specifik sektion i html. Eller et bestemt tekst stykke

- Vi tilføjer kommentare hvis vi mener det vil hjælpe hinanden til at forstå det senere

# Funktionalitet

- Henting af opskrifter fra API.
- Henting af specifik opskrift fra API med ID.
- Benyttelse af url parametre, når man navigere til og fra sider
- Filtering af opskrifter, ud fra tags, og prep+cook time
- Live opdatering af side alt efter hvilke kategorier man vælger

# API endpoints
Endpoints benyttet
https://dummyjson.com/recipes
https://dummyjson.com/recipes/id
https://dummyjson.com/recipes-images/id.webp


# Dokumentation af Funktion

url_param  i ``opskrifter.js`` brugers til at sætte en specifik url parameter til en specifik value.

```js
  function url_param (key,value) {
    const url = new URL(window.location);
    url.searchParams.set(key, value);
    window.history.pushState({}, '', url); //tilføjer til browserens history stack (når man clicker tilbage, bliver den variabel der var sat fjernet igen)
  }

  //hvordan funktionen kaldes
  url_param("cuisine","european"); //sætter variablen  cuisine, til at være european, som så kan hentes igen og bruges til filtering
```

url_param_get bruges til at få en specifik url parameter fra urlet.
Den returnere en streng, udfra hvilken parameter der var brugt til at kalde funktionen

```js
  //Brug til at retunere en parametre fra urlen
  function url_param_get (key) {
    const url = new URL(window.location);
    return url.searchParams.get(key);
  }

  //hvordan funktionen kaldes
  let cuisine = url_param_get("cuisine");
  //cuisine ville være "european" efter url_param var brugt
```