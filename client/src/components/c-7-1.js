import React, { useState, useEffect } from "react";
import StyledTextArea from "./textArea";
import axios from "axios";
import '../css/criteria7.css';


const Criteria71 = ({ onCrit71Data }) => {

    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');
    const [text_7_1_1, settext_7_1_1] = useState("");
    const [data_7_1_2, setdata_7_1_2] = useState("");
    const [text_7_1_3, settext_7_1_3] = useState("");
    const [data_7_1_4, setdata_7_1_4] = useState("");
    const [data_7_1_5, setdata_7_1_5] = useState("");
    const [data_7_1_6, setdata_7_1_6] = useState("");
    const [data_7_1_7, setdata_7_1_7] = useState("");
    const [text_7_1_8, settext_7_1_8] = useState("");
    const [text_7_1_9, settext_7_1_9] = useState("");
    const [data_7_1_10, setdata_7_1_10] = useState("");
    const [text_7_1_11, settext_7_1_11] = useState("");
    const [file7_1_1, setFile7_1_1] = useState(null);
    const [file7_1_2, setFile7_1_2] = useState(null);
    const [file7_1_3, setFile7_1_3] = useState(null);
    const [file7_1_4, setFile7_1_4] = useState(null);
    const [file7_1_5, setFile7_1_5] = useState(null);
    const [file7_1_6, setFile7_1_6] = useState(null);
    const [file7_1_7, setFile7_1_7] = useState(null);
    const [file7_1_8, setFile7_1_8] = useState(null);
    const [file7_1_10, setFile7_1_10] = useState(null);
    const [file7_1_11, setFile7_1_11] = useState(null);

    const saveSection = async (sectionData, section) => {
        const formData = new FormData();

        formData.append("department", department);
        formData.append("academicYear", academicYear);

        for (const key in sectionData) {
            formData.append(key, sectionData[key]);
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
        const crit71 = {
            text_7_1_1,
            data_7_1_2,
            text_7_1_3,
            data_7_1_4,
            data_7_1_5,
            data_7_1_6,
            data_7_1_7,
            text_7_1_8,
            text_7_1_9,
            data_7_1_10,
            text_7_1_11,
            file7_1_1,
            file7_1_2,
            file7_1_3,
            file7_1_4,
            file7_1_5,
            file7_1_6,
            file7_1_7,
            file7_1_8,
            file7_1_10,
            file7_1_11,
        };
        onCrit71Data(crit71);
    }, [
        text_7_1_1,
        data_7_1_2,
        text_7_1_3,
        data_7_1_4,
        data_7_1_5,
        data_7_1_6,
        data_7_1_7,
        text_7_1_8,
        text_7_1_9,
        data_7_1_10,
        text_7_1_11,
        file7_1_1,
        file7_1_2,
        file7_1_3,
        file7_1_4,
        file7_1_5,
        file7_1_6,
        file7_1_7,
        file7_1_8,
        file7_1_10,
        file7_1_11,
    ])

    return (
        <div className="c-7-1">
            <h3>7.1 - Institutional Values and Social Responsibilities</h3>

            <div className="c-7-1-1">
                <h4>7.1.1 - Measures initiated by the institution for the promotion of gender equity during the year</h4>
                <StyledTextArea
                    rows={5}
                    placeholder="Type the text here"
                    value={text_7_1_1}
                    onChange={(e) => settext_7_1_1(e.target.value)}
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
                                    id="file7_1_1"
                                    name="fileUpload"
                                    accept=".xls, .xlsx, .doc, .docx, .pdf"
                                    onChange={(e) => setFile7_1_1(e.target.files[0])}
                                />
                            </td>
                            <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button onClick={() => saveSection({ text_7_1_1, file7_1_1 }, '7-1-1')}>Save</button>
                </div>
            </div>

            <div className="c-7-1-2">
                <h4>7.1.2 - The institution has facilities for alternate sources of energy and energy conservation</h4>
                <ul>
                    <li><h4>1. Solar energy</h4></li>
                    <li><h4>2. Biogas plant</h4></li>
                    <li><h4>3. Wheeling to the Grid</h4></li>
                    <li><h4>4. Sensor-based energy conservation</h4></li>
                    <li><h4>5. Use of LED bulbs/ power-efficient equipment</h4></li>
                </ul>
                <form action="/submit-response" method="post">
                    <input type="radio" id="all" name="option" value="all" onChange={(e) => setdata_7_1_2(e.target.value)} />
                    <label htmlFor="all">Any 4 or All of the above</label><br />

                    <input type="radio" id="any3" name="option" value="any3" onChange={(e) => setdata_7_1_2(e.target.value)} />
                    <label htmlFor="any3">Any 3 of the above</label><br />

                    <input type="radio" id="any2" name="option" value="any2" onChange={(e) => setdata_7_1_2(e.target.value)} />
                    <label htmlFor="any2">Any 2 of the above</label><br />

                    <input type="radio" id="any1" name="option" value="any1" onChange={(e) => setdata_7_1_2(e.target.value)} />
                    <label htmlFor="any1">Any 1 of the above</label><br />

                    <input type="radio" id="none" name="option" value="none" onChange={(e) => setdata_7_1_2(e.target.value)} />
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
                                Upload relevant supporting documents
                            </td>
                            <td></td>
                            <td>
                                <input
                                    type="file"
                                    id="file7_1_2"
                                    name="fileUpload"
                                    accept=".xls, .xlsx, .doc, .docx, .pdf"
                                    onChange={(e) => setFile7_1_2(e.target.files[0])}
                                />
                            </td>
                            <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button onClick={() => saveSection({ data_7_1_2, file7_1_2 }, '7-1-2')}>Save</button>
                </div>
            </div>

            <div className="c-7-1-3">
                <h4>7.1.3 - Describe the facilities in the Institution for the management of the following types of degradable and non-degradable waste (within 200 words)</h4>
                <ul>
                    <li><h4>- Solid waste management</h4></li>
                    <li><h4>- Liquid waste management</h4></li>
                    <li><h4>- Biomedical waste management</h4></li>
                    <li><h4>- E-waste management</h4></li>
                    <li><h4>- Waste recycling system</h4></li>
                    <li><h4>- Hazardous chemicals and radioactive waste management</h4></li>
                </ul>
                <StyledTextArea
                    rows={5}
                    placeholder="Type the text here"
                    value={text_7_1_3}
                    onChange={(e) => settext_7_1_3(e.target.value)}
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
                                    id="file7_1_3"
                                    name="fileUpload"
                                    accept=".xls, .xlsx, .doc, .docx, .pdf"
                                    onChange={(e) => setFile7_1_3(e.target.files[0])}
                                />
                            </td>
                            <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button onClick={() => saveSection({ text_7_1_3, file7_1_3 }, '7-1-3')}>Save</button>
                </div>
            </div>

            <div className="c-7-1-4">
                <h4>7.1.4 - Water conservation facilities available in the institution:</h4>
                <ul>
                    <li><h4>1. Rain water harvesting</h4></li>
                    <li><h4>2. Bore well/Open well recharge</h4></li>
                    <li><h4>3. Construction of tanks and bunds</h4></li>
                    <li><h4>4. Waste water recycling</h4></li>
                    <li><h4>5. Maintenance of water bodies and distribution system in the campus</h4></li>
                </ul>
                <form action="/submit-response" method="post">
                    <input type="radio" id="all" name="option" value="all" onChange={(e) => setdata_7_1_4(e.target.value)} />
                    <label htmlFor="all">Any 4 or All of the above</label><br />

                    <input type="radio" id="any3" name="option" value="any3" onChange={(e) => setdata_7_1_4(e.target.value)} />
                    <label htmlFor="any3">Any 3 of the above</label><br />

                    <input type="radio" id="any2" name="option" value="any2" onChange={(e) => setdata_7_1_4(e.target.value)} />
                    <label htmlFor="any2">Any 2 of the above</label><br />

                    <input type="radio" id="any1" name="option" value="any1" onChange={(e) => setdata_7_1_4(e.target.value)} />
                    <label htmlFor="any1">Any 1 of the above</label><br />

                    <input type="radio" id="none" name="option" value="none" onChange={(e) => setdata_7_1_4(e.target.value)} />
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
                                Upload relevant supporting documents
                            </td>
                            <td></td>
                            <td>
                                <input
                                    type="file"
                                    id="file7_1_4"
                                    name="fileUpload"
                                    accept=".xls, .xlsx, .doc, .docx, .pdf"
                                    onChange={(e) => setFile7_1_4(e.target.files[0])}
                                />
                            </td>
                            <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button onClick={() => saveSection({ data_7_1_4, file7_1_4 }, '7-1-4')}>Save</button>
                </div>
            </div>

            <div className="c-7-1-5">
                <h4>7.1.5 - Green campus initiatives include</h4>
                <ul>
                    <h4>7.1.5.1- The institutional initiatives for greening campus are as follows:</h4>
                    <li><h4>1. Restricted entry of automobiles</h4></li>
                    <li><h4>2. Use of bicycles/Battery powered vehicles</h4></li>
                    <li><h4>3. Pedestrian-friendly pathways</h4></li>
                    <li><h4>4. Ban of use of plastics</h4></li>
                    <li><h4>5. Landscaping</h4></li>
                </ul>
                <form action="/submit-response" method="post">
                    <input type="radio" id="all" name="option" value="all" onChange={(e) => setdata_7_1_5(e.target.value)} />
                    <label htmlFor="all">Any 4 or All of the above</label><br />

                    <input type="radio" id="any3" name="option" value="any3" onChange={(e) => setdata_7_1_5(e.target.value)} />
                    <label htmlFor="any3">Any 3 of the above</label><br />

                    <input type="radio" id="any2" name="option" value="any2" onChange={(e) => setdata_7_1_5(e.target.value)} />
                    <label htmlFor="any2">Any 2 of the above</label><br />

                    <input type="radio" id="any1" name="option" value="any1" onChange={(e) => setdata_7_1_5(e.target.value)} />
                    <label htmlFor="any1">Any 1 of the above</label><br />

                    <input type="radio" id="none" name="option" value="none" onChange={(e) => setdata_7_1_5(e.target.value)} />
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
                                Upload relevant supporting documents
                            </td>
                            <td></td>
                            <td>
                                <input
                                    type="file"
                                    id="file7_1_5"
                                    name="fileUpload"
                                    accept=".xls, .xlsx, .doc, .docx, .pdf"
                                    onChange={(e) => setFile7_1_5(e.target.files[0])}
                                />
                            </td>
                            <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button onClick={() => saveSection({ data_7_1_5, file7_1_5 }, '7-1-5')}>Save</button>
                </div>
            </div>

            <h4>7.1.6 - Quality audits on environment and energy are regularly undertaken by the institution</h4>
            <ul>
                <h4>7.1.6.1 - The institution's initiatives to preserve and improve the environment and harness energy are confirmed through the following:</h4>
                <li><h4>1. Green audit</h4></li>
                <li><h4>2. Energy audit</h4></li>
                <li><h4>3. Environment audit</h4></li>
                <li><h4>4. Clean and green campus recognitions/awards</h4></li>
                <li><h4>5. Beyond the campus environmental promotional activities</h4></li>
            </ul>

            <form action="/submit-response" method="post">
                <input type="radio" id="all" name="option" value="all" onChange={(e) => setdata_7_1_6(e.target.value)} />
                <label htmlFor="all">Any 4 or All of the above</label><br />

                <input type="radio" id="any3" name="option" value="any3" onChange={(e) => setdata_7_1_6(e.target.value)} />
                <label htmlFor="any3">Any 3 of the above</label><br />

                <input type="radio" id="any2" name="option" value="any2" onChange={(e) => setdata_7_1_6(e.target.value)} />
                <label htmlFor="any2">Any 2 of the above</label><br />

                <input type="radio" id="any1" name="option" value="any1" onChange={(e) => setdata_7_1_6(e.target.value)} />
                <label htmlFor="any1">Any 1 of the above</label><br />

                <input type="radio" id="none" name="option" value="none" onChange={(e) => setdata_7_1_6(e.target.value)} />
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
                            Upload relevant supporting documents
                        </td>
                        <td></td>
                        <td>
                            <input
                                type="file"
                                id="file7_1_6"
                                name="fileUpload"
                                accept=".xls, .xlsx, .doc, .docx, .pdf"
                                onChange={(e) => setFile7_1_6(e.target.files[0])}
                            />
                        </td>
                        <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                    </tr>
                </tbody>
            </table>
            <div>
                <button onClick={() => saveSection({ data_7_1_6, file7_1_6 }, '7-1-6')}>Save</button>
            </div>

            <div className="c-7-1-1">
                <h4>7.1.7 - The Institution has a disabled-friendly and barrier-free environment</h4>
                <ul>
                    <li><h4>1. Ramps/lifts for easy access to classrooms and centres</h4></li>
                    <li><h4>2. Disabled-friendly washrooms</h4></li>
                    <li><h4>3. Signage including tactile path lights, display boards and signposts</h4></li>
                    <li><h4>4. Assistive technology and facilities for persons with disabilities: accessible website, screen-reading software, mechanized equipment, etc.</h4></li>
                    <li><h4>5. Provision for enquiry and information: Human assistance, reader, scribe, soft copies of reading materials, screen reading, etc.</h4></li>
                </ul>

                <form action="/submit-response" method="post">
                    <input type="radio" id="all" name="option" value="all" onChange={(e) => setdata_7_1_7(e.target.value)} />
                    <label htmlFor="all">Any 4 or All of the above</label><br />

                    <input type="radio" id="any3" name="option" value="any3" onChange={(e) => setdata_7_1_7(e.target.value)} />
                    <label htmlFor="any3">Any 3 of the above</label><br />

                    <input type="radio" id="any2" name="option" value="any2" onChange={(e) => setdata_7_1_7(e.target.value)} />
                    <label htmlFor="any2">Any 2 of the above</label><br />

                    <input type="radio" id="any1" name="option" value="any1" onChange={(e) => setdata_7_1_7(e.target.value)} />
                    <label htmlFor="any1">Any 1 of the above</label><br />

                    <input type="radio" id="none" name="option" value="none" onChange={(e) => setdata_7_1_7(e.target.value)} />
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
                                Upload relevant supporting documents
                            </td>
                            <td></td>
                            <td>
                                <input
                                    type="file"
                                    id="file7_1_7"
                                    name="fileUpload"
                                    accept=".xls, .xlsx, .doc, .docx, .pdf"
                                    onChange={(e) => setFile7_1_7(e.target.files[0])}
                                />
                            </td>
                            <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button onClick={() => saveSection({ data_7_1_7, file7_1_7 }, '7-1-7')}>Save</button>
                </div>
            </div>

            <div className="c-7-1-8">
                <h4>7.1.8 - Describe the Institutional efforts/initiatives in providing an inclusive environment i.e. tolerance and harmony towards cultural, regional, linguistic, communal, socio-economic and other diversities (within a maximum of 200 words)</h4>
                <StyledTextArea
                    rows={5}
                    placeholder="Type the text here"
                    value={text_7_1_8}
                    onChange={(e) => settext_7_1_8(e.target.value)}
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
                                    id="file7_1_8"
                                    name="fileUpload"
                                    accept=".xls, .xlsx, .doc, .docx, .pdf"
                                    onChange={(e) => setFile7_1_8(e.target.files[0])}
                                />
                            </td>
                            <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button onClick={() => saveSection({ text_7_1_8, file7_1_8 }, '7-1-8')}>Save</button>
                </div>
            </div>

            <div className="c-7-1-9">
                <h4>7.1.9 - Sensitization of students and employees of the institution to constitutional obligations: values, rights, duties and resposibilities of citizens:</h4>
                <StyledTextArea
                    rows={5}
                    placeholder="Type the text here"
                    value={text_7_1_9}
                    onChange={(e) => settext_7_1_9(e.target.value)}
                />
            </div>

            <div className="c-7-1-10">
                <h4>7.1.10 - The Institution has a prescribed code of conduct for students, teachers, administrators and other staff and conducts periodic programmes in this regard</h4>
                <ul>
                    <li><h4>1. The Code of Conduct is displayed on the website</h4></li>
                    <li><h4>2. There is a committee to monitor adherence to the Code of Conduct</h4></li>
                    <li><h4>3. Institution organizes professional ethics programmes for students, teachers, administrators and other staff</h4></li>
                    <li><h4>4. Annual awareness programmes on Code of Conduct are organized</h4></li>
                </ul>
                <form action="/submit-response" method="post">
                    <input type="radio" id="all" name="option" value="all" onChange={(e) => setdata_7_1_10(e.target.value)} />
                    <label htmlFor="all">Any 4 or All of the above</label><br />

                    <input type="radio" id="any3" name="option" value="any3" onChange={(e) => setdata_7_1_10(e.target.value)} />
                    <label htmlFor="any3">Any 3 of the above</label><br />

                    <input type="radio" id="any2" name="option" value="any2" onChange={(e) => setdata_7_1_10(e.target.value)} />
                    <label htmlFor="any2">Any 2 of the above</label><br />

                    <input type="radio" id="any1" name="option" value="any1" onChange={(e) => setdata_7_1_10(e.target.value)} />
                    <label htmlFor="any1">Any 1 of the above</label><br />

                    <input type="radio" id="none" name="option" value="none" onChange={(e) => setdata_7_1_10(e.target.value)} />
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
                                Upload relevant supporting documents
                            </td>
                            <td></td>
                            <td>
                                <input
                                    type="file"
                                    id="file7_1_10"
                                    name="fileUpload"
                                    accept=".xls, .xlsx, .doc, .docx, .pdf"
                                    onChange={(e) => setFile7_1_10(e.target.files[0])}
                                />
                            </td>
                            <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button onClick={() => saveSection({ data_7_1_10, file7_1_10 }, '7-1-10')}>Save</button>
                </div>
            </div>

            <div className="c-7-1-11">
                <h4>7.1.11 - Institution celebrates / organizes national and international commemoratives days, events and festivals</h4>
                <StyledTextArea
                    rows={5}
                    placeholder="Type the text here"
                    value={text_7_1_11}
                    onChange={(e) => settext_7_1_11(e.target.value)}
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
                                    id="file7_1_11"
                                    name="fileUpload"
                                    accept=".xls, .xlsx, .doc, .docx, .pdf"
                                    onChange={(e) => setFile7_1_11(e.target.files[0])}
                                />
                            </td>
                            <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button onClick={() => saveSection({ text_7_1_11, file7_1_11 }, '7-1-11')}>Save</button>
                </div>
            </div>
        </div>
    )

}

export default Criteria71;