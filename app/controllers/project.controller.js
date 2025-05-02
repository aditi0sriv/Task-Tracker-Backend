import asyncHandler from 'express-async-handler';
import Project from '../models/project.model.js';


// GET /api/projects/
const getUserProjects = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const projects = await Project.find({ user: userId });

    res.status(200).json({
        count: projects.length,
        projects,
    });
});

// controllers/project.controller.js
export const getSingleProject = asyncHandler(async (req, res) => {
    const { projectId } = req.params;
  
    const project = await Project.findOne({ _id: projectId, user: req.user.id });
    if (!project) {
      res.status(404);
      throw new Error('Project not found or unauthorized');
    }
  
    res.status(200).json({ project });
  });


// POST /api/projects/create
const createProject = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { name, description } = req.body;

    if (!name) {
        res.status(400);
        throw new Error('Project name is required');
    }

    // Check if the user already has 4 projects
    const existingProjectsCount = await Project.countDocuments({ user: userId });

    // Example in project.controller.js
    if (existingProjectsCount >= 4) {
        return res.status(400).json({ message: 'You can only create up to 4 projects.' });
    }


    const project = await Project.create({
        name,
        description,
        user: userId,
    });

    res.status(201).json({
        message: 'Project created successfully',
        project,
    });
});

export default {
    getUserProjects,
    getSingleProject,
    createProject
};
