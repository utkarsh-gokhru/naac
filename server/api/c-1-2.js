import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import { getStorage } from '../firebase.js'; // Assuming you have a firebase.js file for initializing Firebase storage
import { ref, getDownloadURL, deleteObject, uploadBytes } from 'firebase/storage';
import Criteria1Model from '../models/criteria1.js';

const app = express();

app.use(bodyParser.json());

const storage = getStorage(); // Assuming you have a function getStorage in firebase.js

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
    if (existingData && existingData.criteria12[fieldName]) {
        await deleteExistingFile(existingData.criteria12[fieldName]);
    }

    if (!existingData) {
        existingData = new Criteria1Model({
            department: newData.department,
            academicYear: newData.academicYear,
            criteria12: {
                [fieldName]: newFile.path,
                ...newData,
            }
        });
    } else {
        existingData.criteria12[fieldName] = newFile.path;
        Object.assign(existingData.criteria12, newData);
    }

    await existingData.save();
};

const upload = multer();

app.post('/save1-2-1', upload.fields([{ name: 'file1_2_1_1' }, { name: 'file1_2_1_2' }]), async (req, res) => {
    try {
        const { department, newCoursesCount1_2_1, academicYear } = req.body;
        const file1_2_1_1 = req.files['file1_2_1_1'][0];
        const file1_2_1_2 = req.files['file1_2_1_2'][0];

        if (!file1_2_1_1 || !file1_2_1_2 || !newCoursesCount1_2_1 || !department) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        const uniqueFilename1 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file1_2_1_1.originalname;
        const fileRef1 = ref(storage, `uploads/${uniqueFilename1}`);
        const metadata1 = {
            contentType: file1_2_1_1.mimetype,
        };

        const uniqueFilename2 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file1_2_1_2.originalname;
        const fileRef2 = ref(storage, `uploads/${uniqueFilename2}`);
        const metadata2 = {
            contentType: file1_2_1_2.mimetype,
        };

        try {
            await Promise.all([
                uploadBytes(fileRef1, file1_2_1_1.buffer, metadata1),
                uploadBytes(fileRef2, file1_2_1_2.buffer, metadata2)
            ]);

            const filePath1 = await getDownloadURL(fileRef1);
            const filePath2 = await getDownloadURL(fileRef2);

            let existingData = await Criteria1Model.findOne({ department, academicYear });

            await handleFileUpload(existingData, 'file1_2_1_1', { path: filePath1 }, {
                newCoursesCount1_2_1,
                department,
                academicYear
            });

            await handleFileUpload(existingData, 'file1_2_1_2', { path: filePath2 }, {
                newCoursesCount1_2_1,
                department,
                academicYear
            });

            res.status(200).json({ message: 'Data saved successfully for Section 1.2.1' });
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/save1-2-2', upload.fields([{ name: 'file1_2_2_1' }, { name: 'file1_2_2_2' }]), async (req, res) => {
    try {
        const { department, programCount1_2_2, academicYear } = req.body;
        const file1_2_2_1 = req.files['file1_2_2_1'][0];
        const file1_2_2_2 = req.files['file1_2_2_2'][0];

        if (!file1_2_2_1 || !file1_2_2_2 || !programCount1_2_2 || !department) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        const uniqueFilename1 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file1_2_2_1.originalname;
        const fileRef1 = ref(storage, `uploads/${uniqueFilename1}`);
        const metadata1 = {
            contentType: file1_2_2_1.mimetype,
        };

        const uniqueFilename2 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file1_2_2_2.originalname;
        const fileRef2 = ref(storage, `uploads/${uniqueFilename2}`);
        const metadata2 = {
            contentType: file1_2_2_2.mimetype,
        };

        try {
            await Promise.all([
                uploadBytes(fileRef1, file1_2_2_1.buffer, metadata1),
                uploadBytes(fileRef2, file1_2_2_2.buffer, metadata2)
            ]);

            const filePath1 = await getDownloadURL(fileRef1);
            const filePath2 = await getDownloadURL(fileRef2);

            let existingData = await Criteria1Model.findOne({ department, academicYear });

            await handleFileUpload(existingData, 'file1_2_2_1', { path: filePath1 }, {
                programCount1_2_2,
                department,
                academicYear
            });

            await handleFileUpload(existingData, 'file1_2_2_2', { path: filePath2 }, {
                programCount1_2_2,
                department,
                academicYear
            });

            res.status(200).json({ message: 'Data saved successfully for Section 1.2.2' });
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export { app as C12 };
