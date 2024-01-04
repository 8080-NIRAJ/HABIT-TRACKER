//const mongoose = require('mongoose');
import mongoose from "mongoose";

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

export const habitModel = mongoose.model('habit', HabitSchema);

