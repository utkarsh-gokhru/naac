import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import handleUpload from '../controllers/criteria3.js';

const app = express();
app.use(bodyParser.json());

const upload = multer();

app.post('/save3-2-1', upload.fields([{ name: 'file3_2_1_1' }, { name: 'file3_2_1_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria32');
});

app.post('/save3-2-2', upload.fields([{ name: 'file3_2_2_1' }, { name: 'file3_2_2_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria32');
});

app.post('/save3-2-3', upload.fields([{ name: 'file3_2_3_1' }, { name: 'file3_2_3_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria32');
});

export { app as C32 };
