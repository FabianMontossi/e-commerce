const saveData = document.getElementById("saveBtn");

const firstName = document.getElementById("firstName");
const firstLastname = document.getElementById("firstLastname");
const email = document.getElementById("email");

// we load all the localStorage data
email.value = username;
firstName.value = localStorage.getItem("firstName");;
firstLastname.value = localStorage.getItem("firstLastname");

saveData.addEventListener("click", function(){
    if (firstName) localStorage.setItem("firstName", firstName.value);
    if (firstLastname) localStorage.setItem("firstLastname", firstLastname.value);
});