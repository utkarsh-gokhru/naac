import mongoose from "mongoose";

const Criteria3Schema = new mongoose.Schema({
    department: {type: String},
    academicYear: {type: String},
    criteria31: {
        researchFacilities: {type: String},
        file3_1_1: { type: String },
        seedMoney: { type: Number },
        file3_1_2_1: { type: String },
        file3_1_2_2: { type: String },
        teachersFellowship: { type: Number },
        file3_1_3_1: { type: String },
        file3_1_3_2: { type: String },
        fellowsEnrolled: { type: Number },
        file3_1_4_1: { type: String },
        file3_1_4_2: { type: String },
        feed_3_1_5_Type: { type: String },
        file3_1_5: { type: String },
        departmentNo: { type: Number },
        file3_1_6_1: { type: String },
        file3_1_6_2: { type: String }
    },
    criteria32: {
        extraFunding: { type: Number },
        file3_2_1_1: { type: String },
        file3_2_1_2: { type: String },
        grants: { type: Number },
        file3_2_2_1: { type: String },
        file3_2_2_2: { type: String },
        teacherResearchProjects: { type: Number },
        file3_2_3_1: { type: String },
        file3_2_3_2: { type: String }
    },
    criteria33: {
        ecosystemText: { type: String },
        file3_3_1: { type: String },
        seminars: { type: Number },
        totalSeminars: { type: Number },
        file3_3_2_1: { type: String },
        file3_3_2_2: { type: String },
        awards: { type: Number },
        file3_3_3_1: { type: String },
        file3_3_3_2: { type: String }
    },
    criteria34: {
        code_of_ethics: { type: String },
        file_3_4_1: { type: String },
        incentives: { type: String },
        file_3_4_2_1: { type: String },
        file_3_4_2_2: { type: String },
        patents_published: { type: Number },
        file_3_4_3_1: { type: String },
        file_3_4_3_2: { type: String },
        phd_awarded: { type: Number },
        teachers_guides: { type: Number },
        file_3_4_4_1: { type: String },
        file_3_4_4_2: { type: String },
        research_papers_per_teacher: { type: Number },
        file_3_4_5_1: { type: String },
        file_3_4_5_2: { type: String },
        books_edited: { type: Number },
        file_3_4_6_1: { type: String },
        file_3_4_6_2: { type: String },
        e_content: { type: String },
        file_3_4_7_1: { type: String },
        file_3_4_7_2: { type: String },
        scopus348: { type: Number },
        web_of_science348: { type: Number },
        file_3_4_8_1: { type: String },
        file_3_4_8_2: { type: String },
        scopus349: { type: Number },
        web_of_science349: { type: Number },
        file_3_4_9_1: { type: String },
        file_3_4_9_2: { type: String },
    },
    criteria35: {
        consultancyText: { type: String },
        consultancyRev: { type: Number },
        file3_5_1: { type: String },
        file3_5_2_1: { type: String },
        file3_5_2_2: { type: String }
    },
    criteria36: {
        extensionActText: { type: String },
        file3_6_1: { type: String },
        file3_6_2_1: { type: String },
        file3_6_2_2: { type: String },
        extActAwards: { type: Number },
        outreachPrograms: { type: Number },
        file3_6_3_1: { type: String },
        file3_6_3_2: { type: String },
        participatingStudents: { type: Number },
        file3_6_4_1: { type: String },
        file3_6_4_2: { type: String }
    },
    criteria37: {
        collAct: { type: Number },
        file3_7_1_1: { type: String },
        file3_7_1_2: { type: String },
        functionalMOUs: { type: Number },
        file3_7_2_1: { type: String },
        file3_7_2_2: { type: String }
    }
});

const Criteria3Model = mongoose.model('Criteria3',Criteria3Schema);

export default Criteria3Model;
