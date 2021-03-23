
/*
    apikey1 = 5e89818d38f44b53b8c1391fd53cbb6d
    apikey2 = 8c0c7132fb5a4a12901cc6ba13001aaf


*/


document.addEventListener('DOMContentLoaded', function() {

    const search = document.getElementById('foodinput');
    const matchList = document.getElementById('match-list');



    //search api for food and filter it
    const searchFood = async searchText => {
        
    
        const res1 = await fetch('https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=5e89818d38f44b53b8c1391fd53cbb6d&includeNutrition=true&metaInformation=true&number=3&query='+ search.value);
        const res2 = await fetch('https://api.spoonacular.com/food/products/search?apiKey=8c0c7132fb5a4a12901cc6ba13001aaf&includeNutrition=true&number=3&query='+ search.value);
        
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


    


    search.addEventListener('input', () => searchFood(search.value) ); 
    







});




