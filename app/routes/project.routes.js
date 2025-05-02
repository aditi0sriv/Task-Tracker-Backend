import express from 'express';
import projectController from '../controllers/project.controller.js';
import protect from '../middlewares/auth.js';

const router = express.Router();

const { 
    getUserProjects,
    getSingleProject,
    createProject
} = projectController// destructuring APIs object exported from postController.js


// private routes
router.route('/create').post(protect, createProject);
router.route('/').get(protect, getUserProjects);

// GET /api/projects/:projectId
router.get('/:projectId', protect, getSingleProject);





export default router;