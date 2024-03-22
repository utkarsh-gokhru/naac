import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import handleUpload from '../controllers/criteria1.js';

const app = express();
app.use(bodyParser.json());

const upload = multer();

app.post('/save1-1-1', upload.single('file1_1_1'), async (req, res) => {
    handleUpload(req, res, 'criteria11');
});

app.post('/save1-1-2', upload.fields([{ name: 'file1_1_2_1' }, { name: 'file1_1_2_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria11');
});

app.post('/save1-1-3', upload.fields([{ name: 'file1_1_3_1' }, { name: 'file1_1_3_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria11');
});

export { app as C11 };

