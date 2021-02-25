//code not in use yet
const fetch = require("node-fetch");

//Function to get a list of foods from the api not done.
function getfoodlist(){

    api_key = "KwHhE5dKuWDqzdoKbZrMyAObKOtifdfLHr0i4gvy"
    dataType = ["Survey (FNDDS)"];
    pagesize = 5;

    const api_url = 
    'https://api.nal.usda.gov/fdc/v1/foods/search?api_key='+ api_key + '&query=' + query + '&dataType=' + dataType + '&pageSize=' + pagesize;
    
    var data = fetch(api_url).then(response => response.json()).then(data => console.log(data.foods[0]));

    var jsonObject = JSON.stringify(data, null, 0);

    jsonObject = JSON.parse(jsonObject);

    return jsonObject['description'];





}

