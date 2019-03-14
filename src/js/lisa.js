console.log("hi");

$.ajax({
    url: 'https://api.darksky.net/forecast/9a5e19b54f8f0b91a70e71fec66307e9/42.3601,-71.0589',
    dataType: 'jsonp',
    type: "GET",
    success: function (dataFromJSON) {
        console.log("Data loaded...");
        console.log(dataFromJSON);

        // for (var i = 0; i < dataFromJSON.events.length; i++) {
        //     console.log(dataFromJSON.events[i].name, dataFromJSON.events[i].start);

        //     title[i] = dataFromJSON.events[i].name.text;
        //     hour[i] = dataFromJSON.events[i].start.local;
        //     isFree[i] = dataFromJSON.events[i].is_free;

        //         document.getElementById("info").innerHTML += title[i] + '&nbsp;' + hour[i] + '<br>';
        // }
    },

    error: function (error) {
        console.log(error);
        console.log("Error...");
    }
}); 


// $.ajax({
        
//     dataType: 'jsonp',
//     url: 'https://api.darksky.net/forecast/9a5e19b54f8f0b91a70e71fec66307e9/41.2865,-174.7762',
//     type: 'GET',
//     success: function (msg) {
//         console.log(msg);
//     },
//     error: function (error) {

//         console.log(error);
//     }
// });