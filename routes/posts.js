var express = require('express');
var knex = require('../utilities/knex.js');
var login = require('../utilities/login');

var router = express.Router();

// Returns array of forum posts
router.post('/', login.requireLogin, (req, res, next) => {
   // Select the message and grab the proper user information
   knex('posts').select('users.username', 'posts.message', 'posts.date_posted')
   .innerJoin('users', 'users.id', 'posts.posted_by')
   .catch((error) => { res.status(404).send(); })
   .then((posts) => { res.send(posts); });
});

// Posts the specified post to the database and returns the updated posts
// @param message the message to be posted
// @returns array of posts; if there is a query error sends a 404
router.post('/submit', login.requireLogin, (req, res, next) => {
   var insertObj = {
      posted_by: req.user.id,
      message: req.body.message
   }

   // Select the message and grab the proper user information
   knex('posts')
   .insert(insertObj)
   .catch((error) => { res.status(404).send(); })
   .then(() => {
      // Reload the posts
      knex('posts').select('users.username', 'posts.message', 'posts.date_posted')
      .innerJoin('users', 'users.id', 'posts.posted_by')
      .catch((error) => { res.status(404).send(); })
      .then((posts) => { res.send(posts); });
   });
});

module.exports = router;
