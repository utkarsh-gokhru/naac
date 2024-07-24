import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import handleUpload from '../controllers/criteria6.js';

const app = express();
app.use(bodyParser.json());

const upload = multer();

app.post('/save6-1-1', upload.fields([{ name: 'file6_1_1' }]), async (req, res) => {
    handleUpload(req, res, 'criteria61');
});

app.post('/save6-1-2', upload.fields([{ name: 'file6_1_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria61');
});

export { app as C61 };
