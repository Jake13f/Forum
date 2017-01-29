var knex = require('../utilities/knex.js');

// To retrieve the posts and send them back in a callback function to be used
// @param thread - the id of the thread to get the posts from
// @param cb - callback function sending the desired posts.
module.exports.getPosts = (thread, cb) => {
   knex('threads').select("users.username", "posts.message", "posts.date_posted", "threads.name")
   .leftJoin('posts', 'posts.thread_id', 'threads.id')
   .leftJoin('users', 'users.id', 'posts.posted_by')
   .where({ "threads.id": thread })
   .catch((error) => { cb(); })
   .then((posts) => { cb(posts); });
};

// To submit the post data to the database
// @param post - the object data to insert into the database
// @param cb - callback function returning whether the insert was successful or not
module.exports.submitPost = (post, cb) => {
   knex('posts')
   .insert(post)
   .catch((error) => { cb(false); })
   .then(() => {
      knex('threads')
      .where("id", post.thread_id)
      .update('last_updated', new Date())
      .then(() => { cb(true); });
   });
};
