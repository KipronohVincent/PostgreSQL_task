-- create Database
CREATE DATABASE onlinebookstore;

-- Create tables
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE authors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author_id INTEGER NOT NULL REFERENCES authors(id),
  category_id INTEGER NOT NULL REFERENCES categories(id),
  price DECIMAL(10, 2) NOT NULL,
  publication_date DATE NOT NULL
);

-- Insert sample data
INSERT INTO categories (name) VALUES
  ('Fiction'),
  ('Non-Fiction');

INSERT INTO authors (name, email) VALUES
  ('Author 1', 'author1@example.com'),
  ('Author 2', 'author2@example.com'),
  ('Author 3', 'author3@example.com');

INSERT INTO books (title, author_id, category_id, price, publication_date) VALUES
  ('Book 1', 1, 1, 19.99, '2022-01-01'),
  ('Book 2', 2, 1, 14.99, '2022-02-01'),
  ('Book 3', 3, 2, 9.99, '2022-03-01');

-- SQL queries
-- Retrieve all books along with their corresponding author and category information.
SELECT b.title, a.name AS author, c.name AS category
FROM books b
JOIN authors a ON b.author_id = a.id
JOIN categories c ON b.category_id = c.id;

-- Retrieve all authors who have written books in a specific category.
SELECT DISTINCT a.name
FROM books b
JOIN authors a ON b.author_id = a.id
JOIN categories c ON b.category_id = c.id
WHERE c.name = 'Fiction';

-- Insert a new book into the database with the necessary author and category references.
INSERT INTO books (title, author_id, category_id, price, publication_date)
VALUES ('New Book', 1, 2, 24.99, '2022-04-01');

-- Update the price of a specific book.
UPDATE books
SET price = 29.99
WHERE id = 1;

-- Delete a book from the database.
DELETE FROM books
WHERE id = 3;
