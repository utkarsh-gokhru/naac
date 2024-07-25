import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import handleUpload from '../controllers/criteria2.js';

const app = express();
app.use(bodyParser.json());

const upload = multer();

app.post('/save2-4-1', upload.fields([{ name: 'file2_4_1_1' }, { name: 'file2_4_1_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria24');
});

app.post('/save2-4-2', upload.fields([{ name: 'file2_4_2_1' }, { name: 'file2_4_2_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria24');
});

app.post('/save2-4-3', upload.fields([{ name: 'file2_4_3_1' }, { name: 'file2_4_3_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria24');
});

app.post('/save2-4-4', upload.fields([{ name: 'file2_4_4_1' }, { name: 'file2_4_4_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria24');
});

export { app as C24 };