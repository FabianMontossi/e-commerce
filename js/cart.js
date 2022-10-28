function getUserId(){
    return 25801;
}

const CART_URL = CART_INFO_URL + getUserId() + EXT_TYPE;
const content = document.getElementById("container");
const inptCount = document.getElementById("inptCount");


function showCart(products){
    content.innerHTML += `
        <h2 class="h2Cart">Carrito de Compras</h2>
        <p class="headingsCart">Articulos a comprar</p>
        <table>
            <tr>
                <th></th>
                <th>Nombre</th>
                <th>Costo</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
            </tr>
            ${showProducts(products.articles)}
        </table>
        `;
        content.innerHTML += `
        <hr class="hrCart">
        ${showShipping()}
        `;
}

function getSubtotal(unitCost, quantity){
    // ver tema de currency
    return parseInt(unitCost) * parseInt(quantity);
}


function showShipping(){
    let htmlContent = `
        <p class="headingsCart">Tipo de envío</p>
      
        <input type="radio" class="radioShipping" name="shippingType" value="premium" id="premium">
        <label for="premium">Premium - 2 a 5 días (15%)</label>
        <input type="radio" class="radioShipping" name="shippingType" value="express" id="express">
        <label for="express">Express - 5 a 8 días (7%)</label>
        <input type="radio" class="radioShipping" name="shippingType" value="standard" id="standard">
        <label for="standard">Standard - 12 a 15 días (5%)</label>

        <p class="headingsCart">Dirección de envío</p>
        <label for="street">Street</label>
        <input type="text" class="inputTxtCart" id="street">
        <label for="homeNumber">Número</label>
        <input type="text" class="inputTxtCart" id="homeNumber">
        <label for="betweenStreet">Esquina</label>
        <input type="text" class="inputTxtCart" id="betweenStreet">
        <hr>`;

    return htmlContent;
}



function showProducts(articles){
    let products = "";
    for (let i = 0; i < articles.length; i++){
        products += ` 
        <tbody>    
            <tr>
                <td><img class="cartProdImg" src="${articles[i].image}"></td>
                <td><p>${articles[i].name}</p></td>
                <td><p>${articles[i].unitCost}</p></td>
                <td><input id="inptCount" class="inputTxtCart" value="${articles[i].count}" onInput=${getSubtotal(articles[i].count, inptCount.value)}></td>
                <td><p>${articles[i].currency}</p> <p>${getSubtotal(articles[i].count)}</p></td>
            </tr>
        </tbody>
        `;
    }
    return products;
}


async function fetchCart(param){

    const response = await fetch(param);

    if (response.ok){
        const responseContents = await response.json();
        showCart(responseContents);
    } else{
        alert("Unfortunately, there's something wrong :("); //  !!!!!!!!!!! MISMO QUE EN AssignCatId()
    }
}

fetchCart(CART_URL);