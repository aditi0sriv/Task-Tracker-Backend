import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required:[true, 'Please add your name']
    },

    email: {
        type: String,
        required:[true, 'Please add your email'],
        unique: true,
        immutable: true
    },

    password: {
        type: String,
        required: true
    },

    country: {
        type: String,
        required: true
    }
})


export default mongoose.model('user', userSchema);