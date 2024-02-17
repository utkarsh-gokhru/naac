import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import { getStorage } from '../firebase.js';
import { ref, getDownloadURL, deleteObject, uploadBytes } from 'firebase/storage';
import Criteria1Model from '../models/criteria1.js';

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
    if (existingData && existingData.criteria11[fieldName]) {
        await deleteExistingFile(existingData.criteria11[fieldName]);
    }

    if (!existingData) {
        existingData = new Criteria1Model({
            department: newData.department,
            academicYear: newData.academicYear,
            criteria11: {
                [fieldName]: newFile.path,
                ...newData,
            }
        });
    } else {
        existingData.criteria11[fieldName] = newFile.path;
        Object.assign(existingData.criteria11, newData);
    }

    await existingData.save();
};

const upload = multer();

app.post('/save1-1-1', upload.single('file1_1_1'), async (req, res) => {
    try {
        const { department, academicYear, curriculumText } = req.body;
        const file1_1_1 = req.file;

        if (!file1_1_1 || !curriculumText) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        const uniqueFilename = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file1_1_1.originalname;
        const fileRef = ref(storage, `uploads/${uniqueFilename}`);
        const metadata = {
            contentType: file1_1_1.mimetype,
        };

        try {
            await uploadBytes(fileRef, file1_1_1.buffer, metadata);
            const filePath = await getDownloadURL(fileRef);

            let existingData = await Criteria1Model.findOne({ department, academicYear });

            await handleFileUpload(existingData, 'file1_1_1', { path: filePath }, { curriculumText, department, academicYear });

            res.status(200).json({ message: 'Data saved successfully for Section 1.1.1' });
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/save1-1-2', upload.fields([{ name: 'file1_1_2_1' }, { name: 'file1_1_2_2' }]), async (req, res) => {
    try {
        const { department, academicYear, syllabusRevisionCount } = req.body;
        const file1_1_2_1 = req.files['file1_1_2_1'][0];
        const file1_1_2_2 = req.files['file1_1_2_2'][0];

        if (!file1_1_2_1 || !file1_1_2_2 || !syllabusRevisionCount) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        const uniqueFilename1 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file1_1_2_1.originalname;
        const fileRef1 = ref(storage, `uploads/${uniqueFilename1}`);
        const metadata1 = {
            contentType: file1_1_2_1.mimetype,
        };

        const uniqueFilename2 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file1_1_2_2.originalname;
        const fileRef2 = ref(storage, `uploads/${uniqueFilename2}`);
        const metadata2 = {
            contentType: file1_1_2_2.mimetype,
        };

        try {
            await Promise.all([
                uploadBytes(fileRef1, file1_1_2_1.buffer, metadata1),
                uploadBytes(fileRef2, file1_1_2_2.buffer, metadata2)
            ]);

            const filePath1 = await getDownloadURL(fileRef1);
            const filePath2 = await getDownloadURL(fileRef2);

            let existingData = await Criteria1Model.findOne({ department, academicYear });

            await handleFileUpload(existingData, 'file1_1_2_1', { path: filePath1 }, {
                syllabusRevisionCount,
                file1_1_2_1: filePath1,
                department,
                academicYear
            });

            await handleFileUpload(existingData, 'file1_1_2_2', { path: filePath2 }, {
                syllabusRevisionCount,
                file1_1_2_2: filePath2,
                department,
                academicYear
            });

            res.status(200).json({ message: 'Data saved successfully for Section 1.1.2' });
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/save1-1-3', upload.fields([{ name: 'file1_1_3_1' }, { name: 'file1_1_3_2' }]), async (req, res) => {
    try {
        const { department, academicYear, coursesFocusCount } = req.body;
        const file1_1_3_1 = req.files['file1_1_3_1'][0];
        const file1_1_3_2 = req.files['file1_1_3_2'][0];

        if (!file1_1_3_1 || !file1_1_3_2 || !coursesFocusCount) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        const uniqueFilename1 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file1_1_3_1.originalname;
        const fileRef1 = ref(storage, `uploads/${uniqueFilename1}`);
        const metadata1 = {
            contentType: file1_1_3_1.mimetype,
        };

        const uniqueFilename2 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file1_1_3_2.originalname;
        const fileRef2 = ref(storage, `uploads/${uniqueFilename2}`);
        const metadata2 = {
            contentType: file1_1_3_2.mimetype,
        };

        try {
            await Promise.all([
                uploadBytes(fileRef1, file1_1_3_1.buffer, metadata1),
                uploadBytes(fileRef2, file1_1_3_2.buffer, metadata2)
            ]);

            const filePath1 = await getDownloadURL(fileRef1);
            const filePath2 = await getDownloadURL(fileRef2);

            let existingData = await Criteria1Model.findOne({ department, academicYear });

            await handleFileUpload(existingData, 'file1_1_3_1', { path: filePath1 }, {
                coursesFocusCount,
                department,
                academicYear
            });

            await handleFileUpload(existingData, 'file1_1_3_2', { path: filePath2 }, {
                coursesFocusCount,
                department,
                academicYear
            });
            
            res.status(200).json({ message: 'Data saved successfully for Section 1.1.3' });
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export { app as C11 };
