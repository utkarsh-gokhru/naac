import express from 'express';
import { userModel } from '../models/users.js';

const app = express();

app.post('/login', async (req,res) => {
    try{
        const {id, password} = req.body;
        const user = await userModel.findOne({id});
        if (user){
            if (password === user.password){
                return res.status(200).json({message:"Login successfull"});
            }
            else{
                return res.status(401).json({message:"Invalid Password"});
            }
        }
        else{
            return res.status(404).json({message:"User not found"});
        }
    }
    catch(error){
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

export { app as userAuth };
