import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveAs } from 'file-saver';
import axios from "axios";

const EP3 = ({ onEP3Data }) => {

    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');

    const [courses_in_all_programmes, setCourses_in_all_programmes] = useState('');
    const [file3_1, setFile3_1] = useState(null);
    const [full_time_teachers, setFull_time_teachers] = useState('');
    const [file3_2, setFile3_2] = useState(null);
    const [sanctioned_posts, setSanctioned_posts] = useState('');
    const [file3_3, setFile3_3] = useState(null);

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

        for (const key in sectionData) {
            formData.append(key, sectionData[key]);
        }
        try {
            const response = await axios.post(`https://naacserver.onrender.com/epData/save-${section}`, formData);
            console.log(response.data);
            alert(`Saved Section ${section} data`);
        } catch (error) {
            console.log("Error", error.message);
        }
    };

    useEffect(() => {
        const ep3Data = {
            courses_in_all_programmes,
            file3_1,
            full_time_teachers,
            file3_2,
            sanctioned_posts,
            file3_3
        };
        onEP3Data(ep3Data);
    }, [courses_in_all_programmes, file3_1, full_time_teachers, file3_2, sanctioned_posts, file3_3]);

    return (
        <div className="sec-3">
            <h3>3. Academic</h3>
            <div className="sec3-1">
                <h4>3.1. Number of courses in all programmes during the year:</h4>
                <input
                    type="number"
                    id="courses_in_all_programmes"
                    value={courses_in_all_programmes}
                    onChange={(e) => setCourses_in_all_programmes(e.target.value)}
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
                            <td><button onClick={() => downloadExcel('3.1.xlsx')}>Data Template</button></td>
                            <td>
                                <input
                                    type="file"
                                    id="fileUpload3_1"
                                    onChange={(e) => setFile3_1(e.target.files[0])}
                                    name="fileUpload"
                                    accept=".xls, .xlsx"
                                />
                            </td>
                            <td>xls, xlsx. File size: 6MB</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="sec3-2">
                <h4>3.2. Number of full time teachers during the year:</h4>
                <input
                    type="number"
                    id="full_time_teachers"
                    value={full_time_teachers}
                    onChange={(e) => setFull_time_teachers(e.target.value)}
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
                            <td><button onClick={() => downloadExcel('3.2.xlsx')}>Data Template</button></td>
                            <td>
                                <input
                                    type="file"
                                    id="fileUpload3_2"
                                    onChange={(e) => setFile3_2(e.target.files[0])}
                                    name="fileUpload"
                                    accept=".xls, .xlsx"
                                />
                            </td>
                            <td>xls, xlsx. File size: 6MB</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="sec3-3">
                <h4>3.3. Number of sanction posts during the year:</h4>
                <input
                    type="number"
                    id="sanctioned_posts"
                    value={sanctioned_posts}
                    onChange={(e) => setSanctioned_posts(e.target.value)}
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
                            <td><button onClick={() => downloadExcel('3.3.xlsx')}>Data Template</button></td>
                            <td>
                                <input
                                    type="file"
                                    id="fileUpload3_3"
                                    onChange={(e) => setFile3_3(e.target.files[0])}
                                    name="fileUpload"
                                    accept=".xls, .xlsx"
                                />
                            </td>
                            <td>xls, xlsx. File size: 6MB</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <button onClick={() => saveSection({ courses_in_all_programmes, file3_1, full_time_teachers, file3_2, sanctioned_posts, file3_3 }, '3')}>Save</button>
            </div>
        </div>
    )
}

export default EP3;
