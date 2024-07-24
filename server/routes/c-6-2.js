import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import handleUpload from '../controllers/criteria6.js';

const app = express();
app.use(bodyParser.json());

const upload = multer();

app.post('/save6-2-1', upload.fields([{ name: 'file6_2_1' }]), async (req, res) => {
    handleUpload(req, res, 'criteria62');
});

app.post('/save6-2-2', upload.fields([{ name: 'file6_2_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria62');
});

app.post('/save6-2-3', upload.fields([{ name: 'file6_2_3_1' }, { name: 'file6_2_3_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria62');
});


export { app as C62 };
