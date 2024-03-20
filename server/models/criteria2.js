import mongoose from "mongoose";

const Criteria2Schema = new mongoose.Schema({
  department: {type: String},
  academicYear: {type: String},
  criteria21: {
    no_of_seats: {type: Number},
    file2_1_1_1: {type: String},
    file2_1_1_2: {type: String},
    students_reserved_cat: {type: Number},
    file2_1_2_1: {type: String},
    file2_1_2_2: {type: String},
  },
  criteria22: {
    learning_assessment: {type: String},
    file2_2_1_1: {type: String},
    link2_2_1_2: {type: String},
    no_of_students: {type: Number},
    no_of_teachers: {type: Number},
    file2_2_2: {type: String},
  },
  criteria23: {
    learning_exp: {type: String},
    file2_3_1: {type: String},
    effect_teach_learn: {type: String},
    file2_3_2: {type: String},
    no_of_mentors: {type: Number},
    file2_3_3: {type: String},
  },
  criteria24: {
    full_time_teachers: {type: Number},
    file2_4_1_1: {type: String},
    file2_4_1_2: {type: String},
    full_time_teachers_phd_etc: {type: Number},
    file2_4_2_1: {type: String},
    file2_4_2_2: {type: String},
    total_exp: {type: Number},
    file2_4_3_1: {type: String},
    file2_4_3_2: {type: String},
    award_rec_teachers: {type: Number},
    file2_4_4_1: {type: String},
    file2_4_4_2: {type: String},
  },
  criteria25: {
    no_of_days: {type: Number},
    no_of_days_yearwise: {type: Number},
    file2_5_1_1: {type: String},
    file2_5_1_2: {type: String},
    no_of_student_grievances: {type: Number},
    file2_5_2: {type: String},
    it_integration: {type: String},
    file2_5_3: {type: String},
    status_of_automation: {type: String},
    file2_5_4_1: {type: String},
    file2_5_4_2: {type: String},
  },
  criteria26: {
    learning_outcomes: {type: String},
    file2_6_1: {type: String},
    attainment_prog_outcomes: {type: String},
    file2_6_2: {type: String},
    final_year_students_passed: {type: Number},
    final_year_students_appeared: {type: Number},
    file2_6_3_2_1: {type: String},
    file2_6_3_2_2: {type: String},
  },
  criteria27: {
    sss_web_link: {type: String},
  }

});

const Criteria2Model = mongoose.model('Criteria2', Criteria2Schema);

export default Criteria2Model;
