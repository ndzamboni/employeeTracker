// db.mjs
import pg from 'pg';
const { Client } = pg;

const client = new Client({
  user: 'your_username',
  host: 'localhost',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

client.connect();

export default client;
