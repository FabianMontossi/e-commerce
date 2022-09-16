const username = localStorage.getItem("username");
const password = localStorage.getItem("password");

// MUY probablemente lo termine eliminando
/*function ifExists(param){
    param.toString();
    console.log(param);
    
    //document.getElementById("login").textContent = username;
}*/


// Chequeamos si estamos logueados en la pagina
function LoggedIn(){
    let varLoggedIn = false;
    if ((username !== null && password !== null) && (username !== "" && password !== "")){
        varLoggedIn = true;
        // Si existen estos elementos...
        if(document.getElementById("login")){
            let loginUser = document.getElementById("login");
            loginUser.textContent = "Welcome, " + username;
            loginUser.style.color = "#0992e8";
            loginUser.href = "#";
        }
        // ofrecer la posibilidad de log out con un dropdown
    }
    return varLoggedIn;
}

// la idea era que...
// Si NO estamos localizados en la pagina de log in, guardabamos el previousURL
// asi cuando ya estuvieras logueado y llegas por alguna razon al login page, te autoredirige a esa pag
let previousURL = "http://127.0.0.1:5500/e-commerce/index.html";
if( !(window.location.href.includes("login")) ){
    /*if (previousURL === "")
        previousURL = "http://127.0.0.1:5500/e-commerce/index.html";*/
    previousURL = window.location.href;
}


if (LoggedIn()){
  if (window.location.href.includes("login.html"))
      window.location.href = previousURL;
}else{
    window.location.href = "login.html";
}


// Login.html
if (window.location.href.includes("login")){
document.addEventListener("DOMContentLoaded", () => {

    function CheckUserPass() {
        let usernameField = document.getElementById("username").value;
        let passwordField = document.getElementById("password").value;
        let errorMsg = document.getElementById("errorMsg");

        if (usernameField.trim() !== "" && passwordField.trim() !== ""){
            localStorage.setItem("username", usernameField);
            localStorage.setItem("password", passwordField);
            
            window.location.href="categories.html";
        }
        else{
            errorMsg.innerHTML = "Username or password field is empty, please insert at least 1 letter in each field";
            errorMsg.style.color = "red";
            // on change del input username OR password errorMsg.innerHTML = "";
        } // si ambos campos estan vacios...
    }

    document.getElementById("loginBtn").addEventListener("click", function(e){
        e.preventDefault();
        CheckUserPass();
    });

});
}