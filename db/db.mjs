import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const db = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

db.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Connection error', err.stack));

export default db;
