import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import handleUpload from '../controllers/criteria3.js';

const app = express();
app.use(bodyParser.json());

const upload = multer();

app.post('/save3-4-1', upload.fields([{ name: 'file_3_4_1' }]), async (req, res) => {
    handleUpload(req, res, 'criteria34');
});

app.post('/save3-4-2', upload.fields([{ name: 'file_3_4_2_1' }, { name: 'file_3_4_2_1' }]), async (req, res) => {
    handleUpload(req, res, 'criteria34');
});

app.post('/save3-4-3', upload.fields([{ name: 'file_3_4_3_1' }, { name: 'file_3_4_3_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria34');
});

app.post('/save3-4-4', upload.fields([{ name: 'file_3_4_4_1' }, { name: 'file_3_4_4_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria34');
});

app.post('/save3-4-5', upload.fields([{ name: 'file_3_4_5_1' }, { name: 'file_3_4_5_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria34');
});

app.post('/save3-4-6', upload.fields([{ name: 'file_3_4_6_1' }, { name: 'file_3_4_6_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria34');
});

app.post('/save3-4-7', upload.fields([{ name: 'file_3_4_7_1' }, { name: 'file_3_4_7_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria34');
});

app.post('/save3-4-8', upload.fields([{ name: 'file_3_4_8_1' }, { name: 'file_3_4_8_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria34');
});

app.post('/save3-4-6', upload.fields([{ name: 'file_3_4_9_1' }, { name: 'file_3_4_9_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria34');
});

export { app as C34 };
