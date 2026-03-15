("use strict");

let theData;

const recipesCatalog = document.querySelector("#recipesCatalog");
console.log(recipesCatalog);

fetch(`https://dummyjson.com/recipes?&limit=100`).then((res) =>
  res.json().then((data) => {
    theData = data.recipes;

    const params = new URLSearchParams(window.location.search);
    let cuisine = params.get("cuisine");
    if (cuisine === "eastandsoutheastasian") {
      filterCuisine(["Asian", "Japanese", "Korean", "Thai", "Vietnamese"]);
    } else if (cuisine === "european") {
      filterCuisine(["Italian", "Spanish", "Russian", "French"]);
    } else if (cuisine === "mediterraneanandmiddleeastern") {
      filterCuisine(["Greek", "Turkish", "Lebanese", "Moroccan", "Mediterranean"]);
    } else if (cuisine === "southasian") {
      filterCuisine(["Indian", "Pakistani"]);
    } else if (cuisine === "northandlatinamerican") {
      filterCuisine(["American", "Mexican", "Brazilian", "Cuban", "Hawaiian"]);
    } else {
      showRecipes(theData);
    }
  }),
);

function showRecipes(dataArr) {
  recipesCatalog.innerHTML = `
  <h2>Alle opskrifter</h2>
  <h3>0 - 30 min</h3>
  <button class="back_btn"> &#8592</button>
  <section>
    <h5>filtrer:</h5>
    <div>
      <button class="european">European</button>
      <button class="eastandsoutheastasian">East & South-East Asian</button>
      <button class="mediterraneanandmiddleeastern">Mediterranean & Middle Eastern</button>
      <button class="southasian">South Asian</button>
      <button class="northandlatinamerican">North and Latin American</button>
    </div>
  </section>
  <section id="recipesList" class="grid_1-1-1"></section>
  `;
  document.querySelector(".back_btn").addEventListener("click", goBack);
  function goBack() {
    history.back();
    console.log("go back");
  }

  const recipesList = document.querySelector("#recipesList");
  dataArr.forEach((recipes) => {
    recipesList.innerHTML += `<article class="card">
          <img src="https://cdn.dummyjson.com/recipe-images/${recipes.id}.webp" alt="" />
          <h4>${recipes.name}</h4>
          <p>Tid: ${recipes.cookTimeMinutes + recipes.prepTimeMinutes} minutter</p>
          <p> ${recipes.rating}<span class="star">★</span></p>
          <div><button class="difficulty ${recipes.difficulty.toLowerCase()}">${recipes.difficulty}</button><button class="cuisine ${recipes.cuisine.toLowerCase().replace(" ", "-")}">${recipes.cuisine}</button></div>
          <button class="readMore"> <a href="enkelt_opskrift.html?id=${recipes.id}">Read More &#8594</a></button>
        </article>`;
  });

  document.querySelector(".eastandsoutheastasian").addEventListener("click", () => (window.location.href = "opskrifter.html?cuisine=eastandsoutheastasian"));
  document.querySelector(".european").addEventListener("click", () => (window.location.href = "opskrifter.html?cuisine=european"));
  document.querySelector(".mediterraneanandmiddleeastern").addEventListener("click", () => (window.location.href = "opskrifter.html?cuisine=mediterraneanandmiddleeastern"));
  document.querySelector(".southasian").addEventListener("click", () => (window.location.href = "opskrifter.html?cuisine=southasian"));
  document.querySelector(".northandlatinamerican").addEventListener("click", () => (window.location.href = "opskrifter.html?cuisine=northandlatinamerican"));

  const params = new URLSearchParams(window.location.search);
  const cuisine = params.get("cuisine");

  if (cuisine) {
    const activeButton = document.querySelector("." + CSS.escape(cuisine));
    if (activeButton) {
      document.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
      activeButton.classList.add("active");
    }
  }
}

function filterCuisine(cuisines) {
  const filtered = theData.filter((recipe) => cuisines.includes(recipe.cuisine));

  showRecipes(filtered);
}
