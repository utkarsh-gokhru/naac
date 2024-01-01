import mongoose from "mongoose";

const Criteria1Schema = new mongoose.Schema({
  criteria11: {
    curriculumText: { type: String, required: true },
    syllabusRevisionCount: { type: Number, required: true },
    file1_1_1: { type: String, required: true },
    file1_1_2_1: { type: String, required: true },
    file1_1_2_2: { type: String, required: true },
    coursesFocusCount: { type: Number, required: true },
    file1_1_3_1: { type: String, required: true },
    file1_1_3_2: { type: String, required: true },
  },
  criteria12: {
    programCount1_2_2: { type: Number, required: true },
    newCoursesCount1_2_1: { type: Number, required: true },
    file1_2_1_1: { type: String, required: true },
    file1_2_1_2: { type: String, required: true },
    file1_2_2_1: { type: String, required: true },
    file1_2_2_2: { type: String, required: true }
  },
  criteria13: {
    valueAddedCoursesCount1_3_2: { type: Number, required: true },
        enrolledStudentsCount1_3_3_1: { type: Number, required: true },
        projectsCount1_3_4: { type: Number, required: true },
        file1_3_2_1: { type: String, required: true },
        file1_3_2_2: { type: String, required: true },
        file1_3_3_1_1: { type: String, required: true },
        file1_3_3_1_2: { type: String, required: true },
        file1_3_4_1: { type: String, required: true },
        file1_3_4_2: { type: String, required: true },
  },
  criteria14: {
    feedbackType1_4_1: { type: String, required: true },
    feedbackType1_4_2: { type: String, required: true },
    file1_4_1: { type: String, required: true },
  }
});

const Criteria1Model = mongoose.model('Criteria1', Criteria1Schema);

export default Criteria1Model;
