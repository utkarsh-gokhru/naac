import React, { useState, useEffect } from "react";
import StyledTextArea from "./textArea";
import axios from "axios";
import '../css/criteria6.css';

const Criteria61 = ({ onCrit61Data }) => {

    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');
    const [text6_1_1, setText6_1_1] = useState("");
    const [text6_1_2, setText6_1_2] = useState("");
    const [file6_1_1, setFile6_1_1] = useState(null);
    const [file6_1_2, setFile6_1_2] = useState(null);

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

            try {
                const response = await axios.post(`https://naacserver.onrender.com/data/save${section}`, formData);
                console.log(response.data);
                alert(`Saved Section ${section} data successfully!`);
            } catch (error) {
                console.error(`Error saving Section ${section} data:`, error.message);
                alert(`Failed to save Section ${section} data. Please try again.`);
            }
        }
    };

    useEffect(() => {
        const crit61 = {
            text6_1_1,
            file6_1_1,
            text6_1_2,
            file6_1_2,
        };
        onCrit61Data(crit61);
    }, [text6_1_1, file6_1_1, text6_1_2, file6_1_2]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://naacserver.onrender.com/data/fetchC6?department=${department}&academicYear=${academicYear}`);
            const data = response.data.data.criteria61;

            if (data) {
                setText6_1_1(data.text6_1_1 || '');
                setText6_1_2(data.text6_1_2 || '');
                setFile6_1_1(data.file6_1_1 ? 'true' : 'false');
                setFile6_1_2(data.file6_1_2 ? 'true' : 'false');
            }
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="c-6-1">
            <h3>6.1 - Institutional Vision and Leadership</h3>

            <div className="c-6-1-1">
                <h4>6.1.1 - The institution has a clearly stated vision and mission which are reflected in its academic and administrative governance.</h4>

                <StyledTextArea
                    rows={5}
                    placeholder="Type the text here"
                    value={text6_1_1}
                    onChange={(e) => setText6_1_1(e.target.value)}
                />
                <table>
                    <thead>
                        <tr>
                            <th>File Description</th>
                            <th>Documents</th>
                            <th>File Types/Size Supported</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                {file6_1_1 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}
                                Upload relevant supporting documents
                            </td>
                            <td></td>
                            <td>
                                <input
                                    type="file"
                                    id="file6_1_1"
                                    name="fileUpload"
                                    accept=".xls, .xlsx, .doc, .docx, .pdf"
                                    onChange={(e) => setFile6_1_1(e.target.files[0])}
                                />
                            </td>
                            <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button onClick={() => saveSection({ text6_1_1, file6_1_1 }, '6-1-1')}>Save</button>
                </div>
            </div>

            <div className="c-6-1-2">
                <h4>6.1.2 - The effective leadership is reflected in various institutional practices such as decentralization and participative management. </h4>

                <StyledTextArea
                    rows={5}
                    placeholder="Type the text here"
                    value={text6_1_2}
                    onChange={(e) => setText6_1_2(e.target.value)}
                />
                <table>
                    <thead>
                        <tr>
                            <th>File Description</th>
                            <th>Documents</th>
                            <th>File Types/Size Supported</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                {file6_1_2 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}
                                Upload relevant supporting documents
                            </td>
                            <td></td>
                            <td>
                                <input
                                    type="file"
                                    id="file6_1_2"
                                    name="fileUpload"
                                    accept=".xls, .xlsx, .doc, .docx, .pdf"
                                    onChange={(e) => setFile6_1_2(e.target.files[0])}
                                />
                            </td>
                            <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button onClick={() => saveSection({ text6_1_2, file6_1_2 }, '6-1-2')}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default Criteria61;

