const api = "https://dummyjson.com/recipes";

//brug en endpoint. f.eks /1 for at få recipe nr1
//eller /tags for at få alle tags. Retunere json
function api_get(endpoint) {
  return fetch(api + endpoint).then((res) => res.json());
}

//Brug til at sætte en parameter i urlen, key er navnet på parametren, value er hvad den indenholder
function url_param (key,value) {
  const url = new URL(window.location);
  url.searchParams.set(key, value);
  window.history.pushState({}, '', url);
}

//Brug til at retunere en parametre fra urlen
function url_param_get (key) {
  const url = new URL(window.location);
  return url.searchParams.get(key);
}

const recipe_id = url_param_get("id");

const single_recipe_element = document.querySelector("#singleRecipe");

//Kører når siden er loadet
document.addEventListener("DOMContentLoaded", async () => {

  const recipe = await api_get(`/${recipe_id}`); 

	let cuisine_class

	if(["Asian", "Japanese", "Korean", "Thai", "Vietnamese"].includes(recipe.cuisine)) cuisine_class = "asian";
	if(["Italian", "Spanish", "Russian", "French"].includes(recipe.cuisine)) cuisine_class = "european";
	if(["Greek", "Turkish", "Lebanese", "Moroccan", "Mediterranean"].includes(recipe.cuisine)) cuisine_class = "mediterranean";
	if(["Indian", "Pakistani"].includes(recipe.cuisine)) cuisine_class = "south-asian";
	if(["American", "Mexican", "Brazilian", "Cuban", "Hawaiian"].includes(recipe.cuisine)) cuisine_class = "american";

	let opskrift_html = `
		<h2 class="${cuisine_class}">${recipe.name}</h2>
		<div><button class="difficulty ${recipe.difficulty.toLowerCase()}">${recipe.difficulty}</button><button class="cuisine ${recipe.cuisine.toLowerCase().replace(" ", "-")}">${recipe.cuisine}</button></div>
		
		<div class="recipe-align">
			<section class="justify-end">
				<img src="${recipe.image}" alt="${recipe.name}">
			</section>

			<div>
				<section>
					<div class="force_grid_1-1-1">
						<p>Time: ${recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</p>
						<div>
							<p>${recipe.rating} <span class="star">★</span></p>
						</div>
						<p>${recipe.servings} servings</p>
					</div>
				</section>

				<section>
					<h3 class="${cuisine_class}">Ingredients:</h3>
					<ul class="${cuisine_class}">
						${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
					</ul>
				</section>
			</div>
		</div>

		<section>
			<h3 class="${cuisine_class}">Walkthrough:</h3>
			<ol class="${cuisine_class}">
				${recipe.instructions.map(inst => `<li>${inst}</li>`).join('')}
			</ol>
		</section>
	`
	single_recipe_element.innerHTML = opskrift_html;
});