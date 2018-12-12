$(document).ready(function() {

var adjectives = ["time", "dance", "year", "way", "day", "thing", "world", "life", "hand", "child"];
var state = $(this).attr("data-state");
var rowID = -1;
var images = [];
var catAdj;

function displayCatGifs(catAdj) {

    var APIkey = "b98xRER1URXt0Nhz68BEVXWnfI43okvO";
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + catAdj + "+black+white" + "&api_key=" + APIkey + "&limit=10"

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response) {

        for (i=0; i < response.data.length; i++) {
            var catGif = $("<div>").addClass("col-md-3");
            var rating = $("<p>").html(response.data[i].rating);
            var altText = $(response.data[i].title);
            var img = $("<img>");
            var imgSrc = response.data[i].images.fixed_height_still.url;
            var imgStill = response.data[i].images.fixed_height_still.url;
            var imgAnimate = response.data[i].images.fixed_height.url;
            img.attr("src", imgSrc).attr("alt", altText);
            img.attr("data-id", response.data[i].id);
            img.attr("data-still", imgStill);
            img.attr("data-animate", imgAnimate);
            img.attr("data-state", "still");
            img.addClass("gif");
            catGif.append(rating, img);
            images.push(catGif);
        };

        $("#displayGifsDiv").empty();

        for (i = images.length - 1; i >= 0; i--) {
            if ((i%4)===0) {
                rowID++;
                var rowDiv = $("<div>").addClass("row").attr("id", rowID);
                $("#displayGifsDiv").append(rowDiv);
                rowDiv.prepend(images[i]);
            } else {
                findRow = "#" + rowID;
                $(findRow).prepend(images[i]);
            }
        }
    });
};

// Create buttons
function renderButtons() {
    $("#buttonsDiv").empty();
    for (var i=0; i < adjectives.length; i++) {
        var a = $("<button>");
        a.addClass("adjective");
        a.attr("data-name", adjectives[i]);
        a.text(adjectives[i]);
        $("#buttonsDiv").append(a);
    }
}

// User input and show GIFs
$("#select-catadj").on("click", function(event) {
    event.preventDefault();
    var catAdj = $("#gif-input").val();
    adjectives.push(catAdj);
    renderButtons();
    displayCatGifs(catAdj);
})

// Button click and show GIFs
$(this).on("click", ".adjective", function() {
    var catAdj = $(this).attr("data-name");
    displayCatGifs(catAdj);
});

// Animate and pause on click
$(this).on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    var animatedURL = $(this).attr("data-animate");
    var stillURL = $(this).attr("data-still");
    if (state === "still") {
      $(this).attr("src", animatedURL);
      $(this).attr("data-state", "animated");
    } else if (state === "animated") {
      $(this).attr("src", stillURL);
      $(this).attr("data-state", "still");
    }
});

renderButtons();

}); // End of document ready function