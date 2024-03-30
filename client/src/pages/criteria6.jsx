import React, { useState } from "react";
import axios from "axios";
import naacLogo from "../naac_logo.png";
import "../css/criteria2.css";

const Criteria6 = () => {
  const department = localStorage.getItem("department");
  const academicYear = localStorage.getItem("academicYear");

  const [form, setForm] = useState({
    department: "",
    academicYear: "",
    textData: Array(14).fill(null),
    fileData: Array(22).fill(null),
    radioValues: Array(2).fill(null),
  });

  const handleStateChange = (e, arrIndex, isText = true) => {
    if (isText) {
      const updatedTextData = [...form.textData];
      updatedTextData[arrIndex] = e.target.value;
      setForm({ ...form, textData: updatedTextData });
    } else {
      const file = form.fileData;
      const updatedFileData = [...file];
      updatedFileData[arrIndex] = Array.from(e.target.files);
      setForm({ ...form, fileData: updatedFileData });
    }
  };
 
console.log(form)

  const handleRadioChange = (arrIndex, value) => {
    const updatedRadioValues = [...form.radioValues];
    updatedRadioValues[arrIndex] = value;
    setForm({ ...form, radioValues: updatedRadioValues });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
  
    formData.append('department', form.department)
    formData.append('academicYear', form.academicYear)

    form.textData.forEach((text, index) => {
      formData.append(`textData_${index}`, text);
    });
 
    form.fileData.forEach((fileArray, index) => {
      fileArray.forEach((file, fileIndex) => {
        formData.append(`fileData_${index}_${fileIndex}`, file, file.name);
      });
    });

    form.radioValues.forEach((radioValue, groupIndex) => {
      formData.append(`radioValues_${groupIndex}`, radioValue);
    });
    console.log(formData)
    try {
      const data=form
      const response = await axios.post('http://localhost:5000/admin/criteria4/submit', 
      formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="criteria2">
        <div className="logo-e">
          <img src={naacLogo} alt="NAAC LOGO" />
          <div className="head">
            <h1>University of Mumbai</h1>
            <h3>AQAR Platform</h3>
          </div>
        </div>
      </div>
      <div className="yearly_status_rep">
        <p>Yearly Status Report - Part B</p>
        <p>
          Academic Year to which AQAR has to be submitted:{" "}
          {academicYear || "acedemic year"}
        </p>
        <p>Department: {department || "Department"}</p>
      </div>
      <div>
        <div>
          <h1 className="text-center mt-3 text-xl text-semibold">
            Criterion 6-Governance,Leadership and Management
          </h1>
        </div>
        <div className="bg-gray-100 p-4">
          <h2 className="text-xl font-bold m mb-4">
            6.1 Institutional vision and Leadership
          </h2>
          <div className="bg-gray-100 p-4">
            <div className="bg-white rounded-md p-4 mb-4">
              <h2 className="text-xl font-bold mb-4">
                6.1.1 - The insititute has clearly stated vision and mission
                which are reflected as acedmics and administrative Governance
              </h2>
              <input
                type="text"
                className=" p-6 mx-8 h-6"
                value={form.textData[0]}
                onChange={(e) => {
                  handleStateChange(e, 0);
                }}
              />
              <table className="w-full mt-4">
                <thead>
                  <tr>
                    <th className="text-left font-semibold">
                      File Description
                    </th>
                    <th className="text-left font-semibold">Template</th>
                    <th className="text-left font-semibold">Documents</th>
                    <th className="text-left font-semibold">
                      File Types/Size Supported
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2">Upload the data template</td>
                    <td className="py-2">Data Template</td>
                    <td className="py-2">
                      <button className="py-2 px-2 bg-blue-500 text-white font-bold rounded">
                        <input
                          type="file"
                          value={form.fileData[0]}
                          onChange={(e) => {
                            handleStateChange(e, 0, false);
                          }}
                        />
                      </button>
                    </td>
                    <td className="py-2">xls, xlsx, File Size: 6MB</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-gray-100 p-4">
            <div className="bg-white rounded-md p-4 mb-4">
              <h2 className="text-xl font-bold mb-4">
                6.1.2 - The effective Leadership is reflected in various
                institutional practices such as decentrilization and
                participative management
              </h2>
              <input
                type="text"
                className=" p-6 mx-8 h-6"
                value={form.textData[1]}
                onChange={(e) => {
                  handleStateChange(e, 1);
                }}
              />
              <table className="w-full mt-4">
                <thead>
                  <tr>
                    <th className="text-left font-semibold">
                      File Description
                    </th>
                    <th className="text-left font-semibold">Template</th>
                    <th className="text-left font-semibold">Documents</th>
                    <th className="text-left font-semibold">
                      File Types/Size Supported
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2">Upload the data template</td>
                    <td className="py-2">Data Template</td>
                    <td className="py-2">
                      <button className="py-2 px-2 bg-blue-500 text-white font-bold rounded">
                        <input
                          type="file"
                          value={form.fileData[1]}
                          onChange={(e) => {
                            handleStateChange(e, 1, false);
                          }}
                        />
                      </button>
                    </td>
                    <td className="py-2">xls, xlsx, File Size: 6MB</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-gray-100 p-4">
            <h2 className="text-xl font-bold m mb-4">
              6.2 Strategy Development and Deployment
            </h2>
            <div className="bg-gray-100 p-4">
              <div className="bg-white rounded-md p-4 mb-4">
                <h2 className="text-xl font-bold mb-4">
                  6.2.1 - The insititutional strategic plan is effectively
                  deployed
                </h2>
                <input
                  type="text"
                  className=" p-6 mx-8 h-6"
                  value={form.textData[2]}
                  onChange={(e) => {
                    handleStateChange(e, 2);
                  }}
                />
                <table className="w-full mt-4">
                  <thead>
                    <tr>
                      <th className="text-left font-semibold">
                        File Description
                      </th>
                      <th className="text-left font-semibold">Template</th>
                      <th className="text-left font-semibold">Documents</th>
                      <th className="text-left font-semibold">
                        File Types/Size Supported
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2">Upload the data template</td>
                      <td className="py-2">Data Template</td>
                      <td className="py-2">
                        <button className="py-2 px-2 bg-blue-500 text-white font-bold rounded">
                          <input
                            type="file"
                            value={form.fileData[2]}
                            onChange={(e) => {
                              handleStateChange(e, 2, false);
                            }}
                          />
                        </button>
                      </td>
                      <td className="py-2">xls, xlsx, File Size: 6MB</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="bg-white rounded-md p-4 mb-4">
              <h2 className="text-xl font-bold mb-4">
                6.2.2 - The insititutional strategic plan is effectively
                deployed
              </h2>
              <input
                type="text"
                className=" p-6 mx-8 h-6"
                value={form.textData[3]}
                onChange={(e) => {
                  handleStateChange(e, 3);
                }}
              />
              <table className="w-full mt-4">
                <thead>
                  <tr>
                    <th className="text-left font-semibold">
                      File Description
                    </th>
                    <th className="text-left font-semibold">Template</th>
                    <th className="text-left font-semibold">Documents</th>
                    <th className="text-left font-semibold">
                      File Types/Size Supported
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2">Upload the data template</td>
                    <td className="py-2">Data Template</td>
                    <td className="py-2">
                      <button className="py-2 px-2 bg-blue-500 text-white font-bold rounded">
                        <input
                          type="file"
                          value={form.fileData[2]}
                          onChange={(e) => {
                            handleStateChange(e, 2, false);
                          }}
                        />
                      </button>
                    </td>
                    <td className="py-2">xls, xlsx, File Size: 6MB</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <div className="bg-white rounded-md p-4 mb-4">
              <h2 className="text-xl font-bold mb-4">
                6.2.3 -Institution implements e-governance in its areas of
                operations
              </h2>
              <h3 className="text-l font-semibold ">
                6.2.3.1 e-governance is implemented covering following areas of
                operations
              </h3>
              <ol>
                <li>1.Administration</li>
                <li>2.Finance and Account</li>
                <li>3.Students Admission and Support</li>
                <li>4.Examination</li>
              </ol>

              <div className="radio-group-1 flex">
                <div className="flex">
                  <h1>All of the above</h1>

                  <input
                    type="radio"
                    name="options"
                    value="Any four"
                    checked={form.radioValues[0] === "All of the above"}
                    onChange={() => handleRadioChange(0, "All of the above")}
                  />
                </div>

                <div className="flex">
                  <h1>Any three from above</h1>
                  <input
                    type="radio"
                    name="options"
                    value="Any three"
                    checked={form.radioValues[0] === "Any three"}
                    onChange={() => handleRadioChange(0, "Any three")}
                  />
                </div>

                <div className="flex">
                  <h1>Any 2 from above</h1>

                  <input
                    type="radio"
                    name="options"
                    value="Any two"
                    checked={form.radioValues[0] === "Any two"}
                    onChange={() => handleRadioChange(0, "Any two")}
                  />
                </div>

                <div className="flex">
                  <h1>Any 1 from above</h1>

                  <input
                    type="radio"
                    name="options"
                    value="Any one"
                    checked={form.radioValues[0] === "Any one"}
                    onChange={() => handleRadioChange(0, "Any one")}
                  />
                </div>

                <div className="flex">
                  <h1>None of the Above</h1>

                  <input
                    type="radio"
                    name="options"
                    value="None"
                    checked={form.radioValues[0] === "None"}
                    onChange={() => handleRadioChange(0, "None")}
                  />
                </div>
              </div>

              <table className="w-full mt-4">
                <thead>
                  <tr>
                    <th className="text-left font-semibold">
                      File Description
                    </th>
                    <th className="text-left font-semibold">Template</th>
                    <th className="text-left font-semibold">Documents</th>
                    <th className="text-left font-semibold">
                      File Types/Size Supported
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2">Upload the data template</td>
                    <td className="py-2">Data Template</td>
                    <td className="py-2">
                      <button className="py-2 px-2 bg-blue-500 text-white font-bold rounded">
                        <input
                          type="file"
                          onChange={(e) => {
                            handleStateChange(e, 3, false);
                          }}
                          value={form.fileData[3]}
                        />
                      </button>
                    </td>
                    <td className="py-2">xls, xlsx, File Size: 6MB</td>
                  </tr>
                  <tr>
                    <td className="py-2">
                      Upload relevant supporting document
                    </td>
                    <td className="py-2"></td>
                    <td className="py-2">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        <input
                          type="file"
                          onChange={(e) => {
                            handleStateChange(e, 4, false);
                          }}
                          value={form.fileData[4]}
                          className="bg-blue-500 "
                        />
                      </button>
                    </td>
                    <td className="py-2">
                      xls, xlsx, doc, docx, pdf, File Size: 6MB
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-gray-100 p-4">
            <h2 className="text-xl font-bold m mb-4">
              6.3 Faculty Empowerment Strategies
            </h2>
            <div className="bg-gray-100 p-4">
              <div className="bg-white rounded-md p-4 mb-4">
                <h2 className="text-xl font-bold mb-4">
                  6.3.1 - The institute has a performance appraisel
                  system,promotional avenues and effective welfare measures for
                  teaching and non-teaching staff
                </h2>
                <input
                  type="text"
                  className=" p-6 mx-8 h-6"
                  value={form.textData[4]}
                  onChange={(e) => {
                    handleStateChange(e, 4);
                  }}
                />
                <table className="w-full mt-4">
                  <thead>
                    <tr>
                      <th className="text-left font-semibold">
                        File Description
                      </th>
                      <th className="text-left font-semibold">Template</th>
                      <th className="text-left font-semibold">Documents</th>
                      <th className="text-left font-semibold">
                        File Types/Size Supported
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2">Upload the data template</td>
                      <td className="py-2">Data Template</td>
                      <td className="py-2">
                        <button className="py-2 px-2 bg-blue-500 text-white font-bold rounded">
                          <input
                            type="file"
                            value={form.fileData[5]}
                            onChange={(e) => {
                              handleStateChange(e, 5, false);
                            }}
                          />
                        </button>
                      </td>
                      <td className="py-2">xls, xlsx, File Size: 6MB</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-white rounded-md p-4 mb-4">
                <h2 className="text-xl font-bold mb-4">
                  6.3.2 - Total number of teachers provided with financial
                  support to attend conferences/workshops and towards
                  memeberships fee of professional bodies during the year
                </h2>
                <input
                  type="text"
                  className="  p-6 "
                  value={form.textData[5]}
                  onChange={(e) => {
                    handleStateChange(e, 5);
                  }}
                  placeholder="650"
                />
                <table className="w-full mt-4">
                  <thead>
                    <tr>
                      <th className="text-left font-semibold">
                        File Description
                      </th>
                      <th className="text-left font-semibold">Template</th>
                      <th className="text-left font-semibold">Documents</th>
                      <th className="text-left font-semibold">
                        File Types/Size Supported
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2">Upload the data template</td>
                      <td className="py-2">Data Template</td>
                      <td className="py-2">
                        <button className="py-2 px-2 bg-blue-500 text-white font-bold rounded">
                          <input
                            type="file"
                            onChange={(e) => {
                              handleStateChange(e, 6, false);
                            }}
                            value={form.fileData[6]}
                          />
                        </button>
                      </td>
                      <td className="py-2">xls, xlsx, File Size: 6MB</td>
                    </tr>
                    <tr>
                      <td className="py-2">
                        Upload relevant supporting document
                      </td>
                      <td className="py-2"></td>
                      <td className="py-2">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          <input
                            type="file"
                            onChange={(e) => {
                              handleStateChange(e, 7, false);
                            }}
                            value={form.fileData[7]}
                            className="bg-blue-500 "
                          />
                        </button>
                      </td>
                      <td className="py-2">
                        xls, xlsx, doc, docx, pdf, File Size: 6MB
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-white rounded-md p-4 mb-4">
                <h2 className="text-xl font-bold mb-4">
                  6.3.3 - Number of professional developemnt/administrative
                  training Programmes organised by the institution for teaching
                  and non-teaching staff during the year
                </h2>
                <input
                  type="text"
                  className="  p-6 "
                  value={form.textData[6]}
                  onChange={(e) => {
                    handleStateChange(e, 6);
                  }}
                  placeholder="650"
                />
                <table className="w-full mt-4">
                  <thead>
                    <tr>
                      <th className="text-left font-semibold">
                        File Description
                      </th>
                      <th className="text-left font-semibold">Template</th>
                      <th className="text-left font-semibold">Documents</th>
                      <th className="text-left font-semibold">
                        File Types/Size Supported
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2">Upload the data template</td>
                      <td className="py-2">Data Template</td>
                      <td className="py-2">
                        <button className="py-2 px-2 bg-blue-500 text-white font-bold rounded">
                          <input
                            type="file"
                            onChange={(e) => {
                              handleStateChange(e, 8, false);
                            }}
                            value={form.fileData[8]}
                          />
                        </button>
                      </td>
                      <td className="py-2">xls, xlsx, File Size: 6MB</td>
                    </tr>
                    <tr>
                      <td className="py-2">
                        Upload relevant supporting document
                      </td>
                      <td className="py-2"></td>
                      <td className="py-2">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          <input
                            type="file"
                            onChange={(e) => {
                              handleStateChange(e, 9, false);
                            }}
                            value={form.fileData[9]}
                            className="bg-blue-500 "
                          />
                        </button>
                      </td>
                      <td className="py-2">
                        xls, xlsx, doc, docx, pdf, File Size: 6MB
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-white rounded-md p-4 mb-4">
                <h2 className="text-xl font-bold mb-4">
                  6.3.4 -Total number of teachers undergoing online/face-to-face
                  Faculty Development Programmes(FDP) during the
                  year(Professional Development Programmes,Oreintation/Induction
                  Programmes Refreshers Course,Short Term Course)
                </h2>
                <input
                  type="text"
                  className="  p-6 "
                  value={form.textData[7]}
                  onChange={(e) => {
                    handleStateChange(e, 7);
                  }}
                  placeholder="650"
                />
                <table className="w-full mt-4">
                  <thead>
                    <tr>
                      <th className="text-left font-semibold">
                        File Description
                      </th>
                      <th className="text-left font-semibold">Template</th>
                      <th className="text-left font-semibold">Documents</th>
                      <th className="text-left font-semibold">
                        File Types/Size Supported
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2">Upload the data template</td>
                      <td className="py-2">Data Template</td>
                      <td className="py-2">
                        <button className="py-2 px-2 bg-blue-500 text-white font-bold rounded">
                          <input
                            type="file"
                            onChange={(e) => {
                              handleStateChange(e, 10, false);
                            }}
                            value={form.fileData[10]}
                          />
                        </button>
                      </td>
                      <td className="py-2">xls, xlsx, File Size: 6MB</td>
                    </tr>
                    <tr>
                      <td className="py-2">
                        Upload relevant supporting document
                      </td>
                      <td className="py-2"></td>
                      <td className="py-2">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          <input
                            type="file"
                            onChange={(e) => {
                              handleStateChange(e, 11, false);
                            }}
                            value={form.fileData[11]}
                            className="bg-blue-500 "
                          />
                        </button>
                      </td>
                      <td className="py-2">
                        xls, xlsx, doc, docx, pdf, File Size: 6MB
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 p-4">
            <h2 className="text-xl font-bold m mb-4">
              6.4 Financial Management and Resource Mobilization
            </h2>
            <div className="bg-gray-100 p-4">
              <div className="bg-white rounded-md p-4 mb-4">
                <h2 className="text-xl font-bold mb-4">
                  6.4.1 - Institutional strategies for mobilisation of funds and
                  the optimal utilisation of resources
                </h2>
                <input
                  type="text"
                  className=" p-6 mx-8 h-6"
                  value={form.textData[8]}
                  onChange={(e) => {
                    handleStateChange(e, 8);
                  }}
                />
                <table className="w-full mt-4">
                  <thead>
                    <tr>
                      <th className="text-left font-semibold">
                        File Description
                      </th>
                      <th className="text-left font-semibold">Template</th>
                      <th className="text-left font-semibold">Documents</th>
                      <th className="text-left font-semibold">
                        File Types/Size Supported
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2">Upload the data template</td>
                      <td className="py-2">Data Template</td>
                      <td className="py-2">
                        <button className="py-2 px-2 bg-blue-500 text-white font-bold rounded">
                          <input
                            type="file"
                            value={form.fileData[12]}
                            onChange={(e) => {
                              handleStateChange(e, 12, false);
                            }}
                          />
                        </button>
                      </td>
                      <td className="py-2">xls, xlsx, File Size: 6MB</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="bg-white rounded-md p-4 mb-4">
              <h2 className="text-xl font-bold mb-4">
                6.4.2 -Funds / Grants received from goverment bodies during the
                year for developemnt and maintenance of infrastructure(not
                covered under Criteria III and V)(INR in lakhs)
              </h2>
              <input
                type="text"
                className="  p-6 "
                value={form.textData[9]}
                onChange={(e) => {
                  handleStateChange(e, 9);
                }}
                placeholder="650"
              />
              <table className="w-full mt-4">
                <thead>
                  <tr>
                    <th className="text-left font-semibold">
                      File Description
                    </th>
                    <th className="text-left font-semibold">Template</th>
                    <th className="text-left font-semibold">Documents</th>
                    <th className="text-left font-semibold">
                      File Types/Size Supported
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2">Upload the data template</td>
                    <td className="py-2">Data Template</td>
                    <td className="py-2">
                      <button className="py-2 px-2 bg-blue-500 text-white font-bold rounded">
                        <input
                          type="file"
                          onChange={(e) => {
                            handleStateChange(e, 13, false);
                          }}
                          value={form.fileData[13]}
                        />
                      </button>
                    </td>
                    <td className="py-2">xls, xlsx, File Size: 6MB</td>
                  </tr>
                  <tr>
                    <td className="py-2">
                      Upload relevant supporting document
                    </td>
                    <td className="py-2"></td>
                    <td className="py-2">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        <input
                          type="file"
                          onChange={(e) => {
                            handleStateChange(e, 14, false);
                          }}
                          value={form.fileData[14]}
                          className="bg-blue-500 "
                        />
                      </button>
                    </td>
                    <td className="py-2">
                      xls, xlsx, doc, docx, pdf, File Size: 6MB
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-white rounded-md p-4 mb-4">
              <h2 className="text-xl font-bold mb-4">
                6.4.3 -Funds/Grants recieved from non-goverment
                bodies,individuals,philanthropists during the year for
                development and maintenance of infrastructure(not covered under
                Criteria III and V)(INR in lakhs)
              </h2>
              <input
                type="text"
                className="  p-6 "
                value={form.textData[10]}
                onChange={(e) => {
                  handleStateChange(e, 10);
                }}
                placeholder="650"
              />
              <table className="w-full mt-4">
                <thead>
                  <tr>
                    <th className="text-left font-semibold">
                      File Description
                    </th>
                    <th className="text-left font-semibold">Template</th>
                    <th className="text-left font-semibold">Documents</th>
                    <th className="text-left font-semibold">
                      File Types/Size Supported
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2">Upload the data template</td>
                    <td className="py-2">Data Template</td>
                    <td className="py-2">
                      <button className="py-2 px-2 bg-blue-500 text-white font-bold rounded">
                        <input
                          type="file"
                          onChange={(e) => {
                            handleStateChange(e, 15, false);
                          }}
                          value={form.fileData[15]}
                        />
                      </button>
                    </td>
                    <td className="py-2">xls, xlsx, File Size: 6MB</td>
                  </tr>
                  <tr>
                    <td className="py-2">
                      Upload relevant supporting document
                    </td>
                    <td className="py-2"></td>
                    <td className="py-2">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        <input
                          type="file"
                          onChange={(e) => {
                            handleStateChange(e, 16, false);
                          }}
                          value={form.fileData[16]}
                          className="bg-blue-500 "
                        />
                      </button>
                    </td>
                    <td className="py-2">
                      xls, xlsx, doc, docx, pdf, File Size: 6MB
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-white rounded-md p-4 mb-4">
            <h2 className="text-xl font-bold mb-4">
              6.4.4 - Institution conducts internal and external financial
              audits regularly
            </h2>
            <input
              type="text"
              className=" p-6 mx-8 h-6"
              value={form.textData[11]}
              onChange={(e) => {
                handleStateChange(e, 11);
              }}
            />
            <table className="w-full mt-4">
              <thead>
                <tr>
                  <th className="text-left font-semibold">File Description</th>
                  <th className="text-left font-semibold">Template</th>
                  <th className="text-left font-semibold">Documents</th>
                  <th className="text-left font-semibold">
                    File Types/Size Supported
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2">Upload the data template</td>
                  <td className="py-2">Data Template</td>
                  <td className="py-2">
                    <button className="py-2 px-2 bg-blue-500 text-white font-bold rounded">
                      <input
                        type="file"
                        value={form.fileData[16]}
                        onChange={(e) => {
                          handleStateChange(e, 16, false);
                        }}
                      />
                    </button>
                  </td>
                  <td className="py-2">xls, xlsx, File Size: 6MB</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-gray-100 p-4">
          <h2 className="text-xl font-bold m mb-4">
            6.5 Internal Quality Assurance System
          </h2>
          <div className="bg-gray-100 p-4">
            <div className="bg-white rounded-md p-4 mb-4">
              <h2 className="text-xl font-bold mb-4">
                6.5.1 - Internal Quality Assurance Cell(IQAC) has contributed
                significantly for institutionalizing the qualilty assurance
                startegies and processes by constantly reviewing the teaching
                learning process,structures & methodoligies of operations and
                learning outcomes at periodic intervals
              </h2>
              <input
                type="text"
                className=" p-6 mx-8 h-6"
                value={form.textData[12]}
                onChange={(e) => {
                  handleStateChange(e, 12);
                }}
              />
              <table className="w-full mt-4">
                <thead>
                  <tr>
                    <th className="text-left font-semibold">
                      File Description
                    </th>
                    <th className="text-left font-semibold">Template</th>
                    <th className="text-left font-semibold">Documents</th>
                    <th className="text-left font-semibold">
                      File Types/Size Supported
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2">Upload the data template</td>
                    <td className="py-2">Data Template</td>
                    <td className="py-2">
                      <button className="py-2 px-2 bg-blue-500 text-white font-bold rounded">
                        <input
                          type="file"
                          value={form.fileData[17]}
                          onChange={(e) => {
                            handleStateChange(e, 17, false);
                          }}
                        />
                      </button>
                    </td>
                    <td className="py-2">xls, xlsx, File Size: 6MB</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-white rounded-md p-4 mb-4">
            <h2 className="text-xl font-bold mb-4">
              6.5.2 -Institution has adopted the following for Quality assurance
            </h2>

            <ol>
              <li>
                1.Academic Administrative Audit(AAA) and follow up action taken
              </li>
              <li>2.Conference ,seminars,workshops on quality conducted</li>
              <li>
                3.Collaborative quality initiatives with other institutions
              </li>
              <li>
                4.Orientations programme on quality issues for teachers and
                students
              </li>
              <li>5.Participation in NIRF</li>
              <li>
                Any other qualilty audit recoganized by state,national or
                international agencies (ISO Certification NBA)
              </li>
            </ol>

            <div className="radio-group-1 flex">
              <div className="flex">
                <h1>ANY 5 or All of the above</h1>

                <input
                  type="radio"
                  name="options"
                  value="Any four"
                  checked={form.radioValues[1] === "Any 5 or All of the above"}
                  onChange={() =>
                    handleRadioChange(0, "Any 5 orAll of the above")
                  }
                />
              </div>

              <div className="flex">
                <h1>Any three from above</h1>
                <input
                  type="radio"
                  name="options"
                  value="Any three"
                  checked={form.radioValues[1] === "Any 4"}
                  onChange={() => handleRadioChange(0, "Any 4")}
                />
              </div>

              <div className="flex">
                <h1>Any 2 from above</h1>

                <input
                  type="radio"
                  name="options"
                  value="Any 3"
                  checked={form.radioValues[1] === "Any 3"}
                  onChange={() => handleRadioChange(0, "Any 3")}
                />
              </div>

              <div className="flex">
                <h1>Any 1 from above</h1>

                <input
                  type="radio"
                  name="options"
                  value="Any 2"
                  checked={form.radioValues[1] === "Any 2"}
                  onChange={() => handleRadioChange(0, "Any 2")}
                />
              </div>

              <div className="flex">
                <h1>None of the Above</h1>

                <input
                  type="radio"
                  name="options"
                  value="Any 1"
                  checked={form.radioValues[1] === "Any 1"}
                  onChange={() => handleRadioChange(0, "Any 1")}
                />
              </div>
            </div>

            <table className="w-full mt-4">
              <thead>
                <tr>
                  <th className="text-left font-semibold">File Description</th>
                  <th className="text-left font-semibold">Template</th>
                  <th className="text-left font-semibold">Documents</th>
                  <th className="text-left font-semibold">
                    File Types/Size Supported
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2">Upload the data template</td>
                  <td className="py-2">Data Template</td>
                  <td className="py-2">
                    <button className="py-2 px-2 bg-blue-500 text-white font-bold rounded">
                      <input
                        type="file"
                        onChange={(e) => {
                          handleStateChange(e, 18, false);
                        }}
                        value={form.fileData[18]}
                      />
                    </button>
                  </td>
                  <td className="py-2">xls, xlsx, File Size: 6MB</td>
                </tr>
                <tr>
                  <td className="py-2">Upload relevant supporting document</td>
                  <td className="py-2"></td>
                  <td className="py-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      <input
                        type="file"
                        onChange={(e) => {
                          handleStateChange(e, 19, false);
                        }}
                        value={form.fileData[19]}
                        className="bg-blue-500 "
                      />
                    </button>
                  </td>
                  <td className="py-2">
                    xls, xlsx, doc, docx, pdf, File Size: 6MB
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-white rounded-md p-4 mb-4">
            <h2 className="text-xl font-bold mb-4">
              6.5.3 - Incremental improvements made for the preceding during the year with regards to quality(incase of first cycle)post accreditation quality initiatives(second and subsequent cycles)
            </h2>
            <input
              type="text"
              className=" p-6 mx-8 h-6"
              value={form.textData[13]}
              onChange={(e) => {
                handleStateChange(e, 13);
              }}
            />
            <table className="w-full mt-4">
              <thead>
                <tr>
                  <th className="text-left font-semibold">File Description</th>
                  <th className="text-left font-semibold">Template</th>
                  <th className="text-left font-semibold">Documents</th>
                  <th className="text-left font-semibold">
                    File Types/Size Supported
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2">Upload the data template</td>
                  <td className="py-2">Data Template</td>
                  <td className="py-2">
                    <button className="py-2 px-2 bg-blue-500 text-white font-bold rounded">
                      <input
                        type="file"
                        value={form.fileData[20]}
                        onChange={(e) => {
                          handleStateChange(e, 20, false);
                        }}
                      />
                    </button>
                  </td>
                  <td className="py-2">xls, xlsx, File Size: 6MB</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-center">
                        <button
                          type="submit"
                          onClick={handleSubmit}
                          className="bg-blue-500 hover:bg-blue-600 rounded px-4 py-2"
                        >
                          Submit
                        </button>
                      </div>
        </div>
      </div>
    </>
  );
};

export default Criteria6;
