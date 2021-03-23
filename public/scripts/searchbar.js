
document.addEventListener('DOMContentLoaded', function() {

    const search = document.getElementById('foodinput');
    const matchList = document.getElementById('match-list');



    //search api for food and filter it
    const searchFood = async searchText => {
        
    
        const res1 = await fetch('https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=5e89818d38f44b53b8c1391fd53cbb6d&includeNutrition=true&metaInformation=true&number=4&query='+ search.value);
        const res2 = await fetch('https://api.spoonacular.com/food/menuItems/search?apiKey=5e89818d38f44b53b8c1391fd53cbb6d&includeNutrition=true&number=4&query='+ search.value);
        
        var ingredients = await res1.json();
        var menuItems = await res2.json();

        menuItems.menuItems = menuItems.menuItems.map(function(obj) { 
            obj['name'] = obj['title']; // Assign new key 
            delete obj['title']; // Delete old key 
            return obj; 
        }); 
        

        var foodlist = ingredients.concat(menuItems.menuItems);
        
        console.log(foodlist);
       

        var matches = foodlist.filter(food =>{

            return food;

        }); 

        if(searchText.length === 0){
            matches = [];
            matchList.innerHTML = '';
        }
        
        outputHtml(matches);

    };



    const outputHtml = matches =>{

        if(matches.length > 0){
            const html = matches
            .map(match => `
                <div class="card" >
                    <h4>${match.name} <img src="https://spoonacular.com/cdn/ingredients_100x100/${match.image}"></h4>
                </div>

            `
            ).join('');

            matchList.innerHTML = html;
        }

    };



    search.addEventListener('input', () => searchFood(search.value) ); 
    







});




