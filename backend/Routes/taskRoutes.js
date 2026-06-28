const express = require('express');
const { body } = require('express-validator');
const taskController = require('../controllers/taskController');

const router = express.Router();

// Validation middleware for creating/updating tasks
const validateTask = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 3 }).withMessage('Title must be at least 3 characters long')
    .isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters'),
  body('description')
    .trim()
    .optional()
    .isLength({ max: 300 }).withMessage('Description cannot exceed 300 characters'),
  body('status')
    .optional()
    .isIn(['Pending', 'In Progress', 'Completed']).withMessage('Invalid status'),
  body('priority')
    .optional()
    .isIn(['Low', 'Medium', 'High']).withMessage('Invalid priority'),
  body('dueDate')
    .optional()
    .isISO8601().withMessage('Invalid date format')
];

// Routes
router.get('/tasks', taskController.getAllTasks);
router.get('/tasks/:id', taskController.getTaskById);
router.post('/tasks', validateTask, taskController.createTask);
router.put('/tasks/:id', validateTask, taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;
