const meals = document.getElementById("meals");
const favMeal = document.getElementById("fav-meals");
const search = document.getElementById("search");
const searchInput = document.getElementById("search-input");
const closeModalBtn = document.getElementById("close-modal");
const modalContainer = document.getElementById("modal");
const mealPopup = document.getElementById("meal-popup");

getRamdonMeal();
fetchFavMeals();

async function getRamdonMeal() {
  const url = "https://www.themealdb.com/api/json/v1/1/random.php";
  const result = await fetch(url);
  const response = await result.json();
  const randomMeal = response.meals[0];

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
  // Clean the meal info
  mealPopup.innerHTML = "";

  const mealInfo = document.createElement("div");
  let ingredients = [];
  for (let i = 1; i < 20; i++) {
    if (params["strIngredient" + i]) {
      ingredients.push(
        `${params["strIngredient" + i]} - ${params["strMeasure" + i]}`
      );
    } else {
      break;
    }
  }
  mealInfo.innerHTML = `
    <h1>${params.strMeal}</h1>
    <img src="${params.strMealThumb}" alt="${params.strMeal}">
    <p>${params.strInstructions}</p>
    <h5>Ingredients:</h5>
    <ul>
      ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
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
    <img class="image-fav" src="${mealData.strMealThumb}" alt="${mealName}">
    <span>${mealName}</span>
    <button class="close"><i class="far fa-times-circle"></i></button>
  `;

  const btnImageFav = meal.querySelector(".image-fav");
  const btnSpan = meal.querySelector("span");
  btnImageFav.addEventListener("click", () => {
    modalContainer.style.display = "flex";
    addMealPopup(mealData);
  });

  btnSpan.addEventListener("click", () => {
    modalContainer.style.display = "flex";
    addMealPopup(mealData);
  });

  const btn = meal.querySelector(".close");
  btn.addEventListener("click", () => {
    removeFromLocalStorage(mealData.idMeal);

    // btn.classList.remove("active");
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
