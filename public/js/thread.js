$(function() {
   // ************ //
   // Initial Load //
   // ************ //
   var quill = defaultQuill('#quillInput'); // Initialize Quill text area

   // ****** //
   // Events //
   // ****** //
   $('#quillArea #submitPost').on('click', function () {
      var length = quill.getLength();
      var text = quill.getText().slice(0,-1); // Remove off the \n at the end of quill text

      if (length > 1 && length <= 1000) {
         // There is data and its in the reasonable range
         submitPost(text, function (success, error) {
            if (success)
               window.location.reload(); // Reload the page
            else // If errors show them
               if (error == 403)
                  alertify
                     .logPosition('top right')
                     .error("Woops! You need to sign in before posting :(");
               else
                  alertify
                     .logPosition('top right')
                     .error("Woops! There was an error posting :(");
         });
      }
   });
});
