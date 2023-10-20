const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// Create a new to-do item
router.post('/api/todos', todoController.createTodo);

// Get all to-do items
router.get('/api/todos', todoController.getTodos);

// Update a to-do item by ID
router.put('/api/todos/:id', todoController.updateTodo);

// Delete a to-do item by ID
router.delete('/api/todos/:id', todoController.deleteTodo);

// Delete all to-do items
router.delete('/api/todos', todoController.deleteAllTodos);

module.exports = router;
