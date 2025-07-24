/*Kod pobierający karuzelę na główną*/

fetch('carusel.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('carusel__website-container').innerHTML = data;
    })
    .catch(error => console.error('Błąd wczytywania galerii:', error));




