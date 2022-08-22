// API URLs
const mealDB = 'https://www.themealdb.com/api/json/v1/1/filter.php?'

const mealDBIngList = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list' // MealDB ingredient list
const mealDBCatList = 'http://www.themealdb.com/api/json/v1/1/list.php?c=list' // MealDB category list
const cocktailRedirect = 'https://www.thecocktaildb.com/drink/' //Requires code and name from returned data seperated by dashes e.g. https://www.thecocktaildb.com/drink/11000-Mojito-Cocktail

const mealDBIng = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=' // Need to add ingredient after 'i='
const mealDBCat = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=' // Need to add category after 'c='
const mealDBRand = 'https://www.themealdb.com/api/json/v1/1/random.php' // Works as is
const mealDBID = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i='

const cocktailDB = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?'

const cocktailDBIng = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' // Need to add ingredient after 'i='
const cocktailDBAlc = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=' // Need to add either 'Alcoholic' or 'Non_alcoholic' after 'a='
const cocktailDBRand = 'https://www.thecocktaildb.com/api/json/v1/1/random.php' // Works as is
const cocktailDBID = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

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
    if (request == chuckNorris) {
        fetch(request)
            .then(function (response) {
                if (response.ok) {
                    return response.json()
                        .then(function (data) {
                            chuckJoke = data.value
                            getChuck(chuckNorrisGifs)
                        })
                }
            })
    }
    else {
        fetch(request)
            .then(function (response) {
                if (response.ok) {
                    return response.json()
                        .then(function (data) {
                            if (data.meals) {
                                if (data.meals.length > 1) {
                                    chooseMeal(data)
                                }
                                else if (data.meals.length == 1) {
                                    saveMeals(data)
                                    displayMeal(data)
                                }
                            }
                            else if (data.drinks) {
                                if (data.drinks.length > 1) {
                                    chooseDrink(data)
                                }
                                else if (data.drinks.length == 1) {
                                    saveDrinks(data)
                                    displayDrink(data)
                                }
                            }
                            else {
                                swal({
                                    icon: "error",
                                    text: `That is an invalid option`,
                                });
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
                    text: `Unable to retrieve requested data`,
                });
            })
    }
}

// Array to be iterated over for building locally stored recipes and rendering on page.
let mealSearchArr = [];

// Saves used data into mealSearchObj, pushes object into mealSearchArr, saves arr to local storage, then empties the mealSearchObj for next search. Uses while loop to keep array at 5 items.
function saveMeals(e) {
    console.log(e)
    // does not replicate buttons
    for (let i = 0; i < mealSearchArr.length; i++) {
        if (mealSearchArr[i].meals[0].strMeal === e.meals[0].strMeal) {
            console.log('this wont work')
            return
        }
    }
    mealSearchArr.push(e);
    while (mealSearchArr.length > 5) {
        mealSearchArr.shift()
    };
    localStorage.setItem('mealSearches', JSON.stringify(mealSearchArr))
}

// Builds mealDB request URL, uses select option value as argument x. 
function buildMealReq(x) {
    mealCat.value = ""
    if (x == "") {
        fetchStuff(mealDBRand)
    }
    else if (x == 'veg') {
        fetchStuff(mealDBCat + 'vegetarian')
    }
    else if (x == 'vegan') {
        fetchStuff(mealDBCat + 'vegan')
    }
    else {
        let mealUrl = `${mealDBIng}${x}`
        console.log(mealUrl)
        fetchStuff(mealUrl)
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

// if user chooses a food option instead of random, response contains array of options. This will choose one fromt eh array at random and pull the meal ID and send new fetch request using the ID.
// ingredient/category requests do not contain the same data as a single meal request. This ensures consistent functionality of the page.
function chooseMeal(j) {
    let chosen = j.meals[Math.floor(Math.random() * j.meals.length)]
    console.log(chosen)
    console.log(mealDBID + chosen.idMeal)
    fetchStuff(mealDBID + chosen.idMeal)
}

// Stringifies the object from mealSearchArr and assigns as data atribute for future use. Upon click, parses the data attr and calls displayMeal() passing parsed object in.
function recentMealBtns() {
    document.getElementById('lastMeals').innerHTML = ""
    for (let i = 0; i < mealSearchArr.length; i++) {
        let foodBtn = document.createElement('button');
        foodBtn.setAttribute('data-meal', JSON.stringify(mealSearchArr[i]));
        foodBtn.setAttribute('class', 'button is-link ml-1 mt-5')
        foodBtn.textContent = `${mealSearchArr[i].meals[0].strMeal}`
        let parsed = JSON.parse(foodBtn.getAttribute('data-meal'))
        foodBtn.addEventListener('click', function (ev) {
            ev.preventDefault();
            displayMeal(parsed)
        })
        document.getElementById('lastMeals').appendChild(foodBtn)
    }
}

// Array to be iterated over for building locally stored recipes and rendering on page.
let drinkSearchArr = [];

// Saves used data into drinkSearchObj, pushes object into drinkSearchArr, saves arr to local storage, then empties the drinkSearchObj for next search. Uses while loop to keep array at 5 items.
function saveDrinks(h) {
    // does not replicate same btn
    for (let i = 0; i < drinkSearchArr.length; i++) {
        if (drinkSearchArr[i].drinks[0].strDrink === h.drinks[0].strDrink) {
            console.log('this wont work')
            return
        }
    }
    drinkSearchArr.push(h);
    while (drinkSearchArr.length > 5) {
        drinkSearchArr.shift()
    };
    localStorage.setItem('drinkSearches', JSON.stringify(drinkSearchArr))
}

// builds cocktailDB request, x variable is value of select drop down. y is the the value of input field. If y is blank, will call random drink.
function buildDrinkReq(y) {
    drinkInput.value = ""
    if (y.length == 0) {
        fetchStuff(cocktailDBRand)
    }
    else {
        let drinkUrl = `${cocktailDBIng}${y}`
        console.log(drinkUrl)
        fetchStuff(drinkUrl)
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
    $("#drink-output").html(`
        <h1> ${displayDrink} </h1>
        <img src="${pictureDrink}" id="meal-pic">
        <p id = "ing"> Required ingredients <p>
        <p> ${recipeDrink} </p>
    `)

    for (i = 1; i < 16; i++) {
        if (ingredientList[i] == null) {
            return;
        }
        if (ingredientMeasurements[i] == null) {
            return
        }

        var dL = document.createElement("p");
        dL.textContent = ingredientList[i] + " " + ingredientMeasurements[i];
        $("#ing").append(dL);
    }
}

// Same functionality as chooseMeal(), see comments above.
function chooseDrink(k) {
    let chosen = k.drinks[Math.floor(Math.random() * k.drinks.length)]
    console.log(chosen)
    console.log(cocktailDBID + chosen.idDrink)
    fetchStuff(cocktailDBID + chosen.idDrink)
}

// Same functionality as recentMealBtns(), see comments above.
function recentDrinkBtns() {
    document.getElementById('lastDrink').innerHTML = ""
    for (let i = 0; i < drinkSearchArr.length; i++) {
        let drinkBtn = document.createElement('button');
        drinkBtn.setAttribute('data-test', JSON.stringify(drinkSearchArr[i]))
        drinkBtn.setAttribute('class', 'button is-link ml-1 mt-5')
        drinkBtn.textContent = `${drinkSearchArr[i].drinks[0].strDrink}`
        let parsed = JSON.parse(drinkBtn.getAttribute('data-test'))

        document.getElementById('lastDrink').appendChild(drinkBtn)
        drinkBtn.addEventListener('click', function (ev) {
            ev.preventDefault();
            displayDrink(parsed)
        })
    }
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

// stores an array of gif urls to be chosen at random
let chuckGifArr = [];
// stores the chuck norris joke from the fetchStuff function.
let chuckJoke;

// queries Tenor gif library using the specified search parameters in the chuckNorrisGifs variable. Once data is returned, pushes the gif urls into the gif array and calls showChuck().
function getChuck(request) {
    fetch(request)
        .then(function (response) {
            if (response.ok) {
                return response.json()
                    .then(function (data) {
                        console.log(data)
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

// DO NOT CLICK
$('#rickRollEm').click(function () {
    console.log("hello");
    let sucksToBeYou = document.createElement('h1');
    sucksToBeYou.textContent = "LOL GET RICK ROLLED";
    $('#rickSlot').append(sucksToBeYou);
})

mealBtn.addEventListener('click', function (ev) {
    ev.preventDefault();
    buildMealReq(mealCat.value);
    recentMealBtns();
})

drinkBtn.addEventListener('click', function (ev) {
    ev.preventDefault();
    buildDrinkReq(drinkInput.value);
    recentDrinkBtns();
})

joke.addEventListener("click", function (ev) {
    ev.preventDefault();
    fetchStuff(chuckNorris);
})

// Leave @ bottom of script.
init();

// I am only for testing
function test(request) {
    fetch(request)
        .then(function (response) {
            if (response.ok) {
                return response.json()
                    .then(function (data) {
                        console.log(data)
                    })
            }
        })
}

// test(mealDBIngList)
// test(mealDBCatList)
// test(mealDBIng + 'chicken')