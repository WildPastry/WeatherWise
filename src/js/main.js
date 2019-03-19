/*! weatherwise - v1.0.0 - 2019-03-19 */ 
// LOADING THE PAGE
$('#master--loader').show();
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
                { slantedText: true, slantedTextAngle: 90, title: 'WIND SPEED (KM/H)', 
                titleTextStyle:{color: '#ffffff', fontSize: 12, italic: false, fontName: 'Poppins'}, 
                textStyle:{color: '#ffffff',  fontSize: 9, fontName: 'Poppins'}},
                vAxis: 
                {textStyle:{color: '#ffffff', fontName: 'Poppins'}},

              backgroundColor: '#102949',
              colors: ['#ffffff'],
              tooltip: 
                {textStyle: {color: '#5a6977', fontName: 'Poppins', fontSize: 10}},
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
      
     