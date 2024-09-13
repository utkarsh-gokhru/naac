import React, { useState, useEffect } from "react";
import StyledTextArea from "./textArea";
import { saveAs } from 'file-saver';
import axios from "axios";
import '../css/criteria6.css';

const Criteria62 = ({ onCrit62Data }) => {


    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');
    const [text6_2_1, settext6_2_1] = useState("");
    const [text6_2_2, settext6_2_2] = useState("");
    const [data6_2_3, setdata6_2_3] = useState("");
    const [file6_2_1, setFile6_2_1] = useState(null);
    const [file6_2_2, setFile6_2_2] = useState(null);
    const [file6_2_3_1, setFile6_2_3_1] = useState(null);
    const [file6_2_3_2, setFile6_2_3_2] = useState(null);



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

            try {
                const response = await axios.post(`https://naacserver.onrender.com/data/save${section}`, formData);
                console.log(response.data);
                alert(`Saved Section ${section} data successfully!`);
            } catch (error) {
                console.error(`Error saving Section ${section} data:`, error.message);
                alert(`Failed to save Section ${section} data. Please try again.`);
            }
        }
    };

    useEffect(() => {
        const crit62 = {
            text6_2_1,
            file6_2_1,
            text6_2_2,
            file6_2_2,
            data6_2_3,
            file6_2_3_1,
            file6_2_3_2
            
        };
        onCrit62Data(crit62);
    },[text6_2_1,
        file6_2_1,
        text6_2_2,
        file6_2_2,
        data6_2_3,
        file6_2_3_1,
        file6_2_3_2])



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

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://naacserver.onrender.com/data/fetchC6?department=${department}&academicYear=${academicYear}`);
            const data = response.data.data.criteria62;

            if (data) {
                settext6_2_1 (data.text6_2_1 ? data.text6_2_1 : '');
                settext6_2_2(data.text6_2_2 ? data.text6_2_2 : '');
                setdata6_2_3(data.data6_2_3 ? data.data6_2_3 : '');
            }
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        
        <div className="c-6-2">
            <h3>6.2 - Strategy Development and Deployment</h3>

            <div className="c-6-2-1">
                <h4>6.2.1 - The institutional Strategic plan is effectively deployed.</h4>

                <StyledTextArea
                                rows={5}
                                placeholder="Type the text here"
                                value={text6_2_1}
                                onChange={(e) => settext6_2_1(e.target.value)}
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
                                        Upload relevant supporting documents
                                    </td>
                                    <td></td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file6_2_1"
                                            name="fileUpload"
                                            accept=".xls, .xlsx, .doc, .docx, .pdf"
                                            onChange={(e) => setFile6_2_1(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <button onClick={() => saveSection({text6_2_1,file6_2_1},'6-2-1')}>Save</button>
                        </div>
            </div>

            <div className="c-6-2-2">
                <h4>6.2.2 - The functioning of the institutional bodies is effective and efficent as visible from policies, administrative setup, appointment and service rules, procedures etc.</h4>
                <StyledTextArea
                                rows={5}
                                placeholder="Type the text here"
                                value={text6_2_2}
                                onChange={(e) => settext6_2_2(e.target.value)}
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
                                        Upload relevant supporting documents
                                    </td>
                                    <td></td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file6_2_2"
                                            name="fileUpload"
                                            accept=".xls, .xlsx, .doc, .docx, .pdf"
                                            onChange={(e) => setFile6_2_2(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <button onClick={() => saveSection({text6_2_2,file6_2_2},'6-2-2')}>Save</button>
                        </div>
            </div>

            <div className="c-6-2-3">
                <h4>6.2.3 - Institution implemented covering following areas of operation</h4>
                <ul>
                <li><h4>1. Administration</h4></li>
                <li><h4>2. Finance and Accounts</h4></li>
                <li><h4>3. Student Admission and Support </h4></li>
                <li><h4>4. Examination</h4></li>
            </ul>
            <form action="/submit-response" method="post">
                <input type="radio" id="all" name="option" value="all" onChange={(e) => setdata6_2_3(e.target.value)} />
                <label htmlFor="all">Any 4 or All of the above</label><br />

                <input type="radio" id="any3" name="option" value="any3" onChange={(e) => setdata6_2_3(e.target.value)} />
                <label htmlFor="any3">Any 3 of the above</label><br />

                <input type="radio" id="any2" name="option" value="any2" onChange={(e) => setdata6_2_3(e.target.value)} />
                <label htmlFor="any2">Any 2 of the above</label><br />

                <input type="radio" id="any1" name="option" value="any1" onChange={(e) => setdata6_2_3(e.target.value)} />
                <label htmlFor="any1">Any 1 of the above</label><br />

                <input type="radio" id="none" name="option" value="none" onChange={(e) => setdata6_2_3(e.target.value)} />
                <label htmlFor="none">None of the above</label><br />
            </form>

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
                                        <button onClick={() => downloadExcel('6.2.3.xlsx')}>Data Template</button>
                                    </td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file6_2_3_1"
                                            name="fileUpload"
                                            accept=".xls, .xlsx"
                                            onChange={(e) => setFile6_2_3_1(e.target.files[0])}
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
                                            id="file6_2_3_2"
                                            name="fileUpload"
                                            accept=".xls, .xlsx, .doc, .docx, .pdf"
                                            onChange={(e) => setFile6_2_3_2(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                        <button onClick={() => saveSection({ data6_2_3, file6_2_3_1, file6_2_3_2 }, '6-2-3')}>Save</button>
                    </div>
            </div>



        </div>
    )


}

export default Criteria62
