import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import { getStorage } from '../firebase.js';
import { ref, getDownloadURL, deleteObject, uploadBytes } from 'firebase/storage';
import Criteria3Model from '../models/criteria3.js';

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
    if (existingData && existingData.criteria32[fieldName]) {
        await deleteExistingFile(existingData.criteria32[fieldName]);
    }

    if (!existingData) {
        existingData = new Criteria1Model({
            department: newData.department,
            academicYear: newData.academicYear,
            criteria32: {
                [fieldName]: newFile.path,
                ...newData,
            }
        });
    } else {
        existingData.criteria32[fieldName] = newFile.path;
        Object.assign(existingData.criteria32, newData);
    }

    await existingData.save();
};

const upload = multer();

app.post('/save3-2-1', upload.fields([{ name: 'file3_2_1_1' }, { name: 'file3_2_1_2' }]), async (req, res) => {
    try {
        const { department, academicYear, extraFunding } = req.body;
        const file3_2_1_1 = req.files['file3_2_1_1'][0];
        const file3_2_1_2 = req.files['file3_2_1_2'][0];

        if (!file3_2_1_1 || !file3_2_1_2 || !extraFunding) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        const uniqueFilename1 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file3_2_1_1.originalname;
        const fileRef1 = ref(storage, `uploads/${uniqueFilename1}`);
        const metadata1 = {
            contentType: file3_2_1_1.mimetype,
        };

        const uniqueFilename2 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file3_2_1_2.originalname;
        const fileRef2 = ref(storage, `uploads/${uniqueFilename2}`);
        const metadata2 = {
            contentType: file3_2_1_2.mimetype,
        };

        try {
            await Promise.all([
                uploadBytes(fileRef1, file3_2_1_1.buffer, metadata1),
                uploadBytes(fileRef2, file3_2_1_2.buffer, metadata2)
            ]);

            const filePath1 = await getDownloadURL(fileRef1);
            const filePath2 = await getDownloadURL(fileRef2);

            let existingData = await Criteria3Model.findOne({ department, academicYear });

            await handleFileUpload(existingData, 'file3_2_1_1', { path: filePath1 }, {
                extraFunding,
                file3_2_1_1: filePath1,
                department,
                academicYear
            });

            await handleFileUpload(existingData, 'file3_2_1_2', { path: filePath2 }, {
                extraFunding,
                file3_2_1_2: filePath2,
                department,
                academicYear
            });

            res.status(200).json({ message: 'Data saved successfully for Section 3.2.1' });
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/save3-2-2', upload.fields([{ name: 'file3_2_2_1' }, { name: 'file3_2_2_2' }]), async (req, res) => {
    try {
        const { department, academicYear, grants } = req.body;
        const file3_2_2_1 = req.files['file3_2_2_1'][0];
        const file3_2_2_2 = req.files['file3_2_2_2'][0];

        if (!file3_2_2_1 || !file3_2_2_2 || !grants) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        const uniqueFilename1 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file3_2_2_1.originalname;
        const fileRef1 = ref(storage, `uploads/${uniqueFilename1}`);
        const metadata1 = {
            contentType: file3_2_2_1.mimetype,
        };

        const uniqueFilename2 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file3_2_2_2.originalname;
        const fileRef2 = ref(storage, `uploads/${uniqueFilename2}`);
        const metadata2 = {
            contentType: file3_2_2_2.mimetype,
        };

        try {
            await Promise.all([
                uploadBytes(fileRef1, file3_2_2_1.buffer, metadata1),
                uploadBytes(fileRef2, file3_2_2_2.buffer, metadata2)
            ]);

            const filePath1 = await getDownloadURL(fileRef1);
            const filePath2 = await getDownloadURL(fileRef2);

            let existingData = await Criteria3Model.findOne({ department, academicYear });
            await handleFileUpload(existingData, 'file3_2_2_1', { path: filePath1 }, {
                grants,
                file3_2_2_1: filePath1,
                department,
                academicYear
            });

            await handleFileUpload(existingData, 'file3_2_2_2', { path: filePath2 }, {
                grants,
                file3_2_2_2: filePath2,
                department,
                academicYear
            });

            res.status(200).json({ message: 'Data saved successfully for Section 3.2.2' });
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/save3-2-3', upload.fields([{ name: 'file3_2_3_1' }, { name: 'file3_2_3_2' }]), async (req, res) => {
    try {
        const { department, academicYear, teacherResearchProjects } = req.body;
        const file3_2_3_1 = req.files['file3_2_3_1'][0];
        const file3_2_3_2 = req.files['file3_2_3_2'][0];

        if (!file3_2_3_1 || !file3_2_3_2 || !teacherResearchProjects) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        const uniqueFilename1 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file3_2_3_1.originalname;
        const fileRef1 = ref(storage, `uploads/${uniqueFilename1}`);
        const metadata1 = {
            contentType: file3_2_3_1.mimetype,
        };

        const uniqueFilename2 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file3_2_3_2.originalname;
        const fileRef2 = ref(storage, `uploads/${uniqueFilename2}`);
        const metadata2 = {
            contentType: file3_2_3_2.mimetype,
        };

        try {
            await Promise.all([
                uploadBytes(fileRef1, file3_2_3_1.buffer, metadata1),
                uploadBytes(fileRef2, file3_2_3_2.buffer, metadata2)
            ]);

            const filePath1 = await getDownloadURL(fileRef1);
            const filePath2 = await getDownloadURL(fileRef2);

            let existingData = await Criteria3Model.findOne({ department, academicYear });
            
            await handleFileUpload(existingData, 'file3_2_3_1', { path: filePath1 }, {
                teacherResearchProjects,
                file3_2_3_1: filePath1,
                department,
                academicYear
            });

            await handleFileUpload(existingData, 'file3_2_3_2', { path: filePath2 }, {
                teacherResearchProjects,
                file3_2_3_2: filePath2,
                department,
                academicYear
            });

            res.status(200).json({ message: 'Data saved successfully for Section 3.2.3' });
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export {app as C32};