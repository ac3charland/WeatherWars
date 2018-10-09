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

var database = firebase.database();

var player1Joined = false;
var player2Joined = false;

var player1Selected = false;
var player2Selected = false;


var playerNumber;
var lobbyName = "";

// Joins a given lobby based on its name.
function joinLobby(name) {
    lobbyName = name
    var p1joined;
    var p2joined;
    
    database.ref("/" + lobbyName + "/playersJoined").once('value').then(function(snapshot) {
        
        p1joined = snapshot.val().p1joined;
        p2joined = snapshot.val().p2joined;

        player1Joined = p1joined;
        player2Joined = p2joined;


        if (player1Joined === false) {
            player1Joined = true;
            // console.log("Player 1 joined.")
            playerNumber = 1;
        } else if (player2Joined === false) {
            player2Joined = true;
            // console.log("Player 2 joined.")
            playerNumber = 2;
        }


        database.ref("/" + lobbyName + "/playersJoined").set({
            p1joined: player1Joined,
            p2joined: player2Joined
        });
    });

    database.ref("/" + lobbyName + "/game").once('value').then(function(snapshot) {
        var object = snapshot.val().object;
        if (object != "") {
            Game = object;
        }
    });

    
}

// Assigns the given parameters to the player object (Game.Player1, Game.Player2) passed to the player argument of the function.
function createPlayer(player, name, src, hp, atk, special) {
    player.hp = parseInt(hp);
    player.atk = parseInt(atk);
    player.name = name;
    player.src = src;
    player.special = special;

    if (special.includes("Hot")) {
        player.hotDisabled = false;
    }

    if (special.includes("Cold")) {
        player.coldDisabled = false;
    }

    if (special.includes("Storm")) {
        player.stormIncapable = false;
        player.stormDisabled = false;
    }
}

// Called after AJAX call for random city comes back. Writes city stats to the DOM.
function cityDisplayResponse(city, slot) {
    var cityInfoResponse = this.cityInfoResponse;
    var cityScoresResponse = this.cityScoresResponse;
    var darkSkyResponse = this.darkSkyResponse;

    if (darkSkyResponse === "" || cityScoresResponse === "" === cityInfoResponse === "") {
        console.log("Error: no AJAX response.")
        return;
    }

    var cityDiv = $("#city" + slot);

    // Add title
    var titleRow = $("<div class='row'>");
    var titleHeading = $("<h3 class='city-name'>");
    titleHeading.text(city.cityName);
    titleRow.append(titleHeading);
    cityDiv.append(titleRow);

    // Add img
    var imgRow = $("<div class='row'>");
    var img = $("<img class='city-image'>");
    img.attr("src", city.img);
    imgRow.append(img);
    cityDiv.append(imgRow);

    // Add stats
    var statsRow = $("<div class='row'>");

    // Weather summary
    var summaryP = $("<p>");
    var summarySpan = $("<span class='weather-summary'>");
    summarySpan.text(darkSkyResponse.currently.summary);
    summaryP.append(summarySpan);
    statsRow.append(summaryP);

    // Temperature
    var tempP = $("<p>");
    tempP.text("º F");
    var tempSpan = $("<span class='weather-temp'>");
    tempSpan.text(Math.round(darkSkyResponse.currently.temperature));
    tempP.prepend(tempSpan);
    statsRow.append(tempP);

    // HP
    var hpP = $("<p>");
    hpP.text("HP: ");
    var hpSpan = $("<span class='selection-hp'>");
    var cloudCover = darkSkyResponse.currently.cloudCover * 10;
    var qol = cityScoresResponse.categories[10].score_out_of_10;
    var safety = cityScoresResponse.categories[7].score_out_of_10;
    var commute = cityScoresResponse.categories[5].score_out_of_10;
    var hp = GameMethods.calculateHP(cloudCover, qol, safety, commute);
    hpSpan.text(hp);
    hpP.append(hpSpan);
    statsRow.append(hpP);

    // Atk
    var atkP = $("<p>");
    atkP.text("Attack: ")
    var atkSpan = $("<span class='selection-atk'>");
    atkSpan.text("10");
    atkP.append(atkSpan);
    statsRow.append(atkP);

    // Specials
    var specialP = $("<p>");
    specialP.text("Special Attacks: ")
    var specialSpan = $("<span class='selection-special'>");
    var tempText = "";
    var stormText = "";
    var specialText = "None"
    var temp = darkSkyResponse.currently.temperature;
    var precip = darkSkyResponse.currently.precipIntensity * 100;

    if (temp < 40) {
        tempText = "Cold";
    } else if (temp > 75) {
        tempText = "Hot";
    }

    if (precip > 0) {
        stormText = "Storm"
    }

    if (tempText != "" && stormText != "") {
        specialText = tempText + ", " + stormText;
    } else if (tempText != "") {
        specialText = tempText;
    } else if (stormText != "") {
        specialText = stormText;
    }

    specialSpan.text(specialText);
    specialP.append(specialSpan);
    statsRow.append(specialP);


    cityDiv.append(statsRow);
}

// Displays a random city from the Game.locations array to one of the 3 slots allocated in index.html
function displayRandomCityInSlot(slot) {
    var city = GameMethods.pickRandomLocation();
    
    var name = city.namecode;
    var geoid = city.geoid;
    var lat = city.lat;
    var long = city.long;

    Ajax.sendRequest(name, geoid, lat, long, function() {cityDisplayResponse(city, slot)});
}

// Fills all three slots for city selection allocated in index.html.
function displayCityChoices() {
    displayRandomCityInSlot(1);
    displayRandomCityInSlot(2);
    displayRandomCityInSlot(3);
}

function displayLobby(lobbyName, playersJoined) {
    var playersString = "0/2";


    if (playersJoined.p1joined && playersJoined.p2joined) {
        playersString = "2/2";
    } else if (playersJoined.p1joined) {
        playersString = "1/2";
    }

    var lobby = $("<div>");
    lobby.addClass("row");
    lobby.addClass("lobby");

    var column1 = $("<div>");
    column1.addClass("col");
    column1.addClass("s6");

    var name = $("<h5>");
    name.addClass("lobby-name");
    name.text(lobbyName);

    column1.append(name);
    lobby.append(column1);

    var column2 = $("<div>");
    column2.addClass("col");
    column2.addClass("s6");

    var players = $("<h5>");
    players.text(playersString); 

    column2.append(players);
    lobby.append(column2);

    $("#lobby-container").prepend(lobby);
}

// Creates a tile for a player in the play area based on the given parameters.
function createPlayerTile(tileTag, name, number, nameTag, hp, src) {
    $(nameTag).text("Player " + number + ": " + name);

    var img = $("<img>");
    img.attr("src", src);
    img.addClass("city-image");
    $(tileTag).append(img);

    var hpTag = $("<p>");
    hpTag.text("HP: ");
    var hpSpan = $("<span id='p" + number + "hp'>");
    hpSpan.text(hp);
    hpTag.append(hpSpan);
    $(tileTag).append(hpTag);
}


// Updates the players' health on the DOM, based on the state of Game
function updateDOMhp() {
    $("#p1hp").text(Game.Player1.hp);
    $("#p2hp").text(Game.Player2.hp);
}

function pushLogMessageToFireBase(message) {
    database.ref("/" + lobbyName + "/log").push({
        message: message
    })
}

// Looks at the state of the Game object and decides which buttons to enable/disable
function disableButtons() {
    var player1 = Game.Player1;
    var player2 = Game.Player2;

    // If either of the players hasn't yet selected a city, or the game is over, disable all the buttons.
    if (!player1Selected || !player2Selected || Game.GameOver) {
        $("#attack, #cold, #hot, #storm, #end").attr("disabled", true);
        return;
    }
    else {
        $("#end").attr("disabled", false);
    }

    //Otherwise check to see if it's player 1's turn.
    if (Game.Player1turn) {
        // Is the user player 1? Then they can go.
        if (playerNumber === 1) {
            $("#attack, #cold, #hot, #storm").attr("disabled", false);

            if (player1.hotDisabled)
                $("#hot").attr("disabled", true);
            if (player1.coldDisabled)
                $("#cold").attr("disabled", true);
            if (player1.stormDisabled)
                $("#storm").attr("disabled", true);
            if (player1.isFrozen)
                $("#attack, #cold, #hot, #storm").attr("disabled", true);
        } 
        // Otherwise, their buttons are disabled
        else if (playerNumber === 2) {
            $("#attack, #cold, #hot, #storm, #end").attr("disabled", true);
        }
    } 
    // If it wasn't player 1's turn, see if it's player 2's turn.
    else if (Game.Player2turn) {
        // Is the user player 2? Then they can go.
        if (playerNumber === 2) {
            $("#attack, #cold, #hot, #storm").attr("disabled", false);

            if (player2.hotDisabled)
                $("#hot").attr("disabled", true);
            if (player2.coldDisabled)
                $("#cold").attr("disabled", true);
            if (player2.stormDisabled)
                $("#storm").attr("disabled", true);
            if (player2.isFrozen)
                $("#attack, #cold, #hot, #storm").attr("disabled", true);
        } 
        // Otherwise, their buttons are disabled.
        else if (playerNumber === 1) {
            $("#attack, #cold, #hot, #storm, #end").attr("disabled", true);
        }
    }
}

// Looks at the state of the Game object and highlights the player whose turn it is.
function highlightCurrentPlayer() {
    if (player1Selected && player2Selected) {
        if (Game.Player1turn) {
            if (playerNumber === 1) {
                $("#player").addClass("highlighted");
                $("#opponent").removeClass("highlighted");
            } else if (playerNumber === 2) {
                $("#opponent").addClass("highlighted");
                $("#player").removeClass("highlighted");
            }
        } else if (Game.Player2turn) {
            if (playerNumber === 2) {
                $("#player").addClass("highlighted");
                $("#opponent").removeClass("highlighted");
            } else if (playerNumber === 1) {
                $("#opponent").addClass("highlighted");
                $("#player").removeClass("highlighted");
            }
        }
    }
}

// Click handler and Firebase watching functions go here
$(document).ready(function() {
    
    // Checks Firebase whenever players have joined
    database.ref("/" + lobbyName + "/playersJoined").on("value", function (snapshot) {
        if (lobbyName === "") {
            return;
        }
        
        player1Joined = snapshot.val().p1joined;
        player2Joined = snapshot.val().p2joined;

        if (player1Joined && player2Joined) {
            $("#start").attr("disabled", true);
            $("#instruction-head").text("Game is full, please wait.")
        } else {
            $("#start").attr("disabled", false);
            $("#instruction-head").text("Instructions")
        }

        if (playerNumber === 1) {
            if (!player2Joined) {
                $("#opponent-name").text("Waiting for Player 2 to join.")
            } else {
                $("#opponent-name").text("Player 2 choosing city.")
            }
        } else if (playerNumber === 2) {
            if (!player1Selected) {
                $("#opponent-name").text("Player 1 choosing city.")
            }
        }
    });

    database.ref("/" + lobbyName + "/game").on("value", function(snapshot) {
        if (lobbyName === "") {
            return;
        }
        
        if (snapshot.val().object !== "") {
            Game = JSON.parse(snapshot.val().object);
            
            if (Game.GameOver=true) {
                $("#end-screen").show();
                $("#play").hide();
            }
            if (Game.Player1.name != "" && !player1Selected) {
                createPlayerTile("#opponent", Game.Player1.name, 1, "#opponent-name", Game.Player1.hp, Game.Player1.src);
                player1Selected = true;
            }
            else if (Game.Player2.name != "" && !player2Selected) {
                createPlayerTile("#opponent", Game.Player2.name, 2, "#opponent-name", Game.Player2.hp, Game.Player2.src);
                player2Selected = true;
            }

            highlightCurrentPlayer();
            updateDOMhp();
            disableButtons();
        } 
        
    })

    database.ref("/" + lobbyName + "/log").on("child_added", function(childSnapshot) {
        if (lobbyName === "") {
            return;
        }

        var message = childSnapshot.val().message;
        var pTag = $("<p>");
        pTag.text(message);
        $("#log").prepend(pTag);
    });

    database.ref("/" + lobbyName + "/chat").on("child_added", function(childSnapshot) {
        if (lobbyName === "") {
            return;
        }
        
        var message = childSnapshot.val().message;
        var pTag = $("<p>");
        pTag.text(message);
        $("#chatHistory").prepend(pTag);
    });

    database.ref().on("child_added", function(childSnapshot) {
        var lobbyName = childSnapshot.val().name;
        var playersJoined = childSnapshot.child("playersJoined").val();
        displayLobby(lobbyName, playersJoined);
    });
    
    // Disables all buttons on page load and begins the loading of city choices for the player.
    disableButtons();
    displayCityChoices();    

    
    // START BUTTON ON CLICK FUNCTION
    $(document).on("click", "#start", function() {
        
        $("#start").attr("disabled", true);
        $("#info").css("display", "none");
        // 2Do: need to update to show lobby screen.
        $("#city-picker").css("display", "block");
        
        
    })

    // JOIN LOBBY ON-CLICK FUNCTION
    $(document).on("click", ".lobby", function() {
        var name = $(this).find(".lobby-name").text();

        // Join that lobby.

        joinLobby(name);

        $("#lobby-div").hide();
        $("#city-picker").show();
    })

    $(document).on("click", "#create-lobby", function(event) {
        event.preventDefault();
        var newName = $("#lobby-name-field").val().trim();

        // Create a new directory in Firebase for the lobby.
        database.ref("/" + newName).set({
            name: newName
        });
        database.ref("/" + newName + "/playersJoined").set({
            p1joined: false,
            p2joined: false
        })
        database.ref("/" + newName + "/game").set({
            object: ""
        })

        // Join the lobby
        joinLobby(newName);

        $("#lobby-div").hide();
        $("#city-picker").show();
    });


    // CHAT SUBMIT ON-CLICK FUNCTION
    $(document).on("click", "#submit", function(event) {
        event.preventDefault();

        var message = $("#message").val().trim();

        database.ref("/" + lobbyName + "chat").push({
            message: message
        })
    })

    // CITY SELECTION ON-CLICK FUNCTION
    $(document).on("click", ".city", function () {
        var name = $(this).find(".city-name").text();
        var hp = $(this).find(".selection-hp").text();
        var atk = $(this).find(".selection-atk").text();
        var special = $(this).find(".selection-special").text();
        var src = $(this).find(".city-image").attr("src");
        
        console.log("Player number: " + playerNumber);
        if (playerNumber === 1) {
            // Push new Player1 object up to Firebase 
            createPlayer(Game.Player1, name, src, hp, atk, special)
            createPlayerTile("#player", name, 1, "#player-name", hp, src)
            player1Selected = true;
            var stringGame = JSON.stringify(Game);
            database.ref("/" + lobbyName + "/game").set({
                object: stringGame
            });
        } else if (playerNumber === 2) {
            // Push new player2 object up to Firebase
            createPlayer(Game.Player2, name, src, hp, atk, special);
            createPlayerTile("#player", name, 2, "#player-name", hp, src)
            player2Selected = true;
            var stringGame = JSON.stringify(Game);
            database.ref("/" + lobbyName + "/game").set({
                object: stringGame
            })
        }

        $("#city-picker").css("display", "none");
        $("#play").css("display", "block");
        disableButtons();
    })

    // Resets things after the game is done.
    $(document).on("click", "#restart", function() {
        player1Joined = false;
        player2Joined = false;

        $("#start").attr("disabled", false);

        database.ref("/" + lobbyName + "/playersJoined").set({
            p1joined: player1Joined,
            p2joined: player2Joined
        });

        database.ref("/" + lobbyName + "/game").set({
            object: ""
        });

        database.ref("/" + lobbyName + "/log").remove();

        database.ref("/" + lobbyName + "/chat").remove();

    })

    // Performs the actions associated with the attack button
    $(document).on("click", "#attack", function() {
        var logText = "";
        if (Game.Player1turn) {
            logText = "Player 1 attacked Player 2 for " + Game.Player1.atk + " damage.";
        } else if (Game.Player2turn) {
            logText = "Player 2 attacked Player 1 for " + Game.Player2.atk + " damage.";
        }
        pushLogMessageToFireBase(logText)
        
        GameMethods.decideTurn("attack");
        updateDOMhp();
        
    })

    // Performs the actions associated with the cold attack button.
    $(document).on("click", "#cold", function () {
        var logText = "";
        if (Game.Player1turn) {
            logText = "Player 1 cold-attacked Player 2 for " + Game.Player1.atk * 1.5 + " damage. Player 1 loses a turn.";
        } else if (Game.Player2turn) {
            logText = "Player 2 cold-attacked Player 1 for " + Game.Player2.atk * 1.5 + " damage. Player 2 loses a turn.";
        }
        pushLogMessageToFireBase(logText);

        GameMethods.decideTurn("cold");
        updateDOMhp();
    })

    // Performs the actions associated with the hot attack button.
    $(document).on("click", "#hot", function () {
        var logText = "";
        if (Game.Player1turn) {
            logText = "Player 1 hot-attacked Player 2 for " + Game.Player1.atk * 1.75 + " damage. Player 1 lost " + Game.Player1.hp - 5 + " health.";
        } else if (Game.Player2turn) {
            logText = "Player 2 hot-attacked Player 1 for " + Game.Player2.atk * 1.75 + " damage. Player 2 lost " + Game.Player2.hp - 5 + " health.";
        }
        pushLogMessageToFireBase(logText);

        GameMethods.decideTurn("hot");
        updateDOMhp();
    })

    // Performs the actions associated with the storm attack button.
    $(document).on("click", "#storm", function () {
        var logText = "";
        if (Game.Player1turn) {
            logText = "Player 1 storm-attacked Player 2 for " + Game.Player1.atk * 0.5 + " damage. Player 2 loses a turn.";
        } else if (Game.Player2turn) {
            logText = "Player 2 storm-attacked Player 1 for " + Game.Player2.atk * 0.5 + " damage. Player 1 loses a turn.";
        }
        pushLogMessageToFireBase(logText);

        GameMethods.decideTurn("storm");
        updateDOMhp();
    });

    // Forfeits the player's turn.
    $(document).on("click", "#end", function () {
        GameMethods.decideTurn("");
        updateDOMhp();
    });

    // Runs every time the playe clikcs one of the available action buttons.
    $(document).on("click", ".action", function () {
        var stringGame = JSON.stringify(Game);
        database.ref("/" + lobbyName + "/game").set({
            object: stringGame
        });
    });

    
})   