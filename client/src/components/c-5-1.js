import React, { useState, useEffect } from "react";
import StyledTextArea from "./textArea";
import { saveAs } from 'file-saver';
import axios from "axios";
import '../css/criteria5.css';

const Criteria51 = ({ onCrit51Data }) => {

    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');
    const [scholarship_beneficiaries, setscholarship_beneficiaries] = useState("");
    const [career_counsel_beneficiaries, setcareer_counsel_beneficiaries] = useState("");
    const [capacity_development_initiatives, setcapacity_development_initiatives] = useState("");
    const [student_grievances_redressal, setstudent_grievances_redressal] = useState("");
    const [file5_1_1_1, setFile5_1_1_1] = useState(null);
    const [file5_1_1_2, setFile5_1_1_2] = useState(null);
    const [file5_1_2_1, setFile5_1_2_1] = useState(null);
    const [file5_1_2_2, setFile5_1_2_2] = useState(null);
    const [file5_1_3_1, setFile5_1_3_1] = useState(null);
    const [file5_1_3_2, setFile5_1_3_2] = useState(null);
    const [file5_1_4, setfile5_1_4] = useState(null);

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
        const crit51 = {
            scholarship_beneficiaries,
            file5_1_1_1,
            file5_1_1_2,
            career_counsel_beneficiaries,
            file5_1_2_1,
            file5_1_2_2,
            capacity_development_initiatives,
            file5_1_3_1,
            file5_1_3_2,
            student_grievances_redressal,
            file5_1_4
        };
        onCrit51Data(crit51);
    }, [scholarship_beneficiaries, file5_1_1_1, file5_1_1_2, career_counsel_beneficiaries, file5_1_2_1, file5_1_2_2, capacity_development_initiatives, file5_1_3_1, file5_1_3_2, student_grievances_redressal, file5_1_4]);


    const fetchData = async () => {
        try {
            const response = await axios.get(`https://naacserver.onrender.com/data/fetchC5?department=${department}&academicYear=${academicYear}`);
            const data = response.data.data.criteria51;

            if (data) {
                setscholarship_beneficiaries(data.scholarship_beneficiaries ? data.scholarship_beneficiaries : '');
                setcareer_counsel_beneficiaries(data.career_counsel_beneficiaries ? data.career_counsel_beneficiaries : '');
                setcapacity_development_initiatives(data.capacity_development_initiatives ? data.capacity_development_initiatives : '');
                setstudent_grievances_redressal(data.student_grievances_redressal ? data.student_grievances_redressal : '');
            }
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (

        <div className="c-5-1">
            <h3>5.1 - Student Support</h3>

            <h4> 5.1.1 - Total number of students benefited by scholarships and free ships provided by the institution, Government and non-government agencies (NGOs) during <br></br> the year (other than the students receiving scholarships under the government schemes for reserved categories)</h4>
            <input
                type="number"
                id="scholarship_beneficiaries"
                value={scholarship_beneficiaries}
                onChange={(e) => setscholarship_beneficiaries(e.target.value)}
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
                        <td>
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
            <button onClick={() => saveSection({ scholarship_beneficiaries, file5_1_1_1, file5_1_1_2 }, '5-1-1')}>Save</button>
            </div>

            <h4>5.1.2 - Total number of students benefited by career counselling and guidance for competitive examinations offered by the Institution during the year</h4>
            <input
                type="number"
                id="career_counsel_beneficiaries"
                value={career_counsel_beneficiaries}
                onChange={(e) => setcareer_counsel_beneficiaries(e.target.value)}
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
                        <td>

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
            <button onClick={() => saveSection({ career_counsel_beneficiaries, file5_1_2_1, file5_1_2_2 }, '5-1-2')}>Save</button>
            </div>

            <h4>5.1.3 - Following Capacity development and skills enhancement initiatives are taken by the institution</h4>
            <ul>
                <li>1. Soft Skills </li>
                <li>2. Language and Communication Skills</li>
                <li>3. Life Skills(Yoga, Physical fitness, health and hygiene)</li>
                <li>4. Awareness of trends in Technology</li>
            </ul>
            <form action="/submit-response" method="post">
                <input type="radio" id="all" name="option" value="all" onChange={(e) => setcapacity_development_initiatives(e.target.value)} />
                <label htmlFor="all">All of the above</label><br />

                <input type="radio" id="any3" name="option" value="any3" onChange={(e) => setcapacity_development_initiatives(e.target.value)} />
                <label htmlFor="any3">Any 3 of the above</label><br />

                <input type="radio" id="any2" name="option" value="any2" onChange={(e) => setcapacity_development_initiatives(e.target.value)} />
                <label htmlFor="any2">Any 2 of the above</label><br />

                <input type="radio" id="any1" name="option" value="any1" onChange={(e) => setcapacity_development_initiatives(e.target.value)} />
                <label htmlFor="any1">Any 1 of the above</label><br />

                <input type="radio" id="none" name="option" value="none" onChange={(e) => setcapacity_development_initiatives(e.target.value)} />
                <label htmlFor="none">None of the above</label><br />
            </form>

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
            <button onClick={() => saveSection({ capacity_development_initiatives, file5_1_3_1, file5_1_3_2 }, '5-1-3')}>Save</button>
            </div>

            <h4>5.1.4 - The Institution adopts the following for redressal of student grievances including sexual harassment and ragging cases:</h4>

            <ul>
                <li>Implementation of guidelines of statutory/regulatory bodies</li>
                <li>Organisation-wide awareness and undertakings on policies with zero tolerance</li>
                <li>Mechanisms for submission of online/offline students grievances</li>
                <li>Timely redressal of the grievances through appropriate committees</li>
            </ul>

            <h4>Select one:</h4>

            <form action="/submit-response" method="post">
                <input type="radio" id="all" name="option" value="all" onChange={(e) => setstudent_grievances_redressal(e.target.value)} />
                <label htmlFor="all">All of the above</label><br />

                <input type="radio" id="any3" name="option" value="any3" onChange={(e) => setstudent_grievances_redressal(e.target.value)} />
                <label htmlFor="any3">Any 3 of the above</label><br />

                <input type="radio" id="any2" name="option" value="any2" onChange={(e) => setstudent_grievances_redressal(e.target.value)} />
                <label htmlFor="any2">Any 2 of the above</label><br />

                <input type="radio" id="any1" name="option" value="any1" onChange={(e) => setstudent_grievances_redressal(e.target.value)} />
                <label htmlFor="any1">Any 1 of the above</label><br />

                <input type="radio" id="none" name="option" value="none" onChange={(e) => setstudent_grievances_redressal(e.target.value)} />
                <label htmlFor="none">None of the above</label><br />

                <input type="submit" value="Submit" />
            </form>

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
                        <td> {file5_1_4 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}

                            Upload the data template</td>
                        <td>
                        </td>
                        <td>
                            <input
                                type="file"
                                id="file5_1_4"
                                name="fileUpload"
                                accept=".xls, .xlsx"
                                onChange={(e) => setfile5_1_4(e.target.files[0])}
                            />
                        </td>
                        <td>xls, xlsx. File size: 6MB</td>
                    </tr>
                </tbody>
            </table>
            <div>
            <button onClick={() => saveSection({ student_grievances_redressal, file5_1_4 }, '5-1-4')}>Save</button>
            </div>
        </div>
    )
}

export default Criteria51;
