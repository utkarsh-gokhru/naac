import React, { useState } from "react";
import axios from "axios";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase.config";

const Criteria4Form = () => {
  const [formData, setFormData] = useState({
    department: "hahahaha",
    academicYear: "123123123",
    questions: {
      "4.1.1 - The insititute has adequate facilities to teaching-learning viz,classroom,laborataries and computing lab":
        "",
      "4.1.2 - The institute has adequte facilities for cultural activities ,yoga,games and sports":
        "",
      " 4.1.3 - Availability of General campus facilities and Overall ambience":
        "",
      "4.1.4 - Total Expenditure excluding salary for Infrastructure augmentaion during the year(INR in Lakhs)":
        {
          expenditure: "",
          documents: null, // Change to null
        },
      "4.2.1": "",
      "4.2.2": {
        options: [],
        documents: null, // Change to null
      },
      "4.2.3": {
        expenditure: "",
        documents: null, // Change to null
      },
      "4.2.4": {
        footfalls: "",
        documents: null, // Change to null
      },
      "4.3.1": {
        classrooms: "",
        seminarHalls: "",
        documents: null, // Change to null
      },
      "4.3.2": "",
      "4.3.3": {
        studentComputerRatio: {
          students: "",
          computers: "",
        },
        documents: null, // Change to null
      },
      "4.3.4": {
        bandwidth: "",
        documents: null, // Change to null
      },
      "4.3.5": {
        options: [],
        documents: null, // Change to null
      },
      "4.4.1": {
        expenditure: "",
        documents: null, // Change to null
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
    const file = files[0];
    console.log("this is the file: ", file); // Check file object
    console.log("this is the file name: " + file.name);

    const updatedFormData = {
      ...formData,
      questions: {
        ...formData.questions,
        [questionId]: {
          ...formData.questions[questionId],
          documents: file ? [file] : null,
        },
      },
    };

    setFormData(updatedFormData);
    console.log("this is the updated form: ", updatedFormData);

    console.log(
      "ths is hte formdata in the filebutton: " + JSON.stringify(formData)
    );
    console.log("this is the type of updatedForm: " + typeof updatedFormData);
    console.log("this is the type of formdat: " + typeof formData);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     console.log("the formData you're submitting now: ", formData);

  //     // Make the axios request
  //     const response = await axios.post(
  //       "http://localhost:5000/admin/criteria4/submit",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     console.log("Response from server: ", response.data);
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //   }
  // };







  // what the fuck bro 
  // what i ment was 
  // on the backend i am getting data as this : 
  // DB connected!
  // this is the data on server: {"department":"hahahaha","academicYear":"123123123","questions":{"4.1.1 - The insititute has adequate facilities to teaching-learning viz,classroom,laborataries and computing lab":"","4.1.2 - The institute has adequte facilities for cultural activities ,yoga,games and sports":""," 4.1.3 - Availability of General campus facilities and Overall ambience":"","4.1.4 - Total Expenditure excluding salary for Infrastructure augmentaion during the year(INR in Lakhs)":{"expenditure":"","documents":[{}]},"4.2.1":"","4.2.2":{"options":[],"documents":null},"4.2.3":{"expenditure":"","documents":null},"4.2.4":{"footfalls":"","documents":null},"4.3.1":{"classrooms":"","seminarHalls":"","documents":null},"4.3.2":"","4.3.3":{"studentComputerRatio":{"students":"","computers":""},"documents":[{}]},"4.3.4":{"bandwidth":"","documents":null},"4.3.5":{"options":[],"documents":null},"4.4.1":{"expenditure":"","documents":null},"4.4.2":""},"fileNames":[{"4.1.4 - Total Expenditure excluding salary for Infrastructure augmentaion during the year(INR in Lakhs)":"https://firebasestorage.googleapis.com/v0/b/naac-fd101.appspot.com/o/Documents%2F1711617525563-resume.pdf?alt=media&token=00c2f9ad-d39e-4a59-90b6-3ea6915b5a0b"},{"4.3.3":"https://firebasestorage.googleapis.com/v0/b/naac-fd101.appspot.com/o/Documents%2F1711617526962-Leaving%20Certificate.pdf?alt=media&token=811a0a29-404f-4539-bbc1-5c7310db9417"}]}
  // where i am getting [{"4.1.1" (which is the file questionid )}] i don't want to send the quteionsid but instead the file name in the fileNames array with the dowload url
  //   const uploadFileToFirebase = async (file) => {
  //         const storageRef = ref(storage, `Documents/${Date.now()}-${file.name}`);
  //         const uploadTask = uploadBytesResumable(storageRef, file);
  //         await uploadTask;
  //         const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
  //         return downloadURL;
  //       };
  
  //       for (const questionId in formData.questions) {
  //         const question = formData.questions[questionId];
  //         if (question.documents) {
  //           const downloadURL = await uploadFileToFirebase(question.documents[0]);
  //           fileNames.push({ [questionId]: downloadURL });
  //         }
  //       }
  // so i want you to make changes such way that you push the file name and the dowloadUrl to the fileNames array 









  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fileNames = []; // Array to store uploaded file names

      // Function to upload a single file to Firebase Storage
      const uploadFileToFirebase = async (file) => {
        const storageRef = ref(storage, `Documents/${Date.now()}-${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        await uploadTask;
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        return downloadURL;
      };

      for (const questionId in formData.questions) {
        const question = formData.questions[questionId];
        if (question.documents) {
          const downloadURL = await uploadFileToFirebase(question.documents[0]);
          fileNames.push({ [questionId]: downloadURL });
        }
      }

      const dataToSend = {
        ...formData,
        fileNames,
      };

      console.log(
        "this is the data that you're sendin to the server: " +
          JSON.stringify(dataToSend)
      );

      const response = await axios.post(
        "http://localhost:5000/admin/criteria4/submit",
        dataToSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response from server: ", response.data);
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
                    handleQuestionChange(questionId, {
                      ...question,
                      expenditure: e.target.value,
                    })
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

export default Criteria4Form;
