// Import necessary packages and modules
import express from 'express'; // Import Express framework
import expressLayouts from 'express-ejs-layouts'; // Middleware for EJS layouts
import flash from 'connect-flash'; // For displaying flash messages
import session from 'express-session'; // Middleware for managing sessions
import indexRouter from './routes/habit.js'; // Importing routes for habits
import usersRouter from './routes/users.js'; // Importing routes for users
import { connectUsingMongoose } from './config/db_config.js'; // Importing function to connect to MongoDB using Mongoose

// Create an Express application
const app = express();

//-----EJS---------//
app.use(expressLayouts); // Use EJS layouts for views
app.use("/assets", express.static('./assets')); // Serve static files from the 'assets' directory
app.set('view engine', 'ejs'); // Set the view engine to EJS

//------BodyParser--------//
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies (form data)

//---------Express Session----------//
app.use(
    session({
        secret: 'secret', // Secret used to sign the session ID cookie
        resave: true, // Forces the session to be saved back to the session store
        saveUninitialized: true // Forces a session that is "uninitialized" to be saved to the store
    })
);

//---------Connect Flash----------//
app.use(flash()); // Initialize connect-flash to display flash messages

//---------Global Variables----------//
app.use(function (req, res, next) {
    // Middleware to set global variables for flash messages
    res.locals.success_msg = req.flash('success_msg'); // Success messages
    res.locals.error_msg = req.flash('error_msg'); // Error messages
    res.locals.error = req.flash('error'); // General error messages
    next(); // Move to the next middleware/route handler
});

//-----Routes---------//
app.use('/', indexRouter); // Use the 'habit' routes for the root path
app.use('/users', usersRouter); // Use the 'users' routes for the '/users' path

const port = process.env.PORT || 3000; // Define the port to listen on

// Start the server
app.listen(port, async () => {
    console.log("Server is listening at port 3000");

    // Attempt to connect to MongoDB using Mongoose
    try {
        await connectUsingMongoose(); // Call the function to connect to MongoDB
        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("MongoDB connection error:", err); // Log an error if MongoDB connection fails
    }
});