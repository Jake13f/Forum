$(function() {
   // ************ //
   // Initial Load //
   // ************ //
   var quill = defaultQuill('#quillInput'); // Initialize Quill text area
   var posts = [];

   // Get posts to display
   getPosts(function (posts, err) {
      if (err) { // If errors show them
         alertify
         .logPosition('top right')
         .error("Woops! There was an error loading the forum posts :(");
      } else { // Show the results (posts)
         $("#posts").html(markUpPostArray(posts));
      }
   });

   // ****** //
   // Events //
   // ****** //
   $('#quillArea #submitPost').on('click', function () {
      var length = quill.getLength();
      var text = quill.getText().slice(0,-1); // Remove off the \n at the end of quill text

      if (length > 1 && length <= 1000) {
         // There is data and its in the reasonable range
         submitPost(text, function (posts, err) {
            if (err) { // If errors show them
               alertify
               .logPosition('top right')
               .error("Woops! There was an error loading the forum posts :(");
            } else { // Show the results (posts)
               $("#posts").html(markUpPostArray(posts));
            }
         });
      }
   });
});
