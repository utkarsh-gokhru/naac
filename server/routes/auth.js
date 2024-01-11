import express from 'express';
import { userModel } from '../models/users.js';
import generateOTP from '../otp-gen.js';
import mail_sender from '../mail.js';

const app = express();

app.post('/login', async (req,res) => {
    try{
        const {id, password, department} = req.body;
        const user = await userModel.findOne({id, department});
        const email = user.email;
        const generatedOtp = generateOTP();
        if (user){
            if (password === user.password){
                mail_sender(email,generatedOtp);
                return res.status(200).json({message:"Otp Sent",otp:generatedOtp});
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

app.post('/otp', async (req,res) => {
    try{
        const { otp, mailOtp } = req.body;
        if (otp==mailOtp){
            return res.status(201).json({message:"Verification successfull"});
        }
        else{   
            return res.status(409).json({message:"Invalid otp"});
        }
    }catch(error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

export { app as userAuth };
