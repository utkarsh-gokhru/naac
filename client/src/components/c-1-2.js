import React, { useState, useEffect } from "react";
import { saveAs } from 'file-saver';
import axios from "axios";

const Criteria12 = ({ onCrit12Data }) => {
    const [programCount1_2_2, setProgramCount1_2_2] = useState('');
    const [newCoursesCount1_2_1, setNewCoursesCount1_2_1] = useState('');
    const [file1_2_1_1, setFile1_2_1_1] = useState(null);
    const [file1_2_1_2, setFile1_2_1_2] = useState(null);
    const [file1_2_2_1, setFile1_2_2_1] = useState(null);
    const [file1_2_2_2, setFile1_2_2_2] = useState(null);
    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');

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

    const saveSection1_2_1 = async() => {
        const formdata = new FormData();

        const sectionData = {
            department,
            academicYear,
            newCoursesCount1_2_1,
            file1_2_1_1,
            file1_2_1_2
        };

        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }
        try{
            const response = await axios.post("https://naacserver.onrender.com/data/save1-2-1", formdata);
            console.log(response.data); 
            alert("Saved Section 1.2.1 data:");
        }catch(error){
            console.log("Error",error.message);
        }
    };

    const saveSection1_2_2 = async() => {
        const formdata = new FormData();

        const sectionData = {
            department,
            academicYear,
            programCount1_2_2,
            file1_2_2_1,
            file1_2_2_2
        };

        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }
        try{
            const response = await axios.post("https://naacserver.onrender.com/data/save1-2-2", formdata);
            console.log(response.data); 
            alert("Saved Section 1.2.2 data:");
        }catch(error){
            console.log("Error",error.message);
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://naacserver.onrender.com/data/fetchC1?department=${department}&academicYear=${academicYear}`);
            const data = response.data.data.criteria12;
    
            if (data) {
                data.programCount1_2_2 ? setProgramCount1_2_2(data.programCount1_2_2) : setProgramCount1_2_2('');
                data.newCoursesCount1_2_1 ? setNewCoursesCount1_2_1(data.newCoursesCount1_2_1) : setNewCoursesCount1_2_1('');
                data.file1_2_1_1 ? setFile1_2_1_1('true') : setFile1_2_1_1('false');
                data.file1_2_1_2 ? setFile1_2_1_2('true') : setFile1_2_1_2('false');
                data.file1_2_2_1 ? setFile1_2_1_1('true') : setFile1_2_1_1('false');
                data.file1_2_2_2 ? setFile1_2_2_2('true') : setFile1_2_2_2('false');
            }
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        fetchData();
    },[]);

    useEffect(() => {
        const crit12 = {
            programCount1_2_2,
            newCoursesCount1_2_1,
            file1_2_1_1,
            file1_2_1_2,
            file1_2_2_1,
            file1_2_2_2
        };
        onCrit12Data(crit12);
    }, [programCount1_2_2, newCoursesCount1_2_1, file1_2_1_1, file1_2_1_2, file1_2_2_1, file1_2_2_2]);    

    return (
        <div className="c-1_2">
            <h3>1.2 - Academic Flexibility</h3>
            <ul>
                <li>
                    <div className="c-1_2_1">
                        <h4>1.2.1 - Number of new courses introduced of the total number of courses across all programs offered during the year</h4>
                        <input
                            type="number"
                            id="newCoursesCount1_2_1"
                            value={newCoursesCount1_2_1}
                            onChange={(e) => setNewCoursesCount1_2_1(e.target.value)}
                        />
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
                                    <td> {file1_2_1_1 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)} 
                                        Upload the data template</td>
                                    <td><button onClick={() => downloadExcel('1.2.1.xlsx')}>Data Template</button></td>
                                    <td>
                                        <input
                                            type="file"
                                            id="fileUpload1_2_1_1"
                                            onChange={(e) => setFile1_2_1_1(e.target.files[0])}
                                            name="fileUpload"
                                            accept=".xls, .xlsx"
                                        />
                                    </td>
                                    <td>xls, xlsx. File size: 6MB</td>
                                </tr>
                                <tr>
                                    <td>{file1_2_1_2 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)} 
                                        Upload relevant supporting documents</td>
                                    <td></td>
                                    <td><input type="file" id="fileUpload1_2_1_2" onChange={(e) => setFile1_2_1_2(e.target.files[0])} name="fileUpload1" accept=".xls, .xlsx, .doc, .docx, .pdf" /></td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <button onClick={saveSection1_2_1}>Save</button>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="c-1_2_2">
                        <h4>1.2.2 - Number of Programmes in which Choice Based Credit System (CBCS)/elective course system has been implemented during the year</h4>
                        <input
                            type="number"
                            id="programCount1_2_2"
                            value={programCount1_2_2}
                            onChange={(e) => setProgramCount1_2_2(e.target.value)}
                        />
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
                                    <td> {file1_2_2_1 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)} 
                                        Upload the data template</td>
                                    <td><button onClick={() => downloadExcel('1.2.2.xlsx')}>Data Template</button></td>
                                    <td><input type="file" id="fileUpload1_2_2" onChange={(e) => setFile1_2_2_1(e.target.files[0])} name="fileUpload" accept=".xls, .xlsx" /></td>
                                    <td>xls, xlsx. File size: 6MB</td>
                                </tr>
                                <tr>
                                    <td> {file1_2_2_2 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)} 
                                        Upload relevant supporting documents</td>
                                    <td></td>
                                    <td><input type="file" id="fileUpload1_2_2_2" onChange={(e) => setFile1_2_2_2(e.target.files[0])} name="fileUpload2" accept=".xls, .xlsx, .doc, .docx, .pdf" /></td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <button onClick={saveSection1_2_2}>Save</button>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Criteria12;
