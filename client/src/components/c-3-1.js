import React, { useState, useEffect } from "react";
import StyledTextArea from "./textArea";
import { saveAs } from 'file-saver';
import axios from "axios";
import '../css/criteria3.css';

const Criteria31 = ({onCrit31Data}) => {

    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');

    const [researchFacilities, setResearchFacilities] = useState("");
    const [file3_1_1, setFile3_1_1] = useState(null);

    const [seedMoney, setSeedMoney] = useState("");
    const [file3_1_2_1, setFile3_1_2_1] = useState(null);
    const [file3_1_2_2, setFile3_1_2_2] = useState(null);

    const [teachersFellowship, setTeachersFellowship] = useState("");
    const [file3_1_3_1, setFile3_1_3_1] = useState(null);
    const [file3_1_3_2, setFile3_1_3_2] = useState(null);

    const [fellowsEnrolled, setFellowsEnrolled] = useState("");
    const [file3_1_4_1, setFile3_1_4_1] = useState(null);
    const [file3_1_4_2, setFile3_1_4_2] = useState(null);

    const [feed_3_1_5_Type, setFeed_3_1_5_Type] = useState("");
    const [file3_1_5, setFile3_1_5] = useState(null);

    const [departmentNo, setDepartmentNo] = useState("");
    const [file3_1_6_1, setFile3_1_6_1] = useState(null);
    const [file3_1_6_2, setFile3_1_6_2] = useState(null);

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

    const saveSection3_1_1 = async () => {
        const formdata = new FormData();
    
        const sectionData = {
            department,
            academicYear,
            researchFacilities,
            file3_1_1
        };
    
        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }

        try {
            const response = await axios.post("https://naacserver.onrender.com/data/save3-1-1", formdata);
            console.log(response.data);
            alert("Saved Section 3.1.1 data successfully!");
        } catch (error) {
            console.error("Error saving Section 3.1.1 data:", error.message);
            alert("Failed to save Section 3.1.1 data. Please try again.");
        }
    };

    const saveSection3_1_2 = async () => {
        const formdata = new FormData();
    
        const sectionData = {
            department,
            academicYear,
            seedMoney,
            file3_1_2_1,
            file3_1_2_2
        };
    
        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }

        try {
            const response = await axios.post("https://naacserver.onrender.com/data/save3-1-2", formdata);
            console.log(response.data);
            alert("Saved Section 3.1.2 data successfully!");
        } catch (error) {
            console.error("Error saving Section 3.1.2 data:", error.message);
            alert("Failed to save Section 3.1.2 data. Please try again.");
        }
    };

    const saveSection3_1_3 = async () => {
        const formdata = new FormData();
    
        const sectionData = {
            department,
            academicYear,
            teachersFellowship,
            file3_1_3_1,
            file3_1_3_2
        };
    
        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }

        try {
            const response = await axios.post("https://naacserver.onrender.com/data/save3-1-3", formdata);
            console.log(response.data);
            alert("Saved Section 3.1.3 data successfully!");
        } catch (error) {
            console.error("Error saving Section 3.1.3 data:", error.message);
            alert("Failed to save Section 3.1.3 data. Please try again.");
        }
    };

    const saveSection3_1_4 = async () => {
        const formdata = new FormData();
    
        const sectionData = {
            department,
            academicYear,
            fellowsEnrolled,
            file3_1_4_1,
            file3_1_4_2
        };
    
        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }

        try {
            const response = await axios.post("https://naacserver.onrender.com/data/save3-1-4", formdata);
            console.log(response.data);
            alert("Saved Section 3.1.4 data successfully!");
        } catch (error) {
            console.error("Error saving Section 3.1.4 data:", error.message);
            alert("Failed to save Section 3.1.4 data. Please try again.");
        }
    };

    const saveSection3_1_5 = async () => {
        const formdata = new FormData();
    
        const sectionData = {
            department,
            academicYear,
            feed_3_1_5_Type,
            file3_1_5
        };
    
        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }

        try {
            const response = await axios.post("https://naacserver.onrender.com/data/save3-1-5", formdata);
            console.log(response.data);
            alert("Saved Section 3.1.5 data successfully!");
        } catch (error) {
            console.error("Error saving Section 3.1.5 data:", error.message);
            alert("Failed to save Section 3.1.5 data. Please try again.");
        }
    };

    const saveSection3_1_6 = async () => {
        const formdata = new FormData();
    
        const sectionData = {
            department,
            academicYear,
            departmentNo,
            file3_1_6_1,
            file3_1_6_2
        };
    
        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }

        try {
            const response = await axios.post("https://naacserver.onrender.com/data/save3-1-6", formdata);
            console.log(response.data);
            alert("Saved Section 3.1.6 data successfully!");
        } catch (error) {
            console.error("Error saving Section 3.1.6 data:", error.message);
            alert("Failed to save Section 3.1.6 data. Please try again.");
        }
    };

    useEffect(() => {
        const crit31 = {
            researchFacilities,
            file3_1_1,
            seedMoney,
            file3_1_2_1,
            file3_1_2_2,
            teachersFellowship,
            file3_1_3_1,
            file3_1_3_2,
            fellowsEnrolled,
            file3_1_4_1,
            file3_1_4_2,
            feed_3_1_5_Type,
            file3_1_5,
            departmentNo,
            file3_1_6_1,
            file3_1_6_2
        };
        onCrit31Data(crit31);
    },[researchFacilities,file3_1_1,seedMoney,file3_1_2_1,file3_1_2_2,teachersFellowship,file3_1_3_1,file3_1_3_2,
        fellowsEnrolled,file3_1_4_1,file3_1_4_2,feed_3_1_5_Type,file3_1_5,departmentNo,file3_1_6_1, file3_1_6_2])

    return (
        <div className="c-3-1">
            <h3>3.1 - Promotion Of Research and Facilities</h3>
            <ul>
                <li>
                    <div className="c-3_1_1">
                        <h4>3.1.1 - The institution Research facilities are frequently updated and there is well dedfined 
                            policy for promotion and research which is uploaded on the institutional website and implemented
                        </h4>
                    </div>
                    <div className="text-area">
                        <StyledTextArea
                            rows={5}
                            placeholder="Type the text here"
                            value={researchFacilities}
                            onChange={(e) => setResearchFacilities(e.target.value)}
                        />
                    </div>
                    <div className="table-3_1_1">
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
                                            id="file3_1_1"
                                            name="fileUpload"
                                            accept=".xls, .xlsx, .doc, .docx, .pdf"
                                            onChange={(e) => setFile3_1_1(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <button onClick={saveSection3_1_1}>Save</button>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="c-3_1_2">
                        <h4>3.1.2- The institution provides seed money to its teachers for research (amount INR in Lakhs )</h4>
                        <input
                            type="number"
                            id="seedMoney"
                            value={seedMoney}
                            onChange={(e) => setSeedMoney(e.target.value)}
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
                                        <button onClick={() => downloadExcel('3.1.2.xlsx')}>Data Template</button>
                                    </td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file3_1_2_1"
                                            name="fileUpload"
                                            accept=".xls, .xlsx"
                                            onChange={(e) => setFile3_1_2_1(e.target.files[0])}
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
                                            id="file3_1_2_2"
                                            name="fileUpload"
                                            accept=".xls, .xlsx, .doc, .docx, .pdf"
                                            onChange={(e) => setFile3_1_2_2(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <button onClick={saveSection3_1_2}>Save</button>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="c-3_1_3">
                        <h4>3.1.3 - Number of teachers receiving national/international fellowship/financial supported
                                by various agencies for advanced studies/research during the year
                        </h4>
                        <input
                            type="number"
                            id="teahcersFellowship"
                            value={teachersFellowship}
                            onChange={(e) => setTeachersFellowship(e.target.value)}
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
                                    <td>Upload the data template</td>
                                    <td>
                                        <button onClick={() => downloadExcel('3.1.3.xlsx')}>Data Template</button>
                                    </td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file3_1_3_1"
                                            name="fileUpload"
                                            accept=".xls, .xlsx"
                                            onChange={(e) => setFile3_1_3_1(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx. File size: 6MB</td>
                                </tr>
                                <tr>
                                    <td>Upload relevant supporting documents</td>
                                    <td></td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file3_1_3_2"
                                            name="fileUpload"
                                            accept=".xls, .xlsx, .doc, .docx, .pdf"
                                            onChange={(e) => setFile3_1_3_2(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <button onClick={saveSection3_1_3}>Save</button>
                    </div>
                </li>
                <li>
                    <div className="c-3_1_4">
                        <h4>
                            3.1.4 - Number of JRFs, SRFs, Post-Doctoral Fellows, Research Associates and other research
                            fellows enrolled in the institution during the year
                        </h4>
                        <input
                            type="number"
                            id="fellowsEnrolled"
                            value={fellowsEnrolled}
                            onChange={(e) => setFellowsEnrolled(e.target.value)}
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
                                    <td>Upload the data template</td>
                                    <td>
                                        <button onClick={() => downloadExcel('3.1.4.xlsx')}>Data Template</button>
                                    </td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file3_1_4_1"
                                            name="fileUpload"
                                            accept=".xls, .xlsx"
                                            onChange={(e) => setFile3_1_4_1(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx. File size: 6MB</td>
                                </tr>
                                <tr>
                                    <td>Upload relevant supporting documents</td>
                                    <td></td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file3_1_4_2"
                                            name="fileUpload"
                                            accept=".xls, .xlsx, .doc, .docx, .pdf"
                                            onChange={(e) => setFile3_1_4_2(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <button onClick={saveSection3_1_4}>Save</button>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="c-3_1_5">
                        <h4>
                            3.1.5 - Institution has the following facilities to support research    
                        </h4>
                        <ul>
                            <li>Central Instrumentation Centre</li>
                            <li>Animal House/Green House</li>
                            <li>Museum</li>
                            <li>Media Laboratory/Studios</li>
                            <li>Business Lab</li>
                            <li>Research/Statistical Databases</li>
                            <li>Moot Court</li>
                            <li>Theatre</li>
                            <li>Art Gallery</li>
                        </ul>
                        <div className="c_3_1_5-feedback">
                            <h4>Feedback processes of the institution may be classified as follows</h4>
                            <div className="radioBtn-feedback">
                                <input type="radio" id="feed_3_1_5_any_4" name="feed_3_1_5_group" onChange={() => setFeed_3_1_5_Type('A. Any 4 or more of the above')} />
                                <label htmlFor="feed_3_1_5_any_4">A. Any 4 or more of the above</label>

                                <input type="radio" id="feed_3_1_5_any_3" name="feed_3_1_5_group" onChange={() => setFeed_3_1_5_Type('B. Any 3 or more of the above')} />
                                <label htmlFor="feed_3_1_5_any_3">B. Any 3 or more of the above</label>

                                <input type="radio" id="feed_3_1_5_any_2" name="feed_3_1_5_group" onChange={() => setFeed_3_1_5_Type('C. Any 2 or more of the above')} />
                                <label htmlFor="feed_3_1_5_any_2">C. Any 2 or more of the above</label>

                                <input type="radio" id="feed_3_1_5_any_1" name="feed_3_1_5_group" onChange={() => setFeed_3_1_5_Type('D. Any 1 or more of the above')} />
                                <label htmlFor="feed_3_1_5_any_1">D. Any 1 or more of the above</label>

                                <input type="radio" id="feed_3_1_5_none" name="feed_3_1_5_group" onChange={() => setFeed_3_1_5_Type('E. None of the above')} />
                                <label htmlFor="feed_3_1_5_none">E. None of the above</label>
                            </div>
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
                                    <td>Upload relevant supporting documents</td>
                                    <td></td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file3_1_5"
                                            name="fileUpload"
                                            accept=".xls, .xlsx, .doc, .docx, .pdf"
                                            onChange={(e) => setFile3_1_5(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <button onClick={saveSection3_1_5}>Save</button>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="c-3-1-6">
                        <h4>
                            3.1.6 - Number of departments with UGC-SAP, CAS, DST-FIST, DBT, ICSSR and other recognitions
                            by national and international agencies during the year
                        </h4>
                        <input
                            type="number"
                            id="departmentNo"
                            value={departmentNo}
                            onChange={(e) => setDepartmentNo(e.target.value)}
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
                                    <td>Upload the data template</td>
                                    <td>
                                        <button onClick={() => downloadExcel('3.1.6.xlsx')}>Data Template</button>
                                    </td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file3_1_6_1"
                                            name="fileUpload"
                                            accept=".xls, .xlsx"
                                            onChange={(e) => setFile3_1_6_1(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx. File size: 6MB</td>
                                </tr>
                                <tr>
                                    <td>Upload relevant supporting documents</td>
                                    <td></td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file3_1_6_2"
                                            name="fileUpload"
                                            accept=".xls, .xlsx, .doc, .docx, .pdf"
                                            onChange={(e) => setFile3_1_6_2(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <button onClick={saveSection3_1_6}>Save</button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default Criteria31;
