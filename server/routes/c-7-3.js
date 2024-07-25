import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import handleUpload from '../controllers/criteria7.js';

const app = express();
app.use(bodyParser.json());

const upload = multer();

app.post('/save7-3-1', upload.any(), async (req, res) => {
    handleUpload(req, res, 'criteria73');
});

export { app as C73 };
