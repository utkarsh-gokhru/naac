import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import handleUpload from '../controllers/criteria4.js';

const app = express();
app.use(bodyParser.json());

const upload = multer();

app.post('/save4-1-1', upload.single('file4_1_1'), async (req, res) => {
    handleUpload(req, res, 'criteria41');
});

app.post('/save4-1-2', upload.fields([{ name: 'file4_1_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria41');
});

app.post('/save4-1-3', upload.fields([{ name: 'file4_1_3' }]), async (req, res) => {
    handleUpload(req, res, 'criteria41');
});

app.post('/save4-1-4', upload.fields([{ name: 'file4_1_4_1' }, { name: 'file4_1_4_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria41');
});

export { app as C41 };
