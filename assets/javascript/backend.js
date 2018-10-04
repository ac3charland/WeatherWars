//City object
var locations = [
  {
      cityName: "Las Vegas",
      geoid: "5506956",
      img: "",
      namecode: "las-vegas"
  },
  {
      cityName:"Barcelona",
      geoid: "3128760",
      img: "",
      namecode: "barcelona"
  },
  {
      cityName: "Rio",
      geoid: "3451190",
      img: "",
      namecode: "rio-de-janeiro"
  },
  {
      cityName: "Glasgow",
      geoid: "2648579",
      img: "",
      namecode: "glasgow"
  },
  {
      cityName: "Punta Cana",
      geoid: "3494242",
      img: "",
  }, 
  {
      cityName: "Shanghai",
      geoid: "1796236",
      img: "",
      namecode: "shanghai"
  },
  { 
      cityName: "Cape Town",
      geoid: "3369157",
      img: "",
      namecode: "cape-town"
  },
  { 
      cityName: "New York",
      geoid: "5128581",
      img: "",
      namecode: "new-york"
  },
  {
      cityName: "Hong Kong",
      geoid: "1819729",
      img: "",
      namecode: "hong-kong"
  },
  {
      cityName: "Phuket",
      geoid: "1151254",
      img: "",
      namecode: "phuket"
  },
  { 
      cityName: "Bangkok",
      geoid: "1609350",
      img: "",
      namecode: "bangkok"
  }, 
  {
      cityName: "Minneapolis",
      geoid: "5037649",
      img: "", 
      namecode: "minneapolis"
  },
  {
      cityName: "Moscow",
      geoid: "524901",
      img: "",
      namecode: "moscow"
  },
  {
      cityName: "Berlin",
      geoid: "2950159",
      img: "",
      namecode: "berlin"
  },
  {
      cityName: "London",
      geoid: "2643743",
      img: "",
      namecode: "london"
  },
  {
      cityName: "Mexico City",
      geoid: "3530597",
      img: "",
      namecode: "mexico-city"
  },
  {
      cityName: "Thebes",
      geoid: "252910",
      img: "",
      namecode: "thebes"
  },
  {
      cityName: "Rome",
      geoid: "3169070",
      img: "",
      namecode: "rome"
  },
  {
      cityName: "Tokyo",
      geoid: "1850147",
      img: "",
      namecode: "tokyo"
  },
  {
      cityName: "Paris",
      geoid: "2988507",
      img: "",
      namecode: "paris"
  }
  ];








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

var geoId = locations[0].geoid

var  cityInfoUrl = "https://api.teleport.org/api/cities/geonameid:" + geoId + "/"



$.ajax({
    url: cityInfoUrl,
    method: "GET"
  })

  .then(function(response2) {
    console.log(cityInfoUrl);

    console.log(response2);

    $("#cityName").text()

  })







