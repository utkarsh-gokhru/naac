import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import handleUpload from '../controllers/criteria4.js';

const app = express();
app.use(bodyParser.json());

const upload = multer();

app.post('/save4-2-1', upload.single('file4_2_1'), async (req, res) => {
    handleUpload(req, res, 'criteria42');
});

app.post('/save4-2-2', upload.fields([{ name: 'file4_2_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria42');
});

app.post('/save4-2-3', upload.fields([{ name: 'file4_2_3_1' }, { name: 'file4_2_3_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria42');
});

app.post('/save4-2-4', upload.fields([{ name: 'file4_2_4' }]), async (req, res) => {
    handleUpload(req, res, 'criteria42');
});

export { app as C42 };
