// Gets the posts viewable to a specific user
// @param cb - callback sending back the results of the post
function getPosts (cb) {
   $.ajax({
      url: '/posts',
      method: 'POST',
      success: (posts) => { cb(posts); },
      error: () => { cb(null, true); }
   });
}

// Uses the markup.js library to easily convert to html
// @param user - the username of the user who originally submitted the post
// @param message - the message posted to display
function markUpPost (user, message, timestamp) {
   var post = {
      from: user,
      message: message,
      date_posted: timestamp
   };

   var template = "<div class='post'><div class='posted-by'>{{from}}</div><div class='message'>{{message}}</div><div class='date-posted'>{{date_posted}}</div></div>";
   return Mark.up(template, post);
}
