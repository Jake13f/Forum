var env = {
   local: {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '',
      database: 'forums'
   }
}

// The basic knex setup
var knex = require('knex')({
   client: 'mysql',
   connection: env.local
});

module.exports = knex;
