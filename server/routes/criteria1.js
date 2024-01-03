import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
import Criteria1Model from '../models/criteria1.js';
import fs from 'fs';

const app = express();

app.use(bodyParser.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });

const deleteExistingFiles = (data) => {
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
    ];

    filePaths.forEach(filePath => {
        if (filePath) {
            try {
                fs.unlinkSync(filePath);
                console.log(`Deleted existing file: ${filePath}`);
            } catch (err) {
                console.error(`Error deleting existing file ${filePath}:`, err);
            }
        }
    });
};


app.post('/submit', upload.fields([
    { name: 'file1_1_1', maxCount: 1 },
    { name: 'file1_1_2_1', maxCount: 1 },
    { name: 'file1_1_2_2', maxCount: 1 },
    { name: 'file1_1_3_1', maxCount: 1 },
    { name: 'file1_1_3_2', maxCount: 1 },
    { name: 'file1_2_1_1', maxCount: 1 },
    { name: 'file1_2_1_2', maxCount: 1 },
    { name: 'file1_2_2_1', maxCount: 1 },
    { name: 'file1_2_2_2', maxCount: 1 },
    { name: 'file1_3_1', maxCount: 1 },
    { name: 'file1_3_2_1', maxCount: 1 },
    { name: 'file1_3_2_2', maxCount: 1 },
    { name: 'file1_3_3_1_1', maxCount: 1 },
    { name: 'file1_3_3_1_2', maxCount: 1 },
    { name: 'file1_3_4_1', maxCount: 1 },
    { name: 'file1_3_4_2', maxCount: 1 },
    { name: 'file1_4_1', maxCount: 1 },
]), async (req, res) => {
    try {
        const files = req.files;
        const filePaths = {
            file1_1_1: path.join('uploads', files['file1_1_1'][0].filename),
            file1_1_2_1: path.join('uploads', files['file1_1_2_1'][0].filename),
            file1_1_2_2: path.join('uploads', files['file1_1_2_2'][0].filename),
            file1_1_3_1: path.join('uploads', files['file1_1_3_1'][0].filename),
            file1_1_3_2: path.join('uploads', files['file1_1_3_2'][0].filename),
            file1_2_1_1: path.join('uploads', files['file1_2_1_1'][0].filename),
            file1_2_1_2: path.join('uploads', files['file1_2_1_2'][0].filename),
            file1_2_2_1: path.join('uploads', files['file1_2_2_1'][0].filename),
            file1_2_2_2: path.join('uploads', files['file1_2_2_2'][0].filename),
            file1_3_1: path.join('uploads', files['file1_3_1'][0].filename),
            file1_3_2_1: path.join('uploads', files['file1_3_2_1'][0].filename),
            file1_3_2_2: path.join('uploads', files['file1_3_2_2'][0].filename),
            file1_3_3_1_1: path.join('uploads', files['file1_3_3_1_1'][0].filename),
            file1_3_3_1_2: path.join('uploads', files['file1_3_3_1_2'][0].filename),
            file1_3_4_1: path.join('uploads', files['file1_3_4_1'][0].filename),
            file1_3_4_2: path.join('uploads', files['file1_3_4_2'][0].filename),
            file1_4_1: path.join('uploads', files['file1_4_1'][0].filename),
        };

        let existingData = await Criteria1Model.findOne({ department: req.body.department, academicYear: req.body.academicYear });

        if (existingData) {
            deleteExistingFiles(existingData);
            existingData.set({
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
                    text_1_3_1: req.body.text_1_3_1,
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
                },
            });

            await existingData.save();
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
                    text_1_3_1: req.body.text_1_3_1,
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
                },
            });

            await newData.save();
        }

        res.status(201).send('Data submitted successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

export { app as Criteria1_submit };
