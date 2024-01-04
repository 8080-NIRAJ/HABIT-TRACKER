
import express from 'express';

import {WelcomePage,
    getDashBorad,
    viewWeekdailyUpdate,
    addHabit, 
    favoritesAddRemove, 
    habitCompletion, 
    deletingHabit} from '../controller/habitController.js';

// Create an Express Router
const indexRouter = express.Router();

// Define routes using different HTTP methods and corresponding controller methods
// Route for the welcome page
indexRouter.get('/',WelcomePage);

// Route for displaying the dashboard
indexRouter.get('/dashboard',getDashBorad);

// Route for viewing weekly daily updates (POST request)
indexRouter.post('/user-view', viewWeekdailyUpdate)

// Route for adding a habit (POST request)
indexRouter.post('/dashboard', addHabit );

// Route for adding or removing a habit from favorites
indexRouter.get("/favorite-habit", favoritesAddRemove);

// Route for marking habit completion status
indexRouter.get("/status-update", habitCompletion)

// Route for deleting a habit
indexRouter.get("/remove", deletingHabit);

// Export the indexRouter 
export default  indexRouter;