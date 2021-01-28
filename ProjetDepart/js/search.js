let searchInput = document.querySelector('input');
let allCard = document.querySelectorAll('.course__item');
let allTitle = document.querySelectorAll('h4');

searchInput.addEventListener('keyup', function(e) {
    let input = searchInput.value;
    input.toLowerCase();
    for (let i = 0; i < allCard.length; i++) {
        if (allTitle[i].innerText.toLowerCase().includes(input)) {
            //console.log(allTitle[i].innerText);
            allCard[i].style.display = "block";
        }else{
            allCard[i].style.display = "none";
        }
        
    }
    //console.log(allCard);
});
