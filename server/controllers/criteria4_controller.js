import Criterion4Model from "../models/Criteria4.js";

const submitCriterion4Data = async (req, res) => {
  try {
    const { department, academicYear, questions } = req.body;
    console.log("this is the data: " + req.body);
    console.log("this is departement: " + department)
    console.log("this is questions: " + questions['4.1.1'])

    const newData = new Criterion4Model({
      department,
      academicYear,
      questions,
    });

    await newData.save();

    res.status(201).json({ message: "Data saved successfully!" });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { submitCriterion4Data };