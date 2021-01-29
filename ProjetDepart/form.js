let inpName = document.querySelector('.name');
let inpFName = document.querySelector('.lastName');
let inpAdress = document.querySelector('.adresse');
let inpMail = document.querySelector('.mail');
let inpPhone = document.querySelector('.phone');
let inpCreditCard = document.querySelector('.carteBancaire');
let validateButton = document.querySelector('#submit');
let errorText = document.querySelectorAll("p");
let endSpan = document.querySelector('#ok')

inpFName.addEventListener('input', function(e) { 
    let input = inpFName.value;
    if (input != "") {
        errorText[0].style.display = "none";
    }else{
        errorText[0].style.display = "block";
    }
});

inpName.addEventListener('input', function(e) { 
    let input = inpName.value;
    if (input != "") {
        errorText[1].style.display = "none";
    }else{
        errorText[1].style.display = "block";
    }
});

inpAdress.addEventListener('input', function(e) { 
    let input = inpAdress.value;
    if (input != "") {
        errorText[2].style.display = "none";
    }else{
        errorText[2].style.display = "block";
    }
});

inpMail.addEventListener('input', function(e) { 
    let input = inpMail.value;
    
    if (input.includes("@")) {


        mailArray = input.split("@");

        if (mailArray[0]==="") {
            errorText[3].style.display = "block";
        }else{
            if (mailArray[1].includes(".")) {
                extensionArray = mailArray[1].split(".")
                if (extensionArray[0]==="" || extensionArray[1] ==="") {
                    errorText[3].style.display = "block";
                }else{
                    errorText[3].style.display = "none";
    
                }
            }else{
                errorText[3].style.display = "block";
            }
        }
    }else{
        errorText[3].style.display = "block";

    }

});

inpPhone.addEventListener('input', function(e) { 
    let input = inpPhone.value;
    if (isNaN(input)===false) {
        if (input.length !=9 || input ==="") {
            errorText[4].style.display = "block"
        }else{
            errorText[4].style.display = "none"
        }
    }else{
        errorText[4].style.display = "block";
    }
});

inpCreditCard.addEventListener('input', function(e) { 
    let input = inpCreditCard.value;
    if (isNaN(input)===false) {
        if (input.length != 15 || input ==="") {
            errorText[5].style.display = "block"
        }else{
            errorText[5].style.display = "none"
        }
    }else{
        errorText[5].style.display = "block";
    }
});

validateButton.addEventListener('click', function(e) {
    errorText.forEach(element => {
        if(element.style.display ==="block"){
            endSpan.style.display = "block"
        }
        if(endSpan.style.display != 'block'){
        window.location.href = "oui.html"
        }
    });


})