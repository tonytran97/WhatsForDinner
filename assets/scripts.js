

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
const chuckNorrisGifs = 'https://tenor.googleapis.com/v2/search?q=Chuck_Norris&key=AIzaSyAeBfuaSeQDSNmw-MW-VBEz_kk33NHGygo&ar_range=standard&limit=50';

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
                            chuckJoke = data.value
                            getChuck(chuckNorrisGifs)

                        }

                    })
            }
            else {
                swal({
                    icon: "error",
                    text: `Error: ${response.statusText}`,
                });
            }
        })
        .catch(function (error) {
            swal({
                icon: "error",
                text: `Unable to retireve requested data`,
            });
        })
}

// builds mealDB request, x variable is value of select drop down. y is the the value of input field. If y is blank, will call random meal.
// function buildMealReq(x, y) {
//     mealInput.value = ""
//     if (y.length == 0) {
//         fetchStuff(mealDBRand)
//     }
//     else if (x == 'i' || 'c') {
//         let mealUrl = `${mealDB}${x}=${y}`
//         console.log(mealUrl)
//         fetchStuff(mealUrl)
//     }
// }

// builds cocktailDB request, x variable is value of select drop down. y is the the value of input field. If y is blank, will call random drink.
// function buildDrinkReq(x, y) {

//     drinkInput.value = ""
//     if (y.length == 0) {
//         fetchStuff(cocktailDBRand)
//     }
//     else if (x == 'i' || 'a') {
//         let drinkUrl = `${cocktailDB}${x}=${y}`
//         console.log(drinkUrl)
//         fetchStuff(drinkUrl)
//     }
// }

mealBtn.addEventListener('click', function (ev) {
    ev.preventDefault();
    // buildMealReq(mealCat.value, mealInput.value);
    fetchStuff(mealDBRand)
    recentMealBtns();
})

drinkBtn.addEventListener('click', function (ev) {
    ev.preventDefault();
    // buildDrinkReq(drinkCat.value, drinkInput.value);
    fetchStuff(cocktailDBRand)
    recentDrinkBtns();
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
    // if (mealSearchObj.includes(e)) {
    //     return
    // }
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
    recentMealBtns()
    //drinks
    let storedDrinkSearches = JSON.parse(localStorage.getItem('drinkSearches'))
    if (storedDrinkSearches !== null) {
        drinkSearchArr = storedDrinkSearches
    }
    recentDrinkBtns()
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

function displayMeal22(f) {
    let clicked = f.target
    var display = clicked.getAttribute('data-display');
    var picture = clicked.getAttribute('data-picture');
    var link = clicked.getAttribute('data-link');
    console.log(display);
    $("#meal-output").html(`<h1> ${display} </h1>
    <a href = "${link}" target="_blank"><img src="${picture}" id="meal-pic"></a>
    `)
}

function recentMealBtns() {
    document.getElementById('lastMeals').innerHTML = ""
    for (let i = 0; i < mealSearchArr.length; i++) {
        let foodBtn = document.createElement('button');
        foodBtn.setAttribute('data-display', mealSearchArr[i].display);
        foodBtn.setAttribute('data-picture', mealSearchArr[i].picture);
        foodBtn.setAttribute('data-link', mealSearchArr[i].link)
        foodBtn.setAttribute('class', 'button is-link ml-1 mt-5')
        foodBtn.textContent = `${mealSearchArr[i].display}`
        foodBtn.addEventListener('click', function (ev) {
            ev.preventDefault();
            displayMeal22(ev)
        })
        document.getElementById('lastMeals').appendChild(foodBtn)
    }
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

function displayDrink22(g) {
    var displayDrink = g.display;
    var pictureDrink = g.picture;
    var recipeDrink = g.recipe;
    var ingredientList = {
        1: g.ingredientList[1],
        2: g.ingredientList[2],
        3: g.ingredientList[3],
        4: g.ingredientList[4],
        5: g.ingredientList[5],
        6: g.ingredientList[6],
        7: g.ingredientList[7],
        8: g.ingredientList[8],
        9: g.ingredientList[9],
        10: g.ingredientList[10],
        11: g.ingredientList[11],
        12: g.ingredientList[12],
        13: g.ingredientList[13],
        14: g.ingredientList[14],
        15: g.ingredientList[15],
    }
    var ingredientMeasurements = {
        1: g.ingredientMeasurements[1],
        2: g.ingredientMeasurements[2],
        3: g.ingredientMeasurements[3],
        4: g.ingredientMeasurements[4],
        5: g.ingredientMeasurements[5],
        6: g.ingredientMeasurements[6],
        7: g.ingredientMeasurements[7],
        8: g.ingredientMeasurements[8],
        9: g.ingredientMeasurements[9],
        10: g.ingredientMeasurements[10],
        11: g.ingredientMeasurements[11],
        12: g.ingredientMeasurements[12],
        13: g.ingredientMeasurements[13],
        14: g.ingredientMeasurements[14],
        15: g.ingredientMeasurements[15],
    }
    $("#drink-output").html(`<h1> ${displayDrink} </h1>
   <img src="${pictureDrink}" id="meal-pic">
   <p id = "ing"> Required ingredients <p>
   <p> ${recipeDrink} </p>
    `)

    for (i = 1; i < 16; i++) {
        if (ingredientList[i] == null) {
            console.log('failed')
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

function recentDrinkBtns() {
    document.getElementById('lastDrink').innerHTML = ""
    for (let i = 0; i < drinkSearchArr.length; i++) {
        let drinkBtn = document.createElement('button');
        drinkBtn.setAttribute('data-test', JSON.stringify(drinkSearchArr[i]))
        drinkBtn.setAttribute('class', 'button is-link ml-1 mt-5')
        drinkBtn.textContent = `${drinkSearchArr[i].display}`
        let parsed = JSON.parse(drinkBtn.getAttribute('data-test'))

        document.getElementById('lastDrink').appendChild(drinkBtn)
        drinkBtn.addEventListener('click', function (ev) {
            ev.preventDefault();
            displayDrink22(parsed)
        })
    }
}

// stores an array of gif urls to be chosen at random
let chuckGifArr = [];
// stores the chuck norris joke from the fetchStuff function.
let chuckJoke;

// queries Tenor gif library using the specified search parameters in the chuckNorrisGifs variable. Once data is returned, pushes the gifs into the gif array and calls showChuck().
function getChuck(request) {
    fetch(request)
        .then(function (response) {
            if (response.ok) {
                return response.json()
                    .then(function (data) {
                        for (let i = 0; i < data.results.length; i++) {
                            chuckGifArr.push(data.results[i].media_formats.gif.url)
                        }
                        showChuck()
                    })
            }
        })
}

// builds the chuck box.
function showChuck() {
    document.getElementById("joke").innerHTML = `
        <p>${chuckJoke}</p>
        <img src="${chuckGifArr[Math.floor(Math.random() * chuckGifArr.length)]}" id="chuck-pic"></img>`
}

// Leave @ bottom of script.
init();