import { Client } from 'pg';

// Database client

const connectionString = `${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@db:${process.env.DB_PORT}/${process.env.POSTGRES_DB}`;

const client = new Client({ connectionString });

// Connect to the database
client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Database connection error:', err));

export default client;