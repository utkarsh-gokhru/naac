import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import handleUpload from '../controllers/criteria2.js';

const app = express();
app.use(bodyParser.json());

const upload = multer();

app.post('/save2-2-1', upload.fields([{ name: 'file2_2_1_1' }]), async (req, res) => {
    handleUpload(req, res, 'criteria22');
});

app.post('/save2-2-2', upload.fields([{ name: 'file2_2_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria22');
});

export { app as C22 };
