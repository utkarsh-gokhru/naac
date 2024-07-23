import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import handleUpload from '../controllers/criteria4.js';

const app = express();
app.use(bodyParser.json());

const upload = multer();

app.post('/save4-4-1', upload.fields([{ name: 'file4_4_1_1' }, { name: 'file4_4_1_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria44');
});

app.post('/save4-4-2', upload.fields([{ name: 'file4_4_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria44');
});

export { app as C44 };
