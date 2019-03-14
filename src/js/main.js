/*! weatherwise - v1.0.0 - 2019-03-14 */ 
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
		console.log('key loaded...');
		skyKey = keys[0].SKY;
		getSkyData();
	},
	error: function (error) {
		console.log(error);
		console.log('error getting key...');
	}
});

// VARIABLES
var skyKey, dateStamp, finalDateStamp, currentTemp, currentIcon;
var myLat = -41.2865;
var myLng = 174.7762;
var body = document.body;
var now = new Date();
var days = new Array('SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY');
var months = new Array('JANUARY', 'FEBUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER');

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
document.getElementById("data--location").innerHTML = '<img class="icon--md" src="icon/' + dataIcons[10].icon + '">' + '<h2>' + "Wellington, New Zealand" + '</h2>';

// DATA
function getSkyData() {
	// LOADER
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
			currentIcon = skyData.currently.icon;
			currentDesc = skyData.currently.summary;

			// WRITE CURRENT DATA TO APP
			document.getElementById("data--current--temp").innerHTML = '<h1>' + currentTemp + '°' + '</h1>';
			document.getElementById("data--current--desc").innerHTML = '<h2>' + currentDesc + '</h2>';

			// CURRENT DYNAMIC BACKGROUND AND ICON
			if (currentIcon == 'clear-day') {
				console.log("clear-day icon loaded...");
				document.getElementById("data--current--icon").innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[0].icon + '">';
				body.classList.remove("bckgd--b-m", "bckgd--g-m", "bckgd--db-m");
				body.classList.add("bckgd--y-m");
				document.getElementById("data--location--div").style.backgroundColor = '#ff9e3e';
				document.getElementById("search--text--field--div").style.backgroundColor = '#ff9e3e';
				document.getElementById("search--text--field").style.backgroundColor = '#ff9e3e';
			}
			if (currentIcon == 'clear-night') {
				console.log("clear-night icon loaded...");
				document.getElementById("data--current--icon").innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[1].icon + '">';
				body.classList.remove("bckgd--b-m", "bckgd--g-m", "bckgd--y-m");
				body.classList.add("bckgd--db-m");
				document.getElementById("data--location--div").style.backgroundColor = '#0b1d30';
				document.getElementById("search--text--field--div").style.backgroundColor = '#0b1d30';
				document.getElementById("search--text--field").style.backgroundColor = '#0b1d30';
			}
			if (currentIcon == 'rain') {
				console.log("rain icon loaded...");
				document.getElementById("data--current--icon").innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[2].icon + '">';
				body.classList.remove("bckgd--db-m", "bckgd--g-m", "bckgd--y-m");
				body.classList.add("bckgd--b-m");
				document.getElementById("data--location--div").style.backgroundColor = '#136999';
				document.getElementById("search--text--field--div").style.backgroundColor = '#136999';
				document.getElementById("search--text--field").style.backgroundColor = '#136999';
			}
			if (currentIcon == 'snow') {
				console.log("snow icon loaded...");
				document.getElementById("data--current--icon").innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[3].icon + '">';
				body.classList.remove("bckgd--b-m", "bckgd--g-m", "bckgd--y-m");
				body.classList.add("bckgd--db-m");
				document.getElementById("data--location--div").style.backgroundColor = '#0b1d30';
				document.getElementById("search--text--field--div").style.backgroundColor = '#0b1d30';
				document.getElementById("search--text--field").style.backgroundColor = '#0b1d30';
			}
			if (currentIcon == 'sleet') {
				console.log("sleet icon loaded...");
				document.getElementById("data--current--icon").innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[4].icon + '">';
				body.classList.remove("bckgd--db-m", "bckgd--g-m", "bckgd--y-m");
				body.classList.add("bckgd--b-m");
				document.getElementById("data--location--div").style.backgroundColor = '#136999';
				document.getElementById("search--text--field--div").style.backgroundColor = '#136999';
				document.getElementById("search--text--field").style.backgroundColor = '#136999';
			}
			if (currentIcon == 'wind') {
				console.log("wind icon loaded...");
				document.getElementById("data--current--icon").innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[5].icon + '">';
				body.classList.remove("bckgd--b-m", "bckgd--db-m", "bckgd--y-m");
				body.classList.add("bckgd--g-m");
				document.getElementById("data--location--div").style.backgroundColor = '#5a6977';
				document.getElementById("search--text--field--div").style.backgroundColor = '#5a6977';
				document.getElementById("search--text--field").style.backgroundColor = '#5a6977';
			}
			if (currentIcon == 'fog') {
				console.log("fog icon loaded...");
				document.getElementById("data--current--icon").innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[6].icon + '">';
				body.classList.remove("bckgd--b-m", "bckgd--db-m", "bckgd--y-m");
				body.classList.add("bckgd--g-m");
				document.getElementById("data--location--div").style.backgroundColor = '#5a6977';
				document.getElementById("search--text--field--div").style.backgroundColor = '#5a6977';
				document.getElementById("search--text--field").style.backgroundColor = '#5a6977';
			}
			if (currentIcon == 'cloudy') {
				console.log("cloudy icon loaded...");
				document.getElementById("data--current--icon").innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[7].icon + '">';
				body.classList.remove("bckgd--b-m", "bckgd--db-m", "bckgd--y-m");
				body.classList.add("bckgd--g-m");
				document.getElementById("data--location--div").style.backgroundColor = '#5a6977';
				document.getElementById("search--text--field--div").style.backgroundColor = '#5a6977';
				document.getElementById("search--text--field").style.backgroundColor = '#5a6977';
			}
			if (currentIcon == 'partly-cloudy-day') {
				console.log("partly-cloudy-day icon loaded...");
				document.getElementById("data--current--icon").innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[8].icon + '">';
				body.classList.remove("bckgd--b-m", "bckgd--db-m", "bckgd--y-m");
				body.classList.add("bckgd--g-m");
				document.getElementById("data--location--div").style.backgroundColor = '#5a6977';
				document.getElementById("search--text--field--div").style.backgroundColor = '#5a6977';
				document.getElementById("search--text--field").style.backgroundColor = '#5a6977';
			}
			if (currentIcon == 'partly-cloudy-night') {
				console.log("partly-cloudy-night icon loaded...");
				document.getElementById("data--current--icon").innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[9].icon + '">';
				body.classList.remove("bckgd--b-m", "bckgd--g-m", "bckgd--y-m");
				body.classList.add("bckgd--db-m");
				document.getElementById("data--location--div").style.backgroundColor = '#0b1d30';
				document.getElementById("search--text--field--div").style.backgroundColor = '#0b1d30';
				document.getElementById("search--text--field").style.backgroundColor = '#0b1d30';
			}

			// CLEAR DAILY DATA
			document.getElementById("data--daily--date").innerHTML = "";
			// document.getElementById("data--daily--summary").innerHTML = "";
			document.getElementById("data--daily--icon--text").innerHTML = "";
			document.getElementById("data--daily--temp").innerHTML = "";
			document.getElementById("data--daily--icon").innerHTML = "";

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

				// DAILY DATA PERERATION
				dailyDay = getDayOfWeek(dailyDate);
				// var dailySummary = skyData.daily.data[i].summary;
				var dailyIconText = skyData.daily.data[i].icon;
				var dailyTemp = Math.trunc(skyData.daily.data[i].apparentTemperatureHigh);
				var dailyIcon = skyData.daily.data[i].icon;

				// WRITE DAILY DATA TO APP
				document.getElementById("data--daily--date").innerHTML += dailyDay + ' ' + day + '<br>';
				// document.getElementById("data--daily--summary").innerHTML += dailySummary + '<br>';
				document.getElementById("data--daily--icon--text").innerHTML += dailyIconText + '<br>';
				document.getElementById("data--daily--temp").innerHTML += dailyTemp + '°' + '<br>';

				// DAILY DYNAMIC ICON
				if (dailyIcon == 'clear-day') {
					document.getElementById("data--daily--icon").innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[0].icon + '">';
				}
				if (dailyIcon == 'clear-night') {
					document.getElementById("data--daily--icon").innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[1].icon + '">';
				}
				if (dailyIcon == 'rain') {
					document.getElementById("data--daily--icon").innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[2].icon + '">';
				}
				if (dailyIcon == 'snow') {
					document.getElementById("data--daily--icon").innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[3].icon + '">';
				}
				if (dailyIcon == 'sleet') {
					document.getElementById("data--daily--icon").innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[4].icon + '">';
				}
				if (dailyIcon == 'wind') {
					document.getElementById("data--daily--icon").innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[5].icon + '">';
				}
				if (dailyIcon == 'fog') {
					document.getElementById("data--daily--icon").innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[6].icon + '">';
				}
				if (dailyIcon == 'cloudy') {
					document.getElementById("data--daily--icon").innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[7].icon + '">';
				}
				if (dailyIcon == 'partly-cloudy-day') {
					document.getElementById("data--daily--icon").innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[8].icon + '">';
				}
				if (dailyIcon == 'partly-cloudy-night') {
					document.getElementById("data--daily--icon").innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[9].icon + '">';
				}

			} //DAILY DATA LOOP

			// CURRENT DATE PERERATION
			var daysPLUSmonths = ((now.getDate() < 10) ? "0" : "") + now.getDate();
			currentDate = days[now.getDay()] + " " +
				months[now.getMonth()] + " " + daysPLUSmonths;

			// WRITE CURRENT DATE TO APP
			document.getElementById("data--current--date").innerHTML = '<h2>' + currentDate + '</h2>';

			// LOADER
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

// TOOLTIP
$(document).ready(function () {
	$('.icon--info').tooltip({
		title: "<h2>WeatherWise aims to prioritize<br>preparedness so that users<br>know how to best dress and<br>prepare for the weather</h2>",
		html: true,
		placement: "left",
		offset: '15%, 15'
	});
});

// AUTOCOMPLETE
var input = document.getElementById('search--text--field');

function init() {
	var options = {
		types: ['(cities)']
	};
	var autocomplete = new google.maps.places.Autocomplete(input, options);

	google.maps.event.addListener(autocomplete, 'place_changed', function () {
		var place = autocomplete.getPlace();
		myLat = place.geometry.location.lat();
		myLng = place.geometry.location.lng();
	});
}
google.maps.event.addDomListener(window, 'load', init);

// SEARCH BUTTON
document.getElementById('search--button').addEventListener('click', sendRequest);

function sendRequest() {
	if (input.value == null){
		document.getElementById("search--text--field").innerHTML = '<h2>' + 'Please enter a location...' + '</h2>';
	} else {
	getSkyData();
	document.getElementById("data--location").innerHTML = '<img class="icon--md" src="icon/' + dataIcons[10].icon + '">' + '<h2>' + input.value + '</h2>';

	console.log('Weather changed to' + input.value);
}
}