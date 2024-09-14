import React, { useState, useEffect } from "react";
import StyledTextArea from "./textArea";
import { saveAs } from 'file-saver';
import axios from "axios";

const Criteria44 = ({ onCrit44Data }) => {

    const [physical_facilities_expenditure, setPhysicalFacilitiesExpenditure] = useState();
    const [file4_4_1_1, setFile4_4_1_1] = useState("");
    const [file4_4_1_2, setFile4_4_1_2] = useState("");
    const [established_systems, setEstablishedSystems] = useState("");
    const [file4_4_2, setFile4_4_2] = useState("");
    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');

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
            const response = await axios.post(`https://naacserver.onrender.com/data/save${section}`, formData);
            console.log(response.data);
            alert(`Saved Section ${section} data`);
        } catch (error) {
            console.log("Error", error.message);
        }
    }

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


    useEffect(() => {
        const crit44 = {
            physical_facilities_expenditure,
            file4_4_1_1,
            file4_4_1_2,
            established_systems,
            file4_4_2
        };
        onCrit44Data(crit44);
    }, [physical_facilities_expenditure, file4_4_1_1, file4_4_1_2, established_systems, file4_4_2]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://naacserver.onrender.com/data/fetchC4?department=${department}&academicYear=${academicYear}`);
            const data = response.data.data.criteria44;

            if (data) {
                setPhysicalFacilitiesExpenditure(data.physical_facilities_expenditure || "");
                setFile4_4_1_1(data.file4_4_1_1 ? 'true' : 'false');
                setFile4_4_1_2(data.file4_4_1_2 ? 'true' : 'false');
                setEstablishedSystems(data.established_systems || "");
            }
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="c-4-4">
            <h3>4.4 - Maintenance and Campus Infrastructure</h3>
            <ul>
                <li>
                    <div className="c-4-4-det">
                        <h4>4.4.1 - Total expenditure incurred in maintenance of physical facilities and academic support
                            facilities excluding salary component during the year
                        </h4>
                    </div>
                    <input
                        type="number"
                        id="classrooms_and_seminarHalls"
                        value={physical_facilities_expenditure}
                        onChange={(e) => setPhysicalFacilitiesExpenditure(e.target.value)}
                    />
                    <div className="table-4-4-1">
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
                                    <td> {file4_4_1_1 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}

                                        Upload the data template</td>
                                    <td>
                                        <button onClick={() => downloadExcel('4.4.1.xlsx')}>Data Template</button>
                                    </td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file4_4_1_1"
                                            name="fileUpload"
                                            accept=".xls, .xlsx"
                                            onChange={(e) => setFile4_4_1_1(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx. File size: 6MB</td>
                                </tr>
                                <tr>
                                    <td> {file4_4_1_2 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}
                                        Upload relevant supporting documents</td>
                                    <td></td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file4_4_1_2"
                                            name="fileUpload"
                                            accept=".xls, .xlsx, .doc, .docx, .pdf"
                                            onChange={(e) => setFile4_4_1_2(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                        <button onClick={() => saveSection({ physical_facilities_expenditure, file4_4_1_1, file4_4_1_2 }, '4-4-1')}>Save</button>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="c-4-4-2">
                        <h4>4.4.2- There are established systems and procedures for maintaining and utilizing physical, academic
                            and support facilities - laboratory, library, sports complex, computers, classrooms etc.
                        </h4>
                        <div className="text-area">
                            <StyledTextArea
                                rows={5}
                                placeholder="Type the text here"
                                value={established_systems}
                                onChange={(e) => setEstablishedSystems(e.target.value)}
                            />
                        </div>
                        <div className="table-4_4_2">
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
                                                id="file4_4_2"
                                                name="fileUpload"
                                                accept=".xls, .xlsx, .doc, .docx, .pdf"
                                                onChange={(e) => setFile4_4_2(e.target.files[0])}
                                            />
                                        </td>
                                        <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div>
                            <button onClick={() => saveSection({ established_systems, file4_4_2 }, '4-4-2')}>Save</button>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Criteria44;
