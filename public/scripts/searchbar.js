
/*
    apikey1 = 5e89818d38f44b53b8c1391fd53cbb6d
    apikey2 = 8c0c7132fb5a4a12901cc6ba13001aaf
    apikey3 = ea7131e9dae646cbad57896b902321f9


*/


document.addEventListener('DOMContentLoaded', function() {

    const search = document.getElementById('foodinput');
    const matchList = document.getElementById('match-list');



    //search api for food and filter it
    const searchFood = async searchText => {
        
    
        const res1 = await fetch('https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=ea7131e9dae646cbad57896b902321f9&includeNutrition=true&metaInformation=true&number=3&query='+ search.value);
        const res2 = await fetch('https://api.spoonacular.com/food/products/search?apiKey=ea7131e9dae646cbad57896b902321f9&includeNutrition=true&number=3&query='+ search.value);
        
        var ingredients = await res1.json();
        var products = await res2.json();
        
        
        

        ingredients = ingredients.filter(food => {return food});
        products = products.products.filter(food => {return food});


        if(searchText.length === 0){
            ingredients = [];
            products = [];
            matchList.innerHTML = '';
        }
        
        outputHTML(ingredients,products);


    };



    function outputHTML(ingredients,products){

        if(ingredients.length > 0 && products.length > 0){
            var html1 = ingredients
            .map(match => `
                <div class="card" >
                    <h4>${match.name} <img src="https://spoonacular.com/cdn/ingredients_100x100/${match.image}"></h4>
                </div>

            `
            ).join('');


            
            var html2 = products
            .map(match => `
                <div class="card" >
                    <h4>${match.title} <img src="${match.image}"></h4>
                </div>
    
            `
            ).join('');
    
            

            matchList.innerHTML = html1 + html2;

        }

    };



    var searchTimeout;
    search.onkeypress = function () {
        if (searchTimeout != undefined) clearTimeout(searchTimeout);
        searchTimeout = setTimeout(searchFood(search.value), 1000);

        if(search.value.length === 0){
            ingredients = [];
            products = [];
            matchList.innerHTML = '';
        }
        
    };     






});




