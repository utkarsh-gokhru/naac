import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import handleUpload from '../controllers/extended-profile.js';

const app = express();
app.use(bodyParser.json());

const upload = multer();

app.post('/save-1', upload.single('file1_1'), async (req, res) => {
    handleUpload(req, res, 'ep1');
});

app.post('/save-2', upload.fields([{ name: 'file2_1' }, { name: 'file2_2' }, { name: 'file2_3' }]), async (req, res) => {
    handleUpload(req, res, 'ep2');
});

app.post('/save-3', upload.fields([{ name: 'file3_1' },{ name: 'file3_2' },{ name: 'file3_3' }]), async (req, res) => {
    handleUpload(req, res, 'ep3');
});

export { app as SaveEP };
