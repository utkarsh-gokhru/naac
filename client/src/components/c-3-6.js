import React, { useState, useEffect } from "react";
import StyledTextArea from "./textArea";
import { saveAs } from 'file-saver';
import axios from "axios";

const Criteria36 = ({onCrit36Data}) => {

    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');

    const [extensionActText, setExtensionActText] = useState("");
    const [file3_6_1, setFile3_6_1] = useState(null);
    const [file3_6_2_1, setFile3_6_2_1] = useState(null);
    const [file3_6_2_2, setFile3_6_2_2] = useState(null);
    const [extActAwards, setExtActAwards] = useState(0);
    const [outreachPrograms, setOutreachPrograms] = useState(0);
    const [file3_6_3_1, setFile3_6_3_1] = useState(null);
    const [file3_6_3_2, setFile3_6_3_2] = useState(null);
    const [participatingStudents, setParticipatingStudents] = useState(0);
    const [file3_6_4_1, setFile3_6_4_1] = useState(null);
    const [file3_6_4_2, setFile3_6_4_2] = useState(null);

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

    const saveSection3_6_1 = async () => {
        const formdata = new FormData();
    
        const sectionData = {
            department,
            academicYear,
            extensionActText,
            file3_6_1
        };
    
        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }

        try {
            const response = await axios.post("https://naacserver.onrender.com/data/save3-6-1", formdata);
            console.log(response.data);
            alert("Saved Section 3.6.1 data successfully!");
        } catch (error) {
            console.error("Error saving Section 3.6.1 data:", error.message);
            alert("Failed to save Section 3.6.1 data. Please try again.");
        }
    };

    const saveSection3_6_2 = async () => {
        const formdata = new FormData();
    
        const sectionData = {
            department,
            academicYear,
            extActAwards,
            file3_6_2_1,
            file3_6_2_2
        };
    
        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }

        try {
            const response = await axios.post("https://naacserver.onrender.com/data/save3-6-2", formdata);
            console.log(response.data);
            alert("Saved Section 3.6.2 data successfully!");
        } catch (error) {
            console.error("Error saving Section 3.6.2 data:", error.message);
            alert("Failed to save Section 3.6.2 data. Please try again.");
        }
    };

    const saveSection3_6_3 = async () => {
        const formdata = new FormData();
    
        const sectionData = {
            department,
            academicYear,
            outreachPrograms,
            file3_6_3_1,
            file3_6_3_2
        };
    
        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }

        try {
            const response = await axios.post("https://naacserver.onrender.com/data/save3-6-3", formdata);
            console.log(response.data);
            alert("Saved Section 3.6.3 data successfully!");
        } catch (error) {
            console.error("Error saving Section 3.6.3 data:", error.message);
            alert("Failed to save Section 3.6.3 data. Please try again.");
        }
    };

    const saveSection3_6_4 = async () => {
        const formdata = new FormData();
    
        const sectionData = {
            department,
            academicYear,
            participatingStudents,
            file3_6_4_1,
            file3_6_4_2
        };
    
        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }

        try {
            const response = await axios.post("https://naacserver.onrender.com/data/save3-6-4", formdata);
            console.log(response.data);
            alert("Saved Section 3.6.4 data successfully!");
        } catch (error) {
            console.error("Error saving Section 3.6.4 data:", error.message);
            alert("Failed to save Section 3.6.4 data. Please try again.");
        }
    };

    useEffect(() => {
        const crit36 = {
            extensionActText,
            file3_6_1,
            file3_6_2_1,
            file3_6_2_2,
            extActAwards,
            outreachPrograms,
            file3_6_3_1,
            file3_6_3_2,
            participatingStudents,
            file3_6_4_1,
            file3_6_4_2
        };
        onCrit36Data(crit36);
    },[extensionActText,file3_6_1,file3_6_2_1,file3_6_2_2,extActAwards,outreachPrograms,file3_6_3_1,file3_6_3_2,participatingStudents,file3_6_4_1,file3_6_4_2])

    return (
        <div className="c-3-6">
            <h3>3.6 - Extension Activities</h3>
            <ul>
                <li>
                    <div className="c-3_6_1">
                        <h4>3.6.1 - Extension activities in the neighbourhood community in terms of impact and sensitising 
                            students to social issues and holistic development during the year
                        </h4>
                    </div>
                    <div className="text-area">
                        <StyledTextArea
                            rows={5}
                            placeholder="Type the text here"
                            value={extensionActText}
                            onChange={(e) => setExtensionActText(e.target.value)}
                        />
                    </div>
                    <div className="table-3_6_1">
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
                                            id="file3_6_1"
                                            name="fileUpload"
                                            accept=".xls, .xlsx, .doc, .docx, .pdf"
                                            onChange={(e) => setFile3_6_1(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <button onClick={saveSection3_6_1}>Save</button>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="c-3_6_2">
                        <h4>3.6.2- Number of awards received by the instituion,its teachers and students from 
                            Government/Government recognised bodies in recognition of the extension activities carried out 
                            during the year
                        </h4>
                        <ul>
                            <li>
                                <h4>
                                    3.6.2.1- Total number of awards and recognition received for extension activities from 
                                    Government/Government recognisd bodies during the year
                                </h4>
                                <input
                                type="number"
                                id="extActAwards"
                                value={extActAwards}
                                onChange={(e) => setExtActAwards(e.target.value)}
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
                                                <button onClick={() => downloadExcel('3.6.2.xlsx')}>Data Template</button>
                                            </td>
                                            <td>
                                                <input
                                                    type="file"
                                                    id="file3_6_2_1"
                                                    name="fileUpload"
                                                    accept=".xls, .xlsx"
                                                    onChange={(e) => setFile3_6_2_1(e.target.files[0])}
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
                                                    id="file3_6_2_2"
                                                    name="fileUpload"
                                                    accept=".xls, .xlsx, .doc, .docx, .pdf"
                                                    onChange={(e) => setFile3_6_2_2(e.target.files[0])}
                                                />
                                            </td>
                                            <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </li>
                        </ul>
                        <div>
                            <button onClick={saveSection3_6_2}>Save</button>
                        </div>
                    </div>
                </li>
                <li>
                    <h4> 
                        3.6.3 - Number of extension and outreach programs conducted by the institution including those
                        NSS/NCC/Red Cross/YRC during the year (including Government initiated programs such as Swachh
                        Bharat, Aids Awareness, Gender issues, etc. and those organised in collaboration with industry
                        ,community and NGOs)
                    </h4>
                    <input
                    type="number"
                    id="outreachPrograms"
                    value={outreachPrograms}
                    onChange={(e) => setOutreachPrograms(e.target.value)}
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
                                    <button onClick={() => downloadExcel('3.6.3.xlsx')}>Data Template</button>
                                </td>
                                <td>
                                    <input
                                        type="file"
                                        id="file3_6_3_1"
                                        name="fileUpload"
                                        accept=".xls, .xlsx"
                                        onChange={(e) => setFile3_6_3_1(e.target.files[0])}
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
                                        id="file3_6_3_2"
                                        name="fileUpload"
                                        accept=".xls, .xlsx, .doc, .docx, .pdf"
                                        onChange={(e) => setFile3_6_3_2(e.target.files[0])}
                                    />
                                </td>
                                <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <button onClick={saveSection3_6_3}>Save</button>
                    </div>
                </li>
                <li>
                    <h4> 
                        3.6.4 - Total number of students participating in extension activities listed at 3.6.3 above 
                        during the year 
                    </h4>
                    <input
                    type="number"
                    id="participatingStudents"
                    value={participatingStudents}
                    onChange={(e) => setParticipatingStudents(e.target.value)}
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
                                    <button onClick={() => downloadExcel('3.6.4.xlsx')}>Data Template</button>
                                </td>
                                <td>
                                    <input
                                        type="file"
                                        id="file3_6_4_1"
                                        name="fileUpload"
                                        accept=".xls, .xlsx"
                                        onChange={(e) => setFile3_6_4_1(e.target.files[0])}
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
                                        id="file3_6_4_2"
                                        name="fileUpload"
                                        accept=".xls, .xlsx, .doc, .docx, .pdf"
                                        onChange={(e) => setFile3_6_4_2(e.target.files[0])}
                                    />
                                </td>
                                <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <button onClick={saveSection3_6_4}>Save</button>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default Criteria36;
