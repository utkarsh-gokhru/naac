import React, { useState, useEffect } from "react";
import StyledTextArea from "./textArea";
import { saveAs } from 'file-saver';
import axios from "axios";
import '../css/criteria5.css';

const Criteria53 = ({ onCrit53Data }) => {

    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');

    const [awards_no, setAwards_no] = useState('');
    const [file5_3_1_1, setFile5_3_1_1] = useState(null);
    const [file5_3_1_2, setFile5_3_1_2] = useState(null);
    const [student_council, setStudent_council] = useState('');
    const [file5_3_2, setFile5_3_2] = useState(null);
    const [events, setEvents] = useState('');
    const [file5_3_3_1, setFile5_3_3_1] = useState(null);
    const [file5_3_3_2, setFile5_3_3_2] = useState(null);

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
            const response = await axios.post(`https://naacserver.onrender.com/data/save${section}`, formData);
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

    useEffect(() => {
        const crit53 = {
            awards_no,
            file5_3_1_1,
            file5_3_1_2,
            student_council,
            file5_3_2,
            events,
            file5_3_3_1,
            file5_3_3_2
        };
        onCrit53Data(crit53);
    }, [awards_no, file5_3_1_1, file5_3_1_2, student_council, file5_3_2, events, file5_3_3_1, file5_3_3_2]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://naacserver.onrender.com/data/fetchC5?department=${department}&academicYear=${academicYear}`);
            const data = response.data.data.criteria53;

            if (data) {
                setAwards_no(data.awards_no || '');
                setFile5_3_1_1(data.file5_3_1_1 ? 'true' : 'false');
                setFile5_3_1_2(data.file5_3_1_2 ? 'true' : 'false');
                setStudent_council(data.student_council || '');
                setFile5_3_2(data.file5_3_2 ? 'true' : 'false');
                setEvents(data.events || '');
                setFile5_3_3_1(data.file5_3_3_1 ? 'true' : 'false');
                setFile5_3_3_2(data.file5_3_3_2 ? 'true' : 'false');
            }
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="c-5-3">
            <h3>Student Partcipation and Activities</h3>
            <ul>
                <li>
                    <div className="c-5-3-1">
                        <h4>5.3.1 - Number of awards won by students for outstanding performance in sports/cultural activities
                            at inter-university/state/national/international events (award for a team should be counted as one)
                            during the year
                        </h4>
                        <input
                            type="number"
                            id="awards_no"
                            value={awards_no}
                            onChange={(e) => setAwards_no(e.target.value)}
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
                                    <td>
                                        {file5_3_1_1 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}
                                        Upload the data template</td>
                                    <td><button onClick={() => downloadExcel('5.3.1.xlsx')}>Data Template</button></td>
                                    <td>
                                        <input
                                            type="file"
                                            id="fileUpload5_3_1_1"
                                            onChange={(e) => setFile5_3_1_1(e.target.files[0])}
                                            name="fileUpload"
                                            accept=".xls, .xlsx"
                                        />
                                    </td>
                                    <td>xls, xlsx. File size: 6MB</td>
                                </tr>
                                <tr>
                                    <td>
                                        {file5_3_1_2 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}
                                        Upload relevant supporting documents</td>
                                    <td></td>
                                    <td><input type="file" id="fileUpload5_3_1_2" onChange={(e) => setFile5_3_1_2(e.target.files[0])} name="fileUpload1" accept=".xls, .xlsx, .doc, .docx, .pdf" /></td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <button onClick={() => saveSection({ awards_no, file5_3_1_1, file5_3_1_2 }, '5-3-1')}>Save</button>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="c-5-3-2">
                        <h4>5.3.2 - Prsence of Student Council and its activitiesfor institutional development and student welfare</h4>
                        <StyledTextArea
                            rows={5}
                            placeholder="Type the text here"
                            value={student_council}
                            onChange={(e) => setStudent_council(e.target.value)}
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
                                    <td>
                                        {file5_3_2 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}
                                        Upload relevant supporting documents
                                    </td>
                                    <td></td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file5_3_2"
                                            name="fileUpload"
                                            accept=".xls, .xlsx, .doc, .docx, .pdf"
                                            onChange={(e) => setFile5_3_2(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <button onClick={() => saveSection({ student_council, file5_3_2 }, '5-3-2')}>Save</button>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="c-5-3-3">
                        <h4>Number of sports and cultural events organised by the institution during the year</h4>
                        <input
                            type="number"
                            id="events"
                            value={events}
                            onChange={(e) => setEvents(e.target.value)}
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
                                    <td>
                                        {file5_3_3_1 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}
                                        Upload the data template</td>
                                    <td><button onClick={() => downloadExcel('5.3.3.xlsx')}>Data Template</button></td>
                                    <td>
                                        <input
                                            type="file"
                                            id="fileUpload5_3_1_1"
                                            onChange={(e) => setFile5_3_3_1(e.target.files[0])}
                                            name="fileUpload"
                                            accept=".xls, .xlsx"
                                        />
                                    </td>
                                    <td>xls, xlsx. File size: 6MB</td>
                                </tr>
                                <tr>
                                    <td>
                                        {file5_3_3_2 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}
                                        Upload relevant supporting documents</td>
                                    <td></td>
                                    <td><input type="file" id="fileUpload5_3_3_2" onChange={(e) => setFile5_3_3_2(e.target.files[0])} name="fileUpload1" accept=".xls, .xlsx, .doc, .docx, .pdf" /></td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <button onClick={() => saveSection({ events, file5_3_3_1, file5_3_3_2 }, '5-3-3')}>Save</button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
};

export default Criteria53;
