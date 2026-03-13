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

Dette afsnit skal forklare hvad I konkret har arbejde med, for at udvikle websitet. Tænk over hvilke interaktioner brugeren kan foretage på sitet? Eller hvordan websitet håndterer og præsenterer data? Eksempler på funktionalitet, der kan beskrives:

- Hentning af produkter fra API.
- Filtrering af produkter baseret på brugerens valg.
- Dynamisk visning af produkter i HTML.

Brug korte beskrivelser, som i eksemplerne herover

### Tilføj her senere !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

# API endpoints

Dette afsnit skal liste de endpoints fra API'et i har benyttet:

### Tilføj her senere !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
- (fx. https://dummyjson.com/products)



# Dokumentation af Funktion

2 funktioner i ``opskrifter.js`` bliver brugt til at vise opskrifter

showRecipes tager et data array fra api'et som en variabel. Putter Html ind på forsiden ved hjælp af en querySelector der er lavet i roden af js filen.

Og looper så igennem data arrayet fra variablen og tilføjer html med opskrifts information for hver at dataerne i arrayet.

Til sidst bliver der også tilføjet event listeners til en række knapper. Med individuelle filtrer. Der hvis klikket så kalder showRecipes funktionen igen, men med nyt data

```javascript
  //Funktion kode:
  function showRecipes(dataArr) {
  recipesCatalog.innerHTML = `
  <h2>Alle opskrifter</h2>
  <h3>0 - 30 min</h3>
  <section>
    <h5>filtrer:</h5>
    <div>
      <button class="european">European</button>
      <button class="asian">East & South-East Asian</button>
      <button class="mediterranean">Mediterranean & Middle Eastern</button>
      <button class="southasian">South Asian</button>
      <button class="american">North and Latin American</button>
    </div>
  </section>
  <section id="recipesList" class="grid_1-1-1"></section>
  `;
  const recipesList = document.querySelector("#recipesList");
  dataArr.forEach((recipes) => {
    recipesList.innerHTML += `<div>
          <img src="https://cdn.dummyjson.com/recipe-images/${recipes.id}.webp" alt="" />
          <h4>${recipes.name}</h4>
          <p>Tid: ${recipes.cookTimeMinutes + recipes.prepTimeMinutes} minutter</p>
          <div><button class="difficulty ${recipes.difficulty.toLowerCase()}">${recipes.difficulty}</button><button class="cuisine ${recipes.cuisine.toLowerCase().replace(" ", "-")}">${recipes.cuisine}</button></div>
          <button class="read-more">Read More</button>
        </div>`;
    console.log(`${recipes.cookTimeMinutes + recipes.prepTimeMinutes}`);
  });

  document.querySelector(".asian").addEventListener("click", () => filterCuisine(["Asian", "Japanese", "Korean", "Thai", "Vietnamese"]));
  document.querySelector(".european").addEventListener("click", () => filterCuisine(["Italian", "Spanish", "Russian", "French"]));
  document.querySelector(".mediterranean").addEventListener("click", () => filterCuisine(["Greek", "Turkish", "Lebanese", "Moroccan", "Mediterranean"]));
  document.querySelector(".southasian").addEventListener("click", () => filterCuisine(["Indian", "Pakistani"]));
  document.querySelector(".american").addEventListener("click", () => filterCuisine(["American", "Mexican", "Brazilian", "Cuban", "Hawaiian"]));
}

//Hvordan funktionen kaldes
fetch(`https://dummyjson.com/recipes?&limit=100`).then((res) =>
  res.json().then((data) => {
    theData = data.recipes;
    showRecipes(theData);
  }),
);
```

filterCuisine tager et array af kategorier, og laver så en const ud fra vores eksisterende apidata. Med et filter ud fra det kategori array som var brugt som variabel

den konst bruger den så til at kalde showRecipes igen, med med mere specifik data

```javascript
//funktionens kode
function filterCuisine(cuisines) {
  const filtered = theData.filter((recipe) => cuisines.includes(recipe.cuisine));

  showRecipes(filtered);
}

//Hvordan funktionen kaldes
filterCuisine(["Asian", "Japanese", "Korean", "Thai", "Vietnamese"]);
```