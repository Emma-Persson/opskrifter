const api = "https://dummyjson.com/recipes";

//brug en endpoint. f.eks /1 for at få recipe nr1
//eller /tags for at få alle tags. Retunere json
const api_get = (endpoint) => {
  return fetch(api + endpoint).then((res) => res.json());
}

//Brug til at sætte en parameter i urlen, key er navnet på parametren, value er hvad den indenholder
const url_param = (key,value) => {
  const url = new URL(window.location);
  url.searchParams.set(key, value);
  window.history.pushState({}, '', url);
}

//Brug til at retunere en parametre fra urlen
const url_param_get = (key) => {
  const url = new URL(window.location);
  return url.searchParams.get(key);
}

const recipe_id = url_param_get("id");

const single_recipe_element = document.querySelector("#singleRecipe");

//Kører når siden er loadet
document.addEventListener("DOMContentLoaded", async () => {

  const recipe = await api_get(`/${recipe_id}`);

	let opskrift_html = `
		<h2>${recipe.name}</h2>
		<section>
		<div><button class="difficulty ${recipe.difficulty.toLowerCase()}">${recipe.difficulty}</button><button class="cuisine ${recipe.cuisine.toLowerCase().replace(" ", "-")}">${recipe.cuisine}</button></div>
		<img src="${recipe.image}" alt="${recipe.name}">
		<div class="grid_1-1-1">
			<p>Tid: ${recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</p>
			<div>
				<p>${recipe.rating} <span class="star">★</span></p>
			</div>
			<p>${recipe.servings} servings</p>
		</div>
		</section>
		<section>
			<h3>Ingredienser:</h3>
			<ul>
				${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
			</ul>
		</section>
		<section>
			<h3>Fremgangsmåde:</h3>
			<ol>
				${recipe.instructions.map(inst => `<li>${inst}</li>`).join('')}
			</ol>
		</section>
	`
	single_recipe_element.innerHTML = opskrift_html;
});