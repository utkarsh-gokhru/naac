import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import { getStorage } from '../firebase.js';
import { ref, getDownloadURL, deleteObject, uploadBytes } from 'firebase/storage';
import Criteria2Model from '../models/criteria2.js';

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
    if (existingData && existingData.criteria26[fieldName]) {
        await deleteExistingFile(existingData.criteria26[fieldName]);
    }

    if (!existingData) {
        existingData = new Criteria2Model({
            department: newData.department,
            academicYear: newData.academicYear,
            criteria26: {
                [fieldName]: newFile.path,
                ...newData,
            }
        });
    } else {
        existingData.criteria26[fieldName] = newFile.path;
        Object.assign(existingData.criteria26, newData);
    }

    await existingData.save();
};

const upload = multer();

app.post('/save2-6-1', upload.single('file2_6_1'), async (req, res) => {
    try {
        const { department, academicYear, learning_outcomes } = req.body;
        const file2_6_1 = req.file;

        if (!file2_6_1 || !learning_outcomes) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        const uniqueFilename = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file2_6_1.originalname;
        const fileRef = ref(storage, `uploads/${uniqueFilename}`);
        const metadata = {
            contentType: file2_6_1.mimetype,
        };

        try {
            await uploadBytes(fileRef, file2_6_1.buffer, metadata);
            const filePath = await getDownloadURL(fileRef);

            let existingData = await Criteria2Model.findOne({ department, academicYear });

            await handleFileUpload(existingData, 'file2_6_1', { path: filePath }, { learning_outcomes, department, academicYear });

            res.status(200).json({ message: 'Data saved successfully for Section 2.6.1' });
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/save2-6-2', upload.single('file2_6_2'), async (req, res) => {
    try {
        const { department, academicYear, attainment_prog_outcomes } = req.body;
        const file2_6_2 = req.file;

        if (!file2_6_2 || !attainment_prog_outcomes) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        const uniqueFilename = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file2_6_2.originalname;
        const fileRef = ref(storage, `uploads/${uniqueFilename}`);
        const metadata = {
            contentType: file2_6_2.mimetype,
        };

        try {
            await uploadBytes(fileRef, file2_6_2.buffer, metadata);
            const filePath = await getDownloadURL(fileRef);

            let existingData = await Criteria2Model.findOne({ department, academicYear });

            await handleFileUpload(existingData, 'file2_6_2', { path: filePath }, { attainment_prog_outcomes, department, academicYear });

            res.status(200).json({ message: 'Data saved successfully for Section 2.6.2' });
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/save2-6-3', upload.fields([{ name: 'file2_6_3_2_1' }, { name: 'file2_6_3_2_2' }]), async (req, res) => {
    try {
        const { department, academicYear, final_year_students_passed, final_year_students_appeared } = req.body;
        const file2_6_3_2_1 = req.files['file2_6_3_2_1'][0];
        const file2_6_3_2_2 = req.files['file2_6_3_2_2'][0];

        if (!file2_6_3_2_1 || !file2_6_3_2_2 || !final_year_students_passed || !final_year_students_appeared) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        const uniqueFilename1 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file2_6_3_2_1.originalname;
        const fileRef1 = ref(storage, `uploads/${uniqueFilename1}`);
        const metadata1 = {
            contentType: file2_6_3_2_1.mimetype,
        };

        const uniqueFilename2 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file2_6_3_2_2.originalname;
        const fileRef2 = ref(storage, `uploads/${uniqueFilename2}`);
        const metadata2 = {
            contentType: file2_6_3_2_2.mimetype,
        };

        try {
            await Promise.all([
                uploadBytes(fileRef1, file2_6_3_2_1.buffer, metadata1),
                uploadBytes(fileRef2, file2_6_3_2_2.buffer, metadata2)
            ]);

            const filePath1 = await getDownloadURL(fileRef1);
            const filePath2 = await getDownloadURL(fileRef2);

            let existingData = await Criteria2Model.findOne({ department, academicYear });

            await handleFileUpload(existingData, 'file2_6_3_2_1', { path: filePath1 }, {
                final_year_students_passed,
                 final_year_students_appeared,
                file2_6_3_2_1: filePath1,
                department,
                academicYear
            });

            await handleFileUpload(existingData, 'file2_6_3_2_2', { path: filePath2 }, {
                final_year_students_passed,
                 final_year_students_appeared,
                file2_6_3_2_2: filePath2,
                department,
                academicYear
            });

            res.status(200).json({ message: 'Data saved successfully for Section 2.6.3' });
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export { app as C26 };
