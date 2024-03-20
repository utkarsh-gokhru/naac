import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import { getStorage } from '../firebase.js';
import { ref, getDownloadURL, deleteObject, uploadBytes } from 'firebase/storage';
import Criteria5Model from '../models/criteria5.js';

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
    if (existingData && existingData.criteria54[fieldName]) {
        await deleteExistingFile(existingData.criteria54[fieldName]);
    }

    if (!existingData) {
        existingData = new Criteria5Model({
            department: newData.department,
            academicYear: newData.academicYear,
            criteria54: {
                [fieldName]: newFile.path,
                ...newData,
            }
        });
    } else {
        existingData.criteria54[fieldName] = newFile.path;
        Object.assign(existingData.criteria54, newData);
    }

    await existingData.save();
};

const upload = multer();

app.post('/save5-4-1', upload.single('file5_4_1'), async (req, res) => {
    try {
        const { department, academicYear, alumni_chapters } = req.body;
        const file5_4_1 = req.file;

        if (!file5_4_1 || !alumni_chapters) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        const uniqueFilename = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file5_4_1.originalname;
        const fileRef = ref(storage, `uploads/${uniqueFilename}`);
        const metadata = {
            contentType: file5_4_1.mimetype,
        };

        try {
            await uploadBytes(fileRef, file5_4_1.buffer, metadata);
            const filePath = await getDownloadURL(fileRef);

            let existingData = await Criteria5Model.findOne({ department, academicYear });

            await handleFileUpload(existingData, 'file5_4_1', { path: filePath }, { alumni_chapters, department, academicYear });

            res.status(200).json({ message: 'Data saved successfully for Section 5.4.1' });
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/save1-1-1', upload.single('file5_4_2'), async (req, res) => {
    try {
        const { department, academicYear, alumni_contributions } = req.body;
        const file5_4_2 = req.file;

        if (!file5_4_2 || !alumni_contributions) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        const uniqueFilename = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file5_4_2.originalname;
        const fileRef = ref(storage, `uploads/${uniqueFilename}`);
        const metadata = {
            contentType: file5_4_2.mimetype,
        };

        try {
            await uploadBytes(fileRef, file5_4_2.buffer, metadata);
            const filePath = await getDownloadURL(fileRef);

            let existingData = await Criteria5Model.findOne({ department, academicYear });

            await handleFileUpload(existingData, 'file5_4_2', { path: filePath }, { alumni_contributions, department, academicYear });

            res.status(200).json({ message: 'Data saved successfully for Section 5.4.2' });
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export { app as C54 };
