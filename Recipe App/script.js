const meals = document.getElementById("meals");
const favMeal = document.getElementById("fav-meals");

getRamdonMeal();
fetchFavMeals();
// getMealById(52901);
// getMealBySearch("apple");

async function getRamdonMeal() {
  const url = "https://www.themealdb.com/api/json/v1/1/random.php";
  const result = await fetch(url);
  const response = await result.json();
  const randomMeal = response.meals[0];
  // console.info(randomMeal);

  addMeal(randomMeal, true);
}

async function getMealById(id) {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const result = await fetch(url);
  const response = await result.json();
  const idMeal = response.meals[0];
  return idMeal;
}

// async function getMealBySearch(term) {
//   const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`;
//   const searchMeal = await fetch(url);
//   const response = await searchMeal.json();
//   const result = response.meals;
//   console.info(result);
// }

function addMeal(mealData, random = false) {
  const meal = document.createElement("div");
  meal.classList.add("meal");
  meal.innerHTML = `
    <div class="meal-header">
      ${random ? `<span class="random">random recipe</span>` : ""} 
      <img src='${mealData.strMealThumb}' alt="${mealData.strMeal}" />
    </div>
    <div class="meal-body">
      <h4>${mealData.strMeal}</h4>
      <button class="fav-btn">
        <i class="fas fa-heart"></i>
      </button>
    </div>
  `;
  const btn = meal.querySelector(".meal-body .fav-btn");
  btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) {
      removeFromLocalStorage(mealData.idMeal);
      btn.classList.remove("active");
    } else {
      addToLocalStorage(mealData.idMeal);
      btn.classList.add("active");
    }
    // Limpiando el contenedor
    favMeal.innerHTML = "";
    fetchFavMeals();
  });
  meals.appendChild(meal);
}

function addToLocalStorage(mealId) {
  const mealsIds = getToLocalStorage();
  localStorage.setItem("mealsIds", JSON.stringify([...mealsIds, mealId]));
}

function removeFromLocalStorage(mealId) {
  const mealsIds = getToLocalStorage();
  localStorage.setItem(
    "mealsIds",
    JSON.stringify(mealsIds.filter((id) => id !== mealId))
  );
}

function getToLocalStorage() {
  const mealsIds = JSON.parse(localStorage.getItem("mealsIds"));
  return mealsIds === null ? [] : mealsIds;
}

async function fetchFavMeals() {
  const mealsIds = getToLocalStorage();
  for (let i = 0; i < mealsIds.length; i++) {
    const meal = mealsIds[i];
    const mealId = await getMealById(meal);
    addMealToFav(mealId);
  }
}

function addMealToFav(mealData) {
  const mealName = mealData.strMeal.split(" ")[1]
    ? `${mealData.strMeal.split(" ")[0]} ${mealData.strMeal.split(" ")[1]}`
    : `${mealData.strMeal.split(" ")[0]}`;
  const meal = document.createElement("li");
  meal.innerHTML = `
    <img src="${mealData.strMealThumb}" alt="${mealName}">
    <span>${mealName}</span>
  `;
  favMeal.appendChild(meal);
}
