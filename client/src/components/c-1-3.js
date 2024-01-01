import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";

const Criteria13 = ({ onCrit13Data }) => {
    const [valueAddedCoursesCount1_3_2, setValueAddedCoursesCount1_3_2] = useState(null);
    const [enrolledStudentsCount1_3_3_1, setEnrolledStudentsCount1_3_3_1] = useState(null);
    const [projectsCount1_3_4, setProjectsCount1_3_4] = useState(null);
    const [file1_3_2_1, setFile1_3_2_1] = useState('');
    const [file1_3_2_2, setFile1_3_2_2] = useState('');
    const [file1_3_3_1_1, setFile1_3_3_1_1] = useState('');
    const [file1_3_3_1_2, setFile1_3_3_1_2] = useState('');
    const [file1_3_4_1, setFile1_3_4_1] = useState('');
    const [file1_3_4_2, setFile1_3_4_2] = useState('');

    useEffect(() => {
        const crit13 = {
            valueAddedCoursesCount1_3_2,
            enrolledStudentsCount1_3_3_1,
            projectsCount1_3_4,
            file1_3_2_1,
            file1_3_2_2,
            file1_3_3_1_1,
            file1_3_3_1_2,
            file1_3_4_1,
            file1_3_4_2,
        };
        onCrit13Data(crit13);
    }, [valueAddedCoursesCount1_3_2, enrolledStudentsCount1_3_3_1, projectsCount1_3_4, file1_3_2_1, file1_3_2_2, file1_3_3_1_1, file1_3_3_1_2, file1_3_4_1, file1_3_4_2]);    

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

    return (
        <div className="c-1_3">
            <h3>1.3 - Curriculum Enrichment</h3>
            <ul>
                <li>
                    <div className="c-1_3_2">
                        <h4>1.3.2 - Number of value-added courses for imparting transferable and life skills offered during the year</h4>
                        <input 
                            type="number" 
                            id="valueAddedCoursesCount1_3_2" 
                            value={valueAddedCoursesCount1_3_2} 
                            onChange={(e) => setValueAddedCoursesCount1_3_2(e.target.value)} 
                        />
                        <table>
                            <tbody>
                                <tr>
                                    <td>Upload the data template</td>
                                    <td><button onClick={() => downloadExcel('1.3.2.xlsx')}>Data Template</button></td>
                                    <td><input type="file" id="fileUpload1_3_2_1" onChange={(e) => setFile1_3_2_1(e.target.files[0])} name="fileUpload" accept=".xls, .xlsx" /></td>
                                    <td>xls, xlsx. File size: 6MB</td>
                                </tr>
                                <tr>
                                    <td>Upload relevant supporting documents</td>
                                    <td></td>
                                    <td><input type="file" id="fileUpload1_3_2_2" onChange={(e) => setFile1_3_2_2(e.target.files[0])} name="fileUpload" accept=".xls, .xlsx, .doc, .docx, .pdf" /></td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </li>
                <li>
                    <div className="c-1_3_3">
                        <h4>1.3.3 - Total number of students enrolled in the courses under 1.3.2 above</h4>
                        <ul>
                            <li>
                                <div className="c-1_3_3_1">
                                    <h4>1.3.3.1 - Number of value-added courses for imparting transferable and life skills offered during the year</h4>
                                    <input 
                                        type="number" 
                                        id="enrolledStudentsCount1_3_3_1" 
                                        value={enrolledStudentsCount1_3_3_1} 
                                        onChange={(e) => setEnrolledStudentsCount1_3_3_1(e.target.value)} 
                                    />
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>Upload the data template</td>
                                                <td><button onClick={() => downloadExcel('1.3.3.xlsx')}>Data Template</button></td>
                                                <td><input type="file" id="fileUpload1_3_3_1_1" onChange={(e) => setFile1_3_3_1_1(e.target.files[0])} name="fileUpload" accept=".xls, .xlsx" /></td>
                                                <td>xls, xlsx. File size: 6MB</td>
                                            </tr>
                                            <tr>
                                                <td>Upload relevant supporting documents</td>
                                                <td></td>
                                                <td><input type="file" id="fileUpload1_3_3_1_2" onChange={(e) => setFile1_3_3_1_2(e.target.files[0])} name="fileUpload" accept=".xls, .xlsx, .doc, .docx, .pdf" /></td>
                                                <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    <div className="c-1_3_4">
                        <h4>1.3.4 - Number of students undertaking field projects/ research projects/ internships during the year</h4>
                        <input 
                            type="number" 
                            id="projectsCount1_3_4" 
                            value={projectsCount1_3_4} 
                            onChange={(e) => setProjectsCount1_3_4(e.target.value)} 
                        />
                        <table>
                            <tbody>
                                <tr>
                                    <td>Upload the data template</td>
                                    <td><button onClick={() => downloadExcel('1.3.4.xlsx')}>Data Template</button></td>
                                    <td><input type="file" id="fileUpload1_3_4_1" onChange={(e) => setFile1_3_4_1(e.target.files[0])} name="fileUpload" accept=".xls, .xlsx" /></td>
                                    <td>xls, xlsx. File size: 6MB</td>
                                </tr>
                                <tr>
                                    <td>Upload relevant supporting documents</td>
                                    <td></td>
                                    <td><input type="file" id="fileUpload1_3_4_2" onChange={(e) => setFile1_3_4_2(e.target.files[0])} name="fileUpload" accept=".xls, .xlsx, .doc, .docx, .pdf" /></td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Criteria13;
