$(document).ready(function () {

    /* var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchTerm +
        "&api_key=CeU0Jbw0czD5gfCfxKYQZNqDbTRzgI0G&limit=10&fixed_height=200px&fixed_width=200px" */

    // API Key Test => "http://api.giphy.com/v1/gifs/search?q=video_games&api_key=CeU0Jbw0czD5gfCfxKYQZNqDbTRzgI0G&limit=10"
    // Users search

    var entTerms = ["TV", "Video-Games", "Music", "Videos", "Art"];

    function displayGif() {
        var searchTerm = $("#search").val().trim();

        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchTerm +
            "&api_key=CeU0Jbw0czD5gfCfxKYQZNqDbTRzgI0G&limit=10&tag=entertainment";

        $.ajax({
            url: queryURL,
            method: "GET"
        })

            // Then we are going to display the data on HTML 

            .then(function (response) {
                console.log(response);
                // $("#gif-display").text(JSON.stringify(response.data[0]));
                var giphyData = response.data;

                for (i = 0; i < giphyData.length; i++) {

                    /* uncomment this variable and comment line 34 to have still image load instead, change the variable in line 34 to 'animateImage' if you uncomment this
                    var image = giphyData[i].images.original_still.url;
                    */
                    var image = giphyData[i].images.original.url;

                    console.log(image);

                    var gifDisplay = $("<img>");
                    gifDisplay.attr("src", image);
                    gifDisplay.attr("alt", searchTerm);
                    gifDisplay.attr("data-state", "still");
                    gifDisplay.attr("data-still", image);
                   // gifDisplay.attr("data-animate", animatedImage);
                    gifDisplay.addClass("gif-images");

                    $("#gif-display").prepend(gifDisplay);
                }
            });
    }
    //----------------------------------------------
    function renderButtons() {
        // keeps buttons from duplicating on click
        $("#gif-buttons").empty();

        for (i = 0; i < entTerms.length; i++) {
            var a = $("<button>");

            a.addClass("gifButton");

            a.attr("data-term", entTerms[i]);

            a.text(entTerms[i]);
            console.log(entTerms[i]);

            $("#gif-buttons").append(a);
        }
    }

    // function to grab the animated file when clicked

    /*
    $("#gif-images").on("click", function(){
        var state = $(this).attr("data-state");
        console.log(this);
        if (state === "still") {
            
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        });


    function grabGif() {

        console.log(this);
        var gif = $(this).attr("data-term");
        displayGif(gif);
    }
    */
    $("#search-btn").on("click", function (event) {

        event.preventDefault();

        var search = $("#search").val().trim();
        console.log(entTerms)
        entTerms.push(search);
        renderButtons();
        displayGif();
        $("#search").val('');
    });
    renderButtons();

    // I am trying to run the code when the buttons are pressed to produce GIFs according but will not move. 
   // $(document).on("click", ".gifButton", grabGif);
    

})
