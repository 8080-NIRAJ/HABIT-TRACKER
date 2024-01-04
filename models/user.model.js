
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    view: {
        type: String,
        default: 'daily'
    }
});

export const userModel = mongoose.model('user', userSchema);