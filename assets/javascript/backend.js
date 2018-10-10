// Object for sending AJAX requests.
var Ajax = {
    darkSkyResponse: "",
    cityInfoResponse: "",
    cityScoresResponse: "",
    
    // Sends the three API requests used by the application
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

            self.cityInfoResponse = CIResponse;

            //city scores api call
            $.ajax({
                url: cityScoresURL,
                method: "GET"
            })
            .then(function (CSResponse) {

                self.cityScoresResponse = CSResponse;

                //dark sky ajax call
                $.ajax({
                    url: darkSkyURL,
                    method: "GET"
                })
                .then(function (DSResponse) {

                    self.darkSkyResponse = DSResponse;
                    thenFunction();
                })
            })
        }) 
    }
}

