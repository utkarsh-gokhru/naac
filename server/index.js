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
const bodyParser = require('body-parser');

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
app.use('/data',[Criteria1_submit,C11,C12,C13,fetchC1]);
app.use('/files', Files)

app.use(bodyParser.urlencoded({ extended: true }));

const apiKey = 'Cg0qMZmO5roGbyI73LhjkuFdUewTzisH'; // Replace with your actual API key
const apiToken = 'z5aelyr3mv6uqg2n0obdip8kc9sx1fjh'; // Replace with your actual API token

app.post('/request-email-otp', async (req, res) => {
  try {
    const response = await axios.post('https://otp.dev/api/verify/', {
      channel: 'email',
      email: req.body.email,
      success_redirect_url: 'http://localhost:3000/success',
      fail_redirect_url: 'http://localhost:3000/fail',
      callback_url: 'http://localhost:3000/callback',
      metadata: '{"order_id":"xfdu48sfdjsdf", "agent_id":2258}',
      captcha: 'true',
      hide: 'true',
      lang: 'ja',
    }, {
      auth: {
        username: apiKey,
        password: apiToken,
      },
    });

    const otpLink = response.data.link;
    res.redirect(otpLink);
  } catch (error) {
    console.error('Error requesting Email OTP:', error.response ? error.response.data : error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/success', (req, res) => {
  res.send('OTP Verification Success');
});

app.get('/fail', (req, res) => {
  res.send('OTP Verification Failed');
});

app.get('/callback', (req, res) => {
  res.send('Callback URL');
});

app.listen(5000,() => console.log('Server started'));
