const cartIcon = document.querySelector('.fa-shopping-cart');
const addToCartButton = document.querySelectorAll('.buy-button');
const exitButton = document.querySelector('.fa-times');
const cartContent = document.querySelector('.cart-content');
const cartContainer = document.querySelector('.cart-container');
const imgContainers = [...document.querySelectorAll('.img-container')];
const amountIcon = document.querySelector('.cart-amount-icon');
const totalAmount = document.querySelector('.total-amount span');


// checking functions
const totalToPay = () => {
    const productTotalPrice = [...document.querySelectorAll('.total-price span')];
    let price = 0;
    productTotalPrice.forEach(product => price += parseInt(product.innerText));
    totalAmount.innerText = price;
};


const checkIfEmpty = () => {
    const emptyText = document.querySelector('.if-cart-empty');
    if(cartContent.children.length > 1){
        emptyText.classList.add('hidden')
    }else{
        emptyText.classList.remove('hidden')
    };
};

// checking functions end

// changing quantity start
addQty = e => {
    const parent = e.target.parentNode.parentNode.parentNode;
    const qty = parent.querySelector('.qty span');
    const unitPrice = parent.querySelector('.unit-price span');
    const totalPrice = parent.querySelector('.total-price span');
    let qtyNumber = parseInt(qty.innerText);
    let totalNumber = parseInt(totalPrice.innerText);
    let unitNumber = parseInt(unitPrice.innerText);
    if(qtyNumber<10){
        qty.innerText = qtyNumber + 1;
        totalPrice.innerText = totalNumber + unitNumber;
    }else return null;
    totalToPay();
};

subtractQty = e => {
    const parent = e.target.parentNode.parentNode.parentNode;
    const qty = parent.querySelector('.qty span');
    const totalPrice = parent.querySelector('.total-price span');
    const unitPrice = parent.querySelector('.unit-price span');
    let unitNumber = parseInt(unitPrice.innerText);
    let qtyNumber = parseInt(qty.innerText);
    let totalNumber = parseInt(totalPrice.innerText);
    if(qtyNumber>0){
        qty.innerText = qtyNumber - 1;
        totalPrice.innerText = totalNumber - unitNumber;
    }else return null;
    totalToPay();
};

const changeQty = e => {
    const addQtyButton = [...document.querySelectorAll('.fa-chevron-up')];
    const subtractQtyButton = [...document.querySelectorAll('.fa-chevron-down')];
    addQtyButton.forEach(button => button.addEventListener('click', addQty));
    subtractQtyButton.forEach(button => button.addEventListener('click', subtractQty));
};

const updateCartAmount = () => {
    const products = cartContent.children.length - 1;
    amountIcon.innerText = products;
};
// changing quantity end


//removing start
const removeFromCart = e => {
    const parent = e.target.parentNode.parentNode;
    const buttonId = e.target.id;
    const buttons = [...addToCartButton];
    const found = buttons.filter((btn)=>{
        if(btn.id === buttonId){
            btn.classList.remove('added');
            btn.innerText = "ADD TO CART";
        }
    })
    parent.remove();
    checkIfEmpty();
    updateCartAmount();
    totalToPay()
};

const removing = e => {
    const removeItemButton = document.querySelectorAll('.remove-item');
    removeItemButton.forEach(button=>button.addEventListener('click', removeFromCart));
};
//removing end


//adding product to cart
const addItemToCart = values => {
    const itemElement = document.createElement('div');
    itemElement.className = 'item-details';
    itemElement.innerHTML = `
        <div class="item">
            <img src="${values.image}" alt="brown-leather-sofa">
                <p>${values.description}</p>
            </div>
        <div class="unit-price">$<span>${values.price}</span></div>
        <div class="qty">
            <span>1</span>
            <div class="qty-buttons">
                <i class="fas fa-chevron-up"></i>
                <i class="fas fa-chevron-down"></i>
             </div>
        </div>
        <div class="total-price">$<span>${values.price}</span><button class="remove-item" id="${values.id}">remove</button></div>
    `;
    cartContent.appendChild(itemElement);
    removing();
    changeQty();
    checkIfEmpty();
    updateCartAmount();
    totalToPay();
};
addToCartButton.forEach(item => {
    item.addEventListener('click', e => {
        const parent = e.target.parentNode;
        const target= e.target;
        const targetId= e.target.id;
        if(target.classList.contains('added')) return null;
        target.classList.add('added');
        target.innerText = "ITEM ADDED!";
        const itemPrice = parseInt(parent.querySelector('span').innerText);
        const itemDescription = parent.querySelector('.info').innerText;
        const itemImage = parent.children[0].src;
        const values = {
            image: itemImage,
            description: itemDescription,
            price: itemPrice,
            id: targetId,
        };
        addItemToCart(values);
    });
});
//adding end



// Showing cart
const showCart = () => cartContainer.classList.toggle('active');
cartIcon.addEventListener('click', showCart);
exitButton.addEventListener('click', showCart);
checkIfEmpty();

