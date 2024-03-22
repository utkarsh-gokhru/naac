import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import handleUpload from '../controllers/criteria2.js';

const app = express();
app.use(bodyParser.json());

const upload = multer();

app.post('/save2-3-1', upload.fields([{ name: 'file2_3_1' }]), async (req, res) => {
    handleUpload(req, res, 'criteria23');
});

app.post('/save2-3-2', upload.fields([{ name: 'file2_3_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria23');
});

app.post('/save2-3-3', upload.fields([{ name: 'file2_3_3' }]), async (req, res) => {
    handleUpload(req, res, 'criteria23');
});

export { app as C23 };
