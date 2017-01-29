var express = require('express');
var knex = require('../utilities/knex.js');
var login = require('../utilities/login');
var posts = require('../utilities/posts');

var router = express.Router();

// Display the thread and its posts
router.get('/:threadID', (req, res, next) => {
   var threadID = req.params.threadID;
   req.session.threadID = parseInt(threadID, 10); // Specified base 10 number system
   posts.getPosts(threadID, (results) => {
      res.render('thread', {
         title: results[0].name,
         posts: results
      });
   });
});

// Posts the specified post to the database and returns the updated posts
// @param message the message to be posted
// @returns array of posts; if there is a query error sends a 404
router.post('/submit', login.AJAXrequireLogin, (req, res, next) => {
   var insertObj = {
      posted_by: req.user.id,
      thread_id: req.session.threadID,
      message: req.body.message
   }

   // Select the message and grab the proper user information
   posts.submitPost(insertObj, (success) => {
      if (success) res.send();
      else res.status(404).send();
   });
});

module.exports = router;
