if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {

    const cartRemoveButtons = document.getElementsByClassName('cart-remove-btn');
    for(const cartRemoveButton of cartRemoveButtons) {
        cartRemoveButton.addEventListener('click', removeRow);
    }

    const cartInputBoxes = document.getElementsByClassName('cart-quantity-input');
    for(const cartInputBox of cartInputBoxes) {
        cartInputBox.addEventListener('change', quantityChanged);
    }
    
    const addToCartButtons = document.getElementsByClassName('store-item-btn');
    for(const addToCartButton of addToCartButtons) {
        addToCartButton.addEventListener('click', addToCartClicked);
    }

    const purchaseButton = document.getElementsByClassName('purchase-btn')[0];
    purchaseButton.addEventListener('click', purchaseClicked);
}

function removeRow(event) {
    const buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

function quantityChanged(event) {
    const quantity = event.target.value;
    if(isNaN(quantity) || quantity <= 0) {
        event.target.value = 1;
    }
    updateCartTotal();
}

function addToCartClicked(event) {
    var button = event.target;
    var storeItem = button.parentElement.parentElement;
    var storeItemTitle = storeItem.getElementsByClassName('store-item-title')[0].innerText;
    var storeItemPrice = storeItem.getElementsByClassName('store-item-price')[0].innerText;
    var storeItemImgSrc = storeItem.getElementsByClassName('store-item-img')[0].src;
    addItemToCart(storeItemTitle, storeItemPrice, storeItemImgSrc);
}

function alreadyExists(title) {
    const cartRows = document.getElementsByClassName('cart-row');
    for(var i = 0 ; i < cartRows.length ; i++) {
        const cartRow = cartRows[i];
        const currItemTitle = cartRow.getElementsByClassName('cart-item-title')[0].innerText;
        if(currItemTitle == title) {
            return true;
        }
    }

    return false;
}

function addItemToCart(title, price, imgSrc) {
    if(alreadyExists(title)) {
        window.alert(`${title} has already been added in your cart`);
        return;
    }

    var cartRows = document.getElementsByClassName('cart-rows')[0];
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartRowContent = 
    `<div class="cart-element cart-item">
        <img src="${imgSrc}" class="cart-img">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-element cart-price">${price}</span>
    <div class="cart-element cart-quantity">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="primary-btn cart-remove-btn" role="button">REMOVE</button>
    </div>`;

    cartRow.innerHTML = cartRowContent;
    cartRows.append(cartRow);
    cartRow.getElementsByClassName('cart-remove-btn')[0].addEventListener('click', removeRow);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);

    updateCartTotal();
}

function purchaseClicked(event) {
    window.alert('Thank you for your purchase!');
    const cartRows = document.getElementsByClassName('cart-rows')[0];
    while(cartRows.hasChildNodes()) {
        cartRows.removeChild(cartRows.firstChild);
    }

    updateCartTotal();
}

function updateCartTotal() {
    const cartRows = document.getElementsByClassName('cart-row');
    var total = 0;
    for(var i = 0 ; i < cartRows.length ; i++) {
        const cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = priceElement.innerText.replace('$','')
        price = parseFloat(price);

        var quantity = quantityElement.value;
        total += price*quantity;
    }

    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('total-price')[0].innerText = '$' + total;
}

