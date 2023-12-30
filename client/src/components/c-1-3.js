import React from "react";
import { saveAs } from "file-saver";
import StyledTextArea from "./textArea";

const Criteria13 = () => {

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
        <div className="c-1_3">
            <h3>1.3 - Curriculum Enrichment</h3>
            <ul>
                <li>
                    <div className="c-1_3_1">
                        <h4>1.3.1 - Institution integrates crosscutting issues relevant to Professional Ethics, 
                            Gender, Human Values, Environment and Sustainability into the Curriculum
                        </h4>
                        <div className="text-area">
                            <StyledTextArea rows={5} placeholder="Type the text here" />
                        </div>
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
                                <td><input type="file" id="fileUpload1_3_1" name="fileUpload" accept=".xls, .xlsx, .doc, .docx, .pdf" /></td>
                                <td>xls, xlsx, doc, docx, pdf.<b>File size: 6MB</b> </td>
                            </tr>
                        </table>
                    </div>
                </li>
                <li>
                    <div className="c-1_3_2">
                        <h4>1.3.2 - Number of value-added courses for imparting transferable and life skills offered during the year</h4>
                        <input type="number" id="valueAddedCoursesCount1_3_2" />
                        <table>
                            <tr>
                                <th>File Description</th>
                                <th>Template</th>
                                <th>Documents</th>
                                <th>File Types/Size Supported</th>
                            </tr>
                            <tr>
                                <td>Upload the data template</td>
                                <td><button onClick={() => downloadExcel('1.3.2.xlsx')}>Data Template</button></td>
                                <td><input type="file" id="fileUpload1_3_2_1" name="fileUpload" accept=".xls, .xlsx" /></td>
                                <td>xls, xlsx. File size: 6MB</td>
                            </tr>
                            <tr>
                                <td>Upload relevant supporting documents</td>
                                <td></td>
                                <td><input type="file" id="fileUpload1_3_2_2" name="fileUpload" accept=".xls, .xlsx, .doc, .docx, .pdf" /></td>
                                <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                            </tr>
                        </table>
                    </div>
                </li>
                <li>
                    <div className="c-1_3_3">
                        <h4>1.3.3 - Total number of students enrolled in the courses under 1.3.2 above</h4>
                        <ul>
                            <li>
                                <div className="c-1_3_3_1">
                                    <h4>1.3.3.1 - Number of value-added courses for imparting transferable and life skills offered during the year</h4>
                                    <input type="number" id="enrolledStudentsCount1_3_3_1" />
                                    <table>
                                        <tr>
                                            <th>File Description</th>
                                            <th>Template</th>
                                            <th>Documents</th>
                                            <th>File Types/Size Supported</th>
                                        </tr>
                                        <tr>
                                            <td>Upload the data template</td>
                                            <td><button onClick={() => downloadExcel('1.3.3.xlsx')}>Data Template</button></td>
                                            <td><input type="file" id="fileUpload1_3_3_1_1" name="fileUpload" accept=".xls, .xlsx" /></td>
                                            <td>xls, xlsx. File size: 6MB</td>
                                        </tr>
                                        <tr>
                                            <td>Upload relevant supporting documents</td>
                                            <td></td>
                                            <td><input type="file" id="fileUpload1_3_3_1_2" name="fileUpload" accept=".xls, .xlsx, .doc, .docx, .pdf" /></td>
                                            <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                                        </tr>
                                    </table>
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    <div className="c-1_3_4">
                        <h4>1.3.4 - Number of students undertaking field projects/ research projects/ internships during the year</h4>
                        <input type="number" id="projectsCount1_3_4" />
                        <table>
                            <tr>
                                <th>File Description</th>
                                <th>Template</th>
                                <th>Documents</th>
                                <th>File Types/Size Supported</th>
                            </tr>
                            <tr>
                                <td>Upload the data template</td>
                                <td><button onClick={() => downloadExcel('1.3.4.xlsx')}>Data Template</button></td>
                                <td><input type="file" id="fileUpload1_3_4_1" name="fileUpload" accept=".xls, .xlsx" /></td>
                                <td>xls, xlsx. File size: 6MB</td>
                            </tr>
                            <tr>
                                <td>Upload relevant supporting documents</td>
                                <td></td>
                                <td><input type="file" id="fileUpload1_3_4_2" name="fileUpload" accept=".xls, .xlsx, .doc, .docx, .pdf" /></td>
                                <td>xls, xlsx, doc, docx, pdf. <b>File size: 6MB</b> </td>
                            </tr>
                        </table>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default Criteria13;
