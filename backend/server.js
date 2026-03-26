const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ CORS FIX (IMPORTANT)
app.use(cors({
  origin: "*",   // allow all (easy fix)
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());

// DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

// routes
const Book = require("./models/Book");

// GET books
app.get("/books", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// POST book
app.post("/books", async (req, res) => {
  const newBook = new Book(req.body);
  await newBook.save();
  res.json(newBook);
});

app.listen(5000, () => console.log("Server running"));