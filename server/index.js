import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import { userAuth } from './routes/auth.js';
import { Criteria1_submit } from './routes/criteria1.js';
import { C11 } from './routes/c-1-1.js';
import { C12 } from './routes/c-1-2.js';
import { C13 } from './routes/c-1-3.js';
import { fetchC1 } from './routes/fetchC1.js';
import { Files } from './routes/files.js';

const app = express();

app.use(cors(
    // {
    //     origin: ["naac-frontend-hci2wkv3z-ayan-joshi.vercel.app"],
    //     methods: ["POST", "GET"],
    //     credentials: true
    // }
));
app.use(express.json());
dotenv.config();

const pass = encodeURIComponent(`@Utkarsh123`);
const db_url = `mongodb+srv://utkarsh:${pass}@cluster0.uiwjnnu.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(db_url)
.then(() => {
    console.log('DB connected!');
})
.catch((err) => {
    console.log(`DB conection failed: ${err}`);
})

app.use('/auth', userAuth);
app.use('/data',[Criteria1_submit,C11,C12,C13,fetchC1]);
app.use('/files', Files)

app.listen(5000,() => console.log('Server started'));
