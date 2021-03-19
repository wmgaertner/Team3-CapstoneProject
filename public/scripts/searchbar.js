
document.addEventListener('DOMContentLoaded', function() {

    const search = document.getElementById('foodinput');
    const matchList = document.getElementById('match-list');



    //search api for food and filter it
    const searchFood = async searchText => {

    const res = await fetch("http://localhost:3000/search");
    
    console.log(res);

    };



    search.addEventListener('input', () => searchFood(search.value));







});




