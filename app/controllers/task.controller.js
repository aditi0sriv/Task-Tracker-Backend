import asyncHandler from "express-async-handler";
import Project from '../models/project.model.js';
import Task from '../models/task.model.js';
// import User from '../models/user.model.js';

// // GET User Tasks, using GET req
const getUserTasks = asyncHandler(async (req, res) => {
    const { projectId } = req.params;

    const tasks = await Task.find({ project: projectId })
        .populate({
            path: 'project',
            match: { user: req.user.id }, // Ensure project belongs to this user
        });

    // Filter out tasks where project was not matched (i.e. user doesn't own the project)
    const userTasks = tasks.filter(task => task.project !== null);

    res.status(200).json({
        count: userTasks.length,
        tasks: userTasks,
    });
});

// api/tasks/create
const createTask = asyncHandler(async (req, res) => {
    const { title, description, status } = req.body;
    const { projectId } = req.params;

    if (!title || !description || !status) {
        res.status(400);
        throw new Error('All fields are required: title, description, status');
    }

    // Validate project
    const project = await Project.findOne({ _id: projectId, user: req.user.id });
    if (!project) {
        res.status(404);
        throw new Error('Project not found or unauthorized');
    }

    const task = await Task.create({
        title,
        description,
        status,
        project: projectId,
    });

    res.status(201).json({
        message: 'Task created successfully',
        task,
    });
});

const updateTask = asyncHandler(async (req, res) => {
    const { projectId, taskId } = req.params;
    const { title, description, status } = req.body;

    // Check if project belongs to user
    const project = await Project.findOne({ _id: projectId, user: req.user.id });
    if (!project) {
        res.status(404);
        throw new Error('Project not found or unauthorized');
    }

    // Find task under this project
    const task = await Task.findOne({ _id: taskId, project: projectId });
    if (!task) {
        res.status(404);
        throw new Error('Task not found');
    }

    // Update fields if provided
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;

    const updatedTask = await task.save();

    res.status(200).json({
        message: 'Task updated successfully',
        task: updatedTask,
    });
});

const deleteTask = asyncHandler(async (req, res) => {
    const { projectId, taskId } = req.params;

    const project = await Project.findOne({ _id: projectId, user: req.user.id });
    if (!project) {
        res.status(404);
        throw new Error('Project not found or unauthorized');
    }

    const task = await Task.findOneAndDelete({ _id: taskId, project: projectId });
    if (!task) {
        res.status(404);
        throw new Error('Task not found or already deleted');
    }

    res.status(200).json({
        message: 'Task deleted successfully',
        taskId: task._id,
    });
});


export default {
    getUserTasks,
    createTask,
    updateTask,
    deleteTask
}