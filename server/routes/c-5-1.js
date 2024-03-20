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
    if (existingData && existingData.criteria51[fieldName]) {
        await deleteExistingFile(existingData.criteria51[fieldName]);
    }

    if (!existingData) {
        existingData = new Criteria5Model({
            department: newData.department,
            academicYear: newData.academicYear,
            criteria51: {
                [fieldName]: newFile.path,
                ...newData,
            }
        });
    } else {
        existingData.criteria51[fieldName] = newFile.path;
        Object.assign(existingData.criteria51, newData);
    }

    await existingData.save();
};

const upload = multer();

app.post('/save5-1-1', upload.fields([{ name: 'file5_1_1_1' }, { name: 'file5_1_1_2' }]), async (req, res) => {
    try {
        const { department, academicYear, scholarship_beneficiaries } = req.body;
        const file5_1_1_1 = req.files['file5_1_1_1'][0];
        const file5_1_1_2 = req.files['file5_1_1_2'][0];

        if (!file5_1_1_1 || !file5_1_1_2 || !scholarship_beneficiaries) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        const uniqueFilename1 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file5_1_1_1.originalname;
        const fileRef1 = ref(storage, `uploads/${uniqueFilename1}`);
        const metadata1 = {
            contentType: file5_1_1_1.mimetype,
        };

        const uniqueFilename2 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file5_1_1_2.originalname;
        const fileRef2 = ref(storage, `uploads/${uniqueFilename2}`);
        const metadata2 = {
            contentType: file5_1_1_2.mimetype,
        };

        try {
            await Promise.all([
                uploadBytes(fileRef1, file5_1_1_1.buffer, metadata1),
                uploadBytes(fileRef2, file5_1_1_2.buffer, metadata2)
            ]);

            const filePath1 = await getDownloadURL(fileRef1);
            const filePath2 = await getDownloadURL(fileRef2);

            let existingData = await Criteria5Model.findOne({ department, academicYear });

            await handleFileUpload(existingData, 'file5_1_1_1', { path: filePath1 }, {
                scholarship_beneficiaries,
                file5_1_1_1: filePath1,
                department,
                academicYear
            });

            await handleFileUpload(existingData, 'file5_1_1_2', { path: filePath2 }, {
                scholarship_beneficiaries,
                file5_1_1_2: filePath2,
                department,
                academicYear
            });

            res.status(200).json({ message: 'Data saved successfully for Section 5.1.1' });
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/save5-1-2', upload.fields([{ name: 'file5_1_2_1' }, { name: 'file5_1_2_2' }]), async (req, res) => {
    try {
        const { department, academicYear, career_counsel_beneficiaries } = req.body;
        const file5_1_2_1 = req.files['file5_1_2_1'][0];
        const file5_1_2_2 = req.files['file5_1_2_2'][0];

        if (!file5_1_2_1 || !file5_1_2_2 || !career_counsel_beneficiaries) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        const uniqueFilename1 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file5_1_2_1.originalname;
        const fileRef1 = ref(storage, `uploads/${uniqueFilename1}`);
        const metadata1 = {
            contentType: file5_1_2_1.mimetype,
        };

        const uniqueFilename2 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file5_1_2_2.originalname;
        const fileRef2 = ref(storage, `uploads/${uniqueFilename2}`);
        const metadata2 = {
            contentType: file5_1_2_2.mimetype,
        };

        try {
            await Promise.all([
                uploadBytes(fileRef1, file5_1_2_1.buffer, metadata1),
                uploadBytes(fileRef2, file5_1_2_2.buffer, metadata2)
            ]);

            const filePath1 = await getDownloadURL(fileRef1);
            const filePath2 = await getDownloadURL(fileRef2);

            let existingData = await Criteria5Model.findOne({ department, academicYear });

            await handleFileUpload(existingData, 'file5_1_2_1', { path: filePath1 }, {
                career_counsel_beneficiaries,
                file5_1_2_1: filePath1,
                department,
                academicYear
            });

            await handleFileUpload(existingData, 'file5_1_2_2', { path: filePath2 }, {
                career_counsel_beneficiaries,
                file5_1_2_2: filePath2,
                department,
                academicYear
            });

            res.status(200).json({ message: 'Data saved successfully for Section 5.1.2' });
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/save5-1-3', upload.fields([{ name: 'file5_1_3_1' }, { name: 'file5_1_3_2' }]), async (req, res) => {
    try {
        const { department, academicYear, capacity_development_initiatives } = req.body;
        const file5_1_3_1 = req.files['file5_1_3_1'][0];
        const file5_1_3_2 = req.files['file5_1_3_2'][0];

        if (!file5_1_3_1 || !file5_1_3_2 || !capacity_development_initiatives) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        const uniqueFilename1 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file5_1_3_1.originalname;
        const fileRef1 = ref(storage, `uploads/${uniqueFilename1}`);
        const metadata1 = {
            contentType: file5_1_3_1.mimetype,
        };

        const uniqueFilename2 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file5_1_3_2.originalname;
        const fileRef2 = ref(storage, `uploads/${uniqueFilename2}`);
        const metadata2 = {
            contentType: file5_1_3_2.mimetype,
        };

        try {
            await Promise.all([
                uploadBytes(fileRef1, file5_1_3_1.buffer, metadata1),
                uploadBytes(fileRef2, file5_1_3_2.buffer, metadata2)
            ]);

            const filePath1 = await getDownloadURL(fileRef1);
            const filePath2 = await getDownloadURL(fileRef2);

            let existingData = await Criteria5Model.findOne({ department, academicYear });

            await handleFileUpload(existingData, 'file5_1_3_1', { path: filePath1 }, {
                capacity_development_initiatives,
                file5_1_3_1: filePath1,
                department,
                academicYear
            });

            await handleFileUpload(existingData, 'file5_1_3_2', { path: filePath2 }, {
                capacity_development_initiatives,
                file5_1_3_2: filePath2,
                department,
                academicYear
            });

            res.status(200).json({ message: 'Data saved successfully for Section 5.1.3' });
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/save5-1-4', upload.single('file5_1_4'), async (req, res) => {
    try {
        const { department, academicYear, student_grievances_redressal } = req.body;
        const file5_1_4 = req.file;

        if (!file5_1_4 || !student_grievances_redressal) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        const uniqueFilename = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file5_1_4.originalname;
        const fileRef = ref(storage, `uploads/${uniqueFilename}`);
        const metadata = {
            contentType: file5_1_4.mimetype,
        };

        try {
            await uploadBytes(fileRef, file5_1_4.buffer, metadata);
            const filePath = await getDownloadURL(fileRef);

            let existingData = await Criteria5Model.findOne({ department, academicYear });

            await handleFileUpload(existingData, 'file5_1_4', { path: filePath }, { student_grievances_redressal, department, academicYear });

            res.status(200).json({ message: 'Data saved successfully for Section 5.1.4' });
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export {app as C51};
