/*jslint browser:true */
console.log('javascript ready...');

$(document).ready(function () {
    console.log("jquery ready...");
});

var skyKey;
var dateStamp;
var finalDateStamp;
var months_arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// SKY KEY
$.ajax({
    url: '../config.json',
    dataType: 'json',
    type: 'get',
    success: function (keys) {
        console.log('key loaded...');
        skyKey = keys[0].SKY;
        getSkyData();
    },
    error: function (error) {
        console.log(error);
        console.log('error getting key...');
    }
});

// DATA
function getSkyData() {
    $.ajax({
        url: 'https://api.darksky.net/forecast/' + skyKey + '/-41.2865,174.7762?units=si',
        dataType: 'jsonp',
        type: 'get',
        success: function (skyData) {
            console.log("SKY data loaded...");
            console.log(skyData);
            console.log("Current temperature:");
            console.log(skyData.currently.temperature);
            console.log(" ");

            console.log("Daily data:");
            for (var i = 0; i < skyData.daily.data.length; i++) {

                // DATESTAMP
                dateStamp = skyData.daily.data[i].time;

                // DATESTAMP CONVERSION
                var date = new Date(dateStamp * 1000);
                var year = date.getFullYear();
                var month = months_arr[date.getMonth()];
                var day = date.getDate();

                // if (day == 5) {
                //     console.log('Tuesday');
                // } //IF
                // if (day == 6) {
                //     console.log('Wednesday');
                // } //IF
                // if (day == 7) {
                //     console.log('Thursday');
                // } //IF
                // if (day == 8) {
                //     console.log('Friday');
                // } //IF
                // if (day == 9) {
                //     console.log('Saturday');
                // } //IF
                // if (day == 10) {
                //     console.log('Sunday');
                // } //IF
                // if (day == 11) {
                //     console.log('Monday');
                // } //IF
                // if (day == 12) {
                //     console.log('Tuesday');
                // } //IF

                var actualDate = month + '-' + day + '-' + year;
                console.log(actualDate);
                console.log(skyData.daily.data[i].summary);
                console.log("Humidity:");
                console.log(skyData.daily.data[i].humidity);
                console.log("UV Index:");
                console.log(skyData.daily.data[i].uvIndex);
                // console.log("Wind speed:");
                // console.log(skyData.daily.data[i].windSpeed);
                console.log(" ");

            }

        }, //SUCCESS
        error: function (error) {
            console.log(error);
            console.log('error getting data...');
        }
    }); //AJAX
} //FUNCTION