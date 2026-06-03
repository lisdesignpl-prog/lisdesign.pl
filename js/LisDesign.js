//Przewijanie strony

let sections = document.querySelectorAll("section");
let currentIndex = 0;
let isScrolling = false;

function scrollToSection(index) {
    if (index < 0 || index >= sections.length || isScrolling) return;
    isScrolling = true;
    currentIndex = index; // Ustawienie nowego indeksu
    sections[currentIndex].scrollIntoView({ behavior: "smooth" });

    setTimeout(() => {
        isScrolling = false;
    }, 800); // Blokada na czas animacji przewijania
}

document.addEventListener("wheel", (event) => {
    if (isScrolling) return;

    if (event.deltaY > 0 && currentIndex < sections.length - 1) {
        scrollToSection(currentIndex + 1);
    } else if (event.deltaY < 0 && currentIndex > 0) {
        scrollToSection(currentIndex - 1);
    }
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