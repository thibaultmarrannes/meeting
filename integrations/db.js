const { Client } = require('pg');

// Database client
const client = new Client({ connectionString: process.env.DATABASE_URL });

// Connect to the database
client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Database connection error:', err));

module.exports = client;