import React, { useState, useEffect } from "react";
import StyledTextArea from "./textArea";
import { saveAs } from 'file-saver';
import axios from "axios";
import '../css/criteria5.css';

const Criteria51 = ({onCrit31Data}) => {

    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');
    const [no_of_students, setno_of_students] = useState("");
    const [no_of_students_benefited, setno_of_students_benefited] = useState("");
    const [file5_1_1_1, setFile5_1_1_1] = useState(null);
    const [file5_1_1_2, setFile5_1_1_2] = useState(null);
    const [file5_1_2_1, setFile5_1_2_1] = useState(null);
    const [file5_1_2_2, setFile5_1_2_2] = useState(null);
    const [file5_1_3_1, setFile5_1_3_1] = useState(null);
    const [file5_1_3_2, setFile5_1_3_2] = useState(null);

    const saveSection5_1_1_1 = async() => {
        const formdata = new FormData();

        const sectionData = {
            department,
            academicYear,
            file5_1_1_1,
            file5_1_1_2,
            no_of_students
        };

        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }
        try{
            const response = await axios.post("http://localhost:5000/data/save5-1-1-1", formdata);
            console.log(response.data); 
            alert("Saved Section 5.1.1.1 data:");
        }catch(error){
            console.log("Error",error.message);
        }
    };

    const saveSection5_1_3_1 = async() => {
        const formdata = new FormData();

        const sectionData = {
            department,
            academicYear,
            file5_1_3_1,
            file5_1_3_2
        };

        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }
        try{
            const response = await axios.post("http://localhost:5000/data/save5-1-3-1", formdata);
            console.log(response.data); 
            alert("Saved Section 5.1.3.1 data:");
        }catch(error){
            console.log("Error",error.message);
        }
    };


    const saveSection5_1_2_1 = async() => {
        const formdata = new FormData();

        const sectionData = {
            department,
            academicYear,
            file5_1_2_1,
            file5_1_2_2,
            no_of_students_benefited
        };

        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }
        try{
            const response = await axios.post("http://localhost:5000/data/save5-1-2-1", formdata);
            console.log(response.data); 
            alert("Saved Section 5.1.2.1 data:");
        }catch(error){
            console.log("Error",error.message);
        }
    }


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



    return(
        <div className="c-5-1">
             <h3>5.1 - Student Support</h3>

            <h4> 5.1.1 - Total number of students benefited by scholarships and free ships provided by the institution, Government and non-government agencies (NGOs) during the year (other than the students receiving scholarships under the government schemes for reserved categories)</h4>
            <input
                            type="number"
                            id="no_of_students"
                            value={no_of_students}
                            onChange={(e) => setno_of_students(e.target.value)}
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
                                    <td> {file5_1_1_1 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}
                                      
                                        Upload the data template</td>
                                    <td>
                                        <button onClick={() => downloadExcel('5.1.1.xlsx')}>Data Template</button>
                                    </td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file5_1_1_1"
                                            name="fileUpload"
                                            accept=".xls, .xlsx"
                                            onChange={(e) => setFile5_1_1_1(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx. File size: 6MB</td>
                                </tr>
                                <tr>
                                    <td> {file5_1_1_2 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}
                                        Upload relevant supporting documents</td>
                                    <td></td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file5_1_1_2"
                                            name="fileUpload"
                                            accept=".xls, .xlsx, .doc, .docx, .pdf"
                                            onChange={(e) => setFile5_1_1_2(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <button onClick={saveSection5_1_1_1}>Save</button>
                        </div>

                <h4>5.1.2 - Total number of students benefited by career counselling and guidance for competitive examinations offered by the Institution during the year</h4>
                <input
                            type="number"
                            id="no_of_students_benefited"
                            value={no_of_students_benefited}
                            onChange={(e) => setno_of_students_benefited(e.target.value)}
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
                                    <td> {file5_1_2_1 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}
                                      
                                        Upload the data template</td>
                                    <td>
                                        <button onClick={() => downloadExcel('5.1.2.xlsx')}>Data Template</button>
                                    </td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file5_1_2_1"
                                            name="fileUpload"
                                            accept=".xls, .xlsx"
                                            onChange={(e) => setFile5_1_2_1(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx. File size: 6MB</td>
                                </tr>
                                <tr>
                                    <td> {file5_1_2_2 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}
                                        Upload relevant supporting documents</td>
                                    <td></td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file5_1_2_2"
                                            name="fileUpload"
                                            accept=".xls, .xlsx, .doc, .docx, .pdf"
                                            onChange={(e) => setFile5_1_2_2(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <button onClick={saveSection5_1_2_1}>Save</button>
                        </div>

            <h4>5.1.3 - Following Capacity development and skills enhancement initiatives are taken by the institution <br></br> 1. Soft Skills <br></br> 2. Language and Communication Skills <br></br> Life Skills(Yoga, Physical fitness, health and hygiene)<br></br> 4. Awareness of trends in Technology</h4>

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
                                    <td> {file5_1_3_1 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}
                                      
                                        Upload the data template</td>
                                    <td>
                                        <button onClick={() => downloadExcel('5.1.3.xlsx')}>Data Template</button>
                                    </td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file5_1_3_1"
                                            name="fileUpload"
                                            accept=".xls, .xlsx"
                                            onChange={(e) => setFile5_1_3_1(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx. File size: 6MB</td>
                                </tr>
                                <tr>
                                    <td> {file5_1_3_2 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}
                                        Upload relevant supporting documents</td>
                                    <td></td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file5_1_3_2"
                                            name="fileUpload"
                                            accept=".xls, .xlsx, .doc, .docx, .pdf"
                                            onChange={(e) => setFile5_1_3_2(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <button onClick={saveSection5_1_3_1}>Save</button>
                        </div>

        </div>
        
    )
}



export default Criteria31;