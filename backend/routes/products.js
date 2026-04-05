const express = require('express');
const router = express.Router();
const Item = require('../models/Product');
const mongoose = require('mongoose');

// GET all items
router.get('/', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// GET single item
router.get('/:id', async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.json(item);
});

router.post('/', async (req, res) => {
  try {
    const newItem = new Item(req.body);

    const saved = await newItem.save();

    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create product",
      error: error.message
    });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ validate ObjectId first
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const updated = await Item.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updated);

  } catch (error) {
    res.status(500).json({
      message: "Failed to update item",
      error: error.message
    });
  }
});

// DELETE item
router.delete('/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;