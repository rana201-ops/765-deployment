const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, index: true },
  price: Number
});

module.exports = mongoose.model('Book', bookSchema);