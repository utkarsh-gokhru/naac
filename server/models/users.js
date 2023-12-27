import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: {type:String, required:true, unique:true},
    password: {type:String, required:true},
});

export const userModel = mongoose.model('naac_users',userSchema);