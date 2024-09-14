import React, { useState, useEffect } from 'react'
import StyledTextArea from "./textArea";
import { saveAs } from 'file-saver';
import axios from "axios";

export const Criteria21 = ({ onCrit21Data }) => {

    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');
    const [no_of_seats, setno_of_seats] = useState("");
    const [students_reserved_cat, setstudents_reserved_cat] = useState("");
    const [file2_1_1_1, setFile2_1_1_1] = useState(null);
    const [file2_1_1_2, setFile2_1_1_2] = useState(null);
    const [file2_1_2_1, setFile2_1_2_1] = useState(null);
    const [file2_1_2_2, setFile2_1_2_2] = useState(null);

   
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

    useEffect(() => {
        const crit21 = {
            no_of_seats,
            file2_1_1_1,
            file2_1_1_2,
            students_reserved_cat,
            file2_1_2_1,
            file2_1_2_2
        };
        onCrit21Data(crit21);
    }, [no_of_seats, file2_1_1_1, file2_1_1_2, students_reserved_cat, file2_1_2_1, file2_1_2_2]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://naacserver.onrender.com/data/fetchC2?department=${department}&academicYear=${academicYear}`);
            const data = response.data.data.criteria21;
            if (data) {
                setno_of_seats(data.no_of_seats ? data.no_of_seats : '');
                setstudents_reserved_cat(data.students_reserved_cat ? data.students_reserved_cat : '');
                setFile2_1_1_1(data.file2_1_1_1 ? 'true' : 'false');
                setFile2_1_1_2(data.file2_1_1_2 ? 'true' : 'false');
                setFile2_1_2_1(data.file2_1_2_1 ? 'true' : 'false');
                setFile2_1_2_2(data.file2_1_2_2 ? 'true' : 'false');
            }
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div class='c-2-1'>
            <h2>CRITERION II - TEACHING-LEARNING AND EVALUATION</h2>
            <br></br>

            <h3>2.1 - Student Enrollment and Profile</h3>
            <br></br>

            <h4>2.1.1 - Demand Ratio</h4>

            <h4>2.1.1.1 - Number of seats available during the year</h4>
            <input
                type="number"
                id="no_of_seats"
                value={no_of_seats}
                onChange={(e) => setno_of_seats(e.target.value)}
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
                            {file2_1_1_1 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}
                            Upload the data template</td>
                        <td>
                            <button onClick={() => downloadExcel('2.1.1.xlsx')}>Data Template</button>
                        </td>
                        <td>
                            <input
                                type="file"
                                id="file2_1_1_1"
                                name="fileUpload"
                                accept=".xls, .xlsx"
                                onChange={(e) => setFile2_1_1_1(e.target.files[0])}
                            />
                        </td>
                        <td>xls, xlsx. File size: 6MB</td>
                    </tr>
                    <tr>
                        <td>
                            {file2_1_1_2 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}
                            Upload relevant supporting documents</td>
                        <td></td>
                        <td>
                            <input
                                type="file"
                                id="file2_1_1_2"
                                name="fileUpload"
                                accept=".xls, .xlsx, .doc, .docx, .pdf"
                                onChange={(e) => setFile2_1_1_2(e.target.files[0])}
                            />
                        </td>
                        <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
                    </tr>
                </tbody>
            </table>
            <div>
            <button onClick={() => saveSection({ no_of_seats, file2_1_1_1, file2_1_1_2 }, '2-1-1')}>Save</button>
            </div>
            <br></br>
            <br></br>

            <h4>2.1.2 - Total number of seats filled against reserved categories (SC, ST, OBC, Divyangjan, etc.) as per applicable reservation<br></br>policy during the year (Excluding Supernumerary Seats)</h4>
            <br></br>
            <br></br>

            <h4>2.1.2.1 - Number of actual students admitted from the reserved categories during the year</h4>
            <br></br>

            <input
                type="number"
                id="students_reserved_cat"
                value={students_reserved_cat}
                onChange={(e) => setstudents_reserved_cat(e.target.value)}
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
                            {file2_1_2_1 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}

                            Upload the data template</td>
                        <td>
                            <button onClick={() => downloadExcel('2.1.2.xlsx')}>Data Template</button>
                        </td>
                        <td>
                            <input
                                type="file"
                                id="file1_1_2_1"
                                name="fileUpload"
                                accept=".xls, .xlsx"
                                onChange={(e) => setFile2_1_2_1(e.target.files[0])}
                            />
                        </td>
                        <td>xls, xlsx. File size: 6MB</td>
                    </tr>
                    <tr>
                        <td>
                            {file2_1_2_2 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}
                            Upload relevant supporting documents</td>
                        <td></td>
                        <td>
                            <input
                                type="file"
                                id="file1_1_2_2"
                                name="fileUpload"
                                accept=".xls, .xlsx, .doc, .docx, .pdf"
                                onChange={(e) => setFile2_1_2_2(e.target.files[0])}
                            />
                        </td>
                        <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
                    </tr>
                </tbody>
            </table>
            <div>
            <button onClick={() => saveSection({ no_of_seats, file2_1_2_1, file2_1_2_2 }, '2-1-2')}>Save</button>
            </div>
            <br></br>


        </div>
    )
}

export default Criteria21;
