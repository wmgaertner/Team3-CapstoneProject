
document.addEventListener('DOMContentLoaded', function() {

    const search = document.getElementById('foodinput');
    const matchList = document.getElementById('match-list');



    //search api for food and filter it
    const searchFood = async searchText => {

    const res = await fetch('https://api.spoonacular.com/food/search?apiKey=5e89818d38f44b53b8c1391fd53cbb6d&includeNutrition=true&query='+ search.value);
    const foods = await res.json();

    console.log(foods.searchResults[5].results);

    };



    search.addEventListener('input', () => searchFood(search.value));







});




