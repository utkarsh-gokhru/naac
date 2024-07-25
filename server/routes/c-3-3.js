import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import handleUpload from '../controllers/criteria3.js';

const app = express();
app.use(bodyParser.json());

const upload = multer();

app.post('/save3-3-1', upload.fields([{ name: 'file3_3_1' }]), async (req, res) => {
    handleUpload(req, res, 'criteria33');
});

app.post('/save3-3-2', upload.fields([{ name: 'file3_3_2_1' }, { name: 'file3_3_2_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria33');
});

app.post('/save3-3-3', upload.fields([{ name: 'file3_3_3_1' }, { name: 'file3_3_3_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria33');
});

export { app as C33 };
