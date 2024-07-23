import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import Criteria4Model from '../models/criteria4.js';
import { getStorage } from '../firebase.js';
import { ref, getDownloadURL, deleteObject, uploadBytes } from 'firebase/storage';

const app = express();

app.use(bodyParser.json());

const storage = getStorage();

//Function to delete the existing files
const deleteExistingFiles = async (data) => {

    const filePaths = [
        data?.criteria41?.file4_1_1,
        data?.criteria41?.file4_1_2,
        data?.criteria41?.file4_1_3,
        data?.criteria41?.file4_1_4_1,
        data?.criteria41?.file4_1_4_2,
        data?.criteria42?.file4_2_1,
        data?.criteria42?.file4_2_2,
        data?.criteria42?.file4_2_3_1,
        data?.criteria42?.file4_2_3_2,
        data?.criteria42?.file4_2_4,
        data?.criteria43?.file4_3_1_1,
        data?.criteria43?.file4_3_1_2,
        data?.criteria43?.file4_3_2,
        data?.criteria43?.file4_3_4,
        data?.criteria43?.file4_3_5_1,
        data?.criteria43?.file4_3_5_2,
        data?.criteria44?.file4_4_1_1,
        data?.criteria44?.file4_4_1_2,
        data?.criteria44?.file4_4_2,
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
    'file4_1_1',
    'file4_1_2',
    'file4_1_3',
    'file4_1_4_1',
    'file4_1_4_2',
    'file4_2_1',
    'file4_2_2',
    'file4_2_3_1',
    'file4_2_3_2',
    'file4_2_4',
    'file4_3_1_1',
    'file4_3_1_2',
    'file4_3_2',
    'file4_3_4',
    'file4_3_5_1',
    'file4_3_5_2',
    'file4_4_1_1',
    'file4_4_1_2',
    'file4_4_2',
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
app.post('/criteria4/submit', upload.fields([
    { name: 'file4_1_1', maxCount: 1 },
    { name: 'file4_1_2', maxCount: 1 },
    { name: 'file4_1_3', maxCount: 1 },
    { name: 'file4_1_4_1', maxCount: 1 },
    { name: 'file4_1_4_2', maxCount: 1 },
    { name: 'file4_2_1', maxCount: 1 },
    { name: 'file4_2_2', maxCount: 1 },
    { name: 'file4_2_3_1', maxCount: 1 },
    { name: 'file4_2_3_2', maxCount: 1 },
    { name: 'file4_2_4', maxCount: 1 },
    { name: 'file4_3_1_1', maxCount: 1 },
    { name: 'file4_3_1_2', maxCount: 1 },
    { name: 'file4_3_2', maxCount: 1 },
    { name: 'file4_3_4', maxCount: 1 },
    { name: 'file4_3_5_1', maxCount: 1 },
    { name: 'file4_3_5_2', maxCount: 1 },
    { name: 'file4_4_1_1', maxCount: 1 },
    { name: 'file4_4_1_2', maxCount: 1 },
    { name: 'file4_4_2', maxCount: 1 },
]), async (req, res) => {
    try {
        const files = req.files;
        const filePaths = {};

        const requiredFileFields = [
            'file4_1_1',
            'file4_1_2',
            'file4_1_3',
            'file4_1_4_1',
            'file4_1_4_2',
            'file4_2_1',
            'file4_2_2',
            'file4_2_3_1',
            'file4_2_3_2',
            'file4_2_4',
            'file4_3_1_1',
            'file4_3_1_2',
            'file4_3_2',
            'file4_3_4',
            'file4_3_5_1',
            'file4_3_5_2',
            'file4_4_1_1',
            'file4_4_1_2',
            'file4_4_2'
        ];

        let existingData = await Criteria4Model.findOne({ department: req.body.department, academicYear: req.body.academicYear });

        const missingFields = requiredFileFields.filter(fieldName => !files[fieldName]);

        if (missingFields.length > 0) {
            for (const missingField of missingFields) {
                if (existingData) {

                    if (missingField.startsWith('file4_1')) {
                        if (existingData && existingData.criteria41 && existingData.criteria41.hasOwnProperty(missingField)) {
                            const index = requiredFileFields.indexOf(missingField);
                            if (index !== -1) {
                                requiredFileFields.splice(index, 1);
                                expectedFileFields.splice(index, 1);
                            }
                        }
                    }

                    else if (missingField.startsWith('file4_2')) {
                        if (existingData && existingData.criteria42 && existingData.criteria42.hasOwnProperty(missingField)) {
                            const index = requiredFileFields.indexOf(missingField);
                            if (index !== -1) {
                                requiredFileFields.splice(index, 1);
                                expectedFileFields.splice(index, 1);
                            }
                        }
                    }

                    else if (missingField.startsWith('file4_3')) {
                        if (existingData && existingData.criteria43 && existingData.criteria43.hasOwnProperty(missingField)) {
                            const index = requiredFileFields.indexOf(missingField);
                            if (index !== -1) {
                                requiredFileFields.splice(index, 1);
                                expectedFileFields.splice(index, 1);
                            }
                        }
                    }

                    else if (missingField.startsWith('file4_4')) {
                        if (existingData && existingData.criteria44 && existingData.criteria44.hasOwnProperty(missingField)) {
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

            for (let i = 41; i <= 44; i++) {
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
                        department: req.body.department,
                        academicYear: req.body.academicYear,
                        criteria41: {
                            teaching_facilities: req.body.teaching_facilities,
                            file4_1_1: existingData.criteria41.file4_1_1 && filePaths.file4_1_1 ? filePaths.file4_1_1 : existingData.criteria41.file4_1_1 || filePaths.file4_1_1,
                            cultural_facilities: req.body.cultural_facilities,
                            file4_1_2: existingData.criteria41.file4_1_2 && filePaths.file4_1_2 ? filePaths.file4_1_2 : existingData.criteria41.file4_1_2 || filePaths.file4_1_2,
                            general_facilities: req.body.general_facilities,
                            file4_1_3: existingData.criteria41.file4_1_3 && filePaths.file4_1_3 ? filePaths.file4_1_3 : existingData.criteria41.file4_1_3 || filePaths.file4_1_3,
                            total_expenditure: req.body.total_expenditure,
                            file4_1_4_1: existingData.criteria41.file4_1_4_1 && filePaths.file4_1_4_1 ? filePaths.file4_1_4_1 : existingData.criteria41.file4_1_4_1 || filePaths.file4_1_4_1,
                            file4_1_4_2: existingData.criteria41.file4_1_4_2 && filePaths.file4_1_4_2 ? filePaths.file4_1_4_2 : existingData.criteria41.file4_1_4_2 || filePaths.file4_1_4_2,
                        },
                        criteria42: {
                            automated_library: req.body.automated_library,
                            file4_2_1: existingData.criteria42.file4_2_1 && filePaths.file4_2_1 ? filePaths.file4_2_1 : existingData.criteria42.file4_2_1 || filePaths.file4_2_1,
                            subscription: req.body.subscription,
                            file4_2_2: existingData.criteria42.file4_2_2 && filePaths.file4_2_2 ? filePaths.file4_2_2 : existingData.criteria42.file4_2_2 || filePaths.file4_2_2,
                            books_expenditure: req.body.books_expenditure,
                            file4_2_3_1: existingData.criteria42.file4_2_3_1 && filePaths.file4_2_3_1 ? filePaths.file4_2_3_1 : existingData.criteria42.file4_2_3_1 || filePaths.file4_2_3_1,
                            file4_2_3_2: existingData.criteria42.file4_2_3_2 && filePaths.file4_2_3_2 ? filePaths.file4_2_3_2 : existingData.criteria42.file4_2_3_2 || filePaths.file4_2_3_2,
                            library_usage_per_day: req.body.library_usage_per_day,
                            file4_2_4: existingData.criteria42.file4_2_4 && filePaths.file4_2_4 ? filePaths.file4_2_4 : existingData.criteria42.file4_2_4 || filePaths.file4_2_4,
                        },
                        criteria43: {
                            classrooms_and_seminarhalls: req.body.classrooms_and_seminarhalls,
                            file4_3_1_1: existingData.criteria43.file4_3_1_1 && filePaths.file4_3_1_1 ? filePaths.file4_3_1_1 : existingData.criteria43.file4_3_1_1 || filePaths.file4_3_1_1,
                            file4_3_1_2: existingData.criteria43.file4_3_1_2 && filePaths.file4_3_1_2 ? filePaths.file4_3_1_2 : existingData.criteria43.file4_3_1_2 || filePaths.file4_3_1_2,
                            it_policy: req.body.it_policy,
                            file4_3_2: existingData.criteria43.file4_3_2 && filePaths.file4_3_2 ? filePaths.file4_3_2 : existingData.criteria43.file4_3_2 || filePaths.file4_3_2,
                            number_of_students: req.body.number_of_students,
                            number_of_computers: req.body.number_of_computers,
                            bandwidth: req.body.bandwidth,
                            file4_3_4: existingData.criteria43.file4_3_4 && filePaths.file4_3_4 ? filePaths.file4_3_4 : existingData.criteria43.file4_3_4 || filePaths.file4_3_4,
                            e_content_facilities: req.body.e_content_facilities,
                            file4_3_5_1: existingData.criteria43.file4_3_5_1 && filePaths.file4_3_5_1 ? filePaths.file4_3_5_1 : existingData.criteria43.file4_3_5_1 || filePaths.file4_3_5_1,
                            file4_3_5_2: existingData.criteria43.file4_3_5_2 && filePaths.file4_3_5_2 ? filePaths.file4_3_5_2 : existingData.criteria43.file4_3_5_2 || filePaths.file4_3_5_2,
                        },
                        criteria44: {
                            physical_facilities_expenditure: req.body.physical_facilities_expenditure,
                            file4_4_1_1: existingData.criteria44.file4_4_1_1 && filePaths.file4_4_1_1 ? filePaths.file4_4_1_1 : existingData.criteria44.file4_4_1_1 || filePaths.file4_4_1_1,
                            file4_4_1_2: existingData.criteria44.file4_4_1_2 && filePaths.file4_4_1_2 ? filePaths.file4_4_1_2 : existingData.criteria44.file4_4_1_2 || filePaths.file4_4_1_2,
                            established_systems: req.body.established_systems,
                            file4_4_2: existingData.criteria44.file4_4_2 && filePaths.file4_4_2 ? filePaths.file4_4_2 : existingData.criteria44.file4_4_2 || filePaths.file4_4_2,
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
            const newData = new Criteria4Model({
                department: req.body.department,
                academicYear: req.body.academicYear,
                criteria41: {
                    teaching_facilities: req.body.teaching_facilities,
                    file4_1_1: filePaths.file4_1_1,
                    cultural_facilities: req.body.cultural_facilities,
                    file4_1_2: filePaths.file4_1_2,
                    general_facilities: req.body.general_facilities,
                    file4_1_3: filePaths.file4_1_3,
                    total_expenditure: req.body.total_expenditure,
                    file4_1_4_1: filePaths.file4_1_4_1,
                    file4_1_4_2: filePaths.file4_1_4_2,
                },
                criteria42: {
                    automated_library: req.body.automated_library,
                    file4_2_1: filePaths.file4_2_1,
                    subscription: req.body.subscription,
                    file4_2_2: filePaths.file4_2_2,
                    books_expenditure: req.body.books_expenditure,
                    file4_2_3_1: filePaths.file4_2_3_1,
                    file4_2_3_2: filePaths.file4_2_3_2,
                    library_usage_per_day: req.body.library_usage_per_day,
                    file4_2_4: filePaths.file4_2_4,
                },
                criteria43: {
                    classrooms_and_seminarhalls: req.body.classrooms_and_seminarhalls,
                    file4_3_1_1: filePaths.file4_3_1_1,
                    file4_3_1_2: filePaths.file4_3_1_2,
                    it_policy: req.body.it_policy,
                    file4_3_2: filePaths.file4_3_2,
                    number_of_students: req.body.number_of_students,
                    number_of_computers: req.body.number_of_computers,
                    bandwidth: req.body.bandwidth,
                    file4_3_4: filePaths.file4_3_4,
                    e_content_facilities: req.body.e_content_facilities,
                    file4_3_5_1: filePaths.file4_3_5_1,
                    file4_3_5_2: filePaths.file4_3_5_2,
                },
                criteria44: {
                    physical_facilities_expenditure: req.body.physical_facilities_expenditure,
                    file4_4_1_1: filePaths.file4_4_1_1,
                    file4_4_1_2: filePaths.file4_4_1_2,
                    established_systems: req.body.established_systems,
                    file4_4_2: filePaths.file4_4_2,
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

export { app as Criteria4_submit };
