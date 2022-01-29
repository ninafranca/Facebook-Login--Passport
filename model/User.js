import mongoose from 'mongoose';

const collection = 'usuarios';

const UserSchema = new mongoose.Schema({
    name:String,
    username:String,
    email:String,
    password:String,
    age:Number,
    address:String,
    picture:String
})

export const users =  mongoose.model(collection, UserSchema);