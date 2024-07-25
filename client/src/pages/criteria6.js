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

            const response = await axios.post("http://localhost:5000/data/criteria6/submit", formdata);
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
