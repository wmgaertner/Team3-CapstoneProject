


document.addEventListener('DOMContentLoaded', function() {

    const search = document.getElementById('foodinput');
    const matchList = document.getElementById('match-list');



    //search api for food and filter it
    const searchFood = async searchText => {

    const res = await fetch("https://platform.fatsecret.com/js?key=9bb1a96ff4e541079791cb0180c7543c");
    const food = await res.json();

    console.log(food);

    };



    search.addEventListener('input', () => searchFood(search.value));

});




