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
import { C31 } from './routes/c-3-1.js';
import { C32 } from './routes/c-3-2.js';
import { C33 } from './routes/c-3-3.js';
import { C35 } from './routes/c-3-5.js';
import { C36 } from './routes/c-3-6.js';
import { C37 } from './routes/c-3-7.js';
import { Criteria3_submit } from './routes/criteria3.js';

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

const db_url = process.env.DATABASE_URL;
mongoose.connect(db_url)
.then(() => {
    console.log('DB connected!');
})
.catch((err) => {
    console.log(`DB conection failed: ${err}`);
})

app.use('/auth', userAuth);
app.use('/data',[Criteria1_submit,C11,C12,C13,fetchC1,C31,C32,C33,C35,C36,C37,Criteria3_submit]);
app.use('/files', Files)

app.listen(5000,() => console.log('Server started'));
