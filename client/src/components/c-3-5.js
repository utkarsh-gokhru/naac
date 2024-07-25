import React, { useState, useEffect } from "react";
import StyledTextArea from "./textArea";
import { saveAs } from 'file-saver';
import axios from "axios";

const Criteria35 = ({onCrit35Data}) => {

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

    const saveSection3_5_1 = async () => {
        const formdata = new FormData();
    
        const sectionData = {
            department,
            academicYear,
            consultancyText,
            file3_5_1
        };
    
        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }

        try {
            const response = await axios.post("https://naacserver.onrender.com/data/save3-5-1", formdata);
            console.log(response.data);
            alert("Saved Section 3.5.1 data successfully!");
        } catch (error) {
            console.error("Error saving Section 3.5.1 data:", error.message);
            alert("Failed to save Section 3.5.1 data. Please try again.");
        }
    };

    const saveSection3_5_2 = async () => {
        const formdata = new FormData();
    
        const sectionData = {
            department,
            academicYear,
            consultancyRev,
            file3_5_2_1,
            file3_5_2_2
        };
    
        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }

        try {
            const response = await axios.post("https://naacserver.onrender.com/data/save3-5-2", formdata);
            console.log(response.data);
            alert("Saved Section 3.5.2 data successfully!");
        } catch (error) {
            console.error("Error saving Section 3.5.2 data:", error.message);
            alert("Failed to save Section 3.5.2 data. Please try again.");
        }
    };

    useEffect(() => {
        const crit35 = {
            consultancyText,
            consultancyRev,
            file3_5_1,
            file3_5_2_1,
            file3_5_2_2
        };
        onCrit35Data(crit35);
    },[consultancyText,consultancyRev,file3_5_1,file3_5_2_1,file3_5_2_2])

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
                            <button onClick={saveSection3_5_1}>Save</button>
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
                            <button onClick={saveSection3_5_2}>Save</button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default Criteria35;
