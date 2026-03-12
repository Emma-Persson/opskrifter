("use strict");
const productCatalog = document.querySelector("#productCatalog");

fetch("https://dummyjson.com/recipes?limit=10")
  .then((res) => res.json())
  .then(data);
