/*! weatherwise - v1.0.0 - 2019-03-20 */
/*jslint browser:true */
/*jshint esversion: 6 */

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
		console.log('Error getting key...');
	}
});

/* VARIABLES */

// HANNAH VARIABLES
var getHumidity = document.getElementById("data__humidity");
var getUv = document.getElementById("data__uvIndex");
var getWind = document.getElementById("data__windGust");
var getTime = document.getElementById("data__time");
const getHannah = document.getElementById("data--extra-bg");

// LISA VARIABLES
var getformattedRiseTime = document.getElementById("data__time--sunrise");
var getformattedSetTime = document.getElementById("data__time--sunset");
var getCountdown = document.getElementById("countdown__div");

// MIKE VARIABLES
const body = document.body;
var skyKey, dateStamp, finalDateStamp, currentTemp, currentIcon;
var myLat = -41.2865;
var myLng = 174.7762;

const input = document.getElementById('search--text--field');

var now = new Date();
var days = new Array('SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY');
var months = new Array('January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');

const getTopTemp = document.getElementById("top--temp");
const getTopLocation = document.getElementById("top--location");

const getCurrentTempHigh = document.getElementById("data--current--temp-high");
const getCurrentTempLow = document.getElementById("data--current--temp-low");
const getCurrentDesc = document.getElementById("data--current--desc");
const getCurrentIcon = document.getElementById("data--current--icon");
const getCurrentDate = document.getElementById("data--current--date");
const getLocationDiv = document.getElementById("data--location--div");
const getLocation = document.getElementById("data--location");
const getSearchFieldDiv = document.getElementById("search--text--field--div");
const getSearchField = document.getElementById("search--text--field");
const getSearchButton = document.getElementById("search--button");
const getPowerButton = document.getElementById("power--button");

const getDailyBG = document.getElementById("data--daily-bg");
const getDailyDate = document.getElementById("data--daily--date");
const getDailyTemp = document.getElementById("data--daily--temp");
const getDailyTempLow = document.getElementById("data--daily--temp-low");
const getDailyIcon = document.getElementById("data--daily--icon");
const makeDiv = document.createElement('div');

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

// DATA
function getSkyData() {
	$('#master--loader').show();
	$.ajax({
		url: 'https://api.darksky.net/forecast/' + skyKey + '/' + myLat + ',' + myLng + '?units=si',
		dataType: 'jsonp',
		type: 'get',
		success: function (skyData) {

			// BASIC LOG
			console.log("SKY data loaded...");
			console.log(skyData);

			currentTemp = Math.trunc(skyData.currently.temperature);
			currentTempHigh = Math.trunc(skyData.daily.data[0].apparentTemperatureHigh);
			currentTempLow = Math.trunc(skyData.daily.data[0].apparentTemperatureLow);
			currentIcon = skyData.currently.icon;
			currentDesc = skyData.hourly.summary;

			// WRITE CURRENT DATA TO APP
			getTopTemp.innerHTML = '<p>' + 'Currently ' + '<span class="bold space">' + currentTemp + '°' + '</span>' + '</p>';
			getCurrentTempHigh.innerHTML = '<h1 class="bold space">' + currentTempHigh + '°' + '&nbsp;' + '</h1>' + '<p class="marginBot">high</p>';
			getCurrentTempLow.innerHTML = '<h1 class="light space">' + currentTempLow + '°' + '</h1>' + '<p class="marginBot">low</p>';
			getCurrentDesc.innerHTML = '<p>' + 'Feels like ' + '<span class="bold space">' + currentTemp + '°' + '</span>' + '</p>' + '<h3>' + currentDesc + '</h3>';

			// CURRENT DYNAMIC BACKGROUND AND ICON
			if (currentIcon == 'clear-day') {
				getCurrentIcon.innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[0].icon + '">' + '<p class="marginBot">&nbsp;</p>';
				body.classList.remove("bckgd--b-m", "bckgd--g-m", "bckgd--db-m", "bckgd--g-v");
				body.classList.add("bckgd--y-m");
				getLocationDiv.style.backgroundColor = '#ff9e3e';
				getSearchFieldDiv.style.backgroundColor = '#ff9e3e';
				getSearchField.style.backgroundColor = '#ff9e3e';
				getSearchButton.style.color = '#ff9e3e';
				getPowerButton.style.backgroundColor = '#ff9e3e';
				getHannah.style.backgroundColor = '#ff9e3e';
				getDailyBG.style.backgroundColor = '#ffca76';
				$(document).ready(function () {
					$(".icon--info").tooltip();
					$('#icon--info').hover(function () {
						changeTooltipColorTo('#ff9e3e');
					});
				});
			}
			if (currentIcon == 'clear-night') {
				getCurrentIcon.innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[1].icon + '">' + '<p class="marginBot">&nbsp;</p>';
				body.classList.remove("bckgd--b-m", "bckgd--g-m", "bckgd--y-m", "bckgd--g-v");
				body.classList.add("bckgd--db-m");
				getLocationDiv.style.backgroundColor = '#0b1d30';
				getSearchFieldDiv.style.backgroundColor = '#0b1d30';
				getSearchField.style.backgroundColor = '#0b1d30';
				getSearchButton.style.color = '#0b1d30';
				getPowerButton.style.backgroundColor = '#0b1d30';
				getHannah.style.backgroundColor = '#0b1d30';
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
				getCurrentIcon.innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[2].icon + '">' + '<p class="marginBot">&nbsp;</p>';
				body.classList.remove("bckgd--db-m", "bckgd--g-m", "bckgd--y-m", "bckgd--g-v");
				body.classList.add("bckgd--b-m");
				getLocationDiv.style.backgroundColor = '#136999';
				getSearchFieldDiv.style.backgroundColor = '#136999';
				getSearchField.style.backgroundColor = '#136999';
				getSearchButton.style.color = '#136999';
				getPowerButton.style.backgroundColor = '#136999';
				getHannah.style.backgroundColor = '#136999';
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
				getCurrentIcon.innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[3].icon + '">' + '<p class="marginBot">&nbsp;</p>';
				body.classList.remove("bckgd--b-m", "bckgd--g-m", "bckgd--y-m", "bckgd--g-v");
				body.classList.add("bckgd--db-m");
				getLocationDiv.style.backgroundColor = '#0b1d30';
				getSearchFieldDiv.style.backgroundColor = '#0b1d30';
				getSearchField.style.backgroundColor = '#0b1d30';
				getSearchButton.style.color = '#0b1d30';
				getPowerButton.style.backgroundColor = '#0b1d30';
				getHannah.style.backgroundColor = '#0b1d30';
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
				getCurrentIcon.innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[4].icon + '">' + '<p class="marginBot">&nbsp;</p>';
				body.classList.remove("bckgd--db-m", "bckgd--g-m", "bckgd--y-m", "bckgd--g-v");
				body.classList.add("bckgd--b-m");
				getLocationDiv.style.backgroundColor = '#136999';
				getSearchFieldDiv.style.backgroundColor = '#136999';
				getSearchField.style.backgroundColor = '#136999';
				getSearchButton.style.color = '#136999';
				getPowerButton.style.backgroundColor = '#136999';
				getHannah.style.backgroundColor = '#136999';
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
				getCurrentIcon.innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[5].icon + '">' + '<p class="marginBot">&nbsp;</p>';
				body.classList.remove("bckgd--b-m", "bckgd--db-m", "bckgd--y-m");
				body.classList.add("bckgd--g-v");
				getLocationDiv.style.backgroundColor = '#323b44';
				getSearchFieldDiv.style.backgroundColor = '#323b44';
				getSearchField.style.backgroundColor = '#323b44';
				getSearchButton.style.color = '#323b44';
				getPowerButton.style.backgroundColor = '#323b44';
				getHannah.style.backgroundColor = '#323b44';
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
				getCurrentIcon.innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[6].icon + '">' + '<p class="marginBot">&nbsp;</p>';
				body.classList.remove("bckgd--b-m", "bckgd--db-m", "bckgd--y-m", "bckgd--g-v");
				body.classList.add("bckgd--g-m");
				getLocationDiv.style.backgroundColor = '#5a6977';
				getSearchFieldDiv.style.backgroundColor = '#5a6977';
				getSearchField.style.backgroundColor = '#5a6977';
				getSearchButton.style.color = '#5a6977';
				getPowerButton.style.backgroundColor = '#5a6977';
				getHannah.style.backgroundColor = '#5a6977';
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
				getCurrentIcon.innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[7].icon + '">' + '<p class="marginBot">&nbsp;</p>';
				body.classList.remove("bckgd--b-m", "bckgd--db-m", "bckgd--y-m");
				body.classList.add("bckgd--g-v");
				getLocationDiv.style.backgroundColor = '#323b44';
				getSearchFieldDiv.style.backgroundColor = '#323b44';
				getSearchField.style.backgroundColor = '#323b44';
				getSearchButton.style.color = '#323b44';
				getPowerButton.style.backgroundColor = '#323b44';
				getHannah.style.backgroundColor = '#323b44';
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
				getCurrentIcon.innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[8].icon + '">' + '<p class="marginBot">&nbsp;</p>';
				body.classList.remove("bckgd--b-m", "bckgd--db-m", "bckgd--y-m", "bckgd--g-v");
				body.classList.add("bckgd--g-m");
				getLocationDiv.style.backgroundColor = '#5a6977';
				getSearchFieldDiv.style.backgroundColor = '#5a6977';
				getSearchField.style.backgroundColor = '#5a6977';
				getSearchButton.style.color = '#5a6977';
				getPowerButton.style.backgroundColor = '#5a6977';
				getHannah.style.backgroundColor = '#5a6977';
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
				getCurrentIcon.innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[9].icon + '">' + '<p class="marginBot">&nbsp;</p>';
				body.classList.remove("bckgd--b-m", "bckgd--g-m", "bckgd--y-m", "bckgd--g-v");
				body.classList.add("bckgd--db-m");
				getLocationDiv.style.backgroundColor = '#0b1d30';
				getSearchFieldDiv.style.backgroundColor = '#0b1d30';
				getSearchField.style.backgroundColor = '#0b1d30';
				getSearchButton.style.color = '#0b1d30';
				getPowerButton.style.backgroundColor = '#0b1d30';
				getHannah.style.backgroundColor = '#0b1d30';
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

			//DATA TO HOURS AND MINUTES
			unix_timestamp = skyData.daily.data[0].sunriseTime;
			var date2 = new Date(unix_timestamp * 1000);
			var hours = date2.getHours();
			var minutes = "0" + date2.getMinutes();
			var seconds = "0" + date2.getSeconds();
			var formattedRiseTime = hours + ':' + minutes.substr(-2);
			sunset_timestamp = skyData.daily.data[0].sunsetTime;
			var date3 = new Date(sunset_timestamp * 1000);
			var hoursSet = date3.getHours();
			var minutesSet = "0" + date3.getMinutes();
			var secondsSet = "0" + date3.getSeconds();
			var formattedSetTime = (hoursSet - 12) + ':' + minutesSet.substr(-2);
			var formattedSetTimeSeconds = (hoursSet - 12) + ':' + minutesSet.substr(-2) + ':' + secondsSet + secondsSet.substr(-2);

			//DISPLAYING SUNRISE + SUNSET HTML
			sunrise = Math.trunc(skyData.daily.data[0].sunriseTime);
			sunset = Math.trunc(skyData.daily.data[0].sunsetTime);
			getformattedRiseTime.innerHTML = '<h1>' + formattedRiseTime + '<span class="ampm space">' + ' am' + '</span>' + '</h1>';
			getformattedSetTime.innerHTML = '<h1>' + formattedSetTime + '<span class="ampm space">' + ' pm' + '</span>' + '</h1>';

			//COUNTDOWN
			var sunSetTime = skyData.daily.data[0].sunsetTime;
			var sunTimer = new Date(sunSetTime * 1000).toString();
			var sunTimerShort = sunTimer.slice(0, 24);
			var countDownDate = new Date(sunTimerShort).getTime();

			// SET INTERVAL
			var x = setInterval(function () {
				var now = new Date().getTime();
				var distance = countDownDate - now;
				var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
				var seconds = Math.floor((distance % (1000 * 60)) / 1000);

				// WRITE COUNTDOWN TO APP
				getCountdown.innerHTML = "<h1>" + hours + " : " +
					minutes + " : " + seconds + " " + "</h1>";

				if (distance < 0) {
					clearInterval(x);
					getCountdown.innerHTML = "<h1>" + "The sun has set today!" + "</h1>";
				}
			}, 1000);

			// GETTING HUMIDITY
			humidity = (skyData.daily.data[0].humidity) * 100;
			getHumidity.innerHTML = '<h1>' + humidity  + '<span class="ampm space">' + ' %' + '</span>' + '</h1>';

			// GETTING UV INDEX
			uvIndex = (skyData.daily.data[0].uvIndex);
			getUv.innerHTML = '<h1>' + uvIndex + '</h1>';

			// GETTING WIND SPEED/GUST
			windGust = Math.round((skyData.daily.data[0].windGust));
			getWind.innerHTML = '<h1>' + windGust  + '<span class="ampm space">' + ' km/h' + '</span>' + '</h1>';

			// AREA CHART FOR WIND SPEED DURING THE DAY
			google.charts.load('current', {
				'packages': ['corechart']
			});
			google.charts.setOnLoadCallback(drawChart);

			function drawChart() {

				var data = new google.visualization.DataTable();
				data.addColumn("string", "Day");
				data.addColumn("number", "Wind");

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
						title: 'DAY',
						titleTextStyle: {
							color: '#ffffff',
							fontSize: 12,
							italic: false,
							fontName: 'Poppins'
						},
						textStyle: {
							color: '#ffffff',
							fontSize: 9,
							fontName: 'Poppins'
						}
					},
					vAxis:

					{
						title: 'WIND SPEED (KM/H)',
						titleTextStyle: {
							color: '#ffffff',
							fontSize: 12,
							italic: false,
							fontName: 'Poppins'
						},
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

		}, //SUCCESS
		error: function (error) {
			console.log(error);
			console.log('Error getting data...');
		}

	}); //AJAX

} //FUNCTION

// WRITE DEFAULT LOCATION TO APP
getLocation.innerHTML = '<img class="icon--md" src="icon/' + dataIcons[10].icon + '">' + '<h2>' + "Wellington, New Zealand" + '</h2>';
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

// SEARCH VALIDATION
function validateSearchField() {
	var myCities = /([A-Z])\w+/;
	if (getSearchField.value.match(myCities)) {
		$('.search--text--field--div').tooltip('hide');
		getSkyData();
		getLocation.innerHTML = '<img class="icon--md" src="icon/' + dataIcons[10].icon + '">' + '<h2>' + input.value + '</h2>';

		// WRITE CURRENT LOCATION TO APP
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