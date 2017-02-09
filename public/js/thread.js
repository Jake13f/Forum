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
      var text = '';
      var length = quill.getLength();
      var htmlArr = [];
      var deltas = quill.getContents().ops;


      if (length > 1 && length <= 1000) {
         // Build up the html array with proper html
         deltas.forEach(function (delta, index) {
            // Add code block style
            if (index > 0 && delta.attributes && delta.attributes['code-block']) htmlArr[index - 1] = "<code>"+htmlArr[index - 1]+"</code>";

            htmlArr.push(deltaHtml(delta));
         });

         text = htmlArr.join('').slice(0,-1); // Convert to string and remove last \n
         text = combineCodeTags(text);

         // There is text and its in the reasonable length
         submitPost(text, function (success, error) {
            if (success)
               window.location.reload(); // Reload the page
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
