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
    if (existingData && existingData.criteria11[fieldName]) {
        deleteExistingFile(existingData.criteria11[fieldName]);
    }

    if (!existingData) {

        existingData = new Criteria1Model({
            department: newData.department,
            academicYear: newData.academicYear,
            criteria11: {
                [fieldName]: newFile.path,
                ...newData,
            }
        });
    } else {
        existingData.criteria11[fieldName] = newFile.path;
        Object.assign(existingData.criteria11, newData);
    }

    await existingData.save();
};

app.post('/save1-1-1', upload.single('file1_1_1'), async (req, res) => {
    try {
        const { department, academicYear, curriculumText } = req.body;
        const file1_1_1 = req.file;

        if (!file1_1_1 || !curriculumText) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        let existingData = await Criteria1Model.findOne({ department, academicYear });

        await handleFileUpload(existingData, 'file1_1_1', file1_1_1, { curriculumText, department, academicYear });

        res.status(200).json({ message: 'Data saved successfully for Section 1.1.1' });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/save1-1-2', upload.fields([{ name: 'file1_1_2_1' }, { name: 'file1_1_2_2' }]), async (req, res) => {
    try {
        const { department, academicYear, syllabusRevisionCount } = req.body;
        const file1_1_2_1 = req.files['file1_1_2_1'][0];
        const file1_1_2_2 = req.files['file1_1_2_2'][0];

        if (!file1_1_2_1 || !file1_1_2_2 || !syllabusRevisionCount) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        let existingData = await Criteria1Model.findOne({ department, academicYear });

        await handleFileUpload(existingData, 'file1_1_2_1', file1_1_2_1, {
            syllabusRevisionCount,
            file1_1_2_2: file1_1_2_2.path,
            department,
            academicYear
        });

        res.status(200).json({ message: 'Data saved successfully for Section 1.1.2' });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/save1-1-3', upload.fields([{ name: 'file1_1_3_1' }, { name: 'file1_1_3_2' }]), async (req, res) => {
    try {
        const { department, academicYear, coursesFocusCount } = req.body;
        const file1_1_3_1 = req.files['file1_1_3_1'][0];
        const file1_1_3_2 = req.files['file1_1_3_2'][0];

        if (!file1_1_3_1 || !file1_1_3_2 || !coursesFocusCount) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        let existingData = await Criteria1Model.findOne({ department, academicYear });

        await handleFileUpload(existingData, 'file1_1_3_1', file1_1_3_1, {
            coursesFocusCount,
            file1_1_3_2: file1_1_3_2.path,
            department,
            academicYear
        });

        res.status(200).json({ message: 'Data saved successfully for Section 1.1.3' });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export { app as C11 };
