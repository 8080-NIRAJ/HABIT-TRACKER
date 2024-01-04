
import mongoose from "mongoose";
// Define a Mongoose schema for the User entity
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
// Create a Mongoose model for the 'User' 
export const userModel = mongoose.model('user', userSchema);