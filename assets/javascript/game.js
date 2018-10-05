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
// cloudHP = cloudHP = 5;
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

// console.log(basehp);
// console.log(cloudHP);
// console.log(qolHP);
// console.log(safetyHP);
// console.log(commuteHP);
// console.log(totalHP);

// function gameStarted(){
//     Player1turn=false;
// }

// gameStarted();


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



function Player(cloudCover, atk, hp) {
    this.cloudCover = cloudCover;
    this.atk = atk;
    this.hp = hp;
    // dfs:0,
    // if (cloudCover >= 7) {
    //     dfs = dfs + 15;
    // } else if (cloudCover >= 4) {
    //     dfs = dfs + 10;
    // } else if (cloudCover >= 1)
    // {
    //     dfs = dfs + 5;
    // }
    // if( temp < 30) {
    //     catk=atk-5;
    // } else if (temp > 75)
    // hatk=atk-7.5,hp=hp-5;

    // var win=(p2hp=0)
    // var p1hp = dfs+100
    // console.log ("player1 Health", + p1hp)
}
var Game = {

    Player1turn: true,
    Player2turn: false,
    Player1frozen: false,
    Player2frozen: false,



    Player1: new Player(8, 10, 100),

    Player2: new Player(4, 10, 100),
    attack: function () {
        if (this.Player1turn) {
            this.Player2.hp -= this.Player1.atk;
            console.log("Player1's Turn");
            console.log("player2 Health", + this.Player2.hp);
            this.Player1turn = false;
            this.Player2turn = true
        } else if (this.Player2turn) {
            this.Player1.hp -= this.Player2.atk;
            console.log("Player2's Turn");
            console.log("player1 Health", + this.Player1.hp);
            this.Player2turn = false;
            this.Player1turn = true;
        }
    }
};

$(document).on("click", "#button", function () {
    Game.attack();
})

// if statements for deciding what attack to do if player is not disabled
//!!!!!!!!!!!!!!!!!!!!!!!!!-------Need to grab stormDisabled from backend and toggle the storm attack button either on or off

//Player 1

//if (id === "attack") {
//  p2.hp -= p1.atk;
//  p1.stormDisabled = false;
//}else if (id === "cold") {
//  p2.hp -= (p1.atk * 1.50);
//  p1.isDiabled = true
//  p1.stormDisabled = false;
//}else if (id === "hot") {
//  p2.hp -= (p1.atk * 1.75);
//  p1.hp = p1.hp * .75;
//  p1.stormDisabled = false;
//}else if (id === "storm") {
//  p2.hp -= (p1.atk * .5);
//  p2.isDisbaled = true;
//  p1.stormDisabled = true;
//}
//player1turn = false;
//player2turn = true;

//Player 2

//if (id === "attack") {
//  p1.hp -= p2.atk;
//  p2.stormDisabled = false;
//}else if (id === "cold") {
//  p1.hp -= (p2.atk * 1.50);
//  p2.isDiabled = true;
//  p2.stormDisabled = false;
//}else if (id === "hot") {
//  p1.hp -= (p1.atk * 1.75);
//  p2.hp = p2.hp * .75;
//  p2.stormDisabled = false;
//}else if (id === "storm") {
//  p1.hp -= (p2.atk * .5);
//  p1.isDisbaled = true;
//  p2.stormDisabled = true; 
//}
//player2turn = false;
//player1turn = true;