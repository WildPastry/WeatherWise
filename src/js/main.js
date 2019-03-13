/*! weatherwise - v1.0.0 - 2019-03-13 */ 
/*jslint browser:true */
console.log('javascript ready...');

$(document).ready(function () {
	console.log("jquery ready...");
});

var skyKey;
var dateStamp;
var finalDateStamp;
var months_arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var tempData;
var tempIcon;
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
			}
		];

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
		url: 'https://api.darksky.net/forecast/' + skyKey + '/-41.2865,174.7762?units=si',
		dataType: 'jsonp',
		type: 'get',
		success: function (skyData) {
			console.log("SKY data loaded...");
			console.log(skyData);
			console.log("Current temperature:");
			console.log(skyData.currently.temperature);
			// console.log(" ");

			tempData = Math.trunc(skyData.currently.temperature);
			tempIcon = skyData.currently.icon;

			document.getElementById("data--temp").innerHTML = '<h1>' + tempData + '°' + '</h1>';
			// document.getElementById("data--temp--icon").innerHTML = tempIcon;

			// DYNAMIC BACKGROUNDS AND ICONS
			if (tempIcon == 'clear-day') {
				console.log("Changed background to yellow...");
				console.log("clear-day icon loaded...");
				document.getElementById("data--temp--icon").innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[0].icon + '">';
				$("#dynamic > div:first-of-type").addClass("bckgd--y-m");
			}
			if (tempIcon == 'clear-night') {
				console.log("Changed background to dark blue...");
				console.log("clear-night icon loaded...");
				document.getElementById("data--temp--icon").innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[1].icon + '">';
				$("#dynamic > div:first-of-type").addClass("bckgd--db-v");
			}
			if (tempIcon == 'rain') {
				console.log("Changed background to light blue...");
				console.log("rain icon loaded...");
				document.getElementById("data--temp--icon").innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[2].icon + '">';
				$("#dynamic > div:first-of-type").addClass("bckgd--b-m");
			}
			if (tempIcon == 'snow') {
				console.log("Changed background to dark blue...");
				console.log("snow icon loaded...");
				document.getElementById("data--temp--icon").innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[3].icon + '">';
				$("#dynamic > div:first-of-type").addClass("bckgd--db-m");
			}
			if (tempIcon == 'sleet') {
				console.log("Changed background to light blue...");
				console.log("sleet icon loaded...");
				document.getElementById("data--temp--icon").innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[4].icon + '">';
				$("#dynamic > div:first-of-type").addClass("bckgd--b-m");
			}
			if (tempIcon == 'wind') {
				console.log("Changed background to grey...");
				console.log("wind icon loaded...");
				document.getElementById("data--temp--icon").innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[5].icon + '">';
				$("#dynamic > div:first-of-type").addClass("bckgd--g-m");
			}
			if (tempIcon == 'fog') {
				console.log("Changed background to grey...");
				console.log("fog icon loaded...");
				document.getElementById("data--temp--icon").innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[6].icon + '">';
				$("#dynamic > div:first-of-type").addClass("bckgd--g-m");
			}
			if (tempIcon == 'cloudy') {
				console.log("Changed background to grey...");
				console.log("cloudy icon loaded...");
				document.getElementById("data--temp--icon").innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[7].icon + '">';
				$("#dynamic > div:first-of-type").addClass("bckgd--g-m");
			}
			if (tempIcon == 'partly-cloudy-day') {
				console.log("Changed background to dark grey...");
				console.log("partly-cloudy-day icon loaded...");
				document.getElementById("data--temp--icon").innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[8].icon + '">';
				$("#dynamic > div:first-of-type").addClass("bckgd--dg-m");
			}
			if (tempIcon == 'partly-cloudy-night') {
				console.log("Changed background to dark blue...");
				console.log("partly-cloudy-night icon loaded...");
				document.getElementById("data--temp--icon").innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[9].icon + '">';
				$("#dynamic > div:first-of-type").addClass("bckgd--db-v");
			}

			// console.log("Daily data:");
			for (var i = 0; i < skyData.daily.data.length; i++) {

				// DATESTAMP
				dateStamp = skyData.daily.data[i].time;

				// DATESTAMP CONVERSION
				var date = new Date(dateStamp * 1000);
				var year = date.getFullYear();
				var month = months_arr[date.getMonth()];
				var day = date.getDate();

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
				var dailySummary = skyData.daily.data[i].summary;
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
				console.log("clear-day icon loaded...");
				document.getElementById("data--daily--icon").innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[0].icon + '">';
			}
			if (dailyIcon == 'clear-night') {
				console.log("clear-night icon loaded...");
				document.getElementById("data--daily--icon").innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[1].icon + '">';
			}
			if (dailyIcon == 'rain') {
				console.log("rain icon loaded...");
				document.getElementById("data--daily--icon").innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[2].icon + '">';
			}
			if (dailyIcon == 'snow') {
				console.log("snow icon loaded...");
				document.getElementById("data--daily--icon").innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[3].icon + '">';
			}
			if (dailyIcon == 'sleet') {
				console.log("sleet icon loaded...");
				document.getElementById("data--daily--icon").innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[4].icon + '">';
			}
			if (dailyIcon == 'wind') {
				console.log("wind icon loaded...");
				document.getElementById("data--daily--icon").innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[5].icon + '">';
			}
			if (dailyIcon == 'fog') {
				console.log("fog icon loaded...");
				document.getElementById("data--daily--icon").innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[6].icon + '">';
			}
			if (dailyIcon == 'cloudy') {
				console.log("cloudy icon loaded...");
				document.getElementById("data--daily--icon").innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[7].icon + '">';
			}
			if (dailyIcon == 'partly-cloudy-day') {
				console.log("partly-cloudy-day icon loaded...");
				document.getElementById("data--daily--icon").innerHTML += '<img class="icon--sml" src="icon/weather/' + dataIcons[8].icon + '">';
			}
			if (dailyIcon == 'partly-cloudy-night') {
				console.log("partly-cloudy-night icon loaded...");
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

			// document.getElementById("data--temp--icon").innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[1].icon + '">';

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

// ICON WORK
// function dataIcons() {
// 	var j,
// 		icons = new dataIcons({
// 			"color": "#FFFFFF",
// 			"resizeClear": true
// 		}),
// CREATE ARRAY

// list = [
// 	"clear-day",
// 	"clear-night",
// 	"partly-cloudy-day",
// 	"partly-cloudy-night",
// 	"cloudy",
// 	"rain",
// 	"sleet",
// 	"snow",
// 	"wind",
// 	"fog"
// ];

// 	for (j = list.length; j--;) {
// 		var weatherType = list[j], // select each icon from list array
// 			// icons will have the name in the array above attached to the
// 			// canvas element as a class so let's hook into them.
// 			elements = document.getElementsByClassName(weatherType);

// 		// loop thru the elements now and set them up
// 		for (e = elements.length; e--;) {
// 			icons.set(elements[e], weatherType);
// 		}
// 	}
// }