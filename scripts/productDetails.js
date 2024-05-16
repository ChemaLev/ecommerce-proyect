const $productDetail = document.getElementById('productDetail');
const query = location.search;
const params = new URLSearchParams(query);
const id = params.get('id');

const changeImage = (event) => {
    const $principalImage = document.getElementById('principalImage');
    if(event.target.tagName === 'IMG'){
        const newImage = event.target.src;
        const newAlt = event.target.alt;
        $principalImage.setAttribute('src', newImage);
        $principalImage.setAttribute('alt', newAlt);
    }
}

const handleAddProductToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const productFind = products.find((product) => product.id === Number(id));
    const qtyProduct =  document.getElementById('quantityProduct');
    const { color, name, price, image } = productFind;
    const newProduct = {
       id,
       color,
       name,
       price,
       image,
       quantityProduct: Number(qtyProduct.value)
    }

    const existingProductIndex = cart.findIndex(product => product.id === id);

    if(existingProductIndex !== -1) {
        cart[existingProductIndex].quantityProduct += newProduct.quantityProduct;
    }else {
        cart.push(newProduct);
    }

    alert('Se agregó el producto correspondiente');

    localStorage.setItem('cart', JSON.stringify(cart));
}

const handleProductToFavoriteList = () => {
    const favorite = JSON.parse(localStorage.getItem('favorite'));
    const btnFav = document.getElementById('btnFavorite');
    const btnIcon = btnFav.querySelector('#iconFavorite');
    const classIcon = btnIcon.classList;
    const productFind = products.find(product => product.id === Number(id));
    const { name, price, image } = productFind;
    const newProductFav = {
        id,
        name,
        price,
        image
    }

    const existingProductFavIndex = favorite.findIndex(product => product.id === id);

    if(existingProductFavIndex !== -1){
        favorite.splice(existingProductFavIndex,1);
        classIcon.replace('fa-solid','fa-regular');
    }else{
        favorite.push(newProductFav);
        classIcon.replace('fa-regular','fa-solid');
    }

    localStorage.setItem('favorite',JSON.stringify(favorite));
}

const getProductDetails = (paramId) => {
    const productFind = products.find((product) => product.id === Number(paramId));
    const arrayFavorite = JSON.parse(localStorage.getItem('favorite'));;
    const imageTemplate = productImageTemplate(productFind);
    const informationTemplate = productInformationTemplate(productFind);
    const pricesTemplate = productPricesTemplate(productFind, arrayFavorite);

    console.log(pricesTemplate)

    $productDetail.appendChild(imageTemplate);
    $productDetail.appendChild(informationTemplate);
    $productDetail.appendChild(pricesTemplate);
}

const productImageTemplate = (product) => {
    const { name } = product;
    const template = 
    `
    <div class="product-images">
        <div class="product-images-secondary" id="thumbailImages" onclick="changeImage(event)">
            <img class="product-image-mini" src="./assets/img/ipad-1.jpg" alt="IPAD PRO DEFAULT">
            <img class="product-image-mini" src="./assets/img/ipad-2.jpg" alt="IPAD PRO 3">
            <img class="product-image-mini" src="./assets/img/ipad-3.jpg" alt="IPAD PRO 2">
            <img class="product-image-mini" src="./assets/img/ipad-4.jpg" alt="IPAD PRO 1">
        </div>
        <div class="product-image-principal">
            <img class="product-image-full" id="principalImage" src="./assets/img/ipad-1.jpg" alt="${name}">
        </div>
    </div>
    `;

    return document.createRange().createContextualFragment(template);
}

const productInformationTemplate = (product) => {
    const { name, color} = product;
    const template = 
    `
    <div class="product-information">
        <h4>Apple</h4>
        <h3>${name}</h3>
        <span class="qualification">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            657 calificaciones
        </span>
        <ul>
            <li><b>Disponibilidad :</b>En stock</li>
            <li><b>Color :</b>${color}</li>
            <li><b>Peso con empaque :</b>0.500 kg</li>
            <li><b>Producto de :</b>Amazon</li>
        </ul>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum culpa inventore, neque deserunt molestiae delectus aspernatur voluptas reprehenderit, enim magni dolore sapiente doloribus corrupti distinctio aliquam officiis rerum nam eos.
            Corporis quod autem doloribus voluptatem quos a, beatae ex illo sit eaque, deleniti ipsum magnam aliquam! Soluta incidunt eveniet autem tempora, asperiores laudantium officiis dolorem veniam voluptatem similique exercitationem voluptatum?
            Ad iusto ex sequi facilis maiores inventore voluptatum aperiam? Temporibus quo ad perferendis voluptate quae ullam illo neque nesciunt iusto veritatis? Sit eveniet minima esse! Itaque harum possimus quae magni?
        </p>
    </div>
    `;

    return document.createRange().createContextualFragment(template);
}

const productPricesTemplate = (product, productFav) => {
    const prod = productFav.find(element => element.id === id);
    const btnFavorite = `<i id="iconFavorite" class="fa-solid fa-heart"></i>`;
    const btnNotFavorite = `<i id="iconFavorite" class="fa-regular fa-heart"></i>`;
    
    const { discount, price } = product;
    const template =
    `
    <div class="product-prices">
        <button id="btnFavorite" class="btn-favorite" onclick="handleProductToFavoriteList()">${prod ? btnFavorite : btnNotFavorite}</button>
        <div class="product-list-prices">
            <p class="old-price">Precio: <span>S/. ${price}</span></p>
            <p class="current-price">Ahorras: S/ ${(price*(discount/100))} (${discount}%)</p>
            <p class="price">S/. ${price-(price*(discount/100))}</p>
        </div>
        <div class="product-shipment">
            <div class="product-shipment__detail">
                <i class="fa-solid fa-truck-fast"></i>
                <p><span>Agrega el producto al carrito</span> para conocer los costos de envío</p>
            </div>
            <div class="product-shipment__detail">
                <i class="fa-solid fa-truck-fast"></i>
                <p>Recibí este producto de 5 a 10 días hábiles seleccionando <span>envío</span></p>
            </div>
        </div>
        <div class="product-actions">
            <div class="quantity">
                <label for="quantityProduct">Cantidad:</label>
                <input type="number" id="quantityProduct" min="1" max="99" value="1" />
            </div>
            <div class="call">
                <button type="button" class="btn btn-primary">Comprar</button>
                <button type="button" class="btn btn-secondary" onclick="handleAddProductToCart()">Agregar al carrito</button>
            </div>
        </div>
    </div>
    `
    return document.createRange().createContextualFragment(template);
}


// Inicialización del Arreglo vacío
document.addEventListener('DOMContentLoaded', () => {
    if(!(localStorage.getItem('cart'))) {
        localStorage.setItem('cart',JSON.stringify([]))
    }
    getProductDetails(id);

    if(!(localStorage.getItem('favorite'))){
        localStorage.setItem('favorite',JSON.stringify([]))
    }
})