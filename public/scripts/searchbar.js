
const fatAPI = new (require('fatsecret'))('9bb1a96ff4e541079791cb0180c7543c', 'aed331e5d62f4a08b2c30cb10ba67dc7');
 

document.addEventListener('DOMContentLoaded', function() {



    const search = document.getElementById('foodinput');
    const matchList = document.getElementById('match-list');




    //search api for food and filter it
    const searchFood = async searchText => {

        
        fatAPI
        .method('foods.search', {
          search_expression: search.value,
          max_results: 10
        })
        .then(function(results) {
          console.log(results);
          foodlist = foods.filter(food => {return food});     

          if(searchText.length === 0){
            foodlist = [];
            matchList.innerHTML = '';
          }
        
          outputHTML(foodlist);  


        })
        .catch(err => console.log(err));

    
        

    };



    function outputHTML(matches){

        if(matches.length > 0 ){
            var html = matches
            .map(match => `
                <div class="card" >

                    <h4>${match.name} <img src="https://spoonacular.com/cdn/ingredients_100x100/${match.image}"></h4>

                </div>

            `
            ).join('');



            matchList.innerHTML = html 

        }

    };



    search.addEventListener('input', () => searchFood(search.value) );






});




