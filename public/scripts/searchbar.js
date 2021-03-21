
document.addEventListener('DOMContentLoaded', function() {

    const search = document.getElementById('foodinput');
    const matchList = document.getElementById('match-list');



    //search api for food and filter it
    const searchFood = async searchText => {

        const res = await fetch('https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=5e89818d38f44b53b8c1391fd53cbb6d&includeNutrition=true&metaInformation=true&query='+ search.value);
        const foods = await res.json();
        
        var matches = foods.filter(food =>{

            const regex = new RegExp(`^${searchText}`,'gi');
            return food.name.match(regex);

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
                <div>
                    <h4>${match.name} <img src="https://spoonacular.com/cdn/ingredients_100x100/${match.image}"></h4>
                </div>

            `
             )
             .join('');

            matchList.innerHTML = html;
        }
    };



    search.addEventListener('input', () => searchFood(search.value));







});




