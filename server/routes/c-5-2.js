import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import handleUpload from '../controllers/criteria5.js';

const app = express();
app.use(bodyParser.json());

const upload = multer();

app.post('/save5-2-1', upload.fields([{ name: 'file5_2_1_1' }, { name: 'file5_2_1_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria52');
});

app.post('/save5-2-2', upload.fields([{ name: 'file5_2_2_1' }, { name: 'file5_2_2_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria52');
});

app.post('/save5-2-3', upload.fields([{ name: 'file5_2_3_1' }, { name: 'file5_2_3_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria52');
});

export { app as C52 };
