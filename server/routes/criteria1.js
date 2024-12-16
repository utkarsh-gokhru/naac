import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import Criteria1Model from '../models/criteria1.js';
import { getStorage } from '../firebase.js';
import { deleteFiles } from '../utils/deletefiles.js';
import { updateExistingData } from '../utils/updateData.js';
import { uploadFilesToFirebase } from '../utils/fileUpload.js';

const app = express();

app.use(bodyParser.json());

const storage = getStorage();

//Function to delete the existing files
const deleteExistingFiles = async (data) => {

    const filePaths = [
        data?.criteria11?.file1_1_1,
        data?.criteria11?.file1_1_2_1,
        data?.criteria11?.file1_1_2_2,
        data?.criteria11?.file1_1_3_1,
        data?.criteria11?.file1_1_3_2,
        data?.criteria12?.file1_2_1_1,
        data?.criteria12?.file1_2_1_2,
        data?.criteria12?.file1_2_2_1,
        data?.criteria12?.file1_2_2_2,
        data?.criteria13?.file1_3_1,
        data?.criteria13?.file1_3_2_1,
        data?.criteria13?.file1_3_2_2,
        data?.criteria13?.file1_3_3_1_1,
        data?.criteria13?.file1_3_3_1_2,
        data?.criteria13?.file1_3_4_1,
        data?.criteria13?.file1_3_4_2,
        data?.criteria14?.file1_4_1,
        data?.criteria14?.file1_4_2
    ];
    deleteFiles(filePaths, storage);
};

const upload = multer();

const expectedFileFields = [
    'file1_1_1', 'file1_1_2_1', 'file1_1_2_2', 'file1_1_3_1',
    'file1_1_3_2', 'file1_2_1_1', 'file1_2_1_2', 'file1_2_2_1',
    'file1_2_2_2', 'file1_3_1', 'file1_3_2_1', 'file1_3_2_2',
    'file1_3_3_1_1', 'file1_3_3_1_2', 'file1_3_4_1', 'file1_3_4_2',
    'file1_4_1', 'file1_4_2'
];

//Handling post request 
app.post('/criteria1/submit', upload.fields(expectedFileFields.map(field => ({ name: field, maxCount: 1 }))), async (req, res) => {
    try {
        const files = req.files;

        const requiredFileFields = [...expectedFileFields];

        let existingData = await Criteria1Model.findOne({ department: req.body.department, academicYear: req.body.academicYear });

        const missingFields = requiredFileFields.filter(fieldName => !files[fieldName]);

        if (missingFields.length > 0) {
            for (const missingField of missingFields) {
                if (existingData) {

                    if (missingField.startsWith('file1_1')) {
                        if (existingData && existingData.criteria11 && existingData.criteria11.hasOwnProperty(missingField)) {
                            const index = requiredFileFields.indexOf(missingField);
                            if (index !== -1) {
                                requiredFileFields.splice(index, 1);
                                expectedFileFields.splice(index, 1);
                            }
                        }
                    }

                    else if (missingField.startsWith('file1_2')) {
                        if (existingData && existingData.criteria12 && existingData.criteria12.hasOwnProperty(missingField)) {
                            const index = requiredFileFields.indexOf(missingField);
                            if (index !== -1) {
                                requiredFileFields.splice(index, 1);
                                expectedFileFields.splice(index, 1);
                            }
                        }
                    }

                    else if (missingField.startsWith('file1_3')) {
                        if (existingData && existingData.criteria13 && existingData.criteria13.hasOwnProperty(missingField)) {
                            const index = requiredFileFields.indexOf(missingField);
                            if (index !== -1) {
                                requiredFileFields.splice(index, 1);
                                expectedFileFields.splice(index, 1);
                            }
                        }
                    }

                    else if (missingField.startsWith('file1_4')) {
                        if (existingData && existingData.criteria14 && existingData.criteria14.hasOwnProperty(missingField)) {
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

        const filePaths = await uploadFilesToFirebase(files, storage);

        if (existingData) {

            const existingDataCopy = JSON.parse(JSON.stringify(existingData));

            for (let i = 11; i <= 14; i++) {
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
            const updateResult = await updateExistingData(existingData, filePaths, expectedFileFields);

            if (updateResult.success) {
                try {
                    existingData.set({
                        criteria11: {
                            curriculumText: req.body.curriculumText,
                            syllabusRevisionCount: req.body.syllabusRevisionCount,
                            file1_1_1: existingData.criteria11.file1_1_1 && filePaths.file1_1_1 ? filePaths.file1_1_1 : existingData.criteria11.file1_1_1 || filePaths.file1_1_1,
                            file1_1_2_1: existingData.criteria11.file1_1_2_1 && filePaths.file1_1_2_1 ? filePaths.file1_1_2_1 : existingData.criteria11.file1_1_2_1 || filePaths.file1_1_2_1,
                            file1_1_2_2: existingData.criteria11.file1_1_2_2 && filePaths.file1_1_2_2 ? filePaths.file1_1_2_2 : existingData.criteria11.file1_1_2_2 || filePaths.file1_1_2_2,
                            coursesFocusCount: req.body.coursesFocusCount,
                            file1_1_3_1: existingData.criteria11.file1_1_3_1 && filePaths.file1_1_3_1 ? filePaths.file1_1_3_1 : existingData.criteria11.file1_1_3_1 || filePaths.file1_1_3_1,
                            file1_1_3_2: existingData.criteria11.file1_1_3_2 && filePaths.file1_1_3_2 ? filePaths.file1_1_3_2 : existingData.criteria11.file1_1_3_2 || filePaths.file1_1_3_2,
                        },
                        criteria12: {
                            programCount1_2_2: req.body.programCount1_2_2,
                            newCoursesCount1_2_1: req.body.newCoursesCount1_2_1,
                            file1_2_1_1: existingData.criteria12.file1_2_1_1 && filePaths.file1_2_1_1 ? filePaths.file1_2_1_1 : existingData.criteria12.file1_2_1_1 || filePaths.file1_2_1_1,
                            file1_2_1_2: existingData.criteria12.file1_2_1_2 && filePaths.file1_2_1_2 ? filePaths.file1_2_1_2 : existingData.criteria12.file1_2_1_2 || filePaths.file1_2_1_2,
                            file1_2_2_1: existingData.criteria12.file1_2_2_1 && filePaths.file1_2_2_1 ? filePaths.file1_2_2_1 : existingData.criteria12.file1_2_2_1 || filePaths.file1_2_2_1,
                            file1_2_2_2: existingData.criteria12.file1_2_2_2 && filePaths.file1_2_2_2 ? filePaths.file1_2_2_2 : existingData.criteria12.file1_2_2_2 || filePaths.file1_2_2_2,
                        },
                        criteria13: {
                            valueAddedCoursesCount1_3_2: req.body.valueAddedCoursesCount1_3_2,
                            enrolledStudentsCount1_3_3_1: req.body.enrolledStudentsCount1_3_3_1,
                            projectsCount1_3_4: req.body.projectsCount1_3_4,
                            text1_3_1: req.body.text1_3_1,
                            file1_3_1: existingData.criteria13.file1_3_1 && filePaths.file1_3_1 ? filePaths.file1_3_1 : existingData.criteria13.file1_3_1 || filePaths.file1_3_1,
                            file1_3_2_1: existingData.criteria13.file1_3_2_1 && filePaths.file1_3_2_1 ? filePaths.file1_3_2_1 : existingData.criteria13.file1_3_2_1 || filePaths.file1_3_2_1,
                            file1_3_2_2: existingData.criteria13.file1_3_2_2 && filePaths.file1_3_2_2 ? filePaths.file1_3_2_2 : existingData.criteria13.file1_3_2_2 || filePaths.file1_3_2_2,
                            file1_3_3_1_1: existingData.criteria13.file1_3_3_1_1 && filePaths.file1_3_3_1_1 ? filePaths.file1_3_3_1_1 : existingData.criteria13.file1_3_3_1_1 || filePaths.file1_3_3_1_1,
                            file1_3_3_1_2: existingData.criteria13.file1_3_3_1_2 && filePaths.file1_3_3_1_2 ? filePaths.file1_3_3_1_2 : existingData.criteria13.file1_3_3_1_2 || filePaths.file1_3_3_1_2,
                            file1_3_4_1: existingData.criteria13.file1_3_4_1 && filePaths.file1_3_4_1 ? filePaths.file1_3_4_1 : existingData.criteria13.file1_3_4_1 || filePaths.file1_3_4_1,
                            file1_3_4_2: existingData.criteria13.file1_3_4_2 && filePaths.file1_3_4_2 ? filePaths.file1_3_4_2 : existingData.criteria13.file1_3_4_2 || filePaths.file1_3_4_2,
                        },
                        criteria14: {
                            feedbackType1_4_1: req.body.feedbackType1_4_1,
                            feedbackType1_4_2: req.body.feedbackType1_4_2,
                            file1_4_1: existingData.criteria14.file1_4_1 && filePaths.file1_4_1 ? filePaths.file1_4_1 : existingData.criteria14.file1_4_1 || filePaths.file1_4_1,
                            file1_4_2: existingData.criteria14.file1_4_2 && filePaths.file1_4_2 ? filePaths.file1_4_2 : existingData.criteria14.file1_4_2 || filePaths.file1_4_2,
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
            const newData = new Criteria1Model({
                department: req.body.department,
                academicYear: req.body.academicYear,
                criteria11: {
                    curriculumText: req.body.curriculumText,
                    syllabusRevisionCount: req.body.syllabusRevisionCount,
                    file1_1_1: filePaths.file1_1_1,
                    file1_1_2_1: filePaths.file1_1_2_1,
                    file1_1_2_2: filePaths.file1_1_2_2,
                    coursesFocusCount: req.body.coursesFocusCount,
                    file1_1_3_1: filePaths.file1_1_3_1,
                    file1_1_3_2: filePaths.file1_1_3_2,
                },
                criteria12: {
                    programCount1_2_2: req.body.programCount1_2_2,
                    newCoursesCount1_2_1: req.body.newCoursesCount1_2_1,
                    file1_2_1_1: filePaths.file1_2_1_1,
                    file1_2_1_2: filePaths.file1_2_1_2,
                    file1_2_2_1: filePaths.file1_2_2_1,
                    file1_2_2_2: filePaths.file1_2_2_2,
                },
                criteria13: {
                    valueAddedCoursesCount1_3_2: req.body.valueAddedCoursesCount1_3_2,
                    enrolledStudentsCount1_3_3_1: req.body.enrolledStudentsCount1_3_3_1,
                    projectsCount1_3_4: req.body.projectsCount1_3_4,
                    text1_3_1: req.body.text1_3_1,
                    file1_3_1: filePaths.file1_3_1,
                    file1_3_2_1: filePaths.file1_3_2_1,
                    file1_3_2_2: filePaths.file1_3_2_2,
                    file1_3_3_1_1: filePaths.file1_3_3_1_1,
                    file1_3_3_1_2: filePaths.file1_3_3_1_2,
                    file1_3_4_1: filePaths.file1_3_4_1,
                    file1_3_4_2: filePaths.file1_3_4_2,
                },
                criteria14: {
                    feedbackType1_4_1: req.body.feedbackType1_4_1,
                    feedbackType1_4_2: req.body.feedbackType1_4_2,
                    file1_4_1: filePaths.file1_4_1,
                    file1_4_2: filePaths.file1_4_2,
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

export { app as Criteria1_submit };
