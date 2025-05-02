import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/user.model.js';


const protect = asyncHandler(async (req, res, next) => {
    let token 

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // exctracting token from 'Bearer token' for verification
            token = req.headers.authorization.split(' ')[1] //[1] giving back only the token 

            // verifying token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // getting user from the token, except the hashed password
            req.user = await User.findById(decoded.id).select('-password')

            next() //calling the next middleware
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not Authorised')
        }
    } 

    if(!token) {
        res.status(401)
        throw new Error('Imposter!!! (no token)')
    }
})

// bearer token split 

export default protect