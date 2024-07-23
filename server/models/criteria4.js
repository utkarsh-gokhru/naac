import mongoose from "mongoose";

const Criteria4Schema = new mongoose.Schema({
    department: { type: String },
    academicYear: { type: String },
    criteria41: {
        teaching_facilities: { type: String },
        file4_1_1: { type: String },
        cultural_facilities: { type: String },
        file4_1_2: { type: String },
        general_facilities: { type: String },
        file4_1_3: { type: String },
        total_expenditure: { type: Number },
        file4_1_4_1: { type: String },
        file4_1_4_2: { type: String },
    },
    criteria42: {
        automated_library: { type: String },
        file4_2_1: { type: String },
        subscription: { type: String },
        file4_2_2: { type: String },
        books_expenditure: { type: Number },
        file4_2_3_1: { type: String },
        file4_2_3_2: { type: String },
        library_usage_per_day: { type: Number },
        file4_2_4: { type: String },
    },
    criteria43: {
        classrooms_and_seminarhalls: { type: Number },
        file4_3_1_1: { type: String },
        file4_3_1_2: { type: String },
        it_policy: { type: String },
        file4_3_2: { type: String },
        number_of_students: { type: Number },
        number_of_computers: { type: Number },
        bandwidth: { type: String },
        file4_3_4: { type: String },
        e_content_facilities: { type: String },
        file4_3_5_1: { type: String },
        file4_3_5_2: { type: String },
    },
    criteria44: {
        physical_facilities_expenditure: { type: Number },
        file4_4_1_1: { type: String },
        file4_4_1_2: { type: String },
        established_systems: { type: String },
        file4_4_2: { type: String },
    }
});

const Criteria4Model = mongoose.model('Criteria4', Criteria4Schema);

export default Criteria4Model;
