
import express from "express";
import UserController from "../controller/userController.js";

// Create an Express Router
const usersRouter = express.Router();
// Create an instance of the UserController class
const userController = new UserController();


// Define routes using different HTTP methods and corresponding controller methods

// Route for displaying the login page
usersRouter.get('/login', userController.loginPage);

// Route for displaying the registration page
usersRouter.get('/register', userController.registerPage);

// Route for handling user registration (POST request)
usersRouter.post('/register', userController.registerUser);


// Route for handling user login (POST request)
usersRouter.post('/login', userController.loginUser);
// Route for handling user logout
usersRouter.get('/logout', userController.logoutUser);
// Export the usersRouter 
export default usersRouter;
