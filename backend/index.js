const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Create connection pool to PostgreSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: true, // Set to true with a valid certificate in production
    },
});

// Test the connection
pool.connect()
    .then(() => console.log('PostgreSQL connected...'))
    .catch(err => console.error('Error connecting to PostgreSQL:', err.stack));

// Get all flashcards
app.get('/flashcards', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM flashcards');
        res.json(result.rows);
    } catch (err) {
        console.error('Error retrieving flashcards:', err.stack);
        res.status(500).send('Server error');
    }
});

// Add a new flashcard
app.post('/flashcards', async (req, res) => {
    const { question, answer } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO flashcards (question, answer) VALUES ($1, $2) RETURNING id',
            [question, answer]
        );
        res.json({ id: result.rows[0].id });
    } catch (err) {
        console.error('Error adding flashcard:', err.stack);
        res.status(500).send('Server error');
    }
});

// Update a flashcard
app.put('/flashcards/:id', async (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;
    try {
        await pool.query(
            'UPDATE flashcards SET question = $1, answer = $2 WHERE id = $3',
            [question, answer, id]
        );
        res.sendStatus(200);
    } catch (err) {
        console.error('Error updating flashcard:', err.stack);
        res.status(500).send('Server error');
    }
});

// Delete a flashcard
app.delete('/flashcards/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM flashcards WHERE id = $1', [id]);
        res.sendStatus(200);
    } catch (err) {
        console.error('Error deleting flashcard:', err.stack);
        res.status(500).send('Server error');
    }
});

app.listen(5000, () => {
    console.log('Server started on port 5000');
});
