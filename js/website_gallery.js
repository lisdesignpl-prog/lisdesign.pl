/* ================= FETCH ================= */

fetch('website_gallery.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('slider__website-container').innerHTML = data;
    initSlider();
  })
  .catch(err => console.error(err));


/* ================= SLIDER ================= */

function initSlider() {

    const list = document.querySelector('.slider__website-list');
    let items = document.querySelectorAll('.slider__website-item');
    const next = document.getElementById('slider__website-next');
    const prev = document.getElementById('slider__website-prev');

    /* ===== CLONES (INFINITE) ===== */

    const firstClone = items[0].cloneNode(true);
    const lastClone  = items[items.length - 1].cloneNode(true);

    list.appendChild(firstClone);
    list.prepend(lastClone);

    items = document.querySelectorAll('.slider__website-item');

    let active = 1;

    list.style.left = -items[active].offsetLeft + 'px';

    const lengthItems = items.length - 1;

    /* ===== BUTTONS ===== */

    next.onclick = moveNext;
    prev.onclick = movePrev;

    function moveNext() {
        active++;
        reloadSlider();
    }

    function movePrev() {
        active--;
        reloadSlider();
    }

    /* ===== DOTS ===== */

    const dotsContainer = document.querySelector('.dots');
    dotsContainer.innerHTML = '';

    for (let i = 0; i < items.length - 2; i++) {
        const li = document.createElement('li');
        dotsContainer.appendChild(li);
    }

    const dots = document.querySelectorAll('.dots li');
    dots[0].classList.add('active');

    dots.forEach((dot, index) => {
        dot.onclick = () => {
            active = index + 1;
            reloadSlider();
        }
    });

    function updateDots() {
        dots.forEach(dot => dot.classList.remove('active'));

        let dotIndex = active - 1;

        if (dotIndex < 0) dotIndex = dots.length - 1;
        if (dotIndex >= dots.length) dotIndex = 0;

        dots[dotIndex].classList.add('active');
    }

    /* ===== SWIPE ===== */

    let startX = 0;
    const swipeThreshold = 60;

    list.addEventListener('pointerdown', e => {
        startX = e.clientX;
    });

    list.addEventListener('pointerup', e => {
        const diff = startX - e.clientX;
        if (Math.abs(diff) > swipeThreshold) {
            diff > 0 ? moveNext() : movePrev();
        }
    });

    /* ===== KEYBOARD ===== */

    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight') moveNext();
        if (e.key === 'ArrowLeft') movePrev();
    });

    /* ===== RELOAD (HEART) ===== */

    function reloadSlider() {

        list.style.transition = "1s";
        list.style.left = -items[active].offsetLeft + 'px';

        list.addEventListener('transitionend', () => {

            if (active === 0) {
                list.style.transition = "none";
                active = items.length - 2;
                list.style.left = -items[active].offsetLeft + 'px';
            }

            if (active === items.length - 1) {
                list.style.transition = "none";
                active = 1;
                list.style.left = -items[active].offsetLeft + 'px';
            }

            updateDots();

        }, { once: true });
    }
}