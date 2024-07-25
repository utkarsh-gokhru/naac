import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import axios from "axios";
import StyledTextArea from "./textArea";

const Criteria13 = ({ onCrit13Data }) => {
    const [valueAddedCoursesCount1_3_2, setValueAddedCoursesCount1_3_2] = useState(null);
    const [enrolledStudentsCount1_3_3_1, setEnrolledStudentsCount1_3_3_1] = useState(null);
    const [projectsCount1_3_4, setProjectsCount1_3_4] = useState(null);
    const [file1_3_2_1, setFile1_3_2_1] = useState('');
    const [file1_3_2_2, setFile1_3_2_2] = useState('');
    const [file1_3_3_1_1, setFile1_3_3_1_1] = useState('');
    const [file1_3_3_1_2, setFile1_3_3_1_2] = useState('');
    const [file1_3_4_1, setFile1_3_4_1] = useState('');
    const [file1_3_4_2, setFile1_3_4_2] = useState('');
    const [text_1_3_1, setText_1_3_1] = useState('');
    const [file1_3_1, setFile1_3_1] = useState('');
    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://naacserver.onrender.com/data/fetchC1?department=${department}&academicYear=${academicYear}`);
            const data = response.data.data.criteria13;
    
            if (data) {
                data.valueAddedCoursesCount1_3_2 ? setValueAddedCoursesCount1_3_2(data.valueAddedCoursesCount1_3_2) : setValueAddedCoursesCount1_3_2('');
                data.enrolledStudentsCount1_3_3_1 ? setEnrolledStudentsCount1_3_3_1(data.enrolledStudentsCount1_3_3_1) : setEnrolledStudentsCount1_3_3_1('');
                data.text_1_3_1 ? setText_1_3_1(data.text_1_3_1) : setText_1_3_1('');
                data.projectsCount1_3_4 ? setProjectsCount1_3_4(data.projectsCount1_3_4) : setProjectsCount1_3_4('');
            }
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        fetchData();
    },[]);

    useEffect(() => {
        const crit13 = {
            text_1_3_1,
            file1_3_1,
            valueAddedCoursesCount1_3_2,
            enrolledStudentsCount1_3_3_1,
            projectsCount1_3_4,
            file1_3_2_1,
            file1_3_2_2,
            file1_3_3_1_1,
            file1_3_3_1_2,
            file1_3_4_1,
            file1_3_4_2,
        };
        onCrit13Data(crit13);
    }, [valueAddedCoursesCount1_3_2, enrolledStudentsCount1_3_3_1, projectsCount1_3_4, file1_3_2_1, file1_3_2_2, file1_3_3_1_1, file1_3_3_1_2, file1_3_4_1, file1_3_4_2]);    

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

    const saveSection1_3_1 = async() => {
        const formdata = new FormData();

        const sectionData = {
            department,
            academicYear,
            text_1_3_1,
            file1_3_1
        };

        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }
        try{
            const response = await axios.post("https://naacserver.onrender.com/data/save1-3-1", formdata);
            console.log(response.data); 
            alert("Saved Section 1.3.1 data:");
        }catch(error){
            console.log("Error",error.message);
        }
    };


    const saveSection1_3_2 = async() => {
        const formdata = new FormData();

        const sectionData = {
            department,
            academicYear,
            valueAddedCoursesCount1_3_2, 
            file1_3_2_1,
            file1_3_2_2
        };

        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }
        try{
            const response = await axios.post("https://naacserver.onrender.com/data/save1-3-2", formdata);
            console.log(response.data); 
            alert("Saved Section 1.3.2 data:");
        }catch(error){
            console.log("Error",error.message);
        }
    };

    const saveSection1_3_3 = async() => {
        const formdata = new FormData();

        const sectionData = {
            department,
            academicYear,
            enrolledStudentsCount1_3_3_1, 
            file1_3_3_1_1,
            file1_3_3_1_2
        };

        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }
        try{
            const response = await axios.post("https://naacserver.onrender.com/data/save1-3-3", formdata);
            console.log(response.data); 
            alert("Saved Section 1.3.3 data:");
        }catch(error){
            console.log("Error",error.message);
        }
    };

    const saveSection1_3_4 = async() => {
        const formdata = new FormData();

        const sectionData = {
            department,
            academicYear,
            projectsCount1_3_4,
            file1_3_4_1,
            file1_3_4_2
        };

        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }
        try{
            const response = await axios.post("https://naacserver.onrender.com/data/save1-3-4", formdata);
            console.log(response.data); 
            alert("Saved Section 1.3.4 data:");
        }catch(error){
            console.log("Error",error.message);
        }
    };

    return (
        <div className="c-1_3">
            <h3>1.3 - Curriculum Enrichment</h3>
            <ul>
                <li>
                    <div className="text-area">
                        <StyledTextArea
                            rows={5}
                            placeholder="Type the text here"
                            value={text_1_3_1}
                            onChange={(e) => setText_1_3_1(e.target.value)}
                        />
                    </div>
                    <div className="table-1_3_1">
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
                                    <td>Upload relevant supporting documents</td>
                                    <td></td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file1_3_1"
                                            name="fileUpload"
                                            accept=".xls, .xlsx, .doc, .docx, .pdf"
                                            onChange={(e) => setFile1_3_1(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <button onClick={saveSection1_3_1}>Save</button>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="c-1_3_2">
                        <h4>1.3.2 - Number of value-added courses for imparting transferable and life skills offered during the year</h4>
                        <input 
                            type="number" 
                            id="valueAddedCoursesCount1_3_2" 
                            value={valueAddedCoursesCount1_3_2} 
                            onChange={(e) => setValueAddedCoursesCount1_3_2(e.target.value)} 
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
                                    <td>Upload the data template</td>
                                    <td><button onClick={() => downloadExcel('1.3.2.xlsx')}>Data Template</button></td>
                                    <td><input type="file" id="fileUpload1_3_2_1" onChange={(e) => setFile1_3_2_1(e.target.files[0])} name="fileUpload" accept=".xls, .xlsx" /></td>
                                    <td>xls, xlsx. File size: 6MB</td>
                                </tr>
                                <tr>
                                    <td>Upload relevant supporting documents</td>
                                    <td></td>
                                    <td><input type="file" id="fileUpload1_3_2_2" onChange={(e) => setFile1_3_2_2(e.target.files[0])} name="fileUpload" accept=".xls, .xlsx, .doc, .docx, .pdf" /></td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                                </tr>
                            </tbody>
                        </table>
                    <div>
                        <button onClick={saveSection1_3_2}>Save</button>
                    </div>
                    </div>
                </li>
                <li>
                    <div className="c-1_3_3">
                        <h4>1.3.3 - Total number of students enrolled in the courses under 1.3.2 above</h4>
                        <ul>
                            <li>
                                <div className="c-1_3_3_1">
                                    <h4>1.3.3.1 - Number of value-added courses for imparting transferable and life skills offered during the year</h4>
                                    <input 
                                        type="number" 
                                        id="enrolledStudentsCount1_3_3_1" 
                                        value={enrolledStudentsCount1_3_3_1} 
                                        onChange={(e) => setEnrolledStudentsCount1_3_3_1(e.target.value)} 
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
                                                <td>Upload the data template</td>
                                                <td><button onClick={() => downloadExcel('1.3.3.xlsx')}>Data Template</button></td>
                                                <td><input type="file" id="fileUpload1_3_3_1_1" onChange={(e) => setFile1_3_3_1_1(e.target.files[0])} name="fileUpload" accept=".xls, .xlsx" /></td>
                                                <td>xls, xlsx. File size: 6MB</td>
                                            </tr>
                                            <tr>
                                                <td>Upload relevant supporting documents</td>
                                                <td></td>
                                                <td><input type="file" id="fileUpload1_3_3_1_2" onChange={(e) => setFile1_3_3_1_2(e.target.files[0])} name="fileUpload" accept=".xls, .xlsx, .doc, .docx, .pdf" /></td>
                                                <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </li>
                        </ul>
                        <div>
                            <button onClick={saveSection1_3_3}>Save</button>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="c-1_3_4">
                        <h4>1.3.4 - Number of students undertaking field projects/ research projects/ internships during the year</h4>
                        <input 
                            type="number" 
                            id="projectsCount1_3_4" 
                            value={projectsCount1_3_4} 
                            onChange={(e) => setProjectsCount1_3_4(e.target.value)} 
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
                                    <td>Upload the data template</td>
                                    <td><button onClick={() => downloadExcel('1.3.4.xlsx')}>Data Template</button></td>
                                    <td><input type="file" id="fileUpload1_3_4_1" onChange={(e) => setFile1_3_4_1(e.target.files[0])} name="fileUpload" accept=".xls, .xlsx" /></td>
                                    <td>xls, xlsx. File size: 6MB</td>
                                </tr>
                                <tr>
                                    <td>Upload relevant supporting documents</td>
                                    <td></td>
                                    <td><input type="file" id="fileUpload1_3_4_2" onChange={(e) => setFile1_3_4_2(e.target.files[0])} name="fileUpload" accept=".xls, .xlsx, .doc, .docx, .pdf" /></td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <button onClick={saveSection1_3_4}>Save</button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Criteria13;
