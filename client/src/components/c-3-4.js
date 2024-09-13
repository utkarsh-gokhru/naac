import React, { useState, useEffect } from "react";
import { saveAs } from 'file-saver';
import axios from "axios";

const Criteria34 = ({ onCrit34Data }) => {

    const [code_of_ethics, setCode_of_ethics] = useState('');
    const [file3_4_1, setFile3_4_1] = useState(null);
    const [incentives, setIncentives] = useState('');
    const [file3_4_2_1, setFile3_4_2_1] = useState(null);
    const [file3_4_2_2, setFile3_4_2_2] = useState(null);
    const [patents_published, setPatents_published] = useState('');
    const [file3_4_3_1, setFile3_4_3_1] = useState(null);
    const [file3_4_3_2, setFile3_4_3_2] = useState(null);
    const [phd_awarded, setPhd_awarded] = useState(null);
    const [teachers_guides, setTeachers_guides] = useState('');
    const [file3_4_4_1, setFile3_4_4_1] = useState(null);
    const [file3_4_4_2, setFile3_4_4_2] = useState(null);
    const [research_papers_per_teacher, setResearch_papers_per_teacher] = useState('');
    const [file3_4_5_1, setFile3_4_5_1] = useState(null);
    const [file3_4_5_2, setFile3_4_5_2] = useState(null);
    const [books_edited, setBooks_edited] = useState('');
    const [file3_4_6_1, setFile3_4_6_1] = useState(null);
    const [file3_4_6_2, setFile3_4_6_2] = useState(null);
    const [e_content, setE_content] = useState('');
    const [file3_4_7_1, setFile3_4_7_1] = useState(null);
    const [file3_4_7_2, setFile3_4_7_2] = useState(null);
    const [scopus348, setScopus348] = useState('');
    const [web_of_science348, setWeb_of_science348] = useState('');
    const [file3_4_8_1, setFile3_4_8_1] = useState(null);
    const [file3_4_8_2, setFile3_4_8_2] = useState(null);
    const [scopus349, setScopus349] = useState('');
    const [web_of_science349, setWeb_of_science349] = useState('');
    const [file3_4_9_1, setFile3_4_9_1] = useState(null);
    const [file3_4_9_2, setFile3_4_9_2] = useState(null);

    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');

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
        const crit34 = {
            code_of_ethics,
            file3_4_1,
            incentives,
            file3_4_2_1,
            file3_4_2_2,
            patents_published,
            file3_4_3_1,
            file3_4_3_2,
            phd_awarded,
            teachers_guides,
            file3_4_4_1,
            file3_4_4_2,
            research_papers_per_teacher,
            file3_4_5_1,
            file3_4_5_2,
            books_edited,
            file3_4_6_1,
            file3_4_6_2,
            e_content,
            file3_4_7_1,
            file3_4_7_2,
            scopus348,
            web_of_science348,
            file3_4_8_1,
            file3_4_8_2,
            scopus349,
            web_of_science349,
            file3_4_9_1,
            file3_4_9_2
        };
        onCrit34Data(crit34);
    }, [code_of_ethics, file3_4_1, incentives, file3_4_2_1, file3_4_2_2, patents_published, file3_4_3_1, file3_4_3_2, phd_awarded, teachers_guides, file3_4_4_1, file3_4_4_2, research_papers_per_teacher, file3_4_5_1, file3_4_5_2, books_edited, file3_4_6_1, file3_4_6_2, e_content, file3_4_7_1, file3_4_7_2, scopus348, web_of_science348, file3_4_8_1, file3_4_8_2, scopus349, web_of_science349, file3_4_9_1, file3_4_9_2]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://naacserver.onrender.com/data/fetchC3?department=${department}&academicYear=${academicYear}`);
            const data = response.data.data.criteria34;

            if (data) {
                setCode_of_ethics(data.code_of_ethics ? data.code_of_ethics : '');
                setIncentives(data.incentives ? data.incentives : '');
                setPatents_published(data.patents_published ? data.patents_published : '');
                setPhd_awarded(data.phd_awarded ? data.phd_awarded : '');
                setTeachers_guides(data.teachers_guides ? data.teachers_guides : '');
                setResearch_papers_per_teacher(data.research_papers_per_teacher ? data.research_papers_per_teacher : '');
                setBooks_edited(data.books_edited ? data.books_edited : '');
                setE_content(data.e_content ? data.e_content : '');
                setScopus348(data.scopus348 ? data.scopus348 : '');
                setWeb_of_science348(data.web_of_science348 ? data.web_of_science348 : '');
                setScopus349(data.scopus349 ? data.scopus349 : '');
                setWeb_of_science349(data.web_of_science349 ? data.web_of_science349 : '');
            }
        } catch (error) {
            console.error("Error fetching data:", error.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div class="c-3-4">
            <h3>3.4 - Research Publication and awards</h3>
            <div className="c-3_4_1">
                <h4>3.4.1 - The institution ensures implementation of its stated Code of Ethics for research</h4>
            </div>
            <div class="c-3-4-1-1">
                <h4>3.4.1.1 - The institution has a stated Code of Ethics for research and the implementation of which is
                    ensured through the following</h4>
                <ol class="list">
                    <li>Inclusion of research ethics in the research methodology coursework</li>
                    <li>Presence of institutional Ethics committees (Animal, chemical, bio-ethics, etc)</li>
                    <li>Plagiarism check</li>
                    <li>Research Advisory Committee</li>
                </ol>
                <div class="radio-group">
                    <p>Select the most appropriate option:</p>
                    <div>
                        <input type="radio" id="option-a" name="answer" value="All of the above" onChange={(e) => setCode_of_ethics(e.target.value)} />
                        <label htmlFor="option-a">A. All of the above</label>

                        <input type="radio" id="option-b" name="answer" value="Any 3 of the above" onChange={(e) => setCode_of_ethics(e.target.value)} />
                        <label htmlFor="option-b">B. Any 3 of the above</label>

                        <input type="radio" id="option-c" name="answer" value="Any 2 of the above" onChange={(e) => setCode_of_ethics(e.target.value)} />
                        <label htmlFor="option-c">C. Any 2 of the above</label>

                        <input type="radio" id="option-d" name="answer" value="Any 1 of the above" onChange={(e) => setCode_of_ethics(e.target.value)} />
                        <label htmlFor="option-d">D. Any 1 of the above</label>

                        <input type="radio" id="option-e" name="answer" value="None of the above" onChange={(e) => setCode_of_ethics(e.target.value)} />
                        <label htmlFor="option-e">E. None of the above</label>
                    </div>
                    <div className="table-3_4_1">
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
                                            id="file3_4_1"
                                            name="fileUpload"
                                            accept=".xls, .xlsx, .doc, .docx, .pdf"
                                            onChange={(e) => setFile3_4_1(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                        <button onClick={() => saveSection({ code_of_ethics, file3_4_1 }, '3-4-1')}>Save</button>
                        </div>
                    </div>
                    <div className="c-3_4_2">
                        <h4>3.4.2 - The institution provides incentives to teachers who receive state, national and international recognitions/awards</h4>
                    </div>
                    <ol class="list">
                        <li> Commendation and monetary incentive at a University function</li>
                        <li>Commendation and medal at a University function</li>
                        <li>Certificate of honork</li>
                        <li>Announcement in the Newsletter I website</li>
                    </ol>
                    <div class="radio-group">
                        <p>Select the most appropriate option:</p>
                        <div>
                            <input type="radio" id="option-a" name="answer" value="All of the above" onChange={(e) => setIncentives(e.target.value)} />
                            <label htmlFor="option-a">A. All of the above</label>

                            <input type="radio" id="option-b" name="answer" value="Any 3 of the above" onChange={(e) => setIncentives(e.target.value)} />
                            <label htmlFor="option-b">B. Any 3 of the above</label>

                            <input type="radio" id="option-c" name="answer" value="Any 2 of the above" onChange={(e) => setIncentives(e.target.value)} />
                            <label htmlFor="option-c">C. Any 2 of the above</label>

                            <input type="radio" id="option-d" name="answer" value="Any 1 of the above" onChange={(e) => setIncentives(e.target.value)} />
                            <label htmlFor="option-d">D. Any 1 of the above</label>

                            <input type="radio" id="option-e" name="answer" value="None of the above" onChange={(e) => setIncentives(e.target.value)} />
                            <label htmlFor="option-e">E. None of the above</label>
                        </div>
                        <div className="table-3_4_2">
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
                                            <button onClick={() => downloadExcel('3.4.2.xlsx')}>Data Template</button>
                                        </td>
                                        <td>
                                            <input
                                                type="file"
                                                id="file3_4_2_1"
                                                name="fileUpload"
                                                accept=".xls, .xlsx, .doc, .docx, .pdf"
                                                onChange={(e) => setFile3_4_2_1(e.target.files[0])}
                                            />
                                        </td>
                                        <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                                    </tr>
                                    <tr>
                                        <td>Upload relevant supporting documents</td>
                                        <td></td>
                                        <td>
                                            <input
                                                type="file"
                                                id="file3_4_2_2"
                                                name="fileUpload"
                                                accept=".xls, .xlsx, .doc, .docx, .pdf"
                                                onChange={(e) => setFile3_4_2_2(e.target.files[0])}
                                            />
                                        </td>
                                        <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div>
                            <button onClick={() => saveSection({ incentives, file3_4_2_1, file3_4_2_2 }, '3-4-2')}>Save</button>
                            </div>
                        </div>
                        <div className="c-3_4_3">
                            <h3>3.4.3 - Number of Patents published/awarded during the year</h3>

                            <div className="c-3_4_3_1">
                                <h4>3.4.3.1 - Total number of Patents published/awarded year wise during the year</h4>
                                <input
                                    type="number"
                                    id="patents_published"
                                    value={patents_published}
                                    onChange={(e) => setPatents_published(e.target.value)}
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
                                                <button onClick={() => downloadExcel('3.4.3.xlsx')}>Data Template</button>
                                            </td>
                                            <td>
                                                <input
                                                    type="file"
                                                    id="file3_4_3_1"
                                                    name="fileUpload"
                                                    accept=".xls, .xlsx"
                                                    onChange={(e) => setFile3_4_3_1(e.target.files[0])}
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
                                                    id="file3_4_3_2"
                                                    name="fileUpload"
                                                    accept=".xls, .xlsx, .doc, .docx, .pdf"
                                                    onChange={(e) => setFile3_4_3_2(e.target.files[0])}
                                                />
                                            </td>
                                            <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div>
                                <button onClick={() => saveSection({ patents_published, file3_4_3_1, file3_4_3_2 }, '3-4-3')}>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="c-3_4_4">
                        <h3>3.4.4 - Number of Ph.D's awarded per teacher during the year</h3>

                        <div className="c-3_4_4_1">
                            <h4>3.4.4.1 - How many Ph.D's are awarded during the year</h4>
                            <input
                                type="number"
                                id="phd_awarded"
                                value={phd_awarded}
                                onChange={(e) => setPhd_awarded(e.target.value)}
                            /><br />
                            <div className="c-3_4_4_2">
                                <h4>3.4.4.2 - Number of teachers recognized as guides during the year</h4>
                                <input
                                    type="number"
                                    id="teachers_guides"
                                    value={teachers_guides}
                                    onChange={(e) => setTeachers_guides(e.target.value)}
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
                                                <button onClick={() => downloadExcel('3.4.4.xlsx')}>Data Template</button>
                                            </td>
                                            <td>
                                                <input
                                                    type="file"
                                                    id="file3_4_4_1"
                                                    name="fileUpload"
                                                    accept=".xls, .xlsx"
                                                    onChange={(e) => setFile3_4_4_1(e.target.files[0])}
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
                                                    id="file3_4_4_2"
                                                    name="fileUpload"
                                                    accept=".xls, .xlsx, .doc, .docx, .pdf"
                                                    onChange={(e) => setFile3_4_4_2(e.target.files[0])}
                                                />
                                            </td>
                                            <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div>
                                <button onClick={() => saveSection({ teachers_guides, phd_awarded, file3_4_4_1, file3_4_4_2 }, '3-4-4')}>Save</button>
                                </div>
                            </div>
                            <div className="c-3_4_5">
                                <h4>3.4.5 - Number of research papers per teacher in the Journals notified on UGC website during the year </h4>
                                <input
                                    type="number"
                                    id="research_papers_per_teacher"
                                    value={research_papers_per_teacher}
                                    onChange={(e) => setResearch_papers_per_teacher(e.target.value)}
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
                                                <button onClick={() => downloadExcel('3.4.5.xlsx')}>Data Template</button>
                                            </td>
                                            <td>
                                                <input
                                                    type="file"
                                                    id="file3_4_5_1"
                                                    name="fileUpload"
                                                    accept=".xls, .xlsx"
                                                    onChange={(e) => setFile3_4_5_1(e.target.files[0])}
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
                                                    id="file3_4_5_2"
                                                    name="fileUpload"
                                                    accept=".xls, .xlsx, .doc, .docx, .pdf"
                                                    onChange={(e) => setFile3_4_5_2(e.target.files[0])}
                                                />
                                            </td>
                                            <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div>
                                <button onClick={() => saveSection({ research_papers_per_teacher, phd_awarded, file3_4_5_1, file3_4_5_2 }, '3-4-5')}>Save</button>
                                </div>
                            </div>
                            <div className="c-3_4_6">
                                <h3>3.4.6 Number of books and chapters in edited volumes published per teacher during the year</h3>

                                <div className="c-3_4_6_1">
                                    <h4>3.4.6.1 - Total number of books and chapters in edited volumes I books published, and papers in national/international onference-proceedings during the year </h4>
                                    <input
                                        type="number"
                                        id="books_edited"
                                        value={books_edited}
                                        onChange={(e) => setBooks_edited(e.target.value)}
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
                                                    <button onClick={() => downloadExcel('3.4.6.xlsx')}>Data Template</button>
                                                </td>
                                                <td>
                                                    <input
                                                        type="file"
                                                        id="file3_4_6_1"
                                                        name="fileUpload"
                                                        accept=".xls, .xlsx"
                                                        onChange={(e) => setFile3_4_6_1(e.target.files[0])}
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
                                                        id="file3_4_6_2"
                                                        name="fileUpload"
                                                        accept=".xls, .xlsx, .doc, .docx, .pdf"
                                                        onChange={(e) => setFile3_4_6_2(e.target.files[0])}
                                                    />
                                                </td>
                                                <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div>
                                    <button onClick={() => saveSection({ books_edited, file3_4_6_1, file3_4_6_2 }, '3-4-6')}>Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="c-3_4_7">
                        <h4>3.4.7 - E-content is developed by teachers</h4>
                    </div>
                    <ol class="list">
                        <li> For e-PG-Pathshala</li>
                        <li>For CEC(Under Graduate)</li>
                        <li>For SWAYAM</li>
                        <li>For other MOOCs platform</li>
                        <li>For NPTEL/NMEICT/any other Governmenr Inititatives</li>
                        <li>For Institutional LMS</li>
                    </ol>
                    <div class="radio-group">
                        <p>Select the most appropriate option:</p>
                        <div>
                            <input type="radio" id="option-a" name="answer" value="A" onChange={() => setE_content('Any 5 or All of the above')} />
                            <label for="option-a">A.Any 5 or All of the above</label>
                            <input type="radio" id="option-a" name="answer" value="B" onChange={() => setE_content('Any 4 of the above')} />
                            <label for="option-b">B. Any 4 of the above</label>
                            <input type="radio" id="option-a" name="answer" value="C" onChange={() => setE_content('Any 3 of the above')} />
                            <label for="option-c">C. Any 3 of the above</label>
                            <input type="radio" id="option-a" name="answer" value="D" onChange={() => setE_content('Any 2 of the above')} />
                            <label for="option-d">D. Any 2 of the above</label>
                            <input type="radio" id="option-a" name="answer" value="E" onChange={() => setE_content('None of the above')} />
                            <label for="option-e">E. None of the above</label>
                        </div>

                        <div className="table-3_4_7">
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
                                            <button onClick={() => downloadExcel('3.4.7.xlsx')}>Data Template</button>
                                        </td>
                                        <td>
                                            <input
                                                type="file"
                                                id="file3_4_7_1"
                                                name="fileUpload"
                                                accept=".xls, .xlsx"
                                                onChange={(e) => setFile3_4_7_1(e.target.files[0])}
                                            />
                                        </td>
                                        <td>.xls, .xlsx <b>File size: 6MB</b> </td>
                                    </tr>
                                    <tr>
                                        <td>Upload relevant supporting documents</td>
                                        <td></td>
                                        <td>
                                            <input
                                                type="file"
                                                id="file3_4_7"
                                                name="fileUpload"
                                                accept=".xls, .xlsx, .doc, .docx, .pdf"
                                                onChange={(e) => setFile3_4_7_2(e.target.files[0])}
                                            />
                                        </td>
                                        <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div>
                            <button onClick={() => saveSection({ e_content, file3_4_7_1, file3_4_7_2 }, '3-4-7')}>Save</button>
                            </div>
                        </div>
                    </div>

                    <div className="c-3_4_8">
                        <h4>3.4.8 - Bibliometrics of the publications during the year based on average Citation Index in Scopus/ Web of Science/PubMed</h4>
                    </div>

                    <div className="table-3_4_8">
                        <table>
                            <thead>
                                <tr>
                                    <th>Scopus</th>
                                    <th>Web of Science</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <input
                                            type="number"
                                            id="scopus348"
                                            value={scopus348}
                                            onChange={(e) => setScopus348(e.target.value)}
                                        /><br />
                                    </td>
                                    <input
                                        type="number"
                                        id="web_of_science348"
                                        value={web_of_science348}
                                        onChange={(e) => setWeb_of_science348(e.target.value)}
                                    /><br />
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="table-3_4_8">
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
                                    <td>Any additional information</td>
                                    <td>
                                    </td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file3_4_8_1"
                                            name="fileUpload"
                                            accept=".xls, .xlsx, .doc, .docx, .pdf"
                                            onChange={(e) => setFile3_4_8_1(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                                </tr>
                                <tr>
                                    <td>Bibliometrics of the publications during the year</td>
                                    <td></td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file3_4_8_2"
                                            name="fileUpload"
                                            accept=".xls, .xlsx, .doc, .docx, .pdf"
                                            onChange={(e) => setFile3_4_8_2(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                        <button onClick={() => saveSection({ scopus348, web_of_science348, file3_4_8_1, file3_4_8_2 }, '3-4-8')}>Save</button>
                        </div>
                    </div>
                    <div className="c-3_4_9">
                        <h4>3.4.9 - Bibliometrics of the publications during the year based on Scopus/ Web of Science — h-lndex of the University</h4>
                    </div>

                    <div className="table-3_4_9_1">
                        <table>
                            <thead>
                                <tr>
                                    <th>Scopus</th>
                                    <th>Web of Science</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <input
                                            type="number"
                                            id="scopus349"
                                            value={scopus349}
                                            onChange={(e) => setScopus349(e.target.value)}
                                        /><br />
                                    </td>
                                    <input
                                        type="number"
                                        id="web_of_science349"
                                        value={web_of_science349}
                                        onChange={(e) => setWeb_of_science349(e.target.value)}
                                    /><br />
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="table-3_4_9">
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
                                    <td>Bibliometrics of the publications based on Scopus/web of Science -h-index of the Institution</td>
                                    <td>
                                    </td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file3_4_9_1"
                                            name="fileUpload"
                                            accept=".xls, .xlsx, .doc, .docx, .pdf"
                                            onChange={(e) => setFile3_4_9_1(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                                </tr>
                                <tr>
                                    <td>Any additional information</td>
                                    <td></td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file3_4_9_2"
                                            name="fileUpload"
                                            accept=".xls, .xlsx, .doc, .docx, .pdf"
                                            onChange={(e) => setFile3_4_9_2(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                        <button onClick={() => saveSection({ scopus349, web_of_science349, file3_4_9_1, file3_4_9_2 }, '3-4-9')}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Criteria34;