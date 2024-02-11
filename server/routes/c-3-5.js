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
    if (existingData && existingData.criteria35[fieldName]) {
        await deleteExistingFile(existingData.criteria35[fieldName]);
    }

    if (!existingData) {
        existingData = new Criteria3Model({
            department: newData.department,
            academicYear: newData.academicYear,
            criteria35: {
                [fieldName]: newFile.path,
                ...newData,
            }
        });
    } else {
        existingData.criteria35[fieldName] = newFile.path;
        Object.assign(existingData.criteria35, newData);
    }

    await existingData.save();
};

const upload = multer();

app.post('/save3-5-1', upload.single('file3_5_1'), async (req, res) => {
    try {
        const { department, academicYear, consultancyText } = req.body;
        const file3_5_1 = req.file;

        if (!file3_5_1 || !consultancyText) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        const uniqueFilename = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file3_5_1.originalname;
        const fileRef = ref(storage, `uploads/${uniqueFilename}`);
        const metadata = {
            contentType: file3_5_1.mimetype,
        };

        try {
            await uploadBytes(fileRef, file3_5_1.buffer, metadata);

            const filePath = await getDownloadURL(fileRef);

            let existingData = await Criteria3Model.findOne({ department, academicYear });
            
            await handleFileUpload(existingData, 'file3_5_1', { path: filePath }, {
                consultancyText,
                file3_5_1: filePath,
                department,
                academicYear
            });

            res.status(200).json({ message: 'Data saved successfully for Section 3.3.1' });
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/save3-5-2', upload.fields([{ name: 'file3_5_2_1' }, { name: 'file3_5_2_2' }]), async (req, res) => {
    try {
        const { department, academicYear, consultancyRev } = req.body;
        const file3_5_2_1 = req.files['file3_5_2_1'][0];
        const file3_5_2_2 = req.files['file3_5_2_2'][0];

        if (!file3_5_2_1 || !file3_5_2_2 || !consultancyRev) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        const uniqueFilename1 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file3_5_2_1.originalname;
        const fileRef1 = ref(storage, `uploads/${uniqueFilename1}`);
        const metadata1 = {
            contentType: file3_5_2_1.mimetype,
        };

        const uniqueFilename2 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file3_5_2_2.originalname;
        const fileRef2 = ref(storage, `uploads/${uniqueFilename2}`);
        const metadata2 = {
            contentType: file3_5_2_2.mimetype,
        };

        try {
            await Promise.all([
                uploadBytes(fileRef1, file3_5_2_1.buffer, metadata1),
                uploadBytes(fileRef2, file3_5_2_2.buffer, metadata2)
            ]);

            const filePath1 = await getDownloadURL(fileRef1);
            const filePath2 = await getDownloadURL(fileRef2);

            let existingData = await Criteria3Model.findOne({ department, academicYear });

            await handleFileUpload(existingData, 'file3_5_2_1', { path: filePath1 }, {
                consultancyRev,
                file3_5_2_1: filePath1,
                department,
                academicYear
            });

            await handleFileUpload(existingData, 'file3_5_2_2', { path: filePath2 }, {
                consultancyRev,
                file3_5_2_2: filePath2,
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

export {app as C35};
