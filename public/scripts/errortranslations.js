
/*
    Passport local mongoose
    ============================
    MissingPasswordError 'No password was given'
    AttemptTooSoonError 'Account is currently locked. Try again later'
    TooManyAttemptsError 'Account locked due to too many failed login attempts'
    NoSaltValueStoredError 'Authentication not possible. No salt value stored'
    IncorrectPasswordError 'Password or username are incorrect'
    IncorrectUsernameError 'Password or username are incorrect'
    MissingUsernameError 'No username was given'
    UserExistsError 'A user with the given username is already registered'


    custom (email)
    ===============================
    Email is taken.

*/
function translate(error) {

    console.log("test = " + error);

    var emailInput = document.getElementById('email');
    var usernameInput = document.getElementById('username');
    var passwordInput = document.getElementById('password')

    var erroremail = document.getElementById("erroremail");
    var errorusername = document.getElementById("errorusername");
    var errorpassword = document.getElementById("errorpassword")

    //email
    if (error == "Email is taken.") {
        emailInput.className = "input is-danger";
        erroremail.innerHTML = "Email is taken.";
    }


    //username
    if (error == "MissingUsernameError: No username was given") {
        usernameInput.className = "input is-danger";
        errorusername.innerHTML = "No username was given.";
    }
    if (error == "UserExistsError: A user with the given username is already registered") {
        usernameInput.className = "input is-danger";
        errorusername.innerHTML = "Username is already registered."
    }

}