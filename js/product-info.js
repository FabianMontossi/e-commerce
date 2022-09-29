function AssignCatID(){
    if(localStorage.getItem("catID") !== null){
        return localStorage.getItem("catID");
    }
    else{
        // Si no hay ninguno, o no existe.
        // Mostrar un cartel como el de Funcionalidad en desarrollo.
    }
}

function assignProdId(){
    if(localStorage.getItem("productId") !== null){
        return localStorage.getItem("productId");
    }
    else{
        // Si no hay ninguno, o no existe.
        // Mostrar un cartel como el de Funcionalidad en desarrollo.
    }
}

//////////////      PROBAR LOGIN Y REGISTRO      /////////////

const productId = localStorage.getItem("productId");
const PRODUCT_INFO = "https://japceibal.github.io/emercado-api/products/" + assignProdId() + EXT_TYPE;
const recommendedProducts = [];
let productToShow = "";
let productImages = [];

function imagesToShow(images){
    console.log("MM", images);
    for (let i = 0; i < images.length; i++){
        console.log("mg/", productImages[i], window.location.href + /../ + productImages[i]);
        
        const content = `
          <div id="images">
              <div class"img-box">
                  <img src="${window.location.href + /../ + productImages[i]}">
              </div>
          </div>`;
    }
}
//////////////      PROBAR LOGIN Y REGISTRO      /////////////

function addProduct(product, recommendedProds){
    document.body.innerHTML += `
    <div class="product-info">
        <h2>${product.name}</h2>
        <hr>
        <strong class="title">Precio</strong>
        <p class="value"><strong>${product.currency} </strong>${product.cost}</p>
        <strong class="title">Descripción</strong>
        <p class="value">${product.description}</p>
        <strong class="title">Categoría</strong>
        <p class="value">${product.category}</p>
        <strong class="title">Cantidad vendida</strong>
        <p class="value">${product.soldCount}</p>

        <strong class="title">Imágenes Ilustrativas</strong>
        ${imagesToShow(productImages)}
    </div>`;
}

function relatedProducts(products){
    for(let item of products){
        recommendedProducts.push(item);
    }
    return recommendedProducts;
}

async function fetchProducts(url){
    
    const response = await fetch(url);

    if (response.status === 200){
        const responseContent = await response.json();

        productImages = responseContent.images;
        console.log("img", productImages);
        relatedProducts(responseContent.relatedProducts);
        addProduct(responseContent);
    } else {
        alert("Unfortunately, there's something wrong :(");
    }
}

if (localStorage.getItem("productId")) fetchProducts(PRODUCT_INFO);

console.log("productToShow", productToShow, "recommendedProducts", recommendedProducts);


//////////////      PROBAR LOGIN Y REGISTRO      /////////////

