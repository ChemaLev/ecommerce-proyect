const $menu = document.querySelector('#nav .nav-list');
const $footer = document.getElementById('footer');
const $socialMedia = document.getElementById('socialMedia');
const $socialMediaSelector = $socialMedia.querySelector('ul');

console.log($socialMedia);
console.log($socialMediaSelector);

const menuLinks = [
    {text: 'Ofertas', to:'#'},
    {text: 'Cómo comprar', to:'#'},
    {text: 'Costos y tarifas', to:'#'},
    {text: 'Mis tarifas', to:'#'},
    {text: 'Garantía', to:'#'}
]

const footerLinks = {
    'Ofertas': [
        { text: 'Laptops', to: '#' },
        { text: 'Audio', to: '#' },
        { text: 'Auriculares', to: '#' },
    ],
    'Cómo comprar': [
        { text: 'Formas de Pago', to: '#' },
        { text: 'Envíos', to: '#' },
        { text: 'Devoluciones', to: '#' },
    ],
    'Costos y tarifas': [
        { text: 'Impuesto', to: '#' },
        { text: 'Facturación', to: '#' }
    ],
    'Mis pedidos': [
        { text: 'Pedir nuevamente', to: '#' },
        { text: 'Listar deseos', to: '#' }
    ],
    'Garantía': [
        { text: 'Garantía 1', to: '#' },
        { text: 'Garantía 2', to: '#' }
    ],
}

for (const link of menuLinks) {
    const menuItem = document.createElement('li');
    menuItem.className = 'nav-item';

    const menuLink = document.createElement('a');
    menuLink.className = 'nav-link'
    menuLink.href = '#'
    menuLink.textContent = link.text

    $menu.appendChild(menuItem)
    menuItem.appendChild(menuLink)
}

const footerColumns = document.createElement('div');
footerColumns.className = 'footer-columns';

for (const links in footerLinks) {
    const footerItems = footerLinks[links];

    const footerColumnList = document.createElement('ul')
    footerColumnList.className = 'footer-columns-list'

    const footerColumnTitle = document.createElement('li')
    footerColumnTitle.className = 'footer-columns-title'
    footerColumnTitle.textContent =  links

    footerColumnList.appendChild(footerColumnTitle)

    footerItems.forEach((item) => {
        const footerItem = document.createElement('li');
        const footerLink = document.createElement('a');
        footerLink.href = item.to;
        footerLink.textContent = item.text;

        footerItem.appendChild(footerLink);
        footerColumnList.appendChild(footerItem);
        footerColumns.appendChild(footerColumnList);
        $footer.appendChild(footerColumns);

    })
    
    $footer.appendChild(footerColumns);
}

document.addEventListener('DOMContentLoaded', () => {
    if(JSON.parse(localStorage.getItem('cart'))?.length){
        const quantityProducts = document.createElement('div');
        quantityProducts.textContent = JSON.parse(localStorage.getItem('cart')).length;
        $socialMediaSelector.appendChild(quantityProducts);
    }
})