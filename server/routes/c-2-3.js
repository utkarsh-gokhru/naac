import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import { getStorage } from '../firebase.js';
import { ref, getDownloadURL, deleteObject, uploadBytes } from 'firebase/storage';
import Criteria2Model from '../models/criteria2.js.js';

const app = express();

app.use(bodyParser.json());

const storage = getStorage();

const deleteExistingFile = async (existingFilePath) => {
    const fileRef = ref(storage, existingFilePath);

    try {
        await getDownloadURL(fileRef);
        await deleteObject(fileRef);
        console.log('Existing file deleted successfully.');
    } catch (error) {
        if (error.code === 'storage/object-not-found') {
            console.log(`File not found: ${existingFilePath}`);
        } else {
            console.error('Error deleting existing file:', error);
        }
    }
};

const handleFileUpload = async (existingData, fieldName, newFile, newData) => {
    if (existingData && existingData.criteria23[fieldName]) {
        await deleteExistingFile(existingData.criteria23[fieldName]);
    }

    if (!existingData) {
        existingData = new Criteria2Model({
            department: newData.department,
            academicYear: newData.academicYear,
            criteria23: {
                [fieldName]: newFile.path,
                ...newData,
            }
        });
    } else {
        existingData.criteria23[fieldName] = newFile.path;
        Object.assign(existingData.criteria23, newData);
    }

    await existingData.save();
};

const upload = multer();

app.post('/save2-3-1', upload.single('file2_3_1'), async (req, res) => {
    try {
        const { department, academicYear, learning_exp } = req.body;
        const file2_3_1 = req.file;

        if (!file2_3_1 || !learning_exp) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        const uniqueFilename = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file2_3_1.originalname;
        const fileRef = ref(storage, `uploads/${uniqueFilename}`);
        const metadata = {
            contentType: file2_3_1.mimetype,
        };

        try {
            await uploadBytes(fileRef, file2_3_1.buffer, metadata);
            const filePath = await getDownloadURL(fileRef);

            let existingData = await Criteria2Model.findOne({ department, academicYear });

            await handleFileUpload(existingData, 'file2_3_1', { path: filePath }, { learning_exp, department, academicYear });

            res.status(200).json({ message: 'Data saved successfully for Section 2.3.1' });
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/save2-3-2', upload.single('file2_3_2'), async (req, res) => {
    try {
        const { department, academicYear, effect_teach_learn } = req.body;
        const file2_3_2 = req.file;

        if (!file2_3_2 || !effect_teach_learn) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        const uniqueFilename = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file2_3_2.originalname;
        const fileRef = ref(storage, `uploads/${uniqueFilename}`);
        const metadata = {
            contentType: file2_3_2.mimetype,
        };

        try {
            await uploadBytes(fileRef, file2_3_2.buffer, metadata);
            const filePath = await getDownloadURL(fileRef);

            let existingData = await Criteria2Model.findOne({ department, academicYear });

            await handleFileUpload(existingData, 'file2_3_2', { path: filePath }, { effect_teach_learn, department, academicYear });

            res.status(200).json({ message: 'Data saved successfully for Section 2.3.2' });
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/save2-3-3', upload.single('file2_3_3'), async (req, res) => {
    try {
        const { department, academicYear, no_of_mentors } = req.body;
        const file2_3_3 = req.file;

        if (!file2_3_3 || !no_of_mentors) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        const uniqueFilename = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file2_3_3.originalname;
        const fileRef = ref(storage, `uploads/${uniqueFilename}`);
        const metadata = {
            contentType: file2_3_3.mimetype,
        };

        try {
            await uploadBytes(fileRef, file2_3_3.buffer, metadata);
            const filePath = await getDownloadURL(fileRef);

            let existingData = await Criteria2Model.findOne({ department, academicYear });

            await handleFileUpload(existingData, 'file2_3_3', { path: filePath }, { no_of_mentors, department, academicYear });

            res.status(200).json({ message: 'Data saved successfully for Section 2.3.3' });
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export {app as C23};
