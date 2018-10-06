function updateDOMhp() {
    $("#p1hp").text(Game.Player1.hp);
    $("#p2hp").text(Game.Player2.hp);
}

$(document).ready(function() {
    updateDOMhp();

    $(document).on("click", "#attack", function() {
        // Game.Player1.hp -= Game.Player2.atk;
        Game.decideTurn("attack");
        updateDOMhp();
    })
})