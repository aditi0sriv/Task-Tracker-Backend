import jwt from "jsonwebtoken";
import bcryptjs from 'bcryptjs';
import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";

// path --> /api/users/
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, country } = req.body

    if(!name || !email ) {
        return res.status(400).json({ message: 'Please add all the details'})
    }

    // if user exists
    const userExists = await User.findOne({email})

    if (userExists) {
        return res.status(400).json({ message: 'User already exists'})
    }

    // hash password
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    // create user
    const user = await User.create({
        name,
        email,
        password : hashedPassword,
        country
    })

    // checking if the user has been created
    if(user) {
        return res.status(201).json({
            message: "User created",
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })

        console.log("User details: ", user);        
    } else {
        return res.status(400).json({ message: 'Invalid author data'})
    }
})

// login user
// /api//users/login , POST req
const loginUser = asyncHandler (async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(user && (await bcryptjs.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error ('Invalid credentials')
    }
})


// Generating Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}


export default {
    registerUser,
    loginUser
}