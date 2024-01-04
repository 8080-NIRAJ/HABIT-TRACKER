import mongoose from "mongoose";

const url ='mongodb://localhost:27017/habitTrackerDB';
export const connectUsingMongoose =async()=>{
    try{
        await mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
       

    }catch(err){
       console.log(err);
    }
}