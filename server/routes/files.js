import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import fs from 'fs';
import Criteria1Model from '../models/criteria1.js';

const app = express();
    
app.use(bodyParser.json());

const mimetypes = {
    '.xls': 'application/vnd.ms-excel',
    '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

app.get('/download/:fileKey', async (req, res) => {
    try {
        const fileKey = req.params.fileKey;
        const department = req.query.department;
        const academicYear = req.query.academicYear;

        const data = await Criteria1Model.findOne({ department, academicYear });
        const criteria11 = data.criteria11;
        const filePath = criteria11[`${fileKey}`];

        if (!filePath) {
            return res.status(404).json({ error: 'File not found.' });
        }

        const fileName = path.basename(filePath);

        res.sendFile(filePath, { root: process.cwd(), headers: { 'Content-Disposition': `attachment; filename=${fileName}` } });
    } catch (error) {
        console.error('Error sending file:', error);
        res.status(500).json({ error: 'Internal Server Error'});
    }
});

export {app as Files};
