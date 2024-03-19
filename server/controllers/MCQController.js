import MCQFormData from "../models/MCQFormData.js";
import MCQService from "../services/MCQService.js";

const MCQController = {
  async submitMCQForm(req, res) {
    try {
      const formData = req.body;
      await MCQService.submitMCQForm(formData);
      res.status(201).send("MCQ form submitted successfully!");
    } catch (error) {
      console.error("Error submitting MCQ form:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  async getMCQProgress(req, res) {
    try {
      const userId = req.user.id; // Assuming user ID is obtained from authentication middleware
      const progress = await MCQService.getMCQProgress(userId);
      res.status(200).json(progress);
    } catch (error) {
      console.error("Error retrieving MCQ progress:", error);
      res.status(500).send("Internal Server Error");
    }
  },
};

export default MCQController;
