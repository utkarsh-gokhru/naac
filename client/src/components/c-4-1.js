import React, { useState, useEffect } from "react";

import StyledTextArea from "./textArea";
import { saveAs } from 'file-saver';
import axios from "axios";
import '../css/criteria4.css';

const Criteria41 = ({ onCrit41Data }) => {

    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');
    const [teaching_facilities, setteaching_facilities] = useState("");
    const [cultural_facilities, setcultural_facilities] = useState("");
    const [general_facilities, setgeneral_facilities] = useState("");
    const [total_expenditure, settotal_expenditure] = useState("");
    const [file4_1_1, setFile4_1_1] = useState(null);
    const [file4_1_2, setFile4_1_2] = useState(null);
    const [file4_1_3, setFile4_1_3] = useState(null);
    const [file4_1_4_1, setFile4_1_4_1] = useState(null);
    const [file4_1_4_2, setFile4_1_4_2] = useState(null);

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
        const crit41 = {
            teaching_facilities,
            file4_1_1,
            cultural_facilities,
            file4_1_2,
            general_facilities,
            file4_1_3,
            total_expenditure,
            file4_1_4_1,
            file4_1_4_2,
        };
        onCrit41Data(crit41);
    }, [teaching_facilities,
        file4_1_1,
        cultural_facilities,
        file4_1_2,
        general_facilities,
        file4_1_3,
        total_expenditure,
        file4_1_4_1,
        file4_1_4_2,])

    const saveSection4_1_1 = async () => {
        const formdata = new FormData();

        const sectionData = {
            department,
            academicYear,
            teaching_facilities,
            file4_1_1
        };

        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }

        try {
            const response = await axios.post("https://naacserver.onrender.com/data/save4-1-1", formdata);
            console.log(response.data);
            alert("Saved Section 4.1.1 data successfully!");
        } catch (error) {
            console.error("Error saving Section 4.1.1 data:", error.message);
            alert("Failed to save Section 4.1.1 data. Please try again.");
        }
    };

    const saveSection4_1_2 = async () => {
        const formdata = new FormData();

        const sectionData = {
            department,
            academicYear,
            cultural_facilities,
            file4_1_2
        };

        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }

        try {
            const response = await axios.post("https://naacserver.onrender.com/data/save4-1-2", formdata);
            console.log(response.data);
            alert("Saved Section 4.1.2 data successfully!");
        } catch (error) {
            console.error("Error saving Section 4.1.2 data:", error.message);
            alert("Failed to save Section 4.1.2 data. Please try again.");
        }
    };

    const saveSection4_1_3 = async () => {
        const formdata = new FormData();

        const sectionData = {
            department,
            academicYear,
            general_facilities,
            file4_1_3
        };

        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }

        try {
            const response = await axios.post("https://naacserver.onrender.com/data/save4-1-3", formdata);
            console.log(response.data);
            alert("Saved Section 4.1.3 data successfully!");
        } catch (error) {
            console.error("Error saving Section 4.1.3 data:", error.message);
            alert("Failed to save Section 4.1.3 data. Please try again.");
        }
    };

    const saveSection4_1_4 = async () => {
        const formdata = new FormData();

        const sectionData = {
            department,
            academicYear,
            total_expenditure,
            file4_1_4_1,
            file4_1_4_2
        };

        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }

        try {
            const response = await axios.post("https://naacserver.onrender.com/data/save4-1-4", formdata);
            console.log(response.data);
            alert("Saved Section 4.1.4 data successfully!");
        } catch (error) {
            console.error("Error saving Section 4.1.4 data:", error.message);
            alert("Failed to save Section 4.1.4 data. Please try again.");
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://naacserver.onrender.com/data/fetchC4?department=${department}&academicYear=${academicYear}`);
            const data = response.data.data.criteria41;

            if (data) {
                setteaching_facilities(data.teaching_facilities || "");
                setcultural_facilities(data.cultural_facilities || "");
                setgeneral_facilities(data.general_facilities || "");
                settotal_expenditure(data.total_expenditure || "");
                setFile4_1_1(data.file4_1_1 ? 'true' : 'false');
                setFile4_1_2(data.file4_1_2 ? 'true' : 'false');
                setFile4_1_3(data.file4_1_3 ? 'true' : 'false');
                setFile4_1_4_1(data.file4_1_4_1 ? 'true' : 'false');
                setFile4_1_4_2(data.file4_1_4_2 ? 'true' : 'false');
            }

        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="c-4-1">
            <h3>4.1 - Physical Facilities</h3>

            <div className="c-4-1-1">
                <h4>4.1.1 - The institution has adequate facilities for teaching - learning viz, classrooms, laboratories, computing equipment, etc.</h4>

                <StyledTextArea
                    rows={5}
                    placeholder="Type the text here"
                    value={teaching_facilities}
                    onChange={(e) => setteaching_facilities(e.target.value)}
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
                                {file4_1_1 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}
                                Upload relevant supporting documents
                            </td>
                            <td></td>
                            <td>
                                <input
                                    type="file"
                                    id="file4_1_1"
                                    name="fileUpload"
                                    accept=".xls, .xlsx, .doc, .docx, .pdf"
                                    onChange={(e) => setFile4_1_1(e.target.files[0])}
                                />
                            </td>
                            <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button onClick={() => saveSection4_1_1({ teaching_facilities, file4_1_1 }, '4-1-1')}>Save</button>
                </div>
            </div>

            <div className="c-4-1-2">
                <h4>4.1.2 - The institution has adequate facilities for cultural activities, yoga, games (inddor , outdoor) and sports, (gymnasium, yoga centre, auditorium etc.)</h4>

                <StyledTextArea
                    rows={5}
                    placeholder="Type the text here"
                    value={cultural_facilities}
                    onChange={(e) => setcultural_facilities(e.target.value)}
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
                                {file4_1_2 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}
                                Upload relevant supporting documents
                            </td>
                            <td></td>
                            <td>
                                <input
                                    type="file"
                                    id="file4_1_2"
                                    name="fileUpload"
                                    accept=".xls, .xlsx, .doc, .docx, .pdf"
                                    onChange={(e) => setFile4_1_2(e.target.files[0])}
                                />
                            </td>
                            <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button onClick={() => saveSection4_1_2({ cultural_facilities, file4_1_2 }, '4-1-2')}>Save</button>
                </div>
            </div>

            <div className="c-4-1-3">
                <h4>4.1.3 - Availability of general campus facilities and overall ambience.</h4>

                <StyledTextArea
                    rows={5}
                    placeholder="Type the text here"
                    value={general_facilities}
                    onChange={(e) => setgeneral_facilities(e.target.value)}
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
                                {file4_1_3 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}
                                Upload relevant supporting documents
                            </td>
                            <td></td>
                            <td>
                                <input
                                    type="file"
                                    id="file4_1_3"
                                    name="fileUpload"
                                    accept=".xls, .xlsx, .doc, .docx, .pdf"
                                    onChange={(e) => setFile4_1_3(e.target.files[0])}
                                />
                            </td>
                            <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button onClick={() => saveSection4_1_3({ general_facilities, file4_1_3 }, '4-1-3')}>Save</button>
                </div>
            </div>

            <li>
                <div className="c-4_1_4">
                    <h4>4.1.4- Total expenditure </h4>
                    <input
                        type="number"
                        id="total_expenditure"
                        value={total_expenditure}
                        onChange={(e) => settotal_expenditure(e.target.value)}
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
                                    {file4_1_4_1 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}
                                    Upload the data template
                                </td>
                                <td>
                                    <button onClick={() => downloadExcel('4.1.4.xlsx')}>Data Template</button>
                                </td>
                                <td>
                                    <input
                                        type="file"
                                        id="file4_1_4_1"
                                        name="fileUpload"
                                        accept=".xls, .xlsx"
                                        onChange={(e) => setFile4_1_4_1(e.target.files[0])}
                                    />
                                </td>
                                <td>xls, xlsx. File size: 6MB</td>
                            </tr>
                            <tr>
                                <td>
                                    {file4_1_4_2 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}
                                    Upload relevant supporting documents
                                </td>
                                <td></td>
                                <td>
                                    <input
                                        type="file"
                                        id="file4_1_4_2"
                                        name="fileUpload"
                                        accept=".xls, .xlsx, .doc, .docx, .pdf"
                                        onChange={(e) => setFile4_1_4_2(e.target.files[0])}
                                    />
                                </td>
                                <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <button onClick={saveSection4_1_4}>Save</button>
                    </div>
                </div>
            </li>
        </div>
    );
};

export default Criteria41;
