import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveAs } from 'file-saver';
import axios from "axios";

const EP2 = ({ onEP2Data }) => {

    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');

    const [students, setStudents] = useState('');
    const [file2_1, setFile2_1] = useState(null);
    const [outgoing_students, setOutgoing_students] = useState('');
    const [file2_2, setFile2_2] = useState(null);
    const [students_appeared_in_university_exam, setStudents_appeared_in_university_exam] = useState('');
    const [file2_3, setFile2_3] = useState(null);
    const [reval_applications, setReval_applications] = useState('');

    const downloadExcel = async (exc_file) => {
        const templateFilePath = `${process.env.PUBLIC_URL}/EP/${exc_file}`;

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

        for (const key in sectionData) {
            formData.append(key, sectionData[key]);
        }
        try {
            const response = await axios.post(`https://naacserver.onrender.com/epData/save-${section}`, formData);
            console.log(response.data);
            alert(`Saved Section ${section} data`);
        } catch (error) {
            console.log("Error", error.message);
        }
    };

    useEffect(() => {
        const ep2Data = {
            students,
            file2_1,
            outgoing_students,
            file2_2,
            students_appeared_in_university_exam,
            file2_3,
            reval_applications
        };
        onEP2Data(ep2Data);
    }, [students, file2_1, outgoing_students, file2_2, students_appeared_in_university_exam, file2_3, reval_applications]);
    const fetchData = async () => {
        try {
            const response = await axios.get(`https://naacserver.onrender.com/data/fetchEP?department=${department}&academicYear=${academicYear}`);
            const data = response.data.data.ep2;

            if (data) {
                setStudents(data.students || '');
                setOutgoing_students(data.outgoing_students || '');
                setStudents_appeared_in_university_exam(data.students_appeared_in_university_exam || '');
                setReval_applications(data.reval_applications || '');

                setFile2_1(data.file2_1 ? 'true' : 'false');
                setFile2_2(data.file2_2 ? 'true' : 'false');
                setFile2_3(data.file2_3 ? 'true' : 'false');
            }
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="sec-2">
            <h3>2. Student</h3>
            <div className="sec2-1">
                <h4>2.1. Number of students during the year:</h4>
                <input
                    type="number"
                    id="students"
                    value={students}
                    onChange={(e) => setStudents(e.target.value)}
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
                                {file2_1 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}
                                Upload the data template</td>
                            <td><button onClick={() => downloadExcel('2.1.xlsx')}>Data Template</button></td>
                            <td>
                                <input
                                    type="file"
                                    id="fileUpload2_1"
                                    onChange={(e) => setFile2_1(e.target.files[0])}
                                    name="fileUpload"
                                    accept=".xls, .xlsx"
                                />
                            </td>
                            <td>xls, xlsx. File size: 6MB</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="sec2-2">
                <h4>2.2. Number of outgoing/final year students during the year:</h4>
                <input
                    type="number"
                    id="outgoing_students"
                    value={outgoing_students}
                    onChange={(e) => setOutgoing_students(e.target.value)}
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
                                {file2_2 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}
                                Upload the data template</td>
                            <td><button onClick={() => downloadExcel('2.2.xlsx')}>Data Template</button></td>
                            <td>
                                <input
                                    type="file"
                                    id="fileUpload2_2"
                                    onChange={(e) => setFile2_2(e.target.files[0])}
                                    name="fileUpload"
                                    accept=".xls, .xlsx"
                                />
                            </td>
                            <td>xls, xlsx. File size: 6MB</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="sec2-3">
                <h4>2.3. Number of students appeared in the University examination during the year:</h4>
                <input
                    type="number"
                    id="students_appeared_in_university_exam"
                    value={students_appeared_in_university_exam}
                    onChange={(e) => setStudents_appeared_in_university_exam(e.target.value)}
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
                                {file2_3 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}
                                Upload the data template</td>
                            <td><button onClick={() => downloadExcel('2.3.xlsx')}>Data Template</button></td>
                            <td>
                                <input
                                    type="file"
                                    id="fileUpload2_3"
                                    onChange={(e) => setFile2_3(e.target.files[0])}
                                    name="fileUpload"
                                    accept=".xls, .xlsx"
                                />
                            </td>
                            <td>xls, xlsx. File size: 6MB</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="sec2-4">
                <h4>2.4. Number of revaluation applications during the year:</h4>
                <input
                    type="number"
                    id="reval_applications"
                    value={reval_applications}
                    onChange={(e) => setReval_applications(e.target.value)}
                />
            </div>
            <div>
                <button onClick={() => saveSection({ students, file2_1, outgoing_students, file2_2, students_appeared_in_university_exam, file2_3, reval_applications }, '2')}>Save</button>
            </div>
        </div>
    );
};

export default EP2;
