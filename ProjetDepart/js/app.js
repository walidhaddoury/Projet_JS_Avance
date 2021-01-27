document.addEventListener('DOMContentLoaded', loadLocalStorage);

const cartButton = document.querySelectorAll('.add-to-cart'); // All buttons Add To Cart
const emptyCart = document.querySelector('#empty-cart');  // Button to reset Cart
const listCart = document.querySelector('#cart-table tbody'); // liste of product in Cart

const productsTitle = document.querySelectorAll('.course__item .info__card h4');
const productsImg = document.querySelectorAll('.course__item .course_img img');
const productsPrice = document.querySelectorAll('.course__item .info__card .discount')

//localStorage values
let uxUI = localStorage.getItem('UX/UI');
console.log(uxUI);
let php = localStorage.getItem('php');
console.log(php);
let react = localStorage.getItem('react');
console.log(react);
let node = localStorage.getItem('node');
console.log(node);
let mySQL = localStorage.getItem('mySQL');
console.log(mySQL);


for (let i = 0; i < cartButton.length; i++) {

    const titleCart = productsTitle[i].innerText;
    const priceCart = productsPrice[i].innerText;
    const imgCart = productsImg[i].getAttribute('src');


    cartButton[i].addEventListener('click', () => {

        const newProduct = document.createElement('tr');

        let imgProduct = document.createElement('td');
        let img = document.createElement('img');

        let titleProduct = document.createElement('td');

        let priceProduct = document.createElement('td');

        let removeProduct = document.createElement('a');
        removeProduct.addEventListener('click', removeFromCart);
        let imgRemove = document.createElement('img');

        let stock = document.createElement('td');

        img.setAttribute('src', productsImg[i].getAttribute('src'));
        imgProduct.appendChild(img);

        imgRemove.setAttribute('src', './img/fermer.svg');
        removeProduct.appendChild(imgRemove);

        titleProduct.innerHTML = titleCart;
        priceProduct.innerHTML = priceCart;


        //console.log(titleCart);
        //console.log(priceCart);
        //console.log(imgCart);

        switch (titleCart) {
            case "UX/UI":
                uxUI++;
                localStorage.setItem('UX/UI', uxUI);
                stock.innerHTML = localStorage.getItem('UX/UI');
                break;
            case "PHP 8":
                php++;
                localStorage.setItem('php', php);
                stock.innerHTML = localStorage.getItem('php');
                break;
            case "React JS":
                react++;
                localStorage.setItem('react', react);
                stock.innerHTML = localStorage.getItem('react');
                break;
            case "Node JS":
                node++;
                localStorage.setItem('node', node);
                stock.innerHTML = localStorage.getItem('node');
                break;
            case "MySQL":
                mySQL++;
                localStorage.setItem('mySQL', mySQL);
                stock.innerHTML = localStorage.getItem('mySQL');
                break;
            default:
                break;
        }

        if (uxUI < 1 || php < 1 || react < 1 || node < 1 || mySQL < 1) {
            newProduct.appendChild(imgProduct);
            newProduct.appendChild(titleProduct);
            newProduct.appendChild(priceProduct);
            newProduct.appendChild(stock);
            newProduct.appendChild(removeProduct);

            listCart.appendChild(newProduct);
        }

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

    console.log(e.target.parentElement.parentElement.innerText);


}