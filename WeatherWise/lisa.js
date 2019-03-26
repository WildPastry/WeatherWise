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