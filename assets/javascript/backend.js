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
    url: queryURL,
    method: "GET"
}).done( function(result) {
    console.log(result)
})
