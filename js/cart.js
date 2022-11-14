function getUserId(){
    return 25801;
}

const CART_URL = CART_INFO_URL + getUserId() + EXT_TYPE;
const content = document.getElementById("container");
let subtotalColumn = document.getElementById("subtotalColumn");
let articles = [];
let subtotalCost = "";

function baseSubtotal(articlePosition){
    // le cargamos el subtotal por defecto con los valores base
    return parseInt(articles[articlePosition].unitCost) * parseInt(articles[articlePosition].count)
}

function calculateRowSubtotal(articlePosition){
    subtotalValue = parseInt(articles[articlePosition].unitCost) * parseInt(document.getElementById("inptCount" + articlePosition).value)
    document.getElementById("subtotal" + articlePosition).textContent = subtotalValue;
}

function calculateFinalSubtotal(){
    let subtotal = 0;
    for (let i = 0; i < articles.length; i++){
        subtotal += document.getElementById("subtotal" + i).textContent;
    }
    console.log(document.getElementById("subtotal" + i).textContent)
}

function showCosts(){
    let htmlContent = `
        <p class="headingsCart">Costos</p>

        <table id="tableCosts">
            <tr class="trCosts">
                <td class="titleCosts">Subtotal <p class="descriptionCosts">Costo unitario del producto por cantidad</p></td>
                <td class="costsValues">{calculateFinalSubtotal()}</td>
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
    //pendiente lo del currency

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
        <br>

        <p class="headingsCart">Dirección de envío</p>
        <div id="rowShippingAddress">
            <label for="street">Street</label>
            <input type="text" class="inputTxtCart" id="street">
            
            <label for="homeNumber">Número</label>
            <input type="text" class="inputTxtCart" id="homeNumber">
            
            <label for="betweenStreet">Esquina</label>
            <input type="text" class="inputTxtCart" id="betweenStreet">
        </div>

        <hr>`;

    return htmlContent;
}

function showProducts(){
    let products = "";
    for (let i = 0; i < articles.length; i++){
        products += ` 
            <tr>
                <td class="tdProducts "><img class="cartProdImg" src="${articles[i].image}"></td>
                <td class="tdProducts"><p>${articles[i].name}</p></td>
                <td class="tdProducts"><p>${articles[i].unitCost}</p></td>
                <td class="tdProducts inputCant"><input id="inptCount${i}" class="inputTxtCart" value="${articles[i].count}" oninput="calculateRowSubtotal(${i})"></td>
                <td id="subtotalColumn${i}" class="tdProducts"><div>${articles[i].currency} <p id="subtotal${i}" style="display: inline;">${baseSubtotal(i)}</p></div></td>
            </tr>
        `;
        
        /* Dejo esto comentado para preguntarle profe.
        subtotalCost += document.getElementById("subtotal" + i).textContent;
        console.log(subtotalCost, document.getElementById("subtotal" + i).textContent)*/
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
// 3) Fix NaN cuando tengo un producto sin cantidad (si se la borran)
