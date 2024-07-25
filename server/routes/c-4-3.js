import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import handleUpload from '../controllers/criteria4.js';

const app = express();
app.use(bodyParser.json());

const upload = multer();

app.post('/save4-3-1', upload.fields([{ name: 'file4_3_1_1' }, { name: 'file4_3_1_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria43');
});

app.post('/save4-3-2', upload.fields([{ name: 'file4_3_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria43');
});

app.post('/save4-3-3', upload.any(), async (req, res) => {
    handleUpload(req, res, 'criteria43');
});

app.post('/save4-3-4', upload.fields([{ name: 'file4_3_4' }]), async (req, res) => {
    handleUpload(req, res, 'criteria43');
});

app.post('/save4-3-5', upload.fields([{ name: 'file4_3_5_1' }, { name: 'file4_3_5_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria43');
});

export { app as C43 };
