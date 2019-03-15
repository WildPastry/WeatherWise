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
var body = document.body;
var skyKey, dateStamp, finalDateStamp, currentTemp, currentIcon;
var myLat = -41.2865;
var myLng = 174.7762;

// DATE VARIABLES
var now = new Date();
var days = new Array('SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY');
var months = new Array('January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');

// CURRENT DATA VARIABLES
var getCurrentTemp = document.getElementById("data--current--temp");
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
// var getDailyIconText = document.getElementById("data--daily--icon--text");
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

			currentTemp = Math.trunc(skyData.daily.data[0].apparentTemperatureHigh);
			currentTempLow = Math.trunc(skyData.daily.data[0].apparentTemperatureLow);
			currentIcon = skyData.currently.icon;
			currentDesc = skyData.daily.summary;
			// currentDesc = skyData.currently.summary;

			// WRITE CURRENT DATA TO APP
			getCurrentTemp.innerHTML = '<h1 class="bold">' + currentTemp + '°' + '</h1>';
			getCurrentTempLow.innerHTML = '<h1 class="light">' + currentTempLow + '°' + '</h1>';
			getCurrentDesc.innerHTML = '<h2>' + currentDesc + '</h2>';

			// CURRENT DYNAMIC BACKGROUND AND ICON
			if (currentIcon == 'clear-day') {
				console.log("clear-day icon loaded...");
				getCurrentIcon.innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[0].icon + '">';
				body.classList.remove("bckgd--b-m", "bckgd--g-m", "bckgd--db-m", "bckgd--g-v");
				body.classList.add("bckgd--y-m");
				getLocationDiv.style.backgroundColor = '#ff9e3e';
				getSearchFieldDiv.style.backgroundColor = '#ff9e3e';
				getSearchField.style.backgroundColor = '#ff9e3e';
				getDailyBG.style.backgroundColor = '#ffca76';
			}
			if (currentIcon == 'clear-night') {
				console.log("clear-night icon loaded...");
				getCurrentIcon.innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[1].icon + '">';
				body.classList.remove("bckgd--b-m", "bckgd--g-m", "bckgd--y-m", "bckgd--g-v");
				body.classList.add("bckgd--db-m");
				getLocationDiv.style.backgroundColor = '#0b1d30';
				getSearchFieldDiv.style.backgroundColor = '#0b1d30';
				getSearchField.style.backgroundColor = '#0b1d30';
				getDailyBG.style.backgroundColor = '#586980';
			}
			if (currentIcon == 'rain') {
				console.log("rain icon loaded...");
				getCurrentIcon.innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[2].icon + '">';
				body.classList.remove("bckgd--db-m", "bckgd--g-m", "bckgd--y-m", "bckgd--g-v");
				body.classList.add("bckgd--b-m");
				getLocationDiv.style.backgroundColor = '#136999';
				getSearchFieldDiv.style.backgroundColor = '#136999';
				getSearchField.style.backgroundColor = '#136999';
				getDailyBG.style.backgroundColor = '#66a9d7';
			}
			if (currentIcon == 'snow') {
				console.log("snow icon loaded...");
				getCurrentIcon.innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[3].icon + '">';
				body.classList.remove("bckgd--b-m", "bckgd--g-m", "bckgd--y-m", "bckgd--g-v");
				body.classList.add("bckgd--db-m");
				getLocationDiv.style.backgroundColor = '#0b1d30';
				getSearchFieldDiv.style.backgroundColor = '#0b1d30';
				getSearchField.style.backgroundColor = '#0b1d30';
				getDailyBG.style.backgroundColor = '#586980';
			}
			if (currentIcon == 'sleet') {
				console.log("sleet icon loaded...");
				getCurrentIcon.innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[4].icon + '">';
				body.classList.remove("bckgd--db-m", "bckgd--g-m", "bckgd--y-m", "bckgd--g-v");
				body.classList.add("bckgd--b-m");
				getLocationDiv.style.backgroundColor = '#136999';
				getSearchFieldDiv.style.backgroundColor = '#136999';
				getSearchField.style.backgroundColor = '#136999';
				getDailyBG.style.backgroundColor = '#66a9d7';
			}
			if (currentIcon == 'wind') {
				console.log("wind icon loaded...");
				getCurrentIcon.innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[5].icon + '">';
				body.classList.remove("bckgd--b-m", "bckgd--db-m", "bckgd--y-m");
				body.classList.add("bckgd--g-v");
				getLocationDiv.style.backgroundColor = '#323b44';
				getSearchFieldDiv.style.backgroundColor = '#323b44';
				getSearchField.style.backgroundColor = '#323b44';
				getDailyBG.style.backgroundColor = '#566470';
			}
			if (currentIcon == 'fog') {
				console.log("fog icon loaded...");
				getCurrentIcon.innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[6].icon + '">';
				body.classList.remove("bckgd--b-m", "bckgd--db-m", "bckgd--y-m", "bckgd--g-v");
				body.classList.add("bckgd--g-m");
				getLocationDiv.style.backgroundColor = '#5a6977';
				getSearchFieldDiv.style.backgroundColor = '#5a6977';
				getSearchField.style.backgroundColor = '#5a6977';
				getDailyBG.style.backgroundColor = '#99a9bb';
			}
			if (currentIcon == 'cloudy') {
				console.log("cloudy icon loaded...");
				getCurrentIcon.innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[7].icon + '">';
				body.classList.remove("bckgd--b-m", "bckgd--db-m", "bckgd--y-m");
				body.classList.add("bckgd--g-v");
				getLocationDiv.style.backgroundColor = '#323b44';
				getSearchFieldDiv.style.backgroundColor = '#323b44';
				getSearchField.style.backgroundColor = '#323b44';
				getDailyBG.style.backgroundColor = '#566470';
			}
			if (currentIcon == 'partly-cloudy-day') {
				console.log("partly-cloudy-day icon loaded...");
				getCurrentIcon.innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[8].icon + '">';
				body.classList.remove("bckgd--b-m", "bckgd--db-m", "bckgd--y-m", "bckgd--g-v");
				body.classList.add("bckgd--g-m");
				getLocationDiv.style.backgroundColor = '#5a6977';
				getSearchFieldDiv.style.backgroundColor = '#5a6977';
				getSearchField.style.backgroundColor = '#5a6977';
				getDailyBG.style.backgroundColor = '#99a9bb';
			}
			if (currentIcon == 'partly-cloudy-night') {
				console.log("partly-cloudy-night icon loaded...");
				getCurrentIcon.innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[9].icon + '">';
				body.classList.remove("bckgd--b-m", "bckgd--g-m", "bckgd--y-m", "bckgd--g-v");
				body.classList.add("bckgd--db-m");
				getLocationDiv.style.backgroundColor = '#0b1d30';
				getSearchFieldDiv.style.backgroundColor = '#0b1d30';
				getSearchField.style.backgroundColor = '#0b1d30';
				getDailyBG.style.backgroundColor = '#586980';
			}

			// CLEAR DAILY DATA
			getDailyDate.innerHTML = "";
			// getDailyIconText.innerHTML = "";
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
				// var dailyIconText = skyData.daily.data[i].icon;
				var dailyTemp = Math.trunc(skyData.daily.data[i].apparentTemperatureHigh);
				var dailyTempLow = Math.trunc(skyData.daily.data[i].apparentTemperatureLow);
				var dailyIcon = skyData.daily.data[i].icon;

				// WRITE DAILY DATA TO APP
				getDailyDate.innerHTML += '<p class="data--daily">' + dailyDay + '</p>';
				// getDailyIconText.innerHTML += '<p class="data--daily">' + dailyIconText + '</p>';
				getDailyTemp.innerHTML += '<p class="data--daily bold">' + dailyTemp + '°' + '</p>';
				getDailyTempLow.innerHTML += '<p class="data--daily">' + dailyTempLow + '°' + '</p>';

				// DAILY DYNAMIC ICON
				iconWrapper = document.getElementById('iconWrapper');

				if (dailyIcon == 'clear-day') {
					makeDiv.className = 'data--daily marginTop';
					iconWrapper.appendChild(makeDiv);
					makeDiv.appendChild(getDailyIcon);
					getDailyIcon.innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[0].icon + '">';
				}
				if (dailyIcon == 'clear-night') {
					makeDiv.className = 'data--daily';
					iconWrapper.appendChild(makeDiv);
					makeDiv.appendChild(getDailyIcon);
					getDailyIcon.innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[1].icon + '">';
				}
				if (dailyIcon == 'rain') {
					makeDiv.className = 'data--daily';
					iconWrapper.appendChild(makeDiv);
					makeDiv.appendChild(getDailyIcon);
					getDailyIcon.innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[2].icon + '">';
				}
				if (dailyIcon == 'snow') {
					makeDiv.className = 'data--daily';
					iconWrapper.appendChild(makeDiv);
					makeDiv.appendChild(getDailyIcon);
					getDailyIcon.innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[3].icon + '">';
				}
				if (dailyIcon == 'sleet') {
					makeDiv.className = 'data--daily';
					iconWrapper.appendChild(makeDiv);
					makeDiv.appendChild(getDailyIcon);
					getDailyIcon.innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[4].icon + '">';
				}
				if (dailyIcon == 'wind') {
					makeDiv.className = 'data--daily';
					iconWrapper.appendChild(makeDiv);
					makeDiv.appendChild(getDailyIcon);
					getDailyIcon.innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[5].icon + '">';
				}
				if (dailyIcon == 'fog') {
					makeDiv.className = 'data--daily';
					iconWrapper.appendChild(makeDiv);
					makeDiv.appendChild(getDailyIcon);
					getDailyIcon.innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[6].icon + '">';
				}
				if (dailyIcon == 'cloudy') {
					makeDiv.className = 'data--daily';
					iconWrapper.appendChild(makeDiv);
					makeDiv.appendChild(getDailyIcon);
					getDailyIcon.innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[7].icon + '">';
				}
				if (dailyIcon == 'partly-cloudy-day') {
					makeDiv.className = 'data--daily';
					iconWrapper.appendChild(makeDiv);
					makeDiv.appendChild(getDailyIcon);
					getDailyIcon.innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[8].icon + '">';
				}
				if (dailyIcon == 'partly-cloudy-night') {
					makeDiv.className = 'data--daily';
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
			getCurrentDate.innerHTML = '<h2>' + '<span class="bold">' + currentDay + '</span>' + currentMonth + 'th' + '</h2>';

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
		title: "<p>WeatherWise aims to prioritize<br>preparedness so that users<br>know how to best dress and<br>prepare for the weather</p>",
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
getSearchButton.addEventListener('click', sendRequest);

function sendRequest() {
	if (input.value == null || input.value == "") {
		console.log('Please enter location...');
		getSearchField.innerHTML = 'Please enter location...';
		return false;
	} else {
		getSkyData();
		getLocation.innerHTML = '<img class="icon--md" src="icon/' + dataIcons[10].icon + '">' + '<h2>' + input.value + '</h2>';
		console.log('Location changed to ' + input.value);
	}
}