

// API URLs
const mealDBIngList = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list' // MealDB ingredient list
const mealDBCatList = 'http://www.themealdb.com/api/json/v1/1/list.php?c=list' // MealDB category list
const cocktailRedirect = 'https://www.thecocktaildb.com/drink/' //Requires code and name from returned data seperated by dashes e.g. https://www.thecocktaildb.com/drink/11000-Mojito-Cocktail

const mealDBIng = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=' // Need to add ingredient after 'i='
const mealDBCat = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=' // Need to add category after 'c='
const mealDBRand = 'https://www.themealdb.com/api/json/v1/1/random.php' // Works as is

const cocktailDBIng = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' // Need to add ingredient after 'i='
const cocktailDBAlc = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=' // Need to add either 'Alcoholic' or 'Non_alcoholic' after 'a='
const cocktailDBRand = 'https://www.thecocktaildb.com/api/json/v1/1/random.php' // Works as is

const imgPreview = '/preview' // Add to end of the thumbnail image included in JSON to get image to display. Shows as either 'strMealThumb' or 'strDrinkThumb' in data packet.

const chuckNorris = 'https://api.chucknorris.io/jokes/random' //Works as is
const mealBtn1 = document.getElementById('mealBtn1');
const mealBtn2 = document.getElementById('mealBtn2');
const mealBtn3 = document.getElementById('mealBtn3');

const drinkBtn1 = document.getElementById('drinkBtn1');
const drinkBtn2 = document.getElementById('drinkBtn2');
const drinkBtn3 = document.getElementById('drinkBtn3');

const mealInput = document.getElementById('mealInput');
const drinkInput = document.getElementById('drinkInput');


function fetchStuff(request) {
    fetch(request)
        .then(function(response) {
            if (response.ok) {
                return response.json()
                    .then(function(data) {
                        console.log(data)
                        if (data.meals === null) {
                            alert('null')
                        }
                    })
            }
            else {
                alert(`Error: ${response.statusText}`)
            }
        })
        .catch(function(error) {
            alert(`Unable to retireve requested data`)
        })
        if (data.meals === null) {
            alert('null')
        }
}

function buildMealIngReq(a) {
    let mealUrl = `${mealDBIng}${a}`
    fetchStuff(mealUrl)
};

function buildMealCatReq(b) {
    let mealUrl = `${mealDBCat}${b}`
    fetchStuff(mealUrl)
};

function buildDrinkIngReq(c) {
    let drinkUrl = `${cocktailDBIng}${c}`
    fetchStuff(drinkUrl)
};

function buildDrinkAlcReq(d) {
    let drinkUrl = `${cocktailDBAlc}${d}`
    fetchStuff(drinkUrl)
};




mealBtn1.addEventListener('click', function(ev) {
    ev.preventDefault();
    buildMealIngReq(mealInput.value);
})
mealBtn2.addEventListener('click', function(ev) {
    ev.preventDefault();
    buildMealCatReq(mealInput.value);
})
mealBtn3.addEventListener('click', function(ev){
    ev.preventDefault();
    fetchStuff(mealDBRand);
})

drinkBtn1.addEventListener('click', function(ev) {
    ev.preventDefault();
    buildDrinkIngReq(drinkInput.value);
})
drinkBtn2.addEventListener('click', function(ev) {
    ev.preventDefault();
    buildDrinkAlcReq(drinkInput.value);
})
drinkBtn3.addEventListener('click', function(ev){
    ev.preventDefault();
    fetchStuff(cocktailDBRand);
})