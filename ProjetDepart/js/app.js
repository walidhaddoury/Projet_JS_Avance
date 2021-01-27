const cartButton = document.querySelectorAll('.add-to-cart');
const emptyCart = document.querySelector('#empty-cart');
let cartTable = document.querySelector('#cart-table tbody');
let productH4 = document.querySelectorAll('h4');


cartButton.forEach(function(buttonAdd){
    buttonAdd.addEventListener('click', test);
});



// fonction de test
function test(e){

    let clickAdd = e.target;
    let dataButton = clickAdd.getAttribute('data-id');
    addToCart(dataButton);


    //console.log("coucou je suis la");
    //console.log(clickAdd);
}

function addToCart(buttonId){
    let newProduct = document.createElement('tr');
    let img = document.createElement('img');
    let quantité = document.createElement('p');
    switch (buttonId) {
        case "1":
            newProduct.innerHTML = productH4[buttonId - 1].innerHTML;
            img.setAttribute('src', 'img/courses/ux_ui.jpg')
            console.log("TEST");
            break;
        case "2":
            newProduct.textContent = `Produit : ${productH4[buttonId - 1].innerHTML}`;
            break;
        case "3":
            newProduct.textContent = `Produit : ${productH4[buttonId - 1].innerHTML}`;
            break;
        case "4":
            newProduct.textContent = `Produit : ${productH4[buttonId - 1].innerHTML}`;
            break;
        case "5":
            newProduct.textContent = `Produit : ${productH4[buttonId - 1].innerHTML}`;
            break;
        default:
            console.log("C PT");
            break;
    }

    cartTable.appendChild(newProduct);
}