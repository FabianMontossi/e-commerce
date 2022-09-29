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
const productId = localStorage.getItem("productId");
const recommendedProducts = [];
let productToShow = "";
let categoryName;


function addProduct(product, recommendedProds){
    document.body += `
    <div class="product-info">
        <h1>${item.name}</h1>
        <hr>
        <strong class="title">Precio</strong>
        <p class="value"><strong>${product.currency}</strong>${product.cost}</p>
        <strong class="title">Descripción</strong>
        <p class="value">${product.description}</p>
        <strong class="title">Categoría</strong>
        <p class="value">${catName}</p>
        <strong class="title">Cantidad vendida</strong>
        <p class="value">${product.soldCount}</p>

        <strong class="title">Imágenes Ilustrativas</strong>
        ${() =>{
          for(const img of images){

          }
        }}
    </div>`;

}



function getProductsFiltered(products, id){
    for(let item of products){
        item.id.toString() === id ? productToShow = item : recommendedProducts.push(item);
    }
    console.log("ASDD", productToShow);
    return productToShow, categoryName, recommendedProducts; // !!!!
}

async function fetchProducts(url){
    
    const response = await fetch(url);

    if (response.status === 200){
        const responseContent = await response.json();
        getProductsFiltered(responseContent.products, productId);
    } else {
        alert("Unfortunately, there's something wrong :(");
    }
}

fetchProducts(DATA_URL);

console.log("productToShow", productToShow, "recommendedProducts", recommendedProducts);
