// server/routes/tasks.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ date: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

router.post('/', async (req, res) => {
  const newTask = new Task({
    name: req.body.name
  });
  try {
    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: 'Could not save task', error: err.message });
  }
});

module.exports = router;