const $purchaseCart = document.getElementById('purchaseCart');
const $purchaseTotal = document.getElementById('purchaseTotal');
const $btnEndPurchase = document.getElementById('bntEndPurchase');

const loadCartProducts = () => {
    let total = 0;

    if(localStorage.getItem('cart')) {
        const cart = JSON.parse(localStorage.getItem('cart'));
        $purchaseCart.innerHTML = ''
            for (const [index, item] of cart.entries()) {
                const cartItem = productCartTemplate(index, item)
                $purchaseCart.appendChild(cartItem) ;
            }
        $purchaseTotal.textContent = `$ ${getTotal(cart)}`;
    }
}

const getTotal = (cart) => {
    let total = 0;

    for (const item of cart) {
        total = total + (item.price * item.quantityProduct);
    }

    return total;
}

const productCartTemplate = (index ,item) => {
    const { name, image, color, quantityProduct, price } = item
    const template = `
    <article class="product-cart">
        <img src="${image}" alt="${name.toUpperCase()}">
        <div class="product-cart__content">
            <p>${name}</p>
            <p>- ${color}</p>
            <p>Elevate your audio experiencie with the bose...</p>
            <input type="number" min="1" id="inputQty-${index}" data-index="${index}" value="${quantityProduct}">
        </div>
        <p>$ ${price * quantityProduct}</p>
    </article>  
    `
    const itemTemplate = document.createRange().createContextualFragment(template);
    const $inputQty = itemTemplate.getElementById(`inputQty-${index}`);

    $inputQty.addEventListener('change', (event) => {
        handleChangeQtyProduct(event);
    })

    return itemTemplate;
}

const handleChangeQtyProduct = (event) => {
    const newQtyProduct = event.target.value;
    const index = event.target.dataset.index;

    if(localStorage.getItem('cart')) {
        const cart = JSON.parse(localStorage.getItem('cart'));
        cart[index].quantityProduct = Number(newQtyProduct);

        localStorage.setItem('cart', JSON.stringify(cart));
        $purchaseTotal.textContent = `S/.${getTotal(cart)}`;
    }

    loadCartProducts();
}

document.addEventListener('DOMContentLoaded', () => {
    loadCartProducts()
})