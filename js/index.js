("use strict");
let theData;

const ratingsContainer = document.querySelector("#ratingsContainer");

fetch(`https://dummyjson.com/recipes?limit=3&sortBy=rating&order=desc`).then((res) =>
  res.json().then((data) => {
    theData = data.recipes;
    showProducts(theData);
  }),
);

function showProducts(dataArr) {
  ratingsContainer.innerHTML = `<h3>Best Ratings</h3>`;
  dataArr.forEach((recipes) => {
    ratingsContainer.innerHTML += `<div class="ratingCard">
          <img src="https://cdn.dummyjson.com/recipe-images/${recipes.id}.webp" alt="food picture" />
          <h4>${recipes.name}</h4>
          <div class="cardInformation">
            <p>Time: ${recipes.cookTimeMinutes + recipes.prepTimeMinutes} minutes</p>
            <p> ${recipes.rating}<span class="star">★</span></p>
          </div>
          <div class="flexContainer"><button class="difficulty ${recipes.difficulty.toLowerCase()}">${recipes.difficulty}</button><button class="cuisine ${recipes.cuisine.toLowerCase().replace(" ", "-")}">${recipes.cuisine}</button></div>
          <button class="readMore"><a href="enkelt_opskrift.html?id=${recipes.id}"> Read More → </a></button>
        </div>`;
  });
}
