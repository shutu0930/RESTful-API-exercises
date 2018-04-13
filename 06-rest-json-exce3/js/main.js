var weatherConditions = new XMLHttpRequest();
var weatherForecast = new XMLHttpRequest();
var googleCurrentLocation = new XMLHttpRequest();
var cObj;
var fObj;
var googleGeocodeApiKey = 'AIzaSyB922aJ0vyLn5ggNzvBkSiFTOUrvh5qV8A';

var autocomplete; //autocomplete object
var componentForm = {
	locality: 'long_name'
};

function load(){


	var city = document.getElementById('city').value;
	if(city === ''){ //if no city typed
		city = 'Sydney';
	}
	loadWeatherByCityName(city);

}
// GET THE CONDITIONS
load();



//get the lat and lon of the city
googleCurrentLocation.onload = function(){
	if(googleCurrentLocation.status === 200){
		cObj = JSON.parse(googleCurrentLocation.responseText);
		
		document.getElementById('lat').innerHTML = cObj.results[0].geometry.location.lat;
		document.getElementById('lng').innerHTML = cObj.results[0].geometry.location.lng;
	}//end if
};


//get current weather condition
weatherConditions.onload = function(){
	if(weatherConditions.status === 200){
		cObj = JSON.parse(weatherConditions.responseText);
		document.getElementById('location').innerHTML = cObj.current_observation.display_location.full;
		document.getElementById('weather').innerHTML = cObj.current_observation.weather;
		document.getElementById('temperature').innerHTML = cObj.current_observation.temp_c + '℃';
		

	}//end if
};

//get weather forecast in 5 days
weatherForecast.onload = function(){
	if(weatherForecast.status === 200){
		fObj = JSON.parse(weatherForecast.responseText);
		document.getElementById('desc').innerHTML = fObj.forecast.txt_forecast.forecastday[0].fcttext_metric;
		var dayNum = 5;
		var itemNum = 4;
		for(var i=1; i<=dayNum; i++){
			document.getElementById('r'+i+'c1').innerHTML = fObj.forecast.simpleforecast.forecastday[i].date.weekday;
			document.getElementById('r'+i+'c2').src = fObj.forecast.simpleforecast.forecastday[i].icon_url;
			document.getElementById('r'+i+'c3').innerHTML = fObj.forecast.simpleforecast.forecastday[i].high.celsius;
			document.getElementById('r'+i+'c4').innerHTML = fObj.forecast.simpleforecast.forecastday[i].low.celsius;
			
		}
		
		
	}//end if
};


function initAutocomplete() {
	// Create the autocomplete object, restricting the search to geographical
	// location types.
	autocomplete = new google.maps.places.Autocomplete(
		/** @type {!HTMLInputElement} */(document.getElementById('city')),
		{types: ['(cities)']});
  
	// When the user selects an address from the dropdown, populate the weather details of the selected city
	autocomplete.addListener('place_changed', fillInWeather);
  }

  function fillInWeather(){
	  var city = autocomplete.getPlace().address_components[0][componentForm.locality];
	  loadWeatherByCityName(city);
  }

  //fill weather by city name
  function loadWeatherByCityName(city){
	//var city = document.getElementById('city').value;
	if(city === '' || city === undefined){ //if no city typed
		city = 'Sydney';
	}
	
	//APIs
	var googleLocationURL = 'https://maps.googleapis.com/maps/api/geocode/json?address='+ city + '&key=' + googleGeocodeApiKey;
	var conditionURL = 'http://api.wunderground.com/api/f029e46fd0232d12/geolookup/conditions/forecast/q/Australia/'+ city +'.json'
	var forcastURL = 'http://api.wunderground.com/api/f029e46fd0232d12/geolookup/forecast10day/q/Australia/'+ city +'.json';
	

	googleCurrentLocation.open('GET', googleLocationURL, true);
	googleCurrentLocation.responseType = 'text';
	googleCurrentLocation.send();

	weatherConditions.open('GET', conditionURL, true);
	weatherConditions.responseType = 'text';
	weatherConditions.send();

	weatherForecast.open('GET', forcastURL, true);
	weatherForecast.responseType = 'text';
	weatherForecast.send();
  }

  loadWeatherByCityName('Sydney');

//http://api.wunderground.com/api/f029e46fd0232d12/geolookup/conditions/forecast/q/Australia/Sydney.json

// GET THE FORECARST
/*
weatherForecast.open('', '', true);
weatherForecast.responseType = 'text';
weatherForecast.send();

weatherForecast.onload = function() {
if (weatherForecast.status === 200){
	fObj = JSON.parse(weatherForecast.responseText);
	console.log(fObj);

} //end if
}; //end function
*/
