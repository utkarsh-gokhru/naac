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
    if (existingData && existingData.criteria31[fieldName]) {
        await deleteExistingFile(existingData.criteria31[fieldName]);
    }

    if (!existingData) {
        existingData = new Criteria3Model({
            department: newData.department,
            academicYear: newData.academicYear,
            criteria31: {
                [fieldName]: newFile.path,
                ...newData,
            }
        });
    } else {
        existingData.criteria31[fieldName] = newFile.path;
        Object.assign(existingData.criteria31, newData);
    }

    await existingData.save();
};

const upload = multer();

app.post('/save3-1-1', upload.single('file3_1_1'), async (req, res) => {
    try {
        const { department, academicYear, researchFacilities } = req.body;
        const file3_1_1 = req.file;

        if (!file3_1_1 || !researchFacilities) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        const uniqueFilename = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file3_1_1.originalname;
        const fileRef = ref(storage, `uploads/${uniqueFilename}`);
        const metadata = {
            contentType: file3_1_1.mimetype,
        };

        try {
            await uploadBytes(fileRef, file3_1_1.buffer, metadata);
            const filePath = await getDownloadURL(fileRef);

            let existingData = await Criteria3Model.findOne({ department, academicYear });

            await handleFileUpload(existingData, 'file3_1_1', { path: filePath }, { researchFacilities, department, academicYear });

            res.status(200).json({ message: 'Data saved successfully for Section 3.1.1' });
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/save3-1-2', upload.fields([{ name: 'file3_1_2_1' }, { name: 'file3_1_2_2' }]), async (req, res) => {
    try {
        const { department, academicYear, seedMoney } = req.body;
        const file3_1_2_1 = req.files['file3_1_2_1'][0];
        const file3_1_2_2 = req.files['file3_1_2_2'][0];

        if (!file3_1_2_1 || !file3_1_2_2 || !seedMoney) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        const uniqueFilename1 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file3_1_2_1.originalname;
        const fileRef1 = ref(storage, `uploads/${uniqueFilename1}`);
        const metadata1 = {
            contentType: file3_1_2_1.mimetype,
        };

        const uniqueFilename2 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file3_1_2_2.originalname;
        const fileRef2 = ref(storage, `uploads/${uniqueFilename2}`);
        const metadata2 = {
            contentType: file3_1_2_2.mimetype,
        };

        try {
            await Promise.all([
                uploadBytes(fileRef1, file3_1_2_1.buffer, metadata1),
                uploadBytes(fileRef2, file3_1_2_2.buffer, metadata2)
            ]);

            const filePath1 = await getDownloadURL(fileRef1);
            const filePath2 = await getDownloadURL(fileRef2);

            let existingData = await Criteria3Model.findOne({ department, academicYear });

            await handleFileUpload(existingData, 'file3_1_2_1', { path: filePath1 }, {
                seedMoney,
                file3_1_2_1: filePath1,
                department,
                academicYear
            });

            await handleFileUpload(existingData, 'file3_1_2_2', { path: filePath2 }, {
                seedMoney,
                file3_1_2_2: filePath2,
                department,
                academicYear
            });

            res.status(200).json({ message: 'Data saved successfully for Section 3.1.2' });
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/save3-1-3', upload.fields([{ name: 'file3_1_3_1' }, { name: 'file3_1_3_2' }]), async (req, res) => {
    try {
        const { department, academicYear, teachersFellowship } = req.body;
        const file3_1_3_1 = req.files['file3_1_3_1'][0];
        const file3_1_3_2 = req.files['file3_1_3_2'][0];

        if (!file3_1_3_1 || !file3_1_3_2 || !teachersFellowship) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        const uniqueFilename1 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file3_1_3_1.originalname;
        const fileRef1 = ref(storage, `uploads/${uniqueFilename1}`);
        const metadata1 = {
            contentType: file3_1_3_1.mimetype,
        };

        const uniqueFilename2 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file3_1_3_2.originalname;
        const fileRef2 = ref(storage, `uploads/${uniqueFilename2}`);
        const metadata2 = {
            contentType: file3_1_3_2.mimetype,
        };

        try {
            await Promise.all([
                uploadBytes(fileRef1, file3_1_3_1.buffer, metadata1),
                uploadBytes(fileRef2, file3_1_3_2.buffer, metadata2)
            ]);

            const filePath1 = await getDownloadURL(fileRef1);
            const filePath2 = await getDownloadURL(fileRef2);

            let existingData = await Criteria3Model.findOne({ department, academicYear });

            await handleFileUpload(existingData, 'file3_1_3_1', { path: filePath1 }, {
                teachersFellowship,
                file3_1_3_1: filePath1,
                department,
                academicYear
            });

            await handleFileUpload(existingData, 'file3_1_3_2', { path: filePath2 }, {
                teachersFellowship,
                file3_1_2_2: filePath2,
                department,
                academicYear
            });

            res.status(200).json({ message: 'Data saved successfully for Section 3.1.3' });
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/save3-1-4', upload.fields([{ name: 'file3_1_4_1' }, { name: 'file3_1_4_2' }]), async (req, res) => {
    try {
        const { department, academicYear, fellowsEnrolled } = req.body;
        const file3_1_4_1 = req.files['file3_1_4_1'][0];
        const file3_1_4_2 = req.files['file3_1_4_2'][0];

        if (!file3_1_4_1 || !file3_1_4_2 || !fellowsEnrolled) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        const uniqueFilename1 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file3_1_4_1.originalname;
        const fileRef1 = ref(storage, `uploads/${uniqueFilename1}`);
        const metadata1 = {
            contentType: file3_1_4_1.mimetype,
        };

        const uniqueFilename2 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file3_1_4_2.originalname;
        const fileRef2 = ref(storage, `uploads/${uniqueFilename2}`);
        const metadata2 = {
            contentType: file3_1_4_2.mimetype,
        };

        try {
            await Promise.all([
                uploadBytes(fileRef1, file3_1_4_1.buffer, metadata1),
                uploadBytes(fileRef2, file3_1_4_2.buffer, metadata2)
            ]);

            const filePath1 = await getDownloadURL(fileRef1);
            const filePath2 = await getDownloadURL(fileRef2);

            let existingData = await Criteria3Model.findOne({ department, academicYear });

            await handleFileUpload(existingData, 'file3_1_4_1', { path: filePath1 }, {
                fellowsEnrolled,
                file3_1_4_1: filePath1,
                department,
                academicYear
            });

            await handleFileUpload(existingData, 'file3_1_4_2', { path: filePath2 }, {
                fellowsEnrolled,
                file3_1_4_2: filePath2,
                department,
                academicYear
            });

            res.status(200).json({ message: 'Data saved successfully for Section 3.1.4' });
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/save3-1-5', upload.single('file3_1_5'), async (req, res) => {
    try {
        const { department, academicYear, feed_3_1_5_Type } = req.body;
        const file3_1_5 = req.file;

        if (!file3_1_5 || !feed_3_1_5_Type) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        const uniqueFilename = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file3_1_5.originalname;
        const fileRef = ref(storage, `uploads/${uniqueFilename}`);
        const metadata = {
            contentType: file3_1_5.mimetype,
        };

        try {
            await uploadBytes(fileRef, file3_1_5.buffer, metadata);
            const filePath = await getDownloadURL(fileRef);

            let existingData = await Criteria3Model.findOne({ department, academicYear });

            await handleFileUpload(existingData, 'file3_1_5', { path: filePath }, { feed_3_1_5_Type, department, academicYear });

            res.status(200).json({ message: 'Data saved successfully for Section 3.1.5' });
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/save3-1-6', upload.fields([{ name: 'file3_1_6_1' }, { name: 'file3_1_6_2' }]), async (req, res) => {
    try {
        const { department, academicYear, departmentNo } = req.body;
        const file3_1_6_1 = req.files['file3_1_6_1'][0];
        const file3_1_6_2 = req.files['file3_1_6_2'][0];

        if (!file3_1_6_1 || !file3_1_6_2 || !departmentNo) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        const uniqueFilename1 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file3_1_6_1.originalname;
        const fileRef1 = ref(storage, `uploads/${uniqueFilename1}`);
        const metadata1 = {
            contentType: file3_1_6_1.mimetype,
        };

        const uniqueFilename2 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file3_1_6_2.originalname;
        const fileRef2 = ref(storage, `uploads/${uniqueFilename2}`);
        const metadata2 = {
            contentType: file3_1_6_2.mimetype,
        };

        try {
            await Promise.all([
                uploadBytes(fileRef1, file3_1_6_1.buffer, metadata1),
                uploadBytes(fileRef2, file3_1_6_2.buffer, metadata2)
            ]);

            const filePath1 = await getDownloadURL(fileRef1);
            const filePath2 = await getDownloadURL(fileRef2);

            let existingData = await Criteria3Model.findOne({ department, academicYear });

            await handleFileUpload(existingData, 'file3_1_6_1', { path: filePath1 }, {
                departmentNo,
                file3_1_6_1: filePath1,
                department,
                academicYear
            });

            await handleFileUpload(existingData, 'file3_1_6_2', { path: filePath2 }, {
                departmentNo,
                file3_1_6_2: filePath2,
                department,
                academicYear
            });

            res.status(200).json({ message: 'Data saved successfully for Section 3.1.6' });
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export {app as C31};