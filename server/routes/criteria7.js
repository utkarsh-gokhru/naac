import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import Criteria7Model from '../models/criteria7.js';
import { getStorage } from '../firebase.js';
import { ref, getDownloadURL, deleteObject, uploadBytes } from 'firebase/storage';

const app = express();

app.use(bodyParser.json());

const storage = getStorage();

const deleteExistingFiles = async (data) => {

    const filePaths = [
        data?.criteria71?.file7_1_1,
        data?.criteria71?.file7_1_2,
        data?.criteria71?.file7_1_3,
        data?.criteria71?.file7_1_4,
        data?.criteria71?.file7_1_5,
        data?.criteria71?.file7_1_6,
        data?.criteria71?.file7_1_7,
        data?.criteria71?.file7_1_8,
        data?.criteria71?.file7_1_10,
        data?.criteria71?.file7_1_11,
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
};

const expectedFileFields = [
    'file7_1_1', 'file7_1_2', 'file7_1_3', 'file7_1_4',
    'file7_1_5', 'file7_1_6', 'file7_1_7', 'file7_1_8',
    'file7_1_10', 'file7_1_11'
];

//Function to update exisiting data in the database
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

//Handling post request 
app.post('/criteria7/submit', upload.fields([
    { name: 'file7_1_1', maxCount: 1 },
    { name: 'file7_1_2', maxCount: 1 },
    { name: 'file7_1_3', maxCount: 1 },
    { name: 'file7_1_4', maxCount: 1 },
    { name: 'file7_1_5', maxCount: 1 },
    { name: 'file7_1_6', maxCount: 1 },
    { name: 'file7_1_7', maxCount: 1 },
    { name: 'file7_1_8', maxCount: 1 },
    { name: 'file7_1_10', maxCount: 1 },
    { name: 'file7_1_11', maxCount: 1 }
]), async (req, res) => {
    try {
        const files = req.files;
        const filePaths = {};

        const requiredFileFields = [
            'file7_1_1', 'file7_1_2', 'file7_1_3', 'file7_1_4',
            'file7_1_5', 'file7_1_6', 'file7_1_7', 'file7_1_8',
            'file7_1_10', 'file7_1_11'
        ];

        let existingData = await Criteria7Model.findOne({ department: req.body.department, academicYear: req.body.academicYear });

        const missingFields = requiredFileFields.filter(fieldName => !files[fieldName]);

        if (missingFields.length > 0) {
            for (const missingField of missingFields) {
                if (existingData) {

                    if (missingField.startsWith('file7_1')) {
                        if (existingData && existingData.criteria71 && existingData.criteria71.hasOwnProperty(missingField)) {
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

            const criteria = existingDataCopy.criteria71;

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

            await deleteExistingFiles(existingDataCopy);
            const updateResult = await updateExistingData(existingData, filePaths);

            if (updateResult.success) {
                try {
                    existingData.set({
                        criteria71: {
                            text7_1_1: req.body.text7_1_1,
                            file7_1_1: existingData.criteria71.file7_1_1 && filePaths.file7_1_1 ? filePaths.file7_1_1 : existingData.criteria71.file7_1_1 || filePaths.file7_1_1,
                            data7_1_2: req.body.data7_1_2,
                            file7_1_2: existingData.criteria71.file7_1_2 && filePaths.file7_1_2 ? filePaths.file7_1_2 : existingData.criteria71.file7_1_2 || filePaths.file7_1_2,
                            text7_1_3: req.body.text7_1_3,
                            file7_1_3: existingData.criteria71.file7_1_3 && filePaths.file7_1_3 ? filePaths.file7_1_3 : existingData.criteria71.file7_1_3 || filePaths.file7_1_3,
                            data7_1_4: req.body.data7_1_4,
                            file7_1_4: existingData.criteria71.file7_1_4 && filePaths.file7_1_4 ? filePaths.file7_1_4 : existingData.criteria71.file7_1_4 || filePaths.file7_1_4,
                            data7_1_5: req.body.data7_1_5,
                            file7_1_5: existingData.criteria71.file7_1_5 && filePaths.file7_1_5 ? filePaths.file7_1_5 : existingData.criteria71.file7_1_5 || filePaths.file7_1_5,
                            data7_1_6: req.body.data7_1_6,
                            file7_1_6: existingData.criteria71.file7_1_6 && filePaths.file7_1_6 ? filePaths.file7_1_6 : existingData.criteria71.file7_1_6 || filePaths.file7_1_6,
                            data7_1_7: req.body.data7_1_7,
                            file7_1_7: existingData.criteria71.file7_1_7 && filePaths.file7_1_7 ? filePaths.file7_1_7 : existingData.criteria71.file7_1_7 || filePaths.file7_1_7,
                            data7_1_8: req.body.data7_1_8,
                            file7_1_8: existingData.criteria71.file7_1_8 && filePaths.file7_1_8 ? filePaths.file7_1_8 : existingData.criteria71.file7_1_8 || filePaths.file7_1_8,
                            text7_1_9: req.body.text7_1_9,
                            data7_1_10: req.body.data7_1_10,
                            file7_1_10: existingData.criteria71.file7_1_10 && filePaths.file7_1_10 ? filePaths.file7_1_10 : existingData.criteria71.file7_1_10 || filePaths.file7_1_10,
                            text7_1_11: req.body.text7_1_11,
                            file7_1_11: existingData.criteria71.file7_1_11 && filePaths.file7_1_11 ? filePaths.file7_1_11 : existingData.criteria71.file7_1_11 || filePaths.file7_1_11,
                        },
                        criteria72: {
                            text7_2_1: req.body.text7_2_1,
                        },
                        criteria73: {
                            text7_3_1: req.body.text7_3_1,
                            text7_3_2: req.body.text7_3_2,
                        }
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
            const newData = new Criteria7Model({
                department: req.body.department,
                academicYear: req.body.academicYear,
                criteria71: {
                    text7_1_1: req.body.text7_1_1,
                    file7_1_1: filePaths.file7_1_1,
                    data7_1_2: req.body.data7_1_2,
                    file7_1_2: filePaths.file7_1_2,
                    text7_1_3: req.body.text7_1_3,
                    file7_1_3: filePaths.file7_1_3,
                    data7_1_4: req.body.data7_1_4,
                    file7_1_4: filePaths.file7_1_4,
                    data7_1_5: req.body.data7_1_5,
                    file7_1_5: filePaths.file7_1_5,
                    data7_1_6: req.body.data7_1_6,
                    file7_1_6: filePaths.file7_1_6,
                    data7_1_7: req.body.data7_1_7,
                    file7_1_7: filePaths.file7_1_7,
                    data7_1_8: req.body.data7_1_8,
                    file7_1_8: filePaths.file7_1_8,
                    text7_1_9: req.body.text7_1_9,
                    data7_1_10: req.body.data7_1_10,
                    file7_1_10: filePaths.file7_1_10,
                    text7_1_11: req.body.text7_1_11,
                    file7_1_11: filePaths.file7_1_11,
                },
                criteria72: {
                    text7_2_1: req.body.text7_2_1,
                },
                criteria73: {
                    text7_3_1: req.body.text7_3_1,
                    text7_3_2: req.body.text7_3_2,
                }
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

export { app as Criteria7_submit };
