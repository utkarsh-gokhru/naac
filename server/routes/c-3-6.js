import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import handleUpload from '../controllers/criteria3.js';

const app = express();
app.use(bodyParser.json());

const upload = multer();

app.post('/save3-6-1', upload.fields([{ name: 'file3_6_1' }]), async (req, res) => {
    handleUpload(req, res, 'criteria36');
});

app.post('/save3-6-2', upload.fields([{ name: 'file3_6_2_1' }, { name: 'file3_6_2_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria36');
});

app.post('/save3-6-3', upload.fields([{ name: 'file3_6_3_1' }, { name: 'file3_6_3_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria36');
});

app.post('/save3-6-4', upload.fields([{ name: 'file3_6_4_1' }, { name: 'file3_6_4_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria36');
});

export { app as C36 };
