import mongoose from "mongoose";

const url ='mongodb://localhost:27017/habitTrackerDB';
export const connectUsingMongoose =async()=>{
    try{
        await mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("mongodb connect using mongoose successfully")

    }catch(err){
       console.log(err);
    }
}