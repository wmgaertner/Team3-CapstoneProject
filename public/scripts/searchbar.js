




document.addEventListener('DOMContentLoaded', function () {
  var total = 0;
  
            

  const search = document.getElementById('foodinput');
  const matchList = document.getElementById('match-list');
  const dictionary = document.getElementById('dictionary');
  const hidden = document.getElementById('hiddenInput');

  


  //search api for food and filter it
  const searchFood = async searchText => {


    matchList.style = 'width:' + search.offsetWidth + '; height: 300px; line-height: 3em; overflow:scroll; border: thin #000 solid; padding: 5px;'

    url = 'https://api.nal.usda.gov/fdc/v1/foods/search?api_key=niQ8qRk2FqXYhdvQYRbYHKjtLdWWaH8nbJiSysVw&query=' + search.value;

    var res = await fetch(url);

    var foods = await res.json();




    console.log(foods);

    foodlist = foods.foods.filter(food => { return food });

    if (searchText.length === 0) {
      foodlist = [];
      matchList.style = '';
      matchList.innerHTML = '';
    }

    outputHTML(foodlist);



  };



  function outputHTML(matches) {

    if (matches.length > 0) {

      var html = '';

      matches.map(match => {
        if (match.brandOwner === undefined) {
          html +=
            `
            <div class="card">

              <h4>${match.lowercaseDescription} </h4>
              <h4>${match.foodNutrients[2].value} Carbs</h4>

            </div>

          `
        }
        else {
          html +=
            `
            <div class="card">

              <h4>${match.lowercaseDescription} - ${match.brandOwner} </h4>
              <h4>${match.foodNutrients[2].value} Carbs</h4>

            </div>

          `

        }



      }).join('');


      matchList.innerHTML = html

      list();




    }


  };


  function list() {


    //get the divs inside of the search
    var divs = matchList.getElementsByTagName('div');

    for (i of divs) {

      i.addEventListener('click', function (event) {

        var food = this.getElementsByTagName('h4')[0].innerHTML;
        var carbs = this.getElementsByTagName('h4')[1].innerHTML;

        carbs = parseFloat(carbs.match(/[\d\.]+/))

        total += carbs;

        console.log(total);

        matchList.style = '';
        matchList.innerHTML = '';
        search.value = '';

        dictionary.innerHTML += `<li name="${carbs}">${food}<span class="close">x</span></li>`


        var closebtns = dictionary.getElementsByTagName('li');

        for (i of closebtns) {
          i.addEventListener("click", function () {


            total = (total * 10 - parseFloat(this.getAttribute("name")) * 10) / 10;
            
            this.remove();
          });
        }

        hidden.value = total.toString();

      });

    }


    

  }















  search.addEventListener('input', () => searchFood(search.value));

 


});







