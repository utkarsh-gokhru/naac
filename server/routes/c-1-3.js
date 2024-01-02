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
    if (existingData && existingData.criteria13[fieldName]) {
        deleteExistingFile(existingData.criteria13[fieldName]);
    }

    if (!existingData) {
        existingData = new Criteria1Model({
            department: newData.department,
            criteria13: {
                [fieldName]: newFile.path,
                ...newData,
            }
        });
    } else {
        existingData.criteria13[fieldName] = newFile.path;
        Object.assign(existingData.criteria13, newData);
    }

    await existingData.save();
};

app.post('/save1-3-1', upload.fields([{ name: 'file1_3_1' }]), async (req, res) => {
    try {
        const { department, text_1_3_1 } = req.body;
        const file1_3_1 = req.files['file1_3_1'][0];

        if (!text_1_3_1 || !file1_3_1) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        let existingData = await Criteria1Model.findOne({ department });

        await handleFileUpload(existingData, 'file1_3_1', file1_3_1, {
            text_1_3_1,
        });

        res.status(200).json({ message: 'Data saved successfully for Section 1.3.1' });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/save1-3-2', upload.fields([{ name: 'file1_3_2_1' }, { name: 'file1_3_2_2' }]), async (req, res) => {
    try {
        const { department, valueAddedCoursesCount1_3_2 } = req.body;
        const file1_3_2_1 = req.files['file1_3_2_1'][0];
        const file1_3_2_2 = req.files['file1_3_2_2'][0];

        if (!valueAddedCoursesCount1_3_2 || !file1_3_2_1 || !file1_3_2_2) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        let existingData = await Criteria1Model.findOne({ department });

        await handleFileUpload(existingData, 'file1_3_2_1', file1_3_2_1, {
            valueAddedCoursesCount1_3_2,
            file1_3_2_2: file1_3_2_2.path,
        });

        res.status(200).json({ message: 'Data saved successfully for Section 1.3.2' });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/save1-3-3', upload.fields([{ name: 'file1_3_3_1_1' }, { name: 'file1_3_3_1_2' }]), async (req, res) => {
    try {
        const { department, enrolledStudentsCount1_3_3_1 } = req.body;
        const file1_3_3_1_1 = req.files['file1_3_3_1_1'][0];
        const file1_3_3_1_2 = req.files['file1_3_3_1_2'][0];

        if (!enrolledStudentsCount1_3_3_1 || !file1_3_3_1_1 || !file1_3_3_1_2) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        let existingData = await Criteria1Model.findOne({ department });

        await handleFileUpload(existingData, 'file1_3_3_1_1', file1_3_3_1_1, {
            enrolledStudentsCount1_3_3_1,
            file1_3_3_1_2: file1_3_3_1_2.path,
        });

        res.status(200).json({ message: 'Data saved successfully for Section 1.3.3' });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/save1-3-4', upload.fields([{ name: 'file1_3_4_1' }, { name: 'file1_3_4_2' }]), async (req, res) => {
    try {
        const { department, projectsCount1_3_4 } = req.body;
        const file1_3_4_1 = req.files['file1_3_4_1'][0];
        const file1_3_4_2 = req.files['file1_3_4_2'][0];

        if (!projectsCount1_3_4 || !file1_3_4_1 || !file1_3_4_2) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        let existingData = await Criteria1Model.findOne({ department });

        await handleFileUpload(existingData, 'file1_3_4_1', file1_3_4_1, {
            projectsCount1_3_4,
            file1_3_4_2: file1_3_4_2.path,
        });

        res.status(200).json({ message: 'Data saved successfully for Section 1.3.4' });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export { app as C13 };
