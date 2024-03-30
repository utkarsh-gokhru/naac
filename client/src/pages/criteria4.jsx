import React, { useState } from "react";
import axios from "axios";
import naacLogo from "../naac_logo.png";
import "../css/criteria2.css";
const CriterionForm = () => {
  const department = localStorage.getItem("department");
  const academicYear = localStorage.getItem("academicYear");


  const [form, setForm] = useState({
    department: "",
    academicYear: "",
    textData: Array(16).fill(""),
    fileData: Array(19).fill([]),
    radioValues: Array(3).fill(""),
  });
console.log(form)


  const handleStateChange = (e, arrIndex,isText=true) => {
    if (isText) {
      const updatedTextData = [...form.textData];
      updatedTextData[arrIndex] = e.target.value;
      setForm({ ...form, textData: updatedTextData });
    } else {
      const file=form.fileData
      const updatedFileData = [...file];
      updatedFileData[arrIndex] = Array.from(e.target.files);
      setForm({ ...form, fileData: updatedFileData });
    }
  };

  const handleRadioChange = (arrIndex, value) => {
    const updatedRadioValues = [...form.radioValues];
    updatedRadioValues[arrIndex] = value;
    setForm({ ...form, radioValues: updatedRadioValues });
  }


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
        <h1 className="text-center mt-3 text-xl text-semibold">
          Criterion 4-Infrastructure and Learning resources
        </h1>
      </div>
      <div>
        <div className="bg-gray-100 p-4">
          <h2 className="text-xl font-bold m mb-4">4.1 - Physical facilty</h2>
          <div className="bg-gray-100 p-4">
            <div className="bg-white rounded-md p-4 mb-4">
              <h2 className="text-xl font-bold mb-4">
                4.1.1 - The insititute has adequate facilities to teaching
                -learning viz,classroom,laborataries and computing lab
              </h2>
              <input type="text" className=" p-6 mx-8 h-6" 
              value={form.textData[0]}
              onChange={(e) => {
                handleStateChange(e, 0)
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
                          name="fileUpload"
                          
                         onChange={(e)=>{handleStateChange(e,0,false)}}
                        />
                      </button>
                    </td>
                    <td className="py-2">xls, xlsx, File Size: 6MB</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <div className="bg-white rounded-md p-4 mb-4">
                <h2 className="text-xl font-bold mb-4">
                  4.1.2 - The institute has adequte facilities for cultural
                  activities ,yoga,games and sports
                </h2>
                <input type="text" className=" p-6 mx-8 h-6"
                  value={form.textData[1]}
                  onChange={(e) => {
                    handleStateChange(e, 1)
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
                            onChange={(e) => {
                             handleStateChange(e,1,false)
                            }}
                            value={form.fileData[1]}
                          />
                        </button>
                      </td>
                      <td className="py-2">xls, xlsx, File Size: 6MB</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <div className="bg-white rounded-md p-4 mb-4">
                  <h2 className="text-xl font-bold mb-4">
                    4.1.3 - Availability of General campus facilities and
                    Overall ambience
                  </h2>
                  <input
                    type="text"
                    className=" p-6 mx-8 h-6"
                    value={form.textData[2]}
                    onChange={(e) => {
                      handleStateChange(e, 2)
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
                              onChange={(e) => {
                                handleStateChange(e,2,false)
                               }}
                               value={form.fileData[2]}
                           
                            />
                          </button>
                        </td>
                        <td className="py-2">xls, xlsx, File Size: 6MB</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <div>
                    <div className="bg-white rounded-md p-4 mb-4">
                      <h2 className="text-xl font-bold mb-4">
                        4.1.4 - Total Expenditure excluding salary for
                        Infrastructure augmentaion during the year(INR in Lakhs)
                      </h2>
                      <input
                        type="text"
                        className="  p-6 "
                        value={form.textData[3]}
                        onChange={(e) => {
                          handleStateChange(e, 3)
                        }} 
                        placeholder="650"
                      />
                      <table className="w-full mt-4">
                        <thead>
                          <tr>
                            <th className="text-left font-semibold">
                              File Description
                            </th>
                            <th className="text-left font-semibold">
                              Template
                            </th>
                            <th className="text-left font-semibold">
                              Documents
                            </th>
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
                                    handleStateChange(e,3,false)
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
                                    handleStateChange(e,4,false)
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
                    <div>
                      <div className="bg-white rounded-md p-4 mb-4">
                        <h2 className="text-xl font-bold mb-4">
                          4.2 - Library as a learning Source{" "}
                        </h2>
                        <h2 className="text-xl font-bold mb-4">
                          4.2.1 - Library is Automated Using intgrated Library
                          Management System (ILMS) has digitisation Facility
                        </h2>
                        <input
                          type="text"
                          value={form.textData[4]}
                          onChange={(e) => {
                            handleStateChange(e, 4)
                          }} 
                          className=" p-6 mx-8 h-6"
                          // onChange={(e)=>{(e)=>{handleTextChange(e, "4.2.1",'libraryFacilities')}}}
                        />
                        <table className="w-fl mt-4">
                          <thead>
                            <tr>
                              <th className="text-left font-semibold">
                                File Description
                              </th>
                              <th className="text-left font-semibold">
                                Template
                              </th>
                              <th className="text-left font-semibold">
                                Documents
                              </th>
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
                                      handleStateChange(e,5,false)
                                     }}
                                     value={form.fileData[5]}
                                  />
                                </button>
                              </td>
                              <td className="py-2">
                                xls, xlsx, File Size: 6MB
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div>
                        <div>
                          <div className="bg-white rounded-md p-4 mb-4">
                            <h2 className="text-xl font-bold mb-4">
                              4.2.2 -The institute has subscription for
                              E-Library resources library has subscription for
                              the flilowing :{" "}
                            </h2>
                            <ol>
                              <li>1.E-journal</li>
                              <li>2.E-books</li>
                              <li>3.E-shodhSindhu</li>
                              <li>4.ShodGanga</li>
                              <li>5.Databases</li>
                            </ol>

                            <div className="radio-group-1 flex">
                              <div className="flex">
                                <h1>Any four from above</h1> 
                                {/* {index=5} */}
                                <input
                                  type="radio"
                                  name="options"
                                  value="Any four"
                                  checked={form.radioValues[0] === 'Any four'}
                                  onChange={() => handleRadioChange(0, 'Any four' )}
                                />
                              </div>

                              <div className="flex">
                                <h1>Any three from above</h1>
                                <input
                                  type="radio"
                                  name="options"
                                  value="Any three"
                                  checked={form.radioValues[0] === 'Any three'}
                                  onChange={() => handleRadioChange(0, 'Any three')}
                                />
                              </div>

                              <div className="flex">
                                <h1>Any 2 from above</h1>

                                <input
                                  type="radio"
                                  name="options"
                                  value="Any two"
                                  checked={form.radioValues[0] === 'Any two'}
                                  onChange={() => handleRadioChange(0, 'Any two' )}
                                />
                              </div>

                              <div className="flex">
                                <h1>Any 1 from above</h1>

                                <input
                                  type="radio"
                                  name="options"
                                  value="Any one"
                                  checked={form.radioValues[0] === 'Any one'}
                                  onChange={() => handleRadioChange(0, 'Any one' )}
                                />
                              </div>

                              <div className="flex">
                                <h1>None of the Above</h1>

                                <input
                                  type="radio"
                                  name="options"
                                  value="None"
                                  checked={form.radioValues[0] === 'None'}
                                  onChange={() => handleRadioChange(0, 'None' )}
                                />
                              </div>
                            </div>

                            <table className="w-full mt-4">
                              <thead>
                                <tr>
                                  <th className="text-left font-semibold">
                                    File Description
                                  </th>
                                  <th className="text-left font-semibold">
                                    Template
                                  </th>
                                  <th className="text-left font-semibold">
                                    Documents
                                  </th>
                                  <th className="text-left font-semibold">
                                    File Types/Size Supported
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="py-2">
                                    Upload the data template
                                  </td>
                                  <td className="py-2">Data Template</td>
                                  <td className="py-2">
                                    <button className="py-2 px-2 bg-blue-500 text-white font-bold">
                                      <input
                                        type="file"
                                        onChange={(e) => {
                                          handleStateChange(e,6,false)
                                         }}
                                         value={form.fileData[6]}
                                      />
                                    </button>
                                  </td>
                                  <td className="py-2">
                                    xls, xlsx, File Size: 6MB
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div>
                          <div className="bg-white rounded-md p-4 mb-4">
                            <h2 className="text-xl font-bold mb-4">
                              4.2.3 -Annual expenditure of books/ebooks and
                              subsriptions To Journal and E-journal during the
                              year(INR in Lakhs)
                            </h2>
                          
                            <input
                              type="text"
                              className="  p-6 "
                              placehlider="650"
                              value={form.textData[5]}
                              onChange={(e) => {
                                handleStateChange(e, 5)
                              }} 
                            />
                            <table className="w-full mt-4">
                              <thead>
                                <tr>
                                  <th className="text-left font-semibold">
                                    File Description
                                  </th>
                                  <th className="text-left font-semibold">
                                    Template
                                  </th>
                                  <th className="text-left font-semibold">
                                    Documents
                                  </th>
                                  <th className="text-left font-semibold">
                                    File Types/Size Supported
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="py-2">
                                    Upload the data template
                                  </td>
                                  <td className="py-2">Data Template</td>
                                  <td className="py-2">
                                    <button className="py-2 px-2 bg-blue-500 text-white font-bold">
                                      <input
                                        type="file"
                                        onChange={(e) => {
                                          handleStateChange(e,7,false)
                                         }}
                                         value={form.fileData[7]}
                                      />
                                    </button>
                                  </td>
                                  <td className="py-2">
                                    xls, xlsx, File Size: 6MB
                                  </td>
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
                                          handleStateChange(e,8,false)
                                         }}
                                         value={form.fileData[8]}
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
                            4.2.4 - Number of usage of library by Teachers and
                            students per day(foot falls and login data for
                            online access)
                          </h2>
                          <input
                            type="text"
                            className=" p-6 mx-8 h-6"
                            placeholder='10'
                            value={form.textData[6]}
                            onChange={(e) => {
                              handleStateChange(e, 6)
                            }} 
                            
                          />
                          <table className="w-full mt-4">
                            <thead>
                              <tr>
                                <th className="text-left font-semibold">
                                  File Description
                                </th>
                                <th className="text-left font-semibold">
                                  Template
                                </th>
                                <th className="text-left font-semibold">
                                  Documents
                                </th>
                                <th className="text-left font-semibold">
                                  File Types/Size Supported
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="py-2">
                                  Upload the data template
                                </td>
                                <td className="py-2">Data Template</td>
                                <td className="py-2">
                                  <button className="bg-blue-500 text-white font-bold rounded">
                                    <input
                                      type="file"
                                      onChange={(e) => {
                                        handleStateChange(e,9,false)
                                       }}
                                       value={form.fileData[9]}
                                    />
                                  </button>
                                </td>
                                <td className="py-2">
                                  xls, xlsx, File Size: 6MB
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div>
                          <div className="bg-white rounded-md p-4 mb-4">
                            <h1 className="font-bold">4.3 IT Infrastructure</h1>
                            <h2 className="text-xl font-bold mb-4">
                              4.3.1 -Number of Classrooms and seminar halls with
                              ICT- enabled facilities such as smart board,
                              Lcd,Wifi,audio/video recording etc during the year
                            </h2>
                            <input
                              type="text"
                              value={form.textData[7]}
              onChange={(e) => {
                handleStateChange(e, 7)
              }} 
                              className="  p-6 "
                              olacehlider="150"
                            />
                            <table className="w-full mt-4">
                              <thead>
                                <tr>
                                  <th className="text-left font-semibold">
                                    File Description
                                  </th>
                                  <th className="text-left font-semibold">
                                    Template
                                  </th>
                                  <th className="text-left font-semibold">
                                    Documents
                                  </th>
                                  <th className="text-left font-semibold">
                                    File Types/Size Supported
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="py-2">
                                    Upload the data template
                                  </td>
                                  <td className="py-2">Data Template</td>
                                  <td className="py-2">
                                    <button className="py-2 px-2 bg-blue-500 text-white font-bold">
                                      <input
                                        type="file"
                                        onChange={(e) => {
                                          handleStateChange(e,10,false)
                                         }}
                                         value={form.fileData[10]}
                                      />
                                    </button>
                                  </td>
                                  <td className="py-2">
                                    xls, xlsx, File Size: 6MB
                                  </td>
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
                                        className="bg-blue-500 "
                                        onChange={(e) => {
                                          handleStateChange(e,11,false)
                                         }}
                                         value={form.fileData[11]}
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
                            4.3.2 -Institution has an IT policy makes
                            appropriate budgeteray provision and update its
                            facility including wifi facility
                          </h2>
                          <input type="text" 
                            value={form.textData[8]}
                            onChange={(e) => {
                              handleStateChange(e, 8)
                            }} 
                          className=" p-6 mx-8 h-6" />
                          <table className="w-full mt-4">
                            <thead>
                              <tr>
                                <th className="text-left font-semibold">
                                  File Description
                                </th>
                                <th className="text-left font-semibold">
                                  Template
                                </th>
                                <th className="text-left font-semibold">
                                  Documents
                                </th>
                                <th className="text-left font-semibold">
                                  File Types/Size Supported
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="py-2">
                                  Upload the data template
                                </td>
                                <td className="py-2">Data Template</td>
                                <td className="py-2">
                                  <button className="bg-blue-500 text-white font-bold rounded">
                                    <input
                                      type="file"
                                      onChange={(e) => {
                                        handleStateChange(e,12,false)
                                       }}
                                       value={form.fileData[12]}
                                    />
                                  </button>
                                </td>
                                <td className="py-2">
                                  xls, xlsx, File Size: 6MB
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="bg-white p-4 rounded-md shadow-md">
                          <h3 className="text-lg font-bold mb-4">
                            4.3.3 - Student - Computer ratio during the year
                          </h3>
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="bg-gray-200 p-2 rounded-md">
                              <p className="text-gray-700 font-semibold">
                                Number of students
                              </p>
                              <input
                                type="text"
                                className="w-full border-gray-300 rounded-md px-2 py-1 text-gray-700"
                                value={form.textData[9]}
                                onChange={(e) => {
                                  handleStateChange(e,9)
                                }} 
                              />
                            </div>
                            <div className="bg-gray-200 p-2 rounded-md">
                              <p className="text-gray-700 font-semibold">
                                Number of Computers available to students for
                                academic purposes
                              </p>
                              <input
                                type="text"
                                className="w-full border-gray-300 rounded-md px-2 py-1 text-gray-700"
                                value={form.textData[10]}
                                onChange={(e) => {
                                  handleStateChange(e, 10)
                                }} 
                              />
                            </div>
                          </div>

                          <div className="mb-4">
                            <h4 className="text-base font-semibold mb-2">
                              4.3.4 - Available bandwidth of internet connection
                              in the Institution (Leased line)
                            </h4>
                            <div className="flex  mb-2">
                              
                              <input
                                type="radio"
                                name="internetSpeed"
                                value=">1 GBPS"
                                className="mr-2"
                                checked={form.radioValues[1] === ">1 GBPS"}
                                  onChange={() => handleRadioChange(1, ">1 GBPS" )}
                              />
                              <label htmlFor="speed1" className="text-gray-700">
                                &gt;1 GBPS
                              </label>
                            </div>
                            <div className="flex items-center mb-2">
                              <input
                                type="radio"
                                name="internetSpeed"
                                value="500 MBPS - 1 GBPS"
                                className="mr-2"
                                checked={form.radioValues[1] === "500mbps-1 GBPS"}
                                onChange={() => handleRadioChange(1, "500mbps-1 GBPS" )}
                              />
                              <label htmlFor="speed2" className="text-gray-700">
                                500 MBPS - 1 GBPS
                              </label>
                            </div>
                            <div className="flex items-center mb-2">
                              <input
                                type="radio"
                                name="internetSpeed"
                                value="250 MBPS - 500 MBPS"
                                className="mr-2"
                                checked={form.radioValues[1] === "250 MBPS - 500 MBPS"}
                                onChange={() => handleRadioChange(1,"250 MBPS - 500 MBPS" )}
                              />
                              <label htmlFor="speed3" className="text-gray-700">
                                250 MBPS - 500 MBPS
                              </label>
                            </div>
                            <div className="flex items-center mb-2">
                              <input
                                type="radio"
                                name="internetSpeed"
                                value="50 MBPS - 250 MBPS"
                                className="mr-2"
                                checked={form.radioValues[1] === "50 MBPS - 250 MBPS"}
                                onChange={() => handleRadioChange(1,"50 MBPS - 250 MBPS")}
                              />
                              <label htmlFor="speed4" className="text-gray-700">
                                50 MBPS - 250 MBPS
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input
                                type="radio"
                                name="internetSpeed"
                                value="<50 MBPS"
                                className="mr-2"
                              />
                              <label htmlFor="speed5" className="text-gray-700">
                                &lt;50 MBPS
                              </label>
                            </div>
                          </div>

                          <div>
                            <h4 className="text-base font-semibold mb-2">
                              File Description
                            </h4>
                            <div className="grid grid-cols-4 gap-4 mb-4">
                              <div className="col-span-1 bg-gray-200 p-2 rounded-md">
                                <p className="text-gray-700">
                                  Upload relevant supporting document
                                </p>
                              </div>
                              <div className="col-span-2">
                                <input
                                  type="file"
                                  onChange={(e) => {
                                    handleStateChange(e,13,false)
                                   }}
                                   value={form.fileData[13]}
                                  className="w-full border-gray-300 rounded-md px-2 py-1 text-gray-700"
                                />
                              </div>
                              <div className="col-span-1 bg-gray-200 p-2 rounded-md">
                                <p className="text-gray-700">
                                  xls, xlsx, doc, docx, pdf File Size: 6MB
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="bg-white p-4 rounded-md shadow-md">
                            <h3 className="text-lg font-bold mb-4">
                              4.3.5 - Institution has the following Facilities
                              for e-content development
                            </h3>
                            <div className="mb-4">
                              <ul className="list-disc list-inside">
                                <li>1. Media centre</li>
                                <li>2. Audio visual centre</li>
                                <li>3. Lecture Capturing System(LCS)</li>
                                <li>
                                  4. Mixing equipment's and softwares for
                                  editing
                                </li>
                              </ul>
                            </div>
                            <div className="mb-4">
                              <div className="flex items-center mb-2">
                              
                                <input
                                  type="radio"
                                  name="option"
                                  value="A. All of the above"
                                  className="mr-2"
                                  checked={form.radioValues[2] ==="A. All of the above"}
                                  onChange={() => handleRadioChange(2,"A. All of the above")}
                                />
                                <label
                                  htmlFor="option1"
                                  className="text-gray-700"
                                >
                                  A. All of the above
                                </label>
                                <input
                                  type="radio"
                                  name="option"
                                  value="B. 3 of the above"
                                  className="mr-2"
                                  checked={form.radioValues[2] ==="B. 3 of the above"}
                                  onChange={() => handleRadioChange(2,"B. 3 of the above")}
                                />
                                <label
                                  htmlFor="option1"
                                  className="text-gray-700"
                                >
                                  C. 3 of the above
                                </label>
                                <input
                                  type="radio"
                                  name="option"
                                  value="C. 2 of the above"
                                  className="mr-2"
                                  checked={form.radioValues[2] ==="C. 2 of the above"}
                                  onChange={() => handleRadioChange(2,"C. 2 of the above")}
                                />
                                <label
                                  htmlFor="option1"
                                  className="text-gray-700"
                                >
                                  C. 2 of the above
                                </label>
                                <input
                                  type="radio"
                                  name="option"
                                  value="D. Any 1 of the above"
                                  className="mr-2"
                                  checked={form.radioValues[2] ==="D. Any 1 of the above"}
                                  onChange={() => handleRadioChange(2,"D. Any 1 of the above")}
                                />
                                <label
                                  htmlFor="option1"
                                  className="text-gray-700"
                                >
                                  D. Any 1 of the above
                                </label>
                              </div>
                            </div>
                            <div>
                              <table className="w-full mt-4">
                                <thead>
                                  <tr>
                                    <th className="text-left font-semibold">
                                      File Description
                                    </th>
                                    <th className="text-left font-semibold">
                                      Template
                                    </th>
                                    <th className="text-left font-semibold">
                                      Documents
                                    </th>
                                    <th className="text-left font-semibold">
                                      File Types/Size Supported
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td className="py-2">
                                      Upload the data template
                                    </td>
                                    <td className="py-2">Data Template</td>
                                    <td className="py-2">
                                      <button className="py-2 px-2 bg-blue-500 text-white font-bold rounded">
                                        <input
                                          type="file"
                                          onChange={(e) => {
                                            handleStateChange(e,14,false)
                                           }}
                                           value={form.fileData[14]}
                                        />
                                      </button>
                                    </td>
                                    <td className="py-2">
                                      xls, xlsx, File Size: 6MB
                                    </td>
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
                                          className="bg-blue-500 "
                                          onChange={(e) => {
                                            handleStateChange(e,15,false)
                                           }}
                                           value={form.fileData[15]}
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
                        <div>
                          <div className="bg-white rounded-md p-4 mb-4">
                            <h1 className="font-bold">
                              4.4 Maintainence of campus Infrastructure
                            </h1>
                            <h2 className="text-xl font-bold mb-4">
                              4.4.1 -total expenditure incurred on maintainence
                              of physical facilities and acedemic support
                              facilities excluding salary component during the
                              year
                            </h2>
                            <input
                              type="text"
                              className="  p-6 "
                              placeholder="150"
                              value={form.textData[11]}
                              onChange={(e) => {
                                handleStateChange(e, 11)
                              }} 
                            />
                            <table className="w-full mt-4">
                              <thead>
                                <tr>
                                  <th className="text-left font-semibold">
                                    File Description
                                  </th>
                                  <th className="text-left font-semibold">
                                    Template
                                  </th>
                                  <th className="text-left font-semibold">
                                    Documents
                                  </th>
                                  <th className="text-left font-semibold">
                                    File Types/Size Supported
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="py-2">
                                    Upload the data template
                                  </td>
                                  <td className="py-2">Data Template</td>
                                  <td className="py-2">
                                    <button className="py-2 px-2 bg-blue-500 text-white font-bold">
                                      <input
                                        type="file"
                                        onChange={(e) => {
                                          handleStateChange(e,16,false)
                                         }}
                                         value={form.fileData[16]}
                                      />
                                    </button>
                                  </td>
                                  <td className="py-2">
                                    xls, xlsx, File Size: 6MB
                                  </td>
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
                                          handleStateChange(e,17,false)
                                         }}
                                         value={form.fileData[17]}
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
                            4.4.2 -There are established system and procedure
                            for maintaining and utilizing physical,acedemics and
                            support facilities-Laboratary,Library,sports
                            complex,classrooms etc.
                          </h2>
                          <input type="text" className=" p-6  h-6"
                            value={form.textData[12]}
                            onChange={(e) => {
                              handleStateChange(e, 12)
                            }} 
                          />
                          <table className="w-full mt-4">
                            <thead>
                              <tr>
                                <th className="text-left font-semibold">
                                  File Description
                                </th>
                                <th className="text-left font-semibold">
                                  Template
                                </th>
                                <th className="text-left font-semibold">
                                  Documents
                                </th>
                                <th className="text-left font-semibold">
                                  File Types/Size Supported
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="py-2">
                                  Upload the data template
                                </td>
                                <td className="py-2">Data Template</td>
                                <td className="py-2">
                                  <button className="bg-blue-500 text-white font-bold rounded">
                                    <input
                                      type="file"
                                      onChange={(e) => {
                                        handleStateChange(e,18,false)
                                       }}
                                       value={form.fileData[18]}
                                    />
                                  </button>
                                </td>
                                <td className="py-2">
                                  xls, xlsx, File Size: 6MB
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CriterionForm;
