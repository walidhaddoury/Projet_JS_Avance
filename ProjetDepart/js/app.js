document.addEventListener('DOMContentLoaded', loadLocalStorage); // Au chargement de la page lance la fonction LoadLocalStorage pour mettre a jour le panier
const allButtonAddToCart = document.querySelectorAll('.add-to-cart'); // All buttons Add To Cart
const emptyCart = document.querySelector('#empty-cart');  // Button to reset Cart
const listCart = document.querySelector('#cart-table tbody'); // liste of product in Cart

let panier = JSON.parse(localStorage.getItem('Cart')) || []; // Récupère le JSON dans le LocalStorage et le stock dans "panier"

const productsTitle = document.querySelectorAll('.course__item .info__card h4'); // get tout les h4
const productsImg = document.querySelectorAll('.course__item .course_img img'); // get toutes les images des cours
const productsPrice = document.querySelectorAll('.course__item .info__card .discount'); // get tout les prix des cours 

const productStock = document.querySelectorAll('.stock');

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

            console.log(getTitle);

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

            for (let y = 0; y < productsTitle.length; y++){
                console.log(productsTitle[y].textContent);
                if (getTitle === productsTitle[y].textContent){
                    console.log("================");
                    productStock[y].textContent = parseInt(productStock[y].textContent) - 1;
                    console.log(productStock[y].textContent);
                }
            }
        }
    }
    else {
        console.log("Le panier dans le LocalStorage est vide !");
    }
}

for (let i = 0; i < allButtonAddToCart.length; i++) {

    const titleCart = productsTitle[i].innerText;
    const priceCart = productsPrice[i].innerText;
    const imgCart = productsImg[i].getAttribute('src');

    console.log(productStock[i].textContent);

    allButtonAddToCart[i].addEventListener('click', () => {
        createJSON(imgCart, titleCart, priceCart);
        createHTML(titleCart, priceCart, imgCart);
        displayNotif(titleCart, "ajout");
        updateCourses("add", i);
    });
}

/**
 * create a JSON to push in LocalStorage
 * @param {String} imgCart path img course
 * @param {String} titleCart title of course
 * @param {String} priceCart price of course
 */
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

/**
 * create a new "tr" and add the data in it and display it in the cart
 * @param {String} titleCart get title
 * @param {String} priceCart get price 
 * @param {String} imgCart get link of img
 */
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

/**
 * Remove a product from the cart
 * @param {*} e  event
 */
function removeFromCart(e) {
    let suppr = e.target.parentElement.parentElement;
    let index = e.target.parentElement.parentElement.rowIndex - 1;

    let supprAtttribute = suppr.querySelectorAll('td');

    panier.splice(index, 1);
    suppr.remove();

    localStorage.setItem('Cart', JSON.stringify(panier));

    displayNotif(supprAtttribute[1].textContent, "supression");

    for (let i = 0; i < productsTitle.length; i++){
        if (productsTitle[i].innerText === supprAtttribute[1].innerText){
            updateCourses("remove", i);
        }
    }
}

/**
 * reset array "panier", display a notification, reset the cart and reload the page
 */
function clearLocalStorage() {
    //localStorage.clear();
    displayNotif("", "");
    panier = [];
    localStorage.setItem('Cart', JSON.stringify(panier));
    listCart.remove();
    document.location.reload();
}

/**
 * Create a "li" with data and display it for 3s
 * @param {String} title the title of the card concerned
 * @param {String} event "ajout" "supression" or ""
 */
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
    } else if (event === 'supression') {
        // display SUPRESSION DU PANIER
        notifText.innerHTML = `${title} a été retiré du panier`;
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

/**
 * update Stock of the course
 * @param {String} action type of action
 * @param {Int} index index of course to modify
 */
function updateCourses(action, index){
    const allCoursesContainer = document.querySelectorAll('.courses__container');
    const courseItem = allCoursesContainer[1].children;

    // On verifie si c'est une incrémentation ou une décrémentation du stock
    if (action === "add") {
        productStock[index].textContent = parseInt(productStock[index].textContent) - 1;
    }
    if (action === "remove") {
        productStock[index].textContent = parseInt(productStock[index].textContent) + 1;
    }

    // Si le stock arrive à 0, retire le cours en question
    if (parseInt(productStock[index].textContent) === 0) {
        allButtonAddToCart[index].classList.add('disabled');
    } else {
        allButtonAddToCart[index].classList.remove('disabled');
    }
}
