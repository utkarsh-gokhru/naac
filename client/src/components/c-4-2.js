import React, {useState, useEffect } from "react";

import StyledTextArea from "./textArea";
import { saveAs } from 'file-saver';
import axios from "axios";
import '../css/criteria4.css';

const Criteria42 = ({onCrit42Data}) => {

    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');
    const [automated_library, setautomated_library] = useState("");
    const [subscription, setsubscription] = useState("");
    const [books_expenditure, setbooks_expenditure] = useState("");
    const [library_usage_per_day, setlibrary_usage_per_day] = useState("");
    const [file4_2_1, setFile4_2_1] = useState(null);
    const [file4_2_2, setFile4_2_2] = useState(null);
    const [file4_2_3_1, setFile4_2_3_1] = useState(null);
    const [file4_2_3_2, setFile4_2_3_2] = useState(null);
    const [file4_2_4, setFile4_2_4] = useState(null);

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
        const crit42 = {
            automated_library,
            file4_2_1,
            subscription,
            file4_2_2,
            books_expenditure,
            file4_2_3_1,
            file4_2_3_2,
            library_usage_per_day,
            file4_2_4
        };
        onCrit42Data(crit42);
    },[automated_library,
        file4_2_1,
        subscription,
        file4_2_2,
        books_expenditure,
        file4_2_3_1,
        file4_2_3_2,
        library_usage_per_day,
        file4_2_4])


    const saveSection4_2_1 = async () => {
        const formdata = new FormData();
    
        const sectionData = {
            department,
            academicYear,
            automated_library,
            file4_2_1
        };
    
        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }

        try {
            const response = await axios.post("https://naacserver.onrender.com/save4-2-1", formdata);
            console.log(response.data);
            alert("Saved Section 4.2.1 data successfully!");
        } catch (error) {
            console.error("Error saving Section 4.2.1 data:", error.message);
            alert("Failed to save Section 4.2.1 data. Please try again.");
        }
    };

    const saveSection4_2_2 = async () => {
        const formdata = new FormData();

        const sectionData = {
            department,
            academicYear,
            subscription,
            file4_2_3_1,
            file4_2_3_2
            
        };

        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }
        try {
            const response = await axios.post("https://naacserver.onrender.com/save4-2-2", formdata);
            console.log(response.data);
            alert("Saved Section 4.2.2 data:");
        } catch (error) {
            console.log("Error", error.message);
            alert("Failed to save Section 4.2.2 data. Please try again.");
        }
    };

    const saveSection4_2_3 = async () => {
        const formdata = new FormData();

        const sectionData = {
            department,
            academicYear,
            books_expenditure,
            file4_2_2,
            
        };

        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }
        try {
            const response = await axios.post("https://naacserver.onrender.com/save4-2-3", formdata);
            console.log(response.data);
            alert("Saved Section 4.2.3 data:");
        } catch (error) {
            console.log("Error", error.message);
            alert("Failed to save Section 4.2.3 data. Please try again.");
        }
    };

    const saveSection4_2_4 = async () => {
        const formdata = new FormData();
    
        const sectionData = {
            department,
            academicYear,
            library_usage_per_day,
            file4_2_4
        };
    
        for (const key in sectionData) {
            formdata.append(key, sectionData[key]);
        }

        try {
            const response = await axios.post("https://naacserver.onrender.com/save4-2-4", formdata);
            console.log(response.data);
            alert("Saved Section 4.2.4 data successfully!");
        } catch (error) {
            console.error("Error saving Section 4.2.4 data:", error.message);
            alert("Failed to save Section 4.2.4 data. Please try again.");
        }
    };

    return(
        <div className="c-4-2">
            <h3>4.2 - Library as a Learning Resource</h3>

            <div className="c-4-2-1">
                <h4>4.2.1 - Libarary is automated using integrated Library Management System (ILMS) and has digitisation facility</h4>

                <StyledTextArea
                                rows={5}
                                placeholder="Type the text here"
                                value={automated_library}
                                onChange={(e) => setautomated_library(e.target.value)}
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
                                            id="file4_2_1"
                                            name="fileUpload"
                                            accept=".xls, .xlsx, .doc, .docx, .pdf"
                                            onChange={(e) => setFile4_2_1(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <button onClick={() => saveSection4_2_1({automated_library,file4_2_1},'4-2-1')}>Save</button>
                        </div>
            </div>

            <div className="c-4-2-2">

            <h4>4.2.2 - Institution has subscription for e-library resources Library has regular subscription for the following:</h4>
            <ul>
                <li><h4>1. e-journals</h4></li>
                <li><h4>2. e-books</h4></li>
                <li><h4>3. e-ShoshSindhu </h4></li>
                <li><h4>4. Shodhganga</h4></li>
                <li><h4>5. Databases</h4></li>
            </ul>
            <form action="/submit-response" method="post">
                <input type="radio" id="all" name="option" value="all" onChange={(e) => setsubscription(e.target.value)} />
                <label htmlFor="all">Any 4 or All of the above</label><br />

                <input type="radio" id="any3" name="option" value="any3" onChange={(e) => setsubscription(e.target.value)} />
                <label htmlFor="any3">Any 3 of the above</label><br />

                <input type="radio" id="any2" name="option" value="any2" onChange={(e) => setsubscription(e.target.value)} />
                <label htmlFor="any2">Any 2 of the above</label><br />

                <input type="radio" id="any1" name="option" value="any1" onChange={(e) => setsubscription(e.target.value)} />
                <label htmlFor="any1">Any 1 of the above</label><br />

                <input type="radio" id="none" name="option" value="none" onChange={(e) => setsubscription(e.target.value)} />
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
                                            id="file4_2_2"
                                            name="fileUpload"
                                            accept=".xls, .xlsx, .doc, .docx, .pdf"
                                            onChange={(e) => setFile4_2_2(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <button onClick={() => saveSection4_2_2({subscription,file4_2_2},'4-2-2')}>Save</button>
                        </div>
            </div>

            <div className="c-4-2-3">
                <h4>4.2.3 - Annual expenditure for purchase of books/ e-books and subscription to journals/ e-journals during the year (INR in Lakhs)</h4>
                
                <input
                            type="number"
                            id="books_expenditure"
                            value={books_expenditure}
                            onChange={(e) => setbooks_expenditure(e.target.value)}
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
                                        <button onClick={() => downloadExcel('4.2.3.xlsx')}>Data Template</button>
                                    </td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file4_2_3_1"
                                            name="fileUpload"
                                            accept=".xls, .xlsx"
                                            onChange={(e) => setFile4_2_3_1(e.target.files[0])}
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
                                            id="file4_2_3_2"
                                            name="fileUpload"
                                            accept=".xls, .xlsx, .doc, .docx, .pdf"
                                            onChange={(e) => setFile4_2_3_2(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <button onClick={saveSection4_2_3}>Save</button>
                    </div>
            </div>

            <div className="c-4-2-4">
                <h4>4.2.4 - Number of usage of library by teachers and students per day (foot falls and login data for online access)</h4>

                <input
                            type="number"
                            id="library_usage_per_day"
                            value={library_usage_per_day}
                            onChange={(e) => setlibrary_usage_per_day(e.target.value)}
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
                                        Upload relevant supporting documents
                                    </td>
                                    <td></td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file4_2_4"
                                            name="fileUpload"
                                            accept=".xls, .xlsx, .doc, .docx, .pdf"
                                            onChange={(e) => setFile4_2_4(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <button onClick={saveSection4_2_4}>Save</button>
                    </div>
            </div>


        </div>
    )

}

export default Criteria42