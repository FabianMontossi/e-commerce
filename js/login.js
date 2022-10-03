const username = localStorage.getItem("username");
const password = localStorage.getItem("password");

// Chequeamos si estamos logueados en la pagina
function LoggedIn(){
    let varLoggedIn = false;

    if ((username !== null && password !== null) &&
        (username !== undefined && password !== undefined) &&
        (username.trim() !== "" && password.trim() !== "")){

        varLoggedIn = true;
        
        addDropdownAndUsername();
    } else {
        Logout();
    }
    return varLoggedIn;
}

LoggedIn();

function Logout(){
    localStorage.setItem("username", "");
    localStorage.setItem("password", "");

    if (!window.location.href.includes("login")){
        window.location.href="login.html";
    }
}


function addDropdownAndUsername(){
    const usernameDropdown = document.getElementById("usernameDropdown");

    if(document.getElementById("usernameDropdown")){
        //usernameDropdown.textContent = "Welcome, " + username;
        usernameDropdown.style.color = "#0992e8";
        usernameDropdown.href = "#";
    }
    // ofrecer la posibilidad de log out con un dropdown

    usernameDropdown.innerHTML = `<p class>Welcome, </p><div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="usernameDropdown" data-bs-toggle="dropdown" aria-expanded="false">${username}
        </button>
        
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
            <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
            <li><a class="dropdown-item" href="#" onclick="Logout();">Cerrar sesión</a></li>
        </ul>
    </div>`;
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
        
        if (LoggedIn() && window.location.href.includes("login")){
            window.location.href="index.html";
        }

        document.getElementById("loginBtn").addEventListener("click", function(e){
            e.preventDefault();
            CheckUserPass();
        });
    });
}
