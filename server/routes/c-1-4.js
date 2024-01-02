import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Criteria1Model from '../models/criteria1.js';

const app = express();

app.use(bodyParser.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });

const deleteExistingFile = (existingFilePath) => {
    try {
        fs.unlinkSync(existingFilePath);
        console.log('Existing file deleted successfully.');
    } catch (error) {
        console.error('Error deleting existing file:', error);
    }
};

const handleFileUpload = async (existingData, fieldName, newFile, newData) => {
    if (existingData && existingData.criteria14[fieldName]) {
        deleteExistingFile(existingData.criteria14[fieldName]);
    }

    if (!existingData) {
        existingData = new Criteria1Model({
            department: newData.department,
            academicYear: newData.academicYear,
            criteria14: {
                [fieldName]: newFile.path,
                ...newData,
            }
        });
    } else {
        existingData.criteria14[fieldName] = newFile.path;
        Object.assign(existingData.criteria14, newData);
    }

    await existingData.save();
};

app.post('/save1-4-1', upload.single('file1_4_1'), async (req, res) => {
    try {
        const { department, feedbackType1_4_1, academicYear } = req.body;
        const file1_4_1 = req.file;

        if (!file1_4_1 || !feedbackType1_4_1) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        let existingData = await Criteria1Model.findOne({ department, academicYear });

        await handleFileUpload(existingData, 'file1_4_1', file1_4_1, {
            feedbackType1_4_1,
            department,
            academicYear
        });

        res.status(200).json({ message: 'Data saved successfully for Section 1.4.1' });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export { app as C14 };
