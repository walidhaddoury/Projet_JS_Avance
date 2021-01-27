document.addEventListener('DOMContentLoaded', loadLocalStorage);

const cartButton = document.querySelectorAll('.add-to-cart'); // All buttons Add To Cart
const emptyCart = document.querySelector('#empty-cart');  // Button to reset Cart
const listCart = document.querySelector('#cart-table tbody'); // liste of product in Cart

let panier = JSON.parse(localStorage.getItem('Cart')) || [];

const productsTitle = document.querySelectorAll('.course__item .info__card h4');
const productsImg = document.querySelectorAll('.course__item .course_img img');
const productsPrice = document.querySelectorAll('.course__item .info__card .discount')


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

        //console.log(titleCart);
        //console.log(priceCart);
        //console.log(imgCart);

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

    });
}


function removeFromCart(e) {
    let suppr = e.target.parentElement.parentElement;
    let index = e.target.parentElement.parentElement.rowIndex - 1;
    panier.splice(index, 1);
    console.log(index);
    suppr.remove();

    localStorage.setItem('Cart', JSON.stringify(panier));

    //let supprAtttribute = suppr.querySelectorAll('td');
    //let test = panier.findIndex(i => i.title === supprAtttribute[1].innerHTML);
    //console.log(test);
    //console.log(panier.indexOf(supprAtttribute[1].innerHTML));

}


function clearLocalStorage() {
    localStorage.clear();
    listCart.remove();
}