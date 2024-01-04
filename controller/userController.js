import {userModel} from '../models/user.model.js';


export default class UserController{
    // Method to render the login page
    async loginPage(req,res){
        res.render('loginPage');
    }
    // Method to render the registration page
    async registerPage(req,res){
        res.render('registerPage')
    }
    // Method to register a new user
    async registerUser(req,res){
        const { name, email } = req.body;

    // Checking for errors
    let errors = [];

    if (!name || !email) {
        errors.push({ msg: 'Enter all required fields' });
    }

    if (errors.length > 0) {
        res.render('registerPage', {
            errors,
            name,
            email
        });
    } else {
        try {
            const user = await userModel.findOne({ email: email });

            if (user) {
                errors.push({ msg: 'Your Email ID already exists' });
                res.render('registerPage', {
                    errors,
                    name,
                    email
                });
            } else {
                const newUser = new userModel({
                    name,
                    email
                });

                await newUser.save();
                req.flash('successMassage', 'Your Account is creadted');
                res.redirect('/users/login');
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    }
    }
    // Method to log in a user
    async loginUser(req,res){
        const { email } = req.body;
        
    try {
        
        const user = await userModel.findOne({ email: email });
        //console.log("user :"+ user)
        if (!user) {
            let errors = [{ msg: 'Your emailID is not registered ' }];
            res.render('loginPage', {
                errors,
                email
            });
        } else {
            //console.log(user.email);
            res.redirect(`/dashboard?user=${user.email}`);
        }


    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
  }
    // Method to log out a user
    async logoutUser(req,res){
        req.flash('successMassage', 'logged out successfully');
        res.redirect('/users/login');
    }
}