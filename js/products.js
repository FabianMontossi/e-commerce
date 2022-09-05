const DATA_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";
const container = document.getElementById("productsContainer");

function arrayProducs(array){
    for (item of array)
        container.innerHTML += `<div class="row">
        <div class="col-3">
            <img src="${item.image}" class="img-thumbnail">
        </div>
        <div class="col">
            <div class="d-flex w-100 justify-content-between">
                <h4 class="mb-1">${item.name} - USD${item.cost}</h4>
                <small class="text-muted">${item.soldCount}</small>
            </div>
            <p class="mb-1">${item.description}</p>
        </div>
    </div>`

}

async function fetchProducts(param){

    let response = await fetch(param);
    
    if (response.ok){
        let responseContents = await response.json();
        arrayProducs(responseContents.products);
    } else{
      alert("HTTP Error: " + response.code, response.status);
    }
  }

// llamamos a la funcion fetchProducts
  fetchProducts(DATA_URL);