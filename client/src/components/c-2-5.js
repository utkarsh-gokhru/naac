import React from 'react'
import { useState } from 'react';
import StyledTextArea from "./textArea";
import { saveAs } from 'file-saver';
import axios from "axios";

const Criteria25 = () => {

    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');
    const [no_of_days, setno_of_days] = useState("");
    const [no_of_days_yearwise, setno_of_days_yearwise] = useState("");
    const [ it_integration, setit_integration] = useState("");
    const [no_of_student_grievances, setno_of_student_grievances] = useState("");
    const [file2_5_1_1, setfile2_5_1_1] = useState(null);
    const [file2_5_1_2, setfile2_5_1_2] = useState(null);
    const [file2_5_4_1, setfile2_5_4_1] = useState(null);
    const [file2_5_4_2, setfile2_5_4_2] = useState(null);
    const [file2_5_2, setfile2_5_2] = useState(null);
    const [file2_5_3, setfile2_5_3] = useState(null);
    const [status_of_automation, setstatus_of_automation] = useState('');
   
 

  
    const saveSection2_5_1 = async() => {
        const formdata = new FormData();

        const sectionData = {
            department,
            academicYear,
            file2_5_1_1,
            file2_5_1_2,
            no_of_days_yearwise,
            no_of_days
            
        };

        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }
        try{
            const response = await axios.post("http://localhost:5000/data/save2-5-1", formdata);
            console.log(response.data); 
            alert("Saved Section 2.5.1.1 data:");
        }catch(error){
            console.log("Error",error.message);
        }
    };

    const saveSection2_5_2 = async() => {
        const formdata = new FormData();

        const sectionData = {
            department,
            academicYear,
            file2_5_2,
            no_of_student_grievances
            
        };

        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }
        try{
            const response = await axios.post("http://localhost:5000/data/save2-5-2", formdata);
            console.log(response.data); 
            alert("Saved Section 2.5.2 data:")
        }catch(error){
            console.log("Error",error.message);
        }
    };

    const saveSection2_5_3 = async() => {
        const formdata = new FormData();

        const sectionData = {
            department,
            academicYear,
            file2_5_3,
            it_integration

            
        };

        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }
        try{
            const response = await axios.post("http://localhost:5000/data/save2-5-3", formdata);
            console.log(response.data); 
            alert("Saved Section 2.5.2 data:")
        }catch(error){
            console.log("Error",error.message);
        }
    };

    const saveSection2_5_4 = async() => {
        const formdata = new FormData();

        const sectionData = {
            department,
            academicYear,
            file2_5_4_1,
            file2_5_4_2,
            status_of_automation
            
        };

        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }
        try{
            const response = await axios.post("http://localhost:5000/data/save2-5-4", formdata);
            console.log(response.data); 
            alert("Saved Section 2.5.4.1 data:");
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
    <div className='c-2-5'>
        <br></br>
        <h3> 2.5 - Evaluation Process and Reforms</h3>

        <h4>2.5.1 - Number of days from the date of last semester-end/ year-end examination till the declaration of results during the year</h4>
        <input
                        type="number"
                        id="no_of_days"
                        value={no_of_days}
                        onChange={(e) => setno_of_days(e.target.value)}
                    /><br />

      <h4>2.5.1.1 - Number of days from the date of last semester-end/ year-end examination till the declaration of results year wise during the year</h4>

      <input
                        type="number"
                        id="no_of_days_yearwise"
                        value={no_of_days_yearwise}
                        onChange={(e) => setno_of_days_yearwise(e.target.value)}
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
                                    <td> {file2_5_1_1 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}
                                      
                                        Upload the data template</td>
                                    <td>
                                        <button onClick={() => downloadExcel('2.5.1.1.xlsx')}>Data Template</button>
                                    </td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file2_5_1_1"
                                            name="fileUpload"
                                            accept=".xls, .xlsx"
                                            onChange={(e) => setfile2_5_1_1(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx. File size: 6MB</td>
                                </tr>
                                <tr>
                                    <td> {file2_5_1_2 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}
                                        Upload relevant supporting documents</td>
                                    <td></td>
                                    <td>
                                        <input
                                            type="file"
                                            id="filefile2_5_1_2"
                                            name="fileUpload"
                                            accept=".xls, .xlsx, .doc, .docx, .pdf"
                                            onChange={(e) => setfile2_5_1_2(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <button onClick={saveSection2_5_1}>Save</button>
                        </div> 

            <h4>2.5.2 - Total number of student complaints/grievances about evaluation against total number appeared in the examinations during the year</h4>
            <input
                        type="number"
                        id=" no_of_student_grievances"
                        value={no_of_student_grievances}
                        onChange={(e) => setno_of_student_grievances(e.target.value)}
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
                                <td> {file2_5_2 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}
                                  
                                    Upload the data template</td>
                                <td>
                                    <button onClick={() => downloadExcel('2.2.1.xlsx')}>Data Template</button>
                                </td>
                                <td>
                                    <input
                                        type="file"
                                        id="file2_5_2"
                                        name="fileUpload"
                                        accept=".xls, .xlsx"
                                        onChange={(e) => setfile2_5_2(e.target.files[0])}
                                    />
                                </td>
                                <td>xls, xlsx. File size: 6MB</td>
                            </tr>
                            </tbody>
                            </table>
                            <div>
                        <button onClick={saveSection2_5_2}>Save</button>
                    </div>

        <h4>2.5.3 - IT integration and reforms in the examination procedures and processes (continuous internal assessment and end- semester assessment) have brought in considerable improvement in examination management system of the institution</h4>

        <div className="text-area">
                    <StyledTextArea
                        rows={5}
                        placeholder="Type the text here"
                        value={it_integration}
                        onChange={(e) => setit_integration(e.target.value)}
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
                                <td> {file2_5_3 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}
                                  
                                    Upload the data template</td>
                                <td>
                                    <button onClick={() => downloadExcel('2.2.1.xlsx')}>Data Template</button>
                                </td>
                                <td>
                                    <input
                                        type="file"
                                        id="file2_5_3"
                                        name="fileUpload"
                                        accept=".xls, .xlsx"
                                        onChange={(e) => setfile2_5_3(e.target.files[0])}
                                    />
                                </td>
                                <td>xls, xlsx. File size: 6MB</td>
                            </tr>
                            </tbody>
                            </table>
                            <div>
                        <button onClick={saveSection2_5_3}>Save</button>
                    </div>

        <h4>2.5.4- Status of automation of Examination division along with approved Examination Manual</h4>
        <div class="radio-buttons">
    <label>
        <input type="radio" id="automation-entire-division" name="division-option" value="A" onChange={() => setstatus_of_automation('100% automation of entire division & implementation of Examination Management System (EMS)')} />
        <span>A.</span> 100% automation of entire division & implementation of Examination Management System (EMS)
    </label>

    <label>
        <input type="radio" id="student-registration-hall-ticket-result" name="division-option" value="B" onChange={() => setstatus_of_automation('Only student registration, Hall ticket issue & Result Processing')} />
        <span>B.</span> Only student registration, Hall ticket issue & Result Processing
    </label>

    <label>
        <input type="radio" id="student-registration-result" name="division-option" value="C" onChange={() => setstatus_of_automation('Only student registration and result processing')} />
        <span>C.</span> Only student registration and result processing
    </label>

    <label>
        <input type="radio" id="result-processing" name="division-option" value="D" onChange={() => setstatus_of_automation('Only result processing')} />
        <span>D.</span> Only result processing
    </label>

    <label>
        <input type="radio" id="manual-methodology" name="division-option" value="E" onChange={() => setstatus_of_automation('Only manual methodology')} />
        <span>E.</span> Only manual methodology
    </label>
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
                                    <td> {file2_5_4_1 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}
                                      
                                        Upload the data template</td>
                                    <td>
                                        <button onClick={() => downloadExcel('2.5.4.1.xlsx')}>Data Template</button>
                                    </td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file2_5_4_1"
                                            name="fileUpload"
                                            accept=".xls, .xlsx"
                                            onChange={(e) => setfile2_5_4_1(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx. File size: 6MB</td>
                                </tr>
                                <tr>
                                    <td> {file2_5_4_2 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}
                                        Upload relevant supporting documents</td>
                                    <td></td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file2_5_4_2"
                                            name="fileUpload"
                                            accept=".xls, .xlsx, .doc, .docx, .pdf"
                                            onChange={(e) => setfile2_5_4_2(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <button onClick={saveSection2_5_4}>Save</button>
                        </div> 


    </div>
  )
}

export default Criteria25