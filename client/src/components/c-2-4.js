// import React, {useState, useEffect} from 'react'
// import StyledTextArea from "./textArea";
// import { saveAs } from 'file-saver';
// import axios from "axios";


// export const Criteria24 = () => {

//     const department = localStorage.getItem('department');
//     const academicYear = localStorage.getItem('academicYear');
//     const [full_time_teachers, setfull_time_teachers] = useState("");
//     const [full_time_teachers_phd_etc, setfull_time_teachers_phd_etc] = useState("");
//     const [award_rec_teachers, setaward_rec_teachers] = useState("");
//     const [learning_exp, setlearning_exp] = useState("");
//     const [file2_1_1_1, setFile2_1_1_1] = useState(null);
//     const [file2_1_1_2, setFile2_1_1_2] = useState(null);
//     const [file2_1_2_1, setFile2_1_2_1] = useState(null);
//     const [file2_1_2_2, setFile2_1_2_2] = useState(null);
    
    

//     const saveSection2_1_1_1 = async() => {
//         const formdata = new FormData();

//         const sectionData = {
//             department,
//             academicYear,
//             file2_1_1_1,
//             file2_1_1_2,
//             full_time_teachers
//         };

//         for (const key in sectionData) {
//             formdata.append(key, sectionData[key]);
//         }
//         try{
//             const response = await axios.post("http://localhost:5000/data/save2-1-1-1", formdata);
//             console.log(response.data); 
//             alert("Saved Section 2.1.1.1 data:");
//         }catch(error){
//             console.log("Error",error.message);
//         }
//     };

//     const downloadExcel = async (exc_file) => {
//         const templateFilePath = ${process.env.PUBLIC_URL}/${exc_file};

//         try {
//             const response = await fetch(templateFilePath);
//             const blob = await response.blob();

//             saveAs(blob, ${exc_file}_output.xlsx);
//         } catch (error) {
//             console.error('Error fetching the template file:', error);
//         }
//     };

//     const saveSection2_1_2_1 = async() => {
//         const formdata = new FormData();

//         const sectionData = {
//             department,
//             academicYear,
//             file2_1_2_1,
//             file2_1_2_2,
//             students_reserved_cat
//         };

//         for (const key in sectionData) {
//             formdata.append(key, sectionData[key]);
//         }
//         try{
//             const response = await axios.post("http://localhost:5000/data/save2-1-1-1", formdata);
//             console.log(response.data); 
//             alert("Saved Section 2.1.2.1 data:");
//         }catch(error){
//             console.log("Error",error.message);
//         }
//     };


   
    



//   return (
//    <div class='c-2-4'>
//     <h3>2.4 - Teacher Profile and Quality</h3>
//     <br></br>

//     <h4>2.4.1 • Total Number of full time teachers against sanctioned posts during the year</h4>
//     <br></br>

//     <input
//                             type="number"
//                             id="full_time_teachers"
//                             value={full_time_teachers}
//                             onChange={(e) => setfull_time_teachers(e.target.value)}
//                         /><br />
//      <table>
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
//                                     <td> {file2_1_1_1 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}
                                      
//                                         Upload the data template</td>
//                                     <td>
//                                         <button onClick={() => downloadExcel('2.1.1.xlsx')}>Data Template</button>
//                                     </td>
//                                     <td>
//                                         <input
//                                             type="file"
//                                             id="file2_1_1_1"
//                                             name="fileUpload"
//                                             accept=".xls, .xlsx"
//                                             onChange={(e) => setFile2_1_1_1(e.target.files[0])}
//                                         />
//                                     </td>
//                                     <td>xls, xlsx. File size: 6MB</td>
//                                 </tr>
//                                 <tr>
//                                     <td> {file2_1_1_2 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}
//                                         Upload relevant supporting documents</td>
//                                     <td></td>
//                                     <td>
//                                         <input
//                                             type="file"
//                                             id="file2_1_1_2"
//                                             name="fileUpload"
//                                             accept=".xls, .xlsx, .doc, .docx, .pdf"
//                                             onChange={(e) => setFile2_1_1_2(e.target.files[0])}
//                                         />
//                                     </td>
//                                     <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
//                                 </tr>
//                             </tbody>
//                         </table>
//                         <div>
//                             <button onClick={saveSection2_1_1_1}>Save</button>
//                         </div> 
//                         <br></br>
//                         <br></br>

//          <h3>2.4.2 • Total Number of full time teachers withPhO.tO.MtM.Ch.'O.N.O Sc.OLit. during the year<br></br>policy during the year (Excluding Supernumerary Seats)</h3>
//          <br></br>
//          <br></br>

         

//          <input
//                             type="number"
//                             id="full_time_teachers_phd_etc"
//                             value={full_time_teachers_phd_etc}
//                             onChange={(e) => setfull_time_teachers_phd_etc(e.target.value)}
//                         /><br />
                                         
//      <table>
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
//                                     <td> {file2_1_2_1 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}
                                      
//                                         Upload the data template</td>
//                                     <td>
//                                         <button onClick={() => downloadExcel('2.1.1.xlsx')}>Data Template</button>
//                                     </td>
//                                     <td>
//                                         <input
//                                             type="file"
//                                             id="file1_1_2_1"
//                                             name="fileUpload"
//                                             accept=".xls, .xlsx"
//                                             onChange={(e) => setFile2_1_2_1(e.target.files[0])}
//                                         />
//                                     </td>
//                                     <td>xls, xlsx. File size: 6MB</td>
//                                 </tr>
//                                 <tr>
//                                     <td> {file2_1_2_2 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}
//                                         Upload relevant supporting documents</td>
//                                     <td></td>
//                                     <td>
//                                         <input
//                                             type="file"
//                                             id="file1_1_2_2"
//                                             name="fileUpload"
//                                             accept=".xls, .xlsx, .doc, .docx, .pdf"
//                                             onChange={(e) => setFile2_1_2_2(e.target.files[0])}
//                                         />
//                                     </td>
//                                     <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
//                                 </tr>
//                             </tbody>
//                         </table>
//                         <div>
//                             <button onClick={saveSection2_1_2_1}>Save</button>
//                         </div> 
//                         <br></br>

   
//         <div>
//         <h3>2.4.3 Total teaching experience of full time teachers in tho same institution during the year</h3>

//         <h3>2.4.3.1 Total experience of full time teachers</h3>

    


//         <input
//                             type="number"
//                             id="full_time_teachers_phd_etc"
//                             value={full_time_teachers_phd_etc}
//                             onChange={(e) => setfull_time_teachers_phd_etc(e.target.value)}
//                         /><br />
                                         
//      <table>
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
//                                     <td> {file2_1_2_1 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}
                                      
//                                         Upload the data template</td>
//                                     <td>
//                                         <button onClick={() => downloadExcel('2.1.1.xlsx')}>Data Template</button>
//                                     </td>
//                                     <td>
//                                         <input
//                                             type="file"
//                                             id="file1_1_2_1"
//                                             name="fileUpload"
//                                             accept=".xls, .xlsx"
//                                             onChange={(e) => setFile2_1_2_1(e.target.files[0])}
//                                         />
//                                     </td>
//                                     <td>xls, xlsx. File size: 6MB</td>
//                                 </tr>
//                                 <tr>
//                                     <td> {file2_1_2_2 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}
//                                         Upload relevant supporting documents</td>
//                                     <td></td>
//                                     <td>
//                                         <input
//                                             type="file"
//                                             id="file1_1_2_2"
//                                             name="fileUpload"
//                                             accept=".xls, .xlsx, .doc, .docx, .pdf"
//                                             onChange={(e) => setFile2_1_2_2(e.target.files[0])}
//                                         />
//                                     </td>
//                                     <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
//                                 </tr>
//                             </tbody>
//                         </table>
//                         <div>
//                             <button onClick={saveSection2_1_2_1}>Save</button>
//                         </div> 
//                         <br></br>

        
       
        
//         </div>
//         <h3>2.4.4 • Total number Of full erne teachers who received awards, recognition, fellowships at State, National, International level from
// GovernmentlG0vt. recognised bodies during the year</h3>

// <input
//                     type="number"
//                     id="award_rec_teachers"
//                     value={award_rec_teachers}
//                     onChange={(e) => setaward_rec_teachers(e.target.value)}
//                 /><br />
                                 
// <table>
//                     <thead>
//                         <tr>
//                             <th>File Description</th>
//                             <th>Template</th>
//                             <th>Documents</th>
//                             <th>File Types/Size Supported</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <tr>
//                             <td> {file2_1_2_1 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}
                              
//                                 Upload the data template</td>
//                             <td>
//                                 <button onClick={() => downloadExcel('2.1.1.xlsx')}>Data Template</button>
//                             </td>
//                             <td>
//                                 <input
//                                     type="file"
//                                     id="file1_1_2_1"
//                                     name="fileUpload"
//                                     accept=".xls, .xlsx"
//                                     onChange={(e) => setFile2_1_2_1(e.target.files[0])}
//                                 />
//                             </td>
//                             <td>xls, xlsx. File size: 6MB</td>
//                         </tr>
//                         <tr>
//                             <td> {file2_1_2_2 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}
//                                 Upload relevant supporting documents</td>
//                             <td></td>
//                             <td>
//                                 <input
//                                     type="file"
//                                     id="file1_1_2_2"
//                                     name="fileUpload"
//                                     accept=".xls, .xlsx, .doc, .docx, .pdf"
//                                     onChange={(e) => setFile2_1_2_2(e.target.files[0])}
//                                 />
//                             </td>
//                             <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
//                         </tr>
//                     </tbody>
//                 </table>
//                 <div>
//                     <button onClick={saveSection2_1_2_1}>Save</button>
//                 </div> 
//                 <br></br>
                
//    </div>
//   )
// }

// export default Criteria24;