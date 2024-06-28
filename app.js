
const input = document.getElementById("input");
const searchBtn = document.querySelector(".search");
const mealDiv = document.querySelector(".meal-wrapper");
const searchMeal = document.getElementById("search-meal");
const details = document.querySelector(".details");

function fetchMeal () {

    if (input.value) {
        let MEAL_API = `https://themealdb.com/api/json/v1/1/search.php?s=${input.value}`;
        fetch(MEAL_API)
        .then( res => res.json())
        .then( data => showMeal(data.meals))   
        searchMeal.style.display = "none";
    }
    else{
        alert("Search for a meal")
        searchMeal.style.display = "block";
    }

    
}

function showMeal(meal){
    console.log(meal)
    meal.forEach( item => {
        mealDiv.innerHTML += `
            <div class="meal-box border border-gray-500 rounded-xl ">
                    <img src=${item.strMealThumb} alt=${item.strMeal} class=" object-fit h-[200px]>
                    <h3 class="text-[white] px-3 py-3 text-xl capitalize ">${item.strMeal}</h3>
                    <p class="px-3 py-1 text-gray-400  text-xl">${item.strInstructions.slice(0, 100)}...</p>
                    <p class="italic text-gray-500 px-3 text-[18px]"> <span>${item.strArea}</span> <span>${item.strCategory}</span> </p>
                    <div class="px-3 my-4 pb-5">
                        <a href=${item.strYoutube} target="_blank" class="bg-orange-500 hover:bg-orange-700 rounded px-4 py-2 text-white text-xl">watch</a>
                        <button class="btn mx-5 text-white text-xl" onclick ="lookUp('${item.idMeal}')">view Recipe</button>
                    </div>
            </div>
        `
    });
}


function lookUp(id) {
    let API = `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        fetch(API)
        .then( res => res.json())
        .then( data => showDetails(data.meals[0]))  
}

function showDetails(meal) {

    details.classList.add("visible");
    details.classList.remove("invisible");

    details.innerHTML = `
        <div class="w-[60%] bg-[white] h-[500px] fixed top-[20%] left-[20%] overflow-auto p-10">
                <h2 class="font-semibold  text-2xl">${meal.strMeal}</h2>
                <p class="font-2xl text-[#212836] mt-5 ">${meal.strInstructions} </p><br>
                <a href=${meal.strYoutube} class="px-5 py-3 bg-orange-600 text-[white] rounded-xl mt-10">watch</a>
                <button onclick="closeBtn()" class="bg-orange-600 text-[white] px-5 py-3 ml-5 rounded-xl">Close</button>
            </div>
    `
}

function closeBtn() {
    details.classList.add("invisible");
    details.classList.remove("visible");
}

searchBtn.addEventListener("click", ()=> {
    fetchMeal();
})
