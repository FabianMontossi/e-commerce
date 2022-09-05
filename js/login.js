
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
