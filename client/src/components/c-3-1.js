import React, { useState, useEffect } from "react";
import StyledTextArea from "./textArea";
import { saveAs } from 'file-saver';
import axios from "axios";
import '../css/criteria3.css';

const Criteria31 = ({ onCrit31Data }) => {

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
        }
        try {
            const response = await axios.post(`http://localhost:5000/data/save${section}`, formData);
            console.log(response.data);
            alert(`Saved Section ${section} data`);
        } catch (error) {
            console.log("Error", error.message);
        }
    }

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
    }, [researchFacilities, file3_1_1, seedMoney, file3_1_2_1, file3_1_2_2, teachersFellowship, file3_1_3_1, file3_1_3_2, fellowsEnrolled, file3_1_4_1, file3_1_4_2, feed_3_1_5_Type, file3_1_5, departmentNo, file3_1_6_1, file3_1_6_2]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://naacserver.onrender.com/data/fetchC3?department=${department}&academicYear=${academicYear}`);
            const data = response.data.data.criteria31;

            if (data) {
                setResearchFacilities(data.researchFacilities ? data.researchFacilities : '');
                setFile3_1_1(data.file3_1_1 ? 'true' : 'false');

                setSeedMoney(data.seedMoney ? data.seedMoney : '');
                setFile3_1_2_1(data.file3_1_2_1 ? 'true' : 'false');
                setFile3_1_2_2(data.file3_1_2_2 ? 'true' : 'false');

                setTeachersFellowship(data.teachersFellowship ? data.teachersFellowship : '');
                setFile3_1_3_1(data.file3_1_3_1 ? 'true' : 'false');
                setFile3_1_3_2(data.file3_1_3_2 ? 'true' : 'false');

                setFellowsEnrolled(data.fellowsEnrolled ? data.fellowsEnrolled : '');
                setFile3_1_4_1(data.file3_1_4_1 ? 'true' : 'false');
                setFile3_1_4_2(data.file3_1_4_2 ? 'true' : 'false');

                setFeed_3_1_5_Type(data.feed_3_1_5_Type ? data.feed_3_1_5_Type : '');
                setFile3_1_5(data.file3_1_5 ? 'true' : 'false');

                setDepartmentNo(data.departmentNo ? data.departmentNo : '');
                setFile3_1_6_1(data.file3_1_6_1 ? 'true' : 'false');
                setFile3_1_6_2(data.file3_1_6_2 ? 'true' : 'false');
            }
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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
                                        {file3_1_1 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}
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
                            <button onClick={() => saveSection({ researchFacilities, file3_1_1 }, '3-1-1')}>Save</button>
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
                                        {file3_1_2_1 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}
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
                                        {file3_1_2_2 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}
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
                            <button onClick={() => saveSection({ seedMoney, file3_1_2_1, file3_1_2_2 }, '3-1-2')}>Save</button>
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
                                    <td>
                                        {file3_1_3_1 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}
                                        Upload the data template</td>
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
                                    <td>
                                        {file3_1_3_2 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}
                                        Upload relevant supporting documents</td>
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
                        <button onClick={() => saveSection({ teachersFellowship, file3_1_3_1, file3_1_3_2 }, '3-1-3')}>Save</button>
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
                                    <td>
                                        {file3_1_4_1 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}
                                        Upload the data template</td>
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
                                    <td>
                                        {file3_1_4_2 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}
                                        Upload relevant supporting documents</td>
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
                            <button onClick={() => saveSection({ fellowsEnrolled, file3_1_4_1, file3_1_4_2 }, '3-1-4')}>Save</button>
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
                                    <td>
                                        {file3_1_5 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}
                                        Upload relevant supporting documents</td>
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
                            <button onClick={() => saveSection({ feed_3_1_5_Type, file3_1_5 }, '3-1-5')}>Save</button>
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
                                    <td>
                                        {file3_1_6_1 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}
                                        Upload the data template</td>
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
                                    <td>
                                        {file3_1_6_2 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}
                                        Upload relevant supporting documents</td>
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
                            <button onClick={() => saveSection({ departmentNo, file3_1_6_1, file3_1_6_2 }, '3-1-6')}>Save</button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default Criteria31;
