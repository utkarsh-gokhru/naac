import express from 'express';
import bodyParser from 'body-parser';
import handleUpload from '../controllers/criteria7.js';

const app = express();
app.use(bodyParser.json());

app.post('/save7-2-1', async (req, res) => {
    handleUpload(req, res, 'criteria72');
});

export {app as C72}