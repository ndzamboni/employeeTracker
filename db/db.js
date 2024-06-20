// db.js

const { Client } = require('pg');

const Client = new Client({
    user: 'postgres',
    host: 'localhost',
    // database: 'placeholder',
    // password: 'password',
    port: 5432,
});

Client.connect();

module.exports = Client;


// put in databse and password
// research security for posting to github