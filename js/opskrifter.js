("use strict");

let theData;

const recipesCatalog = document.querySelector("#recipesCatalog");
console.log(recipesCatalog);

fetch(`https://dummyjson.com/recipes?&limit=100`).then((res) =>
  res.json().then((data) => {
    theData = data.recipes;
    showRecipes(theData);
  }),
);

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
          <p> ${recipes.rating}<span class="star">★</span></p>
          <div><button class="difficulty ${recipes.difficulty.toLowerCase()}">${recipes.difficulty}</button><button class="cuisine ${recipes.cuisine.toLowerCase().replace(" ", "-")}">${recipes.cuisine}</button></div>
          <button class="readMore"> <a href="enkelt_opskrift.html?id=${recipes.id}">Read More &#8594</a></button>
        </article>`;
  });

  document.querySelector(".asian").addEventListener("click", () => (window.location.href = "opskrifter.html?cuisine=asian"));
  // document.querySelector(".asian").addEventListener("click", () => filterCuisine(["Asian", "Japanese", "Korean", "Thai", "Vietnamese"]));
  document.querySelector(".european").addEventListener("click", () => filterCuisine(["Italian", "Spanish", "Russian", "French"]));
  document.querySelector(".mediterranean").addEventListener("click", () => filterCuisine(["Greek", "Turkish", "Lebanese", "Moroccan", "Mediterranean"]));
  document.querySelector(".southasian").addEventListener("click", () => filterCuisine(["Indian", "Pakistani"]));
  document.querySelector(".american").addEventListener("click", () => filterCuisine(["American", "Mexican", "Brazilian", "Cuban", "Hawaiian"]));
}

function filterCuisine(cuisines) {
  const filtered = theData.filter((recipe) => cuisines.includes(recipe.cuisine));

  showRecipes(filtered);
}
