document.addEventListener('DOMContentLoaded', loadLocalStorage); // Au chargement de la page lance la fonction LoadLocalStorage pour mettre a jour le panier
//document.addEventListener('DOMContentLoaded', loadStockJSON);
const allButtonAddToCart = document.querySelectorAll('.add-to-cart'); // All buttons Add To Cart
const emptyCart = document.querySelector('#empty-cart');  // Button to reset Cart
const listCart = document.querySelector('#cart-table tbody'); // liste of product in Cart

let panier = JSON.parse(localStorage.getItem('Cart')) || []; // Initialise
let stockJSON = JSON.parse(localStorage.getItem('Stocks')) || [];

const productsTitle = document.querySelectorAll('.course__item .info__card h4');
const productsImg = document.querySelectorAll('.course__item .course_img img');
const productsPrice = document.querySelectorAll('.course__item .info__card .discount');

const body = document.querySelector('body');
const notifContainer = document.createElement('ul');


emptyCart.addEventListener('click', clearLocalStorage);

// Load the cart with localStorage
function loadLocalStorage() {
    if (panier.length) {
        for (let i = 0; i < panier.length; i++) {
            let getTitle = panier[i].title;
            let getPrice = panier[i].price;
            let getImg = panier[i].img;
            let getStock = panier[i].stock;


            const newProduct = document.createElement('tr');

            let imgProduct = document.createElement('td');
            let img = document.createElement('img');
            img.setAttribute('src', getImg);
            imgProduct.appendChild(img);

            let titleProduct = document.createElement('td');
            titleProduct.innerHTML = getTitle;

            let priceProduct = document.createElement('td');
            priceProduct.innerHTML = getPrice;

            let removeProduct = document.createElement('a');
            removeProduct.addEventListener('click', removeFromCart);
            let imgRemove = document.createElement('img');
            imgRemove.setAttribute('src', './img/fermer.svg');
            removeProduct.appendChild(imgRemove);

            let stock = document.createElement('td');
            stock.innerHTML = getStock;

            newProduct.appendChild(imgProduct);
            newProduct.appendChild(titleProduct);
            newProduct.appendChild(priceProduct);
            newProduct.appendChild(stock);
            newProduct.appendChild(removeProduct);

            listCart.appendChild(newProduct);

        }
        loadStockJSON();
    }
    else {
        console.log("Le panier dans le LocalStorage est vide !");
    }
}

function loadStockJSON() {
    if (panier.length) {
        let uxNb = 0;
        let phpNb = 0;
        let reactNb = 0;
        let nodeNb = 0;
        let sqlNb = 0;
        for (let i = 0; i < panier.length; i++) {
            switch (i) {
                case panier[i].title === "Node JS":
                    nodeNb++;
                    break;
                case panier[i].title === "React JS":
                    reactNb++;
                    break;
                case panier[i].title === "PHP 8":
                    phpNb++;
                    break;
                case panier[i].title === "UX/UI":
                    uxNb++;
                    break;
                case panier[i].title === "MySQL":
                    sqlNb++;
                    break;
                default:
                    break;
            }
        }
        console.log("NODE", nodeNb);
        let stock = {
            uiUx: uxNb,
            php: phpNb,
            react: reactNb,
            node: nodeNb,
            sql: sqlNb
        }
    
        stockJSON.push(stock);
        localStorage.setItem('Stocks', JSON.stringify(stockJSON));

    } else {
        console.log("Les stocks sont plein !");
    }
}


for (let i = 0; i < allButtonAddToCart.length; i++) {

    const titleCart = productsTitle[i].innerText;
    const priceCart = productsPrice[i].innerText;
    const imgCart = productsImg[i].getAttribute('src');


    allButtonAddToCart[i].addEventListener('click', () => {

        createJSON(imgCart, titleCart, priceCart);
        createHTML(titleCart, priceCart, imgCart);
        displayNotif(titleCart, "ajout");
        updateStock(i);
        loadStockJSON();

    });
}


function createJSON(imgCart, titleCart, priceCart) {
    let article = {
        img: imgCart,
        title: titleCart,
        price: priceCart,
        stock: 1
    };
    panier.push(article);

    localStorage.setItem('Cart', JSON.stringify(panier));
}

/*
function createStockJSON(uxNb, phpNbNb, reactNb, nodeNb, sqlNb) {
    let stock = {
        uiUx: uxNb,
        phpNb: phpNbNb,
        react: reactNb,
        node: nodeNb,
        sql: sqlNb
    }

    stockJSON.push(stock);
}*/

function createHTML(titleCart, priceCart, imgCart) {
    const newProduct = document.createElement('tr');

    let imgProduct = document.createElement('td');
    let img = document.createElement('img');

    let titleProduct = document.createElement('td');

    let priceProduct = document.createElement('td');

    let removeProduct = document.createElement('a');
    removeProduct.addEventListener('click', removeFromCart);
    let imgRemove = document.createElement('img');

    let stock = document.createElement('td');
    stock.innerHTML = 1;

    img.setAttribute('src', imgCart);
    imgProduct.appendChild(img);

    imgRemove.setAttribute('src', './img/fermer.svg');
    removeProduct.appendChild(imgRemove);

    titleProduct.innerHTML = titleCart;
    priceProduct.innerHTML = priceCart;

    newProduct.appendChild(imgProduct);
    newProduct.appendChild(titleProduct);
    newProduct.appendChild(priceProduct);
    newProduct.appendChild(stock);
    newProduct.appendChild(removeProduct);

    listCart.appendChild(newProduct);
}


function removeFromCart(e) {
    let suppr = e.target.parentElement.parentElement;
    let index = e.target.parentElement.parentElement.rowIndex - 1;

    let supprAtttribute = suppr.querySelectorAll('td');

    panier.splice(index, 1);
    suppr.remove();

    localStorage.setItem('Cart', JSON.stringify(panier));

    displayNotif(supprAtttribute[1].textContent, "supression");

    updateStockDelete(supprAtttribute[1].textContent);

    //console.log(test);
    //console.log(panier.indexOf(supprAtttribute[1].innerHTML));

}


function clearLocalStorage() {
    //localStorage.clear();
    displayNotif("", "");
    panier = [];
    stockJSON = [];
    localStorage.setItem('Cart', JSON.stringify(panier));
    localStorage.setItem('Stocks', JSON.stringify(stockJSON));
    listCart.remove();
    document.location.reload();
}


function displayNotif(title, event) {
    notifContainer.setAttribute('id', 'notification_container');

    const content = document.createElement('li');
    content.setAttribute('class', 'content');

    const notifImg = document.createElement('img');
    notifImg.setAttribute('src', './img/info.png');

    const notifText = document.createElement('p');

    if (event === 'ajout') {
        // display AJOUT DANS LE PANIER
        notifText.innerHTML = `${title} a été ajouté au panier`;
        console.log("AJOUT DANS LE PANIER");
    } else if (event === 'supression') {
        // display SUPRESSION DU PANIER
        notifText.innerHTML = `${title} a été retiré du panier`;
        console.log("SUPRESSION DU PANIER");
    } else {
        notifText.innerHTML = `Le panier à été vidé !`;
    }

    content.appendChild(notifImg);
    content.appendChild(notifText);
    notifContainer.appendChild(content);
    body.appendChild(notifContainer);

    setTimeout(function () {
        notifContainer.removeChild(content);
    }, 3000);

}

function updateStock(index) {
    const allStock = document.querySelectorAll('.stock');

    let nb = (parseInt(allStock[index].textContent));

    allStock[index].textContent = nb - 1;
}


function updateStockDelete(type) {
    const allStock = document.querySelectorAll('.stock');

    let index = null;

    for (let i = 0; i < productsTitle.length; i++) {
        console.log(productsTitle[i]);
        if (productsTitle[i].textContent === type) {
            index = i;
            break;
        }
    }

    let nb = (parseInt(allStock[index].textContent));

    allStock[index].textContent = nb + 1;
}

