import React, { useEffect } from 'react'
import { useState } from 'react';
import StyledTextArea from "./textArea";
import axios from "axios";

export const Criteria23 = ({ onCrit23Data }) => {

    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');
    const [learning_exp, setlearning_exp] = useState("");
    const [no_of_mentors, setno_of_mentors] = useState("");
    const [file2_3_1, setfile2_3_1] = useState(null);
    const [effect_teach_learn, seteffect_teach_learn] = useState("");
    const [file2_3_2, setfile2_3_2] = useState(null);
    const [file2_3_3, setfile2_3_3] = useState(null);

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
        const crit23 = {
            learning_exp,
            file2_3_1,
            effect_teach_learn,
            file2_3_2,
            no_of_mentors,
            file2_3_3
        };
        onCrit23Data(crit23);
    }, [learning_exp, file2_3_1, effect_teach_learn, file2_3_2, no_of_mentors, file2_3_3]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://naacserver.onrender.com/data/fetchC2?department=${department}&academicYear=${academicYear}`);
            const data = response.data.data.criteria23;

            if (data) {
                setlearning_exp(data.learning_exp ? data.learning_exp : '');
                setno_of_mentors(data.no_of_mentors ? data.no_of_mentors : '');
                seteffect_teach_learn(data.effect_teach_learn ? data.effect_teach_learn : '');
            }
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='c-2-3'>
            <h3>2.3- Teaching- Learning Process</h3>
            <h4>2.3.1 - Student centric methods, such as experiential learning, participative learning and problem-solving methodologies are used for enhancing learning experiences</h4>
            <div className="text-area">
                <StyledTextArea
                    rows={5}
                    placeholder="Type the text here"
                    value={learning_exp}
                    onChange={(e) => setlearning_exp(e.target.value)}
                />
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
                        <td> {file2_3_1 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}

                            Upload the data template</td>
                        <td>
                        </td>
                        <td>
                            <input
                                type="file"
                                id="file2_3_1"
                                name="fileUpload"
                                accept=".xls, .xlsx"
                                onChange={(e) => setfile2_3_1(e.target.files[0])}
                            />
                        </td>
                        <td>xls, xlsx. File size: 6MB</td>
                    </tr>
                </tbody>
            </table>
            <div>
            <button onClick={() => saveSection({ learning_exp, file2_3_1 }, '2-3-1')}>Save</button>
            </div>

            <h4>2.3.2 - Teachers use ICT enabled tools incuding online resources for effective teaching and learning processes during the year</h4>

            <div className="text-area">
                <StyledTextArea
                    rows={5}
                    placeholder="Type the text here"
                    value={effect_teach_learn}
                    onChange={(e) => seteffect_teach_learn(e.target.value)}
                />
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
                        <td> {file2_3_2 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}

                            Upload the data template</td>
                        <td>
                        </td>
                        <td>
                            <input
                                type="file"
                                id="file2_3_2"
                                name="fileUpload"
                                accept=".xls, .xlsx"
                                onChange={(e) => setfile2_3_2(e.target.files[0])}
                            />
                        </td>
                        <td>xls, xlsx. File size: 6MB</td>
                    </tr>
                </tbody>
            </table>
            <div>
            <button onClick={() => saveSection({ effect_teach_learn, file2_3_2 }, '2-3-2')}>Save</button>
            </div>

            <h4>2.3.3 - Ratio of students to mentor for academic and other related issues during the year</h4>

            <h4>2.3.3.1 - Number of mentors</h4>
            <input
                type="number"
                id="no_of_mentors"
                value={no_of_mentors}
                onChange={(e) => setno_of_mentors(e.target.value)}
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
                        <td> {file2_3_3 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}

                            Upload the data template</td>
                        <td>
                        </td>
                        <td>
                            <input
                                type="file"
                                id="file2_3_3"
                                name="fileUpload"
                                accept=".xls, .xlsx"
                                onChange={(e) => setfile2_3_3(e.target.files[0])}
                            />
                        </td>
                        <td>xls, xlsx. File size: 6MB</td>
                    </tr>
                </tbody>
            </table>
            <div>
            <button onClick={() => saveSection({ no_of_mentors, file2_3_3 }, '2-3-3')}>Save</button>
            </div>
        </div>
    )
}

export default Criteria23;
