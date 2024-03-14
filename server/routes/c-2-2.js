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
//     if (existingData && existingData.criteria21[fieldName]) {
//         await deleteExistingFile(existingData.criteria21[fieldName]);
//     }

//     if (!existingData) {
//         existingData = new Criteria1Model({
//             department: newData.department,
//             academicYear: newData.academicYear,
//             criteria21: {
//                 [fieldName]: newFile.path,
//                 ...newData,
//             }
//         });
//     } else {
//         existingData.criteria21[fieldName] = newFile.path;
//         Object.assign(existingData.criteria21, newData);
//     }

//     await existingData.save();
// };

// const upload = multer();

