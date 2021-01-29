let searchInput = document.querySelector('input');
let allCard = document.querySelectorAll('.course__item');
let allTitle = document.querySelectorAll('h4');
let hidden = document.querySelector('#no_course');


searchInput.addEventListener('keyup', function(e) {
    let input = searchInput.value;
    input.toLowerCase();
    for (let i = 0; i < allCard.length; i++) {
        if (allTitle[i].innerText.toLowerCase().includes(input)) {
            allCard[i].style.display = "block";
            hidden.style.display = "none";
            break;
        }else{
            allCard[i].style.display = "none";
            
        }
        hidden.style.display = "block";
    }
});
