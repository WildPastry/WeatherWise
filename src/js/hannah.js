//LOADING THE PAGE
$('#master--loader').show();
var getHumidity = document.getElementById("data__humidity");
var getUv = document.getElementById("data__uvIndex");
var getWind = document.getElementById("data__windGust");
var getTime = document.getElementById("data__time");

//GETTING THE DATA
$.ajax({
  url: 'https://api.darksky.net/forecast/89c0665fe610a17c4d0e1f0b30da6e7a/-41.28889,174.77722?units=si',
  dataType: 'jsonp',
  contentType: 'application/json',
  type: 'GET',
  success: function (dataFromJSON) {
    console.log(dataFromJSON);

 //GETTING HUMIDITY
    humidity = (dataFromJSON.daily.data[0].humidity)*100;
    console.log(humidity);
    getHumidity.innerHTML = '<h1>' + humidity  + '</h1>' + '<h4 class="inline">'+ '%' + '</h4>';

//GETTING UV INDEX
    uvIndex = (dataFromJSON.daily.data[0].uvIndex);
    console.log(uvIndex);
    getUv.innerHTML = '<h1>' + uvIndex + '</h1>';

 //GETTING WIND SPEED/GUST
    windGust = Math.round((dataFromJSON.daily.data[0].windGust));
    console.log(windGust);
    getWind.innerHTML = '<h1>' + windGust + '</h1>' + '<h4 class="inline">'+ 'km/h' + '</h4>'; 

//GETTING WIND SPEED/GUST
  //  windGust = (dataFromJSON.daily.data[0].time);
  //  console.log(time);
  },

  error: function (error) {
      console.log(error);
      console.log("Error...");
  }
});

//AREA CHART FOR WIND SPEED DURING THE DAY
google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
          $.ajax({
            url: 'https://api.darksky.net/forecast/89c0665fe610a17c4d0e1f0b30da6e7a/-41.28889,174.77722?units=si',
            dataType: 'jsonp',
            success: function(dataFromJSON) {
              // for (var i=0; i <dataFromJSON.daily.data.length; i++) {
  
              // }
            var data =new  google.visualization.DataTable();
            data.addColumn ("number", "Wind");
            data.addColumn ("number", "Days");

            for (var i=0; i <dataFromJSON.daily.data.length; i++){
              console.log(dataFromJSON.daily.data[i].windGust); 
              data.addRow([dataFromJSON.daily.data[i].windGust, dataFromJSON.daily.data[i].time]);
            }
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
      
     