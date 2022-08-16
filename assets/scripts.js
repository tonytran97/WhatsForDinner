

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
}

// builds mealDB request, x variable is value of select drop down. y is the the value of input field. If y is blank, will call random meal.
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

// builds cocktailDB request, x variable is value of select drop down. y is the the value of input field. If y is blank, will call random drink.
function buildDrinkReq(x, y) {
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
    recentSearchArr.push(e);
    while (recentSearchArr.length > 5) {
        recentSearchArr.shift()
    };
    localStorage.setItem('searches', JSON.stringify(recentSearchArr))
}
