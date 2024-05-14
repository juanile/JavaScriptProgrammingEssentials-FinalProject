function searchCondition() {
  const input = document.getElementById('conditionInput').value.toLowerCase();
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '';

  fetch('./travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
      const category = input.trim().toLowerCase(); // Convertir la entrada a minúsculas y eliminar espacios en blanco
      const items = data[category]; // Obtener los elementos de la categoría especificada

      if (items) {
        items.forEach(item => {
          resultDiv.innerHTML += `<h2>${item.name}</h2>`;
          resultDiv.innerHTML += `<img src="${item.imageUrl}" alt="${item.name}">`;
          resultDiv.innerHTML += `<p>${item.description}</p>`;
        });
      } else {
        resultDiv.innerHTML = 'Category not found or no items in category.';
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
