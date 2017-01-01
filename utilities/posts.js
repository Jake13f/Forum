var knex = require('../utilities/knex.js');

// To retrieve the posts and send them back in a callback function to be used
// @param thread - the id of the thread to get the posts from
// @param cb - callback function sending the desired posts.
module.exports.getPosts = (thread, cb) => {
   knex('posts').select('users.username', 'posts.message', 'posts.date_posted')
   .innerJoin('users', 'users.id', 'posts.posted_by')
   .where({ thread_id: thread })
   .catch((error) => { cb(); })
   .then((posts) => { cb(posts); });
}

// To submit the post data to the database
// @param obj - the object data to insert into the database
// @param cb - callback function returning whether the insert was successful or not
module.exports.submitPost = (post, cb) => {
   knex('posts')
   .insert(post)
   .catch((error) => { cb(false); })
   .then(() => { cb(true); });
}
