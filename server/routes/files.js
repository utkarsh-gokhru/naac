import express from 'express';
import bodyParser from 'body-parser';
import Criteria1Model from '../models/criteria1.js';
import { getDownloadURL, ref } from 'firebase/storage';
import { getStorage } from '../firebase.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/download/:fileKey', async (req, res) => {
    try {
        const fileKey = req.params.fileKey;
        const department = req.query.department;    
        const academicYear = req.query.academicYear;

        const data = await Criteria1Model.findOne({ department, academicYear });

        if (!data) {
            return res.status(404).json({ error: 'Data not found.' });
        }

        const criteria11 = data.criteria11;
        const filePath = criteria11[fileKey];

        if (!filePath) {
            return res.status(404).json({ error: 'File not found.' });
        }

        const storage = getStorage();
        const fileRef = ref(storage, filePath);
        const downloadURL = await getDownloadURL(fileRef);

        console.log(downloadURL);
        res.redirect(downloadURL);
    } catch (error) {
        console.error('Error sending file:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export { app as Files };
