//variables and array for player 1
var p1Loc1;
var p1Loc2;
var p1Loc3;
var player1Loc = [p1Loc1, p1Loc2, p1Loc3];

//variables and aray for player 2
var p2Loc1;
var p2Loc2;
var p2Loc3;
var player2Loc = [p2Loc1, p2Loc2, p2Loc3];


var urlStart = "assets/images/"

//array of locations to choose from
var locations = [
{
    cityName: "Las Vegas",
    geoid: "5506956",
    img: urlStart + "las_vegas.jpg",
},
{
    cityName:"Barcelona",
    geoid: "3128760",
    img: urlStart + "barcelona.jpg",
},
{
    cityName: "Rio",
    geoid: "3451190",
    img: urlStart + "Rio.jpg",
},
{
    cityName: "Glasgow",
    geoid: "2648579",
    img: urlStart + "glasgow.jpg",
},
{
    cityName: "Punta Cana",
    geoid: "3494242",
    img: urlStart + "punta_cana.jpg",
}, 
{
    cityName: "Shanghai",
    geoid: "1796236",
    img: urlStart + "shanghai.jpg",
},
{ 
    cityName: "Cape Town",
    geoid: "3369157",
    img: urlStart + "cape_town.jpg",
},
{ 
    cityName: "New York",
    geoid: "5128581",
    img: urlStart + "new_york.jpg",
},
{
    cityName: "Hong Kong",
    geoid: "1819729",
    img: urlStart + "hong_kong.jpg",
},
{
    cityName: "Phuket",
    geoid: "1151254",
    img: urlStart + "phuket.jpg",
},
{ 
    cityName: "Bangkok",
    geoid: "1609350",
    img: urlStart + "bangkok.jpg",
}, 
{
    cityName: "Minneapolis",
    geoid: "5037649",
    img: urlStart + "minneaplois.jpg", 
},
{
    cityName: "Moscow",
    geoid: "524901",
    img: urlStart + "mowcow.jpg",
},
{
    cityName: "Berlin",
    geoid: "2950159",
    img: urlStart + "berlin.jpg",
},
{
    cityName: "London",
    geoid: "2643743",
    img: urlStart + "london.jpg",
},
{
    cityName: "Mexico City",
    geoid: "3530597",
    img: urlStart + "mexico_city.jpg",
},
{
    cityName: "Thebes",
    geoid: "252910",
    img: urlStart + "thebes.jpg",
},
{
    cityName: "Rome",
    geoid: "3169070",
    img: urlStart + "rome.jpg",
},
{
    cityName: "Tokyo",
    geoid: "1850147",
    img: urlStart + "tokyo.jpg",
},
{
    cityName: "Paris",
    geoid: "2988507",
    img: urlStart + "paris.jpg",
}
];


//function to grab a city from the locations array and assign it to a variable in the players locations array then
//remove it from the locations array
function cityGenerator1() {
    for (i = 0; i < 3; i++) {
        var city = Math.floor(Math.random()*(locations.length));
        player1Loc[i] = locations[city];
        locations.splice(city, 1);
    }
}

//The same function but for player 2
function cityGenerator2() {
    for (i = 0; i < 3; i++) {
        var city = Math.floor(Math.random()*(locations.length));
        player2Loc[i] = locations[city];
        locations.splice(city, 1);
    }
}

//calling the fucntions to generate the 3 choices for players 1 and 2
cityGenerator1();
cityGenerator2();

console.log(player1Loc);
console.log(player2Loc);
console.log(locations);

