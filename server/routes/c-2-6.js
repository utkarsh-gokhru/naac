import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import handleUpload from '../controllers/criteria2.js';

const app = express();
app.use(bodyParser.json());

const upload = multer();

app.post('/save2-6-1', upload.fields([{ name: 'file2_6_1' }]), async (req, res) => {
    handleUpload(req, res, 'criteria26');
});

app.post('/save2-6-2', upload.fields([{ name: 'file2_6_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria26');
});

app.post('/save2-6-3', upload.fields([{ name: 'file2_6_3_2_1' }, { name: 'file2_6_3_2_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria26');
});

export { app as C26 };