
var locations = Game.locations;
console.log(locations);
//Adding test buttons
function renderButtons() {
    $("#buttons-go-here").empty()
    for (var i = 0; i < locations.length; i++) {
        var a = $("<button>");
        a.addClass("show");
        a.addClass("cityButton")
        a.addClass("btn btn-light btn-lg btn-3d btn-round")
        a.attr("data-show", locations[i].geoid);
        a.attr("data-name", locations[i].namecode);
        a.attr("data-long", locations[i].long);
        a.attr("data-lat", locations[i].lat)
        a.attr("data-img", locations[i].img)
        a.text(locations[i].cityName);
        $("#buttons-go-here").append(a);
    }
}

//calling test buttons 
renderButtons()

function cityInfoSetup(imgId) {
    var cityInfoResponse = this.cityInfoResponse;
    var cityScoresResponse = this.cityScoresResponse;
    var darkSkyResponse = this.darkSkyResponse;
    console.log(cityInfoResponse, cityScoresResponse, darkSkyResponse);

    if (darkSkyResponse === "" || cityScoresResponse === "" === cityInfoResponse === "") {
        console.log("Error: no AJAX response.")
        return;
    }
    //CITY INFO JQUERY: 
    // Create new rows with the city info
    var newRow = $("<tr>").append(
        $("<td>").text(cityInfoResponse.full_name),
        $("<td>").text(cityInfoResponse.population),
        $("<td>").text(cityInfoResponse.location.latlon.longitude),
        $("<td>").text(cityInfoResponse.location.latlon.latitude),
        $("<td>").text(cityInfoResponse.geoname_id)

    );
    // Append new row to table
    $("#cityInfoTable > tbody").append(newRow);

    // CITY SCORES JQUERY:
    // Create new rows for the 2nd table
    var tableTwoNewRow = $("<tr>").append(
        $("<td>").text(cityInfoResponse.name),
        $("<td>").text(Math.round(cityScoresResponse.categories[1].score_out_of_10)),
        $("<td>").text(Math.round(cityScoresResponse.categories[5].score_out_of_10)),
        $("<td>").text(Math.round(cityScoresResponse.categories[7].score_out_of_10)),
        $("<td>").text(Math.round(cityScoresResponse.categories[8].score_out_of_10)),
        $("<td>").text(Math.round(cityScoresResponse.categories[9].score_out_of_10)),
        $("<td>").text(Math.round(cityScoresResponse.categories[10].score_out_of_10)),
        $("<td>").text(Math.round(cityScoresResponse.categories[13].score_out_of_10)),
        $("<td>").text(Math.round(cityScoresResponse.categories[15].score_out_of_10)) ,
    )
    // Append new rows to 2nd table
    $("#cityStatsTable > tbody").append(tableTwoNewRow);

    // DARK SKIES JQUERY:
    // Append rows to thrird table
    var tableThreeNewRow = $("<tr>").append(
        $("<td>").text(cityInfoResponse.name),
        $("<td>").text(darkSkyResponse.currently.time),
        $("<td>").text(darkSkyResponse.currently.temperature),
        $("<td>").text(darkSkyResponse.currently.summary),
        $("<td>").text(darkSkyResponse.currently.windSpeed),
        $("<td>").text(Math.round(darkSkyResponse.currently.cloudCover * 10)),
        $("<td>").text(Math.round(darkSkyResponse.currently.precipIntensity * 100)),
        $("<td>").text((darkSkyResponse.currently.humidity * 100) + "%")
    )

    $("#cityWeatherTable > tbody").append(tableThreeNewRow);

    //Adding to the img Div
    //var elem = document.getElementById("img");
    //elem.setAttribute("src", "../images/paris.jpg")
    $(".img-body").empty()
    $(".nameBox").empty()
    $(".img-body").append("<img src='" + imgId + "' style='width: 700px'>")
    $(".nameBox").html(cityInfoResponse.name)

    $(".img-text").html(cityScoresResponse.summary)
}


//THE BIG ON CLICK FUNTION. 3 AJAX CALLS. WE DOIN IT BIG---------------------------------------------------------------
$(document).on("click", ".cityButton", function () {


    //vars for the ajax calls go here
    var cityName = ($(this).data("name"))
    var geoId = ($(this).data("show"))
    var lat = ($(this).data("lat"))
    var long = ($(this).data("long"))
    var imgId = ($(this).data("img"))

    Ajax.sendRequest(cityName, geoId, lat, long, function() {cityInfoSetup(imgId)});
});

//Reset button 
$(document).on('click', '.resetBtn', function () {
    $("tbody").empty();
    $(".img-body").empty()
    $(".img-text").empty()
    $(".nameBox").empty()
});