# TOP 5 PROBLEMÓW RESPONSYWNOŚCI - ROZWIĄZANIA CSS

## PROBLEM 1: overflow: hidden blokuje przewijanie
**Plik:** css/global.css, linia 13  
**Symptom:** Na telefonie treść się nie przewija

```css
/* USUŃ */
html, body {
    overflow: hidden;  ❌
}

/* ZAMIEŃ NA */
html, body {
    overflow-x: hidden;
    overflow-y: auto;
}
```

---

## PROBLEM 2: Input width 22rem - nie skaluje się na mobile
**Plik:** css/global.css, linia 139  
**Symptom:** Formularze za szerokie na telefonie (352px na 375px ekranu)

```css
/* USUŃ */
.inputField input, .inputField textarea {
    width: 22rem;  ❌
}

/* ZAMIEŃ NA */
.inputField input, .inputField textarea {
    width: clamp(16rem, 85vw, 22rem);
}
```

---

## PROBLEM 3: Popup galerii 50vw na mobile - nie zmieści się
**Plik:** css/logo_gallery.css, linia 85  
**Symptom:** Na telefonie popup ma 50% x 50% - niemożliwy do czytania

```css
/* USUŃ */
.gallery__popup-describe, .gallery__popup-logo {
    width: 50vw;  ❌
}

/* ZAMIEŃ NA */
.gallery__popup-describe, .gallery__popup-logo {
    width: 100vw;
}

@media (min-width: 768px) {
    .gallery__popup-describe, .gallery__popup-logo {
        width: 50vw;
    }
}
```

---

## PROBLEM 4: Contact sekcja - column-count i flex się nie mieszają
**Plik:** css/sections.css, linia 79  
**Symptom:** Na mobile dwie kolumny nie zwijają się w jedną

```css
/* USUŃ */
.contact {
    column-count: 2;  ❌
    flex-direction: row;
}

/* ZAMIEŃ NA */
.contact {
    flex-direction: column;
    height: auto;
}

@media (min-width: 768px) {
    .contact {
        flex-direction: row;
        height: calc(100vh - 3rem);
    }
}
```

---

## PROBLEM 5: Przyciski slidera 50px - za małe do dotyku
**Plik:** css/website_gallery.css, linia 49  
**Symptom:** Trudno kliknąć przycisk na telefonie (standard to 44x44px)

```css
/* USUŃ */
.slider__website-changer button {
    width: 50px;
    height: 50px;
}

/* ZAMIEŃ NA */
.slider__website-changer button {
    width: 50px;
    height: 50px;
    min-width: 44px;
    min-height: 44px;
}

@media (max-width: 480px) {
    .slider__website-changer button {
        width: 44px;
        height: 44px;
        font-size: 20px;
    }
    
    .slider__website-changer {
        top: 50%;
        left: 2%;
        width: 96%;
    }
}
```

---

## BONUS: Sekcje 100vh na małych ekranach
**Plik:** css/sections.css, linia 8

```css
/* DODAJ */
@media (max-height: 600px) {
    section {
        height: auto;
        min-height: 100vh;
    }
}
```
