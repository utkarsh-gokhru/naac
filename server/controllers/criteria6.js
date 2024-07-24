import express from 'express';
import bodyParser from 'body-parser';
import { getStorage } from '../firebase.js';
import { ref, getDownloadURL, deleteObject, uploadBytes } from 'firebase/storage';
import Criteria6Model from '../models/criteria6.js';

const app = express();
app.use(bodyParser.json());
const storage = getStorage();

const handleUpload = async (req, res, section) => {
    try {
        const { department, academicYear } = req.body;
        let files;

        if (req.file) {
            files = { [req.file.fieldname]: [req.file] };
        } else {
            files = req.files;
        }
    
        const data = req.body;

        if (!files || !data) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        const fieldNames = Object.keys(files);
        const uploadedFiles = await Promise.all(fieldNames.map(async fieldName => {
            const file = files[fieldName][0];
            const uniqueFilename = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file.originalname;
            const fileRef = ref(storage, `uploads/${uniqueFilename}`);
            const metadata = { contentType: file.mimetype };

            await uploadBytes(fileRef, file.buffer, metadata);
            return { [fieldName]: await getDownloadURL(fileRef) };
        }));

        const existingData = await Criteria6Model.findOne({ department, academicYear });

        let newData = { ...data };
        uploadedFiles.forEach(file => Object.assign(newData, file));

        if (existingData && existingData[section]) {
            const existingFiles = Object.keys(existingData[section]).filter(fieldName => fieldName.startsWith('file') && existingData[section][fieldName] !== null && existingData[section][fieldName] !== undefined);
            const newFiles = fieldNames;
            const filesToDelete = existingFiles.filter(existingFile => newFiles.includes(existingFile));
        
            await Promise.all(filesToDelete.map(async fileToDelete => {
                const filePath = existingData[section][fileToDelete];
                const fileRef = ref(storage, filePath);
                try {
                    await deleteObject(fileRef);
                    console.log('Existing file deleted successfully:');
                } catch (error) {
                    console.error('Error deleting existing file:', filePath, error);
                }
            }));
        }
        
        if (existingData) {
            newData = { ...existingData[section], ...newData };
        }

        await Criteria6Model.updateOne(
            { department, academicYear },
            { $set: { [section]: newData } },
            { upsert: true }
        );

        res.status(200).json({ message: `Data saved successfully` });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default handleUpload;
