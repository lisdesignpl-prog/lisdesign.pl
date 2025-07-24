// Klikniecie - otwarcie menu / zamknięcie menu V
// Otwieranie menu - animacja ikony
// Otwieranie menu - animacja panelu
// Wybranie pozycji > Klikniecie > Przerzucenie do odpowiedniej podstrony > Zamknięcie menu

// Sprawdzanie, w której zakładce obecnie jest użytkownik > podświetlenie odpowiedniej pozycji menu


const burger = document.getElementById('burger'); 
const panel = document.getElementById('navigation-list'); //wyszukaj element przez id

    burger.addEventListener('click', () => {
        
        burger.classList.toggle('burger-animation'); //dodaj klasę css
        panel.classList.toggle('navigation--active'); //dodaj klasę css
    });

//https://codepen.io/Bilal1909/pen/KKdrmRP  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<Animacja do podmianyS

/*const burger = document.getElementById('burger'); 
const panel = document.getElementById('navigation-list'); //wyszukaj element przez id

    burger.addEventListener('click', () => {

        if( burger.classList.contains('burger-animation')){          //zawiera klasę?
            burger.classList.remove('burger-animation');            //tak, usuń 
            burger.classList.add('burger-animation-reverse');       // i dodaj nową
        
            panel.classList.contains('navigation--active');
            panel.classList.remove('navigation--active');
            panel.classList.add('navigation--active-reverse');
        
        }

        else{
            burger.classList.add('burger-animation');       // nie, dodaj otwierającą

            panel.classList.add('navigation--active');

        }

    });*/



