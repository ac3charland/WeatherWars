var Ajax = {
    darkSkyResponse: "",
    cityInfoResponse: "",
    cityScoresResponse: "",
    sendRequest: function(cityName, geoId, lat, long, thenFunction) {

        var key = "73a039df0c6981cf0c61cdaa5b5cc704"

        var darkSkyURL = "https://api.darksky.net/forecast/" + key + "/" + lat + "," + long

        var cityInfoUrl = "https://api.teleport.org/api/cities/geonameid:" + geoId + "/"

        var cityScoresURL = "https://api.teleport.org/api/urban_areas/slug:" + cityName + "/scores";

        //city info ajax call
        $.ajax({
            url: cityInfoUrl,
            method: "GET"
        })
        .then(function (CIResponse) {
            // console.log("City info API: ")
            // console.log(CIResponse);

            self.cityInfoResponse = CIResponse;

            //city scores api call
            $.ajax({
                url: cityScoresURL,
                method: "GET"
            })
            .then(function (CSResponse) {
                // console.log("City scores API: ")
                // console.log(CSResponse);

                self.cityScoresResponse = CSResponse;

                //dark sky ajax call
                $.ajax({
                    url: darkSkyURL,
                    method: "GET"
                })
                .then(function (DSResponse) {
                    // console.log("Dark Sky Weather API: ")
                    // console.log(DSResponse)

                    self.darkSkyResponse = DSResponse;
                    thenFunction();
                })
            }) // End of City Scores .then AJAX function
        }) // End of City Info .then AJAX function
    }
}


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
// cloudHP = cloudHP + 5;
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







