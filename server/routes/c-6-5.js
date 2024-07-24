import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import handleUpload from '../controllers/criteria6.js';

const app = express();
app.use(bodyParser.json());

const upload = multer();

app.post('/save6-5-1', upload.fields([{ name: 'file6_5_1' }]), async (req, res) => {
    handleUpload(req, res, 'criteria65');
});

app.post('/save6-5-2', upload.fields([{ name: 'file6_5_2_1' }, { name: 'file6_5_2_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria65');
});

app.post('/save6-5-3', upload.fields([{ name: 'file6_5_3' }]), async (req, res) => {
    handleUpload(req, res, 'criteria65');
});

export { app as C65 };
