import React from 'react'
import { useState } from 'react';
import StyledTextArea from "./textArea";
import { saveAs } from 'file-saver';
import axios from "axios";

export const Criteria22 = () => {


    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');

    const [learning_assessment, setlearning_assessment] = useState("");
    const [no_of_students, setno_of_students] = useState("");
    const [no_of_teachers, setno_of_teachers] = useState("");
    const [file2_2_1_1, setfile2_2_1_1] = useState(null);
    const [link2_2_1_2, setlink2_2_1_2] = useState(null);
    const [file2_2_1, setfile2_2_1] = useState(null);


    const saveSection2_2_1 = async() => {
        const formdata = new FormData();

        const sectionData = {
            department,
            academicYear,
            file2_2_1_1,
            link2_2_1_2,
            learning_assessment
        };

        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }
        try{
            const response = await axios.post("http://localhost:5000/data/save2-2-1", formdata);
            console.log(response.data); 
            alert("Saved Section 2.2.1 data:");
        }catch(error){
            console.log("Error",error.message);
        }
    };

    const saveSection2_2_2 = async() => {
        const formdata = new FormData();

        const sectionData = {
            department,
            academicYear,
            no_of_students,
            no_of_teachers,
            file2_2_1
        };

        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }
        try{
            const response = await axios.post("http://localhost:5000/data/save2-2-2", formdata);
            console.log(response.data); 
            alert("Saved Section 2.2.2 data:");
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
    <div>
    <div>
    <h3>2.2 Catering to Student Diversity</h3>
</div>

<h4>2.2.1- The institution assesses the learning levels of the studentsand oragnises special programmes for advanced learners and slow learners  </h4>

<div className="text-area">
                    <StyledTextArea
                        rows={5}
                        placeholder="Type the text here"
                        value={learning_assessment}
                        onChange={(e) => setlearning_assessment(e.target.value)}
                    />
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
                                <td> {file2_2_1_1 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}
                                  
                                    Upload the data template</td>
                                <td>
                                    <button onClick={() => downloadExcel('2.2.1.xlsx')}>Data Template</button>
                                </td>
                                <td>
                                    <input
                                        type="file"
                                        id="file2_2_1_1"
                                        name="fileUpload"
                                        accept=".xls, .xlsx"
                                        onChange={(e) => setfile2_2_1_1(e.target.files[0])}
                                    />
                                </td>
                                <td>xls, xlsx. File size: 6MB</td>
                            </tr>
                            <tr>
                                <td> {link2_2_1_2 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}
                                    Link for Additional Information</td>
                                <td></td>
                                <td>
                                <input
                        type="string"
                        id="link2_2_1_2"
                        value={link2_2_1_2}
                        onChange={(e) => setlink2_2_1_2(e.target.value)}
                    /><br />
                                </td>
                                <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <button onClick={saveSection2_2_1}>Save</button>
                    </div> 
    <br></br>

    <h4>2.2.2 - Student - Full time teacher ratio during the year</h4>
    <table>
        <thead>
            <tr>
            <th>Number of Students</th>
            <th>Number of Teachers</th>
            </tr>
        </thead>
        <tbody>
        <td>
                                <input
                        type="number"
                        id="no_of_students"
                        value={no_of_students}
                        onChange={(e) => setno_of_students(e.target.value)}
                    /><br />
                                </td>

                                <td>
                                <input
                        type="number"
                        id="no_of_teachers"
                        value={no_of_teachers}
                        onChange={(e) => setno_of_teachers(e.target.value)}
                    /><br />
                                </td>
        </tbody>
    </table>

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
                                <td> {file2_2_1 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}
                                  
                                    Upload the data template</td>
                                <td>
                                    <button onClick={() => downloadExcel('2.2.1.xlsx')}>Data Template</button>
                                </td>
                                <td>
                                    <input
                                        type="file"
                                        id="file2_2_1"
                                        name="fileUpload"
                                        accept=".xls, .xlsx"
                                        onChange={(e) => setfile2_2_1(e.target.files[0])}
                                    />
                                </td>
                                <td>xls, xlsx. File size: 6MB</td>
                            </tr>
                            </tbody>
                            </table>
                            <div>
                        <button onClick={saveSection2_2_1}>Save</button>
                    </div>
    </div>

  )
}

export default Criteria22