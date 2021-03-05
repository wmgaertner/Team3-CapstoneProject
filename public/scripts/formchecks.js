// Function applied on form to prevent a POST if input is invalid
function dashboard() {
    var inputText = document.getElementById('glucoseInput');
    if (inputText.value.length == 0){
        event.preventDefault();
        alert("Please enter a value");
    }
    else if (isNaN(inputText.value)) {
        event.preventDefault();
        alert("Please enter a number")
    }
    else if (inputText.value < 0) {
        event.preventDefault();
        alert("Number must be a postive number");
    }
}

function registration(error){

    var firstnameInput = document.getElementById('firstname');
    var lastnameInput = document.getElementById('lastname');
    var emailInput = document.getElementById('email');
    var usernameInput = document.getElementById('username');
    var passwordInput = document.getElementById('password')

    var errorfirstname = document.getElementById("errorfirstname");
    var errorlastname = document.getElementById("errorlastname");
    var erroremail = document.getElementById("erroremail");
    var errorusername = document.getElementById("errorusername");
    var errorpassword = document.getElementById("errorpassword")

    

    if (firstnameInput.value.length == 0 ){
        event.preventDefault();
        firstnameInput.className = "input is-danger";
        errorfirstname.innerHTML = "Enter first name.";
    }
    else {
        firstnameInput.className = "input";
        errorfirstname.innerHTML = '';

    }

    

    if (lastnameInput.value.length == 0 ){
        event.preventDefault();
        lastnameInput.className = "input is-danger";
        errorlastname.innerHTML = "Enter last name.";
        
    }
    else {
        lastnameInput.className = "input";
        errorlastname.innerHTML = '';

    }


    //email
    emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (emailInput.value.length == 0 ){
        event.preventDefault();
        emailInput.className = "input is-danger";
        erroremail.innerHTML = "Enter an email address.";  
    }
    else if(!emailInput.value.match(emailregex)){
        event.preventDefault();
        emailInput.className = "input is-danger";
        errorlastname.innerHTML = "Invalid email.";
    }
    else{
        emailInput.className = "input";
        erroremail.innerHTML = '';
    }


    //username 
    if (usernameInput.value.length == 0 ){
        event.preventDefault();
        usernameInput.className = "input is-danger";
        errorusername.innerHTML = "Enter a username.";
    }
    
    else{
        usernameInput.className = "input";
        errorusername.innerHTML = '';
    }

    
    //password
    if(passwordInput.value.length == 0){
        event.preventDefault();
        passwordInput.className = "input is-danger";
        errorpassword.innerHTML = "Enter a password."
    }
    else{
        passwordInput.className = "input";
        errorpassword.innerHTML = '';
    }







}