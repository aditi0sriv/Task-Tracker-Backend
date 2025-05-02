import express from 'express';
import users from './user.routes.js';
import tasks from './task.routes.js';
import projects from './project.routes.js';

const router = express.Router();


router.use('/api/users', users);
router.use('/api', tasks);
router.use('/api/projects', projects)

export default router;