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

// Function to update existing data with new file paths
const updateExistingData = async (existingData, filePaths) => {
    Object.keys(existingData).forEach(criteriaKey => {
        Object.keys(existingData[criteriaKey]).forEach(fieldKey => {
            if (filePaths[fieldKey]) {
                existingData[criteriaKey][fieldKey] = filePaths[fieldKey];
            }
        });
    });

    return existingData.save();
};

// Define route for submitting Criteria 3 data
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
    { name: 'file3_7_2_2', maxCount: 1 },
]), async (req, res) => {
    try {
        const files = req.files;
        const filePaths = {};

        // Upload new files to storage
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

        // Check if existing data exists in the database
        let existingData = await Criteria3Model.findOne({ department: req.body.department, academicYear: req.body.academicYear });
        
        if (existingData) {
            // If existing data exists, delete existing files from storage
            const deleteResults = await deleteExistingFiles(existingData);

            // Update existing data with new file paths
            const updateResult = await updateExistingData(existingData, filePaths);

            if (updateResult.success) {
                try {
                    existingData.set({
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
                    await existingData.save();
                    console.log('Data updated and saved successfully!');
                    res.status(201).send(updateResult.message);
                } catch (error) {
                    console.error('Error saving updated data:', error);
                    res.status(500).send('Internal Server Error');
                }
            }

            console.log('Data updated and saved successfully!');
            res.status(201).send('Data updated and saved successfully!');
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
                res.status(201).send('Data saved successfully!');
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
