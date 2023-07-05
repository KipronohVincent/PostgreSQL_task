-- create Database
CREATE DATABASE onlinebookstore;

-- Create the authors table
CREATE TABLE authors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);

-- Create the categories table
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- Create the books table with foreign key references
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author_id INT NOT NULL,
  category_id INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  publication_date DATE NOT NULL,
  FOREIGN KEY (author_id) REFERENCES authors(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Insert sample authors
INSERT INTO authors (name, email) VALUES
  ('J.K. Rowling', 'jkrowling@example.com'),
  ('George R.R. Martin', 'grrmartin@example.com'),
  ('Stephen King', 'stephenking@example.com');

-- Insert sample categories
INSERT INTO categories (name) VALUES
  ('Fantasy'),
  ('Science Fiction'),
  ('Horror');

-- Insert sample books
INSERT INTO books (title, author_id, category_id, price, publication_date) VALUES
  ('Harry Potter and the Philosopher''s Stone', 1, 1, 19.99, '1997-06-26'),
  ('A Game of Thrones', 2, 1, 24.99, '1996-08-01'),
  ('The Shining', 3, 3, 14.99, '1977-01-28');

-- Retrieve all books along with their corresponding author and category information.
SELECT books.title, authors.name AS author, categories.name AS category
FROM books
JOIN authors ON books.author_id = authors.id
JOIN categories ON books.category_id = categories.id;

-- Retrieve all authors who have written books in a specific category. (Let's assume the category name is 'Fantasy'.)
SELECT authors.name
FROM authors
JOIN books ON authors.id = books.author_id
JOIN categories ON books.category_id = categories.id
WHERE categories.name = 'Fantasy';

--  Insert a new book into the database with the necessary author and category references. 
INSERT INTO books (title, author_id, category_id, price, publication_date)
VALUES ('exel', 1, 3, 9.99, '2023-07-01');

--  Update the price of a specific book. 
UPDATE books
SET price = 23.4
WHERE id = 3;

-- Delete a book from the database. 
DELETE FROM books
WHERE id = 8;
