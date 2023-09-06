import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// Business Logic

function getWeather(city) {
  let request = new XMLHttpRequest();
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;

  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printElements(response, city);
    } else {
      printError(this, city);
    }
  });

  request.open("GET", url, true);
  request.send();
}

// UI Logic

function printElements(apiResponse, city) {
  document.querySelector('#showResponse').innerText = `The humidity in ${city} is ${apiResponse.main.humidity}%.
  The temperature in Kelvins is ${apiResponse.main.temp} degrees.`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const city = document.querySelector('#location').value;
  document.querySelector('#location').value = null;
  getWeather(city);
}

function printError(request, city) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the weather data for ${city}:  ${request.status} ${request.statusText}`;
}

function checkNumber(number) {
  if (isNaN(number) || number < 0) {
    throw "Not a valid number!";
  } else {
    document.querySelector('#displayNumber').innerText = "This number is valid. You may continue.";
  }
}

window.addEventListener("load", function() {
  document.querySelector('#submittedNumber').addEventListener("submit", function(event) {
    event.preventDefault();

    const inputtedNumber = parseInt(document.querySelector('#number').value);
    document.querySelector('#number').value = null;

    try {
      checkNumber(inputtedNumber);
    } catch(error) {
      console.error(`Red alert! We have an error: ${error.message}`);
    } 
  });
});

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});
