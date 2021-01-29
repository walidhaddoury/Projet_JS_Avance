const divAllCard = document.querySelector('.courses__container')

const COURSES = {
  1: { id: 1, img: 'ux_ui.jpg', title: 'UX/UI', initial_price: 200, price: 9.99, mark: 4, stock: 10 },
  2: { id: 2, img: 'php_8.png', title: 'PHP 8', initial_price: 200, price: 9.99, mark: 3, stock: 10 },
  3: { id: 3, img: 'react_js.png', title: 'React JS', initial_price: 200, price: 9.99, mark: 2, stock: 5 },
  4: { id: 4, img: 'node_js.jpg', title: 'Node JS', initial_price: 200, price: 9.99, mark: 5, stock: 3 },
  5: { id: 5, img: 'my_sql.png', title: 'MySQL', initial_price: 200, price: 9.99, mark: 4, stock: 2 }
}

Object.keys(COURSES).forEach(key => {

  let id = COURSES[key].id;
  let img = COURSES[key].img;
  let title = COURSES[key].title;
  let initial_price = COURSES[key].initial_price;
  let price = COURSES[key].price;
  let mark = COURSES[key].mark;
  let stock = COURSES[key].stock;

  
  let divClassCourseItem = document.createElement('div');
  divClassCourseItem.className = "course__item";

  // FIGURE WITH COURSE IMG
  let figureClassImg = document.createElement('figure');
  figureClassImg.className = "course_img";

  let imgCourse = document.createElement('img');
  imgCourse.src = `img/courses/${img}`;
  figureClassImg.appendChild(imgCourse);


  // DIV INFO CARD
  let divInfoCard = document.createElement('div');
  divInfoCard.className = "info__card";


  // TITLE OF CARD
  let h4 = document.createElement('h4');
  h4.innerHTML = title;


  // FIGURE WITH COURSE RATE
  let figureClassMark = document.createElement('figure');
  figureClassMark.className = `mark m_${mark}`;

  let imgRate = document.createElement('img');
  imgRate.src = "img/rates.png";
  figureClassMark.appendChild(imgRate);


  // SPAN PRICE AND DISCOUNT
  let pPrice = document.createElement('p');
  let spanPrice = document.createElement('span');
  spanPrice.className = "price";
  spanPrice.innerText = `${initial_price} €`;

  let spanDiscount = document.createElement('span');
  spanDiscount.className = "discount";
  spanDiscount.innerText = `${price} €`;
  pPrice.appendChild(spanPrice);
  pPrice.appendChild(spanDiscount);


  // P WITH STOCK NUMBER
  let pStock = document.createElement('p');
  pStock.innerText = "Disponible: ";
  let spanStock = document.createElement('span');
  spanStock.className = "stock";
  spanStock.innerText = stock;
  pStock.appendChild(spanStock);


  // BUTTON TO ADD IN CART
  let buttonAdd = document.createElement('a');
  buttonAdd.setAttribute('href', '#');
  buttonAdd.setAttribute('data-id', id);
  buttonAdd.className = "add-to-cart";
  buttonAdd.innerHTML += '<i class="fa fa-cart-plus"></i> Ajouter au panier';


  divInfoCard.appendChild(h4);
  divInfoCard.appendChild(figureClassMark);
  divInfoCard.appendChild(pPrice);
  divInfoCard.appendChild(pStock);
  divInfoCard.appendChild(buttonAdd);

  divClassCourseItem.appendChild(figureClassImg);
  divClassCourseItem.appendChild(divInfoCard);

  divAllCard.appendChild(divClassCourseItem);

});