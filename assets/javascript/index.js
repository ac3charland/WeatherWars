var player1Selected = false;
var player2Selected = false;

function createPlayer(player, hp, atk, special) {
    player.hp = parseInt(hp);
    player.atk = parseInt(atk);

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

function displayRandomCityInSlot(slot) {
    var city = Game.pickRandomLocation();
    
    var name = city.namecode;
    var geoid = city.geoid;
    var lat = city.lat;
    var long = city.long;

    Ajax.sendRequest(name, geoid, lat, long, function() {cityDisplayResponse(city, slot)});
}

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
    var hp = Game.calculateHP(cloudCover, qol, safety, commute);
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

function updateDOMhp() {
    $("#p1hp").text(Game.Player1.hp);
    $("#p2hp").text(Game.Player2.hp);
}

function disableButtons() {
    var player1 = Game.Player1;
    var player2 = Game.Player2;
    if (!player1Selected || !player2Selected || Game.GameOver) {
        $("#attack, #cold, #hot, #storm, #end").attr("disabled", true);
        return;
    }
    else {
        $("#end").attr("disabled", false);
    }

    if (Game.Player1turn) {
        $("#attack, #cold, #hot, #storm").attr("disabled", false);

        if (player1.hotDisabled)
            $("#hot").attr("disabled", true);
        if (player1.coldDisabled)
            $("#cold").attr("disabled", true);
        if (player1.stormDisabled)
            $("#storm").attr("disabled", true);
        if (player1.isFrozen)
            $("#attack, #cold, #hot, #storm").attr("disabled", true);

    } else if (Game.Player2turn) {
        $("#attack, #cold, #hot, #storm").attr("disabled", false);

        if(player2.hotDisabled) 
            $("#hot").attr("disabled", true);
        if(player2.coldDisabled)
            $("#cold").attr("disabled", true);
        if (player2.stormDisabled) 
            $("#storm").attr("disabled", true);
        if (player2.isFrozen)
            $("#attack, #cold, #hot, #storm").attr("disabled", true);
    }
}

function highlightCurrentPlayer() {
    if (Game.Player1turn) {
        $("#player1").addClass("highlighted");
        $("#player2").removeClass("highlighted");
    } else if (Game.Player2turn) {
        $("#player2").addClass("highlighted");
        $("#player1").removeClass("highlighted");
    }
}


$(document).ready(function() {
    disableButtons();
    displayRandomCityInSlot(1);
    displayRandomCityInSlot(2);
    displayRandomCityInSlot(3);

    $(document).on("click", "#attack", function() {
        var log = $("<p>");
        if (Game.Player1turn) {
            log.text("Player 1 attacked Player 2 for " + Game.Player1.atk + " damage.");
        } else if (Game.Player2turn) {
            log.text("Player 2 attacked Player 1 for " + Game.Player2.atk + " damage.");
        }
        $("#log").append(log)
        
        Game.decideTurn("attack");
        updateDOMhp();
        
    })

    $(document).on("click", "#cold", function () {
        var log = $("<p>");
        if (Game.Player1turn) {
            log.text("Player 1 cold-attacked Player 2 for " + Game.Player1.atk * 1.5 + " damage. Player 1 loses a turn.");
        } else if (Game.Player2turn) {
            log.text("Player 2 cold-attacked Player 1 for " + Game.Player2.atk * 1.5 + " damage. Player 2 loses a turn.");
        }
        $("#log").append(log)

        Game.decideTurn("cold");
        updateDOMhp();
    })

    $(document).on("click", "#hot", function () {
        var log = $("<p>");
        if (Game.Player1turn) {
            log.text("Player 1 hot-attacked Player 2 for " + Game.Player1.atk * 1.75 + " damage. Player 1 lost " + Game.Player1.hp * 0.25 + " health.");
        } else if (Game.Player2turn) {
            log.text("Player 2 hot-attacked Player 1 for " + Game.Player2.atk * 1.75 + " damage. Player 2 lost " + Game.Player2.hp * 0.25 + " health.")
        }
        $("#log").append(log)

        Game.decideTurn("hot");
        updateDOMhp();
    })

    $(document).on("click", "#storm", function () {
        var log = $("<p>");
        if (Game.Player1turn) {
            log.text("Player 1 storm-attacked Player 2 for " + Game.Player1.atk * 0.5 + " damage. Player 2 loses a turn.");
        } else if (Game.Player2turn) {
            log.text("Player 2 storm-attacked Player 1 for " + Game.Player2.atk * 0.5 + " damage. Player 1 loses a turn.")
        }
        $("#log").append(log)

        Game.decideTurn("storm");
        updateDOMhp();
    })

    $(document).on("click", "#end", function () {
        Game.decideTurn("");
        updateDOMhp();
    })

    $(document).on("click", ".action", function () {
        disableButtons();
        highlightCurrentPlayer();
    })

    $(document).on("click", ".city", function() {
        var name = $(this).find(".city-name").text();
        var hp = $(this).find(".selection-hp").text();
        var atk = $(this).find(".selection-atk").text();
        var special = $(this).find(".selection-special").text();
        var src = $(this).find(".city-image").attr("src");

        if (!player1Selected) {
            createPlayer(Game.Player1, hp, atk, special);
            
            createPlayerTile("#player1", name, 1, "#p1name", Game.Player1.hp, src);

            player1Selected = true;
        } else if (!player2Selected) {
            createPlayer(Game.Player2, hp, atk, special);
            
            createPlayerTile("#player2", name, 2, "#p2name", Game.Player2.hp, src);
        
            player2Selected = true;
            highlightCurrentPlayer();
        }
        disableButtons();
    })
})   