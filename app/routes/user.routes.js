import express from 'express';
import userController from '../controllers/user.controller.js';
// import protect from '../middlewares/auth.js'

const router = express.Router();

const {
    registerUser,
    loginUser,
} = userController

router.post('/', registerUser);
router.post('/login', loginUser);

export default router