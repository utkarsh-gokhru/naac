import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import ExtendedProfileModel from '../models/extended_profile.js';
import { getStorage } from '../firebase.js';
import { ref, getDownloadURL, deleteObject, uploadBytes } from 'firebase/storage';

const app = express();

app.use(bodyParser.json());

const storage = getStorage();

//Function to delete the existing files
const deleteExistingFiles = async (data) => {

    const filePaths = [
        data?.ep1?.file1_1,
        data?.ep2?.file2_1,
        data?.ep2?.file2_2,
        data?.ep2?.file2_3,
        data?.ep3?.file3_1,
        data?.ep3?.file3_2,
        data?.ep3?.file3_3,
        data?.ep4?.file4_1,
        data?.ep4?.file4_2
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
    'file1_1', 'file2_1', 'file2_2', 'file2_3',
    'file3_1', 'file3_2', 'file3_3', 'file4_1', 'file4_2'
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
app.post('/extended-profile/submit', upload.fields([
    { name: 'file1_1', maxCount: 1 },
    { name: 'file2_1', maxCount: 1 },
    { name: 'file2_2', maxCount: 1 },
    { name: 'file2_3', maxCount: 1 },
    { name: 'file3_1', maxCount: 1 },
    { name: 'file3_2', maxCount: 1 },
    { name: 'file3_3', maxCount: 1 },
    { name: 'file4_1', maxCount: 1 },
    { name: 'file4_2', maxCount: 1 }
]), async (req, res) => {
    try {
        const files = req.files;
        const filePaths = {};

        const requiredFileFields = [
            'file1_1', 'file2_1', 'file2_2', 'file2_3',
            'file3_1', 'file3_2', 'file3_3', 'file4_1', 'file4_2'
        ];

        let existingData = await ExtendedProfileModel.findOne({ department: req.body.department, academicYear: req.body.academicYear });

        const missingFields = requiredFileFields.filter(fieldName => !files[fieldName]);

        if (missingFields.length > 0) {
            for (const missingField of missingFields) {
                if (existingData) {

                    if (missingField.startsWith('file1')) {
                        if (existingData && existingData.ep1 && existingData.ep1.hasOwnProperty(missingField)) {
                            const index = requiredFileFields.indexOf(missingField);
                            if (index !== -1) {
                                requiredFileFields.splice(index, 1);
                                expectedFileFields.splice(index, 1);
                            }
                        }
                    }

                    else if (missingField.startsWith('file2')) {
                        if (existingData && existingData.ep2 && existingData.ep2.hasOwnProperty(missingField)) {
                            const index = requiredFileFields.indexOf(missingField);
                            if (index !== -1) {
                                requiredFileFields.splice(index, 1);
                                expectedFileFields.splice(index, 1);
                            }
                        }
                    }

                    else if (missingField.startsWith('file3')) {
                        if (existingData && existingData.ep3 && existingData.ep3.hasOwnProperty(missingField)) {
                            const index = requiredFileFields.indexOf(missingField);
                            if (index !== -1) {
                                requiredFileFields.splice(index, 1);
                                expectedFileFields.splice(index, 1);
                            }
                        }
                    }

                    else if (missingField.startsWith('file4')) {
                        if (existingData && existingData.ep4 && existingData.ep4.hasOwnProperty(missingField)) {
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

            for (let i = 1; i <= 4; i++) {
                const ep = existingDataCopy[`ep${i}`];
                for (const x in ep) {
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
                            ep[x] = '';
                        }
                    }
                }
            }

            await deleteExistingFiles(existingDataCopy);
            const updateResult = await updateExistingData(existingData, filePaths);

            if (updateResult.success) {
                try {
                    existingData.set({
                        ep1: {
                            programmes: req.body.programmes,
                            file1_1: existingData.ep1.file1_1 && filePaths.file1_1 ? filePaths.file1_1 : existingData.ep1.file1_1 || filePaths.file1_1,
                            departments: req.body.departments
                        },
                        ep2: {
                            students: req.body.students,
                            file2_1: existingData.ep2.file2_1 && filePaths.file2_1 ? filePaths.file2_1 : existingData.ep2.file2_1 || filePaths.file2_1,
                            outgoing_students: req.body.outgoing_students,
                            file2_2: existingData.ep2.file2_2 && filePaths.file2_2 ? filePaths.file2_2 : existingData.ep2.file2_2 || filePaths.file2_2,
                            students_appeared_in_university_exam: req.body.students_appeared_in_university_exam,
                            file2_3: existingData.ep2.file2_3 && filePaths.file2_3 ? filePaths.file2_3 : existingData.ep2.file2_3 || filePaths.file2_3,
                            reval_applications: req.body.reval_applications
                        },
                        ep3: {
                            courses_in_all_programmes: req.body.courses_in_all_programmes,
                            file3_1: existingData.ep3.file3_1 && filePaths.file3_1 ? filePaths.file3_1 : existingData.ep3.file3_1 || filePaths.file3_1,
                            full_time_teachers: req.body.full_time_teachers,
                            file3_2: existingData.ep3.file3_2 && filePaths.file3_2 ? filePaths.file3_2 : existingData.ep3.file3_2 || filePaths.file3_2,
                            sanctioned_posts: req.body.sanctioned_posts,
                            file3_3: existingData.ep3.file3_3 && filePaths.file3_3 ? filePaths.file3_3 : existingData.ep3.file3_3 || filePaths.file3_3
                        },
                        ep4: {
                            eligible_admission_applications: req.body.eligible_admission_applications,
                            file4_1: existingData.ep4.file4_1 && filePaths.file4_1 ? filePaths.file4_1 : existingData.ep4.file4_1 || filePaths.file4_1,
                            reserved_category_seats: req.body.reserved_category_seats,
                            file4_2: existingData.ep4.file4_2 && filePaths.file4_2 ? filePaths.file4_2 : existingData.ep4.file4_2 || filePaths.file4_2,
                            classrooms_and_seminar_halls: req.body.classrooms_and_seminar_halls,
                            total_computers: req.body.total_computers,
                            total_expenditure: req.body.total_expenditure
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
            const newData = new ExtendedProfileModel({
                department: req.body.department,
                academicYear: req.body.academicYear,
                ep1: {
                    programmes: req.body.programmes,
                    file1_1: filePaths.file1_1,
                    departments: req.body.departments
                },
                ep2: {
                    students: req.body.students,
                    file2_1: filePaths.file2_1,
                    outgoing_students: req.body.outgoing_students,
                    file2_2: filePaths.file2_2,
                    students_appeared_in_university_exam: req.body.students_appeared_in_university_exam,
                    file2_3: filePaths.file2_3,
                    reval_applications: req.body.reval_applications
                },
                ep3: {
                    courses_in_all_programmes: req.body.courses_in_all_programmes,
                    file3_1: filePaths.file3_1,
                    full_time_teachers: req.body.full_time_teachers,
                    file3_2: filePaths.file3_2,
                    sanctioned_posts: req.body.sanctioned_posts,
                    file3_3: filePaths.file3_3
                },
                ep4: {
                    eligible_admission_applications: req.body.eligible_admission_applications,
                    file4_1: filePaths.file4_1,
                    reserved_category_seats: req.body.reserved_category_seats,
                    file4_2: filePaths.file4_2,
                    classrooms_and_seminar_halls: req.body.classrooms_and_seminar_halls,
                    total_computers: req.body.total_computers,
                    total_expenditure: req.body.total_expenditure
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

export { app as EP_submit };
