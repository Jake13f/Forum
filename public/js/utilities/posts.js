// Submit a user's message to the database and return the new list of posts
// @param message - the message to be saved
// @param cb - callback sending back the results of the post after adding the new message
function submitPost (message, cb) {
   $.ajax({
      url: '/thread/submit',
      method: 'POST',
      data: { message: message },
      success: function (posts) { cb(true); },
      error: function () { cb(false); }
   });
}
