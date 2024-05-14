function searchCondition() {
  const input = document.getElementById('conditionInput').value.toLowerCase();
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '';

  fetch('./travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
      let items;
      if (data[input]) {
        items = data[input];
      } else if (input === 'beach') {
        const beaches = data.beaches;
        if (beaches) {
          items = beaches;
        }
      } else if (input === 'temple') {
        const temples = data.temples;
        if (temples) {
          items = temples;
        }
      } else {
        const country = data.countries.find(country => country.name.toLowerCase() === input);
        if (country) {
          items = country.cities;
        } else {
          resultDiv.innerHTML = 'Category or country not found.';
          return;
        }
      }

      if (items) {
        items.forEach(item => {
          resultDiv.innerHTML += `<h2 style="color: white;">${item.name}</h2>`;
          resultDiv.innerHTML += `<img src="${item.imageUrl}" alt="${item.name}">`;
          resultDiv.innerHTML += `<p style="color: white; font-size: 30px; font-weight: bold;">${item.description}</p>`;
        });
      } else {
        resultDiv.innerHTML = 'Not found.';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      resultDiv.innerHTML = 'An error occurred while fetching data.';
    });
}

const btnSearch = document.getElementById('btnSearch');
btnSearch.addEventListener('click', searchCondition);

// Obtiene una referencia al contenedor de resultados
const resultDiv = document.getElementById('search-results');

// Agrega un evento 'click' al botón 'Clear' para limpiar los resultados mostrados
document.getElementById('btnClear').addEventListener('click', function() {
  // Establece el contenido del contenedor de resultados como una cadena vacía
  resultDiv.innerHTML = '';
});
