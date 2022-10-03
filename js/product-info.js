function assignProdId(){
    if (localStorage.getItem("productId") !== null && localStorage.getItem("productId") !== ""){
        return localStorage.getItem("productId");
    } else{
        // Si no hay ninguno, o no existe.
        // Mostrar un cartel como el de Funcionalidad en desarrollo.
    }
}

const productId = localStorage.getItem("productId");
const PRODUCT_INFO = "https://japceibal.github.io/emercado-api/products/" + assignProdId() + EXT_TYPE;
const PRODUCT_COMMENTS = PRODUCT_INFO_COMMENTS_URL + assignProdId() + EXT_TYPE;
const recommendedProducts = [];
let productToShow = "";
let productImages = [];
let commentaries = [];
let relatedProductsImages = [];

function changeProductId(productId){
    localStorage.setItem('productId', productId);
    window.location.reload();
    //window.location.href = "product-info.html";
}

function relatedProducts(imagesArray){
    let relatedProductsHtml = `<div class="imgContainer relatedProducts">`;
    
    for (let i = 0; i < imagesArray.length; i++){
        relatedProductsHtml += `
        <div id="prodImgAndName">
            <img class="productImg" src="${imagesArray[i].image}" alt="${imagesArray[i].name}"
            onclick="changeProductId(${imagesArray[i].id.toString()})" >
            <p class="relatedProductName" style="text-align: center;">${imagesArray[i].name}</p>
        </div>`;
    }
    return relatedProductsHtml += `</div>`;
}

function showCommentaries(commentariesArray, prodId){
    let commentsHtml = "";
    if (commentariesArray.length !== 0){
        for (const comment of commentariesArray){

            if (comment.product == prodId){
                commentsHtml += `
                <div class="commentary">
                    <p><strong>${comment.user}</strong> - ${addStarsToCommentary(comment.score)}</p>
                    <p>${comment.description}</p>
                    <p style="font-size: 0.8em; font-style: italic;">Commented on ${comment.dateTime}</p>
                </div>`;
            }
        }
    }else{
        commentsHtml = `<div class="commentary">No hay comentarios para este producto. Sé el primero en comentar!</div>`;
    }
    
    return commentsHtml + `<hr>`;
}

function imagesToShow(imagesArray){
    let content = `<div class="imgContainer">`;
    
    for (let i = 0; i < imagesArray.length; i++){
        content += `<img class="productImg" src="${imagesArray[i]}" alt="Image ${i + 1}">`; 
    }
    return (content += `</div>`);
}

function addCommentary(){
    
    if(LoggedIn()){
        let commentary = "";
        //if (!checkIfAlreadyCommented());
        //else {esto de abajo}
        
        commentary += `
        <div id="addCommentary">
            <form>
                <p><label for="commentaryTxt">Agrega un comentario sobre este producto</label></p>
                
                <textarea id="commentaryTxt" name="commentaryTxt" rows="5" cols="50" placeholder="Me encantó, 5 estrellas!"></textarea>
                <br>
                <input type="submit" id="submitCommentary" value="Submit">
            </form>
        </div>`;
        return commentary;
    }
}

function addStarsToCommentary(score){
    let scoreHtml = "";

    for (let i = 0; i < 5; i++){
        scoreHtml += `<span class="fa fa-star`; 
        
        if (i < Math.round(score)){
            scoreHtml += `" style="color: orange;">`;
        }
        else if (i => Math.round(score)){
            scoreHtml += `" style="color: black;">`;
        }
    }
    return scoreHtml;
}

function showProduct(product){
    document.getElementById("main-content").innerHTML += `
    <div id="productInfo">
        <h2>${product.name}</h2>
        <hr>
        <strong class="title">Precio</strong>
        <p class="value"><strong style="font-size: 0.80em;">${product.currency}</strong> ${product.cost}</p>
        <strong class="title">Descripción</strong>
        <p class="value">${product.description}</p>
        <strong class="title">Categoría</strong>
        <p class="value">${product.category}</p>
        <strong class="title">Cantidad vendida</strong>
        <p class="value">${product.soldCount}</p>

        <strong class="title">Imágenes Ilustrativas</strong>
        ${imagesToShow(productImages)}
        
        <hr>
        <h6>Producto(s) Relacionado(s):</h6>
        ${relatedProducts(relatedProductsImages)}
        <hr>
        <h5>Comentario(s):</h5>

        <div id="commentaries">
            ${showCommentaries(commentaries, productId)}
        </div>
        ${addCommentary()}
    </div>`;
}


async function fetchCommentaries(url){
    const response = await fetch(url);

    if (response.status === 200){
        const responseContent = await response.json();
        commentaries = responseContent;
        fetchProduct(PRODUCT_INFO);
    } else {
        alert("Unfortunately, there was something wrong while fetching the data :(");
    }
}

async function fetchProduct(url){
    const response = await fetch(url);

    if (response.status === 200){        
        const responseContent = await response.json();
        
        productImages = responseContent.images;
        relatedProductsImages = responseContent.relatedProducts;
        showProduct(responseContent);
        
    } else {
        alert("Unfortunately, there was something wrong while fetching the data :(");
        // Mostrar un cartel como el de Funcionalidad en desarrollo.
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("productId") && localStorage.getItem("productId") !== ""){
        fetchCommentaries(PRODUCT_COMMENTS);
    }
    else {
        // Mostrar un cartel como el de Funcionalidad en desarrollo.
    }
});

