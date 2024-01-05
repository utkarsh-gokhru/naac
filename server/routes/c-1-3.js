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
    if (existingData && existingData.criteria13[fieldName]) {
        await deleteExistingFile(existingData.criteria13[fieldName]);
    }

    if (!existingData) {
        existingData = new Criteria1Model({
            department: newData.department,
            academicYear: newData.academicYear,
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

const upload = multer();

app.post('/save1-3-1', upload.fields([{ name: 'file1_3_1' }]), async (req, res) => {
    try {
        const { department, text_1_3_1, academicYear } = req.body;
        const file1_3_1 = req.files['file1_3_1'][0];

        if (!text_1_3_1 || !file1_3_1) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        const uniqueFilename = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file1_3_1.originalname;
        const fileRef = ref(storage, `uploads/${uniqueFilename}`);
        const metadata = {
            contentType: file1_3_1.mimetype,
        };

        try {
            await uploadBytes(fileRef, file1_3_1.buffer, metadata);

            const filePath = await getDownloadURL(fileRef);

            let existingData = await Criteria1Model.findOne({ department, academicYear });

            await handleFileUpload(existingData, 'file1_3_1', { path: filePath }, {
                text_1_3_1,
                department,
                academicYear
            });

            res.status(200).json({ message: 'Data saved successfully for Section 1.3.1' });
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/save1-3-2', upload.fields([{ name: 'file1_3_2_1' }, { name: 'file1_3_2_2' }]), async (req, res) => {
    try {
        const { department, valueAddedCoursesCount1_3_2, academicYear } = req.body;
        const file1_3_2_1 = req.files['file1_3_2_1'][0];
        const file1_3_2_2 = req.files['file1_3_2_2'][0];

        if (!valueAddedCoursesCount1_3_2 || !file1_3_2_1 || !file1_3_2_2) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        const uniqueFilename1 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file1_3_2_1.originalname;
        const fileRef1 = ref(storage, `uploads/${uniqueFilename1}`);
        const metadata1 = {
            contentType: file1_3_2_1.mimetype,
        };

        const uniqueFilename2 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file1_3_2_2.originalname;
        const fileRef2 = ref(storage, `uploads/${uniqueFilename2}`);
        const metadata2 = {
            contentType: file1_3_2_2.mimetype,
        };

        try {
            await Promise.all([
                uploadBytes(fileRef1, file1_3_2_1.buffer, metadata1),
                uploadBytes(fileRef2, file1_3_2_2.buffer, metadata2)
            ]);

            const filePath1 = await getDownloadURL(fileRef1);
            const filePath2 = await getDownloadURL(fileRef2);

            let existingData = await Criteria1Model.findOne({ department, academicYear });

            await handleFileUpload(existingData, 'file1_3_2_1', { path: filePath1 }, {
                valueAddedCoursesCount1_3_2,
                department,
                academicYear
            });

            await handleFileUpload(existingData, 'file1_3_2_2', { path: filePath2 }, {
                valueAddedCoursesCount1_3_2,
                department,
                academicYear
            });

            res.status(200).json({ message: 'Data saved successfully for Section 1.3.2' });
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/save1-3-3', upload.fields([{ name: 'file1_3_3_1_1' }, { name: 'file1_3_3_1_2' }]), async (req, res) => {
    try {
        const { department, enrolledStudentsCount1_3_3_1, academicYear } = req.body;
        const file1_3_3_1_1 = req.files['file1_3_3_1_1'][0];
        const file1_3_3_1_2 = req.files['file1_3_3_1_2'][0];

        if (!enrolledStudentsCount1_3_3_1 || !file1_3_3_1_1 || !file1_3_3_1_2) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        const uniqueFilename1 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file1_3_3_1_1.originalname;
        const fileRef1 = ref(storage, `uploads/${uniqueFilename1}`);
        const metadata1 = {
            contentType: file1_3_3_1_1.mimetype,
        };

        const uniqueFilename2 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file1_3_3_1_2.originalname;
        const fileRef2 = ref(storage, `uploads/${uniqueFilename2}`);
        const metadata2 = {
            contentType: file1_3_3_1_2.mimetype,
        };

        try {
            await Promise.all([
                uploadBytes(fileRef1, file1_3_3_1_1.buffer, metadata1),
                uploadBytes(fileRef2, file1_3_3_1_2.buffer, metadata2)
            ]);

            const filePath1 = await getDownloadURL(fileRef1);
            const filePath2 = await getDownloadURL(fileRef2);

            let existingData = await Criteria1Model.findOne({ department, academicYear });

            await handleFileUpload(existingData, 'file1_3_3_1_1', { path: filePath1 }, {
                enrolledStudentsCount1_3_3_1,
                department,
                academicYear
            });

            await handleFileUpload(existingData, 'file1_3_3_1_2', { path: filePath2 }, {
                enrolledStudentsCount1_3_3_1,
                department,
                academicYear
            });

            res.status(200).json({ message: 'Data saved successfully for Section 1.3.3' });
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/save1-3-4', upload.fields([{ name: 'file1_3_4_1' }, { name: 'file1_3_4_2' }]), async (req, res) => {
    try {
        const { department, projectsCount1_3_4, academicYear } = req.body;
        const file1_3_4_1 = req.files['file1_3_4_1'][0];
        const file1_3_4_2 = req.files['file1_3_4_2'][0];

        if (!projectsCount1_3_4 || !file1_3_4_1 || !file1_3_4_2) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        const uniqueFilename1 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file1_3_4_1.originalname;
        const fileRef1 = ref(storage, `uploads/${uniqueFilename1}`);
        const metadata1 = {
            contentType: file1_3_4_1.mimetype,
        };

        const uniqueFilename2 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file1_3_4_2.originalname;
        const fileRef2 = ref(storage, `uploads/${uniqueFilename2}`);
        const metadata2 = {
            contentType: file1_3_4_2.mimetype,
        };

        try {
            await Promise.all([
                uploadBytes(fileRef1, file1_3_4_1.buffer, metadata1),
                uploadBytes(fileRef2, file1_3_4_2.buffer, metadata2)
            ]);

            const filePath1 = await getDownloadURL(fileRef1);
            const filePath2 = await getDownloadURL(fileRef2);

            let existingData = await Criteria1Model.findOne({ department, academicYear });

            await handleFileUpload(existingData, 'file1_3_4_1', { path: filePath1 }, {
                projectsCount1_3_4,
                department,
                academicYear
            });

            await handleFileUpload(existingData, 'file1_3_4_2', { path: filePath2 }, {
                projectsCount1_3_4,
                department,
                academicYear
            });

            res.status(200).json({ message: 'Data saved successfully for Section 1.3.4' });
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export { app as C13 };
