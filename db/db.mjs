// db.mjs
import pg from 'pg';
const { Client } = pg;

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'employee_db',
  password: 'Obi1k3n0bi1!',
  port: 5432,
});

client.connect();

export default client;
