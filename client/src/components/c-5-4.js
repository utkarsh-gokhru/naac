import React, { useState, useEffect } from "react";
import StyledTextArea from "./textArea";
import { saveAs } from 'file-saver';
import axios from "axios";
import '../css/criteria5.css';

const Criteria54 = ({onCrit54Data}) => {

    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');

    const [alumni_chapters, setAlumni_chapters] = useState('');
    const[file5_4_1, setFile5_4_1] = useState(null);
    const [alumni_contributions, setAlumni_contributions] = useState('');
    const[file5_4_2, setFile5_4_2] = useState(null);

    const saveSection = async (sectionData,section) => {
        const formData = new FormData();

        formData.append("department", department);
        formData.append("academicYear", academicYear);

        for (const key in sectionData) {
            formData.append(key, sectionData[key]);
        }
        try{
            const response = await axios.post(`https://naacserver.onrender.com/data/save${section}`, formData);
            console.log(response.data); 
            alert(`Saved Section ${section} data`);
        }catch(error){
            console.log("Error",error.message);
        }

    };

    useEffect(() => {
        const crit54 = {
            alumni_chapters,
            file5_4_1,
            alumni_contributions,
            file5_4_2
        };
        onCrit54Data(crit54);
    }, [alumni_chapters, file5_4_1, alumni_contributions, file5_4_2]);
    

    // const saveSection5_4_1 = async() => {
    //     const formdata = new FormData();

    //     const sectionData = {
    //         department,
    //         academicYear,
    //         alumni_chapters,
    //         file5_4_1
    //     };

    //     for (const key in sectionData) {
    //         formdata.append(key, sectionData[key]);
    //     }
    //     try{
    //         const response = await axios.post("https://naacserver.onrender.com/data/save5-4-1", formdata);
    //         console.log(response.data); 
    //         alert("Saved Section 5.4.1 data:");
    //     }catch(error){
    //         console.log("Error",error.message);
    //     }
    // };

    // const saveSection5_4_2 = async() => {
    //     const formdata = new FormData();

    //     const sectionData = {
    //         department,
    //         academicYear,
    //         alumni_contributions,
    //         file5_4_2
    //     };

    //     for (const key in sectionData) {
    //         formdata.append(key, sectionData[key]);
    //     }
    //     try{
    //         const response = await axios.post("https://naacserver.onrender.com/data/save5-4-1", formdata);
    //         console.log(response.data); 
    //         alert("Saved Section 5.4.1 data:");
    //     }catch(error){
    //         console.log("Error",error.message);
    //     }
    // };

    return(
        <div className="c-5-4">
            <h3>Alumni Engagement</h3>
            <ul>
                <li>
                    <div className="c-5-4-1">
                        <h4>5.4.1 - The Alimni Association/Chapters (registered and functional) contributes significantly 
                            to the development of the institution through financial aid and support services during the year
                        </h4>
                        <StyledTextArea
                                rows={5}
                                placeholder="Type the text here"
                                value={alumni_chapters}
                                onChange={(e) => setAlumni_chapters(e.target.value)}
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
                                            id="file5_4_1"
                                            name="fileUpload"
                                            accept=".xls, .xlsx, .doc, .docx, .pdf"
                                            onChange={(e) => setFile5_4_1(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <button onClick={() => saveSection({alumni_chapters,file5_4_1},'5-4-1')}>Save</button>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="c-5-4-2">
                        <h4>Alumni contribution during the year(INR in Lakhs)</h4>
                        <div className="radioBtn-5_4_2">
                            <input type="radio" id="all4_5_4_2" name="group5_4_2" onChange={() => setAlumni_contributions('Greater than 5Lakhs')} />
                            <label htmlFor="all4_5_4_2">A. Greater than 5Lakhs</label>

                            <input type="radio" id="any3_5_4_2" name="group5_4_2" onChange={() => setAlumni_contributions('4Lakhs - 5Lakhs')} />
                            <label htmlFor="any3_5_4_2">B. 4Lakhs - 5Lakhs</label>

                            <input type="radio" id="any2_5_4_2" name="group5_4_2" onChange={() => setAlumni_contributions('3Lakhs - 4Lakhs')} />
                            <label htmlFor="any2_5_4_2">C. 3Lakhs - 4Lakhs</label>

                            <input type="radio" id="any1_5_4_2" name="group5_4_2" onChange={() => setAlumni_contributions('1Lakhs - 3Lakhs')} />
                            <label htmlFor="any1_5_4_2">D. 1Lakhs - 3Lakhs</label>

                            <input type="radio" id="none_5_4_2" name="group5_4_2" onChange={() => setAlumni_contributions('Less than 1Lakh')} />
                            <label htmlFor="none_5_4_2">E. Less than 1Lakh</label>
                        </div>
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
                                    <td>
                                        Upload relevant supporting documents
                                    </td>
                                    <td></td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file5_4_2"
                                            name="fileUpload"
                                            accept=".xls, .xlsx, .doc, .docx, .pdf"
                                            onChange={(e) => setFile5_4_2(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <button onClick={() => saveSection({alumni_contributions,file5_4_2},'5-4-2')}>Save</button>
                        </div>
                </li>
            </ul>
        </div>
    )
};

export default Criteria54;
