import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// Business Logic

function getWeather(city) { //run function to access api and create an instance of the code
  let request = new XMLHttpRequest(); //new instance of the api requested
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`; //url for calling the api and entering api key

  request.addEventListener("loadend", function() { //listener function for once the api has loaded
    const response = JSON.parse(this.responseText); //api is a JSON like object. parse the object to be in actual JS lang
    if (this.status === 200) { //code 200 means OK. If okay, then go to function to give results
      printElements(response, city);
    } else { //if not okay, go to the function to print and error
      printError(this, city);
    }
  });

  request.open("GET", url, true); //"open" the api request, telling it we need to GET information from the url, and that this api is async in our application
  request.send(); //send the request
}

// UI Logic

function printElements(apiResponse, city) { //when the api is called correctly, we get this result
  document.querySelector('#showResponse').innerText = `The humidity in ${city} is ${apiResponse.main.humidity}%.
  The temperature in Kelvins is ${apiResponse.main.temp} degrees.`; //object literals like ${city} are used to place parameters and data that is passed through the function.
}

function handleFormSubmission(event) { //gets the form information to pass through the api, and gather info on the desired choices
  event.preventDefault();
  const city = document.querySelector('#location').value;
  document.querySelector('#location').value = null;
  getWeather(city); //once info is gathered, run the function that processes the info through the api
}

function printError(request, city) { //instructions for what to do when an error happens
  document.querySelector('#showResponse').innerText = `There was an error accessing the weather data for ${city}:  ${request.status} ${request.statusText}`; //status and statusText are properties of the api object. Will give generic info as to what is happening
}

function checkNumber(number) { //try...catch to see if we have an invalid entry given by the user
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
