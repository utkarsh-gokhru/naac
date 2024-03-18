import mongoose from "mongoose";

const MCQFormSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  questions: [
    {
      questionText: { type: String },
      selectedOption: { type: String },
    },
  ],
  submittedAt: { type: Date, default: Date.now },
});

const MCQFormDataModel = mongoose.model("MCQFormData", MCQFormSchema);

export default MCQFormDataModel;
