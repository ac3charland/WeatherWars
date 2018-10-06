//variables and array for player 1
var player1Loc1;
var player1Loc2;
var player1Loc3;
var player1Loc = [player1Loc1, player1Loc2, player1Loc3];

//variables and aray for player 2
var player2Loc1;
var player2Loc2;
var player2Loc3;
var player2Loc = [player2Loc1, player2Loc2, player2Loc3];

var urlStart = "assets/images/"


//function to grab a city from the locations array and assign it to a variable in the players locations array then
//remove it from the locations array
// function cityGenerator1() {
//     for (i = 0; i < 3; i++) {
//         var city = Math.floor(Math.random()*(locations.length));
//         player1Loc[i] = locations[city];
//         Game.locations.splice(city, 1);
//     }
// }

// //The same function but for player 2
// function cityGenerator2() {
//     for (i = 0; i < 3; i++) {
//         var city = Math.floor(Math.random()*(locations.length));
//         player2Loc[i] = locations[city];
//         Game.locations.splice(city, 1);
//     }
// }

//calling the fucntions to generate the 3 choices for players 1 and 2
// cityGenerator1();
// cityGenerator2();

// console.log(player1Loc);
// console.log(player2Loc);
// console.log(locations);

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

var temp = 50
var atk = 10
var catk = 0
var hatk = 0

//this is where temperature defines what kind of attacks ara available
//this is to determine if it will be a cold attack


// if (temp < 30) {
//     catk =;
// } else if (temp > 75) {
//     hatk = atk - 7.5, hp = hp - 5;

// }

function Player(cloudCover, atk, hp) {
    this.cloudCover = cloudCover;
    this.atk = atk;
    this.hp = hp;
    this.isFrozen = false;
    this.stormDisabled=false;
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

    // var win=(this.Player2hp=0)
    // var this.Player1hp = dfs+100
    // console.log ("player1 Health", + this.Player1hp)
}
var Game = {
    
    //array of locations to choose from
    locations: [
        {
            cityName: "Las Vegas",
            geoid: "5506956",
            img: urlStart + "las_vegas.jpg",
            namecode: "las-vegas",
            long: "-115.13722",
            lat: "36.17497",

        },
        {
            cityName: "Barcelona",
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
            namecode: "dubai",
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
    ],

    // Create objects for each player
    Player1: new Player(8, 10, 100),
    Player2: new Player(4, 10, 100), 

    // Variables to store the current game state
    Player1turn: true,
    Player2turn: false,
    GameOver: false,
    Winner: '',
   
    // Function to decide whose turn it is and how to perform their chosen attack
    decideTurn: function(id) {

        // First, check and see if either player has been defeated.
        if (this.Player1.hp <= 0) {
            GameOver=true;
            winner="Player 2";
            return;
        }
        else if (this.Player2.hp <= 0) {
            GameOver=true;
            winner="Player 2";
            return;
        }
        
        // Then, if both players are still alive, check to see whose turn it is.
        if (!this.GameOver) {
            if (this.Player1turn) {
                if (!this.Player1.isFrozen) {
                    // Run chosen attack function by player 1
                    if (id === "attack") {
                        this.Player2.hp -= this.Player1.atk;
                        this.Player1.stormDisabled = false;
                    } else if (id === "cold") {
                        this.Player2.hp -= (this.Player1.atk * 1.50);
                        this.Player1.isDiabled = true
                        this.Player1.stormDisabled = false;
                    } else if (id === "hot") {
                        this.Player2.hp -= (this.Player1.atk * 1.75);
                        this.Player1.hp = this.Player1.hp * .75;
                        this.Player1.stormDisabled = false;
                    } else if (id === "storm") {
                        this.Player2.hp -= (this.Player1.atk * .5);
                        this.Player2.isDisbaled = true;
                        this.Player1.stormDisabled = true;
                    }
                    this.Player1turn = false;
                    this.Player2turn = true;
                } 
                else if (this.Player1.isFrozen) {
                    this.Player1turn=false;
                    this.Player2turn=true;
                    this.Player.isFrozen=false;
                }
            }
            else if (this.Player2turn) {
                if (!this.Player2.isFrozen) {
                    // Run chosen attack function by player 2
                    if (id === "attack") {
                        this.Player1.hp -= this.Player2.atk;
                        this.Player2.stormDisabled = false;
                    } else if (id === "cold") {
                        this.Player1.hp -= (this.Player2.atk * 1.50);
                        this.Player2.isDiabled = true;
                        this.Player2.stormDisabled = false;
                    } else if (id === "hot") {
                        this.Player1.hp -= (this.Player1.atk * 1.75);
                        this.Player2.hp = this.Player2.hp * .75;
                        this.Player2.stormDisabled = false;
                    } else if (id === "storm") {
                        this.Player1.hp -= (this.Player2.atk * .5);
                        this.Player1.isDisbaled = true;
                        this.Player2.stormDisabled = true;
                    }
                    this.Player2turn = false;
                    this.Player1turn = true;
                } 
                else if (this.Player2.isFrozen) {
                    this.Player2turn=false;
                    this.Player1turn=true;
                    this.Player.isFrozen=false;
                }
            }
        } 
    }
};


//!!!!!!!!!!!!!!!!!!!!!!!!!-------Need to grab stormDisabled from backend and toggle the storm attack button either on or off
