var knex = require('../utilities/knex.js');

// To retrieve the posts and send them back in a callback function to be used
// @param cb - callback function sending the desired posts.
module.exports.getThreads = (cb) => {
   knex('threads').select()
   .where('active', '>', 0) // where active
   .catch((error) => { cb(); })
   .then((posts) => { cb(posts); });
}
