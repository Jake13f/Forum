var knex = require('../utilities/knex.js');

// To retrieve the posts and send them back in a callback function to be used
// @param cb - callback function sending the desired posts.
module.exports.getThreads = (cb) => {
   knex('threads').select(['threads.id', 'threads.name'])
   .count('* as count')
   .where('active', '>', 0) // where active
   .innerJoin('posts', 'posts.thread_id', 'threads.id')
   .groupBy('threads.name')
   .catch((error) => { cb(); })
   .then((threads) => { cb(threads); });
}
