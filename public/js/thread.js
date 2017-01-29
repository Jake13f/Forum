$(function() {
   // ************ //
   // Initial Load //
   // ************ //

   // Options for the thread list
   var listOpts = {
      page: 10,
      plugins: [
         ListPagination({
            innerWindow: 2,
            outerWindow: 2
         })
      ]
   };

   var userList = new List('posts-container', listOpts); // Initialize thread list
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
               if (error == 403) // Error code that the user isn't logged in
                  alertify
                     .logPosition('top right')
                     .error("Woops! You need to sign in before posting :(");
               else // Show any other errors that occurred.
                  alertify
                     .logPosition('top right')
                     .error("Woops! There was an error posting :(");
         });
      }
   });
});
