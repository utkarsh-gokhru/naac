import React, { useState, useEffect } from "react";
import StyledTextArea from "./textArea";
import { saveAs } from 'file-saver';
import axios from "axios";

const Criteria35 = ({ onCrit35Data }) => {

    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');

    const [consultancyText, setConsultancyText] = useState("");
    const [consultancyRev, setConsultancyRev] = useState("");
    const [file3_5_1, setFile3_5_1] = useState(null);
    const [file3_5_2_1, setFile3_5_2_1] = useState(null);
    const [file3_5_2_2, setFile3_5_2_2] = useState(null);

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
        const crit35 = {
            consultancyText,
            consultancyRev,
            file3_5_1,
            file3_5_2_1,
            file3_5_2_2
        };
        onCrit35Data(crit35);
    }, [consultancyText, consultancyRev, file3_5_1, file3_5_2_1, file3_5_2_2])

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://naacserver.onrender.com/data/fetchC3?department=${department}&academicYear=${academicYear}`);
            const data = response.data.data.criteria35;

            if (data) {
                setConsultancyText(data.consultancyText ? data.consultancyText : '');
                setConsultancyRev(data.consultancyRev ? data.consultancyRev : '');
                setFile3_5_1(data.file3_5_1 ? 'true' : 'false');
                setFile3_5_2_1(data.file3_5_2_1 ? 'true' : 'false');
                setFile3_5_2_2(data.file3_5_2_2 ? 'true' : 'false');
            }
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="c-3-5">
            <h3>3.5 - Consultancy</h3>
            <ul>
                <li>
                    <div className="c-3_5_1">
                        <h4>3.5.1 - Instution has a policy of consultancy including revenue sharing between the institution and the
                            individual and encourages its faculty to undertake consultancy
                        </h4>
                    </div>
                    <div className="text-area">
                        <StyledTextArea
                            rows={5}
                            placeholder="Type the text here"
                            value={consultancyText}
                            onChange={(e) => setConsultancyText(e.target.value)}
                        />
                    </div>
                    <div className="table-3_5_1">
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
                                        {file3_5_1 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}
                                        Upload relevant supporting documents
                                    </td>
                                    <td></td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file3_5_1"
                                            name="fileUpload"
                                            accept=".xls, .xlsx, .doc, .docx, .pdf"
                                            onChange={(e) => setFile3_5_1(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                        <button onClick={() => saveSection({ consultancyText, file3_5_1 }, '3-5-1')}>Save</button>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="c-3_5_2">
                        <h4>3.5.2- Revenue genrated from consultancy and corporate training during the year</h4>
                        <ul>
                            <li>
                                <h4>3.5.2.1- Total amount genrated from consultancy and corporate training during the year (INR in Lakhs)</h4>
                                <input
                                    type="number"
                                    id="consultancyRev"
                                    value={consultancyRev}
                                    onChange={(e) => setConsultancyRev(e.target.value)}
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
                                                {file3_5_2_1 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}
                                                Upload the data template</td>
                                            <td>
                                                <button onClick={() => downloadExcel('3.5.2.xlsx')}>Data Template</button>
                                            </td>
                                            <td>
                                                <input
                                                    type="file"
                                                    id="file3_5_2_1"
                                                    name="fileUpload"
                                                    accept=".xls, .xlsx"
                                                    onChange={(e) => setFile3_5_2_1(e.target.files[0])}
                                                />
                                            </td>
                                            <td>xls, xlsx. File size: 6MB</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                {file3_5_2_2 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}
                                                Upload relevant supporting documents</td>
                                            <td></td>
                                            <td>
                                                <input
                                                    type="file"
                                                    id="file3_5_2_2"
                                                    name="fileUpload"
                                                    accept=".xls, .xlsx, .doc, .docx, .pdf"
                                                    onChange={(e) => setFile3_5_2_2(e.target.files[0])}
                                                />
                                            </td>
                                            <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </li>
                        </ul>
                        <div>
                        <button onClick={() => saveSection({ consultancyRev, file3_5_2_1, file3_5_2_2 }, '3-5-2')}>Save</button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default Criteria35;
