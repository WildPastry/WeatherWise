
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




jQuery.ajax({
    url: 'https://api.darksky.net/forecast/9a5e19b54f8f0b91a70e71fec66307e9/42.3601,-71.0589',
    dataType: 'jsonp',
    type: "GET",
    success: function (dataFromJSON) {
        console.log("Data loaded...");
        console.log(dataFromJSON);

        //var sunrise = '';
        jQuery.each(dataFromJSON.daily.data[0], function(i, val) {
            // here you can do your magic
            $("#data__time--sunrise").append(document.createTextNode(val.sunriseTime));
            //$("#data__time--sunset").append(document.createTextNode(val.count));
        });

  //for (var i = 0; i < data.length; i++) {
        console.log(dataFromJSON.daily.data[0].sunriseTime);
        //console.log(dataFromJSON.daily.data[0].sunriseTime, dataFromJSON.daily.data[0].sunsetTime);

        //     title[i] = dataFromJSON.events[i].name.text;
        console.log(dataFromJSON.daily.data[0].sunriseTime);
        console.log(dataFromJSON.daily.data[0].sunsetTime);
        //     hour[i] = dataFromJSON.daily.data[0].sunriseTime.timezone;
        //     isFree[i] = dataFromJSON.daily.data[0].is_free;

        //document.getElementById("#data__time--sunrise").innerHTML;
        //         document.getElementById("#data__time--sunrise").innerHTML += title[i] + '&nbsp;' + hour[i] + '<br>';
         //}
    },

    error: function (error) {
        console.log(error);
        console.log("Error...");
    }
}); 

