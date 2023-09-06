import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import WeatherService from './weather-service.js'; //import the WeatherService class

// Business Logic

function getWeather(city) { //function to gather city information from the api. Is called after form is submitted with city data.
  WeatherService.getWeather(city) //dot notation to find the city data from the api 
    .then(function(response) { //promise chain... Waits for api response... then runs a function passing through the response
      if (response.main) { //if the response data has a property called "main"...
        printElements(response, city); //then we call on this method to show the weather
      } else { //if it does not have this property...
        printError(response, city); //we call on this method to show the error
      }
    });
}

// UI Logic

function printElements(response, city) { //shows what we need to print on the screen when giving the weather data.
  document.querySelector('#showResponse').innerText = `The humidity in ${city} is ${response.main.humidity}%.
  The temperature in Kelvins is ${response.main.temp} degrees.`; //can also use .innerHTML to create new html formatting from JS.
}

function printError(error, city) { //shows what we need to print on the screen if an error happens
  document.querySelector('#showResponse').innerText = `There was an error accessing the weather data for ${city}: 
  ${error}.`;
}
 
function handleFormSubmission(event) { //gathers data from the form event and resets the form entries
  event.preventDefault();
  const city = document.querySelector('#location').value;
  document.querySelector('#location').value = null;
  getWeather(city); //calls on the getWeather function, passing in the city taken in from the form
}

window.addEventListener("load", function() { //event listeners
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});