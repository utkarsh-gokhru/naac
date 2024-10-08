import React, { useState, useEffect } from "react";
import StyledTextArea from "./textArea";
import { saveAs } from 'file-saver';
import axios from "axios";

const Criteria43 = ({ onCrit43Data }) => {

    const [classrooms_and_seminarhalls, setClassroomsAndSeminarHalls] = useState();
    const [file4_3_1_1, setFile4_3_1_1] = useState(null);
    const [file4_3_1_2, setFile4_3_1_2] = useState(null);
    const [it_policy, setItPolicy] = useState("");
    const [file4_3_2, setFile4_3_2] = useState(null);
    const [number_of_students, setNumberOfStudents] = useState();
    const [number_of_computers, setNumberOfComputers] = useState();
    const [bandwidth, setBandwidth] = useState("");
    const [file4_3_4, setFile4_3_4] = useState(null);
    const [e_content_facilities, setEContentFacilities] = useState("");
    const [file4_3_5_1, setFile4_3_5_1] = useState(null);
    const [file4_3_5_2, setFile4_3_5_2] = useState(null);
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
        const crit43 = {
            classrooms_and_seminarhalls,
            file4_3_1_1,
            file4_3_1_2,
            it_policy,
            file4_3_2,
            number_of_students,
            number_of_computers,
            bandwidth,
            file4_3_4,
            e_content_facilities,
            file4_3_5_1,
            file4_3_5_2
        };
        onCrit43Data(crit43);
    }, [classrooms_and_seminarhalls, file4_3_1_1, file4_3_1_2, it_policy, file4_3_2, number_of_students, number_of_computers, bandwidth, file4_3_4, e_content_facilities, file4_3_5_1, file4_3_5_2]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://naacserver.onrender.com/data/fetchC4?department=${department}&academicYear=${academicYear}`);
            const data = response.data.data.criteria43;

            if (data) {
                setClassroomsAndSeminarHalls(data.classrooms_and_seminarhalls || "");
                setFile4_3_1_1(data.file4_3_1_1 ? 'true' : 'false');
                setFile4_3_1_2(data.file4_3_1_2 ? 'true' : 'false');
                setItPolicy(data.it_policy || "");
                setFile4_3_2(data.file4_3_2 ? 'true' : 'false');
                setNumberOfStudents(data.number_of_students || "");
                setNumberOfComputers(data.number_of_computers || "");
                setBandwidth(data.bandwidth || "");
                setFile4_3_4(data.file4_3_4 ? 'true' : 'false');
                setEContentFacilities(data.e_content_facilities || "");
                setFile4_3_5_1(data.file4_3_5_1 ? 'true' : 'false');
                setFile4_3_5_2(data.file4_3_5_2 ? 'true' : 'false');
            }

        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="c-4-3">
            <h3>4.3 - IT Infrastructure</h3>
            <ul>
                <li>
                    <div className="c-4-3-det">
                        <h4>4.3.1 - Number of classrooms and seminar halls with ICT - enabled facilities such as LCD, smart board, Wi-Fi/LAN, audio, video
                            recording facilities during the year
                        </h4>
                    </div>
                    <input
                        type="number"
                        id="classrooms_and_seminarHalls"
                        value={classrooms_and_seminarhalls}
                        onChange={(e) => setClassroomsAndSeminarHalls(e.target.value)}
                    />
                    <div className="table-4-3-1">
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
                                    <td> {file4_3_1_1 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}

                                        Upload the data template</td>
                                    <td>
                                        <button onClick={() => downloadExcel('4.3.1.xlsx')}>Data Template</button>
                                    </td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file4_3_1_1"
                                            name="fileUpload"
                                            accept=".xls, .xlsx"
                                            onChange={(e) => setFile4_3_1_1(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx. File size: 6MB</td>
                                </tr>
                                <tr>
                                    <td> {file4_3_1_2 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}
                                        Upload relevant supporting documents</td>
                                    <td></td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file4_3_1_2"
                                            name="fileUpload"
                                            accept=".xls, .xlsx, .doc, .docx, .pdf"
                                            onChange={(e) => setFile4_3_1_2(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                        <button onClick={() => saveSection({ classrooms_and_seminarhalls, file4_3_1_1, file4_3_1_2 }, '4-3-1')}>Save</button>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="c-4-3-2">
                        <h4>4.3.2- Institution has an IT policy, makes appropriate budgetary provisions and updates its IT facilities including Wi-Fi facility</h4>
                        <div className="text-area">
                            <StyledTextArea
                                rows={5}
                                placeholder="Type the text here"
                                value={it_policy}
                                onChange={(e) => setItPolicy(e.target.value)}
                            />
                        </div>
                        <div className="table-4_3_2">
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
                                            {file4_3_2 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}
                                            Upload relevant supporting documents
                                        </td>
                                        <td></td>
                                        <td>
                                            <input
                                                type="file"
                                                id="file4_3_2"
                                                name="fileUpload"
                                                accept=".xls, .xlsx, .doc, .docx, .pdf"
                                                onChange={(e) => setFile4_3_2(e.target.files[0])}
                                            />
                                        </td>
                                        <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div>
                            <button onClick={() => saveSection({ it_policy, file4_3_2 }, '4-3-2')}>Save</button>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="c-4-3-3">
                        <h4>4.3.3 - Student - Computer ratio during the year</h4>
                        <ul>
                            <li>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Number of Students</th>
                                            <th>Number of computers available to students for academic purposes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><input
                                                type="number"
                                                id="number_of_students"
                                                value={number_of_students}
                                                onChange={(e) => setNumberOfStudents(e.target.value)}
                                            /></td>
                                            <td>
                                                <input
                                                    type="number"
                                                    id="number_of_computers"
                                                    value={number_of_computers}
                                                    onChange={(e) => setNumberOfComputers(e.target.value)}
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div>
                                <button onClick={() => saveSection({ number_of_students, number_of_computers }, '4-3-3')}>Save</button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    <div className="c-4-3-4">
                        <h4>4.3.4 - Available bandwidth of internet connection in the institution (Leased line)</h4>
                        <br />
                        <div className="radioBtn-1_4_1">
                            <input type="radio" id="all4_1_4_1" name="group1_4_1" onChange={() => setBandwidth('greater than 1GBPS')} />
                            <label htmlFor="all4_1_4_1">greater than 1GBPS</label>

                            <input type="radio" id="any3_1_4_1" name="group1_4_1" onChange={() => setBandwidth('500 MBPS - 1 GBPS')} />
                            <label htmlFor="any3_1_4_1">500 MBPS - 1 GBPS</label>

                            <input type="radio" id="any2_1_4_1" name="group1_4_1" onChange={() => setBandwidth('250 MBPS - 500 MBPS')} />
                            <label htmlFor="any2_1_4_1">250 MBPS - 500 MBPS</label>

                            <input type="radio" id="any1_1_4_1" name="group1_4_1" onChange={() => setBandwidth('50 MBPS - 250 MBPS')} />
                            <label htmlFor="any1_1_4_1">50 MBPS - 250 MBPS</label>

                            <input type="radio" id="none_1_4_1" name="group1_4_1" onChange={() => setBandwidth('less than 50 MBPS')} />
                            <label htmlFor="none_1_4_1">less than 50 MBPS</label>
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
                                    <td>
                                        {file4_3_4 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}
                                        Upload relevant supporting documents</td>
                                    <td></td>
                                    <td><input type="file" id="file4_3_4" onChange={(e) => setFile4_3_4(e.target.files[0])} name="fileUpload" accept=".xls, .xlsx, .doc, .docx, .pdf" /></td>
                                    <td>xls, xlsx, doc, docx, .pdf <b>File size: 6MB</b> </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                    <button onClick={() => saveSection({ bandwidth, file4_3_4}, '4-3-4')}>Save</button>
                    </div>
                </li>
                <li>
                    <div className="c-4-3-5">
                        <h4>4.3.5 - Institution has the following facilities for e-content devlopment</h4>
                        <ol>
                            <li>1. Media Centre</li>
                            <li>2. Audio visual centre</li>
                            <li>3. Lecture capturing system (LCS)</li>
                            <li>4. Mixing equipment's and softwares for editing</li>
                        </ol>
                        <br />
                        <div className="radioBtn-1_4_1">
                            <input type="radio" id="all4_1_4_1" name="group1_4_2" onChange={() => setEContentFacilities('All 4 of the above')} />
                            <label htmlFor="all4_1_4_1">All 4 of the above</label>

                            <input type="radio" id="any3_1_4_1" name="group1_4_2" onChange={() => setEContentFacilities('Any 3 of the above')} />
                            <label htmlFor="any3_1_4_1">Any 3 of the above</label>

                            <input type="radio" id="any2_1_4_1" name="group1_4_2" onChange={() => setEContentFacilities('Any 2 of the above')} />
                            <label htmlFor="any2_1_4_1">Any 2 of the above</label>

                            <input type="radio" id="any1_1_4_1" name="group1_4_2" onChange={() => setEContentFacilities('Any 1 of the above')} />
                            <label htmlFor="any1_1_4_1">Any 1 of the above</label>

                            <input type="radio" id="none_1_4_1" name="group1_4_2" onChange={() => setEContentFacilities('None of the above')} />
                            <label htmlFor="none_1_4_1">None of the above</label>
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
                                    <td>
                                        {file4_3_5_1 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}
                                        Upload relevant supporting documents</td>
                                    <td></td>
                                    <td><input type="file" id="file4_3_5_1" onChange={(e) => setFile4_3_5_1(e.target.files[0])} name="fileUpload" accept=".xls, .xlsx, .doc, .docx, .pdf" /></td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                                </tr>
                                <tr>
                                    <td>
                                        {file4_3_5_2 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}
                                        Upload the data template</td>
                                    <td><button onClick={() => downloadExcel('4.3.5.xlsx')}>Data Template</button></td>
                                    <td><input type="file" id="file4_3_5_2" onChange={(e) => setFile4_3_5_2(e.target.files[0])} name="fileUpload" accept=".xls, .xlsx" /></td>
                                    <td>xls, xlsx. <b>File size: 6MB</b> </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                    <button onClick={() => saveSection({ e_content_facilities, file4_3_5_1, file4_3_5_2 }, '4-4-5')}>Save</button>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Criteria43;
