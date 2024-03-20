import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import handleUpload from '../controllers/criteria5.js';

const app = express();
app.use(bodyParser.json());

const upload = multer();

app.post('/save5-1-1', upload.fields([{ name: 'file5_1_1_1' }, { name: 'file5_1_1_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria51');
});

app.post('/save5-1-2', upload.fields([{ name: 'file5_1_2_1' }, { name: 'file5_1_2_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria51');
});

app.post('/save5-1-3', upload.fields([{ name: 'file5_1_3_1' }, { name: 'file5_1_3_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria51');
});

app.post('/save5-1-4', upload.single('file5_1_4'), async (req, res) => {
    handleUpload(req, res, 'criteria51');
});

export { app as C51 };
