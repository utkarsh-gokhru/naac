import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import handleUpload from '../controllers/criteria2.js';

const app = express();
app.use(bodyParser.json());

const upload = multer();

app.post('/save2-5-1', upload.fields([{ name: 'file2_5_1_1' }, { name: 'file2_5_1_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria25');
});

app.post('/save2-5-2', upload.fields([{ name: 'file2_5_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria25');
});

app.post('/save2-5-3', upload.fields([{ name: 'file2_5_3' }]), async (req, res) => {
    handleUpload(req, res, 'criteria25');
});

app.post('/save2-5-4', upload.fields([{ name: 'file2_5_4_1' }, { name: 'file2_5_4_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria25');
});


export { app as C25 };