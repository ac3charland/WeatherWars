function updateDOMhp() {
    $("#p1hp").text(Game.Player1.hp);
    $("#p2hp").text(Game.Player2.hp);
}

function disableButtons() {
    var player1 = Game.Player1;
    var player2 = Game. Player2;

    if (Game.Player1turn) {
        if (player1.isFrozen) {
            $("#attack, #cold, #hot, #storm").attr("disabled", true);
        } else if (player1.stormDisabled) {
            $("#storm").attr("disabled", true);
            $("#attack, #cold, #hot").attr("disabled", false);
        } else {
            $("#attack, #cold, #hot, #storm").attr("disabled", false);
        }
    } else if (Game.Player2turn) {
        if (player2.isFrozen) {
            $("#attack, #cold, #hot, #storm").attr("disabled", true);
        } else if (player2.stormDisabled) {
            $("#storm").attr("disabled", true);
            $("#attack, #cold, #hot").attr("disabled", false);
        } else {
            $("#attack, #cold, #hot, #storm").attr("disabled", false);
        }
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
    updateDOMhp();
    highlightCurrentPlayer();

    

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
})