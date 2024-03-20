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
    if (existingData && existingData.criteria21[fieldName]) {
        await deleteExistingFile(existingData.criteria21[fieldName]);
    }

    if (!existingData) {
        existingData = new Criteria2Model({
            department: newData.department,
            academicYear: newData.academicYear,
            criteria21: {
                [fieldName]: newFile.path,
                ...newData,
            }
        });
    } else {
        existingData.criteria21[fieldName] = newFile.path;
        Object.assign(existingData.criteria21, newData);
    }

    await existingData.save();
};

const upload = multer();

app.post('/save2-1-1', upload.fields([{ name: 'file2_1_1_1' }, { name: 'file2_1_1_2' }]), async (req, res) => {
    try {
        const { department, academicYear, no_of_seats } = req.body;
        const file2_1_1_1 = req.files['file2_1_1_1'][0];
        const file2_1_1_2 = req.files['file2_1_1_2'][0];

        if (!file2_1_1_1 || !file2_1_1_2 || !no_of_seats) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        const uniqueFilename1 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file2_1_1_1.originalname;
        const fileRef1 = ref(storage, `uploads/${uniqueFilename1}`);
        const metadata1 = {
            contentType: file2_1_1_1.mimetype,
        };

        const uniqueFilename2 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file2_1_1_2.originalname;
        const fileRef2 = ref(storage, `uploads/${uniqueFilename2}`);
        const metadata2 = {
            contentType: file2_1_1_2.mimetype,
        };

        try {
            await Promise.all([
                uploadBytes(fileRef1, file2_1_1_1.buffer, metadata1),
                uploadBytes(fileRef2, file2_1_1_2.buffer, metadata2)
            ]);

            const filePath1 = await getDownloadURL(fileRef1);
            const filePath2 = await getDownloadURL(fileRef2);

            let existingData = await Criteria2Model.findOne({ department, academicYear });

            await handleFileUpload(existingData, 'file2_1_1_1', { path: filePath1 }, {
                no_of_seats,
                file2_1_1_1: filePath1,
                department,
                academicYear
            });

            await handleFileUpload(existingData, 'file2_1_1_2', { path: filePath2 }, {
                no_of_seats,
                file2_1_1_2: filePath2,
                department,
                academicYear
            });

            res.status(200).json({ message: 'Data saved successfully for Section 2.1.1' });
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/save2-1-2', upload.fields([{ name: 'file2_1_2_1' }, { name: 'file2_1_2_2' }]), async (req, res) => {
    try {
        const { department, academicYear, students_reserved_cat } = req.body;
        const file2_1_2_1 = req.files['file2_1_2_1'][0];
        const file2_1_2_2 = req.files['file2_1_2_2'][0];

        if (!file2_1_2_1 || !file2_1_2_2 || !students_reserved_cat) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        const uniqueFilename1 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file2_1_2_1.originalname;
        const fileRef1 = ref(storage, `uploads/${uniqueFilename1}`);
        const metadata1 = {
            contentType: file2_1_2_1.mimetype,
        };

        const uniqueFilename2 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file2_1_2_2.originalname;
        const fileRef2 = ref(storage, `uploads/${uniqueFilename2}`);
        const metadata2 = {
            contentType: file2_1_2_2.mimetype,
        };

        try {
            await Promise.all([
                uploadBytes(fileRef1, file2_1_2_1.buffer, metadata1),
                uploadBytes(fileRef2, file2_1_2_2.buffer, metadata2)
            ]);

            const filePath1 = await getDownloadURL(fileRef1);
            const filePath2 = await getDownloadURL(fileRef2);

            let existingData = await Criteria2Model.findOne({ department, academicYear });

            await handleFileUpload(existingData, 'file2_1_2_1', { path: filePath1 }, {
                students_reserved_cat,
                file2_1_2_1: filePath1,
                department,
                academicYear
            });

            await handleFileUpload(existingData, 'file2_1_2_2', { path: filePath2 }, {
                students_reserved_cat,
                file2_1_2_2: filePath2,
                department,
                academicYear
            });

            res.status(200).json({ message: 'Data saved successfully for Section 2.1.2' });
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export {app as C21};
