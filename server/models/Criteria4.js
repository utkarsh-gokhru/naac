import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  name: String,
  url: String,
});

const Criterion4Schema = new mongoose.Schema({
  department: {
    type: String,
    required: false,
  },
  academicYear: {
    type: String,
    required: false,
  },
  questions: {
    "4.1.1": {
      adequateFacilities: {
        type: String,
        required: false,
      },
      documents: [documentSchema],
    },
    "4.1.2": {
      culturalFacilities: {
        type: String,
        required: false,
      },
      documents: [documentSchema],
    },
    "4.1.3": {
      campusFacilities: {
        type: String,
        required: false,
      },
      documents: [documentSchema],
    },
    "4.1.4": {
      expenditure: {
        type: Number,
        required: false,
      },
      documents: [documentSchema], // Array of supporting documents
    },
    "4.2.1": {
      libraryFacilities: {
        type: String,
        required: false,
      },
      documents: [documentSchema], // Array of supporting documents
    },
    "4.2.2": {
      options: [String], // Options for multiple choice question
      documents: [documentSchema], // Array of supporting documents
    },
    "4.2.3": {
      expenditure: {
        type: Number,
        required: false,
      },
      documents: [documentSchema],
    },
    "4.2.4": {
      footfalls: {
        type: Number,
        required: false,
      },
      documents: [documentSchema],
    },
    "4.3.1": {
      classrooms: {
        type: Number,
        required: false,
      },
      // seminarHalls: {
      //   type: Number,
      //   required: false,
      // },
      documents: [documentSchema],
    },
    "4.3.2": {
      itPolicy: {
        type: String,
        required: false,
      },
      documents: [documentSchema], // Array of supporting documents
    },
    "4.3.3": {
      studentComputerRatio: {
        students: {
          type: Number,
          required: false,
        },
        computers: {
          type: Number,
          required: false,
        },
      },
    },
    "4.3.4": {
      bandwidth: {
        type: String,
        required: false,
      },
      documents: [documentSchema],
    },
    "4.3.5": {
      options: [String],
      documents: [documentSchema],
    },
    "4.4.1": {
      expenditure: {
        type: Number,
        required: false,
      },
      documents: [documentSchema],
    },
    "4.4.2": {
      establishedSystem: {
        type: String,
        required: false,
      },
      documents: [documentSchema], // Array of supporting documents
    },
  },
});

const Criterion4Model = mongoose.model("Criterion4", Criterion4Schema);

export default Criterion4Model;
