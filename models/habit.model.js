//const mongoose = require('mongoose');
import mongoose from "mongoose";
// Define a Mongoose schema for the Habit entity
const HabitSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dates: [{
        date: String,
        complete: String
    }],
    favorite: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
// Create a Mongoose model for the 'habit' 
export const habitModel = mongoose.model('habit', HabitSchema);

