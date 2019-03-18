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
var countDownDate = new Date(sunset_timestamp).getTime();

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
  document.getElementById("countdown__div").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
    
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown__div").innerHTML = "EXPIRED";
  }
}, 1000);
  