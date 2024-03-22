import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import handleUpload from '../controllers/criteria5.js';

const app = express();
app.use(bodyParser.json());

const upload = multer();

app.post('/save5-3-1', upload.fields([{ name: 'file5_3_1_1' }, { name: 'file5_3_1_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria53');
});

app.post('/save5-3-2', upload.single('file5_3_2'), async (req, res) => {
    handleUpload(req, res, 'criteria53');
});

app.post('/save5-3-3', upload.fields([{ name: 'file5_3_3_1' }, { name: 'file5_3_3_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria53');
});

export { app as C53 };
