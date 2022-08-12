

// API URLs
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
                    })
            }
            else {
                alert(`Error: ${response.statusText}`)
            }
        })
        .catch(function(error) {
            alert(`Unable to retireve requested data`)
        })
        
}

function buildMealReq(a) {
    let mealUrl = `${mealDBIng}${a}`
    fetchStuff(mealUrl)
}





mealBtn1.addEventListener('click', function(ev) {
    ev.preventDefault()
    buildMealReq(mealInput.value)
})
mealBtn2.addEventListener('click', function(){})
mealBtn3.addEventListener('click', function(){})

drinkBtn1.addEventListener('click', function(){})
drinkBtn2.addEventListener('click', function(){})
drinkBtn3.addEventListener('click', function(){})