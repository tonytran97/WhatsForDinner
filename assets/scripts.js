

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
                        document.getElementById("joke").innerHTML = data.value;
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
    if (data.meals === null) {
        alert('null')
    }
}

function buildMealReq(x, y) {
    console.log(x, y)
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

function buildDrinkReq(x, y, z) {
    console.log(x, y)
    
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

mealBtn.addEventListener('click', function(ev) {
    ev.preventDefault();
    buildMealReq(mealCat.value, mealInput.value);
    
})

drinkBtn.addEventListener('click', function(ev) {
    ev.preventDefault();
    buildDrinkReq(drinkCat.value, drinkInput.value);
})

joke.addEventListener("click", function (ev) {
    ev.preventDefault();
    fetchStuff(chuckNorris);
})