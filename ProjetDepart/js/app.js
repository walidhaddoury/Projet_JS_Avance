document.addEventListener('DOMContentLoaded', loadLocalStorage);

const cartButton = document.querySelectorAll('.add-to-cart'); // All buttons Add To Cart
const emptyCart = document.querySelector('#empty-cart');  // Button to reset Cart
const listCart = document.querySelector('#cart-table tbody'); // liste of product in Cart

let panier = JSON.parse(localStorage.getItem('Cart')) || [];

const productsTitle = document.querySelectorAll('.course__item .info__card h4');
const productsImg = document.querySelectorAll('.course__item .course_img img');
const productsPrice = document.querySelectorAll('.course__item .info__card .discount');

const body = document.querySelector('body');
const notifContainer = document.createElement('ul');

const allStocks = document.querySelectorAll('.stock');


// Load the cart with localStorage
function loadLocalStorage() {
    if (panier) {
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
    }
    else {
        console.log("Le panier dans le LocalStorage est vide !");
    }
}


emptyCart.addEventListener('click', clearLocalStorage);


for (let i = 0; i < cartButton.length; i++) {

    const titleCart = productsTitle[i].innerText;
    const priceCart = productsPrice[i].innerText;
    const imgCart = productsImg[i].getAttribute('src');


    cartButton[i].addEventListener('click', () => {

        let article = {
            img: imgCart,
            title: titleCart,
            price: priceCart,
            stock: 1
        };
        panier.push(article);

        localStorage.setItem('Cart', JSON.stringify(panier));


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

        img.setAttribute('src', productsImg[i].getAttribute('src'));
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

        console.log(allStocks[i].innerText);

        displayNotif(titleCart, "ajout");;

    });
}


function removeFromCart(e) {
    let suppr = e.target.parentElement.parentElement;
    let index = e.target.parentElement.parentElement.rowIndex - 1;

    let supprAtttribute = suppr.querySelectorAll('td');

    panier.splice(index, 1);
    suppr.remove();

    localStorage.setItem('Cart', JSON.stringify(panier));

    displayNotif(supprAtttribute[1].innerHTML, "supression");

    //console.log(test);
    //console.log(panier.indexOf(supprAtttribute[1].innerHTML));

}


function clearLocalStorage() {
    //localStorage.clear();
    displayNotif("", "");
    panier = [];
    localStorage.setItem('Cart', JSON.stringify(panier));
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