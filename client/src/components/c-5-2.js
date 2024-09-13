import React, { useState, useEffect } from "react";
import StyledTextArea from "./textArea";
import { saveAs } from 'file-saver';
import axios from "axios";
import '../css/criteria5.css';

const Criteria52 = ({ onCrit52Data }) => {

    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');
    const [students_qualified, setstudents_qualified] = useState("");
    const [students_appeared, setstudents_appeared] = useState("");
    const [higher_studies_students, sethigher_studies_students] = useState("");
    const [placement_no, setplacement_no] = useState("");
    const [file5_2_1_1, setFile5_2_1_1] = useState(null);
    const [file5_2_1_2, setFile5_2_1_2] = useState(null);
    const [file5_2_2_1, setFile5_2_2_1] = useState(null);
    const [file5_2_2_2, setFile5_2_2_2] = useState(null);
    const [file5_2_3_1, setFile5_2_3_1] = useState(null);
    const [file5_2_3_2, setFile5_2_3_2] = useState(null);


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

    useEffect(() => {
        const crit52 = {
            students_qualified,
            students_appeared,
            file5_2_1_1,
            file5_2_1_2,
            placement_no,
            file5_2_2_1,
            file5_2_2_2,
            higher_studies_students,
            file5_2_3_1,
            file5_2_3_2
        };
        onCrit52Data(crit52);
    }, [students_qualified, students_appeared, file5_2_1_1, file5_2_1_2, placement_no, file5_2_2_1, file5_2_2_2, higher_studies_students, file5_2_3_1, file5_2_3_2]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://naacserver.onrender.com/data/fetchC5?department=${department}&academicYear=${academicYear}`);
            const data = response.data.data.criteria52;

            if (data) {
                setstudents_qualified(data.students_qualified ? data.students_qualified : '');
                setstudents_appeared(data.students_appeared ? data.students_appeared : '');
                sethigher_studies_students(data.higher_studies_students ? data.higher_studies_students : '');
                setplacement_no(data.placement_no ? data.placement_no : '');
            }
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="c-5-2">
            <h3>5.2 - Student Progression</h3>

            <h4>5.2.1 - Number of students qualifying in state/ national/ international level examinations during<br></br> the year (eg:NET/SLET/GATE/GMAT/CAT/GRE/TOEFL/Civil Services/State government examinations)</h4>

            <h4>5.2.1.1 Number of students who qualified in state/ national/ international <br></br>examinations (e.g.: IIT- JAM/NET/SET/JRF/ GATE /GMAT /CAT/ GRE/ TOEFL/Civil Services/State government examinations)</h4>
            <input
                type="number"
                id="students_qualified"
                value={students_qualified}
                onChange={(e) => setstudents_qualified(e.target.value)}
            /><br />

            <h4>5.2.1.2 -  Number of students who appeared in state/ national/ international<br></br> examinations (e.g.: IIT/JAM/ NET/SLET/GATE/GMAT/CAT/ GRE/TOEFL/Civil Services/State government examinations) during the
                year
            </h4>
            <input
                type="number"
                id="students_appeared"
                value={students_appeared}
                onChange={(e) => setstudents_appeared(e.target.value)}
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
                        <td> {file5_2_1_1 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}

                            Upload the data template</td>
                        <td>
                            <button onClick={() => downloadExcel('5.2.1.xlsx')}>Data Template</button>
                        </td>
                        <td>
                            <input
                                type="file"
                                id="file5_2_1_1"
                                name="fileUpload"
                                accept=".xls, .xlsx"
                                onChange={(e) => setFile5_2_1_1(e.target.files[0])}
                            />
                        </td>
                        <td>xls, xlsx. File size: 6MB</td>
                    </tr>
                    <tr>
                        <td> {file5_2_1_2 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}
                            Upload relevant supporting documents</td>
                        <td></td>
                        <td>
                            <input
                                type="file"
                                id="file5_2_1_2"
                                name="fileUpload"
                                accept=".xls, .xlsx, .doc, .docx, .pdf"
                                onChange={(e) => setFile5_2_1_2(e.target.files[0])}
                            />
                        </td>
                        <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
                    </tr>
                </tbody>
            </table>
            <div>
            <button onClick={() => saveSection({ students_qualified, students_appeared, file5_2_1_1, file5_2_1_2 }, '5-2-1')}>Save</button>
            </div>
            <h4> 5.2.2 - total number of placememt of ongoing students during the year</h4>
            <input
                type="number"
                id="placement_no"
                value={placement_no}
                onChange={(e) => setplacement_no(e.target.value)}
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
                        <td> {file5_2_2_1 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}

                            Upload the data template</td>
                        <td>
                            <button onClick={() => downloadExcel('5.2.2.xlsx')}>Data Template</button>
                        </td>
                        <td>
                            <input
                                type="file"
                                id="file5_2_2_1"
                                name="fileUpload"
                                accept=".xls, .xlsx"
                                onChange={(e) => setFile5_2_2_1(e.target.files[0])}
                            />
                        </td>
                        <td>xls, xlsx. File size: 6MB</td>
                    </tr>
                    <tr>
                        <td> {file5_2_2_2 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}
                            Upload relevant supporting documents</td>
                        <td></td>
                        <td>
                            <input
                                type="file"
                                id="file5_2_2_2"
                                name="fileUpload"
                                accept=".xls, .xlsx, .doc, .docx, .pdf"
                                onChange={(e) => setFile5_2_2_2(e.target.files[0])}
                            />
                        </td>
                        <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
                    </tr>
                </tbody>
            </table>
            <div>
            <button onClick={() => saveSection({ placement_no, file5_2_2_1, file5_2_2_2 }, '5-2-2')}>Save</button>
            </div>

            <h4>5.2.3 - Number of recently graduated students who have progressed to higher education ( previous graduating batch) during The year </h4>
            <input
                type="number"
                id="  higher_studies_students"
                value={higher_studies_students}
                onChange={(e) => sethigher_studies_students(e.target.value)}
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
                        <td> {file5_2_3_1 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}

                            Upload the data template</td>
                        <td>
                            <button onClick={() => downloadExcel('5.2.3.xlsx')}>Data Template</button>
                        </td>
                        <td>
                            <input
                                type="file"
                                id="file5_2_3_1"
                                name="fileUpload"
                                accept=".xls, .xlsx"
                                onChange={(e) => setFile5_2_3_1(e.target.files[0])}
                            />
                        </td>
                        <td>xls, xlsx. File size: 6MB</td>
                    </tr>
                    <tr>
                        <td> {file5_2_3_2 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}
                            Upload relevant supporting documents</td>
                        <td></td>
                        <td>
                            <input
                                type="file"
                                id="file5_2_3_2"
                                name="fileUpload"
                                accept=".xls, .xlsx, .doc, .docx, .pdf"
                                onChange={(e) => setFile5_2_3_2(e.target.files[0])}
                            />
                        </td>
                        <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
                    </tr>
                </tbody>
            </table>
            <div>
            <button onClick={() => saveSection({ higher_studies_students, file5_2_3_1, file5_2_3_2 }, '5-2-3')}>Save</button>
            </div>
        </div>
    )
}

export default Criteria52;
