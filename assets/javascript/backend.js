var urlStart = "assets/images/"

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
      cityName: "Punta Cana",
      geoid: "3494242",
      img: urlStart + "punta_cana.jpg",
      long: '-68.40431',
      lat: '18.58182',
      
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
      cityName: "Minneapolis",
      geoid: "5037649",
      img: urlStart + "minneaplois.jpg",
      namecode: "minneapolis",
      long: "-93.26384",
      lat: "44.97997",
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
      cityName: "Thebes",
      geoid: "252910",
      img: urlStart + "thebes.jpg",
      namecode: "thebes",
      long: "23.31889",
      lat: "38.325",
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
        a.attr("data-show", locations[i].geoid);
        a.attr("data-name", locations[i].namecode);
        a.attr("data-long", locations[i].long);
        a.attr("data-lat", locations[i].lat)
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
$(document).on("click", "button", function() {

//vars for the ajax calls go here
var cityName =($(this).data("name"))

var geoId = ($(this).data("show"))

var key = "73a039df0c6981cf0c61cdaa5b5cc704"

var lat = ($(this).data("lat"))

var long = ($(this).data("long"))

var darkSkyURL = "https://api.darksky.net/forecast/" + key + "/" + lat +  "," + long

var  cityInfoUrl = "https://api.teleport.org/api/cities/geonameid:" + geoId + "/"

var queryURL = "https://api.teleport.org/api/urban_areas/slug:" + cityName + "/scores";

//city info ajax call
$.ajax({
    url: cityInfoUrl,
    method: "GET"
  })
  .then(function(response2) {
    console.log(response2);


//creating new rows for the city info
    var newRow = $("<tr>").append(
      $("<td>").text(response2.full_name),
      $("<td>").text(response2.population),
      $("<td>").text(response2.location.latlon.longitude),
      $("<td>").text(response2.location.latlon.latitude),
      $("<td>").text(response2.geoname_id)
   
    );
//appending new rows to table
    $("#cityInfoTable > tbody").append(newRow);

  
//city scores api call
$.ajax({
  url: queryURL,
  method: "GET"})

  .then(function(response) {
    console.log(response);

 
//creating new rows for the 2nd table
    var tableTwoNewRow =$("<tr>").append(
      $("<td>").text(response2.name),
      $("<td>").text(Math.round(response.categories[1].score_out_of_10)),
      $("<td>").text(Math.round(response.categories[5].score_out_of_10)),
      $("<td>").text(Math.round(response.categories[7].score_out_of_10)),
      $("<td>").text(Math.round(response.categories[8].score_out_of_10)),
      $("<td>").text(Math.round(response.categories[9].score_out_of_10)),
      $("<td>").text(Math.round(response.categories[10].score_out_of_10)),
      $("<td>").text(Math.round(response.categories[13].score_out_of_10)),
      $("<td>").text(Math.round(response.categories[15].score_out_of_10)) ,
    )
//appending new rows to 2nd table
    $("#cityStatsTable > tbody").append(tableTwoNewRow);

//dark ski ajax call
$.ajax({
  url: darkSkyURL,
  method: "GET"})

.then(function(result) {
  console.log(result)

//appending rows to thrird table
var tableThreeNewRow =$("<tr>").append(
  $("<td>").text(response2.name),
  $("<td>").text(result.currently.temperature),
  $("<td>").text(result.currently.summary),
  $("<td>").text(result.currently.windSpeed),
  
  )

  $("#cityWeatherTable > tbody").append(tableThreeNewRow);
})

})
})



//Reset button 
$(document).on('click', '#resetBtn', function() {
  $("#cityInfoTable tr").remove();
})
})


//Variables that gabbred values from the API
//var cloudCover - grabs the data from cloud cover
//var qol - grabs data from Environmental Quality
//var safety - grabs data from safety
//var commute - grabs data from commute

//function calculateHP(cloudCover, qol, safety, commute) {
//Variables for HP modifiers
//var baseHP = 100
//var cloudHP = 0
//var qolHP = 0
//var safetyHP = 0
//var commuteHP = 0
//var totalHP = 0

//Calculate what bonus (if any) HP cloud cover will grant the player

// if (cloudCover >=7) {
//  cloudHP = cloudHP + 15;
// }else if (cloudCover >= 4) {
//  cloudHP = cloudHP = 10;
// }else if (cloudCover >=1) {
// cloudHP = cloudHP + 5;
// }else {
// cloudHP = cloudHP;
// }

//Calculate what boon or bane (if any) is granted to the player based on Environmental Quality

// if (qol >= 7) {
// qolHP = qolHP + 5;
// }else if (qol >=4) {
//  qolHP = qolHP;
// }else {
//  qolHP = qolHP -5;
// }

//Calculate what boon or bane (if any) is granted to the player based on safety

// if (safety >= 7) {
//  safetyHP = safetyHP + 5;
// }else if (safety >=4) {
// safetyHP = safetyHP;
// }else {
// safetyHP = safetyHP - 5;
// }

//Calculate what boon or bane (if any) is granted to the player based on commute

// if (commute >= 7) {
//  commuteHP = commuteHP + 5;
// }else if (safety >=4) {
// commuteHP = commuteHP;
// }else {
// commuteHP = commuteHP - 5;
// }

//totalHP = baseHP + cloudHP + qolHP + safetyHP + commuteHP;

//return totalHP;
// }







