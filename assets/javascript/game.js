// GENERAL PURPOSE GAME LOGIC. IMPORT BEFORE THE PAGE'S .JS FILE.

var urlStart = "assets/images/"

function Player(name, src, cloudCover, atk, hp) {
    this.name = name;
    this.src = src;
    this.cloudCover = cloudCover;
    this.atk = atk;
    this.hp = hp;
    this.special = "";
    this.isFrozen = false;
    this.stormDisabled=true;
    this.stormIncapable=true;
    this.hotDisabled=true;
    this.coldDisabled=true;
}

var GameMethods = {
    pickRandomLocation: function () {
        var cityIndex = Math.floor(Math.random() * (Game.locations.length));

        for (; Game.previousIndices.indexOf(cityIndex) != -1;) {
            cityIndex = Math.floor(Math.random() * (Game.locations.length));
        }
        Game.previousIndices.push(cityIndex);
        var city = Game.locations[cityIndex];
        return city;
    },

    calculateHP: function (cloudCover, qol, safety, commute) {
        // Variables for HP modifiers
        var baseHP = 100
        var cloudHP = 0
        var qolHP = 0
        var safetyHP = 0
        var commuteHP = 0
        var totalHP = 0
        

        // Calculate what bonus (if any) HP cloud cover will grant the player

        if (cloudCover >= 7) {
            cloudHP += 15;
        } else if (cloudCover >= 4) {
            cloudHP += 10;
        } else if (cloudCover >= 1) {
            cloudHP += 5;
        }

        // Calculate what boon or bane (if any) is granted to the player based on Environmental Quality

        if (qol >= 7) {
            qolHP += 5;
        } else if (qol >= 4) {
            qolHP = qolHP;
        } else {
            qolHP -= 5;
        }

        // Calculate what boon or bane (if any) is granted to the player based on safety

        if (safety >= 7) {
            safetyHP += 5;
        } else if (safety >= 4) {
            safetyHP = safetyHP;
        } else {
            safetyHP -= 5;
        }

        // Calculate what boon or bane (if any) is granted to the player based on commute

        if (commute >= 7) {
            commuteHP += 5;
        } else if (safety >= 4) {
            commuteHP = commuteHP;
        } else {
            commuteHP -= 5;
        }
        totalHP = baseHP + cloudHP + qolHP + safetyHP + commuteHP;
        return totalHP;
    },   
    // Function to decide whose turn it is and how to perform their chosen attack
    decideTurn: function (id) {
        
        // If both players are still alive, check to see whose turn it is.
        if (!Game.GameOver) {
            // If it's Player 1's turn...
            if (Game.Player1turn) {
                // And Player 1 isn't frozen...
                if (!Game.Player1.isFrozen) {
                    // Run chosen attack function by player 1
                    if (id === "attack") {
                        Game.Player2.hp -= Game.Player1.atk;
                        if (!Game.Player1.stormIncapable) {
                            Game.Player1.stormDisabled = false;
                        }
                    } else if (id === "cold") {
                        Game.Player2.hp -= (Game.Player1.atk * 1.50);
                        Game.Player1.isFrozen = true
                        if (!Game.Player1.stormIncapable) {
                            Game.Player1.stormDisabled = false;
                        }
                    } else if (id === "hot") {
                        Game.Player2.hp -= (Game.Player1.atk * 1.75);
                        Game.Player1.hp = Game.Player1.hp -5;
                        if (!Game.Player1.stormIncapable) {
                            Game.Player1.stormDisabled = false;
                        }
                    } else if (id === "storm") {
                        if (!Game.Player1.stormDisabled) {
                            Game.Player2.hp -= (Game.Player1.atk * .5);
                            Game.Player2.isFrozen = true;
                            Game.Player1.stormDisabled = true;
                        } else {
                            return;
                        }
                    }
                    Game.Player1turn = false;
                    Game.Player2turn = true;
                }
                // If Player 1 is frozen, forfeit their turn & unfreeze them.
                else if (Game.Player1.isFrozen) {
                    Game.Player1turn = false;
                    Game.Player2turn = true;
                    Game.Player1.isFrozen = false;
                }
            }
            // If it's Player 2's turn...
            else if (Game.Player2turn) {
                // And Player 2 isn't frozen...
                if (!Game.Player2.isFrozen) {
                    // Run chosen attack function by player 2
                    if (id === "attack") {
                        Game.Player1.hp -= Game.Player2.atk;
                        if (!Game.Player2.stormIncapable) {
                            Game.Player2.stormDisabled = false;
                        }
                    } else if (id === "cold") {
                        Game.Player1.hp -= (Game.Player2.atk * 1.50);
                        Game.Player2.isFrozen = true;
                        if (!Game.Player2.stormIncapable) {
                            Game.Player2.stormDisabled = false;
                        }
                    } else if (id === "hot") {
                        Game.Player1.hp -= (Game.Player1.atk * 1.75);
                        Game.Player2.hp = Game.Player2.hp - 5;
                        if (!Game.Player2.stormIncapable) {
                            Game.Player2.stormDisabled = false;
                        }
                    } else if (id === "storm") {
                        if (!Game.Player2.stormDisabled) {
                            Game.Player1.hp -= (Game.Player2.atk * .5);
                            Game.Player1.isFrozen = true;
                            Game.Player2.stormDisabled = true;
                        } else {
                            return;
                        }
                    }
                    Game.Player2turn = false;
                    Game.Player1turn = true;
                }
                // If Player 2 is frozen, forfeit their turn & unfreeze them.
                else if (Game.Player2.isFrozen) {
                    Game.Player2turn = false;
                    Game.Player1turn = true;
                    Game.Player2.isFrozen = false;
                }
            }
        }
    }
}

// Stores the current state of the game. This object gets sent up to Firebase every turn.
var Game = {
    //Array of locations to choose from
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
            img: urlStart + "dubai.jpg",
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
            img: urlStart + "seoul.jpg",
            namecode: "seoul",
            long: "126.9784",
            lat: "37.566",
        },
        {
            cityName: "Moscow",
            geoid: "524901",
            img: urlStart + "moscow.jpg",
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
            img: urlStart + "chicago.jpg",
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

    // Stores the indices previously chosen cities.
    previousIndices: [],

    // Create objects for each player
    Player1: new Player("", "", 0, 0, 100),
    Player2: new Player("", "", 0, 0, 100), 

    // Variables to store the current game state
    Player1turn: true,
    Player2turn: false,
    GameOver: false,
    Winner: ''
};


console.log("Game loaded as: ")
console.log(Game);