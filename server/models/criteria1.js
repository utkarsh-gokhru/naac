import mongoose from "mongoose";

const Criteria1Schema = new mongoose.Schema({
  department: {type: String},
  academicYear: {type: String},
  criteria11: {
    curriculumText: { type: String },
    syllabusRevisionCount: { type: Number },
    file1_1_1: { type: String },
    file1_1_2_1: { type: String },
    file1_1_2_2: { type: String },
    coursesFocusCount: { type: Number },
    file1_1_3_1: { type: String },
    file1_1_3_2: { type: String },
  },
  criteria12: {
    programCount1_2_2: { type: Number },
    newCoursesCount1_2_1: { type: Number },
    file1_2_1_1: { type: String },
    file1_2_1_2: { type: String },
    file1_2_2_1: { type: String },
    file1_2_2_2: { type: String }
  },
  criteria13: {
    text1_3_1: {type: String},
    file1_3_1: {type: String},
    valueAddedCoursesCount1_3_2: { type: Number },
    enrolledStudentsCount1_3_3_1: { type: Number },
    projectsCount1_3_4: { type: Number },
    file1_3_2_1: { type: String },
    file1_3_2_2: { type: String },
    file1_3_3_1_1: { type: String },
    file1_3_3_1_2: { type: String },
    file1_3_4_1: { type: String },
    file1_3_4_2: { type: String },
  },
  criteria14: {
    feedbackType1_4_1: { type: String },
    feedbackType1_4_2: { type: String },
    file1_4_1: { type: String },
    file1_4_2: { type: String }
  }
});

const Criteria1Model = mongoose.model('Criteria1', Criteria1Schema);

export default Criteria1Model;
