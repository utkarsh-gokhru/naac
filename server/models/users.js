import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    department: {type:String, required:true, unique:true},
    email: {type:String, required:true, unique:true}
});

export const userModel = mongoose.model('naac_users',userSchema);
