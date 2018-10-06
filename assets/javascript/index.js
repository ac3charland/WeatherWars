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

function updateDOMhp() {
    $("#p1hp").text(Game.Player1.hp);
    $("#p2hp").text(Game.Player2.hp);
}

function disableButtons() {
    var player1 = Game.Player1;
    var player2 = Game.Player2;
    if (!player1Selected || !player2Selected) {
        $("#attack, #cold, #hot, #storm, #end").attr("disabled", true);
        return;
    } else {
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
            $("#p1name").text("Player 1: " + name);
            
            var img = $("<img>");
            img.attr("src", src);
            img.addClass("city-image");
            $("#player1").append(img);

            var hpTag = $("<p>");
            hpTag.text("HP: ");
            var hpSpan = $("<span id='p1hp'>");
            hpSpan.text(Game.Player1.hp);
            hpTag.append(hpSpan);
            $("#player1").append(hpTag);

            player1Selected = true;
        } else if (!player2Selected) {
            createPlayer(Game.Player2, hp, atk, special);
            $("#p2name").text("Player 2: " + name);
            
            var img = $("<img>");
            img.attr("src", src);
            img.addClass("city-image");
            $("#player2").append(img);

            var hpTag = $("<p>");
            hpTag.text("HP: ");
            var hpSpan = $("<span id='p2hp'>");
            hpSpan.text(Game.Player2.hp);
            hpTag.append(hpSpan);
            $("#player2").append(hpTag);
        
            player2Selected = true;
            highlightCurrentPlayer();
        }
        disableButtons();
    })
})