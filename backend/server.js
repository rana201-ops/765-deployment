require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Book = require('./models/Book');

const app = express();

// Middleware
app.use(cors({
  origin: "*"
}));
app.use(express.json());

// DB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ DB Connected"))
  .catch(err => console.log("❌ DB Error:", err));

// Routes

// Test route
app.get('/', (req, res) => {
  res.send("API Running 🚀");
});

// GET all books
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADD new book
app.post('/books', async (req, res) => {
  try {
    const { title, price } = req.body;

    const newBook = new Book({ title, price });
    await newBook.save();

    res.json(newBook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});