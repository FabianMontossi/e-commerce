function getUserId(){
    return 25801;
}

const CART_URL = "js/test.json"; //CART_INFO_URL + getUserId() + EXT_TYPE;
const content = document.getElementById("container");
let subtotalRow = document.getElementById("subtotalRow");
let articles = [];

function baseSubtotal(articlePosition){
    // le cargamos el subtotal por defecto con los valores base
    return parseInt(articles[articlePosition].unitCost) * parseInt(articles[articlePosition].count)
}

function rowSubtotal(articlePosition){
    subtotalValue = parseInt(articles[articlePosition].unitCost) * parseInt(document.getElementById("inptCount" + articlePosition).value)
    console.log(parseInt(articles[articlePosition].unitCost))
    //pendiente lo del currency
    document.getElementById("subtotal" + articlePosition).textContent = subtotalValue;
}

function showCosts(){
    let htmlContent = `
        <p class="headingsCart">Costos</p>

        <div class="rowCosts">
            
            <p </p>
        </div>

        <div class="rowCosts">
            <h6 </h6>
            <p</p>
        </div>

        <div class="rowCosts">
            <h6</h6>
            
        </div>


        <table id="tableCosts">
            <tr class="trCosts">
                <td class="titleCosts">Subtotal <p class="descriptionCosts">Costo unitario del producto por cantidad</p></td>
                <td class="costsValues">x</td>
            </tr>

            <tr class="trCosts">
                <td class="titleCosts">Costo de envío <p class="descriptionCosts">Según el tipo de envío</p></td>
                <td class="costsValues">xx</td>
            </tr>

            <tr class="trCosts">
                <td class="titleCosts">Total a pagar (USD) <p class="descriptionCosts">* USD se toma a $40 UYU</p></td>
                <td>USD xxx</td>
            </tr>

        </table>


        <br>
        <hr>`;

    return htmlContent;
}

function showShipping(){
    let htmlContent = `
        <p class="headingsCart">Tipo de envío</p>
        <div id="radioInputs">
            <div class="rowShipping">
                <input type="radio" class="radioShipping" name="shippingType" value="premium" id="premium">
                <label for="premium" class="labelRadios">Premium - 2 a 5 días (15%)</label>
            </div>
            <div class="rowShipping" style="display: inline;">
                <input type="radio" class="radioShipping" name="shippingType" value="express" id="express">
                <label for="express" class="labelRadios">Express - 5 a 8 días (7%)</label>
            </div>
            <div class="rowShipping">
                <input type="radio" class="radioShipping" name="shippingType" value="standard" id="standard">
                <label for="standard" class="labelRadios">Standard - 12 a 15 días (5%)</label>
            </div>
        </div>
        
        <p class="headingsCart">Dirección de envío</p>
        <label for="street">Street</label>
        <input type="text" class="inputTxtCart" id="street">
        <label for="homeNumber">Número</label>
        <input type="text" class="inputTxtCart" id="homeNumber"><br>
        <label for="betweenStreet">Esquina</label>
        <input type="text" class="inputTxtCart" id="betweenStreet">
        <hr>`;

    return htmlContent;
}

function showProducts(){
    let products = "";
    for (let i = 0; i < articles.length; i++){
        products += ` 
            <tr>
                <td class="tdProducts"><img class="cartProdImg" src="${articles[i].image}"></td>
                <td class="tdProducts"><p>${articles[i].name}</p></td>
                <td class="tdProducts"><p>${articles[i].unitCost}</p></td>
                <td class="tdProducts inputCant"><input id="inptCount${i}" class="inputTxtCart" value="${articles[i].count}" oninput="rowSubtotal(${i})"></td>
                <td id="subtotalRow" class="tdProducts"><div>${articles[i].currency} <p id="subtotal${i}" style="display: inline;">${baseSubtotal(i)}</p></div></td>
            </tr>
        `;
    }
    return products;
}

function showCart(products){
    content.innerHTML += `
        <h2 class="h2Cart">Carrito de Compras</h2>
        <p class="headingsCart">Articulos a comprar</p>
        <table>
            <tr>
                <th class="thProducts"></th>
                <th class="thProducts">Nombre</th>
                <th class="thProducts">Costo</th>
                <th class="thProducts">Cantidad</th>
                <th class="thProducts">Subtotal</th>
            </tr>
            ${showProducts()}
        </table>
        <hr class="hrCart">
        ${showShipping()}
        ${showCosts()}
        `;
}

async function fetchCart(param){

    const response = await fetch(param);

    if (response.ok){
        const responseContents = await response.json();
        articles = responseContents.articles;
        showCart(responseContents);
    } else{
        alert("Unfortunately, there's something wrong :("); // MISMO QUE EN AssignCatId()
    }
}

fetchCart(CART_URL);


// 1) CAMBIAR URL!
// 2) Tomar en cuenta el currency en el subtotal
