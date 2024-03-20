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
                criteria52: {},
            });
        }

        fieldNames.forEach((fieldName, index) => {
            const newFile = newFiles[index];
            if (existingData.criteria52[fieldName]) {
                deleteExistingFile(existingData.criteria52[fieldName]);
            }
            existingData.criteria52[fieldName] = newFile.path;
        });

        Object.assign(existingData.criteria52, newData);

        await existingData.save();
    } catch (error) {
        throw new Error('Error handling file upload: ' + error.message);
    }
};

const upload = multer();

app.post('/save5-2-1', upload.fields([{ name: 'file5_2_1_1' }, { name: 'file5_2_1_2' }]), async (req, res) => {
    try {
        const { department, academicYear, students_qualified, students_appeared } = req.body;
        const file5_2_1_1 = req.files['file5_2_1_1'][0];
        const file5_2_1_2 = req.files['file5_2_1_2'][0];

        if (!file5_2_1_1 || !file5_2_1_2 || !students_qualified || !students_appeared ) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        const uniqueFilename1 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file5_2_1_1.originalname;
        const fileRef1 = ref(storage, `uploads/${uniqueFilename1}`);
        const metadata1 = {
            contentType: file5_2_1_1.mimetype,
        };

        const uniqueFilename2 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file5_2_1_2.originalname;
        const fileRef2 = ref(storage, `uploads/${uniqueFilename2}`);
        const metadata2 = {
            contentType: file5_2_1_2.mimetype,
        };

        try {
            await Promise.all([
                uploadBytes(fileRef1, file5_2_1_1.buffer, metadata1),
                uploadBytes(fileRef2, file5_2_1_2.buffer, metadata2)
            ]);

            const filePath1 = await getDownloadURL(fileRef1);
            const filePath2 = await getDownloadURL(fileRef2);

            let existingData = await Criteria5Model.findOne({ department, academicYear });

            await handleFileUpload(existingData, ['file5_2_1_1','file5_2_1_2'], [{ path: filePath1 },{ path: filePath2 }], {
                students_qualified, 
                students_appeared,
                department,
                academicYear
            });

            // await handleFileUpload(existingData, 'file5_2_1_2', { path: filePath2 }, {
            //     students_qualified, 
            //     students_appeared,
            //     file5_2_1_2: filePath2,
            //     department,
            //     academicYear
            // });

            res.status(200).json({ message: 'Data saved successfully for Section 5.2.1' });
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/save5-2-2', upload.fields([{ name: 'file5_2_2_1' }, { name: 'file5_2_2_2' }]), async (req, res) => {
    try {
        const { department, academicYear, placement_no } = req.body;
        const file5_2_2_1 = req.files['file5_2_2_1'][0];
        const file5_2_2_2 = req.files['file5_2_2_2'][0];

        if (!file5_2_2_1 || !file5_2_2_2 || !placement_no) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        const uniqueFilename1 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file5_2_2_1.originalname;
        const fileRef1 = ref(storage, `uploads/${uniqueFilename1}`);
        const metadata1 = {
            contentType: file5_2_2_1.mimetype,
        };

        const uniqueFilename2 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file5_2_2_2.originalname;
        const fileRef2 = ref(storage, `uploads/${uniqueFilename2}`);
        const metadata2 = {
            contentType: file5_2_2_2.mimetype,
        };

        try {
            await Promise.all([
                uploadBytes(fileRef1, file5_2_2_1.buffer, metadata1),
                uploadBytes(fileRef2, file5_2_2_2.buffer, metadata2)
            ]);

            const filePath1 = await getDownloadURL(fileRef1);
            const filePath2 = await getDownloadURL(fileRef2);

            let existingData = await Criteria5Model.findOne({ department, academicYear });

            await handleFileUpload(existingData, ['file5_2_2_1','file5_2_2_2'], [{ path: filePath1 },{ path: filePath2 }], {
                placement_no,
                department,
                academicYear
            });

            // await handleFileUpload(existingData, 'file5_2_2_2', { path: filePath2 }, {
            //     placement_no,
            //     department,
            //     academicYear
            // });

            res.status(200).json({ message: 'Data saved successfully for Section 5.2.2' });
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/save5-2-3', upload.fields([{ name: 'file5_2_3_1' }, { name: 'file5_2_3_2' }]), async (req, res) => {
    try {
        const { department, academicYear, higher_studies_students } = req.body;
        const file5_2_3_1 = req.files['file5_2_3_1'][0];
        const file5_2_3_2 = req.files['file5_2_3_2'][0];

        if (!file5_2_3_1 || !file5_2_3_2 || !higher_studies_students) {
            return res.status(400).json({ error: 'Missing required data.' });
        }

        const uniqueFilename1 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file5_2_3_1.originalname;
        const fileRef1 = ref(storage, `uploads/${uniqueFilename1}`);
        const metadata1 = {
            contentType: file5_2_3_1.mimetype,
        };

        const uniqueFilename2 = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file5_2_3_2.originalname;
        const fileRef2 = ref(storage, `uploads/${uniqueFilename2}`);
        const metadata2 = {
            contentType: file5_2_3_2.mimetype,
        };

        try {
            await Promise.all([
                uploadBytes(fileRef1, file5_2_3_1.buffer, metadata1),
                uploadBytes(fileRef2, file5_2_3_2.buffer, metadata2)
            ]);

            const filePath1 = await getDownloadURL(fileRef1);
            const filePath2 = await getDownloadURL(fileRef2);

            let existingData = await Criteria5Model.findOne({ department, academicYear });

            await handleFileUpload(existingData, ['file5_2_3_1','file5_2_3_2'], [{ path: filePath1 },{ path: filePath2 }], {
                higher_studies_students,
                department,
                academicYear
            });

            // await handleFileUpload(existingData, 'file5_2_3_2', { path: filePath2 }, {
            //     higher_studies_students,
            //     file5_2_3_2: filePath2,
            //     department,
            //     academicYear
            // });

            res.status(200).json({ message: 'Data saved successfully for Section 5.2.3' });
        } catch (error) {
            console.error('Error saving data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export { app as C52 };
