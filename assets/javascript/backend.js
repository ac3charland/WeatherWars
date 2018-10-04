 //Adding test buttons
  function renderButtons() {
    $("#buttons-go-here").empty()
    for (var i = 0; i < locations.length; i++) {     
        var a = $("<button>");
        a.addClass("show");
        a.attr("data-show", locations[i].geoid);
        a.text(locations[i].cityName);
        $("#buttons-go-here").append(a);
    }}  

  //calling test buttons 

  renderButtons()








// Set up Firebase
var config = {
    apiKey: "AIzaSyD3cZ5kQmYeDw1K85vUggD_CpANUrEyw3s",
    authDomain: "weatherwars-278cf.firebaseapp.com",
    databaseURL: "https://weatherwars-278cf.firebaseio.com",
    projectId: "weatherwars-278cf",
    storageBucket: "weatherwars-278cf.appspot.com",
    messagingSenderId: "111530169145"
};
firebase.initializeApp(config);



// Make AJAX Request for Dark Sky API.
var key = "73a039df0c6981cf0c61cdaa5b5cc704"
var lat = "44.9537";
var long = "-93.0900";
var darkSkyURL = "https://api.darksky.net/forecast/" + key + "/" + lat +  "," + long

$.ajax({
    url: darkSkyURL,
    method: "GET"})
  
  .done( function(result) {
    console.log(result)
})

//Teleport API (stats)-------------------------------------------------------------------------------------

var cityName = locations[1].cityName

var queryURL = "https://api.teleport.org/api/urban_areas/slug:" + cityName + "/scores";


$.ajax({
  url: queryURL,
  method: "GET"})

  .then(function(response) {
    console.log(queryURL);

    console.log(response);
   

    
    $("#internet").text(response.categories[13].score_out_of_10)

})


//Teleport API (city info)----------------------------------------------\

$(document).on("click", "button", function() {

  console.log($(this).data("show"))

var geoId = ($(this).data("show"))

var  cityInfoUrl = "https://api.teleport.org/api/cities/geonameid:" + geoId + "/"



$.ajax({
    url: cityInfoUrl,
    method: "GET"
  })

  .then(function(response2) {
    console.log(cityInfoUrl);

    console.log(response2);

    $("#cityName").text(geoId)

  })
})







