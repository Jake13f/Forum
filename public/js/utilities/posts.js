// Gets the posts viewable to a specific user
// @param cb - callback sending back the results of the post
//           - optional: sending a second parameter with true to display an error
function getPosts (cb) {
   $.ajax({
      url: '/posts',
      method: 'POST',
      success: (posts) => { cb(posts); },
      error: () => { cb(null, true); }
   });
}

// Submit a user's message to the database and return the new list of posts
// @param message - the message to be saved
// @param cb - callback sending back the results of the post after adding the new message
//           - optional: sending a second parameter with true to display an error
function submitPost (message, cb) {
   $.ajax({
      url: '/posts/submit',
      method: 'POST',
      data: { message: message },
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

// Takes an array of postings and returns a string with all of the html
// @param array - an array of objects with the post data
// @return html - the html string generated
function markUpPostArray (posts) {
   var html = "";
   posts.forEach((post) => {
      html += markUpPost(post.username, post.message, new Date(post.date_posted));
   });
   return html;
}
