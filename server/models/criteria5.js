import mongoose from "mongoose";

const Criteria5Schema = new mongoose.Schema({
  department: {type: String},
  academicYear: {type: String},
  criteria51: {
    scholarship_beneficiaries: { type: Number },
    file5_1_1_1: { type: String },
    file5_1_1_2: { type: String },
    career_counsel_beneficiaries: { type: Number },
    file5_1_2_1: { type: String },
    file5_1_2_2: { type: String },
    capacity_development_initiatives: { type: String },
    file5_1_3_1: { type: String },
    file5_1_3_2: { type: String },
    student_grievances_redressal: { type: String },
    file5_1_4: { type: String },
  },
  criteria52:{
    students_qualified: { type: Number },
    students_appeared: { type: Number },
    file5_2_1_1: { type: String },
    file5_2_1_2: { type: String },
    placement_no: { type: Number },
    file5_2_2_1: { type: String },
    file5_2_2_2: { type: String },
    higher_studies_students: { type: Number },
    file5_2_3_1: { type: String },
    file5_2_3_2: { type: String },
  },
  criteria53: {
    awards_no: { type: Number },
    file5_3_1_1: { type: String },
    file5_3_1_2: { type: String },
    student_council: { type: String },
    file5_3_2: { type: String },
    events: { type: Number },
    file5_3_3_1: { type: String },
    file5_3_3_2: { type: String },
  },
  criteria54: {
    alumni_chapters: { type: String },
    file5_4_1: { type: String },
    alumni_contributions: { type: Number },
    file5_4_2: { type: String },
  }
});

const Criteria5Model = mongoose.model('Criteria5', Criteria5Schema);

export default Criteria5Model;