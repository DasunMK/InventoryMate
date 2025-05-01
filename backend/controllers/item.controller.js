const Item = require('../models/Item');

// Create a new Item
exports.createItem = async (req, res) => {
  try {
    const { name, manufacturedDate, foodCategory, quantity, expiryDate } = req.body;
    const newItem = new Item({ name, manufacturedDate, foodCategory, quantity, expiryDate });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all Items
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get an Item by ID
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update an Item by ID
exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Update fields if provided in request body
    const { name, manufacturedDate, foodCategory, quantity, expiryDate } = req.body;
    if (name !== undefined) item.name = name;
    if (manufacturedDate !== undefined) item.manufacturedDate = manufacturedDate;
    if (foodCategory !== undefined) item.foodCategory = foodCategory;
    if (quantity !== undefined) item.quantity = quantity;
    if (expiryDate !== undefined) item.expiryDate = expiryDate;

    await item.save();
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an Item by ID
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
