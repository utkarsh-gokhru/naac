import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import handleUpload from '../controllers/criteria3.js';

const app = express();
app.use(bodyParser.json());

const upload = multer();

app.post('/save3-1-1', upload.fields([{ name: 'file3_1_1' }]), async (req, res) => {
    handleUpload(req, res, 'criteria31');
});

app.post('/save3-1-2', upload.fields([{ name: 'file3_1_2_1' }, { name: 'file3_1_2_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria31');
});

app.post('/save3-1-3', upload.fields([{ name: 'file3_1_3_1' }, { name: 'file3_1_3_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria31');
});

app.post('/save3-1-4', upload.fields([{ name: 'file3_1_4_1' }, { name: 'file3_1_4_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria31');
});

app.post('/save3-1-5', upload.fields([{ name: 'file3_1_5' }]), async (req, res) => {
    handleUpload(req, res, 'criteria31');
});

app.post('/save3-1-6', upload.fields([{ name: 'file3_1_6_1' }, { name: 'file3_1_6_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria31');
});

export { app as C31 };
