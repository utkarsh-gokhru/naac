import React from 'react'
import { useState } from 'react';
import StyledTextArea from "./textArea";
import { saveAs } from 'file-saver';
import axios from "axios";

export const Criteria22 = () => {

    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');
    const [learning_exp, setlearning_exp] = useState("");
    const [no_of_mentors, setno_of_mentors] = useState("");
    const [file2_3_1, setfile2_3_1] = useState(null);
    const [effect_teach_learn, seteffect_teach_learn] = useState("");
    const [file2_3_2, setfile2_3_2] = useState(null);
    const [file2_3_3, setfile2_3_3] = useState(null);
    


    const saveSection2_3_1 = async() => {
        const formdata = new FormData();

        const sectionData = {
            department,
            academicYear,
            file2_3_1,
            learning_exp
        };

        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }
        try{
            const response = await axios.post("http://localhost:5000/data/save2-3-1", formdata);
            console.log(response.data); 
            alert("Saved Section 2.3.1 data:");
        }catch(error){
            console.log("Error",error.message);
        }
    };

    const saveSection2_3_2 = async() => {
        const formdata = new FormData();

        const sectionData = {
            department,
            academicYear,
            file2_3_2,
            effect_teach_learn
            
        };

        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }
        try{
            const response = await axios.post("http://localhost:5000/data/save2-3-2", formdata);
            console.log(response.data); 
            alert("Saved Section 2.3.2 data:");
        }catch(error){
            console.log("Error",error.message);
        }
    };

    const saveSection2_3_3 = async() => {
        const formdata = new FormData();

        const sectionData = {
            department,
            academicYear,
            file2_3_3,
            no_of_mentors
        };

        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }
        try{
            const response = await axios.post("http://localhost:5000/data/save2-3-3", formdata);
            console.log(response.data); 
            alert("Saved Section 2.3.3 data:");
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
    <div className='c-2-3'>

            <h3>2.3- Teaching- Learning Process</h3>

            <h4>2.3.1 - Student centric methods, such as experiential learning, participative learning and problem-solving methodologies are used for enhancing learning experiences</h4>

            <div className="text-area">
                    <StyledTextArea
                        rows={5}
                        placeholder="Type the text here"
                        value={learning_exp}
                        onChange={(e) => setlearning_exp(e.target.value)}
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
                                <td> {file2_3_1 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}
                                  
                                    Upload the data template</td>
                                <td>
                                    <button onClick={() => downloadExcel('2.2.1.xlsx')}>Data Template</button>
                                </td>
                                <td>
                                    <input
                                        type="file"
                                        id="file2_3_1"
                                        name="fileUpload"
                                        accept=".xls, .xlsx"
                                        onChange={(e) => setfile2_3_1(e.target.files[0])}
                                    />
                                </td>
                                <td>xls, xlsx. File size: 6MB</td>
                            </tr>
                            </tbody>
                            </table>
                            <div>
                        <button onClick={saveSection2_3_1}>Save</button>
                    </div>

            <h4>2.3.2 - Teachers use ICT enabled tools incuding online resources for effective teaching and learning processes during the year</h4>

            <div className="text-area">
                    <StyledTextArea
                        rows={5}
                        placeholder="Type the text here"
                        value={effect_teach_learn}
                        onChange={(e) => seteffect_teach_learn(e.target.value)}
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
                                <td> {file2_3_2 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}
                                  
                                    Upload the data template</td>
                                <td>
                                    <button onClick={() => downloadExcel('2.2.1.xlsx')}>Data Template</button>
                                </td>
                                <td>
                                    <input
                                        type="file"
                                        id="file2_3_2"
                                        name="fileUpload"
                                        accept=".xls, .xlsx"
                                        onChange={(e) => setfile2_3_2(e.target.files[0])}
                                    />
                                </td>
                                <td>xls, xlsx. File size: 6MB</td>
                            </tr>
                            </tbody>
                            </table>
                            <div>
                        <button onClick={saveSection2_3_2}>Save</button>
                    </div>

        <h4>2.3.3 - Ratio of students to mentor for academic and other related issues during the year</h4>

        <h4>2.3.3.1 - Number of mentors</h4>
        <input
                        type="number"
                        id="no_of_mentors"
                        value={no_of_mentors}
                        onChange={(e) => setno_of_mentors(e.target.value)}
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
                                <td> {file2_3_3 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}
                                  
                                    Upload the data template</td>
                                <td>
                                    <button onClick={() => downloadExcel('2.2.1.xlsx')}>Data Template</button>
                                </td>
                                <td>
                                    <input
                                        type="file"
                                        id="file2_3_3"
                                        name="fileUpload"
                                        accept=".xls, .xlsx"
                                        onChange={(e) => setfile2_3_3(e.target.files[0])}
                                    />
                                </td>
                                <td>xls, xlsx. File size: 6MB</td>
                            </tr>
                            </tbody>
                            </table>
                            <div>
                        <button onClick={saveSection2_3_3}>Save</button>
                    </div>


    </div>
  )
}

export default Criteria22
    