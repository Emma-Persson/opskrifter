("use strict");

//Brug til at retunere en parametre fra urlen
const url_param_get = (key) => {
  const url = new URL(window.location);
  return url.searchParams.get(key);
}

//Brug til at sætte en parameter i urlen, key er navnet på parametren, value er hvad den indenholder
const url_param = (key,value) => {
  const url = new URL(window.location);
  url.searchParams.set(key, value);
  window.history.pushState({}, '', url);
}

const recipesList = document.querySelector("#recipesList");
const timeFilter = document.querySelector("#timeFilter");

document.querySelector(".back_btn").addEventListener("click", () => {
  history.back();
});

document.querySelector(".eastandsoutheastasian").addEventListener("click", () => {
  url_param("cuisine","eastandsoutheastasian")
  filterCuisine();
});
document.querySelector(".european").addEventListener("click", () => {
  url_param("cuisine","european")
  filterCuisine();
});
document.querySelector(".mediterraneanandmiddleeastern").addEventListener("click", () => {
  url_param("cuisine","mediterraneanandmiddleeastern")
  filterCuisine();
});
document.querySelector(".southasian").addEventListener("click", () => {
  url_param("cuisine","southasian")
  filterCuisine();
});
document.querySelector(".northandlatinamerican").addEventListener("click", () => {
  url_param("cuisine","northandlatinamerican")
  filterCuisine();
});

let theData;
const time = url_param_get("time");
const recipesCatalog = document.querySelector("#recipesCatalog");

fetch(`https://dummyjson.com/recipes?&limit=100`).then((res) =>
  res.json().then((data) => {
    theData = data.recipes;
    filterCuisine();
  })
);

function showRecipes(arrayData) {
  
  recipesList.innerHTML = "";
  arrayData.forEach((recipes) => {
    recipesList.innerHTML += `<article class="card">
          <img src="https://cdn.dummyjson.com/recipe-images/${recipes.id}.webp" alt="" />
          <h4>${recipes.name}</h4>
          <p>Tid: ${recipes.cookTimeMinutes + recipes.prepTimeMinutes} minutter</p>
          <p> ${recipes.rating}<span class="star">★</span></p>
          <div><button class="difficulty ${recipes.difficulty.toLowerCase()}">${recipes.difficulty}</button><button class="cuisine ${recipes.cuisine.toLowerCase().replace(" ", "-")}">${recipes.cuisine}</button></div>
          <button class="readMore"> <a href="enkelt_opskrift.html?id=${recipes.id}">Read More &#8594</a></button>
        </article>`;
  });
}

function filterCuisine() {
  const cuisine_tag = url_param_get("cuisine");
  const time_tag = url_param_get("time");

  let filtered = theData;

  //Filtrere på tid hvis det er en parametrer der er med
  if(time_tag){

    if(time_tag == "30"){
      timeFilter.innerHTML = "0 - 30min";
    }
    else if(time_tag == "60"){
      timeFilter.innerHTML = "30 - 60min";
    }
    else if(time_tag == "60plus"){
      timeFilter.innerHTML = "+ 60 min";
    }

    filtered = filtered.filter((recipe) => {
      let make_time = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

      if(time_tag == "30"){
        return make_time <= 30;
      }
      else if(time_tag == "60"){
        return make_time <= 60;
      }
      else if(time_tag == "60plus"){
        return make_time >= 60;
      }
    });
  }

  //Filtrere på cuisine tag hvis det er sat
  if (cuisine_tag){
    const activeButton = document.querySelector("." + CSS.escape(cuisine_tag));
    if (activeButton) {
      document.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
      activeButton.classList.add("active");
    }
  
    let cuisines

    if (cuisine_tag === "eastandsoutheastasian") cuisines = ["Asian", "Japanese", "Korean", "Thai", "Vietnamese"];
    else if (cuisine_tag === "european") cuisines = ["Italian", "Spanish", "Russian", "French"];
    else if (cuisine_tag === "mediterraneanandmiddleeastern") cuisines = ["Greek", "Turkish", "Lebanese", "Moroccan", "Mediterranean"];
    else if (cuisine_tag === "southasian") cuisines = ["Indian", "Pakistani"];
    else if (cuisine_tag === "northandlatinamerican") cuisines = ["American", "Mexican", "Brazilian", "Cuban", "Hawaiian"];

    filtered = filtered.filter((recipe) => cuisines.includes(recipe.cuisine));

    showRecipes(filtered);

  } else {
    showRecipes(filtered);
  }
}
