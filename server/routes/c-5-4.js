import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import handleUpload from '../controllers/criteria5.js';

const app = express();
app.use(bodyParser.json());

const upload = multer();

app.post('/save5-3-2', upload.single('file5_4_1'), async (req, res) => {
    handleUpload(req, res, 'criteria54');
});

export { app as C54 };
