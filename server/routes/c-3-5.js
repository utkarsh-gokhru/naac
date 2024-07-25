import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import handleUpload from '../controllers/criteria3.js';

const app = express();
app.use(bodyParser.json());

const upload = multer();

app.post('/save3-5-1', upload.fields([{ name: 'file3_5_1' }]), async (req, res) => {
    handleUpload(req, res, 'criteria35');
});

app.post('/save3-5-2', upload.fields([{ name: 'file3_5_2_1' }, { name: 'file3_5_2_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria35');
});

export { app as C35 };
