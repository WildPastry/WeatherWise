// CHECK JAVASCRIPT + JQUERY
/*jslint browser:true */
console.log('javascript ready...');

$(document).ready(function () {
	console.log("jquery ready...");
});

// LOADER
$('#master--loader').show();

// SKY KEY
$.ajax({
	url: '../config.json',
	dataType: 'json',
	type: 'get',
	success: function (keys) {

		var ts = new Date();
		console.log(ts);
		// console.log(ts.getHours());

		console.log('key loaded...');
		skyKey = keys[0].SKY;
		// checkGeo();
		getSkyData();
	},
	error: function (error) {
		console.log(error);
		console.log('error getting key...');
	}
});

// VARIABLES
var body = document.body;
var skyKey, dateStamp, finalDateStamp, currentTemp, currentIcon;
var myLat = -41.2865;
var myLng = 174.7762;

// AUTOCOMPLETE VARIABLE
var input = document.getElementById('search--text--field');

// DATE VARIABLES
var now = new Date();
var days = new Array('SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY');
var months = new Array('January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');

// TOP TEMP AND LOCATION VARIABLES
var getTopTemp = document.getElementById("top--temp");
var getTopLocation = document.getElementById("top--location");

// CURRENT DATA VARIABLES
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

// DAILY DATA VARIABLES
var getDailyBG = document.getElementById("data--daily-bg");
var getDailyDate = document.getElementById("data--daily--date");
var getDailyTemp = document.getElementById("data--daily--temp");
var getDailyTempLow = document.getElementById("data--daily--temp-low");
var getDailyIcon = document.getElementById("data--daily--icon");
var makeDiv = document.createElement('div');

// DATA ICONS
var dataIcons = [{
		icon: 'clear-day.svg',
	},
	{
		icon: 'clear-night.svg',
	},
	{
		icon: 'rain.svg'
	},
	{
		icon: 'snow.svg'
	},
	{
		icon: 'sleet.svg'
	},
	{
		icon: 'wind.svg'
	},
	{
		icon: 'fog.svg'
	},
	{
		icon: 'cloudy.svg'
	},
	{
		icon: 'partly-cloudy-day.svg'
	},
	{
		icon: 'partly-cloudy-night.svg'
	},
	{
		icon: 'ww-location.svg'
	}
];

// WRITE DEFAULT LOCATION TO APP
getLocation.innerHTML = '<img class="icon--md" src="icon/' + dataIcons[10].icon + '">' + '<h2>' + "Wellington, New Zealand" + '</h2>';
getTopLocation.innerHTML = '<p>' + "Wellington, New Zealand" + '</p>';

// DATA
function getSkyData() {
	$('#master--loader').show();
	$.ajax({
		url: 'https://api.darksky.net/forecast/' + skyKey + '/' + myLat + ',' + myLng + '?units=si',
		dataType: 'jsonp',
		type: 'get',
		success: function (skyData) {

			// BASIC LOGS
			console.log("SKY data loaded...");
			console.log(skyData);
			console.log("Current temperature:");
			console.log(skyData.currently.temperature);

			currentTemp = Math.trunc(skyData.currently.temperature);
			currentTempHigh = Math.trunc(skyData.daily.data[0].apparentTemperatureHigh);
			currentTempLow = Math.trunc(skyData.daily.data[0].apparentTemperatureLow);
			currentIcon = skyData.currently.icon;
			currentDesc = skyData.hourly.summary;

			// WRITE CURRENT DATA TO APP
			// getLocation.innerHTML = '<img class="icon--md" src="icon/' + dataIcons[10].icon + '">' + '<h2>' + input.value + '</h2>';
			// getTopLocation.innerHTML = '<p>' + input.value + '</p>';

			getTopTemp.innerHTML = '<p>' + 'Currently ' + '<span class="bold space">' + currentTemp + '°' + '</span>' + '</p>';
			getCurrentTempHigh.innerHTML = '<h1 class="bold space">' + currentTempHigh + '°' + '&nbsp;' + '</h1>' + '<p class="marginBot">high</p>';
			getCurrentTempLow.innerHTML = '<h1 class="light space">' + currentTempLow + '°' + '</h1>' + '<p class="marginBot">low</p>';
			getCurrentDesc.innerHTML = '<p>' + 'Feels like ' + '<span class="bold space">' + currentTemp + '°' + '</span>' + '</p>' + '<h3>' + currentDesc + '</h3>';

			// CURRENT DYNAMIC BACKGROUND AND ICON
			if (currentIcon == 'clear-day') {
				console.log("clear-day icon loaded...");
				getCurrentIcon.innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[0].icon + '">' + '<p class="marginBot">&nbsp;</p>';
				body.classList.remove("bckgd--b-m", "bckgd--g-m", "bckgd--db-m", "bckgd--g-v");
				body.classList.add("bckgd--y-m");
				getLocationDiv.style.backgroundColor = '#ff9e3e';
				getSearchFieldDiv.style.backgroundColor = '#ff9e3e';
				getSearchField.style.backgroundColor = '#ff9e3e';
				getSearchButton.style.color = '#ff9e3e';
				getDailyBG.style.backgroundColor = '#ffca76';
				// TOOLTIPS
				$(document).ready(function () {
					$(".icon--info").tooltip();
					$('#icon--info').hover(function () {
						changeTooltipColorTo('#ff9e3e');
					});
				});
			}
			if (currentIcon == 'clear-night') {
				console.log("clear-night icon loaded...");
				getCurrentIcon.innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[1].icon + '">' + '<p class="marginBot">&nbsp;</p>';
				body.classList.remove("bckgd--b-m", "bckgd--g-m", "bckgd--y-m", "bckgd--g-v");
				body.classList.add("bckgd--db-m");
				getLocationDiv.style.backgroundColor = '#0b1d30';
				getSearchFieldDiv.style.backgroundColor = '#0b1d30';
				getSearchField.style.backgroundColor = '#0b1d30';
				getSearchButton.style.color = '#0b1d30';
				getDailyBG.style.backgroundColor = '#586980';
				// TOOLTIPS
				$(document).ready(function () {
					$(".icon--info").tooltip();
					$('#icon--info').hover(function () {
						changeTooltipColorTo('#0b1d30');
					});
				});
			}
			if (currentIcon == 'rain') {
				console.log("rain icon loaded...");
				getCurrentIcon.innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[2].icon + '">' + '<p class="marginBot">&nbsp;</p>';
				body.classList.remove("bckgd--db-m", "bckgd--g-m", "bckgd--y-m", "bckgd--g-v");
				body.classList.add("bckgd--b-m");
				getLocationDiv.style.backgroundColor = '#136999';
				getSearchFieldDiv.style.backgroundColor = '#136999';
				getSearchField.style.backgroundColor = '#136999';
				getSearchButton.style.color = '#136999';
				getDailyBG.style.backgroundColor = '#66a9d7';
				// TOOLTIPS
				$(document).ready(function () {
					$(".icon--info").tooltip();
					$('#icon--info').hover(function () {
						changeTooltipColorTo('#136999');
					});
				});
			}
			if (currentIcon == 'snow') {
				console.log("snow icon loaded...");
				getCurrentIcon.innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[3].icon + '">' + '<p class="marginBot">&nbsp;</p>';
				body.classList.remove("bckgd--b-m", "bckgd--g-m", "bckgd--y-m", "bckgd--g-v");
				body.classList.add("bckgd--db-m");
				getLocationDiv.style.backgroundColor = '#0b1d30';
				getSearchFieldDiv.style.backgroundColor = '#0b1d30';
				getSearchField.style.backgroundColor = '#0b1d30';
				getSearchButton.style.color = '#0b1d30';
				getDailyBG.style.backgroundColor = '#586980';
				// TOOLTIPS
				$(document).ready(function () {
					$(".icon--info").tooltip();
					$('#icon--info').hover(function () {
						changeTooltipColorTo('#0b1d30');
					});
				});
			}
			if (currentIcon == 'sleet') {
				console.log("sleet icon loaded...");
				getCurrentIcon.innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[4].icon + '">' + '<p class="marginBot">&nbsp;</p>';
				body.classList.remove("bckgd--db-m", "bckgd--g-m", "bckgd--y-m", "bckgd--g-v");
				body.classList.add("bckgd--b-m");
				getLocationDiv.style.backgroundColor = '#136999';
				getSearchFieldDiv.style.backgroundColor = '#136999';
				getSearchField.style.backgroundColor = '#136999';
				getSearchButton.style.color = '#136999';
				getDailyBG.style.backgroundColor = '#66a9d7';
				// TOOLTIPS
				$(document).ready(function () {
					$(".icon--info").tooltip();
					$('#icon--info').hover(function () {
						changeTooltipColorTo('#136999');
					});
				});
			}
			if (currentIcon == 'wind') {
				console.log("wind icon loaded...");
				getCurrentIcon.innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[5].icon + '">' + '<p class="marginBot">&nbsp;</p>';
				body.classList.remove("bckgd--b-m", "bckgd--db-m", "bckgd--y-m");
				body.classList.add("bckgd--g-v");
				getLocationDiv.style.backgroundColor = '#323b44';
				getSearchFieldDiv.style.backgroundColor = '#323b44';
				getSearchField.style.backgroundColor = '#323b44';
				getSearchButton.style.color = '#323b44';
				getDailyBG.style.backgroundColor = '#566470';
				// TOOLTIPS
				$(document).ready(function () {
					$(".icon--info").tooltip();
					$('#icon--info').hover(function () {
						changeTooltipColorTo('#323b44');
					});
				});
			}
			if (currentIcon == 'fog') {
				console.log("fog icon loaded...");
				getCurrentIcon.innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[6].icon + '">' + '<p class="marginBot">&nbsp;</p>';
				body.classList.remove("bckgd--b-m", "bckgd--db-m", "bckgd--y-m", "bckgd--g-v");
				body.classList.add("bckgd--g-m");
				getLocationDiv.style.backgroundColor = '#5a6977';
				getSearchFieldDiv.style.backgroundColor = '#5a6977';
				getSearchField.style.backgroundColor = '#5a6977';
				getSearchButton.style.color = '#5a6977';
				getDailyBG.style.backgroundColor = '#99a9bb';
				// TOOLTIPS
				$(document).ready(function () {
					$(".icon--info").tooltip();
					$('#icon--info').hover(function () {
						changeTooltipColorTo('#5a6977');
					});
				});
			}
			if (currentIcon == 'cloudy') {
				console.log("cloudy icon loaded...");
				getCurrentIcon.innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[7].icon + '">' + '<p class="marginBot">&nbsp;</p>';
				body.classList.remove("bckgd--b-m", "bckgd--db-m", "bckgd--y-m");
				body.classList.add("bckgd--g-v");
				getLocationDiv.style.backgroundColor = '#323b44';
				getSearchFieldDiv.style.backgroundColor = '#323b44';
				getSearchField.style.backgroundColor = '#323b44';
				getSearchButton.style.color = '#323b44';
				getDailyBG.style.backgroundColor = '#566470';
				// TOOLTIPS
				$(document).ready(function () {
					$(".icon--info").tooltip();
					$('#icon--info').hover(function () {
						changeTooltipColorTo('#323b44');
					});
				});
			}
			if (currentIcon == 'partly-cloudy-day') {
				console.log("partly-cloudy-day icon loaded...");
				getCurrentIcon.innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[8].icon + '">' + '<p class="marginBot">&nbsp;</p>';
				body.classList.remove("bckgd--b-m", "bckgd--db-m", "bckgd--y-m", "bckgd--g-v");
				body.classList.add("bckgd--g-m");
				getLocationDiv.style.backgroundColor = '#5a6977';
				getSearchFieldDiv.style.backgroundColor = '#5a6977';
				getSearchField.style.backgroundColor = '#5a6977';
				getSearchButton.style.color = '#5a6977';
				getDailyBG.style.backgroundColor = '#99a9bb';
				// TOOLTIPS
				$(document).ready(function () {
					$(".icon--info").tooltip();
					$('#icon--info').hover(function () {
						changeTooltipColorTo('#5a6977');
					});
				});
			}
			if (currentIcon == 'partly-cloudy-night') {
				console.log("partly-cloudy-night icon loaded...");
				getCurrentIcon.innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[9].icon + '">' + '<p class="marginBot">&nbsp;</p>';
				body.classList.remove("bckgd--b-m", "bckgd--g-m", "bckgd--y-m", "bckgd--g-v");
				body.classList.add("bckgd--db-m");
				getLocationDiv.style.backgroundColor = '#0b1d30';
				getSearchFieldDiv.style.backgroundColor = '#0b1d30';
				getSearchField.style.backgroundColor = '#0b1d30';
				getSearchButton.style.color = '#0b1d30';
				getDailyBG.style.backgroundColor = '#586980';
				// TOOLTIPS
				$(document).ready(function () {
					$(".icon--info").tooltip();
					$('#icon--info').hover(function () {
						changeTooltipColorTo('#0b1d30');
					});
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

				if (dailyIcon == 'clear-day') {
					iconWrapper.appendChild(makeDiv);
					makeDiv.appendChild(getDailyIcon);
					getDailyIcon.innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[0].icon + '">';
				}
				if (dailyIcon == 'clear-night') {
					iconWrapper.appendChild(makeDiv);
					makeDiv.appendChild(getDailyIcon);
					getDailyIcon.innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[1].icon + '">';
				}
				if (dailyIcon == 'rain') {
					iconWrapper.appendChild(makeDiv);
					makeDiv.appendChild(getDailyIcon);
					getDailyIcon.innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[2].icon + '">';
				}
				if (dailyIcon == 'snow') {
					iconWrapper.appendChild(makeDiv);
					makeDiv.appendChild(getDailyIcon);
					getDailyIcon.innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[3].icon + '">';
				}
				if (dailyIcon == 'sleet') {
					iconWrapper.appendChild(makeDiv);
					makeDiv.appendChild(getDailyIcon);
					getDailyIcon.innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[4].icon + '">';
				}
				if (dailyIcon == 'wind') {
					iconWrapper.appendChild(makeDiv);
					makeDiv.appendChild(getDailyIcon);
					getDailyIcon.innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[5].icon + '">';
				}
				if (dailyIcon == 'fog') {
					iconWrapper.appendChild(makeDiv);
					makeDiv.appendChild(getDailyIcon);
					getDailyIcon.innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[6].icon + '">';
				}
				if (dailyIcon == 'cloudy') {
					iconWrapper.appendChild(makeDiv);
					makeDiv.appendChild(getDailyIcon);
					getDailyIcon.innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[7].icon + '">';
				}
				if (dailyIcon == 'partly-cloudy-day') {
					iconWrapper.appendChild(makeDiv);
					makeDiv.appendChild(getDailyIcon);
					getDailyIcon.innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[8].icon + '">';
				}
				if (dailyIcon == 'partly-cloudy-night') {
					iconWrapper.appendChild(makeDiv);
					makeDiv.appendChild(getDailyIcon);
					getDailyIcon.innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[9].icon + '">';
				}

			} //DAILY DATA LOOP

			// CURRENT DATE PREPERATION
			var daysPLUSmonths = ((now.getDate() < 10) ? "0" : "") + now.getDate();
			currentDay = days[now.getDay()] + " ";
			currentMonth = months[now.getMonth()] + " " + daysPLUSmonths;

			// WRITE CURRENT DATE TO APP
			getCurrentDate.innerHTML = '<h2>' + '<span class="bold">' + currentDay + '&nbsp;' + '</span>' + currentMonth + 'th' + '</h2>';
			$('#master--loader').delay(350).fadeOut('slow');

		}, //SUCCESS
		error: function (error) {
			console.log(error);
			console.log('error getting data...');
		}

	}); //AJAX

} //FUNCTION

// FORMAT DATE FUCNTIONS
Date.prototype.getMonthFormatted = function () {
	var formatMonth = this.getMonth() + 1;
	return formatMonth < 10 ? '0' + formatMonth : formatMonth;
};

Date.prototype.getDayFormatted = function () {
	var formatDay = this.getDate();
	return formatDay < 10 ? '0' + formatDay : formatDay;
};

function getDayOfWeek(date) {
	var dayOfWeek = new Date(date).getDay();
	return isNaN(dayOfWeek) ? null : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
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
	title: "<p>Please enter a location...</p>",
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
	$('.tooltip.top .tooltip-arrow').css('border-top-color', color);
	$('.tooltip.right .tooltip-arrow').css('border-right-color', color);
	$('.tooltip.left .tooltip-arrow').css('border-left-color', color);
	$('.tooltip.bottom .tooltip-arrow').css('border-bottom-color', color);
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
	});
}
google.maps.event.addDomListener(window, 'load', init);

// SEARCH BUTTON
getSearchButton.addEventListener('click', validateSearchField);

// function sendRequest() {
// 	// if (input.value == null || input.value == "") {
// 	// 	$('.search--text--field--div').tooltip('show');
// 	// 	getSearchField.innerHTML = 'Please enter location...';
// 	// 	return false;
	
// 		// $("#search--button").click(function () {
// 		// 	$('html, body').animate({
// 		// 		scrollTop: $("#mike").offset().top - 0
// 		// 	}, 700);
// 		// });
		
// 		getLocation.innerHTML = '<img class="icon--md" src="icon/' + dataIcons[10].icon + '">' + '<h2>' + input.value + '</h2>';

// 		// WRITE CURRENT LOCATION TO APP
// 		console.log('Location changed to ' + input.value);
// 		getTopLocation.innerHTML = '<p>' + input.value + '</p>';
// 	}

// SEARCH VALIDATION
function validateSearchField() {
	var myCities = /([A-Z])\w+/;
	if (getSearchField.value.match(myCities)) {
		$('.search--text--field--div').tooltip('hide');
		getSkyData();
		getLocation.innerHTML = '<img class="icon--md" src="icon/' + dataIcons[10].icon + '">' + '<h2>' + input.value + '</h2>';

		// WRITE CURRENT LOCATION TO APP
		console.log('Location changed to ' + input.value);
		getTopLocation.innerHTML = '<p>' + input.value + '</p>';
		// document.registration.zip.focus();
		return true;
	} else {
		$('.search--text--field--div').tooltip('show');
		removeWarning();
		console.log("Please enter a valid city...");
		return false;
	}
		// function validateSearchField() {
		// 	if (getSearchField.value == "") {
		// 		console.log("Please select value");
		// 		return false;
		// 	}
		// }
	}

// getSearchButton.addEventListener('click', function (e) {
// 	var selectedValue = getSearchField.options[getSearchField.selectedIndex] ? getSearchField.options[getSearchField.selectedIndex].value : null;

// 	if (!selectedValue) {
// 		console.log("Please enter location...");
// 	}
// });

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
		console.log(currLatLong[0]);
		console.log(currLatLong[1]);
		myLat = (currLatLong[0]);
		myLng = (currLatLong[1]);
		// if (myLat == "undefined" || myLng == "undefined") {
		// 	myLat = -41.2865;
		// 	myLng = 174.7762;
		// 	getLocation.innerHTML = '<img class="icon--md" src="icon/' + dataIcons[10].icon + '">' + '<h2>' + "Wellington, New Zealand" + '</h2>';
		// 	getTopLocation.innerHTML = '<p>' + "Wellington, New Zealand" + '</p>';
		// }
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
		console.log(latcurr + "-- ######## --" + longcurr);

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
				console.log(results[0]);
				$("#address").html(results[0].formatted_address);
			} else {
				alert('No Geolocation Support ' + status);
			}
		});
	}
}