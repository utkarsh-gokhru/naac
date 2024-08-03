import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import Criteria6Model from '../models/criteria6.js';
import { getStorage } from '../firebase.js';
import { ref, getDownloadURL, deleteObject, uploadBytes } from 'firebase/storage';

const app = express();

app.use(bodyParser.json());

const storage = getStorage();

//Function to delete the existing files
const deleteExistingFiles = async (data) => {

    const filePaths = [
        // Criteria 61
        data?.criteria61?.file6_1_1,
        data?.criteria61?.file6_1_2,

        // Criteria 62
        data?.criteria62?.file6_2_1,
        data?.criteria62?.file6_2_2,
        data?.criteria62?.file6_2_3_1,
        data?.criteria62?.file6_2_3_2,

        // Criteria 63
        data?.criteria63?.file6_3_1,
        data?.criteria63?.file6_3_2_1,
        data?.criteria63?.file6_3_2_2,
        data?.criteria63?.file6_3_3_1,
        data?.criteria63?.file6_3_3_2,
        data?.criteria63?.file6_3_4_1,
        data?.criteria63?.file6_3_4_2,

        // Criteria 64
        data?.criteria64?.file6_4_1,
        data?.criteria64?.file6_4_2_1,
        data?.criteria64?.file6_4_2_2,
        data?.criteria64?.file6_4_3_1,
        data?.criteria64?.file6_4_3_2,
        data?.criteria64?.file6_4_4,

        // Criteria 65
        data?.criteria65?.file6_5_1,
        data?.criteria65?.file6_5_2_1,
        data?.criteria65?.file6_5_2_2,
        data?.criteria65?.file6_5_3
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

//Function to generate unique file names
function generateUniqueFileName(filename) {
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9_.]/g, '_');
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    return uniquePrefix + '_' + sanitizedFilename;
}

const expectedFileFields = [
    'file6_1_1', 'file6_1_2', 'file6_2_1', 'file6_2_2', 'file6_2_3_1',
    'file6_2_3_2', 'file6_3_1', 'file6_3_2_1', 'file6_3_2_2', 'file6_3_3_1',
    'file6_3_3_2', 'file6_3_4_1', 'file6_3_4_2', 'file6_4_1', 'file6_4_2_1',
    'file6_4_2_2', 'file6_4_3_1', 'file6_4_3_2', 'file6_4_4', 'file6_5_1',
    'file6_5_2_1', 'file6_5_2_2', 'file6_5_3'
];

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

app.post('/criteria6/submit', upload.fields([
    { name: 'file6_1_1', maxCount: 1 },
    { name: 'file6_1_2', maxCount: 1 },
    { name: 'file6_2_1', maxCount: 1 },
    { name: 'file6_2_2', maxCount: 1 },
    { name: 'file6_2_3_1', maxCount: 1 },
    { name: 'file6_2_3_2', maxCount: 1 },
    { name: 'file6_3_1', maxCount: 1 },
    { name: 'file6_3_2_1', maxCount: 1 },
    { name: 'file6_3_2_2', maxCount: 1 },
    { name: 'file6_3_3_1', maxCount: 1 },
    { name: 'file6_3_3_2', maxCount: 1 },
    { name: 'file6_3_4_1', maxCount: 1 },
    { name: 'file6_3_4_2', maxCount: 1 },
    { name: 'file6_4_1', maxCount: 1 },
    { name: 'file6_4_2_1', maxCount: 1 },
    { name: 'file6_4_2_2', maxCount: 1 },
    { name: 'file6_4_3_1', maxCount: 1 },
    { name: 'file6_4_3_2', maxCount: 1 },
    { name: 'file6_4_4', maxCount: 1 },
    { name: 'file6_5_1', maxCount: 1 },
    { name: 'file6_5_2_1', maxCount: 1 },
    { name: 'file6_5_2_2', maxCount: 1 },
    { name: 'file6_5_3', maxCount: 1 }
]), async (req, res) => {
    try {
        const files = req.files;
        const filePaths = {};

        const requiredFileFields = [
            'file6_1_1', 'file6_1_2', 'file6_2_1', 'file6_2_2', 'file6_2_3_1',
            'file6_2_3_2', 'file6_3_1', 'file6_3_2_1', 'file6_3_2_2', 'file6_3_3_1',
            'file6_3_3_2', 'file6_3_4_1', 'file6_3_4_2', 'file6_4_1', 'file6_4_2_1',
            'file6_4_2_2', 'file6_4_3_1', 'file6_4_3_2', 'file6_4_4', 'file6_5_1',
            'file6_5_2_1', 'file6_5_2_2', 'file6_5_3'
        ];

        let existingData = await Criteria6Model.findOne({ department: req.body.department, academicYear: req.body.academicYear });

        const missingFields = requiredFileFields.filter(fieldName => !files[fieldName]);

        if (missingFields.length > 0) {
            for (const missingField of missingFields) {
                if (existingData) {
                    if (missingField.startsWith('file6_1')) {
                        if (existingData.criteria61 && existingData.criteria61.hasOwnProperty(missingField)) {
                            const index = requiredFileFields.indexOf(missingField);
                            if (index !== -1) {
                                requiredFileFields.splice(index, 1);
                                expectedFileFields.splice(index, 1);
                            }
                        }
                    } else if (missingField.startsWith('file6_2')) {
                        if (existingData.criteria62 && existingData.criteria62.hasOwnProperty(missingField)) {
                            const index = requiredFileFields.indexOf(missingField);
                            if (index !== -1) {
                                requiredFileFields.splice(index, 1);
                                expectedFileFields.splice(index, 1);
                            }
                        }
                    } else if (missingField.startsWith('file6_3')) {
                        if (existingData.criteria63 && existingData.criteria63.hasOwnProperty(missingField)) {
                            const index = requiredFileFields.indexOf(missingField);
                            if (index !== -1) {
                                requiredFileFields.splice(index, 1);
                                expectedFileFields.splice(index, 1);
                            }
                        }
                    } else if (missingField.startsWith('file6_4')) {
                        if (existingData.criteria64 && existingData.criteria64.hasOwnProperty(missingField)) {
                            const index = requiredFileFields.indexOf(missingField);
                            if (index !== -1) {
                                requiredFileFields.splice(index, 1);
                                expectedFileFields.splice(index, 1);
                            }
                        }
                    } else if (missingField.startsWith('file6_5')) {
                        if (existingData.criteria64 && existingData.criteria65.hasOwnProperty(missingField)) {
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


        //Storing the file in firebase
        for (const fieldName in files) {
            const field = files[fieldName][0];
            const uniqueFilename = generateUniqueFileName(field.originalname);
            const fileRef = ref(storage, `uploads/${uniqueFilename}`);

            const metadata = {
                contentType: field.mimetype,
            };

            try {
                await uploadBytes(fileRef, field.buffer, metadata);
                filePaths[fieldName] = await getDownloadURL(fileRef);
            } catch (error) {
                console.error(`Error uploading or getting download URL for ${fieldName}:`, error);
            }
        }

        if (existingData) {

            const existingDataCopy = JSON.parse(JSON.stringify(existingData));

            for (let i = 61; i <= 65; i++) {
                const criteria = existingDataCopy[`criteria${i}`];
                for (const x in criteria) {
                    if (x.startsWith('file')) {
                        let fileFound = false;
                        for (const key in req.files) {
                            for (const file of req.files[key]) {
                                const filename = file.fieldname;
                                if (x === filename) {
                                    fileFound = true;
                                    break;
                                }
                            }
                            if (fileFound) {
                                break;
                            }
                        }
                        if (!fileFound) {
                            criteria[x] = '';
                        }
                    }
                }
            }

            await deleteExistingFiles(existingDataCopy);
            const updateResult = await updateExistingData(existingData, filePaths);

            if (updateResult.success) {
                try {
                    existingData.set({
                        criteria61: {
                            text6_1_1: req.body.text6_1_1,
                            file6_1_1: existingData.criteria61.file6_1_1 && filePaths.file6_1_1 ? filePaths.file6_1_1 : existingData.criteria61.file6_1_1 || filePaths.file6_1_1,
                            text6_1_2: req.body.text6_1_2,
                            file6_1_2: existingData.criteria61.file6_1_2 && filePaths.file6_1_2 ? filePaths.file6_1_2 : existingData.criteria61.file6_1_2 || filePaths.file6_1_2,
                        },
                        criteria62: {
                            text6_2_1: req.body.text6_2_1,
                            file6_2_1: existingData.criteria62.file6_2_1 && filePaths.file6_2_1 ? filePaths.file6_2_1 : existingData.criteria62.file6_2_1 || filePaths.file6_2_1,
                            text6_2_2: req.body.text6_2_2,
                            file6_2_2: existingData.criteria62.file6_2_2 && filePaths.file6_2_2 ? filePaths.file6_2_2 : existingData.criteria62.file6_2_2 || filePaths.file6_2_2,
                            data6_2_3: req.body.data6_2_3,
                            file6_2_3_1: existingData.criteria62.file6_2_3_1 && filePaths.file6_2_3_1 ? filePaths.file6_2_3_1 : existingData.criteria62.file6_2_3_1 || filePaths.file6_2_3_1,
                            file6_2_3_2: existingData.criteria62.file6_2_3_2 && filePaths.file6_2_3_2 ? filePaths.file6_2_3_2 : existingData.criteria62.file6_2_3_2 || filePaths.file6_2_3_2,
                        },
                        criteria63: {
                            text6_3_1: req.body.text6_3_1,
                            file6_3_1: existingData.criteria63.file6_3_1 && filePaths.file6_3_1 ? filePaths.file6_3_1 : existingData.criteria63.file6_3_1 || filePaths.file6_3_1,
                            data6_3_2: req.body.data6_3_2,
                            file6_3_2_1: existingData.criteria63.file6_3_2_1 && filePaths.file6_3_2_1 ? filePaths.file6_3_2_1 : existingData.criteria63.file6_3_2_1 || filePaths.file6_3_2_1,
                            file6_3_2_2: existingData.criteria63.file6_3_2_2 && filePaths.file6_3_2_2 ? filePaths.file6_3_2_2 : existingData.criteria63.file6_3_2_2 || filePaths.file6_3_2_2,
                            data6_3_3: req.body.data6_3_3,
                            file6_3_3_1: existingData.criteria63.file6_3_3_1 && filePaths.file6_3_3_1 ? filePaths.file6_3_3_1 : existingData.criteria63.file6_3_3_1 || filePaths.file6_3_3_1,
                            file6_3_3_2: existingData.criteria63.file6_3_3_2 && filePaths.file6_3_3_2 ? filePaths.file6_3_3_2 : existingData.criteria63.file6_3_3_2 || filePaths.file6_3_3_2,
                            data6_3_4: req.body.data6_3_4,
                            file6_3_4_1: existingData.criteria63.file6_3_4_1 && filePaths.file6_3_4_1 ? filePaths.file6_3_4_1 : existingData.criteria63.file6_3_4_1 || filePaths.file6_3_4_1,
                            file6_3_4_2: existingData.criteria63.file6_3_4_2 && filePaths.file6_3_4_2 ? filePaths.file6_3_4_2 : existingData.criteria63.file6_3_4_2 || filePaths.file6_3_4_2,
                        },
                        criteria64: {
                            text6_4_1: req.body.text6_4_1,
                            file6_4_1: existingData.criteria64.file6_4_1 && filePaths.file6_4_1 ? filePaths.file6_4_1 : existingData.criteria64.file6_4_1 || filePaths.file6_4_1,
                            data6_4_2: req.body.data6_4_2,
                            file6_4_2_1: existingData.criteria64.file6_4_2_1 && filePaths.file6_4_2_1 ? filePaths.file6_4_2_1 : existingData.criteria64.file6_4_2_1 || filePaths.file6_4_2_1,
                            file6_4_2_2: existingData.criteria64.file6_4_2_2 && filePaths.file6_4_2_2 ? filePaths.file6_4_2_2 : existingData.criteria64.file6_4_2_2 || filePaths.file6_4_2_2,
                            data6_4_3: req.body.data6_4_3,
                            file6_4_3_1: existingData.criteria64.file6_4_3_1 && filePaths.file6_4_3_1 ? filePaths.file6_4_3_1 : existingData.criteria64.file6_4_3_1 || filePaths.file6_4_3_1,
                            file6_4_3_2: existingData.criteria64.file6_4_3_2 && filePaths.file6_4_3_2 ? filePaths.file6_4_3_2 : existingData.criteria64.file6_4_3_2 || filePaths.file6_4_3_2,
                            text6_4_4: req.body.text6_4_4,
                            file6_4_4: existingData.criteria64.file6_4_4 && filePaths.file6_4_4 ? filePaths.file6_4_4 : existingData.criteria64.file6_4_4 || filePaths.file6_4_4,
                        },
                        criteria65: {
                            text6_5_1: req.body.text6_5_1,
                            file6_5_1: existingData.criteria65.file6_5_1 && filePaths.file6_5_1 ? filePaths.file6_5_1 : existingData.criteria65.file6_5_1 || filePaths.file6_5_1,
                            data6_5_2: req.body.data6_5_2,
                            file6_5_2_1: existingData.criteria65.file6_5_2_1 && filePaths.file6_5_2_1 ? filePaths.file6_5_2_1 : existingData.criteria65.file6_5_2_1 || filePaths.file6_5_2_1,
                            file6_5_2_2: existingData.criteria65.file6_5_2_2 && filePaths.file6_5_2_2 ? filePaths.file6_5_2_2 : existingData.criteria65.file6_5_2_2 || filePaths.file6_5_2_2,
                            text6_5_3: req.body.text6_5_3,
                            file6_5_3: existingData.criteria65.file6_5_3 && filePaths.file6_5_3 ? filePaths.file6_5_3 : existingData.criteria65.file6_5_3 || filePaths.file6_5_3,
                        },
                    });

                    await existingData.save();
                    console.log('Data updated and saved successfully!');
                    res.status(201).send(updateResult.message);
                } catch (error) {
                    console.error('Error saving updated data:', error);
                    res.status(500).send('Internal Server Error');
                }
            }

        } else {
            const newData = new Criteria6Model({
                department: req.body.department,
                academicYear: req.body.academicYear,
                criteria61: {
                    text6_1_1: req.body.text6_1_1,
                    file6_1_1: filePaths.file6_1_1,
                    text6_1_2: req.body.text6_1_2,
                    file6_1_2: filePaths.file6_1_2,
                },
                criteria62: {
                    text6_2_1: req.body.text6_2_1,
                    file6_2_1: filePaths.file6_2_1,
                    text6_2_2: req.body.text6_2_2,
                    file6_2_2: filePaths.file6_2_2,
                    data6_2_3: req.body.data6_2_3,
                    file6_2_3_1: filePaths.file6_2_3_1,
                    file6_2_3_2: filePaths.file6_2_3_2,
                },
                criteria63: {
                    text6_3_1: req.body.text6_3_1,
                    file6_3_1: filePaths.file6_3_1,
                    data6_3_2: req.body.data6_3_2,
                    file6_3_2_1: filePaths.file6_3_2_1,
                    file6_3_2_2: filePaths.file6_3_2_2,
                    data6_3_3: req.body.data6_3_3,
                    file6_3_3_1: filePaths.file6_3_3_1,
                    file6_3_3_2: filePaths.file6_3_3_2,
                    data6_3_4: req.body.data6_3_4,
                    file6_3_4_1: filePaths.file6_3_4_1,
                    file6_3_4_2: filePaths.file6_3_4_2,
                },
                criteria64: {
                    text6_4_1: req.body.text6_4_1,
                    file6_4_1: filePaths.file6_4_1,
                    data6_4_2: req.body.data6_4_2,
                    file6_4_2_1: filePaths.file6_4_2_1,
                    file6_4_2_2: filePaths.file6_4_2_2,
                    data6_4_3: req.body.data6_4_3,
                    file6_4_3_1: filePaths.file6_4_3_1,
                    file6_4_3_2: filePaths.file6_4_3_2,
                    text6_4_4: req.body.text6_4_4,
                    file6_4_4: filePaths.file6_4_4,
                },
                criteria65: {
                    text6_5_1: req.body.text6_5_1,
                    file6_5_1: filePaths.file6_5_1,
                    data6_5_2: req.body.data6_5_2,
                    file6_5_2_1: filePaths.file6_5_2_1,
                    file6_5_2_2: filePaths.file6_5_2_2,
                    text6_5_3: req.body.text6_5_3,
                    file6_5_3: filePaths.file6_5_3,
                },
            });

            try {
                await newData.save();
                console.log('Data saved successfully!');
                res.status(201).send('Data submitted successfully!');
            } catch (error) {
                console.error('Error saving data:', error);
                res.status(500).send('Internal Server Error');
            }
        }


    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

export { app as Criteria6_submit };
