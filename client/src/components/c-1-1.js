import React, { useState, useEffect } from "react";
import StyledTextArea from "./textArea";
import { saveAs } from 'file-saver';
import axios from "axios";

const Criteria11 = ({ onCrit11Data }) => {
    
    const [curriculumText, setCurriculumText] = useState("");
    const [file1_1_1, setFile1_1_1] = useState(null);
    const [syllabusRevisionCount, setSyllabusRevisionCount] = useState("");
    const [file1_1_2_1, setFile1_1_2_1] = useState(null);
    const [file1_1_2_2, setFile1_1_2_2] = useState(null);
    const [coursesFocusCount, setCoursesFocusCount] = useState("");
    const [file1_1_3_1, setFile1_1_3_1] = useState(null);
    const [file1_1_3_2, setFile1_1_3_2] = useState(null);
    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');

    const saveSection = async (sectionData, section) => {
        const formData = new FormData();
    
        formData.append("department", department);
        formData.append("academicYear", academicYear);
    
        let allFieldsFilled = true;
    
        for (const key in sectionData) {
            if (sectionData[key] === null || sectionData[key] === '') {
                allFieldsFilled = false;
                break;
            }
        }
    
        if (!allFieldsFilled) {
            alert('Please fill in all the fields of the section.');
        } else {
            for (const key in sectionData) {
                formData.append(key, sectionData[key]);
            }
        }
        try {
            const response = await axios.post(`http://localhost:5000/data/save${section}`, formData);
            console.log(response.data);
            alert(`Saved Section ${section} data`);
        } catch (error) {
            console.log("Error", error.message);
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

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://naacserver.onrender.com/data/fetchC1?department=${department}&academicYear=${academicYear}`);
            const data = response.data.data.criteria11;
    
            if (data) {
                data.curriculumText ? setCurriculumText(data.curriculumText) : setCurriculumText('');
                data.coursesFocusCount ? setCoursesFocusCount(data.coursesFocusCount) : setCoursesFocusCount('');
                data.syllabusRevisionCount ? setSyllabusRevisionCount(data.syllabusRevisionCount) : setSyllabusRevisionCount('');
                data.file1_1_1 ? setFile1_1_1('true') : setFile1_1_1('false');
                data.file1_1_2_1 ? setFile1_1_2_1('true') : setFile1_1_2_1('false');
                data.file1_1_2_2 ? setFile1_1_2_2('true') : setFile1_1_2_2('false');
            }
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        fetchData();
    },[]);

    useEffect(() => {
        const crit11 = {
            curriculumText,
            syllabusRevisionCount,
            file1_1_1,
            file1_1_2_1,
            file1_1_2_2,
            coursesFocusCount,
            file1_1_3_1,
            file1_1_3_2
        };
        onCrit11Data(crit11);
    }, [file1_1_1, curriculumText, syllabusRevisionCount, file1_1_2_1, file1_1_2_2, coursesFocusCount, file1_1_3_1, file1_1_3_2]); 

    return (
        <div className="c-1_1">
            <h3>1.1 - Curriculum Design and Development</h3>
            <ul>
                <li>
                    <div className="c-1_1-det">
                        <h4>1.1.1 - Curricula developed and implemented have relevance to the local, regional, national and 
                            global development needs which is reflected in Programme Outcomes (POs), Programme Specific Outcomes (PSOs)
                            and Course Outcome (COs) of the Programmes offered by the University
                        </h4>
                    </div>
                    <div className="text-area">
                        <StyledTextArea
                            rows={5}
                            placeholder="Type the text here"
                            value={curriculumText}
                            onChange={(e) => setCurriculumText(e.target.value)}
                        />
                    </div>
                    <div className="table-1_1_1">
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
                                    <td>
                                    {file1_1_1 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}
                                        Upload relevant supporting documents
                                    </td>
                                    <td></td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file1_1_1"
                                            name="fileUpload"
                                            accept=".xls, .xlsx, .doc, .docx, .pdf"
                                            onChange={(e) => setFile1_1_1(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                        <button onClick={() => saveSection({ curriculumText, file1_1_1}, '1-1-1')}>Save</button>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="c-1_1_2">
                        <h4>1.1.2- Number of Programmes where syllabus revision was carried out during the year</h4>
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
                                    <td> {file1_1_2_1 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}
                                      
                                        Upload the data template</td>
                                    <td>
                                        <button onClick={() => downloadExcel('1.1.2.xlsx')}>Data Template</button>
                                    </td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file1_1_2_1"
                                            name="fileUpload"
                                            accept=".xls, .xlsx"
                                            onChange={(e) => setFile1_1_2_1(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx. File size: 6MB</td>
                                </tr>
                                <tr>
                                    <td> {file1_1_2_2 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}
                                        Upload relevant supporting documents</td>
                                    <td></td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file1_1_2_2"
                                            name="fileUpload"
                                            accept=".xls, .xlsx, .doc, .docx, .pdf"
                                            onChange={(e) => setFile1_1_2_2(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                        <button onClick={() => saveSection({ syllabusRevisionCount, file1_1_2_1, file1_1_2_2}, '1-1-2')}>Save</button>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="c-1_1_3">
                        <h4>1.1.3 - Total number of courses having focus on employability/ entrepreneurship/ skill 
                            development offered by the University during the year
                        </h4>
                        <ul>
                            <li>
                                <h4>1.1.3.1 - Number of courses having focus on employability/ entrepreneurship/ skill development during the year</h4>
                                <input
                                    type="number"
                                    id="coursesFocusCount"
                                    value={coursesFocusCount}
                                    onChange={(e) => setCoursesFocusCount(e.target.value)}
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
                                            <td>
                                                <button onClick={() => downloadExcel('1.1.3.xlsx')}>Data Template</button>
                                            </td>
                                            <td>
                                                <input
                                                    type="file"
                                                    id="file1_1_3_1"
                                                    name="fileUpload"
                                                    accept=".xls, .xlsx"
                                                    onChange={(e) => setFile1_1_3_1(e.target.files[0])}
                                                />
                                            </td>
                                            <td>xls, xlsx. File size: 6MB</td>
                                        </tr>
                                        <tr>
                                            <td>Upload relevant supporting documents</td>
                                            <td></td>
                                            <td>
                                                <input
                                                    type="file"
                                                    id="file1_1_3_2"
                                                    name="fileUpload"
                                                    accept=".xls, .xlsx, .doc, .docx, .pdf"
                                                    onChange={(e) => setFile1_1_3_2(e.target.files[0])}
                                                />
                                            </td>
                                            <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </li>
                        </ul>
                    </div>
                    <div>
                    <button onClick={() => saveSection({ coursesFocusCount, file1_1_3_1, file1_1_3_2}, '1-1-3')}>Save</button>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Criteria11;
