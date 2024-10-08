import React, { useState, useEffect } from 'react'
import StyledTextArea from "./textArea";
import { saveAs } from 'file-saver';
import axios from "axios";


export const Criteria24 = ({ onCrit24Data }) => {

    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');
    const [full_time_teachers, setfull_time_teachers] = useState("");
    const [full_time_teachers_phd_etc, setfull_time_teachers_phd_etc] = useState("");
    const [award_rec_teachers, setaward_rec_teachers] = useState("");
    const [total_exp, settotal_exp] = useState("");
    const [file2_4_1_1, setfile2_4_1_1] = useState(null);
    const [file2_4_1_2, setfile2_4_1_2] = useState(null);
    const [file2_4_2_1, setfile2_4_2_1] = useState(null);
    const [file2_4_2_2, setfile2_4_2_2] = useState(null);
    const [file2_4_3_1, setfile2_4_3_1] = useState(null);
    const [file2_4_3_2, setfile2_4_3_2] = useState(null);
    const [file2_4_4_1, setfile2_4_4_1] = useState(null);
    const [file2_4_4_2, setfile2_4_4_2] = useState(null);

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
        const crit24 = {
            full_time_teachers,
            file2_4_1_1,
            file2_4_1_2,
            full_time_teachers_phd_etc,
            file2_4_2_1,
            file2_4_2_2,
            total_exp,
            file2_4_3_1,
            file2_4_3_2,
            award_rec_teachers,
            file2_4_4_1,
            file2_4_4_2
        };

        onCrit24Data(crit24);
    }, [full_time_teachers, file2_4_1_1, file2_4_1_2, full_time_teachers_phd_etc, file2_4_2_1, file2_4_2_2, total_exp, file2_4_3_1, file2_4_3_2, award_rec_teachers, file2_4_4_1, file2_4_4_2]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://naacserver.onrender.com/data/fetchC2?department=${department}&academicYear=${academicYear}`);
            const data = response.data.data.criteria24;

            if (data) {
                setfull_time_teachers(data.full_time_teachers ? data.full_time_teachers : '');
                setfull_time_teachers_phd_etc(data.full_time_teachers_phd_etc ? data.full_time_teachers_phd_etc : '');
                setaward_rec_teachers(data.award_rec_teachers ? data.award_rec_teachers : '');
                settotal_exp(data.total_exp ? data.total_exp : '');
                setfile2_4_1_1(data.file2_4_1_1 ? 'true' : 'false');
                setfile2_4_1_2(data.file2_4_1_2 ? 'true' : 'false');
                setfile2_4_2_1(data.file2_4_2_1 ? 'true' : 'false');
                setfile2_4_2_2(data.file2_4_2_2 ? 'true' : 'false');
                setfile2_4_3_1(data.file2_4_3_1 ? 'true' : 'false');
                setfile2_4_3_2(data.file2_4_3_2 ? 'true' : 'false');
                setfile2_4_4_1(data.file2_4_4_1 ? 'true' : 'false');
                setfile2_4_4_2(data.file2_4_4_2 ? 'true' : 'false');
            }
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div class='c-2-4'>
            <h3>2.4 - Teacher Profile and Quality</h3>
            <br></br>

            <h4>2.4.1 • Total Number of full time teachers against sanctioned posts during the year</h4>
            <br></br>

            <input
                type="number"
                id="full_time_teachers"
                value={full_time_teachers}
                onChange={(e) => setfull_time_teachers(e.target.value)}
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
                        <td> {file2_4_1_1 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}

                            Upload the data template</td>
                        <td>
                            <button onClick={() => downloadExcel('2.4.1.xlsx')}>Data Template</button>
                        </td>
                        <td>
                            <input
                                type="file"
                                id="file2_4_1_1"
                                name="fileUpload"
                                accept=".xls, .xlsx"
                                onChange={(e) => setfile2_4_1_1(e.target.files[0])}
                            />
                        </td>
                        <td>xls, xlsx. File size: 6MB</td>
                    </tr>
                    <tr>
                        <td> {file2_4_1_2 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}
                            Upload relevant supporting documents</td>
                        <td></td>
                        <td>
                            <input
                                type="file"
                                id="file2_4_1_2"
                                name="fileUpload"
                                accept=".xls, .xlsx, .doc, .docx, .pdf"
                                onChange={(e) => setfile2_4_1_2(e.target.files[0])}
                            />
                        </td>
                        <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
                    </tr>
                </tbody>
            </table>
            <div>
            <button onClick={() => saveSection({ full_time_teachers, file2_4_1_1, file2_4_1_2 }, '2-4-1')}>Save</button>
            </div>
            <br></br>
            <br></br>

            <h3>2.4.2 • Total Number of full time teachers withPhO.tO.MtM.Ch.'O.N.O Sc.OLit. during the year<br></br>policy during the year (Excluding Supernumerary Seats)</h3>
            <br></br>
            <br></br>

            <input
                type="number"
                id="full_time_teachers_phd_etc"
                value={full_time_teachers_phd_etc}
                onChange={(e) => setfull_time_teachers_phd_etc(e.target.value)}
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
                        <td> {file2_4_2_1 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}

                            Upload the data template</td>
                        <td>
                            <button onClick={() => downloadExcel('2.4.2.xlsx')}>Data Template</button>
                        </td>
                        <td>
                            <input
                                type="file"
                                id="file2_4_2_1"
                                name="fileUpload"
                                accept=".xls, .xlsx"
                                onChange={(e) => setfile2_4_2_1(e.target.files[0])}
                            />
                        </td>
                        <td>xls, xlsx. File size: 6MB</td>
                    </tr>
                    <tr>
                        <td> {file2_4_2_2 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}
                            Upload relevant supporting documents</td>
                        <td></td>
                        <td>
                            <input
                                type="file"
                                id="file2_4_2_2"
                                name="fileUpload"
                                accept=".xls, .xlsx, .doc, .docx, .pdf"
                                onChange={(e) => setfile2_4_2_2(e.target.files[0])}
                            />
                        </td>
                        <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
                    </tr>
                </tbody>
            </table>
            <div>
            <button onClick={() => saveSection({ full_time_teachers_phd_etc, file2_4_2_1, file2_4_2_2 }, '2-4-2')}>Save</button>
            </div>
            <br></br>

            <div>
                <h3>2.4.3 Total teaching experience of full time teachers in tho same institution during the year</h3>

                <h3>2.4.3.1 Total experience of full time teachers</h3>

                <input
                    type="number"
                    id="total_exp"
                    value={total_exp}
                    onChange={(e) => settotal_exp(e.target.value)}
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
                            <td> {file2_4_3_1 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}

                                Upload the data template</td>
                            <td>
                                <button onClick={() => downloadExcel('2.4.2.xlsx')}>Data Template</button>
                            </td>
                            <td>
                                <input
                                    type="file"
                                    id="file2_4_3_1"
                                    name="fileUpload"
                                    accept=".xls, .xlsx"
                                    onChange={(e) => setfile2_4_3_1(e.target.files[0])}
                                />
                            </td>
                            <td>xls, xlsx. File size: 6MB</td>
                        </tr>
                        <tr>
                            <td> {file2_4_3_2 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}
                                Upload relevant supporting documents</td>
                            <td></td>
                            <td>
                                <input
                                    type="file"
                                    id="file2_4_3_2"
                                    name="fileUpload"
                                    accept=".xls, .xlsx, .doc, .docx, .pdf"
                                    onChange={(e) => setfile2_4_3_2(e.target.files[0])}
                                />
                            </td>
                            <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
                        </tr>
                    </tbody>
                </table>
                <div>
                <button onClick={() => saveSection({ total_exp, file2_4_3_1, file2_4_3_2 }, '2-4-3')}>Save</button>
                </div>
                <br></br>
            </div>
            <h3>2.4.4 • Total number Of full erne teachers who received awards, recognition, fellowships at State, National, International level from
                GovernmentlG0vt. recognised bodies during the year</h3>

            <input
                type="number"
                id="award_rec_teachers"
                value={award_rec_teachers}
                onChange={(e) => setaward_rec_teachers(e.target.value)}
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
                        <td> {file2_4_4_1 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}

                            Upload the data template</td>
                        <td>
                            <button onClick={() => downloadExcel('2.4.1.xlsx')}>Data Template</button>
                        </td>
                        <td>
                            <input
                                type="file"
                                id="file2_4_4_1"
                                name="fileUpload"
                                accept=".xls, .xlsx"
                                onChange={(e) => setfile2_4_4_1(e.target.files[0])}
                            />
                        </td>
                        <td>xls, xlsx. File size: 6MB</td>
                    </tr>
                    <tr>
                        <td> {file2_4_4_2 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}
                            Upload relevant supporting documents</td>
                        <td></td>
                        <td>
                            <input
                                type="file"
                                id="file2_4_4_2"
                                name="fileUpload"
                                accept=".xls, .xlsx, .doc, .docx, .pdf"
                                onChange={(e) => setfile2_4_4_2(e.target.files[0])}
                            />
                        </td>
                        <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
                    </tr>
                </tbody>
            </table>
            <div>
            <button onClick={() => saveSection({ award_rec_teachers, file2_4_4_1, file2_4_4_2 }, '2-4-4')}>Save</button>
            </div>
            <br></br>
        </div>
    )
}

export default Criteria24;