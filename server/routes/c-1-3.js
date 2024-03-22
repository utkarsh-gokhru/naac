import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import handleUpload from '../controllers/criteria5.js';

const app = express();
app.use(bodyParser.json());

const upload = multer();

app.post('/save1-3-1', upload.fields([{ name: 'file1_3_1' }]), async (req, res) => {
    handleUpload(req, res, 'criteria13');
});

app.post('/save1-3-2', upload.fields([{ name: 'file1_3_2_1' }, { name: 'file1_3_2_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria13');
});

app.post('/save1-3-3', upload.fields([{ name: 'file1_3_3_1_1' }, { name: 'file1_3_3_1_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria13');
});

app.post('/save1-3-4', upload.fields([{ name: 'file1_3_4_1' }, { name: 'file1_3_4_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria13');
});

export { app as C13 };
