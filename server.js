const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Import PostgreSQL library
const { Pool } = require('pg');
const pool = new Pool({
  user: 'vincent',
  host: 'localhost',
  database: 'onlinebookstore',
  password: 'new_password',
  port: 5432,
});

// Retrieve all books along with their corresponding author and category information
app.get('/books', (req, res) => {
  const query = `
    SELECT b.title, a.name AS author, c.name AS category
    FROM books b
    JOIN authors a ON b.author_id = a.id
    JOIN categories c ON b.category_id = c.id;
  `;

  pool.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query', error);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results.rows);
    }
  });
});

// Retrieve all authors who have written books in a specific category
app.get('/authors/:category', (req, res) => {
  const category = req.params.category;
  const query = `
    SELECT DISTINCT a.name
    FROM books b
    JOIN authors a ON b.author_id = a.id
    JOIN categories c ON b.category_id = c.id
    WHERE c.name = 'Fiction';
  `;

  pool.query(query, [category], (error, results) => {
    if (error) {
      console.error('Error executing query', error);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results.rows);
    }
  });
});

// Insert a new book into the database with the necessary author and category references
app.post('/books', (req, res) => {
  const { title, author_id, category_id, price, publication_date } = req.body;
  const query = `
    INSERT INTO books (title, author_id, category_id, price, publication_date)
    VALUES ('New Book', 1, 2, 24.99, '2022-04-01')`;

  pool.query(query, [title, author_id, category_id, price, publication_date], (error, results) => {
    if (error) {
      console.error('Error executing query', error);
      res.status(500).send('Internal Server Error');
    } else {
      res.json({ id: results.rows[0].id });
    }
  });
});

// Update the price of a specific book
app.put('/books/:id', (req, res) => {
  const id = req.params.id;
  const { price } = req.body;
  const query = `
    UPDATE books
    SET price = 29.99
    WHERE id = 1;
  `;

  pool.query(query, [price, id], (error) => {
    if (error) {
      console.error('Error executing query', error);
      res.status(500).send('Internal Server Error');
    } else {
      res.sendStatus(200);
    }
  });
});

// Delete a book from the database
app.delete('/books/:id', (req, res) => {
  const id = req.params.id;
  const query = `
    DELETE FROM books
    WHERE id = 3;
  `;

  pool.query(query, [id], (error) => {
    if (error) {
      console.error('Error executing query', error);
      res.status(500).send('Internal Server Error');
    } else {
      res.sendStatus(200);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
