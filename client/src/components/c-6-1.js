import React, { useState, useEffect } from "react";
import StyledTextArea from "./textArea";
import axios from "axios";
import '../css/criteria6.css';

const Criteria61 = ({ onCrit61Data }) => {

    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');
    const [text6_1_1, settext6_1_1] = useState("");
    const [text6_1_2, settext6_1_2] = useState("");
    const [file6_1_1, setFile6_1_1] = useState(null);
    const [file6_1_2, setFile6_1_2] = useState(null);

    const saveSection6_1_1 = async () => {
        const formdata = new FormData();

        const sectionData = {
            department,
            academicYear,
            text6_1_1,
            file6_1_1
        };

        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }

        try {
            const response = await axios.post("https://naacserver.onrender.com/data/save6-1-1", formdata);
            console.log(response.data);
            alert("Saved Section 6.1.1 data successfully!");
        } catch (error) {
            console.error("Error saving Section 6.1.1 data:", error.message);
            alert("Failed to save Section 6.1.1 data. Please try again.");
        }
    };

    const saveSection6_1_2 = async () => {
        const formdata = new FormData();

        const sectionData = {
            department,
            academicYear,
            text6_1_2,
            file6_1_2
        };

        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }

        try {
            const response = await axios.post("https://naacserver.onrender.com/data/save6-1-2", formdata);
            console.log(response.data);
            alert("Saved Section 6.1.2 data successfully!");
        } catch (error) {
            console.error("Error saving Section 6.1.2 data:", error.message);
            alert("Failed to save Section 6.1.2 data. Please try again.");
        }
    };

    useEffect(() => {
        const crit61 = {
            text6_1_1,
            file6_1_1,
            text6_1_2,
            file6_1_2,
        };
        onCrit61Data(crit61);
    }, [text6_1_1,file6_1_1,text6_1_2,file6_1_2,]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://naacserver.onrender.com/data/fetchC6?department=${department}&academicYear=${academicYear}`);
            const data = response.data.data.criteria61;

            if (data) {
                settext6_1_1(data.text6_1_1 ? data.text6_1_1 : '');
                settext6_1_2(data.text6_1_2 ? data.text6_1_2 : '');
                }
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="c-6-1">
            <h3>6.1 - Institutional Vision and Leadership</h3>

            <div className="c-6-1-1">
                <h4>6.1.1 - The institution has a clearly stated vision and mission which are reflected in is academic and administrative governance.</h4>

                <StyledTextArea
                    rows={5}
                    placeholder="Type the text here"
                    value={text6_1_1}
                    onChange={(e) => settext6_1_1(e.target.value)}
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
                                    id="file6_1_1"
                                    name="fileUpload"
                                    accept=".xls, .xlsx, .doc, .docx, .pdf"
                                    onChange={(e) => setFile6_1_1(e.target.files[0])}
                                />
                            </td>
                            <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button onClick={() => saveSection6_1_1({ text6_1_1, file6_1_1 }, '6-1-1')}>Save</button>
                </div>
            </div>

            <div className="c-6-1-2">
                <h4>6.1.2 - The effective leadership is reflected in various institutional practices such as decentralization and participative management. </h4>

                <StyledTextArea
                    rows={5}
                    placeholder="Type the text here"
                    value={text6_1_2}
                    onChange={(e) => settext6_1_2(e.target.value)}
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
                                    id="file6_1_2"
                                    name="fileUpload"
                                    accept=".xls, .xlsx, .doc, .docx, .pdf"
                                    onChange={(e) => setFile6_1_2(e.target.files[0])}
                                />
                            </td>
                            <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button onClick={() => saveSection6_1_2({ text6_1_2, file6_1_2 }, '6-1-2')}>Save</button>
                </div>
            </div>

        </div>
    )
}

export default Criteria61;