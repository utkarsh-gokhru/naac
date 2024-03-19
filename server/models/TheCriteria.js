const { Schema, model } = require("mongoose");

const CriteriaSchema = new Schema({
  department: { type: String, required: true },
  academic_year: { type: String, required: true },
  criteria: [
    {
      section: { type: String, required: true },
      questions: [
        {
          question_number: { type: String, required: true },
          question_text: { type: String, required: true },
          response_text: { type: String },
          response_amount: { type: Number },
          response_file_template: {
            filename: { type: String },
            url: { type: String },
          },
          response_file_supporting: {
            filename: { type: String },
            url: { type: String },
          },
        },
      ],
    },
  ],
  submitted_at: { type: Date, default: Date.now },
});

const CriteriaModel = model("Criteria", CriteriaSchema);

module.exports = CriteriaModel;
