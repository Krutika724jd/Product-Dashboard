const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  sku:      { type: String },
  category: { type: String },
  price:    { type: Number },
  stock:    { type: Number },
  status:   { type: String },
  // description: String,
  // createdAt: { type: Date, default: Date.now }
},{ timestamps: true });

module.exports = mongoose.model('Item', ItemSchema);