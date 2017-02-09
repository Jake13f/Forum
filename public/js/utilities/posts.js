// Combine code tags from quill to properly display
// </code>\n\n<code> replacing them with nothing so the second tag closing
// will close the entirety
// @param markup - the string containing the html markup
// @param return - a string with the combined code tags
function combineCodeTags (markup) {
   return markup.replace(/<\/code>(\n+)<code>/g, '$1');
}

// Convert a delta markup object to markup
// @param delta - the delta object
// @return - a string with markup html
function deltaHtml (delta) {
   if (!delta.attributes) return delta.insert; // Return if no formatting
   if (delta.attributes.bold) delta.insert = '<b>' + delta.insert + '</b>';
   if (delta.attributes.italic) delta.insert = '<em>' + delta.insert + '</em>';
   if (delta.attributes.underline) delta.insert = '<u>' + delta.insert + '</u>';
   return delta.insert;
}

// Submit a user's message to the database and return the new list of posts
// @param message - the message to be saved
// @param cb - callback sending back the results of the post after adding the new message
function submitPost (message, cb) {
   $.ajax({
      url: '/thread/submit',
      method: 'POST',
      data: { message: message },
      success: function (posts) { cb(true); },
      error: function (x, status, error) { cb(false, x.status); }
   });
}
