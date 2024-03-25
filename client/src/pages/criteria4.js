import React, { useState } from "react";
import axios from "axios";

const CriterionForm = () => {
  const [formData, setFormData] = useState({
    department: "",
    academicYear: "",
    questions: {
      "4.1.1": "",
      "4.1.2": "",
      "4.1.3": "",
      "4.1.4": {
        expenditure: "",
        documents: [],
      },
      "4.2.1": "",
      "4.2.2": {
        options: [],
        documents: [],
      },
      "4.2.3": {
        expenditure: "",
        documents: [],
      },
      "4.2.4": {
        footfalls: "",
        documents: [],
      },
      "4.3.1": {
        classrooms: "",
        seminarHalls: "",
        documents: [],
      },
      "4.3.2": "",
      "4.3.3": {
        studentComputerRatio: {
          students: "",
          computers: "",
        },
      },
      "4.3.4": {
        bandwidth: "",
        documents: [],
      },
      "4.3.5": {
        options: [],
        documents: [],
      },
      "4.4.1": {
        expenditure: "",
        documents: [],
      },
      "4.4.2": "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleQuestionChange = (questionId, value) => {
    setFormData({
      ...formData,
      questions: {
        ...formData.questions,
        [questionId]: value,
      },
    });
  };

  const handleFileChange = (questionId, files) => {
    if (!files) {
      console.log("there is not files!");
      return;
    }
    console.log("this is the quetisnos ID: " + questionId);
    console.log("this is the files: " + JSON.stringify(files));
    console.log("this is the len : " + files.length);
    console.log("this are the quetions: " + JSON.stringify(formData.questions));
    const formDataWithFiles = new FormData();

    formDataWithFiles.append("department", formData.department);
    formDataWithFiles.append("academicYear", formData.academicYear);
    formDataWithFiles.append("questions", JSON.stringify(formData.questions));

    for (let i = 0; i <= files.length; i++) {
      formDataWithFiles.append(`files_${questionId}`, files[i]);
      console.log("it did worked!");
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      questions: {
        ...prevFormData.questions,
        [questionId]: {
          ...prevFormData.questions[questionId],
          documents: Array.from(files, (file) => file.name),
        },
      },
    }));
    console.log(
      "what is the world is this formDAta with files: " +
        JSON.stringify(formDataWithFiles)
    );

    return formDataWithFiles;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithFiles = handleFileChange("4.1.4", e.target.files);

      const response = await axios.post(
        "http://localhost:5000/admin/criteria4/submit",
        formDataWithFiles,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <h1>Criterion Form</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Department:</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Academic Year:</label>
          <input
            type="text"
            name="academicYear"
            value={formData.academicYear}
            onChange={handleChange}
          />
        </div>
        <hr />
        <h2>Questions</h2>
        {Object.entries(formData.questions).map(([questionId, question]) => (
          <div key={questionId}>
            <label>{questionId}: </label>
            {typeof question === "string" ? (
              <textarea
                value={question}
                onChange={(e) =>
                  handleQuestionChange(questionId, e.target.value)
                }
              />
            ) : (
              <div>
                <input
                  type="number"
                  placeholder="Expenditure"
                  value={question.expenditure || ""}
                  onChange={(e) =>
                    handleQuestionChange(
                      questionId,
                      {
                        ...question,
                        expenditure: e.target.value,
                      },
                      console.log("what the hell is this e:  ? " + e)
                    )
                  }
                />
                {/* Add file input for documents */}
                <input
                  type="file"
                  multiple
                  onChange={(e) => handleFileChange(questionId, e.target.files)}
                />
              </div>
            )}
          </div>
        ))}
        <hr />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CriterionForm;
