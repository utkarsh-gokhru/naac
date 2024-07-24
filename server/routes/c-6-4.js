import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import handleUpload from '../controllers/criteria6.js';

const app = express();
app.use(bodyParser.json());

const upload = multer();

app.post('/save6-4-1', upload.fields([{ name: 'file6_4_1' }]), async (req, res) => {
    handleUpload(req, res, 'criteria64');
});

app.post('/save6-4-2', upload.fields([{ name: 'file6_4_2_1' }, { name: 'file6_4_2_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria64');
});

app.post('/save6-4-3', upload.fields([{ name: 'file6_4_3_1' }, { name: 'file6_4_3_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria64');
});

app.post('/save6-4-4', upload.fields([{ name: 'file6_4_4' }]), async (req, res) => {
    handleUpload(req, res, 'criteria64');
});

export { app as C64 };
