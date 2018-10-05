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
    namecode: "las-vegas"
},
{
    cityName:"Barcelona",
    geoid: "3128760",
    img: urlStart + "barcelona.jpg",
    namecode: "barcelona"
},
{
    cityName: "Rio",
    geoid: "3451190",
    img: urlStart + "Rio.jpg",
    namecode: "rio-de-janeiro"
},
{
    cityName: "Glasgow",
    geoid: "2648579",
    img: urlStart + "glasgow.jpg",
    namecode: "glasgow"
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
    namecode: "shanghai"
},
{ 
    cityName: "Cape Town",
    geoid: "3369157",
    img: urlStart + "cape_town.jpg",
    namecode: "cape-town"
},
{ 
    cityName: "New York",
    geoid: "5128581",
    img: urlStart + "new_york.jpg",
    namecode: "new-york"
},
{
    cityName: "Hong Kong",
    geoid: "1819729",
    img: urlStart + "hong_kong.jpg",
    namecode: "hong-kong"
},
{
    cityName: "Phuket",
    geoid: "1151254",
    img: urlStart + "phuket.jpg",
    namecode: "phuket"
},
{ 
    cityName: "Bangkok",
    geoid: "1609350",
    img: urlStart + "bangkok.jpg",
    namecode: "bangkok"
}, 
{
    cityName: "Minneapolis",
    geoid: "5037649",
    img: urlStart + "minneaplois.jpg",
    namecode: "minneapolis" 
},
{
    cityName: "Moscow",
    geoid: "524901",
    img: urlStart + "mowcow.jpg",
    namecode: "moscow"
},
{
    cityName: "Berlin",
    geoid: "2950159",
    img: urlStart + "berlin.jpg",
    namecode: "berlin"
},
{
    cityName: "London",
    geoid: "2643743",
    img: urlStart + "london.jpg",
    namecode: "london"
},
{
    cityName: "Mexico City",
    geoid: "3530597",
    img: urlStart + "mexico_city.jpg",
    namecode: "mexico-city"
},
{
    cityName: "Thebes",
    geoid: "252910",
    img: urlStart + "thebes.jpg",
    namecode: "thebes"
},
{
    cityName: "Rome",
    geoid: "3169070",
    img: urlStart + "rome.jpg",
    namecode: "rome"
},
{
    cityName: "Tokyo",
    geoid: "1850147",
    img: urlStart + "tokyo.jpg",
    namecode: "tokyo"
},
{
    cityName: "Paris",
    geoid: "2988507",
    img: urlStart + "paris.jpg",
    namecode: "paris"
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

//defense is determined by cloud cover, 0-no bonus, 1-3, a 5% bonus,
//4-6, a 10% bonus, 7-10, a 15% bonus,

// var cloudCover=0 //The cloudCover from the api
// var atk = 10

// var dfs = 0
// if (cloudCover >= 7) {
//     dfs = dfs + 15;
// } else if (cloudCover >= 4) {
//     dfs = dfs + 10;
// } else if (cloudCover >= 1)
// {
//     dfs = dfs + 5;
// }

// var hp = dfs+100
// console.log(dfs)
// console.log(hp)

//atk is basic attack, hatck and catk and satk are the modified attacks
var temp = 50
var atk = -10
var catk = 0
var hatk = 0

//this is where temperature defines what kind of attacks ara available
//this is to determine if it will be a cold attack
if (temp < 30) {
    catk = atk - 5;//Skips a turn, cannot code until turns are implemented
    //to determine if it is a hot attack
} else if (temp > 75)
    hatk = atk - 7.5, hp = hp - 5;




var Player1 = Player1
var Player2 = Player1
var Game = Game; {
    Player1; {
        var cloudCover = 8 //The cloudCover from the api
        var atk = -10

        var dfs = 0
        if (cloudCover >= 7) {
            dfs = dfs + 15;
        } else if (cloudCover >= 4) {
            dfs = dfs + 10;
        } else if (cloudCover >= 1) {
            dfs = dfs + 5;
        }
        if (temp < 30) {
            catk = atk - 5;
        } else if (temp > 75)
            hatk = atk - 7.5, hp = hp - 5;

        var win = (p2hp = 0)
        var p1hp = dfs + 100
        console.log("player1 Health", + p1hp)
    }
    Player2; {
        var p2cloudCover = 4 //The cloudCover from the api
        var atk = -10

        var dfs = 0
        if (p2cloudCover >= 7) {
            dfs = dfs + 15;
        } else if (p2cloudCover >= 4) {
            dfs = dfs + 10;
        } else if (p2cloudCover >= 1) {
            dfs = dfs + 5;
        }
        if (temp < 30) {
            catk = atk - 5;
        } else if (temp > 75)
            hatk = atk - 7.5, hp = hp - 5;
        var p2hp = dfs + 100

        console.log("player2 Health", + p2hp);

    }
    var Player1turn = true
    var Player2turn = false
    var Player1frozen = false
    var Player2frozec = false
    function attack() {
        if (Player1turn = true) {

        }


    }
}
