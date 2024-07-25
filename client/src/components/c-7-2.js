import React, { useState, useEffect } from "react";
import StyledTextArea from "./textArea";
import axios from "axios";
import '../css/criteria7.css';

const Criteria72 = ({ onCrit72Data }) => {

    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');
    const [text7_2_1, settext7_2_1] = useState("");

    const saveSection = async (sectionData, section) => {
        const formData = new FormData();
        formData.append("department", department);
        formData.append("academicYear", academicYear);
    
        for (const key in sectionData) {
            formData.append(key, sectionData[key]);
        }
    
        try {
            const response = await axios.post(`http://localhost:5000/data/save${section}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            alert(`Saved Section ${section} data`);
        } catch (error) {
            console.log("Error", error.message);
        }
    }
    

    useEffect(() => {
        const crit72 = {
            text7_2_1,
        };
        onCrit72Data(crit72);
    }, [
        text7_2_1,
    ])

    return(
        <div className="c-7-2">
            <h3>7.2 - Best Practices</h3>
            <div className="c-7-2-1">
                <h4>7.2.1 - Describe one best practice successfully implemented by the institution as per NAACformat provided in the Manual</h4>
                <StyledTextArea
                    rows={5}
                    placeholder="Type the text here"
                    value={text7_2_1}
                    onChange={(e) => settext7_2_1(e.target.value)}
                />
                <div>
                    <button onClick={() => saveSection({ text7_2_1 }, '7-2-1')}>Save</button>
                </div>
            </div>
        </div>
    )

}

export default Criteria72;
