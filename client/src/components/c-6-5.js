import React, { useState, useEffect } from "react";
import StyledTextArea from "./textArea";
import { saveAs } from 'file-saver';
import axios from "axios";
import '../css/criteria6.css';

const Criteria65 = ({ onCrit65Data }) => {

    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');
    const [text6_5_1, settext6_5_1] = useState("");
    const [file6_5_1, setFile6_5_1] = useState(null);

    const [data6_5_2, setdata6_5_2] = useState("");
    const [file6_5_2_1, setFile6_5_2_1] = useState(null);
    const [file6_5_2_2, setFile6_5_2_2] = useState(null);

    const [text6_5_3, settext6_5_3] = useState("");
    const [file6_5_3, setFile6_5_3] = useState(null);




    const saveSection6_5_1 = async () => {
        const formdata = new FormData();

        const sectionData = {
            department,
            academicYear,
            text6_5_1,
            file6_5_1
        };

        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }

        try {
            const response = await axios.post("https://naacserver.onrender.com/data/save6-5-1", formdata);
            console.log(response.data);
            alert("Saved Section 6.5.1 data successfully!");
        } catch (error) {
            console.error("Error saving Section 6.5.1 data:", error.message);
            alert("Failed to save Section 6.5.1 data. Please try again.");
        }
    };

    const saveSection6_5_2 = async () => {
        const formdata = new FormData();

        const sectionData = {
            department,
            academicYear,
            data6_5_2,
            file6_5_2_1,
            file6_5_2_2
        };

        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }

        try {
            const response = await axios.post("https://naacserver.onrender.com/data/save6-5-2", formdata);
            console.log(response.data);
            alert("Saved Section 6.5.2 data successfully!");
        } catch (error) {
            console.error("Error saving Section 6.5.2 data:", error.message);
            alert("Failed to save Section 6.5.2 data. Please try again.");
        }
    };

    const saveSection6_5_3 = async () => {
        const formdata = new FormData();

        const sectionData = {
            department,
            academicYear,
            text6_5_3,
            file6_5_3
        };

        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }

        try {
            const response = await axios.post("https://naacserver.onrender.com/data/save6-5-3", formdata);
            console.log(response.data);
            alert("Saved Section 6.5.2 data successfully!");
        } catch (error) {
            console.error("Error saving Section 6.5.3 data:", error.message);
            alert("Failed to save Section 6.5.3 data. Please try again.");
        }
    };

    useEffect(() => {
        const crit65 = {
            text6_5_1,
            file6_5_1,
            data6_5_2,
            file6_5_2_1,
            file6_5_2_2,
            text6_5_3,
            file6_5_3
        };
        onCrit65Data(crit65);
    }, [text6_5_1, file6_5_1, data6_5_2, file6_5_2_1, file6_5_2_2, text6_5_3, file6_5_3])

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
            const data = response.data.data.criteria65;

            if (data) {
                settext6_5_1(data.text6_5_1 ? data.text6_5_1 : '');
                setdata6_5_2(data.data6_5_2 ? data.data6_5_2 : '');
                settext6_5_3(data.data6_5_3 ? data.data6_5_3 : '');
            }
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="c-6-5">
            <h3>6.5 - Internal Quality Assurance System</h3>
            <div className="c-6-5-1">
                <h4>6.5.1 - Internal Quality Assurance Cell (IQAC) has contributed significantly for institutionalizing
                    the quality assurance strategies and processes by constantly reviewing the teaching learning process
                    , structures & methodologies of operations and learning outcomes at periodic intervals
                </h4>
                <StyledTextArea
                    rows={5}
                    placeholder="Type the text here"
                    value={text6_5_1}
                    onChange={(e) => settext6_5_1(e.target.value)}
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
                                Upload relevant supporting documents
                            </td>
                            <td></td>
                            <td>
                                <input
                                    type="file"
                                    id="file6_5_1"
                                    name="fileUpload"
                                    accept=".xls, .xlsx, .doc, .docx, .pdf"
                                    onChange={(e) => setFile6_5_1(e.target.files[0])}
                                />
                            </td>
                            <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button onClick={saveSection6_5_1}>Save</button>
                </div>
            </div>
            <div className="c-6-5-2">
                <h4>6.5.2 - Institution has adopted the following for Quality assurance
                    <ol>
                        <li>Academic Administration Audit (AAA) and follow up action taken</li>
                        <li>Conferences, Seminars, Workshops on quality conducted</li>
                        <li>Collaborative quality initiatives with other institution(s)</li>
                        <li>Orientation programme on quality issues for teachers and students</li>
                        <li>Participation in NIRF</li>
                        <li>Any other quality audit recognized by state, national or international agencies (ISO certification, NBA)</li>
                    </ol>
                </h4>
                <div className="radioBtn-1_4_1">
                    <input type="radio" id="all4_1_4_1" name="group1_4_1" onChange={() => setdata6_5_2('Any 5 or all of the above')} />
                    <label htmlFor="all4_1_4_1">Any 5 or all of the above</label>

                    <input type="radio" id="all4_1_4_1" name="group1_4_1" onChange={() => setdata6_5_2('Any 4 of the above')} />
                    <label htmlFor="all4_1_4_1">Any 4 of the above</label>

                    <input type="radio" id="any3_1_4_1" name="group1_4_1" onChange={() => setdata6_5_2('Any 3 of the above')} />
                    <label htmlFor="any3_1_4_1">Any 3 of the above</label>

                    <input type="radio" id="any2_1_4_1" name="group1_4_1" onChange={() => setdata6_5_2('Any 2 of the above')} />
                    <label htmlFor="any2_1_4_1">Any 2 of the above</label>

                    <input type="radio" id="any1_1_4_1" name="group1_4_1" onChange={() => setdata6_5_2('Any 1 of the above')} />
                    <label htmlFor="any1_1_4_1">Any 1 of the above</label>
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
                                Upload the data template</td>
                            <td><button onClick={() => downloadExcel('6.5.2.xlsx')}>Data Template</button></td>
                            <td>
                                <input
                                    type="file"
                                    id="fileUpload6_5_2_1"
                                    onChange={(e) => setFile6_5_2_1(e.target.files[0])}
                                    name="fileUpload"
                                    accept=".xls, .xlsx"
                                />
                            </td>
                            <td>xls, xlsx. File size: 6MB</td>
                        </tr>
                        <tr>
                            <td>
                                Upload relevant supporting documents</td>
                            <td></td>
                            <td><input type="file" id="fileUpload6_5_2_2" onChange={(e) => setFile6_5_2_2(e.target.files[0])} name="fileUpload1" accept=".xls, .xlsx, .doc, .docx, .pdf" /></td>
                            <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button onClick={saveSection6_5_2}>Save</button>
                </div>
            </div>
            <div className="c-6-5-3">
                <h4>6.5.3 - Incremental improvements made for the preceding during the year
                    with regard to quality (in case of first cycle) Post accredition quality initiatives (second and subsequent cycles)
                </h4>
                <StyledTextArea
                    rows={5}
                    placeholder="Type the text here"
                    value={text6_5_3}
                    onChange={(e) => settext6_5_3(e.target.value)}
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
                                Upload relevant supporting documents
                            </td>
                            <td></td>
                            <td>
                                <input
                                    type="file"
                                    id="file6_5_3"
                                    name="fileUpload"
                                    accept=".xls, .xlsx, .doc, .docx, .pdf"
                                    onChange={(e) => setFile6_5_3(e.target.files[0])}
                                />
                            </td>
                            <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button onClick={saveSection6_5_3}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default Criteria65;
