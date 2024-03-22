import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import handleUpload from '../controllers/criteria1.js';

const app = express();
app.use(bodyParser.json());

const upload = multer();

app.post('/save1-2-1', upload.fields([{ name: 'file1_2_1_1' }, { name: 'file1_2_1_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria12');
});

app.post('/save1-2-2', upload.fields([{ name: 'file1_2_2_1' }, { name: 'file1_2_2_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria12');
});

export { app as C12 };
