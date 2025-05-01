const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item.controller');

// Create a new Item
router.post('/', itemController.createItem);

// Retrieve all Items
router.get('/', itemController.getItems);

// Retrieve a single Item by ID
router.get('/:id', itemController.getItemById);

// Update an Item by ID
router.put('/:id', itemController.updateItem);

// Delete an Item by ID
router.delete('/:id', itemController.deleteItem);

module.exports = router;
