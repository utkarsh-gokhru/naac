import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  name: String,
  url: String,
});

const Criterion6Schema = new mongoose.Schema({
  department: {
    type: String,
    required: false,
  },
  academicYear: {
    type: String,
    required: false,
  },
  questions: {
    "6.1.1": {
      type: String,
      required: false,
      documents: [documentSchema],
    },
    "6.1.2": {
      type: String,
      required: false,
      documents: [documentSchema],
    },
    "6.2.1": {
      type: String,
      required: false,
      documents: [documentSchema],
    },
    "6.2.2": {
      type: String,
      required: false,
      documents: [documentSchema],
    },
    "6.2.3": {
      type: String,
      documents: [documentSchema],
    },
    "6.3.1": {
      type: String,
      documents: [documentSchema],
    },
    "6.3.2": {
      teacherProvided: {
        type: Number,
        required: false,
      },
      documents: [documentSchema],
    },
    "6.3.3": {
      trainingProgramOrganized: {
        type: Number,
        required: false,
      },
      documents: [documentSchema],
    },
    "6.3.4": {
      teacherUnderTraining: {
        type: Number,
        required: false,
      },
      documents: [documentSchema],
    },
    "6.4.1": {
      type: String, 
      required: false,
      documents: [documentSchema],
    },
    "6.4.2": {
      fundReceiveFromGovernment: {
        type:Number,
        required: false,
      },
      documents: [documentSchema]
    },
    "6.4.3": {
        fundReceiveFromNonGovernment: {
          type:Number,
          required: false,
        },
        documents: [documentSchema]
      },
    "6.4.4": {
      type: String, 
      required: false,
      documents: [documentSchema],
    },
    "6.5.1": {
      type: String,
      required: false,
      documents: [documentSchema],
    },
    "6.5.2": {
        type: String,
        required: false,
        documents: [documentSchema],
      },

    "6.5.3": {
      type: String,
      required: false,
      documents: [documentSchema]
    },
  },
});

const Criterion6Model = mongoose.model("Criterion6", Criterion6Schema);

export default Criterion6Model;
