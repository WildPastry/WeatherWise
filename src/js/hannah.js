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