import React from "react";
import { saveAs } from "file-saver";

const Criteria14 = () => {

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
        <div className="c-1_4">
            <h3>1.4 - Feedback System</h3>
            <ul>
                <li>
                    <div className="c-1_4_1">
                        <h4>1.4.1 - Structured feedback for design and review of syllabus-semester wise is received from </h4>
                        <ol>
                            <li>Students</li>
                            <li>Teachers</li>
                            <li>Employers</li>
                            <li>Alumni</li>
                        </ol>
                        <br />
                        <div className="radioBtn-1_4_1">
                            <input type="radio" id="all4_1_4_1" name="group1_4_1" />
                            <label htmlFor="all4_1_4_1">All 4 of the above</label>

                            <input type="radio" id="any3_1_4_1" name="group1_4_1" />
                            <label htmlFor="any3_1_4_1">Any 3 of the above</label>

                            <input type="radio" id="any2_1_4_1" name="group1_4_1" />
                            <label htmlFor="any2_1_4_1">Any 2 of the above</label>

                            <input type="radio" id="any1_1_4_1" name="group1_4_1" />
                            <label htmlFor="any1_1_4_1">Any 1 of the above</label>

                            <input type="radio" id="none_1_4_1" name="group1_4_1" />
                            <label htmlFor="none_1_4_1">None of the above</label>
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
                                <td><button onClick={() => downloadExcel('1.4.1.xlsx')}>Data Template</button></td>
                                <td><input type="file" id="fileUpload_1_4_1" name="fileUpload" accept=".xls, .xlsx" /></td>
                                <td>xls, xlsx. <b>File size: 6MB</b> </td>
                            </tr>
                        </table>
                    </div>
                </li>
                <li>
                    <div className="c-1_4_2">
                        <h4>1.4.2 - Feedback processes of the institution may be classified as follows</h4>
                        <div className="radioBtn-1_4_2">
                            <input type="radio" id="feedback1_1_4_2" name="group2_1_4_2" />
                            <label htmlFor="feedback1_1_4_2">Feedback collected, analyzed and action taken and feedback available on website</label>

                            <input type="radio" id="feedback2_1_4_2" name="group2_1_4_2" />
                            <label htmlFor="feedback2_1_4_2">Feedback collected, analyzed and action has been taken</label>

                            <input type="radio" id="feedback3_1_4_2" name="group2_1_4_2" />
                            <label htmlFor="feedback3_1_4_2">Feedback collected and analyzed</label>

                            <input type="radio" id="feedback4_1_4_2" name="group2_1_4_2" />
                            <label htmlFor="feedback4_1_4_2">Feedback collected</label>

                            <input type="radio" id="feedback5_1_4_2" name="group2_1_4_2" />
                            <label htmlFor="feedback5_1_4_2">Feedback not collected</label>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default Criteria14;
