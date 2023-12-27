import React from "react";

const Criteria14 = () => {
    return(
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
                        <br/>
                        <div className="radioBtn-1_4_1">
                            <input type="radio" id="all4" name="group1" />
                            <label htmlFor="all4">All 4 of the above</label>

                            <input type="radio" id="any3" name="group1" />
                            <label htmlFor="any3">Any 3 of the above</label>

                            <input type="radio" id="any2" name="group1" />
                            <label htmlFor="any2">Any 2 of the above</label>

                            <input type="radio" id="any1" name="group1" />
                            <label htmlFor="any1">Any 1 of the above</label>

                            <input type="radio" id="none" name="group1" />
                            <label htmlFor="none">None of the above</label>
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
                                <td><input type="file" id="fileUpload" name="fileUpload" accept=".xls, .xlsx" /></td>
                                <td>xls,xlsx<b>File size: 6MB</b> </td>
                            </tr>
                        </table>
                    </div>
                </li>
                <li>
                    <div className="c-1_4_2">
                        <h4>1.4.2 - Feedback processes of the institution may be classified as follows</h4>
                        <div className="radioBtn-1_4_2">
                            <input type="radio" id="feedback1" name="group2" />
                            <label htmlFor="feedback1">Feedback collected, analyzed and action taken and feedback available on website</label>

                            <input type="radio" id="feedback2" name="group2" />
                            <label htmlFor="feedback2">Feedback collected, analyzed and action has been taken</label>

                            <input type="radio" id="feedback3" name="group2" />
                            <label htmlFor="feedback3">Feedback collected and analyzed</label>

                            <input type="radio" id="feedback4" name="group2" />
                            <label htmlFor="feedback4">Feedback collected</label>

                            <input type="radio" id="feedback5" name="group2" />
                            <label htmlFor="feedback5">Feedback not collected</label>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Criteria14;
