import Criterion4Model from "../models/Criteria4.js";
import { handleFileUploadAndDatabase } from "../controllers/handle_file_uploads.js";

const submitCriterion4Data = async (req, res) => {
  try {
    const { department, academicYear, questions } = req.body;

    // Check if there's an existing entry for the department
    const existingEntry = await Criterion4Model.findOne({ department });
    if (existingEntry) {
      return res.status(400).json({ error: "Department entry already exists." });
    }

    for (const [key, value] of Object.entries(questions)) {
      if (typeof value === 'object' && value.documents) {
        for (const document of value.documents) {
          const fieldName = `${key}_${document.name}`;
          const file = document.file;
          const additionalData = { department, academicYear };
          await handleFileUploadAndDatabase(department, academicYear, fieldName, file, additionalData, Criterion4Model);
        }
      }
    }

    const questionsWithoutDocuments = { ...questions };
    for (const key in questionsWithoutDocuments) {
      delete questionsWithoutDocuments[key].documents;
    }

    const newData = new Criterion4Model({
      department,
      academicYear,
      questions: questionsWithoutDocuments,
    });

    await newData.save();

    res.status(201).json({ message: "Data saved successfully!" });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { submitCriterion4Data };
