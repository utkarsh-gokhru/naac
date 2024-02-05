import React, {useState, useEffect} from 'react'
import StyledTextArea from "./textArea";
import { saveAs } from 'file-saver';
import axios from "axios";

export const Criteria21 = () => {

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


  return (
   <div class='c-2-1'>
    <h3>2.1 - Student Enrollment and Profile</h3>

    <h4>2.1.1 - Demand Ratio</h4>

    <h4>2.1.1.1 - Number of seats available during the year</h4>
    <input
                            type="number"
                            // id="syllabusRevisionCount"
                            // value={syllabusRevisionCount}
                            // onChange={(e) => setSyllabusRevisionCount(e.target.value)}
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
                                    <td> {file2_1_1_1 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}
                                      
                                        Upload the data template</td>
                                    <td>
                                        <button onClick={() => downloadExcel('2.1.1.xlsx')}>Data Template</button>
                                    </td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file1_1_2_1"
                                            name="fileUpload"
                                            accept=".xls, .xlsx"
                                            onChange={(e) => setFile1_1_2_1(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx. File size: 6MB</td>
                                </tr>
                                <tr>
                                    <td> {file1_1_2_2 === 'true' ? (<span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>) : (<span style={{ color: 'red', fontWeight: 'bold' }}></span>)}
                                        Upload relevant supporting documents</td>
                                    <td></td>
                                    <td>
                                        <input
                                            type="file"
                                            id="file1_1_2_2"
                                            name="fileUpload"
                                            accept=".xls, .xlsx, .doc, .docx, .pdf"
                                            onChange={(e) => setFile1_1_2_2(e.target.files[0])}
                                        />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
                                </tr>
                            </tbody>
                        </table>
    
   </div>
  )
}

export default Criteria21;

