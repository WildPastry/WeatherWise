/*! weatherwise - v1.0.0 - 2019-07-10 */ 
/*! weatherwise - v1.0.0 - 2019-03-20 */
/*jslint browser:true */
/*jshint esversion: 6 */

// SKY KEY
$.ajax({
	url: '../config.json',
	dataType: 'json',
	type: 'get',
	success: function (keys) {
		skyKey = keys[0].SKY;
		getSkyData();
	},
	error: function (error) {
		console.log(error);
		console.log('Error getting key...');
	}
});

/* VARIABLES */

// HANNAH VARIABLES
var getHumidity = document.getElementById("data__humidity");
var getUv = document.getElementById("data__uvIndex");
var getWind = document.getElementById("data__windGust");
var getTime = document.getElementById("data__time");
var getHannah = document.getElementById("data--extra-bg");

// LISA VARIABLES
var getformattedRiseTime = document.getElementById("data__time--sunrise");
var getformattedSetTime = document.getElementById("data__time--sunset");
var getCountdown = document.getElementById("countdown__div");

// MIKE VARIABLES
var body = document.body;
var skyKey, dateStamp, finalDateStamp, currentTemp, currentIcon, countDown;
var myLat = -41.2865;
var myLng = 174.7762;

var input = document.getElementById('search--text--field');

var now = new Date();
var days = new Array('SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY');
var months = new Array('January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');

var getTopTemp = document.getElementById("top--temp");
var getTopLocation = document.getElementById("top--location");

var getCurrentTemp = document.getElementById("data--current--temp");
var getCurrentTempHigh = document.getElementById("data--current--temp-high");
var getCurrentTempLow = document.getElementById("data--current--temp-low");
var getCurrentDesc = document.getElementById("data--current--desc");
var getCurrentIcon = document.getElementById("data--current--icon");
var getCurrentDate = document.getElementById("data--current--date");
var getLocationDiv = document.getElementById("data--location--div");
var getLocation = document.getElementById("data--location");
var getSearchFieldDiv = document.getElementById("search--text--field--div");
var getSearchField = document.getElementById("search--text--field");
var getSearchButton = document.getElementById("search--button");
var getPowerButton = document.getElementById("power--button");

var getDailyBG = document.getElementById("data--daily-bg");
var getDailyDate = document.getElementById("data--daily--date");
var getDailyTemp = document.getElementById("data--daily--temp");
var getDailyTempLow = document.getElementById("data--daily--temp-low");
var getDailyIcon = document.getElementById("data--daily--icon");
var makeDiv = document.createElement('div');

// DATA
function getSkyData() {
	$('#master--loader').show();
	$.ajax({
		url: 'https://api.darksky.net/forecast/' + skyKey + '/' + myLat + ',' + myLng + '?units=si',
		dataType: 'jsonp',
		type: 'get',
		success: function (skyData) {

			// CLEAR INTERVAL
			clearInterval(countDown);

			// DATA LOG
			console.log(skyData);

			currentTemp = Math.trunc(skyData.currently.temperature);
			currentTempHigh = Math.trunc(skyData.daily.data[0].apparentTemperatureHigh);
			currentTempLow = Math.trunc(skyData.daily.data[0].apparentTemperatureLow);
			currentIcon = skyData.currently.icon;
			currentDesc = skyData.hourly.summary;

			// WRITE CURRENT DATA TO APP
			getTopTemp.innerHTML = '<p>' + 'Currently ' + '<span class="bold space">' + currentTemp + '°' + '&nbsp;' + '</h1>';
			getCurrentTemp.innerHTML = '<h1 class="bold space massive">' + currentTemp + '°' + '</h1>';
			getCurrentDesc.innerHTML = '<p>' + 'Feels like ' + '<span class="bold space">' + currentTemp + '°' + '&nbsp;&nbsp;' + '</span>' + 'High ' + '<span class="bold space">' + currentTempHigh + '°' + '&nbsp;&nbsp;' + '</span>' + 'Low ' + '<span class="bold space">' + currentTempLow + '°' + '</span>' + '</p>' + '<h3>' + currentDesc + '</h3>';

			// CURRENT DYNAMIC BACKGROUND AND ICON
				body.classList.remove("bckgd--lb", "bckgd--g", "bckgd--db", "bckgd--y");

				if (currentIcon == 'clear-day') {
					getCurrentIcon.innerHTML = '<img class="icon--massive" src="icon/weather/clear-day.svg">' + '<p class="marginBot">&nbsp;</p>';
					body.classList.add("bckgd--y");
					$('#icon--info').hover(function () {
						$(".icon--info").tooltip();
						changeTooltipColorTo('#ff9e3e');
					});
				} else if (currentIcon == 'clear-night') {
					getCurrentIcon.innerHTML = '<img class="icon--massive" src="icon/weather/clear-night.svg">';
					body.classList.add("bckgd--db");
					$('#icon--info').hover(function () {
						$(".icon--info").tooltip();
						changeTooltipColorTo('#0d3866');
					});
				} else if (currentIcon == 'rain') {
					getCurrentIcon.innerHTML = '<img class="icon--massive" src="icon/weather/rain.svg">';
					body.classList.add("bckgd--lb");
					$('#icon--info').hover(function () {
						$(".icon--info").tooltip();
						changeTooltipColorTo('#136999');
					});
				} else if (currentIcon == 'snow') {
					getCurrentIcon.innerHTML = '<img class="icon--massive" src="icon/weather/snow.svg">';
					body.classList.add("bckgd--db");
					$('#icon--info').hover(function () {
						$(".icon--info").tooltip();
						changeTooltipColorTo('#0d3866');
					});
				} else if (currentIcon == 'sleet') {
					getCurrentIcon.innerHTML = '<img class="icon--massive" src="icon/weather/sleet">' + '<p class="marginBot">&nbsp;</p>';
					body.classList.add("bckgd--lb");
					$('#icon--info').hover(function () {
						$(".icon--info").tooltip();
						changeTooltipColorTo('#136999');
					});
				} else if (currentIcon == 'wind') {
					getCurrentIcon.innerHTML = '<img class="icon--massive" src="icon/weather/wind.svg">';
					body.classList.add("bckgd--g");
					$('#icon--info').hover(function () {
						$(".icon--info").tooltip();
						changeTooltipColorTo('#586980');
					});
				} else if (currentIcon == 'fog') {
					getCurrentIcon.innerHTML = '<img class="icon--massive" src="icon/weather/fog.svg">';
					body.classList.add("bckgd--g");
					$('#icon--info').hover(function () {
						$(".icon--info").tooltip();
						changeTooltipColorTo('#586980');
					});
				} else if (currentIcon == 'cloudy') {
					getCurrentIcon.innerHTML = '<img class="icon--massive" src="icon/weather/cloudy.svg">' + '<p class="marginBot">&nbsp;</p>';
					body.classList.add("bckgd--g");
					$('#icon--info').hover(function () {
						$(".icon--info").tooltip();
						changeTooltipColorTo('#586980');
					});
				} else if (currentIcon == 'partly-cloudy-day') {
					getCurrentIcon.innerHTML = '<img class="icon--massive" src="icon/weather/partly-cloudy-day.svg">';
					body.classList.add("bckgd--g");
					$('#icon--info').hover(function () {
						$(".icon--info").tooltip();
						changeTooltipColorTo('#586980');
					});
				} else if (currentIcon == 'partly-cloudy-night') {
					getCurrentIcon.innerHTML = '<img class="icon--massive" src="icon/weather/partly-cloudy-night.svg">';
					body.classList.add("bckgd--db");
					$('#icon--info').hover(function () {
						$(".icon--info").tooltip();
						changeTooltipColorTo('#0d3866');
					});
				}

			// CLEAR DAILY DATA
			getDailyDate.innerHTML = "";
			getDailyTemp.innerHTML = "";
			getDailyTempLow.innerHTML = "";
			getDailyIcon.innerHTML = "";

			// DAILY DATA LOOP
			skyData.daily.data.shift();
			for (var i = 0; i < skyData.daily.data.length; i++) {

				// DATESTAMP
				dateStamp = skyData.daily.data[i].time;

				// DATESTAMP CONVERSION
				var date = new Date(dateStamp * 1000);
				var year = date.getFullYear();
				month = (date.getMonthFormatted());
				day = (date.getDayFormatted());
				var dailyDate = year + '-' + month + '-' + day;

				// DAILY DATA PREPERATION
				dailyDay = getDayOfWeek(dailyDate);
				var dailyTemp = Math.trunc(skyData.daily.data[i].apparentTemperatureHigh);
				var dailyTempLow = Math.trunc(skyData.daily.data[i].apparentTemperatureLow);
				var dailyIcon = skyData.daily.data[i].icon;

				// WRITE DAILY DATA TO APP
				getDailyDate.innerHTML += '<p class="data--daily">' + dailyDay + '</p>';
				getDailyTemp.innerHTML += '<p class="data--daily bold space">' + dailyTemp + '°' + '</p>';
				getDailyTempLow.innerHTML += '<p class="data--daily space">' + dailyTempLow + '°' + '</p>';

				// DAILY DYNAMIC ICON
				iconWrapper = document.getElementById('data--daily--icon-wrapper');
				iconWrapper.appendChild(makeDiv);
				makeDiv.appendChild(getDailyIcon);

				if (dailyIcon == 'clear-day') {
					getDailyIcon.innerHTML += '<img class="icon--sml" src="icon/weather/clear-day.svg">';
				} else if (dailyIcon == 'clear-night') {
					getDailyIcon.innerHTML += '<img class="icon--sml" src="icon/weather/clear-night.svg">';
				} else if (dailyIcon == 'rain') {
					getDailyIcon.innerHTML += '<img class="icon--sml" src="icon/weather/rain.svg">';
				} else if (dailyIcon == 'snow') {
					getDailyIcon.innerHTML += '<img class="icon--sml" src="icon/weather/snow.svg">';
				} else if (dailyIcon == 'sleet') {
					getDailyIcon.innerHTML += '<img class="icon--sml" src="icon/weather/sleet.svg">';
				} else if (dailyIcon == 'wind') {
					getDailyIcon.innerHTML += '<img class="icon--sml" src="icon/weather/wind.svg">';
				} else if (dailyIcon == 'fog') {
					getDailyIcon.innerHTML += '<img class="icon--sml" src="icon/weather/fog.svg">';
				} else if (dailyIcon == 'cloudy') {
					getDailyIcon.innerHTML += '<img class="icon--sml" src="icon/weather/cloudy.svg">';
				} else if (dailyIcon == 'partly-cloudy-day') {
					getDailyIcon.innerHTML += '<img class="icon--sml" src="icon/weather/partly-cloudy-day.svg">';
				} else if (dailyIcon == 'partly-cloudy-night') {
					getDailyIcon.innerHTML += '<img class="icon--sml" src="icon/weather/partly-cloudy-night.svg">';
				}

			} //DAILY DATA LOOP

			// CURRENT DATE PREPERATION
			var daysPLUSmonths = ((now.getDate() < 10) ? "0" : "") + now.getDate();
			currentDay = days[now.getDay()] + " ";
			currentMonth = months[now.getMonth()] + " " + daysPLUSmonths;

			// WRITE CURRENT DATE TO APP
			getCurrentDate.innerHTML = '<h2>' + '<span class="bold">' + currentDay + '&nbsp;' + '</span>' + currentMonth + '</h2>';

			//DATA TO HOURS AND MINUTES
			unix_timestamp = skyData.daily.data[0].sunriseTime;
			var date2 = new Date(unix_timestamp * 1000);
			var hours = date2.getHours();
			var minutes = "0" + date2.getMinutes();
			var formattedRiseTime = hours + ':' + minutes.substr(-2);
			sunset_timestamp = skyData.daily.data[0].sunsetTime;
			var date3 = new Date(sunset_timestamp * 1000);
			var hoursSet = date3.getHours();
			var minutesSet = "0" + date3.getMinutes();
			var formattedSetTime = (hoursSet) + ':' + minutesSet.substr(-2);

			//DISPLAYING SUNRISE + SUNSET HTML
			sunrise = Math.trunc(skyData.daily.data[0].sunriseTime);
			sunset = Math.trunc(skyData.daily.data[0].sunsetTime);
			getformattedRiseTime.innerHTML = '<h1>' + formattedRiseTime + '</h1>';
			getformattedSetTime.innerHTML = '<h1>' + formattedSetTime + '</h1>';

			//COUNTDOWN
			var sunSetTime = skyData.daily.data[0].sunsetTime;
			var sunTimer = new Date(sunSetTime * 1000).toString();
			var sunTimerShort = sunTimer.slice(0, 24);
			var countDownDate = new Date(sunTimerShort).getTime();

			// SET INTERVAL
			countDown = setInterval(function () {
				var now = new Date().getTime();
				var distance = countDownDate - now;
				var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
				var seconds = Math.floor((distance % (1000 * 60)) / 1000);

				// WRITE COUNTDOWN TO APP
				getCountdown.innerHTML = "<h1>" + hours + " : " +
					minutes + " : " + seconds + " " + "</h1>";

				if (distance < 0) {
					clearInterval(countDown);
					getCountdown.innerHTML = "<h1>" + "Expired" + "</h1>";
				}
			}, 1000);

			// GETTING HUMIDITY
			humidity = ((skyData.daily.data[0].humidity) * 100).toFixed(0);
			getHumidity.innerHTML = '<h1>' + humidity + '<span class="ampm space">' + ' %' + '</span>' + '</h1>';

			// GETTING UV INDEX
			uvIndex = (skyData.daily.data[0].uvIndex);
			getUv.innerHTML = '<h1>' + uvIndex + '</h1>';

			// GETTING WIND SPEED/GUST
			windGust = Math.round((skyData.daily.data[0].windGust));
			getWind.innerHTML = '<h1>' + windGust + '<span class="ampm space">' + ' km/h' + '</span>' + '</h1>';

			// AREA CHART FOR WIND SPEED DURING THE DAY
			google.charts.load('current', {
				'packages': ['corechart']
			});
			google.charts.setOnLoadCallback(drawChart);

			function drawChart() {

				var data = new google.visualization.DataTable();
				data.addColumn("string", "Day");
				data.addColumn("number", "Wind");

				for (var i = 0; i < skyData.daily.data.length; i++) {

					// DATESTAMP
					dateStamp = skyData.daily.data[i].time;

					// DATESTAMP CONVERSION
					var date = new Date(dateStamp * 1000);
					var year = date.getFullYear();
					month = (date.getMonthFormatted());
					day = (date.getDayFormatted());
					var dailyDate = year + '-' + month + '-' + day;
					dailyDay = getDayOfWeek(dailyDate);

					data.addRow([dailyDay, skyData.daily.data[i].windGust]);
				}

				var options = {
					title: 'WEEKLY WIND SPEED',
					indexLabel: 'Poppins',
					titleTextStyle: {
						color: '#ffffff',
						fontSize: 18,
						fontName: 'Poppins',
						fontWeight: 300,
						bold: false
					},
					legend: 'none',
					hAxis: {
						slantedText: true,
						slantedTextAngle: 90,

						textStyle: {
							color: '#ffffff',
							fontSize: 9,
							fontName: 'Poppins'
						}
					},
					vAxis:

					{
						textStyle: {
							color: '#ffffff',
							fontSize: 12,
							italic: false,
							fontName: 'Poppins'
						}
					},

					backgroundColor: {
						color: '#ffffff',
						fill: 'transparent'
					},
					colors: ['#ffffff'],
					tooltip: {
						textStyle: {
							color: '#000000',
							fontName: 'Poppins',
							fontSize: 10
						}
					},
				}; //OPTIONS ENDING

				var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
				chart.draw(data, options);

			} //FUNCTION DRAW CHART ENDING

			$('#master--loader').delay(350).fadeOut('slow');

		}, //SUCCESS
		error: function (error) {
			console.log(error);
			console.log('Error getting data...');
		}

	}); //AJAX

} //FUNCTION

// WRITE DEFAULT LOCATION TO APP
getLocation.innerHTML = '<img class="icon--md" src="icon/ww-location.svg">' + '<h2>' + "Wellington, New Zealand" + '</h2>';
getTopLocation.innerHTML = '<p>' + "Wellington, New Zealand" + '</p>';

// FORMAT DATE FUCNTIONS
Date.prototype.getMonthFormatted = function () {
	var formatMonth = this.getMonth() + 1;
	return formatMonth < 10 ? '0' + formatMonth : formatMonth;
};

Date.prototype.getDayFormatted = function () {
	var formatDay = this.getDate();
	return formatDay < 10 ? '0' + formatDay : formatDay;
};

// FORMAT DAY FUNCTION
function getDayOfWeek(date) {
	var dayOfWeek = new Date(date).getDay();
	return isNaN(dayOfWeek) ? null : ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'][dayOfWeek];
}

// TOOLTIPS
$(document).ready(function () {
	$('.icon--info').tooltip({
		template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
		trigger: 'hover',
		title: "<p>WeatherWise aims to prioritize<br>preparedness so that users<br>know how to best dress and<br>prepare for the weather</p>",
		html: true,
		placement: "left",
		offset: '40, 15',
	});
});

$('.search--text--field--div').tooltip({
	template: '<div class="tooltip locationWarning"><div class="tooltip-arrow"></div><div class="tooltip-inner red"></div></div>',
	trigger: 'manual',
	title: "<p>Please enter a valid location...</p>",
	html: true,
	placement: "top",
});

// REMOVE WARNING TOOLTIP
function removeWarning() {
	$('.locationWarning').click(function () {
		$('.search--text--field--div').tooltip('hide');
	});
}

// DYNAMIC TOOLTIP BACKGROUNDS
function changeTooltipColorTo(color) {
	$('.tooltip-inner').css('background-color', color);
}

// AUTOCOMPLETE
function init() {
	var options = {
		types: ['(cities)']
	};
	var autocomplete = new google.maps.places.Autocomplete(input, options);
	autocomplete.setFields(
		['geometry', 'name']);
	google.maps.event.addListener(autocomplete, 'place_changed', function () {
		var place = autocomplete.getPlace();
		myLat = place.geometry.location.lat();
		myLng = place.geometry.location.lng();
		getSkyData();
		// WRITE CURRENT LOCATION TO APP
		getLocation.innerHTML = '<img class="icon--md" src="icon/ww-location.svg">' + '<h2>' + input.value + '</h2>';
		getTopLocation.innerHTML = '<p>' + input.value + '</p>';
	});
}
google.maps.event.addDomListener(window, 'load', init);

// SEARCH BUTTON
getSearchButton.addEventListener('click', validateSearchField);

// SEARCH VALIDATION
function validateSearchField() {
	var myCities = /([A-Z])\w+/;
	if (getSearchField.value.match(myCities)) {
		$('.search--text--field--div').tooltip('hide');
		getSkyData();
		// WRITE CURRENT LOCATION TO APP
		getLocation.innerHTML = '<img class="icon--md" src="icon/ww-location.svg">' + '<h2>' + input.value + '</h2>';
		getTopLocation.innerHTML = '<p>' + input.value + '</p>';
		return true;
	} else {
		$('.search--text--field--div').tooltip('show');
		removeWarning();
		return false;
	}
}

// CHECK IF ACCESS ALLOWED
function checkGeo() {
	navigator.geolocation.watchPosition(function (position) {
			console.log("Geolocation success");
			getGeoLocation();
		},
		function (error) {
			if (error.code == error.PERMISSION_DENIED)
				console.log("Geolocation access denied...");
			myLat = -41.2865;
			myLng = 174.7762;
			getSkyData();
		});
}

// GEOLOCATION FUNCTION
function getGeoLocation() {

	var currentLocation;

	// SET GEO LOCATION
	navigator.geolocation.getCurrentPosition(function (position, html5Error) {

		geo_loc = processGeolocationResult(position);
		currLatLong = geo_loc.split(",");
		initializeCurrent(currLatLong[0], currLatLong[1]);
		myLat = (currLatLong[0]);
		myLng = (currLatLong[1]);
		getSkyData();

	});

	// GET GEO LOCATION
	function processGeolocationResult(position) {
		html5Lat = position.coords.latitude; // GET LAT
		html5Lon = position.coords.longitude; // GET LNG
		html5TimeStamp = position.timestamp; // GET TIMESTAMP
		html5Accuracy = position.coords.accuracy; // ACCURACY
		return (html5Lat).toFixed(8) + ", " + (html5Lon).toFixed(8);
	}

	// CHECK VALUE
	function initializeCurrent(latcurr, longcurr) {
		currentLocation = new google.maps.Geocoder();

		if (latcurr != '' && longcurr != '') {
			var myLatlng = new google.maps.LatLng(latcurr, longcurr);
			return getCurrentAddress(myLatlng);
		}
	}

	// GET ACTUAL ADDRESS
	function getCurrentAddress(location) {
		currentLocation.geocode({
			'location': location

		}, function (results, status) {

			if (status == google.maps.GeocoderStatus.OK) {
				$("#address").html(results[0].formatted_address);
			} else {
				alert('No Geolocation Support ' + status);
			}
		});
	}
}