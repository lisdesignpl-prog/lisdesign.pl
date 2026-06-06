//Przewijanie strony


let sections = document.querySelectorAll("section");
let currentIndex = 0;
let isScrolling = false;
let overlayOpen = false;

function scrollToSection(index) {
    if (index < 0 || index >= sections.length || isScrolling) return;

    isScrolling = true;
    currentIndex = index;

    sections[currentIndex].scrollIntoView({
        behavior: "smooth"
    });

    setTimeout(() => {
        isScrolling = false;
    }, 800);
}

// Kółko myszy

document.addEventListener("wheel", (event) => {
    if (overlayOpen || isScrolling) return;

    if (event.deltaY > 0 && currentIndex < sections.length - 1) {
        scrollToSection(currentIndex + 1);
    } else if (event.deltaY < 0 && currentIndex > 0) {
        scrollToSection(currentIndex - 1);
    }
});

// Swipe na telefonie

let touchStartY = 0;
let touchEndY = 0;
const swipeThreshold = 50;

document.addEventListener(
    "touchstart",
    (e) => {
        touchStartY = e.touches[0].clientY;
    },
    { passive: true }
);

document.addEventListener(
    "touchend",
    (e) => {
        if (overlayOpen || isScrolling) return;

        touchEndY = e.changedTouches[0].clientY;

        const deltaY = touchStartY - touchEndY;

        if (Math.abs(deltaY) < swipeThreshold) return;

        if (deltaY > 0 && currentIndex < sections.length - 1) {
            scrollToSection(currentIndex + 1);
        } else if (deltaY < 0 && currentIndex > 0) {
            scrollToSection(currentIndex - 1);
        }
    },
    { passive: true }
);

// Aktualizacja indeksu po kliknięciu menu

document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", (e) => {
        const targetSection = document.querySelector(
            e.currentTarget.getAttribute("href")
        );

        const targetIndex = Array.from(sections).indexOf(targetSection);

        if (targetIndex !== -1) {
            currentIndex = targetIndex;
        }
    });
});

// Synchronizacja aktualnej sekcji

window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;

    sections.forEach((section, index) => {
        if (
            scrollPosition >=
            section.offsetTop - window.innerHeight / 2
        ) {
            currentIndex = index;
        }
    });
});

// Zresetuj currentIndex, gdy klikniesz link w menu
document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", (e) => {
        let targetSection = document.querySelector(e.target.getAttribute("href"));
        let targetIndex = Array.from(sections).indexOf(targetSection);
        if (targetIndex !== -1) {
            currentIndex = targetIndex; // Zaktualizuj indeks po kliknięciu w menu
        }
    });
});


//Formularze


//Maska numeru
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', (e) => {
  let x = e.target.value.replace(/\D/g, '').slice(0, 10);
  e.target.value = x.replace(/(\d{3})(\d{3})(\d{0,4})/, function(_, a, b, c) {
    return c ? `${a}-${b}-${c}` : b ? `${a}-${b}` : a;
  });
});