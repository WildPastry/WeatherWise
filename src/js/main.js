/*! weatherwise - v1.0.0 - 2019-03-19 */ 
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
        //console.log(date2.getHours());
        // Minutes part from the timestamp
        var minutes = "0" + date2.getMinutes();
        // Seconds part from the timestamp
        var seconds = "0" + date2.getSeconds();
        
        // Will display time in 10:30:23 format
        var formattedRiseTime = hours + ':' + minutes.substr(-2);// + ':' + seconds.substr(-2);
        //console.log(formattedRiseTime);
          var formattedRiseTimeSeconds = hours + ':' + minutes.substr(-2) + ':' + seconds + seconds.substr(-2); 
          //console.log(formattedRiseTimeSeconds);

        sunset_timestamp = dataFromJSON.daily.data[0].sunsetTime;

        var date3 = new Date(sunset_timestamp*1000);
        // Hours part from the timestamp
        var hoursSet = date3.getHours();
        //console.log(date3.getHours());
        // Minutes part from the timestamp
        var minutesSet = "0" + date3.getMinutes();
        // Seconds part from the timestamp
        var secondsSet = "0" + date3.getSeconds();
        
        // Will display time in 10:30:23 format
        var formattedSunsetTime = (hoursSet - 12) + ':' + minutesSet.substr(-2); //hoursSet
          var formattedSunsetTimeSeconds = (hoursSet - 12) + ':' + minutesSet.substr(-2) + ':' + secondsSet + secondsSet.substr(-2); 
        //console.log(formattedSunsetTime);
          console.log(formattedSunsetTimeSeconds);

//DISPLAYING SUNRISE + SUNSET HTML
         sunrise = Math.trunc(dataFromJSON.daily.data[0].sunriseTime);
        // getSunrise.innerHTML = '<div id="data__time--sunrise">' + sunrise + '</div>';

         sunset = Math.trunc(dataFromJSON.daily.data[0].sunsetTime);
        // getSunset.innerHTML = '<div id="data__time--sunset">' + sunset + ' ' + '</div>';
//console.log(sunset);
        getformattedRiseTime.innerHTML = '<h1>' + formattedRiseTime + '</h1>';
        getformattedSetTime.innerHTML = '<h1>' +  formattedSunsetTime + '</h1>';
        console.log(formattedRiseTime);
            //24HR TO 12 HR
            /* function tConvert (time) {
              // Check correct time format and split into components
              time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
            
              if (time.length > 1) { // If time format correct
                time = time.slice (1);  // Remove full string match value
                time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
                time[0] = +time[0] % 12 || 12; // Adjust hours
              }
              return time.join (''); // return adjusted time or original string
            }
            
            tConvert ('18:00:00'); */

 //COUNTDOWN 3
//  today = dataFromJSON.currently.time;
//  console.log(dataFromJSON.currently.time);
 var objToday = new Date();
	//weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
	//dayOfWeek = weekday[objToday.getDay()],
	//domEnder = function() { var a = objToday; if (/1/.test(parseInt((a + "").charAt(0)))) //return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a }(),
	dayOfMonth = todaysTime + ( objToday.getDate() < 10) ? '0' + objToday.getDate() : objToday.getDate();//,
	months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');//,
	curMonth = months[objToday.getMonth()];//,
	curYear = objToday.getFullYear();//,
	curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours());//,
	curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes();//,
	curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds();//,
	//curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
var todaysTime = curMonth + " " + dayOfMonth + ", " + curYear + " " + curHour +  ":" + curMinute + "." + curSeconds + " " + " ";
console.log(todaysTime);
//var todaysTime = curMonth + " " + dayOfMonth + ", " + curYear + " " + formattedSunsetTimeSeconds;
//var todaysTime = curHour + ":" + curMinute + "." + curSeconds;
//var todaysTime = dayOfWeek + " " + dayOfMonth + " of " + curMonth + ", " + curYear;
//document.getElementsByTagName('h1')[0].textContent = todaysTime;
 
  //today = new Date();
  

  // Set the date we're counting down to
  var countDownDate = formattedSunsetTimeSeconds;
  console.log(countDownDate);
  //var countDownDate = sunset_timestamp;//formattedSunsetTimeSeconds;
  //var countDownDate = new Date(sunset).getTime();
	
	// Update the count down every 1 secondg
//var x = setInterval(function() {
	
    // Get todays date and time
    var now = curHour + " " + curMinute + " " + curSeconds;//new Date().getTime();
		//var now = todaysTime;
      console.log(now);
      //finding sunset hours - real time hours to get the distance
    var distancehrs = hoursSet - (curHour + 12);
    console.log(distancehrs);
		// Find the distance between now and the count down date
		  //var distance = countDownDate - now;
			//console.log(distance);
		// Time calculations for days, hours, minutes and seconds
		//var hoursC = Math.floor((distancehrs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		 //var minutesC = Math.floor((distancehrs % (1000 * 60 * 60)) / (1000 * 60));
		//var secondsC = Math.floor((distancehrs % (1000 * 60)) / 1000);
		var hoursC = hoursSet;
		var minutesC = minutesSet;
		var secondsC = secondsSet;
    //document.getElementById("countdown__div").innerHTML = hours + "h " + minutes + "m " + seconds + "s ";
    //document.getElementById("countdown__div").innerHTML = distancehrs;
    document.getElementById("countdown__div").innerHTML = '<h1>' + hoursC + "h " + minutesC + "m " + secondsC + "s "+ '<h1>';
	
		if (distancehrs < 0) {
			clearInterval(x);
			document.getElementById("countdown__div").innerHTML = '<h1>' + "EXPIRED" + '<h1>';
		}
	//}, 1000);
 
    },


    error: function (error) {
        console.log(error);
        console.log("Error...");
    }
 }); 
 //ajax closed
//}
//getDSData closed

//SUNRISE COUNTDOWN W3SCHOOLS
/*                         // Set the date we're counting down to
          var countDownDateSunrise = formattedRiseTimeSeconds;
  //var countDownDate = sunset_timestamp;//formattedSunsetTimeSeconds;
  //var countDownDate = new Date(sunset).getTime();
	        console.log(countDownDateSunrise);
	// Update the count down every 1 secondg
	        //var x = setInterval(function() {
	
    // Get todays date and time
          var now = curHour + " " + curMinute + " " + curSeconds;//new Date().getTime();
		//var now = todaysTime;
          console.log(now);
      //finding sunrise hours - real time hours to get the distance
          var distancehrs = hours + curHour;
          console.log(distancehrs);
		// Find the distance between now and the count down date
		  //var distance = countDownDate - now;
			//console.log(distance);
		// Time calculations for days, hours, minutes and seconds
		// var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		// var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		// var seconds = Math.floor((distance % (1000 * 60)) / 1000);
		//var hours = hoursSet;
		//var minutes = minutesSet;
		//var seconds = secondsSet;
		// Output the result in an element with id="demo"
		      document.getElementById("countdown__div--2nd").innerHTML = hours + "h " + minutes + "m " + seconds + "s ";
			
		// If the count down is over, write some text 
		      if (distancehrs < 0) {
			      clearInterval(x);
			      document.getElementById("countdown__div--2nd").innerHTML = '<h1>' + "EXPIRED" + '<h1>';
		      }
	      //}, 1000); */
 
          //},



//COUNTDOWN 4

 /*function getTimeRemaining(formattedSunsetTimeSeconds) {
  var t = Date.parse(formattedSunsetTimeSeconds) - Date.parse(new Date());
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

 function initializeClock(id, formattedSunsetTimeSeconds) {
  var clock = document.getElementById(id);
  //var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(formattedSunsetTimeSeconds);

    //daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = '<p>' + ('0' + t.hours).slice(-2) + '</p>';
    minutesSpan.innerHTML = '<p>' + ('0' + t.minutes).slice(-2) + '</p>';
    secondsSpan.innerHTML = '<p>' + ('0' + t.seconds).slice(-2) + '</p>';

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

//W 3 SCHOOLS COUNTDOWN
  // // Set the date we're counting down to
  // var countDownDate = new Date(dataFromJSON.daily.data[0]).getTime(formattedSunsetTime);

  // // Update the count down every 1 second
  // var x = setInterval(function() {
  
  //   // Get todays date and time
  //   var now = new Date().getTime();
      
  //   // Find the distance between now and the count down date
  //   var distance = countDownDate - now;
      
  //   // Time calculations for days, hours, minutes and seconds
  //   var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  //   var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //   var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  //   var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
  //   // Output the result in an element with id="demo"
  //   document.getElementById("countdown__div").innerHTML = '<p>' + days + '</p>' + '<p>' + hours + '</p>' + '<p>' + minutes + '</p>';
      
  //   // If the count down is over, write some text 
  //   if (distance < 0) {
  //     clearInterval(x);
  //     document.getElementById("countdown__div").innerHTML = "EXPIRED";
  //   }
  // }, 1000);
  
 

//AM PM
      //  var timeString = formattedSunsetTime;
      //   var H = +timeString.substr(0, 2);
      //   var h = (H % 12) || 12;
      //   var ampm = H < 12 ? "AM" : "PM";
      //   timeString = h + timeString.substr(2, 3) + ampm;
      //   document.write(timeString);