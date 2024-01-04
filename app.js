
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import flash from 'connect-flash';
import session from 'express-session';
import indexRouter from './routes/habit.js';
import usersRouter from './routes/users.js';
import { connectUsingMongoose } from './config/db_config.js';

const app = express();


//-----EJS---------//
app.use(expressLayouts);
app.use("/assets", express.static('./assets'));
app.set('view engine', 'ejs');

//------BodyParser--------//
app.use(express.urlencoded({ extended: false }));

//---------Express Session----------//
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

//---------Connect Flash----------//
app.use(flash());

//---------Global Variables----------//
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//-----Routes---------//
app.use('/', indexRouter);
app.use('/users', usersRouter);

const port = process.env.PORT || 3000;

app.listen(port, async () => {
    console.log("Server is listening at port 3000");
    try {
        await connectUsingMongoose();
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
});