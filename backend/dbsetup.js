const { Client } = require('pg');
require('dotenv').config();

// Initialize PostgreSQL client using the connection string from environment variables
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: true, // Set to true with a valid certificate in production
    },
});

client.connect()
    .then(() => {
        console.log("Connection established");

        // SQL command to create the flashcards table
        const createTableQuery = `
        CREATE TABLE IF NOT EXISTS flashcards (
            id SERIAL PRIMARY KEY,
            question TEXT NOT NULL,
            answer TEXT NOT NULL
        );
        `;

        // Execute the query to create the table
        return client.query(createTableQuery);
    })
    .then(() => {
        console.log('Table "flashcards" created successfully');
    })
    .catch((err) => {
        console.error('Error executing query or connecting to PostgreSQL:', err.stack);
    })
    .finally(() => {
        client.end(); // Close the connection
    });
