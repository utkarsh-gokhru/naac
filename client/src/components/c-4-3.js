// import React, { useState, useEffect } from "react";
// import StyledTextArea from "./textArea";
// import { saveAs } from 'file-saver';
// import axios from "axios";

// const Criteria43 = ({ onCrit43Data }) => {

//     const [classrooms_and_seminarHalls, setClassroomsAndSeminarHalls] = useState(0); // Assuming type: Number
//     const [file4_3_1_1, setFile4_3_1_1] = useState("");
//     const [file4_3_1_2, setFile4_3_1_2] = useState("");
//     const [it_policy, setItPolicy] = useState("");
//     const [file4_3_2, setFile4_3_2] = useState("");
//     const [number_of_students, setNumberOfStudents] = useState(0); // Assuming type: Number
//     const [number_of_computers, setNumberOfComputers] = useState(0); // Assuming type: Number
//     const [bandwidth, setBandwidth] = useState("");
//     const [file4_3_4, setFile4_3_4] = useState("");
//     const [e_content_facilities, setEContentFacilities] = useState("");
//     const [file4_3_5_1, setFile4_3_5_1] = useState("");
//     const [file4_3_5_2, setFile4_3_5_2] = useState("");



//     const downloadExcel = async (exc_file) => {
//         const templateFilePath = `${process.env.PUBLIC_URL}/${exc_file}`;

//         try {
//             const response = await fetch(templateFilePath);
//             const blob = await response.blob();

//             saveAs(blob, `${exc_file}_output.xlsx`);
//         } catch (error) {
//             console.error('Error fetching the template file:', error);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);

//     return (
//         <div className="c-4_3">
//             <h3>4.3 - IT Infrastructur</h3>
//             <ul>
//                 <li>
//                     <div className="c-4_3-det">
//                         <h4>4.3.1 - Number of classrooms and seminar halls with ICT - enabled facilities such as LCD, smart board, Wi-Fi/LAN, audio, video
//                             recording facilities during the year
//                         </h4>
//                     </div>
//                     <input
//                         type="number"
//                         id="teaching_facilities"
//                         value={teaching_facilities}
//                         onChange={(e) => setTeachingFacilities(e.target.value)}
//                     />
//                     <div className="table-4_3_1">
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>File Description</th>
//                                     <th>Template</th>
//                                     <th>Documents</th>
//                                     <th>File Types/Size Supported</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 <tr>
//                                     <td> {file4_3_1_1 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}

//                                         Upload the data template</td>
//                                     <td>
//                                         <button onClick={() => downloadExcel('1.1.2.xlsx')}>Data Template</button>
//                                     </td>
//                                     <td>
//                                         <input
//                                             type="file"
//                                             id="file4_3_1_1"
//                                             name="fileUpload"
//                                             accept=".xls, .xlsx"
//                                             onChange={(e) => setFile4_3_1_1(e.target.files[0])}
//                                         />
//                                     </td>
//                                     <td>xls, xlsx. File size: 6MB</td>
//                                 </tr>
//                                 <tr>
//                                     <td> {file4_3_1_2 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}
//                                         Upload relevant supporting documents</td>
//                                     <td></td>
//                                     <td>
//                                         <input
//                                             type="file"
//                                             id="file4_3_1_2"
//                                             name="fileUpload"
//                                             accept=".xls, .xlsx, .doc, .docx, .pdf"
//                                             onChange={(e) => file4_3_1_2(e.target.files[0])}
//                                         />
//                                     </td>
//                                     <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
//                                 </tr>
//                             </tbody>
//                         </table>
//                         <div>
//                             <button onClick={saveSection4_3_1}>Save</button>
//                         </div>
//                     </div>
//                 </li>
//                 <li>
//                     <div className="c-4_3_2">
//                         <h4>4.3.2- Institution has an IT policy, makes appropriate budgetary provisions and updates its IT facilities including Wi-Fi facility</h4>
//                         <div className="text-area">
//                             <StyledTextArea
//                                 rows={5}
//                                 placeholder="Type the text here"
//                                 value={curriculumText}
//                                 onChange={(e) => setItPolicy(e.target.value)}
//                             />
//                         </div>
//                         <div className="table-4_3_2">
//                             <table>
//                                 <thead>
//                                     <tr>
//                                         <th>File Description</th>
//                                         <th>Template</th>
//                                         <th>Documents</th>
//                                         <th>File Types/Size Supported</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     <tr>
//                                         <td>
//                                             {file4_3_2 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}
//                                             Upload relevant supporting documents
//                                         </td>
//                                         <td></td>
//                                         <td>
//                                             <input
//                                                 type="file"
//                                                 id="file4_3_2"
//                                                 name="fileUpload"
//                                                 accept=".xls, .xlsx, .doc, .docx, .pdf"
//                                                 onChange={(e) => setFile4_3_2(e.target.files[0])}
//                                             />
//                                         </td>
//                                         <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
//                                     </tr>
//                                 </tbody>
//                             </table>
//                             <div>
//                                 <button onClick={saveSection4_3_2}>Save</button>
//                             </div>
//                         </div>
//                     </div>
//                 </li>
//                 <li>
//                     <div className="c-4_3_3">
//                         <h4>4.3.3 - Student - Computer ratio during the year                        </h4>
//                         <ul>
//                             <li>
//                                 <table>
//                                     <thead>
//                                         <tr>
//                                             <th>Number of Students</th>
//                                             <th>Number of computers available to students for academic purposes</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         <tr>
//                                             <td><input
//                                                 type="number"
//                                                 id="number_of_students"
//                                                 value={number_of_students}
//                                                 onChange={(e) => setNumberOfStudents(e.target.value)}
//                                             /></td>
//                                             <td>
//                                                 <input
//                                                     type="number"
//                                                     id="number_of_computers"
//                                                     value={number_of_computers}
//                                                     onChange={(e) => setNumberOfComputers(e.target.value)}
//                                                 />
//                                             </td>
//                                         </tr>
//                                     </tbody>
//                                 </table>
//                             </li>
//                         </ul>
//                     </div>
//                     <div>
//                         <button onClick={saveSection4_3_3}>Save</button>
//                     </div>
//                 </li>
//                 <li>
//                 <div className="c-4_3_4">
//             <h4>Available bandwidth of internet connection in the institution (Leased line)</h4>
//             <ol>
//               <li>greater than 1GBPS</li>
//               <li>500 MBPS - 1 GBPS</li>
//               <li>250 MBPS - 500 MBPS</li>
//               <li>50 MBPS - 250 MBPS</li>
//               <li>less than 50 MBPS</li>
//             </ol>
//             <br />
//             <div className="radioBtn-1_4_1">
//               <input type="radio" id="all4_1_4_1" name="group1_4_1" onChange={() => setFeedbackType1_4_1('All 4 of the above')} />
//               <label htmlFor="all4_1_4_1">All 4 of the above</label>

//               <input type="radio" id="any3_1_4_1" name="group1_4_1" onChange={() => setFeedbackType1_4_1('Any 3 of the above')} />
//               <label htmlFor="any3_1_4_1">Any 3 of the above</label>

//               <input type="radio" id="any2_1_4_1" name="group1_4_1" onChange={() => setFeedbackType1_4_1('Any 2 of the above')} />
//               <label htmlFor="any2_1_4_1">Any 2 of the above</label>

//               <input type="radio" id="any1_1_4_1" name="group1_4_1" onChange={() => setFeedbackType1_4_1('Any 1 of the above')} />
//               <label htmlFor="any1_1_4_1">Any 1 of the above</label>

//               <input type="radio" id="none_1_4_1" name="group1_4_1" onChange={() => setFeedbackType1_4_1('None of the above')} />
//               <label htmlFor="none_1_4_1">None of the above</label>
//             </div>

//             <table>
//               <thead>
//                     <tr>
//                         <th>File Description</th>
//                         <th>Template</th>
//                         <th>Documents</th>
//                         <th>File Types/Size Supported</th>
//                     </tr>
//                 </thead>
//               <tbody>
//                 <tr>
//                   <td>Upload relevant supporting documents</td>
//                   <td><button onClick={() => downloadExcel('1.4.1.xlsx')}>Data Template</button></td>
//                   <td><input type="file" id="fileUpload_1_4_1" onChange={(e) => setFile1_4_1(e.target.files[0])} name="fileUpload" accept=".xls, .xlsx" /></td>
//                   <td>xls, xlsx. <b>File size: 6MB</b> </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//                 </li>
//             </ul>
//         </div>
//     );
// };

// export default Criteria43;
