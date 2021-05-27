const meals = document.getElementById("meals");
const favMeal = document.getElementById("fav-meals");
const search = document.getElementById("search");
const searchInput = document.getElementById("search-input");
const closeModalBtn = document.getElementById("close-modal");
const modalContainer = document.getElementById("modal");
const mealPopup = document.getElementById("meal-popup");

getRamdonMeal();
fetchFavMeals();
// getMealById(52901);

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

async function getMealBySearch(term) {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`;
  const searchMeal = await fetch(url);
  const response = await searchMeal.json();
  const result = response.meals;
  return result;
}

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
  const btnMealHeader = meal.querySelector(".meal-header");
  btnMealHeader.addEventListener("click", () => {
    modalContainer.style.display = "flex";
    addMealPopup(mealData);
  });

  const btn = meal.querySelector(".meal-body .fav-btn");
  btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) {
      removeFromLocalStorage(mealData.idMeal);
      btn.classList.remove("active");
    } else {
      addToLocalStorage(mealData.idMeal);
      btn.classList.add("active");
    }
    fetchFavMeals();
  });
  meals.appendChild(meal);
}

function addMealPopup(params) {
  // console.info(params);
  // Clean the meal info
  mealPopup.innerHTML = "";
  const mealInfo = document.createElement("div");
  mealInfo.innerHTML = `
    <h1>${params.strMeal}</h1>
    <img src="${params.strMealThumb}" alt="${params.strMeal}">
    <p>${params.strInstructions}</p>
    <h5>Ingredients</h5>
    <ul>
      <li>1. ${params.strIngredient1 && params.strIngredient1}</li>
      <li>2. ${params.strIngredient2 && params.strIngredient2}</li>
      <li>3. ${params.strIngredient3 && params.strIngredient3}</li>
      <li>4. ${params.strIngredient4 && params.strIngredient4}</li>
      <li>5. ${params.strIngredient5 && params.strIngredient5}</li>
      <li>6. ${params.strIngredient6 && params.strIngredient6}</li>
      </ul>
  `;
  mealPopup.appendChild(mealInfo);
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
  // Clean the container
  favMeal.innerHTML = "";

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
  // meal.classList.add("fav-meal");
  meal.innerHTML += `
    <img src="${mealData.strMealThumb}" alt="${mealName}">
    <span>${mealName}</span>
    <button class="close"><i class="far fa-times-circle"></i></button>
  `;

  // const btnMealHeader = meal.querySelector(".meal-header");
  meal.addEventListener("click", () => {
    modalContainer.style.display = "flex";
    addMealPopup(mealData);
  });

  const btn = meal.querySelector(".close");
  btn.addEventListener("click", () => {
    removeFromLocalStorage(mealData.idMeal);
    fetchFavMeals();
  });

  favMeal.appendChild(meal);
}

search.addEventListener("click", async () => {
  // Clean the meals
  meals.innerHTML = "";
  let searchValue = searchInput.value;
  const mealsSearched = await getMealBySearch(searchValue);

  if (mealsSearched) {
    searchInput.value = "";
    mealsSearched.forEach((meal) => {
      addMeal(meal);
    });
  }
});

closeModalBtn.addEventListener("click", () => {
  modalContainer.style.display = "none";
});
