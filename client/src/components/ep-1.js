import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveAs } from 'file-saver';
import axios from "axios";

const EP1 = ({ onEP1Data }) => {

    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');

    const [programmes, setProgrammes] = useState('');
    const [file1_1, setFile1_1] = useState(null);
    const [departments, setDepartments] = useState('');

    const downloadExcel = async (exc_file) => {
        const templateFilePath = `${process.env.PUBLIC_URL}/EP/${exc_file}`;

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
        const ep1Data = {
            programmes,
            file1_1,
            departments
        };
        onEP1Data(ep1Data);
    }, [programmes, file1_1, departments]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://naacserver.onrender.com/data/fetchEP?department=${department}&academicYear=${academicYear}`);
            const data = response.data.data.ep1;

            if (data) {
                setProgrammes(data.programmes ? data.programmes : '');
                setDepartments(data.departments ? data.departments : '');
                setFile1_1(data.file1_1 ? 'true' : 'false');
            }
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="sec-1">
            <h3>1. Programme</h3>
            <div className="sec1-1">
                <h4>1.1. Number of programmes offered during the year:</h4>
                <input
                    type="number"
                    id="programmes"
                    value={programmes}
                    onChange={(e) => setProgrammes(e.target.value)}
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
                                {file1_1 === 'true' && (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>)}
                                Upload the data template</td>
                            <td><button onClick={() => downloadExcel('1.1.xlsx')}>Data Template</button></td>
                            <td>
                                <input
                                    type="file"
                                    id="fileUpload1_1"
                                    onChange={(e) => setFile1_1(e.target.files[0])}
                                    name="fileUpload"
                                    accept=".xls, .xlsx"
                                />
                            </td>
                            <td>xls, xlsx. File size: 6MB</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="sec1-2">
                <h4>1.2. Number of departments offering academic programmes:</h4>
                <input
                    type="number"
                    id="departments"
                    value={departments}
                    onChange={(e) => setDepartments(e.target.value)}
                />
            </div>
            <div>
                <button onClick={() => saveSection({ programmes, file1_1, departments }, '1')}>Save</button>
            </div>
        </div>
    );
};

export default EP1;
