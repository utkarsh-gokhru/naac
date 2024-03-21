// import express from 'express';
// import bodyParser from 'body-parser';
// import multer from 'multer';
// import { getStorage } from '../firebase.js';
// import { ref, getDownloadURL, deleteObject, uploadBytes } from 'firebase/storage';
// import Criteria2Model from '../models/criteria2.js.js';

// const app = express();

// app.use(bodyParser.json());

// const storage = getStorage();

// const deleteExistingFile = async (existingFilePath) => {
//     const fileRef = ref(storage, existingFilePath);

//     try {
//         await getDownloadURL(fileRef);
//         await deleteObject(fileRef);
//         console.log('Existing file deleted successfully.');
//     } catch (error) {
//         if (error.code === 'storage/object-not-found') {
//             console.log(`File not found: ${existingFilePath}`);
//         } else {
//             console.error('Error deleting existing file:', error);
//         }
//     }
// };

// const handleFileUpload = async (existingData, fieldName, newFile, newData) => {
//     if (existingData && existingData.criteria22[fieldName]) {
//         await deleteExistingFile(existingData.criteria22[fieldName]);
//     }

//     if (!existingData) {
//         existingData = new Criteria2Model({
//             department: newData.department,
//             academicYear: newData.academicYear,
//             criteria22: {
//                 [fieldName]: newFile.path,
//                 ...newData,
//             }
//         });
//     } else {
//         existingData.criteria22[fieldName] = newFile.path;
//         Object.assign(existingData.criteria22, newData);
//     }

//     await existingData.save();
// };

// const upload = multer();

// app.post('/save2-2-1', upload.single('file2_2_1_1'), async (req, res) => {
//     try {
//         const { department, academicYear, learning_assessment, link2_2_1_2 } = req.body;
//         const file2_2_1_1 = req.file;

//         if (!file2_2_1_1 || !learning_assessment || !link2_2_1_2) {
//             return res.status(400).json({ error: 'Missing required data.' });
//         }

//         const uniqueFilename = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file2_2_1_1.originalname;
//         const fileRef = ref(storage, `uploads/${uniqueFilename}`);
//         const metadata = {
//             contentType: file2_2_1_1.mimetype,
//         };

//         try {
//             await uploadBytes(fileRef, file2_2_1_1.buffer, metadata);
//             const filePath = await getDownloadURL(fileRef);

//             let existingData = await Criteria2Model.findOne({ department, academicYear });

//             await handleFileUpload(existingData, 'file2_2_1_1', { path: filePath }, { learning_assessment, link2_2_1_2, department, academicYear });

//             res.status(200).json({ message: 'Data saved successfully for Section 2.2.1' });
//         } catch (error) {
//             console.error('Error saving data:', error);
//             res.status(500).json({ error: 'Internal Server Error' });
//         }
//     } catch (error) {
//         console.error('Error saving data:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// app.post('/save2-2-2', upload.single('file2_2_2'), async (req, res) => {
//     try {
//         const { department, academicYear, no_of_teachers, no_of_students } = req.body;
//         const file2_2_2 = req.file;

//         if (!file2_2_2 || !no_of_students || !no_of_teachers) {
//             return res.status(400).json({ error: 'Missing required data.' });
//         }

//         const uniqueFilename = Date.now() + '-' + Math.round(Math.random() * 1E9) + '_' + file2_2_2.originalname;
//         const fileRef = ref(storage, `uploads/${uniqueFilename}`);
//         const metadata = {
//             contentType: file2_2_2.mimetype,
//         };

//         try {
//             await uploadBytes(fileRef, file2_2_2.buffer, metadata);
//             const filePath = await getDownloadURL(fileRef);

//             let existingData = await Criteria2Model.findOne({ department, academicYear });

//             await handleFileUpload(existingData, 'file2_2_2', { path: filePath }, { no_of_students, no_of_teachers, department, academicYear });

//             res.status(200).json({ message: 'Data saved successfully for Section 2.2.2' });
//         } catch (error) {
//             console.error('Error saving data:', error);
//             res.status(500).json({ error: 'Internal Server Error' });
//         }
//     } catch (error) {
//         console.error('Error saving data:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// export {app as C22};


import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import handleUpload from '../controllers/criteria2.js';

const app = express();
app.use(bodyParser.json());

const upload = multer();

app.post('/save2-2-1', upload.fields([{ name: 'file2_2_1_1' }]), async (req, res) => {
    handleUpload(req, res, 'criteria22');
});

app.post('/save2-2-2', upload.fields([{ name: 'file2_2_2' }]), async (req, res) => {
    handleUpload(req, res, 'criteria22');
});

export { app as C22 };
