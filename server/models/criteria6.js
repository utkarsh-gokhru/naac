import mongoose from "mongoose";

const Criteria6Schema = new mongoose.Schema({
    department: { type: String },
    academicYear: { type: String },
    criteria61: {
        text6_1_1: { type: String },
        file6_1_1: { type: String },
        text6_1_2: { type: String },
        file6_1_2: { type: String },
    },
    criteria62: {
        text6_2_1: { type: String },
        file6_2_1: { type: String },
        text6_2_2: { type: String },
        file6_2_2: { type: String },
        data6_2_3: { type: String },
        file6_2_3_1: { type: String },
        file6_2_3_2: { type: String },
    },
    criteria63: {
        text6_3_1: { type: String },
        file6_3_1: { type: String },
        data6_3_2: { type: Number },
        file6_3_2_1: { type: String },
        file6_3_2_2: { type: String },
        data6_3_3: { type: Number },
        file6_3_3_1: { type: String },
        file6_3_3_2: { type: String },
        data6_3_4: { type: Number },
        file6_3_4_1: { type: String },
        file6_3_4_2: { type: String },
    },
    criteria64: {
        text6_4_1: { type: String },
        file6_4_1: { type: String },
        data6_4_2: { type: Number },
        file6_4_2_1: { type: String },
        file6_4_2_2: { type: String },
        data6_4_3: { type: Number },
        file6_4_3_1: { type: String },
        file6_4_3_2: { type: String },
        text6_4_4: { type: String },
        file6_4_4: { type: String },
    },
    criteria65: {
        text6_5_1: { type: String },
        file6_5_1: { type: String },
        data6_5_2: { type: String },
        file6_5_2_1: { type: String },
        file6_5_2_2: { type: String },
        text6_5_3: { type: String },
        file6_5_3: { type: String },
    }
});

const Criteria6Model = mongoose.model('Criteria6', Criteria6Schema);

export default Criteria6Model;
