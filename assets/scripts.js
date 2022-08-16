

// API URLs
const mealDB = 'https://www.themealdb.com/api/json/v1/1/filter.php?'

const mealDBIngList = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list' // MealDB ingredient list
const mealDBCatList = 'http://www.themealdb.com/api/json/v1/1/list.php?c=list' // MealDB category list
const cocktailRedirect = 'https://www.thecocktaildb.com/drink/' //Requires code and name from returned data seperated by dashes e.g. https://www.thecocktaildb.com/drink/11000-Mojito-Cocktail

const mealDBIng = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=' // Need to add ingredient after 'i='
const mealDBCat = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=' // Need to add category after 'c='
const mealDBRand = 'https://www.themealdb.com/api/json/v1/1/random.php' // Works as is


const cocktailDB = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?'

const cocktailDBIng = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' // Need to add ingredient after 'i='
const cocktailDBAlc = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=' // Need to add either 'Alcoholic' or 'Non_alcoholic' after 'a='
const cocktailDBRand = 'https://www.thecocktaildb.com/api/json/v1/1/random.php' // Works as is

const imgPreview = '/preview' // Add to end of the thumbnail image included in JSON to get image to display. Shows as either 'strMealThumb' or 'strDrinkThumb' in data packet.

const chuckNorris = 'https://api.chucknorris.io/jokes/random' //Works as is

const mealBtn = document.getElementById('mealBtn');
const drinkBtn = document.getElementById('drinkBtn');

const mealInput = document.getElementById('mealInput');
const drinkInput = document.getElementById('drinkInput');
const mealCat = document.getElementById('mealCat');
const drinkCat = document.getElementById('drinkCat');

const joke = document.getElementById("chuck");


function fetchStuff(request) {
    fetch(request)
        .then(function (response) {
            if (response.ok) {
                return response.json()
                    .then(function (data) {
                        console.log(data);

                        if (data.meals) { displayMeal(data) }
                        else if (data.drinks) { displayDrink(data) }
                        else {
                            document.getElementById("joke").innerHTML = `${data.value} 
                        <img src="https://images01.military.com/sites/default/files/styles/full/public/2021-04/chucknorris.jpeg.jpg?itok=2b4A6n29" id="chuck-pic"></img>`
                        }

                        if (data.meals === null) {
                            alert('null')
                        }
                    })
            }
            else {
                alert(`Error: ${response.statusText}`)
            }
        })
        .catch(function (error) {
            alert(`Unable to retireve requested data`)
        })
    storedSearchArr.push(request);
}

// builds mealDB request, x variable is value of select drop down. y is the the value of input field. If y is blank, will call random meal.
function buildMealReq(x, y) {
    mealInput.value = ""
    if (y.length == 0) {
        fetchStuff(mealDBRand)
    }
    else if (x == 'i' || 'c') {
        let mealUrl = `${mealDB}${x}=${y}`
        console.log(mealUrl)
        fetchStuff(mealUrl)
    }
}

// builds cocktailDB request, x variable is value of select drop down. y is the the value of input field. If y is blank, will call random drink.
function buildDrinkReq(x, y) {

    drinkInput.value = ""
    if (y.length == 0) {
        fetchStuff(cocktailDBRand)
    }
    else if (x == 'i' || 'a') {
        let drinkUrl = `${cocktailDB}${x}=${y}`
        console.log(drinkUrl)
        fetchStuff(drinkUrl)
    }
}

mealBtn.addEventListener('click', function (ev) {
    ev.preventDefault();
    buildMealReq(mealCat.value, mealInput.value);

})

drinkBtn.addEventListener('click', function (ev) {
    ev.preventDefault();
    buildDrinkReq(drinkCat.value, drinkInput.value);
})

joke.addEventListener("click", function (ev) {
    ev.preventDefault();
    fetchStuff(chuckNorris);

})

// Can be used to populate recent seraches on page. Depending on how we want to use recent searches, may consider placing desired variables/data into an obect and pushing object into local storage.
let storedSearchArr = [];

// Gets local storage and sets to storedSearchArr if not empty. Function should be called upon load of page.
function init() {
    let storedSearches = JSON.parse(localStorage.getItem('searches'))
    if (storedSearches !== null) {
        storedSearchArr = storedSearches
    }
}

// When called, takes argument e and pushes into storedSearch array. If array has length >5 will shift oldest item out of the array. Sets array to local storage.
function saveSearch(e) {
    storedSearchArr.push(e);
    while (storedSearchArr.length > 5) {
        storedSearchArr.shift()
    };
    localStorage.setItem('searches', JSON.stringify(storedSearchArr))
}

function displayMeal(f) {
    var display = f.meals[0].strMeal;
    var picture = f.meals[0].strMealThumb;
    var link = f.meals[0].strSource;
    console.log(display);
    $("#meal-output").html(`<h1> ${display} </h1>
    <a href = "${link}" target="_blank"><img src="${picture}" id="meal-pic"></a>
    `)
}

function displayDrink(g) {
    var displayDrink = g.drinks[0].strDrink;
    var pictureDrink = g.drinks[0].strDrinkThumb;
    var recipeDrink = g.drinks[0].strInstructions;
    var ingredientList = {
        1: g.drinks[0].strIngredient1,
        2: g.drinks[0].strIngredient2,
        3: g.drinks[0].strIngredient3,
        4: g.drinks[0].strIngredient4,
        5: g.drinks[0].strIngredient5,
        6: g.drinks[0].strIngredient6,
        7: g.drinks[0].strIngredient7,
        8: g.drinks[0].strIngredient8,
        9: g.drinks[0].strIngredient9,
        10: g.drinks[0].strIngredient10,
        11: g.drinks[0].strIngredient11,
        12: g.drinks[0].strIngredient12,
        13: g.drinks[0].strIngredient13,
        14: g.drinks[0].strIngredient14,
        15: g.drinks[0].strIngredient15,
    }
    var ingredientMeasurements = {
        1: g.drinks[0].strMeasure1,
        2: g.drinks[0].strMeasure2,
        3: g.drinks[0].strMeasure3,
        4: g.drinks[0].strMeasure4,
        5: g.drinks[0].strMeasure5,
        6: g.drinks[0].strMeasure6,
        7: g.drinks[0].strMeasure7,
        8: g.drinks[0].strMeasure8,
        9: g.drinks[0].strMeasure9,
        10: g.drinks[0].strMeasure10,
        11: g.drinks[0].strMeasure11,
        12: g.drinks[0].strMeasure12,
        13: g.drinks[0].strMeasure13,
        14: g.drinks[0].strMeasure14,
        15: g.drinks[0].strMeasure15,
    }
    $("#drink-output").html(`<h1> ${displayDrink} </h1>
   <img src="${pictureDrink}" id="meal-pic">
   <p id = "ing"> Required ingredients <p>
   <p> ${recipeDrink} </p>
    `)

    for (i = 1; i < 16; i++) {

        if (ingredientList[i] == null) {
            return;
        }

        console.log(ingredientList[i]);
        var dL = document.createElement("p");
        dL.textContent = ingredientList[i] + " " + ingredientMeasurements[i];
        console.log(dL);
        $("#ing").append(dL);
    }


    console.log(displayDrink);

}