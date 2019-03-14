/*jslint browser:true */
console.log('javascript ready...');

$(document).ready(function () {
	console.log("jquery ready...");
});

var skyKey;
var dateStamp;
var finalDateStamp;
var months_arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var days_arr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
var currentTemp;
var currentIcon;
var myLat = -41.2865;
var myLng = 174.7762;
var body = document.body;

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

document.getElementById("data--location").innerHTML = '<img class="icon--md" src="icon/' + dataIcons[10].icon + '">' + '<h2>' + "Wellington, New Zealand" + '</h2>';

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

// DATA
function getSkyData() {
	$.ajax({
		url: 'https://api.darksky.net/forecast/' + skyKey + '/' + myLat + ',' + myLng + '?units=si',
		dataType: 'jsonp',
		type: 'get',
		success: function (skyData) {
			console.log("SKY data loaded...");
			console.log(skyData);
			console.log("Current temperature:");
			console.log(skyData.currently.temperature);
			// console.log(" ");

			currentTemp = Math.trunc(skyData.currently.temperature);
			currentIcon = skyData.currently.icon;
			currentDesc = skyData.currently.summary;

			// document.getElementById("data--location").innerHTML = '<h2>' + input.value + '</h2>';
			document.getElementById("data--current--temp").innerHTML = '<h1>' + currentTemp + '°' + '</h1>';
			document.getElementById("data--current--desc").innerHTML = '<h3>' + currentDesc + '</h3>';

			// document.getElementById("data--current--icon").innerHTML = currentIcon;

			// DYNAMIC BACKGROUNDS AND ICONS
			if (currentIcon == 'clear-day') {
				console.log("clear-day icon loaded...");
				console.log("Yellow...");
				document.getElementById("data--current--icon").innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[0].icon + '">';
				body.classList.remove("bckgd--b-m", "bckgd--g-m", "bckgd--db-m");
				body.classList.add("bckgd--y-m");
				// $("#dynamic > div:first-of-type").addClass("bckgd--y-m");
				// $("#dynamic > div:first-of-type").removeClass("bckgd--b-m", "bckgd--db-m", "bckgd--g-m");
				document.getElementById("data--location--div").style.backgroundColor = '#ff9e3e';
				document.getElementById("search--text--field--div").style.backgroundColor = '#ff9e3e';
			}
			if (currentIcon == 'clear-night') {
				console.log("clear-night icon loaded...");
				console.log("Dark blue...");
				document.getElementById("data--current--icon").innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[1].icon + '">';
				body.classList.remove("bckgd--b-m", "bckgd--g-m", "bckgd--y-m");
				body.classList.add("bckgd--db-m");
				// $("#dynamic > div:first-of-type").addClass("bckgd--db-m");
				// $("#dynamic > div:first-of-type").removeClass("bckgd--y-m", "bckgd--b-m", "bckgd--g-m");
				document.getElementById("data--location--div").style.backgroundColor = '#0b1d30';
				document.getElementById("search--text--field--div").style.backgroundColor = '#0b1d30';
			}
			if (currentIcon == 'rain') {
				console.log("rain icon loaded...");
				console.log("Blue...");
				document.getElementById("data--current--icon").innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[2].icon + '">';
				body.classList.remove("bckgd--db-m", "bckgd--g-m", "bckgd--y-m");
				body.classList.add("bckgd--b-m");
				// $("#dynamic > div:first-of-type").addClass("bckgd--b-m");
				// $("#dynamic > div:first-of-type").removeClass("bckgd--y-m", "bckgd--db-m", "bckgd--g-m");
				document.getElementById("data--location--div").style.backgroundColor = '#136999';
				document.getElementById("search--text--field--div").style.backgroundColor = '#136999';
			}
			if (currentIcon == 'snow') {
				console.log("snow icon loaded...");
				console.log("Dark blue...");
				document.getElementById("data--current--icon").innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[3].icon + '">';
				body.classList.remove("bckgd--b-m", "bckgd--g-m", "bckgd--y-m");
				body.classList.add("bckgd--db-m");
				// $("#dynamic > div:first-of-type").addClass("bckgd--db-m");
				// $("#dynamic > div:first-of-type").removeClass("bckgd--y-m", "bckgd--b-m", "bckgd--g-m");
				document.getElementById("data--location--div").style.backgroundColor = '#0b1d30';
				document.getElementById("search--text--field--div").style.backgroundColor = '#0b1d30';
			}
			if (currentIcon == 'sleet') {
				console.log("sleet icon loaded...");
				console.log("Blue...");
				document.getElementById("data--current--icon").innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[4].icon + '">';
				body.classList.remove("bckgd--db-m", "bckgd--g-m", "bckgd--y-m");
				body.classList.add("bckgd--b-m");
				// $("#dynamic > div:first-of-type").addClass("bckgd--b-m");
				// $("#dynamic > div:first-of-type").removeClass("bckgd--y-m", "bckgd--db-m", "bckgd--g-m");
				document.getElementById("data--location--div").style.backgroundColor = '#136999';
				document.getElementById("search--text--field--div").style.backgroundColor = '#136999';
			}
			if (currentIcon == 'wind') {
				console.log("wind icon loaded...");
				console.log("Grey...");
				document.getElementById("data--current--icon").innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[5].icon + '">';
				body.classList.remove("bckgd--b-m", "bckgd--db-m", "bckgd--y-m");
				body.classList.add("bckgd--g-m");
				// $("#dynamic > div:first-of-type").addClass("bckgd--g-m");
				// $("#dynamic > div:first-of-type").removeClass("bckgd--y-m", "bckgd--b-m",  "bckgd--db-m");
				document.getElementById("data--location--div").style.backgroundColor = '#5a6977';
				document.getElementById("search--text--field--div").style.backgroundColor = '#5a6977';
			}
			if (currentIcon == 'fog') {
				console.log("fog icon loaded...");
				console.log("Grey...");
				document.getElementById("data--current--icon").innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[6].icon + '">';
				body.classList.remove("bckgd--b-m", "bckgd--db-m", "bckgd--y-m");
				body.classList.add("bckgd--g-m");
				// $("#dynamic > div:first-of-type").addClass("bckgd--g-m");
				// $("#dynamic > div:first-of-type").removeClass("bckgd--y-m", "bckgd--b-m",  "bckgd--db-m");
				document.getElementById("data--location--div").style.backgroundColor = '#5a6977';
				document.getElementById("search--text--field--div").style.backgroundColor = '#5a6977';
			}
			if (currentIcon == 'cloudy') {
				console.log("cloudy icon loaded...");
				console.log("Grey...");
				document.getElementById("data--current--icon").innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[7].icon + '">';
				body.classList.remove("bckgd--b-m", "bckgd--db-m", "bckgd--y-m");
				body.classList.add("bckgd--g-m");

				// document.getElementById("search--text--field--div").style.backgroundColor='red';
				document.getElementById("data--location--div").style.backgroundColor = '#5a6977';
				document.getElementById("search--text--field--div").style.backgroundColor = '#5a6977';
				// document.getElementById("info--icon").style.backgroundColor='#5a6977';

				// $("div").on( "click", "button", function( event ) {
				// 	$(event.delegateTarget ).css( "background-color", "green");
				//   });

				// var div = document.getElementById('search--text--field--div');
				// div.style.backgroundColor = 'green';

				// $("#dynamic > div:first-of-type").addClass("bckgd--g-m");
				// $("#dynamic > div:first-of-type").removeClass("bckgd--y-m", "bckgd--b-m", "bckgd--db-m");
			}
			if (currentIcon == 'partly-cloudy-day') {
				console.log("partly-cloudy-day icon loaded...");
				console.log("Grey...");
				document.getElementById("data--current--icon").innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[8].icon + '">';
				body.classList.remove("bckgd--b-m", "bckgd--db-m", "bckgd--y-m");
				body.classList.add("bckgd--g-m");
				// $("#dynamic > div:first-of-type").addClass("bckgd--g-m");
				// $("#dynamic > div:first-of-type").removeClass("bckgd--y-m", "bckgd--b-m", "bckgd--db-m");
				document.getElementById("data--location--div").style.backgroundColor = '#5a6977';
				document.getElementById("search--text--field--div").style.backgroundColor = '#5a6977';
			}
			if (currentIcon == 'partly-cloudy-night') {
				console.log("partly-cloudy-night icon loaded...");
				console.log("Dark blue...");
				document.getElementById("data--current--icon").innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[9].icon + '">';
				body.classList.remove("bckgd--b-m", "bckgd--g-m", "bckgd--y-m");
				body.classList.add("bckgd--db-m");
				// $("#dynamic > div:first-of-type").addClass("bckgd--db-m");
				// $("#dynamic > div:first-of-type").removeClass("bckgd--y-m", "bckgd--b-m", "bckgd--g-m");
				document.getElementById("data--location--div").style.backgroundColor = '#0b1d30';
				document.getElementById("search--text--field--div").style.backgroundColor = '#0b1d30';
			}

			document.getElementById("data--daily--date").innerHTML = "";
			// document.getElementById("data--daily--summary").innerHTML = "";
			document.getElementById("data--daily--icon--text").innerHTML = "";
			document.getElementById("data--daily--temp").innerHTML = "";
			document.getElementById("data--daily--icon").innerHTML = "";

			console.log(" ");
			console.log("Daily data:");
			for (var i = 0; i < skyData.daily.data.length; i++) {

				// DATESTAMP
				dateStamp = skyData.daily.data[i].time;

				// DATESTAMP CONVERSION
				var date = new Date(dateStamp * 1000);
				var year = date.getFullYear();
				var month = months_arr[date.getMonth()];
				var day = date.getDate();

				var weekdays = new Array(7);
				weekdays[0] = "Sunday";
				weekdays[1] = "Monday";
				weekdays[2] = "Tuesday";
				weekdays[3] = "Wednesday";
				weekdays[4] = "Thursday";
				weekdays[5] = "Friday";
				weekdays[6] = "Saturday";

				var current_date = new Date();

				weekday_value = current_date.getDay();

				console.log(weekdays[weekday_value]);

				// if (day == 5) {
				//     console.log('Tuesday');
				// } //IF
				// if (day == 6) {
				//     console.log('Wednesday');
				// } //IF
				// if (day == 7) {
				//     console.log('Thursday');
				// } //IF
				// if (day == 8) {
				//     console.log('Friday');
				// } //IF
				// if (day == 9) {
				//     console.log('Saturday');
				// } //IF
				// if (day == 10) {
				//     console.log('Sunday');
				// } //IF
				// if (day == 11) {
				//     console.log('Monday');
				// } //IF
				// if (day == 12) {
				//     console.log('Tuesday');
				// } //IF

				var dailyDate = month + '-' + day + '-' + year;
				// var dailySummary = skyData.daily.data[i].summary;
				var dailyIconText = skyData.daily.data[i].icon;
				var dailyIcon = skyData.daily.data[i].icon;
				var dailyTemp = Math.trunc(skyData.daily.data[i].apparentTemperatureHigh);

				// console.log(dailyDate);
				document.getElementById("data--daily--date").innerHTML += dailyDate + '<br>';
				// document.getElementById("data--daily--summary").innerHTML += dailySummary + '<br>';
				document.getElementById("data--daily--icon--text").innerHTML += dailyIconText + '<br>';
				document.getElementById("data--daily--temp").innerHTML += dailyTemp + '°' + '<br>';

				// DYNAMIC DAILY ICONS
				if (dailyIcon == 'clear-day') {
					// console.log("clear-day icon loaded...");
					document.getElementById("data--daily--icon").innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[0].icon + '">';
				}
				if (dailyIcon == 'clear-night') {
					// console.log("clear-night icon loaded...");
					document.getElementById("data--daily--icon").innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[1].icon + '">';
				}
				if (dailyIcon == 'rain') {
					// console.log("rain icon loaded...");
					document.getElementById("data--daily--icon").innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[2].icon + '">';
				}
				if (dailyIcon == 'snow') {
					// console.log("snow icon loaded...");
					document.getElementById("data--daily--icon").innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[3].icon + '">';
				}
				if (dailyIcon == 'sleet') {
					// console.log("sleet icon loaded...");
					document.getElementById("data--daily--icon").innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[4].icon + '">';
				}
				if (dailyIcon == 'wind') {
					// console.log("wind icon loaded...");
					document.getElementById("data--daily--icon").innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[5].icon + '">';
				}
				if (dailyIcon == 'fog') {
					// console.log("fog icon loaded...");
					document.getElementById("data--daily--icon").innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[6].icon + '">';
				}
				if (dailyIcon == 'cloudy') {
					// console.log("cloudy icon loaded...");
					document.getElementById("data--daily--icon").innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[7].icon + '">';
				}
				if (dailyIcon == 'partly-cloudy-day') {
					// console.log("partly-cloudy-day icon loaded...");
					document.getElementById("data--daily--icon").innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[8].icon + '">';
				}
				if (dailyIcon == 'partly-cloudy-night') {
					// console.log("partly-cloudy-night icon loaded...");
					document.getElementById("data--daily--icon").innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[9].icon + '">';
				}
				// console.log(skyData.daily.data[i].summary);
				// console.log("Humidity:");
				// console.log(skyData.daily.data[i].humidity);
				// console.log("UV Index:");
				// console.log(skyData.daily.data[i].uvIndex);
				// console.log("Wind speed:");
				// console.log(skyData.daily.data[i].windSpeed);
				// console.log(" ");

			} //FOR

			// document.getElementById("data--current--icon").innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[1].icon + '">';

		}, //SUCCESS
		error: function (error) {
			console.log(error);
			console.log('error getting data...');
		}
	}); //AJAX
} //FUNCTION

// TOOLTIP
$(document).ready(function () {
	$('.icon--info').tooltip({
		title: "<h2>WeatherWise aims to prioritize<br>preparedness so that users<br>know how to best dress and<br>prepare for the weather</h2>",
		html: true,
		placement: "left",
		offset: '10%, 10'
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

		// console.log(place.geometry.location.lat());
		// console.log(place.geometry.location.lng());

		myLat = place.geometry.location.lat();
		myLng = place.geometry.location.lng();

	});
}
google.maps.event.addDomListener(window, 'load', init);

// SEARCH BUTTON
document.getElementById('search--button').addEventListener('click', sendRequest);

function sendRequest() {
	// var place = autocomplete.getPlace();

	// input.value = place.geometry.location.lat();
	// input.value = place.geometry.location.lng();
	// console.log(lat);
	// console.log(lng);
	// myLat = -51.5074;
	// myLng = 0.1278;
	getSkyData();

	document.getElementById("data--location").innerHTML = '<img class="icon--md" src="icon/' + dataIcons[10].icon + '">' + '<h2>' + input.value + '</h2>';

	console.log('Changed to London weather...');
	// 	var place = autocomplete.getPlace();
	// 	// get lat
	// var lat = place.geometry.location.lat();
	// // get lng
	// var lng = place.geometry.location.lng();

}

// function initialize() {
// 	var input = document.getElementById('search--text--field');
// 	var autocomplete = new google.maps.places.Autocomplete(input);
// 	google.maps.event.addListener(autocomplete, 'place_changed', function () {
// 		var place = autocomplete.getPlace();
// 		document.getElementById('city2').value = place.name;
// 		document.getElementById('cityLat').value = place.geometry.location.lat();
// 		document.getElementById('cityLng').value = place.geometry.location.lng();
// 		//alert("This function is working!");
// 		//alert(place.name);
// 	   // alert(place.address_components[0].long_name);

// 	});
// }
// google.maps.event.addDomListener(window, 'load', initialize);