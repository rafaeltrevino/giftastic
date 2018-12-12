$(document).ready(function() {

var adjectives = ["time", "dance", "year", "way", "day", "thing", "world", "life", "hand", "child"];
var rowCount = 1;
var gifCount = 0;

// Remember to add alt text to each GIF (use information inside response object)

function displayCatGifs(catAdj) {

    catAdj = $(this).attr("data-name");  
    var APIkey = "b98xRER1URXt0Nhz68BEVXWnfI43okvO";
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + catAdj + "+black+white" + "&api_key=" + APIkey + "&limit=10"

    $.ajax({
        url: queryURL,
        method: "GET",
        // accept: "image/*",
    }).then(function(response) {

        for (i=0; i < response.data.length; i++) {

            var catGif = $("<div>").addClass("col-md-3");
            var rating = $("<p>").html(response.data[i].rating);
            var img = $("<img>");
            img.attr("src", response.data[i].images.fixed_height_still.url);
            img.attr("data-id", response.data[i].id);
    
            catGif.append(rating, img);

            if (i < 3) {
                var newRow = $("<div>").addClass("row");
                newRow.attr("id", "first");
                $("#displayGifsDiv").append(newRow);
            } else if (i >= 3 && i < 7) {
                var newRow = $("<div>").addClass("row");
                newRow.attr("data-id", "second");
                $("#displayGifsDiv").append(newRow);
                newRow.attr("second").prepend(catGif);
            } else if (i >= 7) {
                var newRow = $("<div>").addClass("row");
                newRow.attr("data-id", "third");
                $("#displayGifsDiv").append(newRow);
                newRow.attr("third").prepend(catGif);
            }
        
        $("#first").prepend(catGif);
        
         }
    
    
    });
    
}


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

// User input
$("#select-catadj").on("click", function(event) {
    event.preventDefault();
    var catAdj = $("#gif-input").val();
    adjectives.push(catAdj);
    renderButtons();
    displayCatGifs(catAdj);
})

// Buttons
$(document).on("click", ".adjective", displayCatGifs);
renderButtons();

}); // End of document ready function