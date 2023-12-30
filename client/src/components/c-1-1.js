import React from "react";
import StyledTextArea from "./textArea";
import { saveAs } from 'file-saver';

const Criteria11 = () => {

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

    return(
        <div className="c-1_1">
            <h3>1.1 - Curriculum Design and Development</h3>
            <ul>
                <li>
                    <div className="c-1_1-det">
                        <h4>1.1.1 - Curricula developed and implemented have relevance to the local, regional, national and 
                            global development needs which is reflected in Programme Outcomes(POs), Programme Specific Outcomes(PSOs)
                            and Course Outcome(COs) of the Programmes offered by the University
                        </h4>
                    </div>
                    <div className="text-area">
                        <StyledTextArea rows={5} placeholder="Type the text here" />
                    </div>
                    <div className="table-1_1_1">
                        <table>
                            <tr>
                                <th>File Description</th>
                                <th>Template</th>
                                <th>Documents</th>
                                <th>File Types/Size Supported</th>
                            </tr>
                            <tr>
                                <td>Upload relevant supporting documents</td>
                                <td></td>
                                <td><input type="file" id="fileUpload1_1_1" name="fileUpload" accept=".xls, .xlsx, .doc, .docx, .pdf"  required/></td>
                                <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                            </tr>
                        </table>
                    </div>
                </li>
                <li>
                    <div className="c-1_1_2">
                        <h4>1.1.2- Number of Programmes where syllabus revision was carried out during the year</h4>
                        <input type="number" id="syllabusRevisionCount" /><br />
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
                                        <button onClick={() => downloadExcel('1.1.2.xlsx')}>Data Template</button>
                                    </td>
                                    <td><input type="file" id="fileUpload1_1_2_1" name="fileUpload" accept=".xls, .xlsx" required /></td>
                                    <td>xls, xlsx. File size: 6MB</td>
                                </tr>
                                <tr>
                                    <td>Upload relevant supporting documents</td>
                                    <td></td>
                                    <td>
                                        <input type="file" id="fileUpload1_1_2_2" name="fileUpload" accept=".xls, .xlsx, .doc, .docx, .pdf" required />
                                    </td>
                                    <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </li>
                <li>
                    <div className="c-1_1_3">
                        <h4>1.1.3 - Total number of courses having focus on employability/ entrepreneurship/ skill 
                            development offered by the University during the year
                        </h4>
                        <ul>
                            <li>
                                <h4>1.1.3.1 - Number of courses having focus on employability/ entrepreneurship/ skill development during the year</h4>
                                <input type="number" id="coursesFocusCount" />
                                <table>
                                    <tr>
                                        <th>File Description</th>
                                        <th>Template</th>
                                        <th>Documents</th>
                                        <th>File Types/Size Supported</th>
                                    </tr>
                                    <tr>
                                        <td>Upload the data template</td>
                                        <td><button onClick={() => downloadExcel('1.1.3.xlsx')}>Data Template</button></td>
                                        <td><input type="file" id="fileUpload1_1_3_1" name="fileUpload" accept=".xls, .xlsx" equired  /></td>
                                        <td>xls, xlsx. File size: 6MB</td>
                                    </tr>
                                    <tr>
                                        <td>Upload relevant supporting documents</td>
                                        <td></td>
                                        <td><input type="file" id="fileUpload1_1_3_2" name="fileUpload" accept=".xls, .xlsx, .doc, .docx, .pdf" required /></td>
                                        <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                                    </tr>
                                </table>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Criteria11;
