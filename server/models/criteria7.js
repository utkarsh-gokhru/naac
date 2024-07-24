import mongoose from "mongoose";

const Criteria7Schema = new mongoose.Schema({
    department: { type: String },
    academicYear: { type: String },
    criteria71: {
        text7_1_1: { type: String },
        file7_1_1: { type: String },
        data7_1_2: { type: String },
        file7_1_2: { type: String },
        text7_1_3: { type: String },
        file7_1_3: { type: String },
        data7_1_4: { type: String },
        file7_1_4: { type: String },
        data7_1_5: { type: String },
        file7_1_5: { type: String },
        data7_1_6: { type: String },
        file7_1_6: { type: String },
        data7_1_7: { type: String },
        file7_1_7: { type: String },
        data7_1_8: { type: String },
        file7_1_8: { type: String },
        text7_1_9: { type: String },
        data7_1_10: { type: String },
        file7_1_10: { type: String },
        text7_1_11: { type: String },
        file7_1_11: { type: String },
    },
    criteria72: {
        text7_2_1: { type: String },
    },
    criteria73: {
        text7_3_1: { type: String },
        text7_3_2: { type: String },
    }
});

const Criteria7Model = mongoose.model('Criteria7', Criteria7Schema);

export default Criteria7Model;
