// ✅ Ładowanie galerii + scroll + popup w jednym miejscu
fetch('logo_gallery.html')
  .then(response => response.text())
  .then(data => {
    const container = document.getElementById('gallery__logo-container');
    container.innerHTML = data;

    const logoGallery = container.querySelector('.gallery__logo-list');
    const prevBtn = container.querySelector('.prev-btn');
    const nextBtn = container.querySelector('.next-btn');

    const item = logoGallery.querySelector('.gallery__logo-item');

    // Tworzymy klon listy dla efektu nieskończonej karuzeli
    const clone = logoGallery.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true'); // ukrywamy dla screen-readerów
    clone.classList.add('gallery__logo-list-clone'); // opcjonalnie osobna klasa
    logoGallery.after(clone); // wstawiamy klon zaraz po oryginale, w tej samej linii

    // Poprawne wyliczanie całkowitej szerokości elementu (z marginami)
    const itemStyle = getComputedStyle(item);
    const itemMargin = parseInt(itemStyle.marginLeft) + parseInt(itemStyle.marginRight);
    const itemWidth = item.offsetWidth + itemMargin;

    // Scrollowanie przyciskami
    prevBtn.addEventListener('click', () => {
      container.scrollLeft -= itemWidth;
    });

    nextBtn.addEventListener('click', () => {
      container.scrollLeft += itemWidth;
    });

    // Klikanie w logo - otwieranie popupu
    container.addEventListener('click', function (event) {
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



  
// POPUP
function openPopup(description, imageSrc) {
  overlayOpen = true;

  const popup = document.getElementById('popup');
  const popupDescription = popup.querySelector('.gallery__popup-describe');
  const popupLogo = popup.querySelector('.gallery__popup-logo');

  popupDescription.innerHTML = description;
  popupLogo.innerHTML = `<img src="${imageSrc}" alt="Logo">`;
  popup.classList.add('gallery__popup-active'); 

  window.addEventListener('keydown', closePopupOnEsc);
}

function closePopup() {
  overlayOpen = false;
  
  const popup = document.getElementById('popup');
  popup.classList.remove('gallery__popup-active');

}

function closePopupOnEsc(event) {
  if (event.key === 'Escape') closePopup();
}