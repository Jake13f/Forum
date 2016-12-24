$(function() {
   var textArea = defaultQuill('#quillInput'); // Initialize Quill text area
   var posts = [];

   // Get posts to display
   getPosts((posts, err) => {
      if (err) { // If errors show them
         alertify
         .logPosition('top right')
         .error("Woops! There was an error loading the forum posts :(");
      } else { // Show the results (posts)
         var html = "";

         posts.forEach((post) => {
            html += markUpPost(post.username, post.message, new Date(post.date_posted));
         });

         $("#posts").html(html);
      }
   });
});
