
//Teleport API (stats)-------------------------------------------------------------------------------------

var cityName = "new-york"

var queryURL = "https://api.teleport.org/api/urban_areas/slug:" + cityName + "/scores";

$.ajax({
    url: queryURL,
    method: "GET"
  })

  .then(function(response) {
    console.log(queryURL);

    console.log(response);
   

    
    $("#internet").text(response.categories[13].score_out_of_10)

})


//Teleport API (city info)----------------------------------------------\

var geoId = "5391959"

var  cityInfoUrl = "https://api.teleport.org/api/cities/geonameid:" + geoId + "/"



$.ajax({
    url: cityInfoUrl,
    method: "GET"
  })

  .then(function(response2) {
    console.log(cityInfoUrl);

    console.log(response2);

    $("#cityName").text()

  })