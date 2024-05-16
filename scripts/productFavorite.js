const $favoriteProducts = document.getElementById('favoriteProducts');

const getProductFavorite = () => {
    const arrayFav = JSON.parse(localStorage.getItem('favorite'));

    if(arrayFav.length === 0) {
        const noFavProd = noFavoriteProductsTemplate();
        $favoriteProducts.appendChild(noFavProd);
        console.log('No hay productos');
    }else {
        for (const elementFav of arrayFav) {
            const favoriteFragment = favoriteProductsTemplate(elementFav);
            $favoriteProducts.appendChild(favoriteFragment);
        }  
    }    
}

const removeProductToFavoriteList = (paramId) => {
    const favorite = JSON.parse(localStorage.getItem('favorite'));
    const productRemove = favorite.findIndex(product => product.id === Number(paramId))
    favorite.splice(productRemove, 1);

    localStorage.setItem('favorite',JSON.stringify(favorite));

    $favoriteProducts.innerHTML = ''
    getProductFavorite();
}

const favoriteProductsTemplate = (products) => {
    const { name, price, image, id} = products;
    const template = 
    `
    <article class="favorite-products__cart">
        <div class="favorite-products__content">
            <img class="favorite-products__content-img" src="${image}" alt="${name.toUpperCase()}">
            <div class="favorite-products__content-info">
                <p><b>${name}</b></p>
                <span class="favorite-products__content-price">S/.${price}</span>
            </div>
            <div class="favorite-products__content-actions">
                <button type="button" class="btn-add" onclick="handleAddProductToCart()">Agregar al carrito</button>
                <button type="button" class="btn-trash" onclick="removeProductToFavoriteList(${id})"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
    </article>
    `;
    return document.createRange().createContextualFragment(template);
}

const noFavoriteProductsTemplate = () => {
    const template =
    `
    <article class="favorite-products__cart">
        <h2 class="favorite-product__message">
            No tienen ningún producto agregado a favoritos
        </h2>
    </article>
    `;
    return document.createRange().createContextualFragment(template);
}

document.addEventListener('DOMContentLoaded', () => {
    getProductFavorite();
})
