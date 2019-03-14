
$.ajax({
  url: 'https://api.darksky.net/forecast/89c0665fe610a17c4d0e1f0b30da6e7a/-41.2865,174.7762',
  dataType: 'jsonp',
  type: "GET",
  success: function (dataFromJSON) {
      console.log(dataFromJSON);

      // for (var i = 0; i < dataFromJSON.events.length; i++) {
      //   console.log(dataFromJSON.events[i].name, dataFromJSON.events[i].start);

      console.log(dataFromJSON.daily.data[0].humidity);
        // title[i] = dataFromJSON.events[i].name.text;
        // hour[i] = dataFromJSON.events[i].start.local;
        // isFree[i] = dataFromJSON.events[i].is_free;

            // document.getElementById("info").innerHTML += title[i] + '&nbsp;' + hour[i] + '<br>';
    // }
  },

  error: function (error) {
      console.log(error);
      console.log("Error...");
  }
});

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