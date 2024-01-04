import {userModel} from '../models/user.model.js';
import {habitModel} from '../models/habit.model.js';
import getDay from '../assets/week.js';

var email = "";

// Controller function to retrieve and render the dashboard
export const WelcomePage=async(req,res)=>{
        res.render('welcomePage')
    }
   
export const getDashBorad=async(req,res)=>{
      
        try {
             email = req.query.user;
            const user = await userModel.findOne({ email: email });

            if (!user) {
                return res.status(404).send('User not found');
            }

            const userHabit = await habitModel.find({ email: email });
            var weekday = [];
            weekday.push(getDay(0));
            weekday.push(getDay(1));
            weekday.push(getDay(2));
            weekday.push(getDay(3));
            weekday.push(getDay(4));
            weekday.push(getDay(5));
            weekday.push(getDay(6));
            res.render('dashboard', { userHabit, user, weekday });

        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
}

export const viewWeekdailyUpdate= async(req,res)=>{
    try{
    const user = await userModel.findOne({email});
    if (user) {
        user.view = user.view === 'dailyView' ? 'WeeklyView' : 'dailyView';
        await user.save();
        return res.redirect('back');
    } else {
        throw new Error('User not found');
    }
    }catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}
export const addHabit= async(req,res)=>{
    try {
        const { content } = req.body;
        //const email = req.user.email;

        const existingHabit = await habitModel.findOne({ content: content, email: email });

        if (existingHabit) {
            let dates = existingHabit.dates;
            const tzoffset = (new Date()).getTimezoneOffset() * 60000;
            const today = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 10);

            const existingDate = dates.find(item => item.date === today);

            if (existingDate) {
                console.log("Habit exists!");
                req.flash('error_msg', 'Habit already exists!');
                return res.redirect('back');
            } else {
                dates.push({ date: today, complete: 'none' });
                existingHabit.dates = dates;
                await existingHabit.save();
                console.log(existingHabit);
                return res.redirect('back');
            }
        } else {
            let dates = [];
            const tzoffset = (new Date()).getTimezoneOffset() * 60000;
            const localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 10);
            dates.push({ date: localISOTime, complete: 'none' });

            const newHabit = new habitModel({
                content,
                email,
                dates
            });

            await newHabit.save();
            console.log(newHabit);
            return res.redirect('back');
        }
    }catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

export const favoritesAddRemove =async(req,res)=>{
    try {
        const id = req.query.id;
        const habit = await habitModel.findOne({
            _id: id,
            email:email
        });

        if (habit) {
            habit.favorite = !habit.favorite;
            await habit.save();

            req.flash(
                'success_msg',
                habit.favorite ? 'Habit added to Favorites!' : 'Habit removed from Favorites!'
            );
            return res.redirect('back');
        } else {
            return res.status(404).send('Habit not found');
        }
    } catch (err) {
        console.error("Error adding to favorites:", err);
        res.status(500).send('Server Error');
    }
}

export const habitCompletion = async(req,res)=>{
    try {
        const day = req.query.date;
        const id = req.query.id;
        const habit = await habitModel.findById(id);

        if (!habit) {
            return res.status(404).send('Habit not found');
        }

        let dates = habit.dates;
        let found = false;

        dates.forEach((item) => {
            if (item.date === day) {
                switch (item.complete) {
                    case 'yes':
                        item.complete = 'no';
                        break;
                    case 'no':
                        item.complete = 'none';
                        break;
                    case 'none':
                        item.complete = 'yes';
                        break;
                    default:
                        break;
                }
                found = true;
            }
        });

        if (!found) {
            dates.push({ date: day, complete: 'yes' });
        }

        habit.dates = dates;
        await habit.save();

        res.redirect('back');
    } catch (err) {
        console.error("Error updating status:", err);
        res.status(500).send('Server Error');
    }
}

export const deletingHabit = async(req,res)=>{
    try {
        const id = req.query.id;
        const deletedHabit = await habitModel.deleteMany({ _id: id, email });

        if (deletedHabit.deletedCount === 0) {
            console.log("No records were deleted.");
        } else {
            req.flash('success_msg', 'Record(s) deleted successfully!');
        }
        
        res.redirect('back');
    } catch (err) {
        console.error("Error in deleting record(s):", err);
        res.status(500).send('Server Error');
    }
}



    
