
import express from "express";
import UserController from "../controller/userController.js";


const usersRouter = express.Router();
const userController = new UserController();

//---------Login Page----------//
usersRouter.get('/login', userController.loginPage);

//---------Register Page----------//
usersRouter.get('/register', userController.registerPage);

//---------Register Handle----------//
usersRouter.post('/register', userController.registerUser);


//---------Login Handle----------//
usersRouter.post('/login', userController.loginUser);
//---------Logout Handle----------//
usersRouter.get('/logout', userController.logoutUser);

export default usersRouter;
