const username = localStorage.getItem("username");
const password = localStorage.getItem("password");

// Chequeamos si estamos logueados en la pagina
function LoggedIn(){
    let varLoggedIn = false;
    if ((username !== null && password !== null) &&
        (username !== undefined && password !== undefined) &&
        (username !== "" && password !== "")){
        
        varLoggedIn = true;
        
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

LoggedIn();

// la idea era que...
// Si NO estamos localizados en la pagina de log in, guardabamos el previousURL
// asi cuando ya estuvieras logueado y llegas por alguna razon al login page, te autoredirige a esa pag


// Login.html
if (window.location.href.includes("login")){
    document.addEventListener("DOMContentLoaded", () => {
        if (LoggedIn() && window.location.href.includes("login")){
            window.location.href="index.html";
        }
        
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

