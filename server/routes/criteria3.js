import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import Criteria3Model from '../models/criteria3.js';
import { getStorage } from '../firebase.js';
import { ref, getDownloadURL, deleteObject, uploadBytes } from 'firebase/storage';

const app = express();

app.use(bodyParser.json());

const storage = getStorage();

// Define multer middleware for file uploads
const upload = multer();

// Function to generate a unique file name
function generateUniqueFileName(filename) {
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9_.]/g, '_');
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    return uniquePrefix + '_' + sanitizedFilename;
}

// Function to delete existing files from storage
const deleteExistingFiles = async (data) => {

    const filePaths = [
        data?.criteria31?.file3_1_1,
        data?.criteria31?.file3_1_2_1,
        data?.criteria31?.file3_1_2_2,
        data?.criteria31?.file3_1_3_1,
        data?.criteria31?.file3_1_3_2,
        data?.criteria31?.file3_1_4_1,
        data?.criteria31?.file3_1_4_2,
        data?.criteria31?.file3_1_5,
        data?.criteria31?.file3_1_6_1,
        data?.criteria31?.file3_1_6_2,
        data?.criteria32?.file3_2_1_1,
        data?.criteria32?.file3_2_1_2,
        data?.criteria32?.file3_2_2_1,
        data?.criteria32?.file3_2_2_2,
        data?.criteria32?.file3_2_3_1,
        data?.criteria32?.file3_2_3_2,
        data?.criteria33?.file3_3_1,
        data?.criteria33?.file3_3_2_1,
        data?.criteria33?.file3_3_2_2,
        data?.criteria33?.file3_3_3_1,
        data?.criteria33?.file3_3_3_2,
        data?.criteria34?.file3_4_1,
        data?.criteria34?.file3_4_2_1,
        data?.criteria34?.file3_4_2_2,
        data?.criteria34?.file3_4_3_1,
        data?.criteria34?.file3_4_3_2,
        data?.criteria34?.file3_4_4_1,
        data?.criteria34?.file3_4_4_2,
        data?.criteria34?.file3_4_5_1,
        data?.criteria34?.file3_4_5_2,
        data?.criteria34?.file3_4_6_1,
        data?.criteria34?.file3_4_6_2,
        data?.criteria34?.file3_4_7_1,
        data?.criteria34?.file3_4_7_2,
        data?.criteria34?.file3_4_8_1,
        data?.criteria34?.file3_4_8_2,
        data?.criteria34?.file3_4_9_1,
        data?.criteria34?.file3_4_9_2,
        data?.criteria35?.file3_5_1,
        data?.criteria35?.file3_5_2_1,
        data?.criteria35?.file3_5_2_2,
        data?.criteria36?.file3_6_1,
        data?.criteria36?.file3_6_2_1,
        data?.criteria36?.file3_6_2_2,
        data?.criteria36?.file3_6_3_1,
        data?.criteria36?.file3_6_3_2,
        data?.criteria36?.file3_6_4_1,
        data?.criteria36?.file3_6_4_2,
        data?.criteria37?.file3_7_1_1,
        data?.criteria37?.file3_7_1_2,
        data?.criteria37?.file3_7_2_1,
        data?.criteria37?.file3_7_2_2,
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

const expectedFileFields = [
    'file3_1_1', 'file3_1_2_1', 'file3_1_2_2', 'file3_1_3_1',
    'file3_1_3_2', 'file3_1_4_1', 'file3_1_4_2', 'file3_1_5',
    'file3_1_6_1', 'file3_1_6_2', 'file3_2_1_1', 'file3_2_1_2',
    'file3_2_2_1', 'file3_2_2_2', 'file3_2_3_1', 'file3_2_3_2',
    'file3_3_1', 'file3_3_2_1', 'file3_3_2_2', 'file3_3_3_1',
    'file3_3_3_2', 'file3_4_1', 'file3_4_2_1', 'file3_4_2_2',
    'file3_4_3_1', 'file3_4_3_2', 'file3_4_4_1', 'file3_4_4_2',
    'file3_4_5_1', 'file3_4_5_2', 'file3_4_6_1', 'file3_4_6_2',
    'file3_4_7_1', 'file3_4_7_2', 'file3_4_8_1', 'file3_4_8_2',
    'file3_4_9_1', 'file3_4_9_2', 'file3_5_1', 'file3_5_2_1',
    'file3_5_2_2', 'file3_6_1', 'file3_6_2_1', 'file3_6_2_2',
    'file3_6_3_1', 'file3_6_3_2', 'file3_6_4_1', 'file3_6_4_2',
    'file3_7_1_1', 'file3_7_1_2', 'file3_7_2_1', 'file3_7_2_2'
];


// Function to update existing data with new file paths
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
app.post('/criteria3/submit', upload.fields([
    { name: 'file3_1_1', maxCount: 1 },
    { name: 'file3_1_2_1', maxCount: 1 },
    { name: 'file3_1_2_2', maxCount: 1 },
    { name: 'file3_1_3_1', maxCount: 1 },
    { name: 'file3_1_3_2', maxCount: 1 },
    { name: 'file3_1_4_1', maxCount: 1 },
    { name: 'file3_1_4_2', maxCount: 1 },
    { name: 'file3_1_5', maxCount: 1 },
    { name: 'file3_1_6_1', maxCount: 1 },
    { name: 'file3_1_6_2', maxCount: 1 },
    { name: 'file3_2_1_1', maxCount: 1 },
    { name: 'file3_2_1_2', maxCount: 1 },
    { name: 'file3_2_2_1', maxCount: 1 },
    { name: 'file3_2_2_2', maxCount: 1 },
    { name: 'file3_2_3_1', maxCount: 1 },
    { name: 'file3_2_3_2', maxCount: 1 },
    { name: 'file3_3_1', maxCount: 1 },
    { name: 'file3_3_2_1', maxCount: 1 },
    { name: 'file3_3_2_2', maxCount: 1 },
    { name: 'file3_3_3_1', maxCount: 1 },
    { name: 'file3_3_3_2', maxCount: 1 },
    { name: 'file3_4_1', maxCount: 1 },
    { name: 'file3_4_2_1', maxCount: 1 },
    { name: 'file3_4_2_2', maxCount: 1 },
    { name: 'file3_4_3_1', maxCount: 1 },
    { name: 'file3_4_3_2', maxCount: 1 },
    { name: 'file3_4_4_1', maxCount: 1 },
    { name: 'file3_4_4_2', maxCount: 1 },
    { name: 'file3_4_5_1', maxCount: 1 },
    { name: 'file3_4_5_2', maxCount: 1 },
    { name: 'file3_4_6_1', maxCount: 1 },
    { name: 'file3_4_6_2', maxCount: 1 },
    { name: 'file3_4_7_1', maxCount: 1 },
    { name: 'file3_4_7_2', maxCount: 1 },
    { name: 'file3_4_8_1', maxCount: 1 },
    { name: 'file3_4_8_2', maxCount: 1 },
    { name: 'file3_4_9_1', maxCount: 1 },
    { name: 'file3_4_9_2', maxCount: 1 },
    { name: 'file3_5_1', maxCount: 1 },
    { name: 'file3_5_2_1', maxCount: 1 },
    { name: 'file3_5_2_2', maxCount: 1 },
    { name: 'file3_6_1', maxCount: 1 },
    { name: 'file3_6_2_1', maxCount: 1 },
    { name: 'file3_6_2_2', maxCount: 1 },
    { name: 'file3_6_3_1', maxCount: 1 },
    { name: 'file3_6_3_2', maxCount: 1 },
    { name: 'file3_6_4_1', maxCount: 1 },
    { name: 'file3_6_4_2', maxCount: 1 },
    { name: 'file3_7_1_1', maxCount: 1 },
    { name: 'file3_7_1_2', maxCount: 1 },
    { name: 'file3_7_2_1', maxCount: 1 },
    { name: 'file3_7_2_2', maxCount: 1 }
]), async (req, res) => {
    try {
        const files = req.files;
        const filePaths = {};

        const requiredFileFields = [
            'file3_1_1', 'file3_1_2_1', 'file3_1_2_2', 'file3_1_3_1',
            'file3_1_3_2', 'file3_1_4_1', 'file3_1_4_2', 'file3_1_5',
            'file3_1_6_1', 'file3_1_6_2', 'file3_2_1_1', 'file3_2_1_2',
            'file3_2_2_1', 'file3_2_2_2', 'file3_2_3_1', 'file3_2_3_2',
            'file3_3_1', 'file3_3_2_1', 'file3_3_2_2', 'file3_3_3_1',
            'file3_3_3_2', 'file3_4_1', 'file3_4_2_1', 'file3_4_2_2',
            'file3_4_3_1', 'file3_4_3_2', 'file3_4_4_1', 'file3_4_4_2',
            'file3_4_5_1', 'file3_4_5_2', 'file3_4_6_1', 'file3_4_6_2',
            'file3_4_7_1', 'file3_4_7_2', 'file3_4_8_1', 'file3_4_8_2',
            'file3_4_9_1', 'file3_4_9_2', 'file3_5_1', 'file3_5_2_1',
            'file3_5_2_2', 'file3_6_1', 'file3_6_2_1', 'file3_6_2_2',
            'file3_6_3_1', 'file3_6_3_2', 'file3_6_4_1', 'file3_6_4_2',
            'file3_7_1_1', 'file3_7_1_2', 'file3_7_2_1', 'file3_7_2_2'
        ];

        let existingData = await Criteria3Model.findOne({ department: req.body.department, academicYear: req.body.academicYear });

        const missingFields = requiredFileFields.filter(fieldName => !files[fieldName]);

        if (missingFields.length > 0) {
            for (const missingField of missingFields) {
                if (existingData) {

                    if (missingField.startsWith('file3_1')) {
                        if (existingData && existingData.criteria31 && existingData.criteria31.hasOwnProperty(missingField)) {
                            const index = requiredFileFields.indexOf(missingField);
                            if (index !== -1) {
                                requiredFileFields.splice(index, 1);
                                expectedFileFields.splice(index, 1);
                            }
                        }
                    }

                    else if (missingField.startsWith('file3_2')) {
                        if (existingData && existingData.criteria32 && existingData.criteria32.hasOwnProperty(missingField)) {
                            const index = requiredFileFields.indexOf(missingField);
                            if (index !== -1) {
                                requiredFileFields.splice(index, 1);
                                expectedFileFields.splice(index, 1);
                            }
                        }
                    }

                    else if (missingField.startsWith('file3_3')) {
                        if (existingData && existingData.criteria33 && existingData.criteria33.hasOwnProperty(missingField)) {
                            const index = requiredFileFields.indexOf(missingField);
                            if (index !== -1) {
                                requiredFileFields.splice(index, 1);
                                expectedFileFields.splice(index, 1);
                            }
                        }
                    }

                    else if (missingField.startsWith('file3_4')) {
                        if (existingData && existingData.criteria34 && existingData.criteria34.hasOwnProperty(missingField)) {
                            const index = requiredFileFields.indexOf(missingField);
                            if (index !== -1) {
                                requiredFileFields.splice(index, 1);
                                expectedFileFields.splice(index, 1);
                            }
                        }
                    }
                    else if (missingField.startsWith('file3_5')) {
                        if (existingData && existingData.criteria35 && existingData.criteria35.hasOwnProperty(missingField)) {
                            const index = requiredFileFields.indexOf(missingField);
                            if (index !== -1) {
                                requiredFileFields.splice(index, 1);
                                expectedFileFields.splice(index, 1);
                            }
                        }
                    }
                    else if (missingField.startsWith('file3_6')) {
                        if (existingData && existingData.criteria36 && existingData.criteria36.hasOwnProperty(missingField)) {
                            const index = requiredFileFields.indexOf(missingField);
                            if (index !== -1) {
                                requiredFileFields.splice(index, 1);
                                expectedFileFields.splice(index, 1);
                            }
                        }
                    }
                    else if (missingField.startsWith('file3_7')) {
                        if (existingData && existingData.criteria37 && existingData.criteria37.hasOwnProperty(missingField)) {
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

            for (let i = 31; i <= 37; i++) {
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
                        criteria31: {
                            researchFacilities: req.body.researchFacilities,
                            file3_1_1: existingData.criteria31.file3_1_1 && filePaths.file3_1_1 ? filePaths.file3_1_1 : existingData.criteria31.file3_1_1 || filePaths.file3_1_1,
                            seedMoney: req.body.seedMoney,
                            file3_1_2_1: existingData.criteria31.file3_1_2_1 && filePaths.file3_1_2_1 ? filePaths.file3_1_2_1 : existingData.criteria31.file3_1_2_1 || filePaths.file3_1_2_1,
                            file3_1_2_2: existingData.criteria31.file3_1_2_2 && filePaths.file3_1_2_2 ? filePaths.file3_1_2_2 : existingData.criteria31.file3_1_2_2 || filePaths.file3_1_2_2,
                            teachersFellowship: req.body.teachersFellowship,
                            file3_1_3_1: existingData.criteria31.file3_1_3_1 && filePaths.file3_1_3_1 ? filePaths.file3_1_3_1 : existingData.criteria31.file3_1_3_1 || filePaths.file3_1_3_1,
                            file3_1_3_2: existingData.criteria31.file3_1_3_2 && filePaths.file3_1_3_2 ? filePaths.file3_1_3_2 : existingData.criteria31.file3_1_3_2 || filePaths.file3_1_3_2,
                            fellowsEnrolled: req.body.fellowsEnrolled,
                            file3_1_4_1: existingData.criteria31.file3_1_4_1 && filePaths.file3_1_4_1 ? filePaths.file3_1_4_1 : existingData.criteria31.file3_1_4_1 || filePaths.file3_1_4_1,
                            file3_1_4_2: existingData.criteria31.file3_1_4_2 && filePaths.file3_1_4_2 ? filePaths.file3_1_4_2 : existingData.criteria31.file3_1_4_2 || filePaths.file3_1_4_2,
                            feed_3_1_5_Type: req.body.feed_3_1_5_Type,
                            file3_1_5: existingData.criteria31.file3_1_5 && filePaths.file3_1_5 ? filePaths.file3_1_5 : existingData.criteria31.file3_1_5 || filePaths.file3_1_5,
                            departmentNo: req.body.departmentNo,
                            file3_1_6_1: existingData.criteria31.file3_1_6_1 && filePaths.file3_1_6_1 ? filePaths.file3_1_6_1 : existingData.criteria31.file3_1_6_1 || filePaths.file3_1_6_1,
                            file3_1_6_2: existingData.criteria31.file3_1_6_2 && filePaths.file3_1_6_2 ? filePaths.file3_1_6_2 : existingData.criteria31.file3_1_6_2 || filePaths.file3_1_6_2,
                        }
                        ,
                        criteria32: {
                            extraFunding: req.body.extraFunding,
                            file3_2_1_1: existingData.criteria32.file3_2_1_1 && filePaths.file3_2_1_1 ? filePaths.file3_2_1_1 : existingData.criteria32.file3_2_1_1 || filePaths.file3_2_1_1,
                            file3_2_1_2: existingData.criteria32.file3_2_1_2 && filePaths.file3_2_1_2 ? filePaths.file3_2_1_2 : existingData.criteria32.file3_2_1_2 || filePaths.file3_2_1_2,
                            grants: req.body.grants,
                            file3_2_2_1: existingData.criteria32.file3_2_2_1 && filePaths.file3_2_2_1 ? filePaths.file3_2_2_1 : existingData.criteria32.file3_2_2_1 || filePaths.file3_2_2_1,
                            file3_2_2_2: existingData.criteria32.file3_2_2_2 && filePaths.file3_2_2_2 ? filePaths.file3_2_2_2 : existingData.criteria32.file3_2_2_2 || filePaths.file3_2_2_2,
                            teacherResearchProjects: req.body.teacherResearchProjects,
                            file3_2_3_1: existingData.criteria32.file3_2_3_1 && filePaths.file3_2_3_1 ? filePaths.file3_2_3_1 : existingData.criteria32.file3_2_3_1 || filePaths.file3_2_3_1,
                            file3_2_3_2: existingData.criteria32.file3_2_3_2 && filePaths.file3_2_3_2 ? filePaths.file3_2_3_2 : existingData.criteria32.file3_2_3_2 || filePaths.file3_2_3_2,
                        },
                        criteria33: {
                            ecosystemText: req.body.ecosystemText,
                            file3_3_1: existingData.criteria33.file3_3_1 && filePaths.file3_3_1 ? filePaths.file3_3_1 : existingData.criteria33.file3_3_1 || filePaths.file3_3_1,
                            seminars: req.body.seminars,
                            totalSeminars: req.body.totalSeminars,
                            file3_3_2_1: existingData.criteria33.file3_3_2_1 && filePaths.file3_3_2_1 ? filePaths.file3_3_2_1 : existingData.criteria33.file3_3_2_1 || filePaths.file3_3_2_1,
                            file3_3_2_2: existingData.criteria33.file3_3_2_2 && filePaths.file3_3_2_2 ? filePaths.file3_3_2_2 : existingData.criteria33.file3_3_2_2 || filePaths.file3_3_2_2,
                            awards: req.body.awards,
                            file3_3_3_1: existingData.criteria33.file3_3_3_1 && filePaths.file3_3_3_1 ? filePaths.file3_3_3_1 : existingData.criteria33.file3_3_3_1 || filePaths.file3_3_3_1,
                            file3_3_3_2: existingData.criteria33.file3_3_3_2 && filePaths.file3_3_3_2 ? filePaths.file3_3_3_2 : existingData.criteria33.file3_3_3_2 || filePaths.file3_3_3_2,
                        },
                        criteria34: {
                            code_of_ethics: req.body.code_of_ethics,
                            file3_4_1: existingData.criteria34.file3_4_1 && filePaths.file3_4_1 ? filePaths.file3_4_1 : existingData.criteria34.file3_4_1 || filePaths.file3_4_1,
                            incentives: req.body.incentives,
                            file3_4_2_1: existingData.criteria34.file3_4_2_1 && filePaths.file3_4_2_1 ? filePaths.file3_4_2_1 : existingData.criteria34.file3_4_2_1 || filePaths.file3_4_2_1,
                            file3_4_2_2: existingData.criteria34.file3_4_2_2 && filePaths.file3_4_2_2 ? filePaths.file3_4_2_2 : existingData.criteria34.file3_4_2_2 || filePaths.file3_4_2_2,
                            patents_published: req.body.patents_published,
                            file3_4_3_1: existingData.criteria34.file3_4_3_1 && filePaths.file3_4_3_1 ? filePaths.file3_4_3_1 : existingData.criteria34.file3_4_3_1 || filePaths.file3_4_3_1,
                            file3_4_3_2: existingData.criteria34.file3_4_3_2 && filePaths.file3_4_3_2 ? filePaths.file3_4_3_2 : existingData.criteria34.file3_4_3_2 || filePaths.file3_4_3_2,
                            phd_awarded: req.body.phd_awarded,
                            teachers_guides: req.body.teachers_guides,
                            file3_4_4_1: existingData.criteria34.file3_4_4_1 && filePaths.file3_4_4_1 ? filePaths.file3_4_4_1 : existingData.criteria34.file3_4_4_1 || filePaths.file3_4_4_1,
                            file3_4_4_2: existingData.criteria34.file3_4_4_2 && filePaths.file3_4_4_2 ? filePaths.file3_4_4_2 : existingData.criteria34.file3_4_4_2 || filePaths.file3_4_4_2,
                            projects: req.body.projects,
                            file3_4_5_1: existingData.criteria34.file3_4_5_1 && filePaths.file3_4_5_1 ? filePaths.file3_4_5_1 : existingData.criteria34.file3_4_5_1 || filePaths.file3_4_5_1,
                            file3_4_5_2: existingData.criteria34.file3_4_5_2 && filePaths.file3_4_5_2 ? filePaths.file3_4_5_2 : existingData.criteria34.file3_4_5_2 || filePaths.file3_4_5_2,
                            research_publications: req.body.research_publications,
                            file3_4_6_1: existingData.criteria34.file3_4_6_1 && filePaths.file3_4_6_1 ? filePaths.file3_4_6_1 : existingData.criteria34.file3_4_6_1 || filePaths.file3_4_6_1,
                            file3_4_6_2: existingData.criteria34.file3_4_6_2 && filePaths.file3_4_6_2 ? filePaths.file3_4_6_2 : existingData.criteria34.file3_4_6_2 || filePaths.file3_4_6_2,
                            conference_papers: req.body.conference_papers,
                            file3_4_7_1: existingData.criteria34.file3_4_7_1 && filePaths.file3_4_7_1 ? filePaths.file3_4_7_1 : existingData.criteria34.file3_4_7_1 || filePaths.file3_4_7_1,
                            file3_4_7_2: existingData.criteria34.file3_4_7_2 && filePaths.file3_4_7_2 ? filePaths.file3_4_7_2 : existingData.criteria34.file3_4_7_2 || filePaths.file3_4_7_2,
                            patents_applied: req.body.patents_applied,
                            file3_4_8_1: existingData.criteria34.file3_4_8_1 && filePaths.file3_4_8_1 ? filePaths.file3_4_8_1 : existingData.criteria34.file3_4_8_1 || filePaths.file3_4_8_1,
                            file3_4_8_2: existingData.criteria34.file3_4_8_2 && filePaths.file3_4_8_2 ? filePaths.file3_4_8_2 : existingData.criteria34.file3_4_8_2 || filePaths.file3_4_8_2,
                            impact: req.body.impact,
                            file3_4_9_1: existingData.criteria34.file3_4_9_1 && filePaths.file3_4_9_1 ? filePaths.file3_4_9_1 : existingData.criteria34.file3_4_9_1 || filePaths.file3_4_9_1,
                            file3_4_9_2: existingData.criteria34.file3_4_9_2 && filePaths.file3_4_9_2 ? filePaths.file3_4_9_2 : existingData.criteria34.file3_4_9_2 || filePaths.file3_4_9_2,
                        },
                        criteria35: {
                            consultancyText: req.body.consultancyText,
                            consultancyRev: req.body.consultancyRev,
                            file3_5_1: existingData.criteria35.file3_5_1 && filePaths.file3_5_1 ? filePaths.file3_5_1 : existingData.criteria35.file3_5_1 || filePaths.file3_5_1,
                            file3_5_2_1: existingData.criteria35.file3_5_2_1 && filePaths.file3_5_2_1 ? filePaths.file3_5_2_1 : existingData.criteria35.file3_5_2_1 || filePaths.file3_5_2_1,
                            file3_5_2_2: existingData.criteria35.file3_5_2_2 && filePaths.file3_5_2_2 ? filePaths.file3_5_2_2 : existingData.criteria35.file3_5_2_2 || filePaths.file3_5_2_2,
                        },
                        criteria36: {
                            extensionActText: req.body.extensionActText,
                            file3_6_1: existingData.criteria36.file3_6_1 && filePaths.file3_6_1 ? filePaths.file3_6_1 : existingData.criteria36.file3_6_1 || filePaths.file3_6_1,
                            file3_6_2_1: existingData.criteria36.file3_6_2_1 && filePaths.file3_6_2_1 ? filePaths.file3_6_2_1 : existingData.criteria36.file3_6_2_1 || filePaths.file3_6_2_1,
                            file3_6_2_2: existingData.criteria36.file3_6_2_2 && filePaths.file3_6_2_2 ? filePaths.file3_6_2_2 : existingData.criteria36.file3_6_2_2 || filePaths.file3_6_2_2,
                            extActAwards: req.body.extActAwards,
                            outreachPrograms: req.body.outreachPrograms,
                            file3_6_3_1: existingData.criteria36.file3_6_3_1 && filePaths.file3_6_3_1 ? filePaths.file3_6_3_1 : existingData.criteria36.file3_6_3_1 || filePaths.file3_6_3_1,
                            file3_6_3_2: existingData.criteria36.file3_6_3_2 && filePaths.file3_6_3_2 ? filePaths.file3_6_3_2 : existingData.criteria36.file3_6_3_2 || filePaths.file3_6_3_2,
                            participatingStudents: req.body.participatingStudents,
                            file3_6_4_1: existingData.criteria36.file3_6_4_1 && filePaths.file3_6_4_1 ? filePaths.file3_6_4_1 : existingData.criteria36.file3_6_4_1 || filePaths.file3_6_4_1,
                            file3_6_4_2: existingData.criteria36.file3_6_4_2 && filePaths.file3_6_4_2 ? filePaths.file3_6_4_2 : existingData.criteria36.file3_6_4_2 || filePaths.file3_6_4_2,
                        },
                        criteria37: {
                            collAct: req.body.collAct,
                            file3_7_1_1: existingData.criteria37.file3_7_1_1 && filePaths.file3_7_1_1 ? filePaths.file3_7_1_1 : existingData.criteria37.file3_7_1_1 || filePaths.file3_7_1_1,
                            file3_7_1_2: existingData.criteria37.file3_7_1_2 && filePaths.file3_7_1_2 ? filePaths.file3_7_1_2 : existingData.criteria37.file3_7_1_2 || filePaths.file3_7_1_2,
                            functionalMOUs: req.body.functionalMOUs,
                            file3_7_2_1: existingData.criteria37.file3_7_2_1 && filePaths.file3_7_2_1 ? filePaths.file3_7_2_1 : existingData.criteria37.file3_7_2_1 || filePaths.file3_7_2_1,
                            file3_7_2_2: existingData.criteria37.file3_7_2_2 && filePaths.file3_7_2_2 ? filePaths.file3_7_2_2 : existingData.criteria37.file3_7_2_2 || filePaths.file3_7_2_2,
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
            // If no existing data, create new data object
            const newData = new Criteria3Model({
                department: req.body.department,
                academicYear: req.body.academicYear,
                criteria31: {
                    researchFacilities: req.body.researchFacilities,
                    file3_1_1: filePaths.file3_1_1,
                    seedMoney: req.body.seedMoney,
                    file3_1_2_1: filePaths.file3_1_2_1,
                    file3_1_2_2: filePaths.file3_1_2_2,
                    teachersFellowship: req.body.teachersFellowship,
                    file3_1_3_1: filePaths.file3_1_3_1,
                    file3_1_3_2: filePaths.file3_1_3_2,
                    fellowsEnrolled: req.body.fellowsEnrolled,
                    file3_1_4_1: filePaths.file3_1_4_1,
                    file3_1_4_2: filePaths.file3_1_4_2,
                    feed_3_1_5_Type: req.body.feed_3_1_5_Type,
                    file3_1_5: filePaths.file3_1_5,
                    departmentNo: req.body.departmentNo,
                    file3_1_6_1: filePaths.file3_1_6_1,
                    file3_1_6_2: filePaths.file3_1_6_2,
                },
                criteria32: {
                    extraFunding: req.body.extraFunding,
                    file3_2_1_1: filePaths.file3_2_1_1,
                    file3_2_1_2: filePaths.file3_2_1_2,
                    grants: req.body.grants,
                    file3_2_2_1: filePaths.file3_2_2_1,
                    file3_2_2_2: filePaths.file3_2_2_2,
                    teacherResearchProjects: req.body.teacherResearchProjects,
                    file3_2_3_1: filePaths.file3_2_3_1,
                    file3_2_3_2: filePaths.file3_2_3_2,
                },
                criteria33: {
                    ecosystemText: req.body.ecosystemText,
                    file3_3_1: filePaths.file3_3_1,
                    seminars: req.body.seminars,
                    totalSeminars: req.body.totalSeminars,
                    file3_3_2_1: filePaths.file3_3_2_1,
                    file3_3_2_2: filePaths.file3_3_2_2,
                    awards: req.body.awards,
                    file3_3_3_1: filePaths.file3_3_3_1,
                    file3_3_3_2: filePaths.file3_3_3_2,
                },
                criteria34: {
                    code_of_ethics: req.body.code_of_ethics,
                    file3_4_1: filePaths.file3_4_1,
                    incentives: req.body.incentives,
                    file3_4_2_1: filePaths.file3_4_2_1,
                    file3_4_2_2: filePaths.file3_4_2_2,
                    patents_published: req.body.patents_published,
                    file3_4_3_1: filePaths.file3_4_3_1,
                    file3_4_3_2: filePaths.file3_4_3_2,
                    phd_awarded: req.body.phd_awarded,
                    teachers_guides: req.body.teachers_guides,
                    file3_4_4_1: filePaths.file3_4_4_1,
                    file3_4_4_2: filePaths.file3_4_4_2,
                    research_papers_per_teacher: req.body.research_papers_per_teacher,
                    file3_4_5_1: filePaths.file3_4_5_1,
                    file3_4_5_2: filePaths.file3_4_5_2,
                    books_edited: req.body.books_edited,
                    file3_4_6_1: filePaths.file3_4_6_1,
                    file3_4_6_2: filePaths.file3_4_6_2,
                    e_content: req.body.e_content,
                    file3_4_7_1: filePaths.file3_4_7_1,
                    file3_4_7_2: filePaths.file3_4_7_2,
                    scopus348: req.body.scopus348,
                    web_of_science348: req.body.web_of_science348,
                    file3_4_8_1: filePaths.file3_4_8_1,
                    file3_4_8_2: filePaths.file3_4_8_2,
                    scopus349: req.body.scopus349,
                    web_of_science349: req.body.web_of_science349,
                    file3_4_9_1: filePaths.file3_4_9_1,
                    file3_4_9_2: filePaths.file3_4_9_2
                },
                criteria35: {
                    consultancyText: req.body.consultancyText,
                    consultancyRev: req.body.consultancyRev,
                    file3_5_1: filePaths.file3_5_1,
                    file3_5_2_1: filePaths.file3_5_2_1,
                    file3_5_2_2: filePaths.file3_5_2_2,
                },
                criteria36: {
                    extensionActText: req.body.extensionActText,
                    file3_6_1: filePaths.file3_6_1,
                    file3_6_2_1: filePaths.file3_6_2_1,
                    file3_6_2_2: filePaths.file3_6_2_2,
                    extActAwards: req.body.extActAwards,
                    outreachPrograms: req.body.outreachPrograms,
                    file3_6_3_1: filePaths.file3_6_3_1,
                    file3_6_3_2: filePaths.file3_6_3_2,
                    participatingStudents: req.body.participatingStudents,
                    file3_6_4_1: filePaths.file3_6_4_1,
                    file3_6_4_2: filePaths.file3_6_4_2,
                },
                criteria37: {
                    collAct: req.body.collAct,
                    file3_7_1_1: filePaths.file3_7_1_1,
                    file3_7_1_2: filePaths.file3_7_1_2,
                    functionalMOUs: req.body.functionalMOUs,
                    file3_7_2_1: filePaths.file3_7_2_1,
                    file3_7_2_2: filePaths.file3_7_2_2,
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

export { app as Criteria3_submit };
