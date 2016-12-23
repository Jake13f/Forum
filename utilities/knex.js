var env = {
   local: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'Forums'
   }
}

// The basic knex setup
var knex = require('knex')({
   client: 'mysql',
   connection: env[process.env.NODE_ENV]
});

module.exports = knex;
