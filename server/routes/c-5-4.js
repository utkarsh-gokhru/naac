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

const handleFileUpload = async (existingData, fieldNames, newFiles, newData) => {
    try {
        if (!existingData) {
            existingData = new Criteria5Model({
                department: newData.department,
                academicYear: newData.academicYear,
                criteria54: {},
            });
        }

        fieldNames.forEach((fieldName, index) => {
            const newFile = newFiles[index];
            if (existingData.criteria54[fieldName]) {
                deleteExistingFile(existingData.criteria54[fieldName]);
            }
            existingData.criteria54[fieldName] = newFile.path;
        });

        Object.assign(existingData.criteria54, newData);

        await existingData.save();
    } catch (error) {
        throw new Error('Error handling file upload: ' + error.message);
    }
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

            await handleFileUpload(existingData, ['file5_4_1'], [{ path: filePath }], { alumni_chapters, department, academicYear });

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

export { app as C54 };
