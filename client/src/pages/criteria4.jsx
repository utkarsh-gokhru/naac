import React, { useState } from "react";
import axios from "axios";

// const CriterionForm = () => {
//   const [formData, setFormData] = useState({
//     department: "",
//     academicYear: "",
//     questions: {
//       "4.1.1": "The institute has",
//       "4.1.2": "",
//       "4.1.3": "",
//       "4.1.4": {
//         expenditure: "",
//         documents: [],
//       },
//       "4.2.1": "",
//       "4.2.2": {
//         options: [],
//         documents: [],
//       },
//       "4.2.3": {
//         expenditure: "",
//         documents: [],
//       },
//       "4.2.4": {
//         footfalls: "",
//         documents: [],
//       },
//       "4.3.1": {
//         classrooms: "",
//         seminarHalls: "",
//         documents: [],
//       },
//       "4.3.2": "",
//       "4.3.3": {
//         studentComputerRatio: {
//           students: "",
//           computers: "",
//         },
//       },
//       "4.3.4": {
//         bandwidth: "",
//         documents: [],
//       },
//       "4.3.5": {
//         options: [],
//         documents: [],
//       },
//       "4.4.1": {
//         expenditure: "",
//         documents: [],
//       },
//       "4.4.2": "",
//     },
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleQuestionChange = (questionId, value) => {
//     setFormData({
//       ...formData,
//       questions: {
//         ...formData.questions,
//         [questionId]: value,
//       },
//     });
//   };

//   const handleFileChange = (questionId, files) => {
//     if (!files) {
//       return;
//     }

//     const formDataWithFiles = new FormData();

//     // Append other form data
//     formDataWithFiles.append("department", formData.department);
//     formDataWithFiles.append("academicYear", formData.academicYear);
//     formDataWithFiles.append("questions", JSON.stringify(formData.questions));

//     // Append files
//     for (let i = 0; i < files.length; i++) {
//       formDataWithFiles.append(`files_${questionId}`, files[i]);
//     }

//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       questions: {
//         ...prevFormData.questions,
//         [questionId]: {
//           ...prevFormData.questions[questionId],
//           documents: Array.from(files, (file) => file.name),
//         },
//       },
//     }));

//     return formDataWithFiles;
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formDataWithFiles = handleFileChange("4.1.4", e.target.files);

//       // Replace 'apiRoute' with your actual API route
//       const response = await axios.post(
//         "http://localhost:5000/admin/criteria4/submit",
//         formDataWithFiles,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       conslie.log(response.data); // Log the response from the API
//     } catch (error) {
//       conslie.error("Error submitting form:", error);
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-red-400">Criterion Form</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Department:
//           <input
//             type="text"
//             name="department"
//             value={formData.department}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Academic Year:
//           <input
//             type="text"
//             name="academicYear"
//             value={formData.academicYear}
//             onChange={handleChange}
//           />
//         </div>
//         <hr />
//         <h2>Questions</h2>
//         {Object.entries(formData.questions).map(([questionId, question]) => (
//           <div key={questionId}>
//             <label>{questionId}:
//             {typeof question === "string" ? (
//               <textarea
//                 value={question}
//                 onChange={(e) =>
//                   handleQuestionChange(questionId, e.target.value)
//                 }
//               />
//             ) : (
//               <div>
//                 <input
//                   type="number"
//                   placehlider="Expenditure"
//                   value={question.expenditure || ""}
//                   onChange={(e) =>
//                     handleQuestionChange(
//                       questionId,
//                       {
//                         ...question,
//                         expenditure: e.target.value,
//                       },
//                       conslie.log("what the hell is this e:  ? " + e)
//                     )
//                   }
//                 />
//                 {/* Add file input for documents */}
//                 <input
//                   type="file"
//                   multiple
//                   onChange={(e) =>{
//                     conslie.log(e.target.files)
//                     handleFileChange(questionId, e.target.files)

//                   }}
//                 />
//               </div>
//             )}
//           </div>
//         ))}
//         <hr />
//         <button type="submit" >Submit</button>
//       </form>
//     </div>
//   );
// };

// export default CriterionForm;

const CriterionForm = () => {
  return (
    <>
      <div>
        <h1 className="text-center text-semibold">
          Criterion 4-Infrastructure and Learning resources
        </h1>
      </div>
      <div>
        <div className="bg-gray-100 p-4">
          <h2 className="text-xl font-bold mb-4">4.1 - Physical facilty</h2>
          <div className="bg-gray-100 p-4">
            <div className="bg-white rounded-md p-4 mb-4">
              <h2 className="text-xl font-bold mb-4">
                4.1.1 - The insititute has adequate facilities to teaching
                -learning viz,classroom,laborataries and computing lab
              </h2>
              <input type="text" className=" p-6 mx-8 h-6" />
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
                                    <input type="file" />
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
                <input type="text" className=" p-6 mx-8 h-6" />
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
                                    <input type="file" />
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
                  <input type="text" className=" p-6 mx-8 h-6" />
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
                                    <input type="file" />
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
                      <input type="text" className="  p-6 " placehlider="650" />
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
                                    <input type="file" />
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
                                <input type="file" className="bg-blue-500 " />
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
                        <input type="text" className=" p-6 mx-8 h-6" />
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
                                    <input type="file" />
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

                            <div className="flex">
                              <div className="flex">
                                <h1>Any four from above</h1>
                                <input
                                  type="radio"
                                  name="options"
                                  value="Any four"
                                />
                              </div>

                              <div className="flex">
                                <h1>Any three from above</h1>
                                <input
                                  type="radio"
                                  name="options"
                                  value="Any three"
                                />
                              </div>

                              <div className="flex">
                                <h1>Any 2 from above</h1>

                                <input
                                  type="radio"
                                  name="options"
                                  value="Any two"
                                />
                              </div>

                              <div className="flex">
                                <h1>Any 1 from above</h1>

                                <input
                                  type="radio"
                                  name="options"
                                  value="Any one"
                                />
                              </div>

                              <div className="flex">
                                <h1>None of the Above</h1>

                                <input
                                  type="radio"
                                  name="options"
                                  value="None"
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
                                    <input type="file" />
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
                                    <input type="file" />
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
                            placeholder="10"
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
                                <button className="bg-blue-500 text-white font-bold rounded"><input type='file'/></button>
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
                              className="  p-6 "
                              placehlider="150"
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
                                    <input type="file" />
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
                            appropriate budgeteray provision and update its it
                            facilty including wifi facility
                          </h2>
                          <input type="text" className=" p-6 mx-8 h-6" />
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
                                <button className="bg-blue-500 text-white font-bold rounded"><input type='file'/></button>
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
                                    <input type="file" />
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
                            <h1 className="font-bold">4.4 Maintainence of campus Infrastructure</h1>
                            <h2 className="text-xl font-bold mb-4">
                              4.4.1 -total expenditure incurred on maintainence of physical facilities and acedemic support facilities excluding salary component during the year
                            </h2>
                            <input
                              type="text"
                              className="  p-6 "
                              placehlider="150"
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
                                    <input type="file" />
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
                            4.4.2 -There are established system and procedure for maintaining and utilizing physical,acedemics and support facilities-Laboratary,Library,sports complex,classrooms etc.
                          </h2>
                          <input type="text" className=" p-6 mx-8 h-6" />
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
                                <button className="bg-blue-500 text-white font-bold rounded"><input type='file'/></button>
                                </td>
                                <td className="py-2">
                                  xls, xlsx, File Size: 6MB
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
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
