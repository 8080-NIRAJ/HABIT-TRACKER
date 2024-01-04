//const express = require('express');
import express from 'express';

import {WelcomePage,
    getDashBorad,
    viewWeekdailyUpdate,
    addHabit, 
    favoritesAddRemove, 
    habitCompletion, 
    deletingHabit} from '../controller/habitController.js';


const indexRouter = express.Router();


//---------Welcome Page----------//
indexRouter.get('/',WelcomePage);

//---------Dashboard GET----------//
//var email = "";
indexRouter.get('/dashboard',getDashBorad);

//-------------Handle Change View: Daily <--> Weekly--------------//
indexRouter.post('/user-view', viewWeekdailyUpdate)

//---------Dashboard Add Habit----------//
indexRouter.post('/dashboard', addHabit );

//---------Dashboard Add/Remove Habit to/from Favorites----------//
indexRouter.get("/favorite-habit", favoritesAddRemove);

//-------------Update status of habit completion--------------//
indexRouter.get("/status-update", habitCompletion)

//---------Deleting a habit----------//
indexRouter.get("/remove", deletingHabit);

export default  indexRouter;