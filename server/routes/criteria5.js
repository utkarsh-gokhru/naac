import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import Criteria5Model from '../models/criteria5.js';
import { getStorage } from '../firebase.js';
import { ref, getDownloadURL, deleteObject, uploadBytes } from 'firebase/storage';

const app = express();

app.use(bodyParser.json());

const storage = getStorage();

//Function to delete the existing files
const deleteExistingFiles = async (data) => {

    const filePaths = [
        // Criterion 5.1
        data?.criteria51?.file5_1_1_1,
        data?.criteria51?.file5_1_1_2,
        data?.criteria51?.file5_1_2_1,
        data?.criteria51?.file5_1_2_2,
        data?.criteria51?.file5_1_3_1,
        data?.criteria51?.file5_1_3_2,
        data?.criteria51?.file5_1_4,
    
        // Criterion 5.2
        data?.criteria52?.file5_2_1_1,
        data?.criteria52?.file5_2_1_2,
        data?.criteria52?.file5_2_2_1,
        data?.criteria52?.file5_2_2_2,
        data?.criteria52?.file5_2_3_1,
        data?.criteria52?.file5_2_3_2,
    
        // Criterion 5.3
        data?.criteria53?.file5_3_1_1,
        data?.criteria53?.file5_3_1_2,
        data?.criteria53?.file5_3_2,
        data?.criteria53?.file5_3_3_1,
        data?.criteria53?.file5_3_3_2,
    
        // Criterion 5.4
        data?.criteria54?.file5_4_1,
        data?.criteria54?.file5_4_2
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
    'file5_1_1_1', 'file5_1_1_2', 'file5_1_2_1', 'file5_1_2_2',
    'file5_1_3_1', 'file5_1_3_2', 'file5_1_4',
    'file5_2_1_1', 'file5_2_1_2', 'file5_2_2_1', 'file5_2_2_2',
    'file5_2_3_1', 'file5_2_3_2',
    'file5_3_1_1', 'file5_3_1_2', 'file5_3_2', 'file5_3_3_1',
    'file5_3_3_2',
    'file5_4_1', 'file5_4_2'
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

app.post('/criteria1/submit', upload.fields([
    { name: 'file5_1_1_1', maxCount: 1 },
    { name: 'file5_1_1_2', maxCount: 1 },
    { name: 'file5_1_2_1', maxCount: 1 },
    { name: 'file5_1_2_2', maxCount: 1 },
    { name: 'file5_1_3_1', maxCount: 1 },
    { name: 'file5_1_3_2', maxCount: 1 },
    { name: 'file5_1_4', maxCount: 1 },
    { name: 'file5_2_1_1', maxCount: 1 },
    { name: 'file5_2_1_2', maxCount: 1 },
    { name: 'file5_2_2_1', maxCount: 1 },
    { name: 'file5_2_2_2', maxCount: 1 },
    { name: 'file5_2_3_1', maxCount: 1 },
    { name: 'file5_2_3_2', maxCount: 1 },
    { name: 'file5_3_1_1', maxCount: 1 },
    { name: 'file5_3_1_2', maxCount: 1 },
    { name: 'file5_3_2', maxCount: 1 },
    { name: 'file5_3_3_1', maxCount: 1 },
    { name: 'file5_3_3_2', maxCount: 1 },
    { name: 'file5_4_1', maxCount: 1 },
    { name: 'file5_4_2', maxCount: 1 }
]), async (req, res) => {
    try {
        const files = req.files;
        const filePaths = {};

        const requiredFileFields = [
            'file5_1_1_1', 'file5_1_1_2', 'file5_1_2_1', 'file5_1_2_2',
            'file5_1_3_1', 'file5_1_3_2', 'file5_1_4',
            'file5_2_1_1', 'file5_2_1_2', 'file5_2_2_1', 'file5_2_2_2',
            'file5_2_3_1', 'file5_2_3_2',
            'file5_3_1_1', 'file5_3_1_2', 'file5_3_2', 'file5_3_3_1',
            'file5_3_3_2',
            'file5_4_1', 'file5_4_2'
        ];        

        let existingData = await Criteria5Model.findOne({ department: req.body.department, academicYear: req.body.academicYear });

        const missingFields = requiredFileFields.filter(fieldName => !files[fieldName]);

        if (missingFields.length > 0) {
            for (const missingField of missingFields) {
                if (existingData) {
                    if (missingField.startsWith('file5_1')) {
                        if (existingData.criteria51 && existingData.criteria51.hasOwnProperty(missingField)) {
                            const index = requiredFileFields.indexOf(missingField);
                            if (index !== -1) {
                                requiredFileFields.splice(index, 1);
                                expectedFileFields.splice(index, 1);
                            }
                        }
                    } else if (missingField.startsWith('file5_2')) {
                        if (existingData.criteria52 && existingData.criteria52.hasOwnProperty(missingField)) {
                            const index = requiredFileFields.indexOf(missingField);
                            if (index !== -1) {
                                requiredFileFields.splice(index, 1);
                                expectedFileFields.splice(index, 1);
                            }
                        }
                    } else if (missingField.startsWith('file5_3')) {
                        if (existingData.criteria53 && existingData.criteria53.hasOwnProperty(missingField)) {
                            const index = requiredFileFields.indexOf(missingField);
                            if (index !== -1) {
                                requiredFileFields.splice(index, 1);
                                expectedFileFields.splice(index, 1);
                            }
                        }
                    } else if (missingField.startsWith('file5_4')) {
                        if (existingData.criteria54 && existingData.criteria54.hasOwnProperty(missingField)) {
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
                const criteria = existingDataCopy[`criteria5${i}`]; // Adjust criteria name
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
                        criteria51: {
                            scholarship_beneficiaries: req.body.scholarship_beneficiaries,
                            career_counsel_beneficiaries: req.body.career_counsel_beneficiaries,
                            capacity_development_initiatives: req.body.capacity_development_initiatives,
                            student_grievances_redressal: req.body.student_grievances_redressal,
                            file5_1_1_1: existingData.criteria51.file5_1_1_1 && filePaths.file5_1_1_1 ? filePaths.file5_1_1_1 : existingData.criteria51.file5_1_1_1 || filePaths.file5_1_1_1,
                            file5_1_1_2: existingData.criteria51.file5_1_1_2 && filePaths.file5_1_1_2 ? filePaths.file5_1_1_2 : existingData.criteria51.file5_1_1_2 || filePaths.file5_1_1_2,
                            file5_1_2_1: existingData.criteria51.file5_1_2_1 && filePaths.file5_1_2_1 ? filePaths.file5_1_2_1 : existingData.criteria51.file5_1_2_1 || filePaths.file5_1_2_1,
                            file5_1_2_2: existingData.criteria51.file5_1_2_2 && filePaths.file5_1_2_2 ? filePaths.file5_1_2_2 : existingData.criteria51.file5_1_2_2 || filePaths.file5_1_2_2,
                            file5_1_3_1: existingData.criteria51.file5_1_3_1 && filePaths.file5_1_3_1 ? filePaths.file5_1_3_1 : existingData.criteria51.file5_1_3_1 || filePaths.file5_1_3_1,
                            file5_1_3_2: existingData.criteria51.file5_1_3_2 && filePaths.file5_1_3_2 ? filePaths.file5_1_3_2 : existingData.criteria51.file5_1_3_2 || filePaths.file5_1_3_2,
                            file5_1_4: existingData.criteria51.file5_1_4 && filePaths.file5_1_4 ? filePaths.file5_1_4 : existingData.criteria51.file5_1_4 || filePaths.file5_1_4
                        },
                        criteria52: {
                            students_qualified: req.body.students_qualified,
                            students_appeared: req.body.students_appeared,
                            placement_no: req.body.placement_no,
                            higher_studies_students: req.body.higher_studies_students,
                            file5_2_1_1: existingData.criteria52.file5_2_1_1 && filePaths.file5_2_1_1 ? filePaths.file5_2_1_1 : existingData.criteria52.file5_2_1_1 || filePaths.file5_2_1_1,
                            file5_2_1_2: existingData.criteria52.file5_2_1_2 && filePaths.file5_2_1_2 ? filePaths.file5_2_1_2 : existingData.criteria52.file5_2_1_2 || filePaths.file5_2_1_2,
                            file5_2_2_1: existingData.criteria52.file5_2_2_1 && filePaths.file5_2_2_1 ? filePaths.file5_2_2_1 : existingData.criteria52.file5_2_2_1 || filePaths.file5_2_2_1,
                            file5_2_2_2: existingData.criteria52.file5_2_2_2 && filePaths.file5_2_2_2 ? filePaths.file5_2_2_2 : existingData.criteria52.file5_2_2_2 || filePaths.file5_2_2_2,
                            file5_2_3_1: existingData.criteria52.file5_2_3_1 && filePaths.file5_2_3_1 ? filePaths.file5_2_3_1 : existingData.criteria52.file5_2_3_1 || filePaths.file5_2_3_1,
                            file5_2_3_2: existingData.criteria52.file5_2_3_2 && filePaths.file5_2_3_2 ? filePaths.file5_2_3_2 : existingData.criteria52.file5_2_3_2 || filePaths.file5_2_3_2,
                        },
                        criteria53: {
                            awards_no: req.body.awards_no,
                            student_council: req.body.student_council,
                            events: req.body.events,
                            file5_3_1_1: existingData.criteria53.file5_3_1_1 && filePaths.file5_3_1_1 ? filePaths.file5_3_1_1 : existingData.criteria53.file5_3_1_1 || filePaths.file5_3_1_1,
                            file5_3_1_2: existingData.criteria53.file5_3_1_2 && filePaths.file5_3_1_2 ? filePaths.file5_3_1_2 : existingData.criteria53.file5_3_1_2 || filePaths.file5_3_1_2,
                            file5_3_2: existingData.criteria53.file5_3_2 && filePaths.file5_3_2 ? filePaths.file5_3_2 : existingData.criteria53.file5_3_2 || filePaths.file5_3_2,
                            file5_3_3_1: existingData.criteria53.file5_3_3_1 && filePaths.file5_3_3_1 ? filePaths.file5_3_3_1 : existingData.criteria53.file5_3_3_1 || filePaths.file5_3_3_1,
                            file5_3_3_2: existingData.criteria53.file5_3_3_2 && filePaths.file5_3_3_2 ? filePaths.file5_3_3_2 : existingData.criteria53.file5_3_3_2 || filePaths.file5_3_3_2,
                        },
                        criteria54: {
                            alumni_chapters: req.body.alumni_chapters,
                            alumni_contributions: req.body.alumni_contributions,
                            file5_4_1: existingData.criteria54.file5_4_1 && filePaths.file5_4_1 ? filePaths.file5_4_1 : existingData.criteria54.file5_4_1 || filePaths.file5_4_1,
                            file5_4_2: existingData.criteria54.file5_4_2 && filePaths.file5_4_2 ? filePaths.file5_4_2 : existingData.criteria54.file5_4_2 || filePaths.file5_4_2,
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
            const newData = new Criteria5Model({
                department: req.body.department,
                academicYear: req.body.academicYear,
                criteria51: {
                    scholarship_beneficiaries: req.body.scholarship_beneficiaries,
                    career_counsel_beneficiaries: req.body.career_counsel_beneficiaries,
                    capacity_development_initiatives: req.body.capacity_development_initiatives,
                    student_grievances_redressal: req.body.student_grievances_redressal,
                    file5_1_1_1: filePaths.file5_1_1_1,
                    file5_1_1_2: filePaths.file5_1_1_2,
                    file5_1_2_1: filePaths.file5_1_2_1,
                    file5_1_2_2: filePaths.file5_1_2_2,
                    file5_1_3_1: filePaths.file5_1_3_1,
                    file5_1_3_2: filePaths.file5_1_3_2,
                    file5_1_4: filePaths.file5_1_4,
                },
                criteria52: {
                    students_qualified: req.body.students_qualified,
                    students_appeared: req.body.students_appeared,
                    placement_no: req.body.placement_no,
                    higher_studies_students: req.body.higher_studies_students,
                    file5_2_1_1: filePaths.file5_2_1_1,
                    file5_2_1_2: filePaths.file5_2_1_2,
                    file5_2_2_1: filePaths.file5_2_2_1,
                    file5_2_2_2: filePaths.file5_2_2_2,
                    file5_2_3_1: filePaths.file5_2_3_1,
                    file5_2_3_2: filePaths.file5_2_3_2,
                },
                criteria53: {
                    awards_no: req.body.awards_no,
                    student_council: req.body.student_council,
                    events: req.body.events,
                    file5_3_1_1: filePaths.file5_3_1_1,
                    file5_3_1_2: filePaths.file5_3_1_2,
                    file5_3_2: filePaths.file5_3_2,
                    file5_3_3_1: filePaths.file5_3_3_1,
                    file5_3_3_2: filePaths.file5_3_3_2,
                },
                criteria54: {
                    alumni_chapters: req.body.alumni_chapters,
                    alumni_contributions: req.body.alumni_contributions,
                    file5_4_1: filePaths.file5_4_1,
                    file5_4_2: filePaths.file5_4_2,
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

export { app as Criteria5_submit };
