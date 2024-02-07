import React, {useState, useEffect} from 'react'
import StyledTextArea from "./textArea";
import { saveAs } from 'file-saver';
import axios from "axios";

export const Criteria21 = () => {

    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');
    const [syllabusRevisionCount, setSyllabusRevisionCount] = useState("");
    const [file2_1_1_1, setFile2_1_1_1] = useState(null);
    const [file2_1_1_2, setFile2_1_1_2] = useState(null);

    const saveSection2_1_1_1 = async() => {
        const formdata = new FormData();

        const sectionData = {
            department,
            academicYear,
            file2_1_1_1,
        };

        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }
        try{
            const response = await axios.post("http://localhost:5000/data/save2-1-1-1", formdata);
            console.log(response.data); 
            alert("Saved Section 2.1.1.1 data:");
        }catch(error){
            console.log("Error",error.message);
        }
    };

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
   <div class='c-2-1'>
    <h3>2.1 - Student Enrollment and Profile</h3>
    <br></br>

    <h4>2.1.1 - Demand Ratio</h4>
    <br></br>

    <h4>2.1.1.1 - Number of seats available during the year</h4>
    <input
                            type="number"
                            id="syllabusRevisionCount"
                            value={syllabusRevisionCount}
                            onChange={(e) => setSyllabusRevisionCount(e.target.value)}
                        /><br />
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
                                    <td> {file2_1_1_1 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}
                                      
                                        Upload the data template</td>
                                    <td>
                                        <button onClick={() => downloadExcel('2.1.1.xlsx')}>Data Template</button>
                                    </td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file1_1_2_1"
                                            name="fileUpload"
                                            accept=".xls, .xlsx"
                                            onChange={(e) => setFile2_1_1_1(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx. File size: 6MB</td>
                                </tr>
                                <tr>
                                    <td> {file2_1_1_2 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}
                                        Upload relevant supporting documents</td>
                                    <td></td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file1_1_2_2"
                                            name="fileUpload"
                                            accept=".xls, .xlsx, .doc, .docx, .pdf"
                                            onChange={(e) => setFile2_1_1_2(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <button onClick={saveSection2_1_1_1}>Save</button>
                        </div> 
                        <br></br>

         <h3>2.1.2 - Total number of seats filled against reserved categories (SC, ST, OBC, Divyangjan, etc.) as per applicable reservation<br></br>policy during the year (Excluding Supernumerary Seats)</h3>
         <br></br>

         <h3>2.1.2.1 - Number of actual students admitted from the reserved categories during the year</h3>
         <br></br>

         <input
                            type="number"
                            id="syllabusRevisionCount"
                            value={syllabusRevisionCount}
                            onChange={(e) => setSyllabusRevisionCount(e.target.value)}
                        /><br />

        
    
   </div>
  )
}

export default Criteria21;
