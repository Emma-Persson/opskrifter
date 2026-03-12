("use strict");
const recipesCatalog = document.querySelector("#recipesCatalog");
console.log(recipesCatalog);

fetch(`https://dummyjson.com/recipes`).then((res) =>
  res.json().then((data) => {
    showProducts(data.recipes);
  }),
);

function showProducts(dataArr) {
  console.log(dataArr);
  recipesCatalog.innerHTML = "";
  dataArr.forEach((recipes) => {
    recipesCatalog.innerHTML += `
<section class="grid_1-1-1">
        <div>
          <img src="https://cdn.dummyjson.com/recipe-images/${recipes.id}.webp" alt="" />
          <h4>${recipes.name}</h4>
          <p>Tid: ${recipes.cookTimeMinutes + recipes.prepTimeMinutes} minutter</p>
          <div><button>${recipes.difficulty}</button><button>${recipes.cuisine}</button></div>
          <button>Læs mere</button>
        </div>
      </section>
   `;
    console.log(`${recipes.cookTimeMinutes + recipes.prepTimeMinutes}`);
  });
}
