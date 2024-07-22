// import express from 'express';
// import bodyParser from 'body-parser';
// import multer from 'multer';
// import Criteria1Model from '../models/criteria1.js';
// import { getStorage } from '../firebase.js';
// import { ref, getDownloadURL, deleteObject, uploadBytes } from 'firebase/storage';

// const app = express();
// app.use(bodyParser.json());
// const storage = getStorage();
// const upload = multer();

// // Common file fields used across the code
// const fileFields = [
//     'file1_1_1', 'file1_1_2_1', 'file1_1_2_2', 'file1_1_3_1',
//     'file1_1_3_2', 'file1_2_1_1', 'file1_2_1_2', 'file1_2_2_1',
//     'file1_2_2_2', 'file1_3_1', 'file1_3_2_1', 'file1_3_2_2',
//     'file1_3_3_1_1', 'file1_3_3_1_2', 'file1_3_4_1', 'file1_3_4_2',
//     'file1_4_1', 'file1_4_2'
// ];

// // Function to delete the existing files
// const deleteExistingFiles = async (data) => {
//     const filePaths = fileFields.map(field => data?.criteria11?.[field] || data?.criteria12?.[field] || data?.criteria13?.[field] || data?.criteria14?.[field]);
//     const deletePromises = filePaths.map(async (filePath) => {
//         if (filePath) {
//             const fileRef = ref(storage, filePath);
//             try {
//                 await getDownloadURL(fileRef);
//                 await deleteObject(fileRef);
//                 return { filePath, status: 'fulfilled' };
//             } catch (error) {
//                 if (error.code === 'storage/object-not-found') {
//                     console.log(`File not found: ${filePath}`);
//                     return { filePath, status: 'fulfilled' };
//                 } else {
//                     console.error(`Error deleting existing file ${filePath}:`, error);
//                     return { filePath, status: 'rejected', error };
//                 }
//             }
//         }
//     });
//     try {
//         const results = await Promise.all(deletePromises);
//         console.log('Deleted existing files from Firebase Storage');
//         return results;
//     } catch (err) {
//         console.error('Error deleting existing files from Firebase Storage:', err);
//         return deletePromises.map(promise => ({ filePath: promise.filePath, status: 'rejected', error: err }));
//     }
// };

// // Function to generate unique file names
// const generateUniqueFileName = (filename) => {
//     const sanitizedFilename = filename.replace(/[^a-zA-Z0-9_.]/g, '_');
//     const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     return `${uniquePrefix}_${sanitizedFilename}`;
// };

// // Function to update existing data in the database
// const updateExistingData = async (existingData, filePaths) => {
//     const updateFields = fileFields.reduce((fieldsToUpdate, fieldName) => {
//         if (fieldName in filePaths && existingData[fieldName] !== filePaths[fieldName]) {
//             fieldsToUpdate[fieldName] = filePaths[fieldName];
//         }
//         return fieldsToUpdate;
//     }, {});

//     if (Object.keys(updateFields).length > 0) {
//         Object.assign(existingData, updateFields);
//         return { success: true, message: 'Data updated successfully!' };
//     } else {
//         return { success: true, message: 'No new data to update.' };
//     }
// };

// // Handling post request 
// app.post('/criteria1/submit', upload.fields(fileFields.map(field => ({ name: field, maxCount: 1 }))), async (req, res) => {
//     try {
//         const files = req.files;
//         const filePaths = {};
//         const requiredFileFields = [...fileFields];
//         let existingData = await Criteria1Model.findOne({ department: req.body.department, academicYear: req.body.academicYear });

//         const missingFields = requiredFileFields.filter(field => !files[field]);

//         if (missingFields.length > 0 && existingData) {
//             for (const missingField of missingFields) {
//                 const criteriaKey = `criteria${missingField.split('_')[0].slice(-1)}`;
//                 if (existingData[criteriaKey]?.hasOwnProperty(missingField)) {
//                     requiredFileFields.splice(requiredFileFields.indexOf(missingField), 1);
//                 }
//             }
//             if (!requiredFileFields.every(field => files[field])) {
//                 return res.status(400).send('All required files must be present in the request');
//             }
//         }

//         // Storing the files in Firebase
//         for (const field in files) {
//             const file = files[field][0];
//             const uniqueFilename = generateUniqueFileName(file.originalname);
//             const fileRef = ref(storage, `uploads/${uniqueFilename}`);
//             try {
//                 await uploadBytes(fileRef, file.buffer, { contentType: file.mimetype });
//                 filePaths[field] = await getDownloadURL(fileRef);
//             } catch (error) {
//                 console.error(`Error uploading or getting download URL for ${field}:`, error);
//             }
//         }

//         if (existingData) {
//             const existingDataCopy = JSON.parse(JSON.stringify(existingData));
//             ['criteria11', 'criteria12', 'criteria13', 'criteria14'].forEach(criteriaKey => {
//                 const criteria = existingDataCopy[criteriaKey];
//                 for (const key in criteria) {
//                     if (key.startsWith('file') && !files[key]) {
//                         criteria[key] = '';
//                     }
//                 }
//             });
//             await deleteExistingFiles(existingDataCopy);
//             const updateResult = await updateExistingData(existingData, filePaths);

//             if (updateResult.success) {
//                 try {
//                     Object.assign(existingData, {
//                         criteria11: {
//                             ...req.body,
//                             ...filePaths
//                         },
//                         criteria12: {
//                             ...req.body,
//                             ...filePaths
//                         },
//                         criteria13: {
//                             ...req.body,
//                             ...filePaths
//                         },
//                         criteria14: {
//                             ...req.body,
//                             ...filePaths
//                         },
//                     });
//                     await existingData.save();
//                     res.status(201).send(updateResult.message);
//                 } catch (error) {
//                     console.error('Error saving updated data:', error);
//                     res.status(500).send('Internal Server Error');
//                 }
//             }
//         } else {
//             const newData = new Criteria1Model({
//                 department: req.body.department,
//                 academicYear: req.body.academicYear,
//                 criteria11: { ...req.body, ...filePaths },
//                 criteria12: { ...req.body, ...filePaths },
//                 criteria13: { ...req.body, ...filePaths },
//                 criteria14: { ...req.body, ...filePaths }
//             });

//             try {
//                 await newData.save();
//                 res.status(201).send('Data submitted successfully!');
//             } catch (error) {
//                 console.error('Error saving data:', error);
//                 res.status(500).send('Internal Server Error');
//             }
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// export { app as Criteria1_submit };
