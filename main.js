var searchResults = [];
var imdbID = ""
var idArr = []

$("#searchButton").on("click", function (event) {
  event.preventDefault()
  $("#searchResults").empty()
  $("#searchResults").html("Loading...")

  //store user input as topic var
  var topic = $("#searchField").val()

  if ($("#searchOptions").val() == "tv") {

    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": "http://www.omdbapi.com/?type=series&s=" + topic + "&apikey=5b2c9d95",
      "method": "GET",

    }).then(function (response) {
      //diplay error message if input invalid
      if (response.Response == "False") {
        var errorMessage = $("<h6>")
        errorMessage.addClass("alert alert-warning")
        errorMessage.text(response.Error)
        $("#searchResults").html(errorMessage)
      }


      else {
        $("#searchResults").empty()
        searchResults = response.Search

        for (var i = 0; i < searchResults.length; i++) {
          //div for each result
          var resultDiv = $("<div>")
          resultDiv.addClass("card")
          resultDiv.attr("style", "margin:16px;width:316px;")
          //img to display
          var resultImg = $("<img>")
          resultImg.addClass("card-img-top mx-auto")
          resultImg.attr("src", searchResults[i].Poster)
          resultImg.attr("style", "width:300px;height:auto;align:center;")

          var resultBody = $("<div>")
          resultBody.addClass("card-body")
          //title from response
          var resultTitle = $("<h5>")
          resultTitle.addClass("card-text")
          resultTitle.text(searchResults[i].Title)
          //years on air
          var resultText = $("<p>")
          resultText.addClass("card-text")
          resultText.text("Years on the Air: " + searchResults[i].Year)
          //link to details
          var resultLink = $("<button>")
          resultLink.attr("class", "btn btn-primary")
          resultLink.text("More Information")

          //apend text to body 
          resultBody.append(resultTitle)
          resultBody.append(resultText)
          resultBody.append(resultLink)
          resultDiv.append(resultImg)
          //append body to card div
          resultDiv.append(resultBody)
          //attribute for details button 
          resultLink.attr("result-number", i)
          resultLink.attr("title", searchResults[i].Title)
          resultLink.addClass("tvLink")
          //display results to DOM
          $("#searchResults").append(resultDiv)



        }
      }

    }); //then function close

  }


  if ($("#searchOptions").val() == "movies") {

    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": "http://www.omdbapi.com/?&s=" + topic + "&type=movie&apikey=5b2c9d95",
      "method": "GET",

    }).then(function (response) {

      //error message pop up vs display info
      if (response.Response == "False") {
        var errorMessage = $("<h6>")
        errorMessage.addClass("alert alert-warning")
        errorMessage.text(response.Error)
        $("#searchResults").html(errorMessage)
      }

      else {
        $("#searchResults").empty()
        searchResults = response.Search
        for (var i = 0; i < searchResults.length; i++) {

          console.log(searchResults[i].imdbID)
          //div for results
          var resultDiv = $("<div>")
          resultDiv.addClass("card")
          resultDiv.attr("style", "margin:16px;width:316px;")
          //img to display
          var resultImg = $("<img>")
          resultImg.addClass("card-img-top mx-auto")
          resultImg.attr("src", searchResults[i].Poster)
          resultImg.attr("style", "width:300px;height:auto;align:center;")
          //body to hold text
          var resultBody = $("<div>")
          resultBody.addClass("card-body")
          //title
          var resultTitle = $("<h5>")
          resultTitle.addClass("card-text")
          resultTitle.text(searchResults[i].Title)
          //year released
          var resultText = $("<p>")
          resultText.addClass("card-text")
          resultText.text("Release Year: " + searchResults[i].Year)
          //details button
          var resultLink = $("<button>")
          resultLink.attr("class", "btn btn-primary")
          resultLink.text("More Information")
          //append results to body 
          resultBody.append(resultTitle)
          resultBody.append(resultText)
          resultBody.append(resultLink)
          //append body to div
          resultDiv.append(resultImg)
          resultDiv.append(resultBody)
          //attribute to track details button
          resultLink.attr("result-number", i)
          resultLink.attr("title", searchResults[i].Title)
          resultLink.addClass("movieLink")

          //display results on DO<M
          $("#searchResults").append(resultDiv)
        }
      }
    })
  }

  if ($("#searchOptions").val() == "videogames") {
    queryURL =
      "http://www.giantbomb.com/api/search/?api_key=a74fc2e122070c900f130b1686762de83101e99e&format=json&query=" + $("#searchField").val() + "&resources=game"
    $.ajax({
      "url": queryURL,//+$("#searchField").val(),
      "method": "GET",
    }).then(function (response) {
      $("#searchResults").empty()
      searchResults = response.results
      for (var i = 0; i < searchResults.length; i++) {
        var resultDiv = $("<div>")
        resultDiv.addClass("card")
        resultDiv.attr("style", "margin:16px;width:316px;")

        var resultImg = $("<img>")
        resultImg.addClass("card-img-top mx-auto")
        resultImg.attr("src", searchResults[i].image.original_url)
        resultImg.attr("style", "width:300px;height:auto;align:center;")
        //console.log(searchResults[i].image.icon_ur)

        var resultBody = $("<div>")
        resultBody.addClass("card-body")

        var resultTitle = $("<h5>")
        resultTitle.addClass("card-text")
        resultTitle.text(searchResults[i].name)
        var resultText = $("<p>")
        resultText.addClass("card-text")
        resultText.text(searchResults[i].deck)
        var resultLink = $("<button>")
        resultLink.attr("class", "btn btn-primary")
        resultLink.text("More Information")
        //var resultImgRow = $("<tr>")
        // var resultTitleRow = $("<tr>")
        // var resultTextRow = $("<tr>")
        // var resultTable = $("<table>")

        resultBody.append(resultTitle)
        resultBody.append(resultText)
        resultBody.append(resultLink)

        resultDiv.append(resultImg)
        resultDiv.append(resultBody)

        resultLink.attr("result-number", i)
        resultLink.addClass("link")

        $("#searchResults").append(resultDiv)

      }
    });
  }
})

<<<<<<< HEAD
=======
//on click info button for video games
>>>>>>> caf9a1b8b4ff953c108c6b292ec8115e3a60e7a4
$(document.body).on("click", ".link", function () {
  var i = parseInt($(this).attr("result-number"))
  //console.log(searchResults[i])
  $("#searchResults").empty()
  //$("#searchResults").text("Loading...")
  var contentDiv = $("<div>")
  contentDiv.addClass("card align-center")

  var titleH = $("<h1>")
  titleH.addClass("card-header align-center")
  titleH.text(searchResults[i].name)
  contentDiv.append(titleH)

  //var platformsH = $("<h2>")
  //platformsH.addClass("card-title align-center")
  //
  //contentDiv.append(titleH)


  var descriptionP = $("<p>")
  descriptionP.addClass("card-text")
<<<<<<< HEAD
  
  if (searchResults[i].description == null) {
    var imageImg = $("<img>")
    imageImg.addClass("pull-left")
    imageImg.attr("src",searchResults[i].image.original_url)
    imageImg.attr("style","width:20%;height:auto;")
=======

  if (searchResults[i].description == null) {
    var imageImg = $("<img>")
    imageImg.addClass("pull-left")
    imageImg.attr("src", searchResults[i].image.original_url)
    imageImg.attr("style", "width:20%;height:auto;")
>>>>>>> caf9a1b8b4ff953c108c6b292ec8115e3a60e7a4
    descriptionP.append(imageImg)
    descriptionP.append(searchResults[i].deck)
  } else {
    descriptionP.html(searchResults[i].description)
  }
  contentDiv.append(descriptionP)

  $("#searchResults").append(contentDiv)

})

<<<<<<< HEAD
=======
//onclick detials for tv 
$(document.body).on("click", ".tvLink", function () {
  var i = parseInt($(this).attr("result-number"))
  var title = $(this).attr("title")
  console.log(title)
  //console.log(searchResults[i])
  $("#searchResults").empty()
  var contentDiv = $("<div>")
  contentDiv.addClass("card align-center")


  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=" + title + "&key=AIzaSyDcyyGyFqaZsSndJxToEMEeE34xJM-UTA4",
    "method": "GET",
    "headers": {
      "Cache-Control": "no-cache",
      "Postman-Token": "17addf34-eefe-4c61-9807-69c58abb307a"
    }
  }

  $.ajax(settings).then(function (response) {
    // console.log(response);
    var vidResult = response.items
    console.log(vidResult)

    for (var i = 0; i < vidResult.length; i++) {
      console.log(vidResult[i].snippet.title)
      console.log(vidResult[i].snippet.description)
      console.log(vidResult[i].snippet.thumbnails.default.url)

      var titleH = $("<h1>")
      titleH.addClass("card-header align-center")
      titleH.text(vidResult[i].snippet.title)
      contentDiv.append(titleH)

      var description = $("<h3>")
      description.addClass("card-body align-center")
      description.text(vidResult[i].snippet.description)
      contentDiv.append(description)

      $("#searchResults").append(contentDiv)


    }
  });

})//closes tv click

//onclick detials for movies 
$(document.body).on("click", ".movieLink", function () {
  var i = parseInt($(this).attr("result-number"))
  var title = $(this).attr("title")
  console.log(title)
  //console.log(searchResults[i])
  $("#searchResults").empty()

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=" + title + "&key=AIzaSyDcyyGyFqaZsSndJxToEMEeE34xJM-UTA4",
    "method": "GET",
    "headers": {
      "Cache-Control": "no-cache",
      "Postman-Token": "17addf34-eefe-4c61-9807-69c58abb307a"
    }
  }

  $.ajax(settings).then(function (response) {
    // console.log(response);
    var vidResult = response.items
    console.log(vidResult)

    for (var i = 0; i < vidResult.length; i++) {
      console.log(vidResult[i].snippet.title)
      console.log(vidResult[i].snippet.description)
      console.log(vidResult[i].snippet.thumbnails.default.url)
      console.log(vidResult[i].snippet.thumbnails.default.height)
      console.log(vidResult[i].snippet.thumbnails.default.width)

      var cardDiv = $("<div>")
      cardDiv.addClass("card align-center m-2")
      var contentDiv = $("<div>")
      contentDiv.addClass("card-body align-center")

      //     <iframe width="420" height="315"
      // src="https://www.youtube.com/embed/tgbNymZ7vqY">
      // </iframe>
      

      var videoTag = $("<iframe>")
      videoTag.attr("src", vidResult[i].snippet.thumbnails.default.url)
      videoTag.attr("width", vidResult[i].snippet.thumbnails.default.width)
      videoTag.attr("height", vidResult[i].snippet.thumbnails.default.height)
      console.log(videoTag)
      videoTag.append(contentDiv)


      var titleH = $("<h1>")
      titleH.addClass("card-header align-center")
      titleH.text(vidResult[i].snippet.title)
      cardDiv.append(titleH)

      var description = $("<h3>")
      description.text(vidResult[i].snippet.description)
      contentDiv.append(description)
      cardDiv.append(contentDiv)
      $("#searchResults").append(cardDiv)


    }
  });

})//closes tv click 


>>>>>>> caf9a1b8b4ff953c108c6b292ec8115e3a60e7a4

//<div class="card" style="width: 18rem;">
//<img class="card-img-top" src="..." alt="Card image cap">
//<div class="card-body">
///    <h5 class="card-title">Card title</h5>
//    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//    <a href="#" class="btn btn-primary">Go somewhere</a>
//</div>
//</div>



