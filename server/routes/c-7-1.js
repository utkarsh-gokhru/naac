import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import handleUpload from '../controllers/criteria7.js';

const app = express();
app.use(bodyParser.json());

const upload = multer();

app.post('/save7-1-1', upload.fields([{ name: 'file7_1_1' }]), async (req, res) => {
    handleUpload(req, res, 'criteria71');
});

app.post('/save7-1-2', upload.fields([{ name: 'file7_1_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria71');
});

app.post('/save7-1-3', upload.fields([{ name: 'file7_1_3' }]), async (req, res) => {
    handleUpload(req, res, 'criteria71');
});

app.post('/save7-1-4', upload.fields([{ name: 'file7_1_4' }]), async (req, res) => {
    handleUpload(req, res, 'criteria71');
});

app.post('/save7-1-5', upload.fields([{ name: 'file7_1_5' }]), async (req, res) => {
    handleUpload(req, res, 'criteria71');
});

app.post('/save7-1-6', upload.fields([{ name: 'file7_1_6' }]), async (req, res) => {
    handleUpload(req, res, 'criteria71');
});

app.post('/save7-1-7', upload.fields([{ name: 'file7_1_7' }]), async (req, res) => {
    handleUpload(req, res, 'criteria71');
});

app.post('/save7-1-8', upload.fields([{ name: 'file7_1_8' }]), async (req, res) => {
    handleUpload(req, res, 'criteria71');
});

app.post('/save7-1-9', async (req, res) => {
    handleUpload(req, res, 'criteria71');
});

app.post('/save7-1-10', upload.fields([{ name: 'file7_1_10' }]), async (req, res) => {
    handleUpload(req, res, 'criteria71');
});

app.post('/save7-1-11', upload.fields([{ name: 'file7_1_11' }]), async (req, res) => {
    handleUpload(req, res, 'criteria71');
});

export { app as C71 };
