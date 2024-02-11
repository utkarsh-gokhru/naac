import React, { useState, useEffect } from "react";
import StyledTextArea from "./textArea";
import { saveAs } from 'file-saver';
import axios from "axios";

const Criteria33 = ({onCrit33Data}) => {

    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');

    const [ecosystemText, setEcosystemText] = useState("");
    const [file3_3_1, setFile3_3_1] = useState(null);
    const [seminars, setSeminars] = useState(0);
    const [totalSeminars, setTotalSeminars] = useState(0);
    const [file3_3_2_1, setFile3_3_2_1] = useState(null);
    const [file3_3_2_2, setFile3_3_2_2] = useState(null);
    const [awards, setAwards] = useState(0);
    const [file3_3_3_1, setFile3_3_3_1] = useState(null);
    const [file3_3_3_2, setFile3_3_3_2] = useState(null);

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

    const saveSection3_3_1 = async () => {
        const formdata = new FormData();
    
        const sectionData = {
            department,
            academicYear,
            ecosystemText,
            file3_3_1
        };
    
        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }

        try {
            const response = await axios.post("https://naacserver.onrender.com/data/save3-3-1", formdata);
            console.log(response.data);
            alert("Saved Section 3.3.1 data successfully!");
        } catch (error) {
            console.error("Error saving Section 3.3.1 data:", error.message);
            alert("Failed to save Section 3.3.1 data. Please try again.");
        }
    };

    const saveSection3_3_2 = async () => {
        const formdata = new FormData();
    
        const sectionData = {
            department,
            academicYear,
            seminars,
            totalSeminars,
            file3_3_2_1,
            file3_3_2_2
        };
    
        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }

        try {
            const response = await axios.post("https://naacserver.onrender.com/data/save3-3-2", formdata);
            console.log(response.data);
            alert("Saved Section 3.3.2 data successfully!");
        } catch (error) {
            console.error("Error saving Section 3.3.2 data:", error.message);
            alert("Failed to save Section 3.3.2 data. Please try again.");
        }
    };

    const saveSection3_3_3 = async () => {
        const formdata = new FormData();
    
        const sectionData = {
            department,
            academicYear,
            awards,
            file3_3_3_1,
            file3_3_3_2
        };
    
        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }

        try {
            const response = await axios.post("https://naacserver.onrender.com/data/save3-3-3", formdata);
            console.log(response.data);
            alert("Saved Section 3.3.3 data successfully!");
        } catch (error) {
            console.error("Error saving Section 3.3.3 data:", error.message);
            alert("Failed to save Section 3.3.3 data. Please try again.");
        }
    };

    useEffect(() => {
        const crit33 = {
            ecosystemText,
            file3_3_1,
            seminars,
            totalSeminars,
            file3_3_2_1,
            file3_3_2_2,
            awards,
            file3_3_3_1,
            file3_3_3_2
        };
        onCrit33Data(crit33);
    },[ecosystemText,file3_3_1,seminars,totalSeminars,file3_3_2_1,file3_3_2_2,awards,file3_3_3_1,file3_3_3_2])

    return (
        <div className="c-3-3">
            <h3>3.3 - Innovation Ecosystem</h3>
            <ul>
                <li>
                    <div className="c-3_3_1">
                        <h4>3.3.1 - Institution has created an eco-system for innovation including incubation
                          centre and other inititatives for creation and transfer of knowledge  
                        </h4>
                        <div className="text-area">
                            <StyledTextArea
                                rows={5}
                                placeholder="Type the text here"
                                value={ecosystemText}
                                onChange={(e) => setEcosystemText(e.target.value)}
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
                                    <td>
                                        Upload relevant supporting documents
                                    </td>
                                    <td></td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file3_3_1"
                                            name="fileUpload"
                                            accept=".xls, .xlsx, .doc, .docx, .pdf"
                                            onChange={(e) => setFile3_3_1(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <button onClick={saveSection3_3_1}>Save</button>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="c-3_3_2">
                        <h4>3.3.2 - Number of seminars/workshops conducted on Research Methodology,
                            Intellectual Property Rights (IPR), Entrepreneurship and Skill Development during the year
                        </h4>
                        <input
                            type="number"
                            id="seminars"
                            value={seminars}
                            onChange={(e) => setSeminars(e.target.value)}
                        />
                        <ul>
                            <li>
                                <h4>3.3.2.1 - Number of seminars/workshops conducted on Research Methodology,
                                Intellectual Property Rights (IPR), Entrepreneurship and Skill Development year wise during the year
                                </h4>
                            <input
                                type="number"
                                id="totaslSeminars"
                                value={totalSeminars}
                                onChange={(e) => setTotalSeminars(e.target.value)}
                            />
                            </li>
                        </ul>
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
                                    <td><button onClick={() => downloadExcel('3.3.2.xlsx')}>Data Template</button></td>
                                    <td><input type="file" id="file3_3_2_1" onChange={(e) => setFile3_3_2_1(e.target.files[0])} name="fileUpload" accept=".xls, .xlsx" /></td>
                                    <td>xls, xlsx. File size: 6MB</td>
                                </tr>
                                <tr>
                                    <td>
                                        Upload relevant supporting documents</td>
                                    <td></td>
                                    <td><input type="file" id="file3_3_2_2" onChange={(e) => setFile3_3_2_2(e.target.files[0])} name="fileUpload2" accept=".xls, .xlsx, .doc, .docx, .pdf" /></td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <button onClick={saveSection3_3_2}>Save</button>
                    </div>
                </li>
                <li>
                <div className="c-3_3_3">
                        <h4>3.3.3 - Number of awards/recogntions received for research/innovation by the
                            institution/teachers/research scholars/students during the year
                        </h4>
                        <ul>
                            <li>
                                <h4>3.3.3.1 - Number of awards/recogntions received for research/innovation by the
                                    institution/teachers/research scholars/students year wise during the year
                                </h4>
                            <input
                                type="number"
                                id="awards"
                                value={awards}
                                onChange={(e) => setAwards(e.target.value)}
                            />
                            </li>
                        </ul>
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
                                    <td><button onClick={() => downloadExcel('3.3.3.xlsx')}>Data Template</button></td>
                                    <td><input type="file" id="fileUpload3_3_3_1" onChange={(e) => setFile3_3_3_1(e.target.files[0])} name="fileUpload" accept=".xls, .xlsx" /></td>
                                    <td>xls, xlsx. File size: 6MB</td>
                                </tr>
                                <tr>
                                    <td>
                                        Upload relevant supporting documents</td>
                                    <td></td>
                                    <td><input type="file" id="fileUpload3_3_3_2" onChange={(e) => setFile3_3_3_2(e.target.files[0])} name="fileUpload2" accept=".xls, .xlsx, .doc, .docx, .pdf" /></td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <button onClick={saveSection3_3_3}>Save</button>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default Criteria33;
