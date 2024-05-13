const url = 'travel_recommendation_api.json';

fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data); // Log the JSON data to the console
    // Use the data to display recommendations or perform other operations
  })
  .catch(error => {
    console.error('There was a problem with your fetch operation:', error);
  });
