import React, { useEffect } from 'react'
import { useState } from 'react';
import StyledTextArea from "./textArea";
import { saveAs } from 'file-saver';
import axios from "axios";

export const Criteria22 = ({ onCrit22Data }) => {

    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');

    const [learning_assessment, setlearning_assessment] = useState("");
    const [no_of_students, setno_of_students] = useState("");
    const [no_of_teachers, setno_of_teachers] = useState("");
    const [file2_2_1_1, setfile2_2_1_1] = useState(null);
    const [link2_2_1_2, setlink2_2_1_2] = useState(null);
    const [file2_2_2, setfile2_2_2] = useState(null);

    const saveSection2_2_1 = async () => {
        const formdata = new FormData();

        const sectionData = {
            department,
            academicYear,
            file2_2_1_1,
            link2_2_1_2,
            learning_assessment
        };

        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }
        try {
            const response = await axios.post("https://naacserver.onrender.com/data/save2-2-1", formdata);
            console.log(response.data);
            alert("Saved Section 2.2.1 data:");
        } catch (error) {
            console.log("Error", error.message);
        }
    };

    const saveSection2_2_2 = async () => {
        const formdata = new FormData();

        const sectionData = {
            department,
            academicYear,
            no_of_students,
            no_of_teachers,
            file2_2_2
        };

        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }
        try {
            const response = await axios.post("https://naacserver.onrender.com/data/save2-2-2", formdata);
            console.log(response.data);
            alert("Saved Section 2.2.2 data:");
        } catch (error) {
            console.log("Error", error.message);
        }
    };

    useEffect(() => {
        const crit22 = {
            learning_assessment,
            file2_2_1_1,
            link2_2_1_2,
            no_of_students,
            no_of_teachers,
            file2_2_2
        };
        onCrit22Data(crit22);
    }, [learning_assessment, file2_2_1_1, link2_2_1_2, no_of_students, no_of_teachers, file2_2_2]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://naacserver.onrender.com/data/fetchC2?department=${department}&academicYear=${academicYear}`);
            const data = response.data.data.criteria22;

            if (data) {
                setlearning_assessment(data.learning_assessment ? data.learning_assessment : '');
                setno_of_students(data.no_of_students ? data.no_of_students : '');
                setno_of_teachers(data.no_of_teachers ? data.no_of_teachers : '');
            }
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='c-2-2'>
            <div>
                <h3>2.2 Catering to Student Diversity</h3>
            </div>

            <h4>2.2.1- The institution assesses the learning levels of the studentsand oragnises special programmes for advanced learners and slow learners  </h4>

            <div className="text-area">
                <StyledTextArea
                    rows={5}
                    placeholder="Type the text here"
                    value={learning_assessment}
                    onChange={(e) => setlearning_assessment(e.target.value)}
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
                        <td> {file2_2_1_1 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}

                            Upload the data template</td>
                        <td>
                        </td>
                        <td>
                            <input
                                type="file"
                                id="file2_2_1_1"
                                name="fileUpload"
                                accept=".xls, .xlsx"
                                onChange={(e) => setfile2_2_1_1(e.target.files[0])}
                            />
                        </td>
                        <td>xls, xlsx. File size: 6MB</td>
                    </tr>
                    <tr>
                        <td> {link2_2_1_2 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}
                            Link for Additional Information</td>
                        <td></td>
                        <td>
                            <input
                                type="string"
                                id="link2_2_1_2"
                                value={link2_2_1_2}
                                onChange={(e) => setlink2_2_1_2(e.target.value)}
                            /><br />
                        </td>
                        <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
                    </tr>
                </tbody>
            </table>
            <div>
                <button onClick={saveSection2_2_1}>Save</button>
            </div>
            <br></br>

            <h4>2.2.2 - Student - Full time teacher ratio during the year</h4>
            <table>
                <thead>
                    <tr>
                        <th>Number of Students</th>
                        <th>Number of Teachers</th>
                    </tr>
                </thead>
                <tbody>
                    <td>
                        <input
                            type="number"
                            id="no_of_students"
                            value={no_of_students}
                            onChange={(e) => setno_of_students(e.target.value)}
                        /><br />
                    </td>

                    <td>
                        <input
                            type="number"
                            id="no_of_teachers"
                            value={no_of_teachers}
                            onChange={(e) => setno_of_teachers(e.target.value)}
                        /><br />
                    </td>
                </tbody>
            </table>

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
                        <td> {file2_2_2 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}

                            Upload the data template</td>
                        <td>
                        </td>
                        <td>
                            <input
                                type="file"
                                id="file2_2_2"
                                name="fileUpload"
                                accept=".xls, .xlsx"
                                onChange={(e) => setfile2_2_2(e.target.files[0])}
                            />
                        </td>
                        <td>xls, xlsx. File size: 6MB</td>
                    </tr>
                </tbody>
            </table>
            <div>
                <button onClick={saveSection2_2_2}>Save</button>
            </div>
        </div>

    )
}

export default Criteria22