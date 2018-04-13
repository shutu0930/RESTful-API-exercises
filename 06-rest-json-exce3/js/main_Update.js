var weatherConditions = new XMLHttpRequest();
var weatherForecast = new XMLHttpRequest();
var googleLocation = new XMLHttpRequest();
var cObj;
var fObj;
var googleLocationURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=88 Pitt St, Sydney NSW 2000, Australia&key=AIzaSyCHbu9BRm91wYmf6dqqGbtjY5Ky3UTz1BA';
var conditionURL = 'http://api.wunderground.com/api/f029e46fd0232d12/geolookup/conditions/forecast/q/Australia/Sydney.json'
var forcastURL = 'http://api.wunderground.com/api/f029e46fd0232d12/geolookup/forecast10day/q/Australia/Sydney.json';
// GET THE CONDITIONS
function load(){
	var cityObj = document.getElementById('city');
	if(cityObj !== undefined && cityObj !== null){
		var city = document.getElementById('city').value;
	}
	if(city === '' || city === undefined) {
		city = 'Sydney'
	}
	var weatherConditionURL = 'http://api.wunderground.com/api/f029e46fd0232d12/geolookup/conditions/q/Australia/'+city+'.json';
	var weatherForecastURL = 'http://api.wunderground.com/api/f029e46fd0232d12/geolookup/forecast10day/q/Australia/'+city+'.json';
	
	weatherConditions.open('GET', weatherConditionURL, true);
	weatherConditions.responseType = 'text';
	weatherConditions.send(null);
	googleLocation.open('GET', googleLocationURL, true);
	console.log(googleLocation);
	
	googleLocation.responseType = 'text';
	googleLocation.send(null);
	console.log(googleLocation);

}

load();

weatherConditions.onload = function() {
	console.log(weatherConditions);
    if (weatherConditions.status === 200){
        cObj = JSON.parse(weatherConditions.responseText);
        console.log(cObj);
		document.getElementById('location').innerHTML = cObj.current_observation.display_location.full;
		document.getElementById('weather').innerHTML = cObj.current_observation.weather;
		document.getElementById('temperature').innerHTML = cObj.current_observation.temp_c + 'c';


    } //end if
}; //end function



googleLocation.onload = function() {
	console.log(googleLocation);
    if (googleLocation.status === 200){
        cObj = JSON.parse(googleLocation.responseText);
        console.log(cObj);
		document.getElementById('lat').innerHTML = cObj.results[0].geometry.location.lat;
		document.getElementById('lng').innerHTML = cObj.results[0].geometry.location.lng;


    } //end if
}; //end function

weatherForecast.onclick = function(){
	if(weatherForecast.status === 200){
		fObj=JSON.parse(weatherForecast.responseText);
		console.log(fObj);
		document.getElementById()
	}
}









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
