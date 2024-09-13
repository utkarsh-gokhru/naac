import React, { useState, useEffect } from "react";
import StyledTextArea from "./textArea";
import { saveAs } from 'file-saver';
import axios from "axios";
import '../css/criteria6.css';

const Criteria63 = ({ onCrit63Data }) => {


    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');
    const [text6_3_1, settext6_3_1] = useState("");
    const [data6_3_2, setdata6_3_2] = useState("");
    const [data6_3_3, setdata6_3_3] = useState("");
    const [data6_3_4, setdata6_3_4] = useState("");
    const [file6_3_1, setFile6_3_1] = useState(null);
    const [file6_3_2_1, setFile6_3_2_1] = useState(null);
    const [file6_3_2_2, setFile6_3_2_2] = useState(null);
    const [file6_3_3_1, setFile6_3_3_1] = useState(null);
    const [file6_3_3_2, setFile6_3_3_2] = useState(null);
    const [file6_3_4_1, setFile6_3_4_1] = useState(null);
    const [file6_3_4_2, setFile6_3_4_2] = useState(null);


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
        const crit63 = {
            text6_3_1,
            file6_3_1,
            data6_3_2,
            file6_3_2_1,
            file6_3_2_2,
            data6_3_3,
            file6_3_3_1,
            file6_3_3_2,
            data6_3_4,
            file6_3_4_1,
            file6_3_4_2
        };
        onCrit63Data(crit63);
    },[text6_3_1,
        file6_3_1,
        data6_3_2,
        file6_3_2_1,
        file6_3_2_2,
        data6_3_3,
        file6_3_3_1,
        file6_3_3_2,
        data6_3_4,
        file6_3_4_1,
        file6_3_4_2])



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
            const data = response.data.data.criteria63;

            if (data) {
                settext6_3_1(data.text6_3_1 ? data.text6_3_1 : '');
                setdata6_3_2(data.data6_3_2 ? data.data6_3_2 : '');
                setdata6_3_3(data.data6_3_3 ? data.data6_3_3 : '');
                setdata6_3_4(data.data6_3_4 ? data.data6_3_4 : '');
            }
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return(
        <div className="c-6-3">
            <h3>6.3 - Faculty Empowerment Strategies </h3>

        <div className="c-6-3-1">
            <h4>6.3.1 - The institution has a performance appraisal system, promotional avenues and effective welfare measures for teaching and non teaching staff.</h4>
            <StyledTextArea
                                rows={5}
                                placeholder="Type the text here"
                                value={text6_3_1}
                                onChange={(e) => settext6_3_1(e.target.value)}
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
                                            id="file6_3_1"
                                            name="fileUpload"
                                            accept=".xls, .xlsx, .doc, .docx, .pdf"
                                            onChange={(e) => setFile6_3_1(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <button onClick={() => saveSection({text6_3_1,file6_3_1},'6-3-1')}>Save</button>
                        </div>
                        </div>

                        <div className="c-6-3-2">
                            <h4>6.3.2 - Total number of teachers provided with financial suport to attend conferences / workshops and towards membership fee of professional bodies during the year. </h4>

                            <input
                            type="number"
                            id="data6_3_2"
                            value={data6_3_2}
                            onChange={(e) => setdata6_3_2(e.target.value)}
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
                                        Upload the data template
                                    </td>
                                    <td>
                                        <button onClick={() => downloadExcel('6.3.2.xlsx')}>Data Template</button>
                                    </td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file6_3_2_1"
                                            name="fileUpload"
                                            accept=".xls, .xlsx"
                                            onChange={(e) => setFile6_3_2_1(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx. File size: 6MB</td>
                                </tr>
                                <tr>
                                    <td>
                                        Upload relevant supporting documents
                                    </td>
                                    <td></td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file6_3_2_2"
                                            name="fileUpload"
                                            accept=".xls, .xlsx, .doc, .docx, .pdf"
                                            onChange={(e) => setFile6_3_2_2(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                        <button onClick={() => saveSection({data6_3_2,file6_3_2_1, file6_3_2_2},'6-3-2')}>Save</button>
                        </div>
                        </div>

                        <div className="c-6-3-3">
                            <h4>6.3.3 - Number of professional devlopment / administrative training Programmes organized by the institutionfor teaching and non-teaching staff during the year </h4>

                            <input
                            type="number"
                            id="data6_3_3"
                            value={data6_3_3}
                            onChange={(e) => setdata6_3_3(e.target.value)}
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
                                        Upload the data template
                                    </td>
                                    <td>
                                        <button onClick={() => downloadExcel('6.3.3.xlsx')}>Data Template</button>
                                    </td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file6_3_3_1"
                                            name="fileUpload"
                                            accept=".xls, .xlsx"
                                            onChange={(e) => setFile6_3_3_1(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx. File size: 6MB</td>
                                </tr>
                                <tr>
                                    <td>
                                        Upload relevant supporting documents
                                    </td>
                                    <td></td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file6_3_3_2"
                                            name="fileUpload"
                                            accept=".xls, .xlsx, .doc, .docx, .pdf"
                                            onChange={(e) => setFile6_3_3_2(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                        <button onClick={() => saveSection({data6_3_3,file6_3_3_1, file6_3_3_2},'6-3-3')}>Save</button>
                        </div>
                        </div>

                        <div className="c-6-3-4">
                            <h4>6.3.4 - Total number of teachers undergoing online/ face-to-face Faculty Development Programmes (FDP) during the year (Professional Development Programmes, Orientation / Induction Programmes Refresher Course, Short Term Course)</h4>

                            <input
                            type="number"
                            id="data6_3_4"
                            value={data6_3_4}
                            onChange={(e) => setdata6_3_4(e.target.value)}
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
                                        Upload the data template
                                    </td>
                                    <td>
                                        <button onClick={() => downloadExcel('6.3.4.xlsx')}>Data Template</button>
                                    </td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file6_3_4_1"
                                            name="fileUpload"
                                            accept=".xls, .xlsx"
                                            onChange={(e) => setFile6_3_4_1(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx. File size: 6MB</td>
                                </tr>
                                <tr>
                                    <td>
                                        Upload relevant supporting documents
                                    </td>
                                    <td></td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file6_3_4_2"
                                            name="fileUpload"
                                            accept=".xls, .xlsx, .doc, .docx, .pdf"
                                            onChange={(e) => setFile6_3_4_2(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <button onClick={() => saveSection({data6_3_4,file6_3_4_1, file6_3_4_2},'6-3-4')}>Save</button>
                        </div>
                        </div>



        </div>
    )

}

export default Criteria63;
