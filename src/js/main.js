<<<<<<< HEAD
/*! weatherwise - v1.0.0 - 2019-03-18 */ 


=======

/*! weatherwise - v1.0.0 - 2019-03-14 */ /*! weatherwise - v1.0.0 - 2019-03-14 */ 
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = google.visualization.arrayToDataTable([
	['Time', 'Wind (km/h)'],
	['12:00',  50],
	['1:00',  20],
	['2:00',  30],
	['3:00',  80]
  ]);

  var options = {
	indexLabel: 'Poppins',
	titleTextStyle: 
	  {color: '#ffffff', fontSize: 10, fontName: 'Poppins'},
	title: '',
	legend: 'none',
	hAxis: 
	  {textStyle:{color: '#ffffff', fontName: 'Poppins'}},
	vAxis: 
	  {textStyle:{color: '#ffffff', fontName: 'Poppins'}},
	backgroundColor: '#5a6977',
	colors: ['#ffffff'],
	tooltip: 
	  {textStyle: {color: '#5a6977', fontName: 'Poppins', fontSize: 10}
	},
  };

  var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}

/*! weatherwise - v1.0.0 - 2019-03-18 */ 
// CHECK JAVASCRIPT + JQUERY
>>>>>>> 4b960ae3fdcde28c4c7e8d115de51633f2b258a1
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
}
];

document.getElementById("data--location").innerHTML = '<h2>' + "Wellington, New Zealand" + '</h2>';

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
		  console.log("Changed background to yellow...");
		  console.log("clear-day icon loaded...");
		  document.getElementById("data--current--icon").innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[0].icon + '">';
		  $("#dynamic > div:first-of-type").addClass("bckgd--y-m");
		  $("#dynamic > div:first-of-type").removeClass("bckgd--db-v", "bckgd--b-m", "bckgd--db-m", "bckgd--g-m", "bckgd--g-v", "bckgd--db-v");
	  }
	  if (currentIcon == 'clear-night') {
		  console.log("Changed background to dark blue...");
		  console.log("clear-night icon loaded...");
		  document.getElementById("data--current--icon").innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[1].icon + '">';
		  $("#dynamic > div:first-of-type").addClass("bckgd--db-v");
		  $("#dynamic > div:first-of-type").removeClass("bckgd--y-m", "bckgd--b-m", "bckgd--db-m", "bckgd--g-m", "bckgd--g-v", "bckgd--db-v");
	  }
	  if (currentIcon == 'rain') {
		  console.log("Changed background to light blue...");
		  console.log("rain icon loaded...");
		  document.getElementById("data--current--icon").innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[2].icon + '">';
		  $("#dynamic > div:first-of-type").addClass("bckgd--b-m");
		  $("#dynamic > div:first-of-type").removeClass("bckgd--y-m", "bckgd--db-m", "bckgd--g-m", "bckgd--g-v", "bckgd--db-v");
	  }
	  if (currentIcon == 'snow') {
		  console.log("Changed background to dark blue...");
		  console.log("snow icon loaded...");
		  document.getElementById("data--current--icon").innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[3].icon + '">';
		  $("#dynamic > div:first-of-type").addClass("bckgd--db-m");
		  $("#dynamic > div:first-of-type").removeClass("bckgd--y-m", "bckgd--b-m", "bckgd--g-m", "bckgd--g-v", "bckgd--db-v");
	  }
	  if (currentIcon == 'sleet') {
		  console.log("Changed background to light blue...");
		  console.log("sleet icon loaded...");
		  document.getElementById("data--current--icon").innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[4].icon + '">';
		  $("#dynamic > div:first-of-type").addClass("bckgd--b-m");
		  $("#dynamic > div:first-of-type").removeClass("bckgd--y-m", "bckgd--db-m", "bckgd--g-m", "bckgd--g-v", "bckgd--db-v");
	  }
	  if (currentIcon == 'wind') {
		  console.log("Changed background to grey...");
		  console.log("wind icon loaded...");
		  document.getElementById("data--current--icon").innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[5].icon + '">';
		  $("#dynamic > div:first-of-type").addClass("bckgd--g-m");
		  $("#dynamic > div:first-of-type").removeClass("bckgd--y-m", "bckgd--b-m", "bckgd--db-m", "bckgd--g-v", "bckgd--db-v");
	  }
	  if (currentIcon == 'fog') {
		  console.log("Changed background to grey...");
		  console.log("fog icon loaded...");
		  document.getElementById("data--current--icon").innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[6].icon + '">';
		  $("#dynamic > div:first-of-type").addClass("bckgd--g-m");
		  $("#dynamic > div:first-of-type").removeClass("bckgd--y-m", "bckgd--b-m", "bckgd--db-m", "bckgd--g-v", "bckgd--db-v");
	  }
	  if (currentIcon == 'cloudy') {
		  console.log("Changed background to grey...");
		  console.log("cloudy icon loaded...");
		  document.getElementById("data--current--icon").innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[7].icon + '">';
		  $("#dynamic > div:first-of-type").addClass("bckgd--g-m");
		  $("#dynamic > div:first-of-type").removeClass("bckgd--y-m", "bckgd--b-m", "bckgd--db-m", "bckgd--g-v", "bckgd--db-v");
	  }
	  if (currentIcon == 'partly-cloudy-day') {
		  console.log("Changed background to dark grey...");
		  console.log("partly-cloudy-day icon loaded...");
		  document.getElementById("data--current--icon").innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[8].icon + '">';
		  $("#dynamic > div:first-of-type").addClass("bckgd--g-v");
		  $("#dynamic > div:first-of-type").removeClass("bckgd--y-m", "bckgd--b-m", "bckgd--db-m", "bckgd--g-m", "bckgd--db-v");
	  }
	  if (currentIcon == 'partly-cloudy-night') {
		  console.log("Changed background to dark blue...");
		  console.log("partly-cloudy-night icon loaded...");
		  document.getElementById("data--current--icon").innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[9].icon + '">';
		  $("#dynamic > div:first-of-type").addClass("bckgd--db-v");
		  $("#dynamic > div:first-of-type").removeClass("bckgd--y-m", "bckgd--b-m", "bckgd--db-m", "bckgd--g-m", "bckgd--g-v");
	  }

	  document.getElementById("data--daily--date").innerHTML = "";
	  // document.getElementById("data--daily--summary").innerHTML = "";
	  document.getElementById("data--daily--icon--text").innerHTML = "";
	  document.getElementById("data--daily--temp").innerHTML = "";
	  document.getElementById("data--daily--icon").innerHTML = "";

	  console.log(" ");
	  console.log("Daily data:");
	  for (var i = 0; i < skyData.daily.data.length; i++) {

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
			getCurrentDesc.innerHTML = '<h3>' + currentDesc + '</h3>';

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

	  // document.getElementById("data--current--icon").innerHTML = '<img class="icon--bg" src="icon/weather/' + dataIcons[1].icon + '">';

  }, //SUCCESS
  error: function (error) {
	  console.log(error);
	  console.log('error getting data...');
  }
}); //AJAX

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
			getCurrentDate.innerHTML = '<h2>' + '<span class="bold">' + currentDay + '&nbsp;' + '&nbsp;' + '</span>' + currentMonth + 'th' + '</h2>';
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
  title: "<h2>WeatherWise aims to prioritize<br>preparedness so that users<br>know how to best dress and<br>prepare for the weather</h2>",
  html: true,
  placement: "left",
  offset: '10%, 10'
});

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
}
google.maps.event.addDomListener(window, 'load', init);

// SEARCH BUTTON
getSearchButton.addEventListener('click', sendRequest);

function sendRequest() {
myLat = -51.5074;
myLng = 0.1278;
getSkyData();
document.getElementById("data--location").innerHTML = '<h2>' + input.value + '</h2>';

console.log('Changed to London weather...');
}
/*! weatherwise - v1.0.0 - 2019-03-18 */ 
//  PLAN B SECONDS TO HOURS
//  var time = sunrise
// function secondsToHms(d) {
//     d = dataFromJSON.daily.data[0].sunriseTime; //Number(d);
//    console.log(hDisplay + mDisplay + sDisplay);
//    var h = Math.floor(d / 3600);
//    var m = Math.floor(d % 3600 / 60);
//    var s = Math.floor(d % 3600 % 60);

//    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
//    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
//    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
//    return hDisplay + mDisplay + sDisplay; 
   //console.log(hDisplay + mDisplay + sDisplay); 
//}


 
// PAGE LOADER
//$('#master--loader').show();
// var getSunrise = document.getElementById("data__time--sunrise");
// var getSunset = document.getElementById("data__time--sunset");
var getformattedRiseTime = document.getElementById("data__time--sunrise");
var getformattedSetTime = document.getElementById("data__time--sunset");
var x = document.getElementById("data__time--sunset");
//console.log(getformattedRiseTime);
var lat = -41.2865;
var lng = 174.7762;
//DATA
//function getDSData() {
 $.ajax({
    url: 'https://api.darksky.net/forecast/9a5e19b54f8f0b91a70e71fec66307e9/' + lat + ',' + lng + '?unit=si',
    dataType: 'jsonp',
    type: "GET",
    success: function (dataFromJSON) {
        console.log("Data loaded...");
        console.log(dataFromJSON);
        // console.log(dataFromJSON.daily.data[0].sunriseTime);
        // console.log(dataFromJSON.daily.data[0].sunsetTime);

        //DATA TO HOURS AND MINUTES
        unix_timestamp = dataFromJSON.daily.data[0].sunriseTime;
         // Create a new JavaScript Date object based on the timestamp
        //multiplied by 1000 so that the argument is in milliseconds, not seconds.
        var date2 = new Date(unix_timestamp*1000);
        // Hours part from the timestamp
        var hours = date2.getHours();
        console.log(date2.getHours());
        // Minutes part from the timestamp
        var minutes = "0" + date2.getMinutes();
        // Seconds part from the timestamp
        //var seconds = "0" + date2.getSeconds();
        
        // Will display time in 10:30:23 format
        var formattedRiseTime = hours + ':' + minutes.substr(-2); // + ':' + seconds.substr(-2)
        console.log(formattedRiseTime);
        
        sunset_timestamp = dataFromJSON.daily.data[0].sunsetTime;

        var date3 = new Date(sunset_timestamp*1000);
        // Hours part from the timestamp
        var hoursSet = date3.getHours();
        console.log(date3.getHours());
        // Minutes part from the timestamp
        var minutesSet = "0" + date3.getMinutes();
        // Seconds part from the timestamp
        var secondsSet = "0" + date3.getSeconds();
        
        // Will display time in 10:30:23 format
        var formattedSunsetTime = hoursSet + ':' + minutesSet.substr(-2); 
        console.log(formattedSunsetTime);

        //DISPLAYING SUNRISE + SUNSET HTML
         sunrise = Math.trunc(dataFromJSON.daily.data[0].sunriseTime);
        // getSunrise.innerHTML = '<div id="data__time--sunrise">' + sunrise + '</div>';

         sunset = Math.trunc(dataFromJSON.daily.data[0].sunsetTime);
        // getSunset.innerHTML = '<div id="data__time--sunset">' + sunset + ' ' + '</div>';

        
        getformattedRiseTime.innerHTML = '<p>' + formattedRiseTime + '</p>';

        getformattedSetTime.innerHTML = '<p>' +  formattedSunsetTime + '</p>';
          
        // var timeString = formattedSunsetTime;
        // var H = +timeString.substr(0, 2);
        // var h = (H % 12) || 12;
        // var ampm = H < 12 ? "AM" : "PM";
        // timeString = h + timeString.substr(2, 3) + ampm;
        // document.write(timeString);



    },

    error: function (error) {
        console.log(error);
        console.log("Error...");
    }
 }); 
 //ajax closed
//}
//getDSData closed


//COUNTDOWN
/* function getTimeRemaining(sunsetTime) {
    var t = Date.parse(sunsetTime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    //var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      'total': t,
      //'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }
  
  function initializeClock(id, sunsetTime) {
    var clock = document.getElementById(id);
    //var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');
  
    function updateClock() {
      var t = getTimeRemaining(sunsetTime);
  
      //daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
  
      if (t.total <= 0) {
        clearInterval(timeinterval); //start counting down to the next 
      }
    }
  
    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
  }
  //var deadline = new Date();
  var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
  initializeClock('countdown__div', deadline); */

  // Set the date we're counting down to
var countDownDate = new Date(dataFromJSON.daily.data[0]).getTime(formattedSunsetTime);

// Update the count down every 1 second
var x = setInterval(function() {

  // Get todays date and time
  var now = new Date().getTime();
    
  // Find the distance between now and the count down date
  var distance = countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
  document.getElementById("countdown__div").innerHTML = '<p>' + days + '</p>' + '<p>' + hours + '</p>' + '<p>' + minutes + '</p>';
    
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown__div").innerHTML = "EXPIRED";
  }
}, 1000);

