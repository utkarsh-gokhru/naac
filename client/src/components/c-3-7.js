import React, { useState, useEffect } from "react";
import { saveAs } from 'file-saver';
import axios from "axios";

const Criteria37 = ({onCrit37Data}) => {

    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');

    const [collAct, setCollAct] = useState(0);
    const [file3_7_1_1, setFile3_7_1_1] = useState(null);
    const [file3_7_1_2, setFile3_7_1_2] = useState(null);
    const [functionalMOUs, setFunctionalMOUs] = useState(0);
    const [file3_7_2_1, setFile3_7_2_1] = useState(null);
    const [file3_7_2_2, setFile3_7_2_2] = useState(null);

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

    const saveSection3_7_1 = async () => {
        const formdata = new FormData();
    
        const sectionData = {
            department,
            academicYear,
            collAct,
            file3_7_1_1,
            file3_7_1_2
        };
    
        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }

        try {
            const response = await axios.post("https://naacserver.onrender.com/data/save3-7-1", formdata);
            console.log(response.data);
            alert("Saved Section 3.7.1 data successfully!");
        } catch (error) {
            console.error("Error saving Section 3.7.1 data:", error.message);
            alert("Failed to save Section 3.7.1 data. Please try again.");
        }
    };

    const saveSection3_7_2 = async () => {
        const formdata = new FormData();
    
        const sectionData = {
            department,
            academicYear,
            functionalMOUs,
            file3_7_2_1,
            file3_7_2_2
        };
    
        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }

        try {
            const response = await axios.post("https://naacserver.onrender.com/data/save3-7-2", formdata);
            console.log(response.data);
            alert("Saved Section 3.7.2 data successfully!");
        } catch (error) {
            console.error("Error saving Section 3.7.2 data:", error.message);
            alert("Failed to save Section 3.7.2 data. Please try again.");
        }
    };

    useEffect(() => {
        const crit37 = {
            collAct,
            file3_7_1_1,
            file3_7_1_2,
            functionalMOUs,
            file3_7_2_1,
            file3_7_2_2
        };
        onCrit37Data(crit37);
    }, [collAct,file3_7_1_1,file3_7_1_2,functionalMOUs,file3_7_2_1,file3_7_2_2])

    return (
        <div className="c-3-7">
            <h3>3.7 - Collaboration</h3>
            <ul>
                <li>
                    <div className="c-3_7_1">
                        <h4>3.7.1 - Number of collaborative activities with other instituions/research establishment/
                            industry for research and acadmec development of faculty and students during the year
                        </h4>
                        <ul>
                            <li>
                                <h4>3.7.1.1 - Total number of collaborative activities with other instituions/research establishment/
                                    industry for research and acadmec development of faculty and students during the year
                                </h4>
                                <input
                                type="number"
                                id="collAct"
                                value={collAct}
                                onChange={(e) => setCollAct(e.target.value)}
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
                                                Upload the data template</td>
                                            <td>
                                                <button onClick={() => downloadExcel('3.7.1.xlsx')}>Data Template</button>
                                            </td>
                                            <td>
                                                <input
                                                    type="file"
                                                    id="file3_7_1_1"
                                                    name="fileUpload"
                                                    accept=".xls, .xlsx"
                                                    onChange={(e) => setFile3_7_1_1(e.target.files[0])}
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
                                                    id="file3_7_1_2"
                                                    name="fileUpload"
                                                    accept=".xls, .xlsx, .doc, .docx, .pdf"
                                                    onChange={(e) => setFile3_7_1_2(e.target.files[0])}
                                                />
                                            </td>
                                            <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div>
                                    <button onClick={saveSection3_7_1}>Save</button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    <div className="c-3_7_2">
                        <h4>3.7.2- Number of functional MOUs with instituions/industries in India and abroad 
                            for internship, on-the job training, project work, student/faculty exchange and collaborative
                            research during the year 
                        </h4>
                        <input
                        type="number"
                        id="functionalMOUs"
                        value={functionalMOUs}
                        onChange={(e) => setFunctionalMOUs(e.target.value)}
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
                                        <button onClick={() => downloadExcel('3.7.2.xlsx')}>Data Template</button>
                                    </td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file3_7_2_1"
                                            name="fileUpload"
                                            accept=".xls, .xlsx"
                                            onChange={(e) => setFile3_7_2_1(e.target.files[0])}
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
                                            id="file3_7_2_2"
                                            name="fileUpload"
                                            accept=".xls, .xlsx, .doc, .docx, .pdf"
                                            onChange={(e) => setFile3_7_2_2(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <button onClick={saveSection3_7_2}>Save</button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default Criteria37;
