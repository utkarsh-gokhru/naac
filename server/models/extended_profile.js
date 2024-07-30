import mongoose from "mongoose";

const ExtendedProfileSchema = new mongoose.Schema({
    department: { type: String },
    academicYear: { type: String },
    ep1: {
        programmes: { type: Number },
        file1_1: { type: String },
        departments: { type: Number },
    },
    ep2: {
        students: { type: Number },
        file2_1: { type: String },
        outgoing_students: { type: Number },
        file2_2: { type: String },
        students_appeared_in_university_exam: { type: Number },
        file2_3: { type: String },
        reval_applications: { type: Number },
    },
    ep3: {
        courses_in_all_programmes: { type: Number },
        file3_1: { type: String },
        full_time_teachers: { type: Number },
        file3_2: { type: String },
        sanctioned_posts: { type: Number },
        file3_3: { type: String },
    },
    ep4: {
        eligible_admission_applications: { type: Number },
        file4_1: { type: String },
        reserved_category_seats: { type: Number },
        file4_2: { type: String },
        classrooms_and_seminar_halls: { type: Number },
        total_computers: { type: Number },
        total_expenditure: { type: Number },
    }
});

const ExtendedProfileModel = mongoose.model('ExtendedProfile', ExtendedProfileSchema);

export default ExtendedProfileModel;
