function AssignCatID(){
    if(localStorage.getItem("catID") !== null){
        return localStorage.getItem("catID");
    }
    else{
        // Si no hay ninguno, o no existe.
        // Mostrar un cartel como el de Funcionalidad en desarrollo.
    }
}

const DATA_URL = "https://japceibal.github.io/emercado-api/cats_products/" + AssignCatID() + ".json";
const container = document.getElementById("productsContainer");


function ChangeProdTitles(catName) {
    document.querySelector(".lead").innerHTML = `Verás aquí todos los ${catName} del sitio`;
    document.getElementById("title-h2").innerHTML = catName;
}

function addProduct(){
    container.innerHTML += 
    `<div class="list-group-item list-group-item-action cursor-active">
        <div class="row">
            <div class="col-3">
                <img src="${item.image}" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">${item.name} - USD${item.cost}</h4>
                    <small class="text-muted">${item.soldCount} vendidos</small>
                </div>
                <p class="mb-1">${item.description}</p>
            </div>
        </div>
    </div>`
}

let arrItems = [];
let maxCost = 0;

function showProducts(array){
    for (item of array){
        // Pusheamos esto al array arrItems, asi luego podemos filtrar los productos
        arrItems.push(item);

        if (parseInt(item.cost) > parseInt(maxCost)){
            maxCost = item.cost;
            console.log(maxCost);
        }
        
        container.innerHTML += 
            `<div class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${item.image}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${item.name} - USD${item.cost}</h4>
                            <small class="text-muted">${item.soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${item.description}</p>
                    </div>
                </div>
            </div>`
    }
}

async function fetchProducts(param){

    let response = await fetch(param);
    
    if (response.ok){
        let responseContents = await response.json();
        ChangeProdTitles(responseContents.catName);
        showProducts(responseContents.products);
    } else{
        alert("HTTP Error: " + response.code, response.status);
    }
}



function returnMin(){
    let minPriceField = document.getElementById("rangeFilterPriceMin").value;
    let minPrice = 0;
    console.log("minPrice", minPrice);
    
    // si está vacio devolvemos 0, si está vacio devolvemos el valor escrito
    if (!(minPriceField === "" || minPriceField === null || minPriceField === undefined))
        minPrice = minPriceField;

        console.log("minPrice SEGUNDO", minPrice);
    return parseInt(minPrice);
}

function returnMax(mostExpensiveItem){
    let maxPriceField = document.getElementById("rangeFilterPriceMax").value;
    let maxPrice = mostExpensiveItem;
    
    // Recorrerlo el array antes de llamar a esta funcion para ver cual es el min y el max
    // si está vacio devolvemos el valor del item mas caro, si está vacio devolvemos el valor escrito
    if (!(maxPriceField === "" || maxPriceField === null || maxPriceField === undefined))
        maxPrice = maxPriceField;

    console.log("max", maxPrice, "maxPriceField", maxPriceField);
    return parseInt(maxPrice);
}


/*
function filterProducts(product){

    // Si el MIN ingresado es => al costo && el MAX ingresado es menor al costo, then...
    
    if ((returnMin() >= product.cost) && (returnMax(maxCost) <= product.cost)){
        
    }
    return (product);
}
*/


// llamamos a la funcion fetchProducts
fetchProducts(DATA_URL);

document.getElementById("rangeFilterPrice").addEventListener("click", function(){
    //console.log("asd", maxCost);
    container.innerHTML = "";
    showProducts(arrItems.filter(function(product){
        //console.log("HERE",  parseInt(product.cost), product.cost.toString());
        // Si el MIN ingresado es => al costo && el MAX ingresado es menor al costo, then...
        console.log((returnMin() >= parseInt(product.cost)));
        //if ((parseInt(product.cost) >= returnMin()) && ((product.cost) <= returnMax(maxCost))){
            if ((product.cost >= returnMin()) && ((product.cost <= 13600))){
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            return (product);
            //console.log("minPrice", returnMin(), "max", returnMax(), "product.cost", product.cost);

            
        }
        
    }));

});


// filtrar solo si uno de los dos (min o max) tienen algo !== a "" o null
// IF ITEM.price >= minimo, y ITEM.price <= maximo
// onClear, volve a mostrar todo lo que mostrabas antes
