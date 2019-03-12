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
			document.getElementById("data--temp--icon").innerHTML = tempIcon;

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

				// var actualDate = month + '-' + day + '-' + year;
				// console.log(actualDate);
				// console.log(skyData.daily.data[i].summary);
				// console.log("Humidity:");
				// console.log(skyData.daily.data[i].humidity);
				// console.log("UV Index:");
				// console.log(skyData.daily.data[i].uvIndex);
				// console.log("Wind speed:");
				// console.log(skyData.daily.data[i].windSpeed);
				// console.log(" ");

			}

		}, //SUCCESS
		error: function (error) {
			console.log(error);
			console.log('error getting data...');
		}
	}); //AJAX
} //FUNCTION

// ICON WORK
function skycons() {
	var i,
		icons = new Skycons({
			"color": "#FFFFFF",
			"resizeClear": true // nasty android hack
		}),
		list = [ // listing of all possible icons
			"clear-day",
			"clear-night",
			"partly-cloudy-day",
			"partly-cloudy-night",
			"cloudy",
			"rain",
			"sleet",
			"snow",
			"wind",
			"fog"
		];

	// loop thru icon list array
	for (i = list.length; i--;) {
		var weatherType = list[i], // select each icon from list array
			// icons will have the name in the array above attached to the
			// canvas element as a class so let's hook into them.
			elements = document.getElementsByClassName(weatherType);

		// loop thru the elements now and set them up
		for (e = elements.length; e--;) {
			icons.set(elements[e], weatherType);
		}
	}

	// animate the icons
	icons.play();
}

// TOOLTIPS
// $( document ).ready(function() {
// 	$( '[data-toggle="tooltip"]' ).each(function() {
// 	  new Tooltip($(this), {
// 		placement: 'bottom',
// 	  });
// 	});
//   });

// TOOLTIP
// $(document).ready(function(){

// $('[data-toggle="tooltip"]').tooltip();

//   });

$(document).ready(function () {
	$('.icon--info').tooltip({
		title: "<h2>WeatherWise aims to prioritize<br>preparedness so that users<br>know how to best dress and<br>prepare for the weather</h2>",
		html: true,
		placement: "left",
		offset: '10%, 10'
	});
});

//   $("[data-placement=right]").hover(function(){
//     $('.tooltip').css('top',parseInt($('.tooltip').css('top')) + 8 + 'px')
// });

// ICON WORK
// function skycons() {
// 	var i,
// 		icons = new Skycons({
// 			"color": "#FFFFFF",
// 			"resizeClear": true // nasty android hack
// 		}),
// 		list = [ // listing of all possible icons
// 			"clear-day",
// 			"clear-night",
// 			"partly-cloudy-day",
// 			"partly-cloudy-night",
// 			"cloudy",
// 			"rain",
// 			"sleet",
// 			"snow",
// 			"wind",
// 			"fog"
// 		];

// 	// loop thru icon list array
// 	for (i = list.length; i--;) {
// 		var weatherType = list[i], // select each icon from list array
// 			// icons will have the name in the array above attached to the
// 			// canvas element as a class so let's hook into them.
// 			elements = document.getElementsByClassName(weatherType);

// 		// loop thru the elements now and set them up
// 		for (e = elements.length; e--;) {
// 			icons.set(elements[e], weatherType);
// 		}
// 	}

// 	// animate the icons
// 	icons.play();
// }