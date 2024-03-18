import mongoose from "mongoose";

// Define sub-schema for each question that requires a document
const documentSchema = new mongoose.Schema({
  name: String, // Name of the document
  url: String, // URL or file path of the document
});

// Define main schema for Criterion 4
const Criterion4Schema = new mongoose.Schema({
  department: {
    type: String,
    required: true,
  },
  academicYear: {
    type: String,
    required: true,
  },
  questions: {
    "4.1.1": {
      type: String,
      required: true,
      documents: [documentSchema], // Array of supporting documents
    },
    "4.1.2": {
      type: String,
      required: true,
      documents: [documentSchema], // Array of supporting documents
    },
    "4.1.3": {
      type: String,
      required: true,
      documents: [documentSchema], // Array of supporting documents
    },
    "4.1.4": {
      expenditure: {
        type: Number,
        required: true,
      },
      documents: [documentSchema], // Array of supporting documents
    },
    "4.2.1": {
      type: String,
      required: true,
    },
    "4.2.2": {
      options: [String], // Options for multiple choice question
      documents: [documentSchema], // Array of supporting documents
    },
    "4.2.3": {
      expenditure: {
        type: Number,
        required: true,
      },
      documents: [documentSchema], // Array of supporting documents
    },
    "4.2.4": {
      footfalls: {
        type: Number,
        required: true,
      },
      documents: [documentSchema], // Array of supporting documents
    },
    "4.3.1": {
      classrooms: {
        type: Number,
        required: true,
      },
      // seminarHalls: {
      //   type: Number,
      //   required: true,
      // },
      documents: [documentSchema], // Array of supporting documents
    },
    "4.3.2": {
      type: String,
      required: true,
      documents: [documentSchema], // Array of supporting documents
    },
    "4.3.3": {
      studentComputerRatio: {
        students: {
          type: Number,
          required: true,
        },
        computers: {
          type: Number,
          required: true,
        },
      },
    },
    "4.3.4": {
      bandwidth: {
        type: String,
        required: true,
      },
      documents: [documentSchema], // Array of supporting documents
    },
    "4.3.5": {
      options: [String], // Options for multiple choice question
      documents: [documentSchema], // Array of supporting documents
    },
    "4.4.1": {
      expenditure: {
        type: Number,
        required: true,
      },
      documents: [documentSchema], // Array of supporting documents
    },
    "4.4.2": {
      type: String,
      required: true,
    },
  },
});

const Criterion4Model = mongoose.model("Criterion4", Criterion4Schema);

export default Criterion4Model;
