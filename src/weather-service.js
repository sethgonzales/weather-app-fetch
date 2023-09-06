//This file holds our connection to the API

export default class WeatherService {  //create WeatherService class to interact with API
  static getWeather(city) { //call this method on the class itself without creating a new instance, just retrieve data.
    return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`) //use fetch to find the url of the api and enter our key so we can make requests
      .then(function(response) { //then... once fetch has successfully completed, the response that is given by the api status is checked
        if (!response.ok) { //if NOT okay...
          const errorMessage = `${response.status} ${response.statusText}`; //create a variable for the error status message
          throw new Error(errorMessage); //throw a new Error including the error message, and stop what we are doing.
        } else {
          return response.json(); //if everything is okay, response.json will parse the api object into JSON lang 
        }
      })      //end of the '.then' block

      .catch(function(error) { //If there is an error read, this will "catch" the error that was "thrown" and will handle the error
        return error; //return the error object
      });
  }
}