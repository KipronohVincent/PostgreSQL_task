const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// Parse JSON bodies
app.use(bodyParser.json());
const { Pool } = require('pg');

// Create a pool to manage database connections
const pool = new Pool({
  user: 'vincent',
  host: 'localhost',
  database: 'onlinebookstore',
  password: 'new_password',
  port: 5432 
});

// Retrieve all books along with their corresponding author and category information
app.get('/books', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(`
      SELECT books.title, authors.name AS author, categories.name AS category
      FROM books
      JOIN authors ON books.author_id = authors.id
      JOIN categories ON books.category_id = categories.id
    `);
    client.release();
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Retrieve all authors who have written books in a specific category
app.get('/authors/Horror', async (req, res) => {
  const category = req.params.category;
  try {
    const client = await pool.connect();
    const result = await client.query(`
      SELECT authors.name
      FROM authors
      JOIN books ON authors.id = books.author_id
      JOIN categories ON books.category_id = categories.id
      WHERE categories.name = $1
    `, [category]);
    client.release();
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Insert a new book into the database
app.post('/books', async (req, res) => {
  const { title, authorId, categoryId, price, publicationDate } = req.body;
  try {
    const client = await pool.connect();
    await client.query(
      'INSERT INTO books (title, author_id, category_id, price, publication_date) VALUES ($1, $2, $3, $4, $5)',
      [title, authorId, categoryId, price, publicationDate]
    );
    client.release();
    res.sendStatus(201);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Update the price of a specific book
app.put('/books/:id', async (req, res) => {
  const id = req.params.id;
  const { price } = req.body;
  try {
    const client = await pool.connect();
    await client.query(
      'UPDATE books SET price = $1 WHERE id = $2',
      [price, id]
    );
    client.release();
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Delete a book from the database
app.delete('/books/8', async (req, res) => {
  const id = req.params.id;
  try {
    const client = await pool.connect();
    await client.query('DELETE FROM books WHERE id = $1', [id]);
    client.release();
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
