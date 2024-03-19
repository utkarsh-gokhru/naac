import MCQFormData from "../models/MCQFormData.js";

const MCQService = {
  async submitMCQForm(formData) {
    const mcqData = new MCQFormData(formData);
    await mcqData.save();
  },

  async getMCQProgress(userId) {
    const totalSubmitted = await MCQFormData.countDocuments({ userId });
    return { totalSubmitted };
  },
};

export default MCQService;
