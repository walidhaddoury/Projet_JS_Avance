let searchInput = document.querySelector('input');
let allTitle = document.querySelectorAll('h4');

searchInput.addEventListener('keyup', function(e) {
    let allCard = document.querySelectorAll('.course__item');
    let hidden = document.querySelector('#no_course');

    let input = searchInput.value;
    input.toLowerCase();

    for (let i = 0; i < allCard.length; i++) {
        if (allTitle[i].innerText.toLowerCase().includes(input)) {
            allCard[i].style.display = "block";
        }else{
            allCard[i].style.display = "none";
            
        }
        if (allCard.length){
            hidden.className = "pop";
        }
    }

});
