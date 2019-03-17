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
// console.log("hi");
//jQuery.ajax({
function getDSData() {
 $.ajax({
    url: 'https://api.darksky.net/forecast/9a5e19b54f8f0b91a70e71fec66307e9/42.3601,-71.0589',
    dataType: 'jsonp',
    type: "GET",
    success: function (dataFromJSON) {
        //console.log("Data loaded...");
        //console.log(dataFromJSON);
        sunrise = Math.trunc(dataFromJSON.daily.data[0].sunriseTime);
        console.log(sunrise);
        //var sunrise = [dataFromJSON.daily.data[0].sunriseTime];
        //var sunset = [dataFromJSON.daily.data[0].sunsetTime];
        // var sunTimeData = [
        //     [dataFromJSON.daily.data[0].sunriseTime],
        //     [dataFromJSON.daily.data[0].sunsetTime]
        //   ];
        //document.getElementById("#data__time--sunrise").innerHTML =  sunrise + " am";
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

        //document.getElementById("#data__time--sunrise").innerHTML += daily.data[0].sunriseTime;
          //document.getElementById("#data__time--sunrise").innerHTML += title[i] + '&nbsp;' + hour[i] + '<br>';
         //}




    },

    error: function (error) {
        console.log(error);
        console.log("Error...");
    }
 }); 
 //ajax closed
}
//getDSData closed


//COUNTDOWN
function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
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
  
  function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    //var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');
  
    function updateClock() {
      var t = getTimeRemaining(endtime);
  
      //daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
  
      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }
  
    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
  }
  
  var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
  initializeClock('clockdiv', deadline);