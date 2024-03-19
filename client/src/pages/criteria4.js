import React, { useState } from "react";
// import Criterion4Model from "../../../server/models/Criteria4.js";
// import { handleFileUploadAndDatabase } from "../../../server/controllers/handle_file_uploads.js";

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

  // const handleFileChange = (questionId, files) => {
  //   console.log("this is the questiondId" + questionId);
  //   console.log("this are the files: " + JSON.stringify(files));

  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     questions: {
  //       ...prevFormData.questions,
  //       [questionId]: {
  //         ...prevFormData.questions[questionId],
  //         documents: Array.from(files), // Convert FileList to array
  //       },
  //     },
  //   }));
  // };

  const handleFileChange = (questionId, files) => {
    console.log("this is the questionId" + questionId);
    console.log("these are the files:", files);

    // Create an array to hold the documents
    const documents = [];

    // Iterate through the files
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Generate a unique name for each file
      const fileName = `Document ${i + 1}`;

      // Create a URL for each file (this is just a placeholder, you may need to adjust it)
      const fileUrl = `example.com/${fileName}.pdf`;

      // Add the document object to the documents array
      documents.push({ name: fileName, url: fileUrl });
    }

    // Update the form data with the documents array
    setFormData((prevFormData) => ({
      ...prevFormData,
      questions: {
        ...prevFormData.questions,
        [questionId]: {
          ...prevFormData.questions[questionId],
          documents: documents,
        },
      },
    }));
  };
  // const handleFileChange = async (questionId, files) => {
  //   try {
  //     console.log("this is the questionId" + questionId);
  //     console.log("these are the files:", files);

  //     const documents = [];

  //     for (let i = 0; i < files.length; i++) {
  //       const file = files[i];

  //       const fileUrl = await handleFileUploadAndDatabase(
  //         formData.department,
  //         formData.academicYear,
  //         `${questionId}_${file.name}`,
  //         file,
  //         {}, // Additional data if needed
  //         Criterion4Model // Your Mongoose model
  //       );

  //       // Add the document object to the documents array
  //       documents.push({ name: file.name, url: fileUrl });
  //     }

  //     // Update the form data with the documents array
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       questions: {
  //         ...prevFormData.questions,
  //         [questionId]: {
  //           ...prevFormData.questions[questionId],
  //           documents: documents,
  //         },
  //       },
  //     }));
  //   } catch (error) {
  //     console.error("Error handling file upload:", error);
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     console.log("this is form data: " + JSON.stringify(formData))
  //     const formDataToSend = new FormData();
  //     formDataToSend.append('department', formData.department);
  //     formDataToSend.append('academicYear', formData.academicYear);

  //     // Append each question with its corresponding value and files
  //     Object.entries(formData.questions).forEach(([questionId, question]) => {
  //       if (typeof question === 'object' && question.documents) {
  //         console.log("what are you ? " + JSON.stringify(question))
  //         question.documents.forEach((document, index) => {
  //           formDataToSend.append(`${questionId}_document_${index}`, document.file);
  //         });
  //       } else {
  //         formDataToSend.append(questionId, JSON.stringify(question));
  //       }
  //     });

  //     console.log("this is formdata to sedn: " + JSON.stringify(formDataToSend))

  //     const response = await fetch(
  //       "http://localhost:5000/admin/criteria4/submit",
  //       {
  //         method: "POST",
  //         body: formDataToSend,
  //       }
  //     );
  //     const data = await response.json();
  //     console.log(data); // Log the response from the API
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace 'apiRoute' with your actual API route
      console.log("this is the form data: " + JSON.stringify(formData));
      const response = await fetch(
        "http://localhost:5000/admin/criteria4/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      console.log(data); // Log the response from the API
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    // Reset form data
    // setFormData({ ...initialFormData });
  };

  return (
    <div>
      <h1>Criterion Form</h1>
      <form onSubmit={handleSubmit}>
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
