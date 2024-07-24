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
        data?.criteria21?.file2_1_1_1,
        data?.criteria21?.file2_1_1_2,
        data?.criteria21?.file2_1_2_1,
        data?.criteria21?.file2_1_2_2,
        data?.criteria22?.file2_2_1_1,
        data?.criteria22?.file2_2_2,
        data?.criteria23?.file2_3_1,
        data?.criteria23?.file2_3_2,
        data?.criteria23?.file2_3_3,
        data?.criteria24?.file2_4_1_1,
        data?.criteria24?.file2_4_1_2,
        data?.criteria24?.file2_4_2_1,
        data?.criteria24?.file2_4_2_2,
        data?.criteria24?.file2_4_3_1,
        data?.criteria24?.file2_4_3_2,
        data?.criteria24?.file2_4_4_1,
        data?.criteria24?.file2_4_4_2,
        data?.criteria25?.file2_5_1_1,
        data?.criteria25?.file2_5_1_2,
        data?.criteria25?.file2_5_2,
        data?.criteria25?.file2_5_3,
        data?.criteria25?.file2_5_4_1,
        data?.criteria25?.file2_5_4_2,
        data?.criteria26?.file2_6_1,
        data?.criteria26?.file2_6_2,
        data?.criteria26?.file2_6_3_2_1,
        data?.criteria26?.file2_6_3_2_2
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
    'file2_1_1_1', 'file2_1_1_2', 'file2_1_2_1', 'file2_1_2_2',
    'file2_2_1_1', 'file2_2_2',
    'file2_3_1', 'file2_3_2', 'file2_3_3',
    'file2_4_1_1', 'file2_4_1_2', 'file2_4_2_1', 'file2_4_2_2',
    'file2_4_3_1', 'file2_4_3_2', 'file2_4_4_1', 'file2_4_4_2',
    'file2_5_1_1', 'file2_5_1_2', 'file2_5_2', 'file2_5_3',
    'file2_5_4_1', 'file2_5_4_2',
    'file2_6_1', 'file2_6_2', 'file2_6_3_2_1', 'file2_6_3_2_2'
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
    { name: 'file2_1_1_1', maxCount: 1 },
    { name: 'file2_1_1_2', maxCount: 1 },
    { name: 'file2_1_2_1', maxCount: 1 },
    { name: 'file2_1_2_2', maxCount: 1 },
    { name: 'file2_2_1_1', maxCount: 1 },
    { name: 'file2_2_2', maxCount: 1 },
    { name: 'file2_3_1', maxCount: 1 },
    { name: 'file2_3_2', maxCount: 1 },
    { name: 'file2_3_3', maxCount: 1 },
    { name: 'file2_4_1_1', maxCount: 1 },
    { name: 'file2_4_1_2', maxCount: 1 },
    { name: 'file2_4_2_1', maxCount: 1 },
    { name: 'file2_4_2_2', maxCount: 1 },
    { name: 'file2_4_3_1', maxCount: 1 },
    { name: 'file2_4_3_2', maxCount: 1 },
    { name: 'file2_4_4_1', maxCount: 1 },
    { name: 'file2_4_4_2', maxCount: 1 },
    { name: 'file2_5_1_1', maxCount: 1 },
    { name: 'file2_5_1_2', maxCount: 1 },
    { name: 'file2_5_2', maxCount: 1 },
    { name: 'file2_5_3', maxCount: 1 },
    { name: 'file2_5_4_1', maxCount: 1 },
    { name: 'file2_5_4_2', maxCount: 1 },
    { name: 'file2_6_1', maxCount: 1 },
    { name: 'file2_6_2', maxCount: 1 },
    { name: 'file2_6_3_2_1', maxCount: 1 },
    { name: 'file2_6_3_2_2', maxCount: 1 }
]), async (req, res) => {
    try {
        const files = req.files;
        const filePaths = {};

        const requiredFileFields = [
            'file2_1_1_1', 'file2_1_1_2', 'file2_1_2_1', 'file2_1_2_2',
            'file2_2_1_1', 'file2_2_2',
            'file2_3_1', 'file2_3_2', 'file2_3_3',
            'file2_4_1_1', 'file2_4_1_2', 'file2_4_2_1', 'file2_4_2_2',
            'file2_4_3_1', 'file2_4_3_2', 'file2_4_4_1', 'file2_4_4_2',
            'file2_5_1_1', 'file2_5_1_2', 'file2_5_2', 'file2_5_3',
            'file2_5_4_1', 'file2_5_4_2',
            'file2_6_1', 'file2_6_2', 'file2_6_3_2_1', 'file2_6_3_2_2'
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

                    else if (missingField.startsWith('file2_5')) {
                        if (existingData && existingData.criteria25 && existingData.criteria25.hasOwnProperty(missingField)) {
                            const index = requiredFileFields.indexOf(missingField);
                            if (index !== -1) {
                                requiredFileFields.splice(index, 1);
                                expectedFileFields.splice(index, 1);
                            }
                        }
                    }

                    else if (missingField.startsWith('file2_6')) {
                        if (existingData && existingData.criteria26 && existingData.criteria26.hasOwnProperty(missingField)) {
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
            const fileRef = ref(storage, `uploads/${uniqueFileName}`);

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

        // Handle existing data
        if (existingData) {

            const existingDataCopy = JSON.parse(JSON.stringify(existingData));

            for (let i = 21; i <= 26; i++) {
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
                        criteria21: {
                            no_of_seats: req.body.no_of_seats,
                            file2_1_1_1: existingData.criteria21.file2_1_1_1 && filePaths.file2_1_1_1 ? filePaths.file2_1_1_1 : existingData.criteria21.file2_1_1_1 || filePaths.file2_1_1_1,
                            file2_1_1_2: existingData.criteria21.file2_1_1_2 && filePaths.file2_1_1_2 ? filePaths.file2_1_1_2 : existingData.criteria21.file2_1_1_2 || filePaths.file2_1_1_2,
                            students_reserved_cat: req.body.students_reserved_cat,
                            file2_1_2_1: existingData.criteria21.file2_1_2_1 && filePaths.file2_1_2_1 ? filePaths.file2_1_2_1 : existingData.criteria21.file2_1_2_1 || filePaths.file2_1_2_1,
                            file2_1_2_2: existingData.criteria21.file2_1_2_2 && filePaths.file2_1_2_2 ? filePaths.file2_1_2_2 : existingData.criteria21.file2_1_2_2 || filePaths.file2_1_2_2,
                        },
                        criteria22: {
                            learning_assessment: req.body.learning_assessment,
                            file2_2_1_1: existingData.criteria22.file2_2_1_1 && filePaths.file2_2_1_1 ? filePaths.file2_2_1_1 : existingData.criteria22.file2_2_1_1 || filePaths.file2_2_1_1,
                            link2_2_1_2: req.body.link2_2_1_2,
                            no_of_students: req.body.no_of_students,
                            no_of_teachers: req.body.no_of_teachers,
                            file2_2_2: existingData.criteria22.file2_2_2 && filePaths.file2_2_2 ? filePaths.file2_2_2 : existingData.criteria22.file2_2_2 || filePaths.file2_2_2,
                        },
                        criteria23: {
                            learning_exp: req.body.learning_exp,
                            file2_3_1: existingData.criteria23.file2_3_1 && filePaths.file2_3_1 ? filePaths.file2_3_1 : existingData.criteria23.file2_3_1 || filePaths.file2_3_1,
                            effect_teach_learn: req.body.effect_teach_learn,
                            file2_3_2: existingData.criteria23.file2_3_2 && filePaths.file2_3_2 ? filePaths.file2_3_2 : existingData.criteria23.file2_3_2 || filePaths.file2_3_2,
                            no_of_mentors: req.body.no_of_mentors,
                            file2_3_3: existingData.criteria23.file2_3_3 && filePaths.file2_3_3 ? filePaths.file2_3_3 : existingData.criteria23.file2_3_3 || filePaths.file2_3_3,
                        },
                        criteria24: {
                            full_time_teachers: req.body.full_time_teachers,
                            file2_4_1_1: existingData.criteria24.file2_4_1_1 && filePaths.file2_4_1_1 ? filePaths.file2_4_1_1 : existingData.criteria24.file2_4_1_1 || filePaths.file2_4_1_1,
                            file2_4_1_2: existingData.criteria24.file2_4_1_2 && filePaths.file2_4_1_2 ? filePaths.file2_4_1_2 : existingData.criteria24.file2_4_1_2 || filePaths.file2_4_1_2,
                            full_time_teachers_phd_etc: req.body.full_time_teachers_phd_etc,
                            file2_4_2_1: existingData.criteria24.file2_4_2_1 && filePaths.file2_4_2_1 ? filePaths.file2_4_2_1 : existingData.criteria24.file2_4_2_1 || filePaths.file2_4_2_1,
                            file2_4_2_2: existingData.criteria24.file2_4_2_2 && filePaths.file2_4_2_2 ? filePaths.file2_4_2_2 : existingData.criteria24.file2_4_2_2 || filePaths.file2_4_2_2,
                            total_exp: req.body.total_exp,
                            file2_4_3_1: existingData.criteria24.file2_4_3_1 && filePaths.file2_4_3_1 ? filePaths.file2_4_3_1 : existingData.criteria24.file2_4_3_1 || filePaths.file2_4_3_1,
                            file2_4_3_2: existingData.criteria24.file2_4_3_2 && filePaths.file2_4_3_2 ? filePaths.file2_4_3_2 : existingData.criteria24.file2_4_3_2 || filePaths.file2_4_3_2,
                            award_rec_teachers: req.body.award_rec_teachers,
                            file2_4_4_1: existingData.criteria24.file2_4_4_1 && filePaths.file2_4_4_1 ? filePaths.file2_4_4_1 : existingData.criteria24.file2_4_4_1 || filePaths.file2_4_4_1,
                            file2_4_4_2: existingData.criteria24.file2_4_4_2 && filePaths.file2_4_4_2 ? filePaths.file2_4_4_2 : existingData.criteria24.file2_4_4_2 || filePaths.file2_4_4_2,
                        },
                        criteria25: {
                            no_of_days: req.body.no_of_days,
                            no_of_days_yearwise: req.body.no_of_days_yearwise,
                            file2_5_1_1: existingData.criteria25.file2_5_1_1 && filePaths.file2_5_1_1 ? filePaths.file2_5_1_1 : existingData.criteria25.file2_5_1_1 || filePaths.file2_5_1_1,
                            file2_5_1_2: existingData.criteria25.file2_5_1_2 && filePaths.file2_5_1_2 ? filePaths.file2_5_1_2 : existingData.criteria25.file2_5_1_2 || filePaths.file2_5_1_2,
                            no_of_student_grievances: req.body.no_of_student_grievances,
                            file2_5_2: existingData.criteria25.file2_5_2 && filePaths.file2_5_2 ? filePaths.file2_5_2 : existingData.criteria25.file2_5_2 || filePaths.file2_5_2,
                            it_integration: req.body.it_integration,
                            file2_5_3: existingData.criteria25.file2_5_3 && filePaths.file2_5_3 ? filePaths.file2_5_3 : existingData.criteria25.file2_5_3 || filePaths.file2_5_3,
                            status_of_automation: req.body.status_of_automation,
                            file2_5_4_1: existingData.criteria25.file2_5_4_1 && filePaths.file2_5_4_1 ? filePaths.file2_5_4_1 : existingData.criteria25.file2_5_4_1 || filePaths.file2_5_4_1,
                            file2_5_4_2: existingData.criteria25.file2_5_4_2 && filePaths.file2_5_4_2 ? filePaths.file2_5_4_2 : existingData.criteria25.file2_5_4_2 || filePaths.file2_5_4_2,
                        },
                        criteria26: {
                            learning_outcomes: req.body.learning_outcomes,
                            file2_6_1: existingData.criteria26.file2_6_1 && filePaths.file2_6_1 ? filePaths.file2_6_1 : existingData.criteria26.file2_6_1 || filePaths.file2_6_1,
                            attainment_prog_outcomes: req.body.attainment_prog_outcomes,
                            file2_6_2: existingData.criteria26.file2_6_2 && filePaths.file2_6_2 ? filePaths.file2_6_2 : existingData.criteria26.file2_6_2 || filePaths.file2_6_2,
                            final_year_students_passed: req.body.final_year_students_passed,
                            final_year_students_appeared: req.body.final_year_students_appeared,
                            file2_6_3_2_1: existingData.criteria26.file2_6_3_2_1 && filePaths.file2_6_3_2_1 ? filePaths.file2_6_3_2_1 : existingData.criteria26.file2_6_3_2_1 || filePaths.file2_6_3_2_1,
                            file2_6_3_2_2: existingData.criteria26.file2_6_3_2_2 && filePaths.file2_6_3_2_2 ? filePaths.file2_6_3_2_2 : existingData.criteria26.file2_6_3_2_2 || filePaths.file2_6_3_2_2,
                        },
                        criteria27: {
                            sss_web_link: req.body.sss_web_link,
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
            // Create new document if not found
            const newData = new Criteria2Model({
                department: req.body.department,
                academicYear: req.body.academicYear,
                criteria21: {
                    no_of_seats: req.body.no_of_seats,
                    file2_1_1_1: filePaths.file2_1_1_1,
                    file2_1_1_2: filePaths.file2_1_1_2,
                    students_reserved_cat: req.body.students_reserved_cat,
                    file2_1_2_1: filePaths.file2_1_2_1,
                    file2_1_2_2: filePaths.file2_1_2_2,
                },
                criteria22: {
                    learning_assessment: req.body.learning_assessment,
                    file2_2_1_1: filePaths.file2_2_1_1,
                    link2_2_1_2: req.body.link2_2_1_2,
                    no_of_students: req.body.no_of_students,
                    no_of_teachers: req.body.no_of_teachers,
                    file2_2_2: filePaths.file2_2_2,
                },
                criteria23: {
                    learning_exp: req.body.learning_exp,
                    file2_3_1: filePaths.file2_3_1,
                    effect_teach_learn: req.body.effect_teach_learn,
                    file2_3_2: filePaths.file2_3_2,
                    no_of_mentors: req.body.no_of_mentors,
                    file2_3_3: filePaths.file2_3_3,
                },
                criteria24: {
                    full_time_teachers: req.body.full_time_teachers,
                    file2_4_1_1: filePaths.file2_4_1_1,
                    file2_4_1_2: filePaths.file2_4_1_2,
                    full_time_teachers_phd_etc: req.body.full_time_teachers_phd_etc,
                    file2_4_2_1: filePaths.file2_4_2_1,
                    file2_4_2_2: filePaths.file2_4_2_2,
                    total_exp: req.body.total_exp,
                    file2_4_3_1: filePaths.file2_4_3_1,
                    file2_4_3_2: filePaths.file2_4_3_2,
                    award_rec_teachers: req.body.award_rec_teachers,
                    file2_4_4_1: filePaths.file2_4_4_1,
                    file2_4_4_2: filePaths.file2_4_4_2,
                },
                criteria25: {
                    no_of_days: req.body.no_of_days,
                    no_of_days_yearwise: req.body.no_of_days_yearwise,
                    file2_5_1_1: filePaths.file2_5_1_1,
                    file2_5_1_2: filePaths.file2_5_1_2,
                    no_of_student_grievances: req.body.no_of_student_grievances,
                    file2_5_2: filePaths.file2_5_2,
                    it_integration: req.body.it_integration,
                    file2_5_3: filePaths.file2_5_3,
                    status_of_automation: req.body.status_of_automation,
                    file2_5_4_1: filePaths.file2_5_4_1,
                    file2_5_4_2: filePaths.file2_5_4_2,
                },
                criteria26: {
                    learning_outcomes: req.body.learning_outcomes,
                    file2_6_1: filePaths.file2_6_1,
                    attainment_prog_outcomes: req.body.attainment_prog_outcomes,
                    file2_6_2: filePaths.file2_6_2,
                    final_year_students_passed: req.body.final_year_students_passed,
                    final_year_students_appeared: req.body.final_year_students_appeared,
                    file2_6_3_2_1: filePaths.file2_6_3_2_1,
                    file2_6_3_2_2: filePaths.file2_6_3_2_2,
                },
                criteria27: {
                    sss_web_link: req.body.sss_web_link,
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
    } catch (err) {
        console.error('Error processing request:', err);
        res.status(500).send('Internal Server Error');
    }
});

export { app as Criteria2_submit };
