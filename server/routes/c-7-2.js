import express from 'express';
import bodyParser from 'body-parser';
import handleUpload from '../controllers/criteria7.js';
import multer from 'multer';

const app = express();
app.use(bodyParser.json());

const upload = multer();

app.post('/save7-2-1', upload.any(), async (req, res) => {
    console.log(req);
    handleUpload(req, res, 'criteria72');
});

export { app as C72 };
