$(function() {
   // On click handler for the submit button
   $("#submit").on("click", function () {
      var err = false;
      var options = {
         name: $("#options #name").val()
      };

      // TODO: Validate text
      // Loop over each option and make sure it's not blank
      for (var key in options) { if (options[key] == "") err = true; }

      if (err)
         alertify.error("Please fill in all options before proceeding.");
      else {
         // Create the ajax request for thread creation and handle
         // the request.
         createThread(options, function (thread, error) {
            if (thread)
               alertify.success(JSON.stringify(thread)); // Reload the page
            else // If errors show them
               if (error == 403) // Error code that the user isn't logged in
                  alertify
                     .error("Woops! You need to sign in before posting.");
               else // Show any other errors that occurred.
                  alertify
                     .error("Woops! There was an error posting.");
         });
      }
   });
});
