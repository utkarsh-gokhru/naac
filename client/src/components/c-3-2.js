import React, { useState, useEffect } from "react";
import { saveAs } from 'file-saver';
import axios from "axios";

const Criteria32 = ({onCrit32Data}) => {

    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');

    const [extraFunding, setExtraFunding] = useState("");
    const [file3_2_1_1, setFile3_2_1_1] = useState(null);
    const [file3_2_1_2, setFile3_2_1_2] = useState(null);

    const [grants, setGrants] = useState("");
    const [file3_2_2_1, setFile3_2_2_1] = useState(null);
    const [file3_2_2_2, setFile3_2_2_2] = useState(null);

    const [teacherResearchProjects, setTeacherResearchProjects] = useState("");
    const [file3_2_3_1, setFile3_2_3_1] = useState(null);
    const [file3_2_3_2, setFile3_2_3_2] = useState(null);

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

    const saveSection3_2_1 = async () => {
        const formdata = new FormData();
    
        const sectionData = {
            department,
            academicYear,
            extraFunding,
            file3_2_1_1,
            file3_2_1_2
        };
    
        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }

        try {
            const response = await axios.post("https://naacserver.onrender.com/data/save3-2-1", formdata);
            console.log(response.data);
            alert("Saved Section 3.2.1 data successfully!");
        } catch (error) {
            console.error("Error saving Section 3.2.1 data:", error.message);
            alert("Failed to save Section 3.2.1 data. Please try again.");
        }
    };

    const saveSection3_2_2 = async () => {
        const formdata = new FormData();
    
        const sectionData = {
            department,
            academicYear,
            grants,
            file3_2_2_1,
            file3_2_2_2
        };
    
        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }

        try {
            const response = await axios.post("https://naacserver.onrender.com/data/save3-2-2", formdata);
            console.log(response.data);
            alert("Saved Section 3.2.2 data successfully!");
        } catch (error) {
            console.error("Error saving Section 3.2.1 data:", error.message);
            alert("Failed to save Section 3.2.1 data. Please try again.");
        }
    };

    const saveSection3_2_3 = async () => {
        const formdata = new FormData();
    
        const sectionData = {
            department,
            academicYear,
            teacherResearchProjects,
            file3_2_3_1,
            file3_2_3_2
        };
    
        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }

        try {
            const response = await axios.post("https://naacserver.onrender.com/data/save3-2-3", formdata);
            console.log(response.data);
            alert("Saved Section 3.2.1 data successfully!");
        } catch (error) {
            console.error("Error saving Section 3.2.3 data:", error.message);
            alert("Failed to save Section 3.2.1 data. Please try again.");
        }
    };

    useEffect(() => {
        const crit32 = {
            extraFunding,
            file3_2_1_1,
            file3_2_1_2,
            grants,
            file3_2_2_1,
            file3_2_2_2,
            teacherResearchProjects,
            file3_2_3_1,
            file3_2_3_2
        };
        onCrit32Data(crit32);
    },[extraFunding,file3_2_1_1,file3_2_1_2,grants,file3_2_2_1,file3_2_2_2,teacherResearchProjects,file3_2_3_1,file3_2_3_2])

    return (
        <div className="c-3-2">
            <h3>3.2 - Resource Mobilization for Research</h3>
            <ul>
                <li>
                    <div className="c-3-2-1">
                        <h4>
                            3.2.1 - Extramural funding for Research (Grants sponsored by the non-government sources
                            such as industry, corporate houses, international bodies for research projects) endowments, 
                            Chairs in the University during the year (INR in Lakhs)
                        </h4>
                        <input
                            type="number"
                            id="extraFunding"
                            value={extraFunding}
                            onChange={(e) => setExtraFunding(e.target.value)}
                        />
                    </div>
                    <div className="table-3_2_1">
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
                                        <button onClick={() => downloadExcel('3.2.1.xlsx')}>Data Template</button>
                                    </td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file3_2_1_1"
                                            name="fileUpload"
                                            accept=".xls, .xlsx"
                                            onChange={(e) => setFile3_2_1_1(e.target.files[0])}
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
                                            id="file3_2_1_2"
                                            name="fileUpload"
                                            accept=".xls, .xlsx, .doc, .docx, .pdf"
                                            onChange={(e) => setFile3_2_1_2(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <button onClick={saveSection3_2_1}>Save</button>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="c-3_2_2">
                        <h4>3.2.2- Grants for research projects sponsored by the government agencies during the year (INR in Lakhs)</h4>
                        <input
                            type="number"
                            id="grants"
                            value={grants}
                            onChange={(e) => setGrants(e.target.value)}
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
                                        <button onClick={() => downloadExcel('3.2.2.xlsx')}>Data Template</button>
                                    </td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file3_2_2_1"
                                            name="fileUpload"
                                            accept=".xls, .xlsx"
                                            onChange={(e) => setFile3_2_2_1(e.target.files[0])}
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
                                            id="file3_2_2_2"
                                            name="fileUpload"
                                            accept=".xls, .xlsx, .doc, .docx, .pdf"
                                            onChange={(e) => setFile3_2_2_2(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <button onClick={saveSection3_2_2}>Save</button>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="c-3_2_3">
                        <h4>3.2.3 - Number of research projects per teacher funded by government and non-government agencies during the year</h4>
                        <input
                            type="number"
                            id="teacherResearchProjects"
                            value={teacherResearchProjects}
                            onChange={(e) => setTeacherResearchProjects(e.target.value)}
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
                                        <button onClick={() => downloadExcel('3.2.3.xlsx')}>Data Template</button>
                                    </td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file3_2_3_1"
                                            name="fileUpload"
                                            accept=".xls, .xlsx"
                                            onChange={(e) => setFile3_2_3_1(e.target.files[0])}
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
                                            id="file3_2_3_2"
                                            name="fileUpload"
                                            accept=".xls, .xlsx, .doc, .docx, .pdf"
                                            onChange={(e) => setFile3_2_3_2(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <button onClick={saveSection3_2_3}>Save</button>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default Criteria32;
