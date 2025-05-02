import mongoose from "mongoose";

const taskSchema = mongoose.Schema({

    title: {
        type: String,
        required: [true, 'Please add the main title'],
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ['todo', 'in progress', 'completed'],
        default: 'todo',
    },
    // completionDate: {
    //     type: Date,
    // }

    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
    },
}, {
    timestamps: true
});


export default mongoose.model('Task', taskSchema);