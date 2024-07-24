import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import handleUpload from '../controllers/criteria6.js';

const app = express();
app.use(bodyParser.json());

const upload = multer();

app.post('/save6-3-1', upload.fields([{ name: 'file6_3_1' }]), async (req, res) => {
    handleUpload(req, res, 'criteria63');
});

app.post('/save6-3-2', upload.fields([{ name: 'file6_3_2_1' }, { name: 'file6_3_2_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria63');
});

app.post('/save6-3-3', upload.fields([{ name: 'file6_3_3_1' }, { name: 'file6_3_3_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria63');
});

app.post('/save6-3-4', upload.fields([{ name: 'file6_3_4_1' }, { name: 'file6_3_4_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria63');
});

export { app as C63 };
