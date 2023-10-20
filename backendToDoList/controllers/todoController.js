const Todo = require('../models/todo');

// Create a new to-do item
exports.createTodo = async (req, res) => {
    try {
        const { name } = req.body;
        const newTodo = new Todo({ name });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(500).json({ error: 'Error creating a to-do item' });
    }
};

// Get all to-do items
exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching to-do items' });
    }
};

// Update a to-do item by ID
exports.updateTodo = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        console.log('Updating item with id:', id);
        console.log('Received data:', req.body);
        const updatedTodo = await Todo.findByIdAndUpdate(id, { name }, { new: true });
        res.status(200).json(updatedTodo);
    } catch (err) {
        res.status(500).json({ error: 'Error updating a to-do item', details: err.message });
    }
};

// Delete a to-do item by ID
exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        await Todo.findByIdAndDelete(id);
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ error: 'Error deleting a to-do item' });
    }
};

// Delete all to-do items
exports.deleteAllTodos = async (req, res) => {
    try {
        await Todo.deleteMany({});
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ error: 'Error deleting all to-do items' });
    }
};
