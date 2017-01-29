var knex = require('../utilities/knex.js');

// To create a thread within the database and return the new id of the entry
// @param thread - an object containing the thread fields to be added to the db
// @param cb - callback function sending the success of the insert and the id of the inserted thread
module.exports.createThread = (thread, cb) => {
   knex('threads')
   .insert(thread)
   .returning("id")
   .catch((error) => { cb(false); })
   .then((id) => { cb(true, id); });
};

// To retrieve the posts and send them back in a callback function to be used
// @param cb - callback function sending the desired posts.
module.exports.getThreads = (cb) => {
   knex('threads').select(['threads.id', 'threads.name'])
   .count('posts.id as count')
   .where('active', '>', 0) // where active
   .leftJoin('posts', 'posts.thread_id', 'threads.id') // Grabs all of the threads even if there aren't any posts
   .groupBy('threads.name')
   .catch((error) => { cb(); })
   .then((threads) => { cb(threads); });
};
