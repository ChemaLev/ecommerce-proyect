const $productList = document.getElementById('productList');

class Product {
    constructor(id, image, name, color, price, discount){
        this.id = id;
        this.image = image;
        this.name = name;
        this.color = color;
        this.price = price;
        this.discount = discount;
    }
}

const cardsProductTemplate = (producto) => {
    const {id, image, name, color, price, discount} = producto;
    return `
    <article id="${id}" class="product-card">
        <a class="product-source" href="./product-detail.html">
            <img class="product-img" src="${image}" alt="${name.toLowerCase()}">
        </a>
        <div class="product-info">
            <span class="product-title">${name}</span>
            <span class="product-description">${color}</span>

            <div class="product-price-block">
                <span class="price">$${price.toFixed(3)}</span>
                <span class="discount">${discount}% Off</span>
            </div>
            <div class="product-tax-policy">
                Incluye impuesto País y percepción AFIP
            </div>
        </div>
    </article>
    `
}

const productList = [
    new Product(1, './assets/img/mock1.jpg', 'ipad Pro 12\'9', 'Silver', 750, 50),
    new Product(2, './assets/img/mock1.jpg', 'ipad Pro 12\'9', 'Silver', 750, 50),
    new Product(3, './assets/img/mock1.jpg', 'ipad Pro 12\'9', 'Silver', 750, 50),
    new Product(4, './assets/img/mock1.jpg', 'ipad Pro 12\'9', 'Silver', 750, 50),
    new Product(5, './assets/img/mock1.jpg', 'ipad Pro 12\'9', 'Silver', 750, 50),
    new Product(6, './assets/img/mock1.jpg', 'ipad Pro 12\'9', 'Silver', 750, 50),
    new Product(7, './assets/img/mock1.jpg', 'ipad Pro 12\'9', 'Silver', 750, 50),
    new Product(8, './assets/img/mock1.jpg', 'ipad Pro 12\'9', 'Silver', 750, 50)
]

const loadProducts = (productList) => {
    for(const product of productList){
        $productList.innerHTML += cardsProductTemplate(product);
    }
}

loadProducts(productList);