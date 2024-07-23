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

    return(
        <div className="c-4-2">
            <h3>4.2 - Library as a Learning Resource</h3>

            <div className="c-4-2-1">
                
            </div>
        </div>
    )

}

export default Criteria42