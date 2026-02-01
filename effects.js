function showPopUpController(){
    let btns = document.querySelectorAll('.btn')
    let PopUpController = document.querySelector('.popUpController')
    let popUpControllerContainer = document.querySelectorAll('.popUpControllerContainer')
    let searchContainer = document.querySelector('.searchPopUpController')
    let ticketsContainer = document.getElementById('ticketsPopUpController')
    let recentRidesContainer = document.getElementById('recentRidesPopUpController');
    let AIPopUpController = document.getElementById('AIPopUpController');
    let profile = document.getElementById('profile');
    btns.forEach((btn) => {
        btn.addEventListener('click', () => {
            let btnText = btn.querySelector('p');
            console.log(btnText.textContent)
            if(btnText.textContent == 'Search'){
                popUpControllerContainer.forEach((element) => {
                    element.style.display = 'none';
                });
                searchContainer.style.display = 'block';
            }
            if(btnText.textContent == 'Tickets'){
                popUpControllerContainer.forEach((element) => {
                    element.style.display = 'none';
                });
                ticketsContainer.style.display = 'block';
            }   
            if(btnText.textContent == 'Recent Rides'){
                popUpControllerContainer.forEach((element) => {
                    element.style.display = 'none';
                });
                recentRidesContainer.style.display = 'block';
            }
            if(btnText.textContent == 'AI Assistant'){
                popUpControllerContainer.forEach((element) => {
                    element.style.display = 'none';
                });
                AIPopUpController.style.display = 'block';
            }
            if(btnText.textContent == 'Profile'){
                popUpControllerContainer.forEach((element) => {
                    element.style.display = 'none';
                });
                profile.style.display = 'block';
            }
            PopUpController.classList.remove('closing');
            PopUpController.style.display = 'block';
        });
    });
}
showPopUpController();


function closePopUpController(){
    let closeBtn = document.getElementById('closeController');
    let PopUpController = document.querySelector('.popUpController');
    closeBtn.addEventListener('click', () => {
        PopUpController.classList.add('closing');
    });
    setTimeout(() => {
        PopUpController.style.display = 'none';
    }, 300);
}
closePopUpController();

function mobileClosePopUpController(){
    let positionBtn = document.querySelectorAll('.positionBtn');
    if (window.matchMedia("(max-width: 768px)").matches) {
        positionBtn.forEach(function(element){
            element.addEventListener('click', function(){
                closePopUpController();
            });
        });
        console.log("Lo schermo è inferiore o uguale a 768px");
    }
}
mobileClosePopUpController();

function closeBusController(){
    let closeBtn = document.getElementById('closeBusBoard');
    let busBoard = document.querySelector('.busBoard');
    let closeBtnMobile = document.getElementById('closeBtnMobile')
    closeBtn.addEventListener('click', () => {
        busBoard.style.display = 'none';
    });
    closeBtnMobile.addEventListener('click', () => {
        busBoard.style.display = 'none';
    });
}
closeBusController()

function showAutobusBanner(){
    let positionBtn = document.querySelectorAll('.positionBtn');
    let busBoard = document.querySelector('.busBoard');
    positionBtn.forEach((btn) => {
        btn.addEventListener('click', () => {   
            busBoard.style.display = 'flex';
        });
    });
}
showAutobusBanner()


function ticketPopUp(){
    let TicketContainers = document.querySelectorAll('.TicketContainer');
    let closeTicketButton = document.querySelector('.closeTicketButton')
    let ticketPopUp = document.querySelector('.ticketPopUp')
    TicketContainers.forEach((element)=>{
        element.addEventListener('click', () => {
            ticketPopUp.style.display = 'flex';
        });
    });
    closeTicketButton.addEventListener('click', () =>{
        ticketPopUp.style.display = 'none';
    });
}
ticketPopUp()

function redirectToPaymentPage(){
    let buyBtn = document.querySelectorAll('.buyBtn')
    buyBtn.forEach((element) => {
        element.addEventListener('click', () => {
            window.open("https://buy.stripe.com/test_8wMdSHfwLaL00G4eUU", "_blank");
        });
    });

    let buyTicket = document.getElementById('buyTicket')
    buyTicket.addEventListener('click', ()=> {
        window.open("https://buy.stripe.com/test_8wMdSHfwLaL00G4eUU", "_blank");
    });

    let buyBtnMobile = document.getElementById('buyBtnMobile')
    buyBtnMobile.addEventListener('click', ()=> {
        window.open("https://buy.stripe.com/test_8wMdSHfwLaL00G4eUU");
    });
}
redirectToPaymentPage()


function adsRedirect(){
    let adsPopUp = document.querySelector('.leaflet-popup-content')
    adsPopUp.addEventListener('click', ()=> {
        window.open("https://www.tripadvisor.it/Restaurant_Review-g1786906-d10096461-Reviews-The_Dixie_Pub-Latisana_Province_of_Udine_Friuli_Venezia_Giulia.html", "_blank");
    });
}

function popUpControllerCloseFn(){
    let PopUpController = document.querySelector('.popUpController');
    function noneDisplay(){
        PopUpController.style.display = 'none';
    }
    let TicketContainers= document.querySelectorAll('.TicketContainer');
    TicketContainers.forEach((element) => {
        element.addEventListener('click', () => {
            noneDisplay();
        });
    });
    let tickets = document.querySelectorAll('.TicketContainer')
    tickets.forEach((element) => {
        element.addEventListener('click', () => {
            noneDisplay();
        });
    });
}
popUpControllerCloseFn()