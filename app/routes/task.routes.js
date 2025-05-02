import express from 'express';
import taskController from '../controllers/task.controller.js';
import protect from '../middlewares/auth.js';

const router = express.Router();

const { 
    getUserTasks,
    createTask,
    updateTask,
    deleteTask
} = taskController // destructuring


// private routes
router.post('/projects/:projectId/tasks/create', protect, createTask);

router.get('/projects/:projectId/tasks', protect, getUserTasks);

router.put('/projects/:projectId/tasks/:taskId', protect, updateTask);

router.delete('/projects/:projectId/tasks/:taskId', protect, deleteTask);

export default router;