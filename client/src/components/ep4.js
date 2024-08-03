import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveAs } from 'file-saver';
import axios from "axios";

const EP4 = ({ onEP4Data }) => {

    const [eligible_admission_applications, seteligible_admission_applications] = useState('');
    const [file4_1, setFile4_1] = useState(null);
    const [reserved_category_seats, setReserved_category_seats] = useState('');
    const [file4_2, setFile4_2] = useState(null);
    const [classrooms_and_seminar_halls, setClassrooms_and_seminar_halls] = useState('');
    const [total_computers, setTotal_computers] = useState('');
    const [total_expenditure, setTotal_expenditure] = useState('');

    const downloadExcel = async (exc_file) => {
        const templateFilePath = `${process.env.PUBLIC_URL}/EP/${exc_file}`;

        try {
            const response = await fetch(templateFilePath);
            const blob = await response.blob();

            saveAs(blob, `${exc_file}_output.xlsx`);
        } catch (error) {
            console.error('Error fetching the template file:', error);
        }
    };

    useEffect(() => {
        const ep4Data = {
            eligible_admission_applications,
            file4_1,
            reserved_category_seats,
            file4_2,
            classrooms_and_seminar_halls,
            total_computers,
            total_expenditure
        };
        onEP4Data(ep4Data);
    }, [eligible_admission_applications, file4_1, reserved_category_seats, file4_2, classrooms_and_seminar_halls, total_computers, total_expenditure]);

    return (
        <div className="sec-4">
            <h3>4. Institution</h3>
            <div className="sec4-1">
                <h4>4.1. Number of eligible applications received for admissions to all the programmes during the year:</h4>
                <input
                    type="number"
                    id="eligible_admission_applications"
                    value={eligible_admission_applications}
                    onChange={(e) => seteligible_admission_applications(e.target.value)}
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
                                Upload the data template</td>
                            <td><button onClick={() => downloadExcel('4.1.xlsx')}>Data Template</button></td>
                            <td>
                                <input
                                    type="file"
                                    id="fileUpload4_1"
                                    onChange={(e) => setFile4_1(e.target.files[0])}
                                    name="fileUpload"
                                    accept=".xls, .xlsx"
                                />
                            </td>
                            <td>xls, xlsx. File size: 6MB</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="sec4-2">
                <h4>4.2. Number of seats earmarked for reserved category as per GOI/State Govt. rule during the year:</h4>
                <input
                    type="number"
                    id="reserved_category_seats"
                    value={reserved_category_seats}
                    onChange={(e) => setReserved_category_seats(e.target.value)}
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
                                Upload the data template</td>
                            <td><button onClick={() => downloadExcel('4.2.xlsx')}>Data Template</button></td>
                            <td>
                                <input
                                    type="file"
                                    id="fileUpload4_2"
                                    onChange={(e) => setFile4_2(e.target.files[0])}
                                    name="fileUpload"
                                    accept=".xls, .xlsx"
                                />
                            </td>
                            <td>xls, xlsx. File size: 6MB</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="sec4-3">
                <h4>4.3.Total number of classrooms and seminar halls:</h4>
                <input
                    type="number"
                    id="classrooms_and_seminar_halls"
                    value={classrooms_and_seminar_halls}
                    onChange={(e) => setClassrooms_and_seminar_halls(e.target.value)}
                />
            </div>
            <div className="sec4-4">
                <h4>4.4.Total number of computers in the campus for academic purpose:</h4>
                <input
                    type="number"
                    id="total_computers"
                    value={total_computers}
                    onChange={(e) => setTotal_computers(e.target.value)}
                />
            </div>
            <div className="sec4-4">
                <h4>4.5.Total expenditure excluding salary during the year (INR in Lakhs):</h4>
                <input
                    type="number"
                    id="total_expenditure"
                    value={total_expenditure}
                    onChange={(e) => setTotal_expenditure(e.target.value)}
                />
            </div>
        </div>
    )
}

export default EP4;
