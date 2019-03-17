/*! weatherwise - v1.0.0 - 2019-03-17 */ 

/* var sunriseTime = date;
//PLAN A SECONDS TO HOURS
 // Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
var date = new Date(unix_timestamp*1000);
// Hours part from the timestamp
var hours = date.getHours();
// Minutes part from the timestamp
var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2); */
//  PLAN B SECONDS TO HOURS
/*  var time = 
 function secondsToHms(d) {
    d = dataFromJSON.daily.data[0].sunriseTime; //Number(d); 
    //console.log(hDisplay + mDisplay + sDisplay);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    //var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    //var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay; 
    console.log(hDisplay + mDisplay + sDisplay); 
}; */

// $(document).ready(function(){

// })

//DATA

//jQuery.ajax({
 ajax({
    url: 'https://api.darksky.net/forecast/9a5e19b54f8f0b91a70e71fec66307e9/42.3601,-71.0589',
    dataType: 'jsonp',
    type: "GET",
    success: function (dataFromJSON) {
        console.log("Data loaded...");
        console.log(dataFromJSON);

        var sunrise = [dataFromJSON.daily.data[0].sunriseTime];
        var sunset = [dataFromJSON.daily.data[0].sunsetTime];
        // var sunTimeData = [
        //     [dataFromJSON.daily.data[0].sunriseTime],
        //     [dataFromJSON.daily.data[0].sunsetTime]
        //   ];
        document.getElementById("#data__time--sunrise").innerHTML =  sunrise + " am";
        //   if(document.getElementById("#data__time--sunrise") != null){
        //     sunTimeData = document.getElementById("#data__time--sunrise").innerHTML;
        // }
        // var val = suntiseTime;
        //  jQuery.each(dataFromJSON.daily.data[0], function(val) {
        //         $("#data__time--sunrise").append(document.createTextNode(val.daily.data[0].sunriseTime));
        //     //$("#data__time--sunset").append(document.createTextNode(val.count));
        // });

  //for (var i = 0; i < data.length; i++) {
        //console.log(dataFromJSON.daily.data[0].sunriseTime);
        //console.log(dataFromJSON.daily.data[0].sunriseTime, dataFromJSON.daily.data[0].sunsetTime);

        //     title[i] = dataFromJSON.events[i].name.text;
        console.log(dataFromJSON.daily.data[0].sunriseTime);
        console.log(dataFromJSON.daily.data[0].sunsetTime);
        //     hour[i] = dataFromJSON.daily.data[0].sunriseTime.timezone;
        //     isFree[i] = dataFromJSON.daily.data[0].is_free;

        //document.getElementById("#data__time--sunrise").innerHTML += daily.data[0].sunriseTime;
          //document.getElementById("#data__time--sunrise").innerHTML += title[i] + '&nbsp;' + hour[i] + '<br>';
         //}




    },

    error: function (error) {
        console.log(error);
        console.log("Error...");
    }
}); 

// var data = google.visualization.arrayToDataTable([
//           ['Age', 'Weight'],
//           [demoData[0].age,demoData[0].weight],
//           [demoData[1].age,demoData[1].weight],
//           [demoData[2].age,demoData[2].weight],
//           [demoData[3].age,demoData[3].weight],
//           [demoData[4].age,demoData[4].weight],
//           [demoData[5].age,demoData[5].weight]
          
//         ]);

//         var options = {
//           title: 'Age vs. Weight comparison',
//           hAxis: {title: 'Age', minValue: 0, maxValue: 15},
//           vAxis: {title: 'Weight', minValue: 0, maxValue: 15},
//           legend: 'none'
//         };

//         var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));

//         chart.draw(data, options);
//       }