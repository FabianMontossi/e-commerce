function AssignCatID(){
    if(localStorage.getItem("catID") !== null){
        return localStorage.getItem("catID");
    }
    else{
        // Si no hay ninguno, o no existe.
        // Mostrar un cartel como el de Funcionalidad en desarrollo.
    }
}

const DATA_URL = PRODUCTS_URL + AssignCatID() + EXT_TYPE;
const container = document.getElementById("productsContainer");
const sortBySoldAmount = document.getElementById("sortBySoldAmount");
const sortAsc = document.getElementById("sortAsc");
const sortDesc = document.getElementById("sortDesc");

function ChangeProdTitles(catName) {
    if (catName !== "Deporte"){
        document.querySelector(".lead").innerHTML = `Verás aquí todos los ${catName} del sitio`;
        document.getElementById("title-h2").innerHTML = catName;
    }else{
        document.querySelector(".lead").innerHTML = `Verás aquí todos los productos de ${catName} del sitio`;
        document.getElementById("title-h2").innerHTML = `Productos de ${catName}`;
    }
}

function showProductInfo(productId){
    localStorage.setItem('productId', productId);
    window.location.href = "product-info.html";
}

function addProduct(){
    container.innerHTML += 
    `<div class="list-group-item list-group-item-action cursor-active">
        <div class="row" onclick="showProductInfo(${item.id});">
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
    </div>`;
}

const arrItems = [];
let maxCost = 0;

function showProducts(array, addToArray){
    for (item of array){
        
        // Pusheamos cada producto al array arrItems, solo al hacer el fetch
        if (addToArray){
            arrItems.push(item);
        }

        if (parseInt(item.cost) > parseInt(maxCost)){
            maxCost = item.cost;
        }
        addProduct();
    }
}

async function fetchProducts(param){

    const response = await fetch(param);
    console.log(response);    
    if (response.ok){
        const responseContents = await response.json();
        ChangeProdTitles(responseContents.catName);
        showProducts(responseContents.products, true);
    } else{
        alert("Unfortunately, there's something wrong :("); //  !!!!!!!!!!! MISMO QUE EN AssignCatId()
    }
}

function minPrice(){
    const minPriceField = document.getElementById("rangeFilterPriceMin").value;
    let minPrice = 0;
    
    // si está vacio devolvemos 0, si está vacio devolvemos el valor escrito
    if (!(minPriceField === "" || minPriceField === null || minPriceField === undefined)){
        minPrice = minPriceField;
    }

    return parseInt(minPrice);
}

function maxPrice(mostExpensiveItem){
    const maxPriceField = document.getElementById("rangeFilterPriceMax").value;
    
    // Recorrerlo el array antes de llamar a esta funcion para ver cual es el min y el max
    // si está vacio devolvemos el valor del item mas caro, SI NO, devolvemos el valor escrito
    if (!(maxPriceField === "" || maxPriceField === null || maxPriceField === undefined)){
        return maxPriceField;
    }

    return parseInt(mostExpensiveItem);
}

function filterProducts(){
    container.innerHTML = "";
    const filteredProds = arrItems.filter(function(product){
        // Si el MIN ingresado es => al costo && el MAX ingresado es menor al costo
        if ((product.cost >= minPrice()) && (product.cost <= maxPrice(maxCost))){
            return product;
        }
    });
    
    showProducts(filteredProds, false);

    return filteredProds;
}

fetchProducts(DATA_URL);

document.getElementById("rangeFilterPrice").addEventListener("click", function(){
    filterProducts(false);
});

document.getElementById("clearRangeFilter").addEventListener("click", function(){
    document.getElementById("rangeFilterPriceMin").value = "";
    document.getElementById("rangeFilterPriceMax").value = "";
    filterProducts(false);
});

sortBySoldAmount.addEventListener("click", function(){
    filterProducts();
});

//points.sort(function(a, b){return a - b});