var urlStart = "../images/"

var locations = [
  {
      cityName: "Las Vegas",
      geoid: "5506956",
      img: urlStart + "las_vegas.jpg",
      namecode: "las-vegas",
      long: "-115.13722",
      lat: "36.17497",
      
  },
  {
      cityName:"Barcelona",
      geoid: "3128760",
      img: urlStart + "barcelona.jpg",
      namecode: "barcelona", 
      long: "2.15899",
      lat: "41.38879"
  },
  {
      cityName: "Rio",
      geoid: "3451190",
      img: urlStart + "Rio.jpg",
      namecode: "rio-de-janeiro",
      long: "-43.18223",
      lat: '-22.90642'
      
      
  },
  {
      cityName: "Glasgow",
      geoid: "2648579",
      img: urlStart + "glasgow.jpg",
      namecode: "glasgow",
      long: '-4.25763',
      lat: '55.86515',
  },
  {
      cityName: "Dubai",
      geoid: "292223",
      img: urlStart + "punta_cana.jpg",
      namecode:"dubai",
      long: '55.17128',
      lat: '25.0657',
      
  }, 
  {
      cityName: "Shanghai",
      geoid: "1796236",
      img: urlStart + "shanghai.jpg",
      namecode: "shanghai",
      long: '121.45806',
      lat: "31.22222",
  },
  { 
      cityName: "Cape Town",
      geoid: "3369157",
      img: urlStart + "cape_town.jpg",
      namecode: "cape-town",
      long: "18.42322",
      lat: "-33.92584",
  },
  { 
      cityName: "New York",
      geoid: "5128581",
      img: urlStart + "new_york.jpg",
      namecode: "new-york",
      long: "-74.00597",
      lat: "40.71427",
  },
  {
      cityName: "Hong Kong",
      geoid: "1819729",
      img: urlStart + "hong_kong.jpg",
      namecode: "hong-kong",
      long: "114.17469",
      lat: "22.27832",
  },
  {
      cityName: "Phuket",
      geoid: "1151254",
      img: urlStart + "phuket.jpg",
      namecode: "phuket",
      long: "98.3981",
      lat: "7.89059",
  },
  { 
      cityName: "Bangkok",
      geoid: "1609350",
      img: urlStart + "bangkok.jpg",
      namecode: "bangkok",
      long: "100.50144",
      lat: "13.75398",
  }, 
  {
      cityName: "Seoul",
      geoid: "1835848",
      img: urlStart + "minneaplois.jpg",
      namecode: "seoul",
      long: "126.9784",
      lat: "37.566",
  },
  {
      cityName: "Moscow",
      geoid: "524901",
      img: urlStart + "mowcow.jpg",
      namecode: "moscow",
      long: "37.61556",
      lat: "55.75222",
  },
  {
      cityName: "Berlin",
      geoid: "2950159",
      img: urlStart + "berlin.jpg",
      namecode: "berlin",
      long: "13.41053",
      lat: "52.52437",
  },
  {
      cityName: "London",
      geoid: "2643743",
      img: urlStart + "london.jpg",
      namecode: "london",
      long: "-0.12574",
      lat: "51.50853",
  },
  {
      cityName: "Mexico City",
      geoid: "3530597",
      img: urlStart + "mexico_city.jpg",
      namecode: "mexico-city",
      long: "-99.12766",
      lat: "19.42847",
  },
  {
      cityName: "Chicago",
      geoid: "4887398",
      img: urlStart + "thebes.jpg",
      namecode: "chicago",
      long: "-87.65005",
      lat: "41.85003",
  },
  {
      cityName: "Rome",
      geoid: "3169070",
      img: urlStart + "rome.jpg",
      namecode: "rome",
      long: "12.51133",
      lat: "41.89193",
  },
  {
      cityName: "Tokyo",
      geoid: "1850147",
      img: urlStart + "tokyo.jpg",
      namecode: "tokyo",
      long: "139.69171",
      lat: "35.6895",
  },
  {
      cityName: "Paris",
      geoid: "2988507",
      img: urlStart + "paris.jpg",
      namecode: "paris",
      long: "2.3488",
      lat: "48.85341",
  }
  ];






//Adding test buttons
  function renderButtons() {
    $("#buttons-go-here").empty()
    for (var i = 0; i < locations.length; i++) {     
        var a = $("<button>");
        a.addClass("show");
        a.addClass("cityButton")
        a.attr("data-show", locations[i].geoid);
        a.attr("data-name", locations[i].namecode);
        a.attr("data-long", locations[i].long);
        a.attr("data-lat", locations[i].lat)
        a.attr("data-img", locations[i].img)
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




//THE BIG ON CLICK FUNTION. 3 AJAX CALLS. WE DOIN IT BIG---------------------------------------------------------------
$(document).on("click", ".cityButton", function() {
    

//vars for the ajax calls go here
var cityName =($(this).data("name"))

var geoId = ($(this).data("show"))

var key = "73a039df0c6981cf0c61cdaa5b5cc704"

var lat = ($(this).data("lat"))

var long = ($(this).data("long"))


var imgId= ($(this).data("img"))

var darkSkyURL = "https://api.darksky.net/forecast/" + key + "/" + lat +  "," + long

var  cityInfoUrl = "https://api.teleport.org/api/cities/geonameid:" + geoId + "/"

var cityScoresURL = "https://api.teleport.org/api/urban_areas/slug:" + cityName + "/scores";

//city info ajax call
$.ajax({
    url: cityInfoUrl,
    method: "GET"
  })
  .then(function(CityInfoResponse) {
    console.log("City info API: ")
    console.log(CityInfoResponse);


//creating new rows for the city info
    var newRow = $("<tr>").append(
      $("<td>").text(CityInfoResponse.full_name),
      $("<td>").text(CityInfoResponse.population),
      $("<td>").text(CityInfoResponse.location.latlon.longitude),
      $("<td>").text(CityInfoResponse.location.latlon.latitude),
      $("<td>").text(CityInfoResponse.geoname_id)
   
    );
//appending new rows to table
    $("#cityInfoTable > tbody").append(newRow);

  
//city scores api call
$.ajax({
  url: cityScoresURL,
  method: "GET"})

  .then(function(cityScoresResponse) {
    console.log("City scores API: ")
    console.log(cityScoresResponse);

 
//creating new rows for the 2nd table
    var tableTwoNewRow =$("<tr>").append(
      $("<td>").text(CityInfoResponse.name),
      $("<td>").text(Math.round(cityScoresResponse.categories[1].score_out_of_10)),
      $("<td>").text(Math.round(cityScoresResponse.categories[5].score_out_of_10)),
      $("<td>").text(Math.round(cityScoresResponse.categories[7].score_out_of_10)),
      $("<td>").text(Math.round(cityScoresResponse.categories[8].score_out_of_10)),
      $("<td>").text(Math.round(cityScoresResponse.categories[9].score_out_of_10)),
      $("<td>").text(Math.round(cityScoresResponse.categories[10].score_out_of_10)),
      $("<td>").text(Math.round(cityScoresResponse.categories[13].score_out_of_10)),
      $("<td>").text(Math.round(cityScoresResponse.categories[15].score_out_of_10)) ,
    )
//appending new rows to 2nd table
    $("#cityStatsTable > tbody").append(tableTwoNewRow);

//dark ski ajax call
$.ajax({
  url: darkSkyURL,
  method: "GET"})

.then(function(darkSkyResponse) {
    console.log("Dark Sky Weather API: ")
  console.log(darkSkyResponse)

//appending rows to thrird table
var tableThreeNewRow =$("<tr>").append(
  $("<td>").text(CityInfoResponse.name),
  $("<td>").text(darkSkyResponse.currently.time),
  $("<td>").text(darkSkyResponse.currently.temperature),
  $("<td>").text(darkSkyResponse.currently.summary),
  $("<td>").text(darkSkyResponse.currently.windSpeed),
  $("<td>").text(Math.round(darkSkyResponse.currently.cloudCover * 10)),
  $("<td>").text(Math.round(darkSkyResponse.currently.precipIntensity * 1000)),
  $("<td>").text((darkSkyResponse.currently.humidity * 100) + "%"),
  
  )

  $("#cityWeatherTable > tbody").append(tableThreeNewRow);
})

//Adding to the img Div
//var elem = document.getElementById("img");
//elem.setAttribute("src", "../images/paris.jpg")
$(".img-body").empty()
$(".img-body").append("<img src='" + imgId + "'     style='width: 500px'>")

$(".img-text").html(cityScoresResponse.summary)



})
})



//Reset button 
$(document).on('click', '.resetBtn', function() {
  $("tbody").empty ();
  
})
})










