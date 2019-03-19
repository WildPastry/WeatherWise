// var getSunrise = document.getElementById("data__time--sunrise");
// var getSunset = document.getElementById("data__time--sunset");
var getformattedRiseTime = document.getElementById("data__time--sunrise");
var getformattedSetTime = document.getElementById("data__time--sunset");
var x = document.getElementById("data__time--sunset");
//console.log(getformattedRiseTime);
var lat = -41.2865;
var lng = 174.7762;
//DATA

 $.ajax({
    url: 'https://api.darksky.net/forecast/9a5e19b54f8f0b91a70e71fec66307e9/' + lat + ',' + lng + '?unit=si',
    dataType: 'jsonp',
    type: "GET",
    success: function (dataFromJSON) {
        console.log("Data loaded...");
        console.log(dataFromJSON);
        console.log(dataFromJSON.daily.data[0].sunriseTime);
        console.log(dataFromJSON.daily.data[0].sunsetTime);

//DATA TO HOURS AND MINUTES
        unix_timestamp = dataFromJSON.daily.data[0].sunriseTime;
        var date2 = new Date(unix_timestamp*1000);
        var hours = date2.getHours();
        //console.log(date2.getHours());
        var minutes = "0" + date2.getMinutes();
        var seconds = "0" + date2.getSeconds();

        var formattedRiseTime = hours + ':' + minutes.substr(-2);

        //var formattedRiseTimeSeconds = hours + ':' + minutes.substr(-2) + ':' + seconds + seconds.substr(-2);

        sunset_timestamp = dataFromJSON.daily.data[0].sunsetTime;

        var date3 = new Date(sunset_timestamp*1000);

        var hoursSet = date3.getHours();

        var minutesSet = "0" + date3.getMinutes();

        var secondsSet = "0" + date3.getSeconds();

        var formattedSunsetTime = (hoursSet - 12) + ':' + minutesSet.substr(-2); //hoursSet
        var formattedSunsetTimeSeconds = (hoursSet - 12) + ':' + minutesSet.substr(-2) + ':' + secondsSet + secondsSet.substr(-2);
        console.log(formattedSunsetTimeSeconds);

//DISPLAYING SUNRISE + SUNSET HTML
         sunrise = Math.trunc(dataFromJSON.daily.data[0].sunriseTime);
         sunset = Math.trunc(dataFromJSON.daily.data[0].sunsetTime);

        getformattedRiseTime.innerHTML = '<h1>' + formattedRiseTime + '</h1>';
        getformattedSetTime.innerHTML = '<h1>' +  formattedSunsetTime + '</h1>';
        console.log(formattedRiseTime);

//COUNTDOWN
var sunSetTime = dataFromJSON.daily.data[0].sunsetTime;

var sunTimer = new Date(sunSetTime * 1000).toString();

var sunTimerShort = sunTimer.slice(0, 24);
var countDownDate = new Date(sunTimerShort).getTime();

var x = setInterval(function () {

    var now = new Date().getTime();

    var distance = countDownDate - now;

    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("countdown__div").innerHTML = "<h1>" + hours + " : " +
        minutes + " : " + seconds + " " + "</h1>";

    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown__div").innerHTML = "<h1>" + "EXPIRED" + "</h1>";
    }
}, 1000);

    },

    error: function (error) {
        console.log(error);
        console.log("Error...");
    }
 });
 //ajax closed
/*! weatherwise - v1.0.0 - 2019-03-20 */
// LOADING THE PAGE
$('#master--loader').show();

// VARIABLES
var getHumidity = document.getElementById("data__humidity");
var getUv = document.getElementById("data__uvIndex");
var getWind = document.getElementById("data__windGust");
var getTime = document.getElementById("data__time");
/*! weatherwise - v1.0.0 - 2019-03-20 */
// CHECK JAVASCRIPT + JQUERY
/*jslint browser:true */
/*jshint esversion: 6 */
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
const body = document.body;
var skyKey, dateStamp, finalDateStamp, currentTemp, currentIcon;
var myLat = -41.2865;
var myLng = 174.7762;

// AUTOCOMPLETE VARIABLE
const input = document.getElementById('search--text--field');

// DATE VARIABLES
var now = new Date();
var days = new Array('SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY');
var months = new Array('January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');

// TOP TEMP AND LOCATION VARIABLES
const getTopTemp = document.getElementById("top--temp");
const getTopLocation = document.getElementById("top--location");

// CURRENT DATA VARIABLES
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

// DAILY DATA VARIABLES
const getDailyBG = document.getElementById("data--daily-bg");
const getDailyDate = document.getElementById("data--daily--date");
const getDailyTemp = document.getElementById("data--daily--temp");
const getDailyTempLow = document.getElementById("data--daily--temp-low");
const getDailyIcon = document.getElementById("data--daily--icon");
const makeDiv = document.createElement('div');

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

// FORMAT DAY FUNCTION
function getDayOfWeek(date) {
  var dayOfWeek = new Date(date).getDay();
  return isNaN(dayOfWeek) ? null : ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'][dayOfWeek];
}

// GETTING THE DATA
$.ajax({
  url: 'https://api.darksky.net/forecast/89c0665fe610a17c4d0e1f0b30da6e7a/-41.28889,174.77722?units=si',
  dataType: 'jsonp',
  contentType: 'application/json',
  type: 'GET',
  success: function (dataFromJSON) {
    console.log(dataFromJSON);

 // GETTING HUMIDITY
    humidity = (dataFromJSON.daily.data[0].humidity)*100;
    console.log(humidity);
    getHumidity.innerHTML = '<h1>' + humidity  + '</h1>' + '<h4 class="inline">'+ '%' + '</h4>';

// GETTING UV INDEX
    uvIndex = (dataFromJSON.daily.data[0].uvIndex);
    console.log(uvIndex);
    getUv.innerHTML = '<h1>' + uvIndex + '</h1>';

 // GETTING WIND SPEED/GUST
    windGust = Math.round((dataFromJSON.daily.data[0].windGust));
    console.log(windGust);
    getWind.innerHTML = '<h1>' + windGust + '</h1>' + '<h4 class="inline">'+ 'km/h' + '</h4>';
  },

  error: function (error) {
      console.log(error);
      console.log("Error...");
  }
});

// AREA CHART FOR WIND SPEED DURING THE DAY
google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
          $.ajax({
            url: 'https://api.darksky.net/forecast/89c0665fe610a17c4d0e1f0b30da6e7a/-41.28889,174.77722?units=si',
            dataType: 'jsonp',
            success: function(dataFromJSON) {

            var data =new google.visualization.DataTable();
            data.addColumn ("string", "Day");
            data.addColumn ("number", "Wind");

            dataFromJSON.daily.data.shift();
            for (var i=0; i <dataFromJSON.daily.data.length; i++){

            console.log(dataFromJSON.daily.data[i].windGust);

            // DATESTAMP
            dateStamp = dataFromJSON.daily.data[i].time;

            // DATESTAMP CONVERSION
            var date = new Date(dateStamp * 1000);
            var year = date.getFullYear();
            month = (date.getMonthFormatted());
            day = (date.getDayFormatted());
            var dailyDate = year + '-' + month + '-' + day;
            dailyDay = getDayOfWeek(dailyDate);

            console.log(dailyDay);
              data.addRow ([dailyDay, dataFromJSON.daily.data[i].windGust]);
            }

            var options = {
              title: 'WEEKLY WIND SPEED',
              indexLabel: 'Poppins',
              titleTextStyle:
                {color: '#ffffff', fontSize: 18, fontName: 'Poppins', fontWeight: 300, bold: false},
              legend: 'none',
              hAxis:
                {slantedText: true, slantedTextAngle: 90, title: 'DAY',
                titleTextStyle:{color: '#ffffff', fontSize: 12, italic: false, fontName: 'Poppins'},
                textStyle:{color: '#ffffff',  fontSize: 9, fontName: 'Poppins'}},
                vAxis:

                {title: 'WIND SPEED (KM/H)', titleTextStyle:{color: '#ffffff', fontSize: 12, italic: false, fontName: 'Poppins'}, textStyle:{color: '#ffffff', fontSize: 12, italic: false, fontName: 'Poppins'}},

              backgroundColor: {color: '#ffffff', fill: 'transparent'},
              colors: ['#ffffff'],
              tooltip:
                {textStyle: {color: '#000000', fontName: 'Poppins', fontSize: 10}},
            }; //OPTIONS ENDING

             var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
             chart.draw(data, options);
            }, //SUCCESS ENDING

        error:function(errorFromJSON){
          console.log("Something has gone wrong");
          alert("Error!");
      } //ERROR ENDING
    }); //AJAX ENDING
 } //FUNCTION DRAW CHART ENDING

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
		console.log('Location changed to ' + input.value);
		getTopLocation.innerHTML = '<p>' + input.value + '</p>';
		return true;
	} else {
		$('.search--text--field--div').tooltip('show');
		removeWarning();
		console.log("Please enter a valid city...");
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
		console.log(currLatLong[0]);
		console.log(currLatLong[1]);
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
