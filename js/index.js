("use strict");
let theData;

const ratingsContainer = document.querySelector("#ratingsContainer");
console.log(ratingsContainer);

fetch(`https://dummyjson.com/recipes?limit=3&sortBy=rating&order=desc`).then((res) =>
  res.json().then((data) => {
    theData = data.recipes;
    showProducts(theData);
  }),
);

function showProducts(dataArr) {
  ratingsContainer.innerHTML = "";
  dataArr.forEach((recipes) => {
    ratingsContainer.innerHTML += `<div class="ratingCard">
          <img src="https://cdn.dummyjson.com/recipe-images/${recipes.id}.webp" alt="food picture" />
          <h4>${recipes.name}</h4>
          <div class="cardInformation">
            <p>Time: ${recipes.cookTimeMinutes + recipes.prepTimeMinutes} minutes</p>
            <p> ${recipes.rating}<span class="yellow"> ⭑</span></p>
          </div>
          <div><button class="difficulty ${recipes.difficulty.toLowerCase()}">${recipes.difficulty}</button><button class="cuisine ${recipes.cuisine.toLowerCase().replace(" ", "-")}">${recipes.cuisine}</button></div>
          <button><a href="enkelt_opskrift.html"> Read More → </a></button>
        </div>`;
  });
}
