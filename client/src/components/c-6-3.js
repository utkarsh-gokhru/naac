import React, { useState, useEffect } from "react";
import StyledTextArea from "./textArea";
import { saveAs } from 'file-saver';
import axios from "axios";
import '../css/criteria6.css';

const Criteria63 = ({ onCrit63Data }) => {


    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');
    const [text6_3_1, settext6_3_1] = useState("");
    const [data_6_3_2, setdata_6_3_2] = useState("");
    const [data_6_3_3, setdata_6_3_3] = useState("");
    const [data_6_3_4, setdata_6_3_4] = useState("");
    const [file6_3_1, setFile6_3_1] = useState(null);
    const [file6_3_2_1, setFile6_3_2_1] = useState(null);
    const [file6_3_2_2, setFile6_3_2_2] = useState(null);
    const [file6_3_3_1, setFile6_3_3_1] = useState(null);
    const [file6_3_3_2, setFile6_3_3_2] = useState(null);
    const [file6_3_4_1, setFile6_3_4_1] = useState(null);
    const [file6_3_4_2, setFile6_3_4_2] = useState(null);




    const saveSection6_3_1 = async () => {
        const formdata = new FormData();
    
        const sectionData = {
            department,
            academicYear,
            text6_3_1,
            file6_3_1
        };
    
        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }

        try {
            const response = await axios.post("https://naacserver.onrender.com/data/save6-3-1", formdata);
            console.log(response.data);
            alert("Saved Section 6.3.1 data successfully!");
        } catch (error) {
            console.error("Error saving Section 6.3.1 data:", error.message);
            alert("Failed to save Section 6.3.1 data. Please try again.");
        }
    };

    const saveSection6_3_2 = async () => {
        const formdata = new FormData();
    
        const sectionData = {
            department,
            academicYear,
            data_6_3_2,
            file6_3_2_1,
            file6_3_2_2
        };
    
        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }

        try {
            const response = await axios.post("https://naacserver.onrender.com/data/save6-3-2", formdata);
            console.log(response.data);
            alert("Saved Section 6.3.2 data successfully!");
        } catch (error) {
            console.error("Error saving Section 6.3.2 data:", error.message);
            alert("Failed to save Section 6.3.2 data. Please try again.");
        }
    };

    const saveSection6_3_3 = async () => {
        const formdata = new FormData();
    
        const sectionData = {
            department,
            academicYear,
            data_6_3_3,
            file6_3_3_1,
            file6_3_3_2
        };
    
        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }

        try {
            const response = await axios.post("https://naacserver.onrender.com/data/save6-3-3", formdata);
            console.log(response.data);
            alert("Saved Section 6.3.3 data successfully!");
        } catch (error) {
            console.error("Error saving Section 6.3.3 data:", error.message);
            alert("Failed to save Section 6.3.3 data. Please try again.");
        }
    };

    const saveSection6_3_4 = async () => {
        const formdata = new FormData();
    
        const sectionData = {
            department,
            academicYear,
            data_6_3_4,
            file6_3_4_1,
            file6_3_4_2
        };
    
        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }

        try {
            const response = await axios.post("https://naacserver.onrender.com/data/save6-3-4", formdata);
            console.log(response.data);
            alert("Saved Section 6.3.4 data successfully!");
        } catch (error) {
            console.error("Error saving Section 6.3.4 data:", error.message);
            alert("Failed to save Section 6.3.4 data. Please try again.");
        }
    };

    useEffect(() => {
        const crit63 = {
            text6_3_1,
            file6_3_1,
            data_6_3_2,
            file6_3_2_1,
            file6_3_2_2,
            data_6_3_3,
            file6_3_3_1,
            file6_3_3_2,
            data_6_3_4,
            file6_3_4_1,
            file6_3_4_2
        };
        onCrit63Data(crit63);
    },[text6_3_1,
        file6_3_1,
        data_6_3_2,
        file6_3_2_1,
        file6_3_2_2,
        data_6_3_3,
        file6_3_3_1,
        file6_3_3_2,
        data_6_3_4,
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
            const response = await axios.get(`https://naacserver.onrender.com/data/fetchC4?department=${department}&academicYear=${academicYear}`);
            const data = response.data.data.criteria63;

            if (data) {
                settext_6_3_1(data.text_6_3_1 ? data.text_6_3_1 : '');
                setdata_6_3_2(data.data_6_3_2 ? data.data_6_3_2 : '');
                setdata_6_3_3(data.data_6_3_3 ? data.data_6_3_3 : '');
                setdata_6_3_4(data.data_6_3_4 ? data.data_6_3_4 : '');
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
                            <button onClick={() => saveSection6_3_1({text6_3_1,file6_3_1},'6-3-1')}>Save</button>
                        </div>
                        </div>

                        <div className="c-6-3-2">
                            <h4>6.3.2 - Total number of teachers provided with financial suport to attend conferences / workshops and towards membership fee of professional bodies during the year. </h4>

                            <input
                            type="number"
                            id="data_6_3_2"
                            value={data_6_3_2}
                            onChange={(e) => setdata_6_3_2(e.target.value)}
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
                            <button onClick={saveSection6_3_2}>Save</button>
                        </div>
                        </div>

                        <div className="c-6-3-3">
                            <h4>6.3.3 - Number of professional devlopment / administrative training Programmes organized by the institutionfor teaching and non-teaching staff during the year </h4>

                            <input
                            type="number"
                            id="data_6_3_3"
                            value={data_6_3_3}
                            onChange={(e) => setdata_6_3_3(e.target.value)}
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
                            <button onClick={saveSection6_3_3}>Save</button>
                        </div>
                        </div>

                        <div className="c-6-3-4">
                            <h4>6.3.4 - Total number of teachers undergoing online/ face-to-face Faculty Development Programmes (FDP) during the year (Professional Development Programmes, Orientation / Induction Programmes Refresher Course, Short Term Course)</h4>

                            <input
                            type="number"
                            id="data_6_3_4"
                            value={data_6_3_4}
                            onChange={(e) => setdata_6_3_4(e.target.value)}
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
                            <button onClick={saveSection6_3_4}>Save</button>
                        </div>
                        </div>



        </div>
    )

}

export default Criteria63;
