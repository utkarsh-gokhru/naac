import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import axios from "axios";

const Criteria14 = ({ onCrit14Data }) => {
  const [feedbackType1_4_1, setFeedbackType1_4_1] = useState('');
  const [feedbackType1_4_2, setFeedbackType1_4_2] = useState('');
  const [file1_4_1, setFile1_4_1] = useState(null);
  const [file1_4_2, setFile1_4_2] = useState(null);
  const department = localStorage.getItem('department');
  const academicYear = localStorage.getItem('academicYear');

  const saveSection = async (sectionData, section) => {
    const formData = new FormData();

    formData.append("department", department);
    formData.append("academicYear", academicYear);

    let allFieldsFilled = true;

    for (const key in sectionData) {
      if (sectionData[key] === null || sectionData[key] === '') {
        allFieldsFilled = false;
        break;
      }
    }

    if (!allFieldsFilled) {
      alert('Please fill in all the fields of the section.');
    } else {
      for (const key in sectionData) {
        formData.append(key, sectionData[key]);
      }

      try {
        const response = await axios.post(`https://naacserver.onrender.com/data/save${section}`, formData);
        console.log(response.data);
        alert(`Saved Section ${section} data successfully!`);
      } catch (error) {
        console.error(`Error saving Section ${section} data:`, error.message);
        alert(`Failed to save Section ${section} data. Please try again.`);
      }
    }
  };


  useEffect(() => {
    const crit14 = {
      feedbackType1_4_1,
      feedbackType1_4_2,
      file1_4_1,
      file1_4_2
    };
    onCrit14Data(crit14);
  }, [feedbackType1_4_1, feedbackType1_4_2, file1_4_1, file1_4_2]);

  const downloadExcel = async (exc_file) => {
    const templateFilePath = `${process.env.PUBLIC_URL}/${exc_file}`;

    try {
      const response = await fetch(templateFilePath);
      const blob = await response.blob();

      saveAs(blob, `${exc_file}_output.xlsx`);
    } catch (error) {
      console.error('Error fetching the template file:', error);
    }
  };

  return (
    <div className="c-1_4">
      <h3>1.4 - Feedback System</h3>
      <ul>
        <li>
          <div className="c-1_4_1">
            <h4>1.4.1 - Structured feedback for the design and review of syllabus-semester wise is received from </h4>
            <ol>
              <li>Students</li>
              <li>Teachers</li>
              <li>Employers</li>
              <li>Alumni</li>
            </ol>
            <br />
            <div className="radioBtn-1_4_1">
              <input type="radio" id="all4_1_4_1" name="group1_4_1" onChange={() => setFeedbackType1_4_1('All 4 of the above')} />
              <label htmlFor="all4_1_4_1">All 4 of the above</label>

              <input type="radio" id="any3_1_4_1" name="group1_4_1" onChange={() => setFeedbackType1_4_1('Any 3 of the above')} />
              <label htmlFor="any3_1_4_1">Any 3 of the above</label>

              <input type="radio" id="any2_1_4_1" name="group1_4_1" onChange={() => setFeedbackType1_4_1('Any 2 of the above')} />
              <label htmlFor="any2_1_4_1">Any 2 of the above</label>

              <input type="radio" id="any1_1_4_1" name="group1_4_1" onChange={() => setFeedbackType1_4_1('Any 1 of the above')} />
              <label htmlFor="any1_1_4_1">Any 1 of the above</label>

              <input type="radio" id="none_1_4_1" name="group1_4_1" onChange={() => setFeedbackType1_4_1('None of the above')} />
              <label htmlFor="none_1_4_1">None of the above</label>
            </div>

            <table>
              <thead>
                <tr>
                  <th>File Description</th>
                  <th>Template</th>
                  <th>Documents</th>
                  <th>File Types/Size Supported</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Upload relevant supporting documents</td>
                  <td><button onClick={() => downloadExcel('1.4.1.xlsx')}>Data Template</button></td>
                  <td><input type="file" id="fileUpload_1_4_1" onChange={(e) => setFile1_4_1(e.target.files[0])} name="fileUpload" accept=".xls, .xlsx" /></td>
                  <td>xls, xlsx. <b>File size: 6MB</b> </td>
                </tr>
              </tbody>
            </table>
            <div>
              <button onClick={() => saveSection({ feedbackType1_4_1, file1_4_1 }, '6-1-1')}>Save</button>
            </div>
          </div>
        </li>
        <li>
          <div className="c-1_4_2">
            <h4>1.4.2 - Feedback processes of the institution may be classified as follows</h4>
            <div className="radioBtn-1_4_2">
              <input type="radio" id="feedback1_1_4_2" name="group2_1_4_2" onChange={() => setFeedbackType1_4_2('Feedback collected, analyzed and action taken and feedback available on the website')} />
              <label htmlFor="feedback1_1_4_2">Feedback collected, analyzed and action taken and feedback available on the website</label>

              <input type="radio" id="feedback2_1_4_2" name="group2_1_4_2" onChange={() => setFeedbackType1_4_2('Feedback collected, analyzed and action has been taken')} />
              <label htmlFor="feedback2_1_4_2">Feedback collected, analyzed and action has been taken</label>

              <input type="radio" id="feedback3_1_4_2" name="group2_1_4_2" onChange={() => setFeedbackType1_4_2('Feedback collected and analyzed')} />
              <label htmlFor="feedback3_1_4_2">Feedback collected and analyzed</label>

              <input type="radio" id="feedback4_1_4_2" name="group2_1_4_2" onChange={() => setFeedbackType1_4_2('Feedback collected')} />
              <label htmlFor="feedback4_1_4_2">Feedback collected</label>

              <input type="radio" id="feedback5_1_4_2" name="group2_1_4_2" onChange={() => setFeedbackType1_4_2('Feedback not collected')} />
              <label htmlFor="feedback5_1_4_2">Feedback not collected</label>
            </div>
            <table>
              <thead>
                <tr>
                  <th>File Description</th>
                  <th>Template</th>
                  <th>Documents</th>
                  <th>File Types/Size Supported</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Upload relevant supporting documents</td>
                  <td>Template</td>
                  <td><input type="file" id="fileUpload_1_4_2" onChange={(e) => setFile1_4_2(e.target.files[0])} name="fileUpload" accept=".xls, .xlsx,.doc,,docx,.pdf" /></td>
                  <td>xls, xlsx, doc, docx, pdf.<b>File size: 6MB</b> </td>
                </tr>
              </tbody>
            </table>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Criteria14;
