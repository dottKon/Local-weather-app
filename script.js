
//SKYCONS
var skycons = new Skycons();
skycons.add("animated-icon", Skycons.CLEAR_DAY);

//LOADING
document.getElementById("city").innerHTML = "Calling NASA to answer this question..."

skycons.play();
//getting the location
var xhr = new XMLHttpRequest();
xhr.open("GET", "http://ip-api.com/json", true);
xhr.onload = function (e) {
	if (xhr.readyState === 4) {
		if (xhr.status === 200) {
			ipJson = xhr.responseText;
			var rawJson = JSON.stringify(ipJson);
			var json = JSON.parse(ipJson);
			var lat = json.lat;
			var lon = json.lon;
			//let's go AJAX here 
			$.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=" + "3a78646de7f08f75f7932a6e389f1cb6", function (data) {
				var rawJson = JSON.stringify(data);
				var json = JSON.parse(rawJson);
				var status = json.weather[0].main;
				temperatura();
				ikona();

				function temperatura() {
					var temper = json.main.temp;
					var celcius = temper - 273.15;
					var fahren = temper * 9/5 - 459.67;
					document.getElementById("temperature").innerHTML = parseInt(celcius) +"&#176;" + "C";
					var town = json.name;
					document.getElementById("city").innerHTML = "As far as I know, you are located in ";
					document.getElementById("city2").innerHTML = town;
					document.getElementById("change").innerHTML = "Change to Fahrenheit";
					document.getElementById("change").onclick = function unit() {
						if (document.getElementById("change").innerHTML == "Change to Fahrenheit") {
						document.getElementById("change").innerHTML = "Change to Celcius";
						document.getElementById("temperature").innerHTML = parseInt(fahren) +"&#176;" + "F";
						} else { document.getElementById("change").innerHTML = "Change to Fahrenheit";
							document.getElementById("temperature").innerHTML = parseInt(celcius) +"&#176;" + "C";

						}

					
						};
			};

				function ikona() {
					//icons procedure
					document.getElementById("icon").style.height = "150px";
					if(status == "Clear") {
						skycons.set(document.getElementById("icon"), Skycons.CLEAR_DAY);
					} else if (status == "Clouds") {
						skycons.set(document.getElementById("icon"), Skycons.PARTLY_CLOUDY_DAY);
					} else if (status == "Rain") {
						skycons.set(document.getElementById("icon"), Skycons.RAIN);
					} else if (status == "Thunderstorm") {
						skycons.set(document.getElementById("icon"), Skycons.SLEET);
					} else if (status == "Snow") {
						skycons.set(document.getElementById("icon"), Skycons.SNOW);
					} else if (status == "Athmosphere") {
						skycons.set(document.getElementById("icon"), Skycons.FOG);
					} else if (status == "Extreme") {
						skycons.set(document.getElementById("icon"), Skycons.WIND);
					} else if (status == "Drizzle") {
						skycons.set(document.getElementById("icon"), Skycons.RAIN);
					};
					document.getElementById("view").innerHTML = "and here's what's outside of your window:";
					document.getElementById("wait").style.display = 'none';
				};
			});

		} else {
			console.error(xhr.satusText);
		}
	}
};


xhr.onerror = function (e) {
	console.error(xhr.stausText);
};
xhr.send(null);

