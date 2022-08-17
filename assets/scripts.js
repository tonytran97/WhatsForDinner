

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

                        if (data.meals) {
                            displayMeal(data)
                            saveMeals(data) 
                        }
                        else if (data.drinks) {
                            displayDrink(data)
                            saveDrinks(data)
                        }
                        else {
                            document.getElementById("joke").innerHTML = `
                            <p>${data.value}</p> 
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

// Array to be iterated over for building locally stored recipes and rendering on page.
let mealSearchArr = [];
// Object used to store used pieces of data into local storage.
let mealSearchObj = {};

// // Saves used data into mealSearchObj, pushes object into mealSearchArr, saves arr to local storage, then empties the mealSearchObj for next search. Uses while loop to keep array at 5 items.
function saveMeals(e) {
    mealSearchObj.display = e.meals[0].strMeal;
    mealSearchObj.picture = e.meals[0].strMealThumb;
    mealSearchObj.link = e.meals[0].strSource;
    mealSearchArr.push(mealSearchObj);
    while (mealSearchArr.length > 5) {
        mealSearchArr.shift()
    };
    localStorage.setItem('mealSearches', JSON.stringify(mealSearchArr))
    mealSearchObj = {}
}

// Array to be iterated over for building locally stored recipes and rendering on page.
let drinkSearchArr = [];
// Object used to store used pieces of data into local storage.
let drinkSearchObj = {};

// Saves used data into drinkSearchObj, pushes object into drinkSearchArr, saves arr to local storage, then empties the drinkSearchObj for next search. Uses while loop to keep array at 5 items.
function saveDrinks(h) {
    drinkSearchObj.display = h.drinks[0].strDrink;
    drinkSearchObj.picture = h.drinks[0].strDrinkThumb;
    drinkSearchObj.recipe = h.drinks[0].strInstructions;
    drinkSearchObj.ingredientList = {
        1: h.drinks[0].strIngredient1,
        2: h.drinks[0].strIngredient2,
        3: h.drinks[0].strIngredient3,
        4: h.drinks[0].strIngredient4,
        5: h.drinks[0].strIngredient5,
        6: h.drinks[0].strIngredient6,
        7: h.drinks[0].strIngredient7,
        8: h.drinks[0].strIngredient8,
        9: h.drinks[0].strIngredient9,
        10: h.drinks[0].strIngredient10,
        11: h.drinks[0].strIngredient11,
        12: h.drinks[0].strIngredient12,
        13: h.drinks[0].strIngredient13,
        14: h.drinks[0].strIngredient14,
        15: h.drinks[0].strIngredient15,
    }
    drinkSearchObj.ingredientMeasurements = {
        1: h.drinks[0].strMeasure1,
        2: h.drinks[0].strMeasure2,
        3: h.drinks[0].strMeasure3,
        4: h.drinks[0].strMeasure4,
        5: h.drinks[0].strMeasure5,
        6: h.drinks[0].strMeasure6,
        7: h.drinks[0].strMeasure7,
        8: h.drinks[0].strMeasure8,
        9: h.drinks[0].strMeasure9,
        10: h.drinks[0].strMeasure10,
        11: h.drinks[0].strMeasure11,
        12: h.drinks[0].strMeasure12,
        13: h.drinks[0].strMeasure13,
        14: h.drinks[0].strMeasure14,
        15: h.drinks[0].strMeasure15,
    }
    drinkSearchArr.push(drinkSearchObj);
    while (drinkSearchArr.length > 5) {
        drinkSearchArr.shift()
    };
    localStorage.setItem('drinkSearches', JSON.stringify(drinkSearchArr))
    drinkSearchObj = {}
}

// Gets local storage and sets to storedSearchArr if not empty. Function should be called upon load of page.
function init() {
    //meals
    let storedMealSearches = JSON.parse(localStorage.getItem('mealSearches'))
    if (storedMealSearches !== null) {
        mealSearchArr = storedMealSearches
    }
    //drinks
    let storedDrinkSearches = JSON.parse(localStorage.getItem('drinkSearches'))
    if (storedDrinkSearches !== null) {
        drinkSearchArr = storedDrinkSearches
    }
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

// Leave @ bottom of script.
init();