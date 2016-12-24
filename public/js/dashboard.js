$(function() {
   // ************ //
   // Initial Load //
   // ************ //
   var quill = defaultQuill('#quillInput'); // Initialize Quill text area
   var posts = [];

   // Get posts to display
   getPosts((posts, err) => {
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
   $('#quillArea #submitPost').on('click', () => {
      var length = quill.getLength();
      var text = quill.getText().slice(0,-1); // Remove off the \n at the end of quill text

      if (length > 1 && length <= 1000) {
         // There is data and its in the reasonable range
         submitPost(text, (posts, err) => {
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
