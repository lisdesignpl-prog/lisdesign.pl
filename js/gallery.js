// ✅ Ładowanie galerii + scroll + popup w jednym miejscu

fetch('logo_gallery.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('gallery__logo-container').innerHTML = data;

    const logoGallery = document.querySelector('.gallery__logo-list');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    const item = logoGallery.querySelector('.gallery__logo-item');

    // Poprawne wyliczanie całkowitej szerokości elementu (z marginami)
    const itemStyle = getComputedStyle(item);
    const itemMargin = parseInt(itemStyle.marginLeft) + parseInt(itemStyle.marginRight);
    const itemWidth = item.offsetWidth + itemMargin;

    // Oryginalne elementy
    const originalItems = Array.from(logoGallery.children);

    // Klonujemy na koniec
    originalItems.forEach(el => {
      const clone = el.cloneNode(true);
      logoGallery.appendChild(clone);
    });

    // Klonujemy na początek (odwrócone)
    originalItems.slice().reverse().forEach(el => {
      const clone = el.cloneNode(true);
      logoGallery.insertBefore(clone, logoGallery.firstChild);
    });

    // Obliczamy długość oryginalnej sekwencji
    const scrollResetPoint = itemWidth * originalItems.length;

    // Ustawiamy scroll na środek (początek oryginalnej sekwencji)
    logoGallery.scrollLeft = scrollResetPoint;

    // Scrollowanie przyciskami
    prevBtn.addEventListener('click', () => {
      logoGallery.scrollLeft -= itemWidth;
    });

    nextBtn.addEventListener('click', () => {
      logoGallery.scrollLeft += itemWidth;
    });

    // Automatyczne przewijanie bez przeskoków
    let scrollSpeed = 1;

    function autoScrollLoop() {
      logoGallery.scrollLeft += scrollSpeed;

      if (logoGallery.scrollLeft >= scrollResetPoint * 2) {
        // Przeskoczyliśmy za oryginalną sekwencję – wracamy na środek
        logoGallery.scrollLeft = scrollResetPoint;
      }

      if (logoGallery.scrollLeft <= 0) {
        // Za bardzo w lewo – też wracamy na środek
        logoGallery.scrollLeft = scrollResetPoint;
      }

      requestAnimationFrame(autoScrollLoop);
    }

    autoScrollLoop(); // start




// Klikanie w logo - otwieranie popupu
    logoGallery.addEventListener('click', function (event) {
      const clickedItem = event.target.closest('.gallery__logo-item');
      if (!clickedItem) return;

      const description = clickedItem.dataset.description;
      const imageSrc = clickedItem.dataset.image;

      openPopup(description, imageSrc);
    });
  })
  .catch(error => {
    console.error('Błąd wczytywania galerii:', error);
    alert('Błąd ładowania galerii – sprawdź konsolę');
  });




  
// ✅ POPUP

    
    function openPopup(description, imageSrc) { // Open popup with img
      
      const popup = document.getElementById('popup');  // Pobieramy element popupu z DOM
      const popupDescription = popup.querySelector('.gallery__popup-describe');  // Szukamy miejsca na opis w popupie
      const popupLogo = popup.querySelector('.gallery__popup-logo'); // Szukamy miejsca na obrazek/logo w popupie


      popupDescription.textContent = description;  // Wstawiamy tekst opisu do odpowiedniego miejsca
      popupLogo.innerHTML = `<img src="${imageSrc}" alt="Logo">`;  // Wstawiamy obrazek jako HTML (może mieć src z linkiem i alt)
      popup.classList.add('gallery__popup-active');   // Pokazujemy popup – dodajemy klasę aktywującą widoczność
      window.addEventListener('keydown', closePopupOnEsc); // Nasłuchujemy klawisza ESC, żeby użytkownik mógł zamknąć popup z klawiatury
    }


    function closePopup() { // Close popup y Click
      const popup = document.getElementById('popup'); // Ponownie pobieramy popup
      popup.classList.remove('gallery__popup-active'); // Usuwamy klasę, która go pokazuje, czyli ukrywamy popup
    }


    function closePopupOnEsc(event) { // Close popup by ESC

      if (event.key === 'Escape') { // Sprawdzamy, czy wciśnięty klawisz to Escape
        closePopup(); // Jeśli tak, to zamykamy popup
      }
    }


