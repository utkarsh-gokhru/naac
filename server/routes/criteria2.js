import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import Criteria2Model from '../models/criteria2.js'; // Import Criteria2Model
import { getStorage } from '../firebase.js';
import { ref, getDownloadURL, deleteObject, uploadBytes } from 'firebase/storage';

const app = express();

app.use(bodyParser.json());

const storage = getStorage();

// Function to delete the existing files
const deleteExistingFiles = async (data) => {
    const filePaths = [
        data?.criteria21?.file2_1_1,
        data?.criteria21?.file2_1_2_1,
        data?.criteria21?.file2_1_2_2,
        data?.criteria22?.file2_2_1_1,
        data?.criteria22?.file2_2_1_2,
        data?.criteria22?.file2_2_2_1,
        data?.criteria22?.file2_2_2_2,
        data?.criteria23?.file2_3_1,
        data?.criteria23?.file2_3_2_1,
        data?.criteria23?.file2_3_2_2,
        data?.criteria23?.file2_3_3_1_1,
        data?.criteria23?.file2_3_3_1_2,
        data?.criteria23?.file2_3_4_1,
        data?.criteria23?.file2_3_4_2,
        data?.criteria24?.file2_4_1,
        data?.criteria24?.file2_4_2
    ];

    const deletePromises = filePaths.map(async (filePath) => {
        if (filePath) {
            const fileRef = ref(storage, filePath);

            try {
                await getDownloadURL(fileRef);
                await deleteObject(fileRef);
                return { filePath, status: 'fulfilled' };
            } catch (error) {
                if (error.code === 'storage/object-not-found') {
                    console.log(`File not found: ${filePath}`);
                    return { filePath, status: 'fulfilled' };
                } else {
                    console.error(`Error deleting existing file ${filePath}:`, error);
                    return { filePath, status: 'rejected', error };
                }
            }
        }
    });

    try {
        const results = await Promise.all(deletePromises);
        console.log('Deleted existing files from Firebase Storage');
        return results;
    } catch (err) {
        console.error('Error deleting existing files from Firebase Storage:', err);
        return deletePromises.map(promise => ({ filePath: promise.filePath, status: 'rejected', error: err }));
    }
};

const upload = multer();

// Function to generate unique file names
function generateUniqueFileName(filename) {
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9_.]/g, '_');
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    return uniquePrefix + '_' + sanitizedFilename;
}

const expectedFileFields = [
    'file2_1_1', 'file2_1_2_1', 'file2_1_2_2',
    'file2_2_1_1', 'file2_2_1_2', 'file2_2_2_1',
    'file2_2_2_2', 'file2_3_1', 'file2_3_2_1',
    'file2_3_2_2', 'file2_3_3_1_1', 'file2_3_3_1_2',
    'file2_3_4_1', 'file2_3_4_2', 'file2_4_1',
    'file2_4_2'
];

// Function to update existing data in the database
const updateExistingData = async (existingData, filePaths) => {
    const updateFields = expectedFileFields.reduce((fieldsToUpdate, fieldName) => {
        if (fieldName in filePaths && existingData[fieldName] !== filePaths[fieldName]) {
            fieldsToUpdate[fieldName] = filePaths[fieldName];
        }
        return fieldsToUpdate;
    }, {});

    if (Object.keys(updateFields).length > 0) {
        Object.assign(existingData, updateFields);
        return { success: true, message: 'Data updated successfully!' };
    } else {
        return { success: true, message: 'No new data to update.' };
    }
};

// Handling post request
app.post('/criteria2/submit', upload.fields([
    { name: 'file2_1_1', maxCount: 1 },
    { name: 'file2_1_2_1', maxCount: 1 },
    { name: 'file2_1_2_2', maxCount: 1 },
    { name: 'file2_2_1_1', maxCount: 1 },
    { name: 'file2_2_1_2', maxCount: 1 },
    { name: 'file2_2_2_1', maxCount: 1 },
    { name: 'file2_2_2_2', maxCount: 1 },
    { name: 'file2_3_1', maxCount: 1 },
    { name: 'file2_3_2_1', maxCount: 1 },
    { name: 'file2_3_2_2', maxCount: 1 },
    { name: 'file2_3_3_1_1', maxCount: 1 },
    { name: 'file2_3_3_1_2', maxCount: 1 },
    { name: 'file2_3_4_1', maxCount: 1 },
    { name: 'file2_3_4_2', maxCount: 1 },
    { name: 'file2_4_1', maxCount: 1 },
    { name: 'file2_4_2', maxCount: 1 },
]), async (req, res) => {
    try {
        const files = req.files;
        const filePaths = {};

        const requiredFileFields = [
            'file2_1_1', 'file2_1_2_1', 'file2_1_2_2',
            'file2_2_1_1', 'file2_2_1_2', 'file2_2_2_1',
            'file2_2_2_2', 'file2_3_1', 'file2_3_2_1',
            'file2_3_2_2', 'file2_3_3_1_1', 'file2_3_3_1_2',
            'file2_3_4_1', 'file2_3_4_2', 'file2_4_1',
            'file2_4_2'
        ];

        let existingData = await Criteria2Model.findOne({ department: req.body.department, academicYear: req.body.academicYear });

        const missingFields = requiredFileFields.filter(fieldName => !files[fieldName]);

        if (missingFields.length > 0) {
            for (const missingField of missingFields) {
                if (existingData) {

                    if (missingField.startsWith('file2_1')) {
                        if (existingData && existingData.criteria21 && existingData.criteria21.hasOwnProperty(missingField)) {
                            const index = requiredFileFields.indexOf(missingField);
                            if (index !== -1) {
                                requiredFileFields.splice(index, 1);
                                expectedFileFields.splice(index, 1);
                            }
                        }
                    }

                    else if (missingField.startsWith('file2_2')) {
                        if (existingData && existingData.criteria22 && existingData.criteria22.hasOwnProperty(missingField)) {
                            const index = requiredFileFields.indexOf(missingField);
                            if (index !== -1) {
                                requiredFileFields.splice(index, 1);
                                expectedFileFields.splice(index, 1);
                            }
                        }
                    }

                    else if (missingField.startsWith('file2_3')) {
                        if (existingData && existingData.criteria23 && existingData.criteria23.hasOwnProperty(missingField)) {
                            const index = requiredFileFields.indexOf(missingField);
                            if (index !== -1) {
                                requiredFileFields.splice(index, 1);
                                expectedFileFields.splice(index, 1);
                            }
                        }
                    }

                    else if (missingField.startsWith('file2_4')) {
                        if (existingData && existingData.criteria24 && existingData.criteria24.hasOwnProperty(missingField)) {
                            const index = requiredFileFields.indexOf(missingField);
                            if (index !== -1) {
                                requiredFileFields.splice(index, 1);
                                expectedFileFields.splice(index, 1);
                            }
                        }
                    }
                }
            }     
            if (!requiredFileFields.every(fieldName => files[fieldName])) {
                const errorMessage = 'All required files must be present in the request';
                console.error(errorMessage);
                return res.status(400).send(errorMessage);
            }
        }

        // Storing the file in Firebase
        for (const fieldName in files) {
            const field = files[fieldName][0];
            const uniqueFileName = generateUniqueFileName(field.originalname);
            const fileRef = ref(storage, `criteria2/${uniqueFileName}`);
            
            await uploadBytes(fileRef, field.buffer);
            filePaths[fieldName] = `criteria2/${uniqueFileName}`;
        }

        // Handle existing data
        if (existingData) {
            const deletionResults = await deleteExistingFiles(existingData);
            const updateResult = await updateExistingData(existingData, filePaths);
            res.status(200).send(updateResult);
        } else {
            // Create new document if not found
            const newDocument = new Criteria2Model({
                ...req.body,
                ...filePaths
            });

            await newDocument.save();
            res.status(200).send({ success: true, message: 'Data saved successfully!' });
        }
    } catch (err) {
        console.error('Error processing request:', err);
        res.status(500).send('Internal Server Error');
    }
});

export {app as Criteria2_submit};
