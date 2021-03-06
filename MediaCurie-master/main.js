var searchResults = [];
//on click of homebutton
$("#home").on("click", function (event) {
  event.preventDefault()
  //empty results div
  $("#searchResults").empty()
})
$("#searchButton").on("click", function (event) {
  event.preventDefault()
  $("#searchResults").empty()
  //$("#searchResults").text("<img src='mediacurie-logo-animated.gif'>")
  var loadingImg = $("<img>")
  loadingImg.attr("src", "mediacurie-logo-animated.gif")
  loadingImg.attr("style", "align:center;margin:auto;")
  $("#searchResults").append(loadingImg)
  //store user input as topic var
  var topic = $("#searchField").val().trim()
  if ($("#searchOptions").val() == "tv") {
    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": "https://www.omdbapi.com/?type=series&s=" + topic + "&apikey=5b2c9d95",
      "method": "GET",
    }).then(function (response) {
      //diplay error message if input invalid
      if (response.Response == "False") {
        $("#searchResults").empty()
        swal({
          title: response.Error,
          text: "Please try again",
          icon: "error",
        });
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
          resultLink.addClass("btn btn-warning")
          resultLink.text("More Information")
          //button to add to favs
          var favButton = $("<button>")
          favButton.addClass("btn btn-secondary m-2 tvFav")
          favButton.text("FAV")
          //add atributes to track fav button
          favButton.attr("title", searchResults[i].Title)
          //apend text to body 
          resultBody.append(resultTitle)
          resultBody.append(resultText)
          resultBody.append(resultLink)
          resultBody.append(favButton)
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
      "url": "https://www.omdbapi.com/?&s=" + topic + "&type=movie&apikey=5b2c9d95",
      "method": "GET",
    }).then(function (response) {
      //error message pop up vs display info
      if (response.Response == "False") {
        $("#searchResults").empty()
        swal({
          title: response.Error,
          text: "Please try again",
          icon: "error",
        });
      }
      else {
        $("#searchResults").empty()
        searchResults = response.Search
        for (var i = 0; i < searchResults.length; i++) {
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
          resultLink.attr("class", "btn btn-warning")
          resultLink.text("More Information")
          //button to add to favs
          var favButton = $("<button>")
          favButton.addClass("btn btn-secondary m-2 movieFav")
          favButton.text("FAV")
          //append results to body 
          resultBody.append(resultTitle)
          resultBody.append(resultText)
          resultBody.append(resultLink)
          resultBody.append(favButton)
          //append body to div
          resultDiv.append(resultImg)
          resultDiv.append(resultBody)
          //attribute to track details button
          resultLink.attr("result-number", i)
          resultLink.attr("title", searchResults[i].Title)
          resultLink.addClass("movieLink")
          //add atributes to track fav button
          favButton.attr("title", searchResults[i].Title)
          //display results on DO<M
          $("#searchResults").append(resultDiv)
        }
      }
    })
  }
  if ($("#searchOptions").val() == "videogames") {
    queryURL =
      "https://www.giantbomb.com/api/search/?api_key=a74fc2e122070c900f130b1686762de83101e99e&format=json&query=" + topic + "&resources=game"
    $.ajax({
      "url": queryURL,//+$("#searchField").val(),
      "method": "GET",
    }).then(function (response) {
      $("#searchResults").empty()
      if (response.number_of_total_results == 0) {
        $("#searchResults").empty()
        swal({
          title: "Game not found!",
          text: "Please try again",
          icon: "error",
        });
      } else {
        searchResults = response.results
        for (var i = 0; i < searchResults.length; i++) {
          var resultDiv = $("<div>")
          resultDiv.addClass("card")
          resultDiv.attr("style", "margin:16px;width:316px;")
          var resultImg = $("<img>")
          resultImg.addClass("card-img-top mx-auto")
          resultImg.attr("src", searchResults[i].image.original_url)
          resultImg.attr("style", "width:300px;height:auto;align:center;")
          var resultBody = $("<div>")
          resultBody.addClass("card-body")
          var resultTitle = $("<h5>")
          resultTitle.addClass("card-text")
          resultTitle.text(searchResults[i].name)
          var resultText = $("<p>")
          resultText.addClass("card-text")
          resultText.text(searchResults[i].deck)
          var resultLink = $("<button>")
          resultLink.attr("class", "btn btn-warning")
          resultLink.text("More Information")

          //button to add to favs
          var favButton = $("<button>")
          favButton.addClass("btn btn-secondary m-2 gameFav")
          favButton.text("FAV")
          //add atributes to track fav button
          favButton.attr("title", searchResults[i].name)
          resultBody.append(resultTitle)
          resultBody.append(resultText)
          resultBody.append(resultLink)
          resultDiv.append(resultImg)
          resultDiv.append(resultBody)
          resultBody.append(favButton)
          resultLink.attr("result-number", i)
          resultLink.addClass("link")
          $("#searchResults").append(resultDiv)

        }
      }
    });
  }
})
//on click info button for video games 
$(document.body).on("click", ".link", function () {
  var i = parseInt($(this).attr("result-number"))
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
  if (searchResults[i].description == null) {
    var imageImg = $("<img>")
    imageImg.addClass("pull-left")
    imageImg.attr("src", searchResults[i].image.original_url)
    imageImg.attr("style", "width:20%;height:auto;")
    descriptionP.append(imageImg)
    descriptionP.append(searchResults[i].deck)
  } else {
    descriptionP.html(searchResults[i].description)
  }
  contentDiv.append(descriptionP)
  $("#searchResults").append(contentDiv)
})
//onclick detials for tv 
$(document.body).on("click", ".tvLink", function () {
  var i = parseInt($(this).attr("result-number"))
  var title = $(this).attr("title")
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
      "Postman-Token": "17addf34-eefe-4c61-9807-69c58abb307a",
    }
  }
  $.ajax(settings).then(function (response) {
    var vidResult = response.items
    for (var i = 0; i < vidResult.length; i++) {
      var cardDiv = $("<div>")
      cardDiv.addClass("card align-center m-2")
      var contentDiv = $("<div>")
      contentDiv.addClass("card-body align-center")
      var videoTag = $("<iframe>")
      videoTag.attr("src", "https://www.youtube.com/embed/" + vidResult[i].id.videoId)
      videoTag.attr("width", "400px")
      videoTag.attr("height", "250px")
      contentDiv.append(videoTag)
      var titleH = $("<h1>")
      titleH.addClass("card-header align-center")
      titleH.text(vidResult[i].snippet.title)
      cardDiv.append(titleH)
      var description = $("<h6>")
      description.text(vidResult[i].snippet.description)
      contentDiv.prepend(description)
      cardDiv.append(contentDiv)
      $("#searchResults").append(cardDiv)
    }
  });
})//closes tv click
//onclick detials for movies 
$(document.body).on("click", ".movieLink", function () {
  var i = parseInt($(this).attr("result-number"))
  var title = $(this).attr("title")
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
    var vidResult = response.items
    for (var i = 0; i < vidResult.length; i++) {
      var cardDiv = $("<div>")
      cardDiv.addClass("card align-center m-2")
      var contentDiv = $("<div>")
      contentDiv.addClass("card-body align-center")
      var videoTag = $("<iframe>")
      videoTag.attr("src", "https://www.youtube.com/embed/" + vidResult[i].id.videoId)
      videoTag.attr("width", "400px")
      contentDiv.append(videoTag)
      var titleH = $("<h1>")
      titleH.addClass("card-header align-center")
      titleH.text(vidResult[i].snippet.title)
      cardDiv.append(titleH)
      var description = $("<h6>")
      description.text(vidResult[i].snippet.description)
      contentDiv.prepend(description)
      cardDiv.append(contentDiv)
      $("#searchResults").append(cardDiv)
    }
  });
})//closes tv click 
//add favorites section.... 
var titleArr = []
if (localStorage.getItem("titles") === null) {
  localStorage.setItem("titles", "[]")
}
function displayFavs() {
  $("#favContent").empty(); // empties out the html
  var titleArr = JSON.parse(localStorage.getItem("titles"));
  // render fav titles 
  for (var i = 0; i < titleArr.length; i++) {
    var favHeader = $("<div>")
    favHeader.addClass("card-header")
    favHeader.text(titleArr[i])
    $("#favContent").append(favHeader)
  }
}
//render existing favs on page when page loads
displayFavs()
//on click of fav button for movies
$(document.body).on("click", ".movieFav", function () {
  event.preventDefault();
  console.log("fav button working")
  //grab title from button attribute
  var title = $(this).attr("title")
  console.log(title)
  // Store the title into localStorage
  localStorage.setItem("title", title);
  titleArr.push(title);
  console.log(titleArr)
  localStorage.setItem("titles", JSON.stringify(titleArr));
  displayFavs()
});
//on click of fav button for tv
$(document.body).on("click", ".tvFav", function () {
  event.preventDefault();
  console.log("fav button working")
  //grab title from button attribute
  var title = $(this).attr("title")
  console.log(title)
  // Store the title into localStorage
  localStorage.setItem("title", title);
  titleArr.push(title);
  console.log(titleArr)
  localStorage.setItem("titles", JSON.stringify(titleArr));
  displayFavs()
});
//on click of fav button for games
$(document.body).on("click", ".gameFav", function () {
  event.preventDefault();
  console.log("fav button working")
  //grab title from button attribute
  var title = $(this).attr("title")
  console.log(title)
  // Store the title into localStorage
  localStorage.setItem("title", title);
  titleArr.push(title);
  console.log(titleArr)
  localStorage.setItem("titles", JSON.stringify(titleArr));
  displayFavs()
});