import React from "react";

const Criteria12 = () => {
    return (
        <div className="c-1_2">
            <h3>1.2 - Academic Flexibility</h3>
            <ul>
                <li>
                    <div className="c-1_2_1">
                        <h4>1.2.1 - Number of new courses introduced of the total number of courses across all programs offered during the year</h4>
                        <input type="number" />
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
                                    <td></td>
                                    <td></td>
                                    <td>xls,xlsx. File size: 6MB</td>
                                </tr>
                                <tr>
                                    <td>Upload relevant supporting documents</td>
                                    <td></td>
                                    <td><input type="file" id="fileUpload1" name="fileUpload1" accept=".xls, .xlsx, .doc, .docx, .pdf" /></td>
                                    <td>xls,xlsx,doc,docx,pdf. <b>File size: 6MB</b> </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </li>
                <li>
                    <div className="c-1_2_2">
                        <h4>1.2.2 - Number of Programmes in which Choice Based Credit System (CBCS)/elective course system has been implemented during the year</h4>
                        <input type="number" />
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
                                    <td></td>
                                    <td></td>
                                    <td>xls,xlsx. File size: 6MB</td>
                                </tr>
                                <tr>
                                    <td>Upload relevant supporting documents</td>
                                    <td></td>
                                    <td><input type="file" id="fileUpload2" name="fileUpload2" accept=".xls, .xlsx, .doc, .docx, .pdf" /></td>
                                    <td>xls,xlsx,doc,docx,pdf. <b>File size: 6MB</b> </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Criteria12;
