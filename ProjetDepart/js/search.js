let searchInput = document.querySelector('input');
let allTitle = document.querySelectorAll('h4');
let allCard = document.querySelectorAll('.course__item');
let hidden = document.querySelector('#no_course');

searchInput.addEventListener('keyup', function(e) {
    let input = searchInput.value;
    input.toLowerCase();

    let count = 0;
    for (let i = 0; i < allCard.length; i++) {
        if (allTitle[i].innerText.toLowerCase().includes(input)) {
            allCard[i].style.display = "block";
        }else{
            allCard[i].style.display = "none";
            count++;
            
        }
    }
    if (count === allCard.length){
        hidden.className = "pop";
    }
    else {
        hidden.className = "hidden";
    }
});
