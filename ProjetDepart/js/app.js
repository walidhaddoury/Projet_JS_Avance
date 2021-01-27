document.addEventListener('DOMContentLoaded', loadLocalStorage);

const cartButton = document.querySelectorAll('.add-to-cart'); // All buttons Add To Cart
const emptyCart = document.querySelector('#empty-cart');  // Button to reset Cart
const listCart = document.querySelector('#cart-table tbody'); // liste of product in Cart

let panier = JSON.parse(localStorage.getItem('Cart')) || [];

const productsTitle = document.querySelectorAll('.course__item .info__card h4');
const productsImg = document.querySelectorAll('.course__item .course_img img');
const productsPrice = document.querySelectorAll('.course__item .info__card .discount')

//localStorage values
let uxUI = localStorage.getItem('UX/UI');
//console.log(uxUI);
let php = localStorage.getItem('php');
//console.log(php);
let react = localStorage.getItem('react');
//console.log(react);
let node = localStorage.getItem('node');
//console.log(node);
let mySQL = localStorage.getItem('mySQL');
//console.log(mySQL);


function loadLocalStorage() {
    if (localStorage.getItem('Panier')) {
        for (let i = 0; i < JSON.parse(localStorage.getItem('Panier').length); i++) {
            const getTitle = JSON.parse(localStorage.getItem('Panier')[i].title);
            const getPrice = JSON.parse(localStorage.getItem('Panier')[i].price);
            const getImg = JSON.parse(localStorage.getItem('Panier')[i].img);
            const getStock = JSON.parse(localStorage.getItem('Panier')[i].stock);


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
    console.log("Le panier dans le LocalStorage est vide !");
}





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

        localStorage.setItem('Panier', JSON.stringify(panier));

        console.log(titleCart);
        console.log(priceCart);
        console.log(imgCart);

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


        //console.log(titleCart);
        //console.log(priceCart);
        //console.log(imgCart);
        /*
                switch (titleCart) {
                    case "UX/UI":
                        uxUI++;
                        localStorage.setItem('UX/UI', uxUI);
                        //stock.innerHTML = localStorage.getItem('UX/UI');
                        break;
                    case "PHP 8":
                        php++;
                        localStorage.setItem('php', php);
                        //stock.innerHTML = localStorage.getItem('php');
                        break;
                    case "React JS":
                        react++;
                        localStorage.setItem('react', react);
                        //stock.innerHTML = localStorage.getItem('react');
                        break;
                    case "Node JS":
                        node++;
                        localStorage.setItem('node', node);
                        //stock.innerHTML = localStorage.getItem('node');
                        break;
                    case "MySQL":
                        mySQL++;
                        localStorage.setItem('mySQL', mySQL);
                        //stock.innerHTML = localStorage.getItem('mySQL');
                        break;
                    default:
                        break;
                }
        */
    });
}


function removeFromCart(e) {
    let suppr = e.target.parentElement.parentElement;
    let supprAtttribute = suppr.querySelectorAll('td');

    switch (supprAtttribute[1].innerText) {
        case "UX/UI":
            uxUI--;
            localStorage.setItem('UX/UI', uxUI);
            break;
        case "PHP 8":
            php--;
            localStorage.setItem('php', php);
            break;
        case "React JS":
            react--;
            localStorage.setItem('react', react);
            break;
        case "Node JS":
            node--;
            localStorage.setItem('node', node);
            break;
        case "MySQL":
            mySQL--;
            localStorage.setItem('mySQL', mySQL);
            break;
        default:
            break;
    }
    suppr.remove();
}