import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import handleUpload from '../controllers/criteria2.js';

const app = express();
app.use(bodyParser.json());

const upload = multer();

app.post('/save2-1-1', upload.fields([{ name: 'file2_1_1_1' }, { name: 'file2_1_1_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria21');
});

app.post('/save2-1-2', upload.fields([{ name: 'file2_1_2_1' }, { name: 'file2_1_2_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria21');
});

export { app as C21 };
