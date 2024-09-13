import React, { useState } from "react";
import Criteria61 from "../components/c-6-1";
import Criteria62 from "../components/c-6-2";
import Criteria63 from "../components/c-6-3";
import Criteria64 from "../components/c-6-4";
import Criteria65 from "../components/c-6-5";
import Popup from "../components/popup";
import naacLogo from '../naac_logo.png';
import axios from 'axios';

const Criteria6 = () => {

    const [crit61Data, setCrit61Data] = useState(null);
    const [crit62Data, setCrit62Data] = useState(null);
    const [crit63Data, setCrit63Data] = useState(null);
    const [crit64Data, setCrit64Data] = useState(null);
    const [crit65Data, setCrit65Data] = useState(null);
    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');
    const [showPopup, setShowPopup] = useState(false);

    const handleCrit61Data = (data) => {
        setCrit61Data(data);
    };

    const handleCrit62Data = (data) => {
        setCrit62Data(data);
    };

    const handleCrit63Data = (data) => {
        setCrit63Data(data);
    };

    const handleCrit64Data = (data) => {
        setCrit64Data(data);
    };

    const handleCrit65Data = (data) => {
        setCrit65Data(data);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation check
        if (
            !crit61Data.text6_1_1 ||
            !crit61Data.file6_1_1 ||
            !crit61Data.text6_1_2 ||
            !crit61Data.file6_1_2 ||
            !crit62Data.text6_2_1 ||
            !crit62Data.file6_2_1 ||
            !crit62Data.text6_2_2 ||
            !crit62Data.file6_2_2 ||
            !crit62Data.data6_2_3 ||
            !crit62Data.file6_2_3_1 ||
            !crit62Data.file6_2_3_2 ||
            !crit63Data.text6_3_1 ||
            !crit63Data.file6_3_1 ||
            !crit63Data.data6_3_2 ||
            !crit63Data.file6_3_2_1 ||
            !crit63Data.file6_3_2_2 ||
            !crit63Data.data6_3_3 ||
            !crit63Data.file6_3_3_1 ||
            !crit63Data.file6_3_3_2 ||
            !crit63Data.data6_3_4 ||
            !crit63Data.file6_3_4_1 ||
            !crit63Data.file6_3_4_2 ||
            !crit64Data.text6_4_1 ||
            !crit64Data.file6_4_1 ||
            !crit64Data.data6_4_2 ||
            !crit64Data.file6_4_2_1 ||
            !crit64Data.file6_4_2_2 ||
            !crit64Data.data6_4_3 ||
            !crit64Data.file6_4_3_1 ||
            !crit64Data.file6_4_3_2 ||
            !crit64Data.text6_4_4 ||
            !crit64Data.file6_4_4 ||
            !crit65Data.text6_5_1 ||
            !crit65Data.file6_5_1 ||
            !crit65Data.data6_5_2 ||
            !crit65Data.file6_5_2_1 ||
            !crit65Data.file6_5_2_2 ||
            !crit65Data.text6_5_3 ||
            !crit65Data.file6_5_3
        ) {
            alert("Please fill all the fields before submitting.");
            return;
        }

        setShowPopup(true);
    };

    const handePopupOk = async () => {

        try {
            const formdata = new FormData();
            formdata.append('department', department);
            formdata.append('academicYear', academicYear);

            for (const key in crit61Data) {
                formdata.append(key, crit61Data[key]);
            }

            for (const key in crit62Data) {
                formdata.append(key, crit62Data[key]);
            }

            for (const key in crit63Data) {
                formdata.append(key, crit63Data[key]);
            }

            for (const key in crit64Data) {
                formdata.append(key, crit64Data[key]);
            }

            for (const key in crit65Data) {
                formdata.append(key, crit65Data[key]);
            }

            console.log(formdata);

            const response = await axios.post("https://naacserver.onrender.com/data/criteria6/submit", formdata);
            console.log(response.data);
            alert("Criteria 6 submitted!");
        } catch (error) {
            console.error(error);
            alert("Submission failed. Please try again later.");
        }
        setShowPopup(false);
    }

    const handlePopupClose = () => {
        setShowPopup(false);
    }

    return (
        <div className="criteria6">
            <div className="crit6-head">
                <div className='logo-e'>
                    <img src={naacLogo} alt='NAAC LOGO' />
                    <div className='head'>
                        <h1 >University of Mumbai</h1>
                        <h3>AQAR Platform</h3>
                    </div>
                </div>
                <div className="yearly_status_rep">
                    <p>Yearly Status Report - Part B</p>
                    <p>Academic Year to which AQAR has to be submitted: {academicYear}</p>
                    <p>Department: {department}</p>
                </div>
                <div className="info-section">
                    <h2>Note</h2>
                    <ul>
                        <li>When the save button is clicked, the progress will be restored when you come back.</li>
                        <li>The data can be edited till the time you don't click the submit button</li>
                        <li>Before clicking the submit button, ensure that all the fields are filled even if you had saved the progress</li>
                    </ul>
                </div>
            </div>
            <div className="crit6">
                <Criteria61 onCrit61Data={handleCrit61Data} />
                <Criteria62 onCrit62Data={handleCrit62Data} />
                <Criteria63 onCrit63Data={handleCrit63Data} />
                <Criteria64 onCrit64Data={handleCrit64Data} />
                <Criteria65 onCrit65Data={handleCrit65Data} />
                <div className="button-container">
                    <button onClick={handleSubmit} className="custom-button">Submit</button>
                </div>
                {showPopup && (
                    <Popup
                        message='Once the data is submitted, it cannot be edited. Are you sure you want to submit the data?'
                        onOk={handePopupOk}
                        onClose={handlePopupClose}
                    />
                )}
            </div>
        </div>
    );

}


export default Criteria6;
