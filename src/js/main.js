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
var now = new Date();
var days = new Array('SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY');
var months = new Array('January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');

// FORMAT DATE FUNCTIONS
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
      
     
