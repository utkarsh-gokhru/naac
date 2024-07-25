import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import handleUpload from '../controllers/criteria3.js';

const app = express();
app.use(bodyParser.json());

const upload = multer();

app.post('/save3-7-1', upload.fields([{ name: 'file3_7_1_1' }, { name: 'file3_7_1_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria37');
});

app.post('/save3-7-2', upload.fields([{ name: 'file3_7_2_1' }, { name: 'file3_7_2_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria37');
});

export { app as C37 };
