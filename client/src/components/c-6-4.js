import React, { useState, useEffect } from "react";
import StyledTextArea from "./textArea";
import { saveAs } from 'file-saver';
import axios from "axios";
import '../css/criteria6.css';

const Criteria64 = ({ onCrit64Data }) => {

    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');
    const [text6_4_1, settext6_4_1] = useState("");
    const [file6_4_1, setFile6_4_1] = useState(null);

    const [data6_4_2, setdata6_4_2] = useState();
    const [file6_4_2_1, setFile6_4_2_1] = useState(null);
    const [file6_4_2_2, setFile6_4_2_2] = useState(null);

    const [data6_4_3, setdata6_4_3] = useState();
    const [file6_4_3_1, setFile6_4_3_1] = useState(null);
    const [file6_4_3_2, setFile6_4_3_2] = useState(null);

    const [text6_4_4, settext6_4_4] = useState("");
    const [file6_4_4, setFile6_4_4] = useState(null);

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
        const crit64 = {
            text6_4_1,
            file6_4_1,
            data6_4_2,
            file6_4_2_1,
            file6_4_2_2,
            data6_4_3,
            file6_4_3_1,
            file6_4_3_2,
            text6_4_4,
            file6_4_4
        };
        onCrit64Data(crit64);
    }, [text6_4_1, file6_4_1, data6_4_2, file6_4_2_1, file6_4_2_2, data6_4_3, file6_4_3_1, file6_4_3_2, text6_4_4, file6_4_4])

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

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://naacserver.onrender.com/data/fetchC6?department=${department}&academicYear=${academicYear}`);
            const data = response.data.data.criteria64;

            if (data) {
                settext6_4_1(data.text6_4_1 || '');
                setFile6_4_1(data.file6_4_1 ? 'true' : 'false');

                setdata6_4_2(data.data6_4_2 || '');
                setFile6_4_2_1(data.file6_4_2_1 ? 'true' : 'false');
                setFile6_4_2_2(data.file6_4_2_2 ? 'true' : 'false');

                setdata6_4_3(data.data6_4_3 || '');
                setFile6_4_3_1(data.file6_4_3_1 ? 'true' : 'false');
                setFile6_4_3_2(data.file6_4_3_2 ? 'true' : 'false');

                settext6_4_4(data.text6_4_4 || '');
                setFile6_4_4(data.file6_4_4 ? 'true' : 'false');
            }
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="c-6-4">
            <h3>6.4 - Financial Management and Resource Mobilization</h3>
            <div className="c-6-4-1">
                <h4>6.4.1 - Institutional strategies for mobilisation of funds and the optimal utilisation of resources</h4>
                <StyledTextArea
                    rows={5}
                    placeholder="Type the text here"
                    value={text6_4_1}
                    onChange={(e) => settext6_4_1(e.target.value)}
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
                                {file6_4_1 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}
                                Upload relevant supporting documents
                            </td>
                            <td></td>
                            <td>
                                <input
                                    type="file"
                                    id="file6_4_1"
                                    name="fileUpload"
                                    accept=".xls, .xlsx, .doc, .docx, .pdf"
                                    onChange={(e) => setFile6_4_1(e.target.files[0])}
                                />
                            </td>
                            <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button onClick={() => saveSection({ text6_4_1, file6_4_1 }, '6-4-1')}>Save</button>
                </div>
            </div>
            <div className="c-6-4-2">
                <h4>6.4.2 - Funds/Grants received from government bodies during the year
                    for various developments and maintenance of infrastructure (not covered under criteria III and V) (INR in Lakhs)
                </h4>

                <input
                    type="number"
                    id="data6_4_2"
                    value={data6_4_2}
                    onChange={(e) => setdata6_4_2(e.target.value)}
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
                                {file6_4_2_1 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}
                                Upload the data template</td>
                            <td><button onClick={() => downloadExcel('6.4.2.xlsx')}>Data Template</button></td>
                            <td>
                                <input
                                    type="file"
                                    id="fileUpload6_4_2_1"
                                    onChange={(e) => setFile6_4_2_1(e.target.files[0])}
                                    name="fileUpload"
                                    accept=".xls, .xlsx"
                                />
                            </td>
                            <td>xls, xlsx. File size: 6MB</td>
                        </tr>
                        <tr>
                            <td>
                                {file6_4_2_2 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}
                                Upload relevant supporting documents</td>
                            <td></td>
                            <td><input type="file" id="fileUpload6_4_2_2" onChange={(e) => setFile6_4_2_2(e.target.files[0])} name="fileUpload1" accept=".xls, .xlsx, .doc, .docx, .pdf" /></td>
                            <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button onClick={() => saveSection({ data6_4_2, file6_4_2_1, file6_4_2_2 }, '6-4-2')}>Save</button>
                </div>
            </div>
            <div className="c-6-4-3">
                <h4>6.4.3 - Funds/Grants received from non-government bodies, individuals, philanthrophists during the year
                    for various developments and maintenance of infrastructure (not covered under criteria III and V) (INR in Lakhs)
                </h4>

                <input
                    type="number"
                    id="data6_4_2"
                    value={data6_4_3}
                    onChange={(e) => setdata6_4_3(e.target.value)}
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
                                {file6_4_3_1 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}
                                Upload the data template</td>
                            <td><button onClick={() => downloadExcel('6.4.3.xlsx')}>Data Template</button></td>
                            <td>
                                <input
                                    type="file"
                                    id="fileUpload6_4_3_1"
                                    onChange={(e) => setFile6_4_3_1(e.target.files[0])}
                                    name="fileUpload"
                                    accept=".xls, .xlsx"
                                />
                            </td>
                            <td>xls, xlsx. File size: 6MB</td>
                        </tr>
                        <tr>
                            <td>
                                {file6_4_3_2 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}
                                Upload relevant supporting documents</td>
                            <td></td>
                            <td><input type="file" id="fileUpload6_4_3_2" onChange={(e) => setFile6_4_3_2(e.target.files[0])} name="fileUpload1" accept=".xls, .xlsx, .doc, .docx, .pdf" /></td>
                            <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button onClick={() => saveSection({ data6_4_3, file6_4_3_1, file6_4_3_2 }, '6-4-3')}>Save</button>
                </div>
            </div>
            <div className="c-6-4-4">
                <h4>6.4.4 - Institution conducts internal and external financial audits regularly</h4>
                <StyledTextArea
                    rows={5}
                    placeholder="Type the text here"
                    value={text6_4_4}
                    onChange={(e) => settext6_4_4(e.target.value)}
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
                                {file6_4_4 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}
                                Upload relevant supporting documents
                            </td>
                            <td></td>
                            <td>
                                <input
                                    type="file"
                                    id="file6_4_4"
                                    name="fileUpload"
                                    accept=".xls, .xlsx, .doc, .docx, .pdf"
                                    onChange={(e) => setFile6_4_4(e.target.files[0])}
                                />
                            </td>
                            <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button onClick={() => saveSection({ text6_4_4, file6_4_4 }, '6-4-4')}>Save</button>
                </div>
            </div>
        </div>
    );
};

export default Criteria64;
