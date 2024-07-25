import React, { useState, useEffect } from "react";
import StyledTextArea from "./textArea";
import axios from "axios";
import '../css/criteria7.css';


const Criteria73 = ({ onCrit73Data }) => {

    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');
    const [text_7_3_1, settext_7_3_1] = useState("");
    const [text_7_3_2, settext_7_3_2] = useState("");

    const saveSection = async (sectionData, section) => {
        const formData = new FormData();

        formData.append("department", department);
        formData.append("academicYear", academicYear);

        for (const key in sectionData) {
            formData.append(key, sectionData[key]);
        }
        try {
            const response = await axios.post(`http://localhost:5000/data/save${section}`, formData);
            console.log(response.data);
            alert(`Saved Section ${section} data`);
        } catch (error) {
            console.log("Error", error.message);
        }
    }

    useEffect(() => {
        const crit73 = {
            text_7_3_1,
            text_7_3_2,
        };
        onCrit73Data(crit73);
    }, [
        text_7_3_1,
        text_7_3_2,
    ])

    return(
        <div className="c-7-3">
            <h3>7.3 - Institutional Distinctiveness</h3>
            <div className="c-7-3-1">
                <h4>7.3.1 - Higlight the performance of the institution in an area distinct to its priority and thrust ( within a maximum of 200 words)</h4>
                <StyledTextArea
                    rows={5}
                    placeholder="Type the text here"
                    value={text_7_3_1}
                    onChange={(e) => settext_7_3_1(e.target.value)}
                />
                <div>
                    <button onClick={() => saveSection({ text_7_3_1}, '7-3-1')}>Save</button>
                </div>
            </div>
            <div className="c-7-3-2">
                <h4>7.3.2 - Plan of action for the next academic year</h4>
                <StyledTextArea
                    rows={5}
                    placeholder="Type the text here"
                    value={text_7_3_2}
                    onChange={(e) => settext_7_3_2(e.target.value)}
                />
                <div>
                    <button onClick={() => saveSection({ text_7_3_2}, '7-3-2')}>Save</button>
                </div>
            </div>
        </div>
    )

}

export default Criteria73;