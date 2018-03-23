var searchResults = [];
$("#searchButton").on("click", function (event) {
  event.preventDefault()
  $("#searchResults").empty()
  $("#searchResults").html("Loading...")
  if ($("#searchOptions").val() == "tv") {

  }
  if ($("#searchOptions").val() == "movies") {
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
  
  if (searchResults[i].description == null) {
    var imageImg = $("<img>")
    imageImg.addClass("pull-left")
    imageImg.attr("src",searchResults[i].image.original_url)
    imageImg.attr("style","width:20%;height:auto;")
    descriptionP.append(imageImg)
    descriptionP.append(searchResults[i].deck)
  } else {
    descriptionP.html(searchResults[i].description)
  }
  contentDiv.append(descriptionP)

  $("#searchResults").append(contentDiv)

})


//<div class="card" style="width: 18rem;">
//<img class="card-img-top" src="..." alt="Card image cap">
//<div class="card-body">
///    <h5 class="card-title">Card title</h5>
//    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//    <a href="#" class="btn btn-primary">Go somewhere</a>
//</div>
//</div>
