import React, { useState } from "react";
import Criteria71 from "../components/c-7-1";
import Criteria72 from "../components/c-7-2";
import Criteria73 from "../components/c-7-3";
import Popup from "../components/popup";
import naacLogo from '../naac_logo.png';
import axios from 'axios';


const Criteria7 = () => {

    const [crit71Data, setCrit71Data] = useState(null);
    const [crit72Data, setCrit72Data] = useState(null);
    const [crit73Data, setCrit73Data] = useState(null);
    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');
    const [showPopup, setShowPopup] = useState(false);

    const handleCrit71Data = (data) => {
        setCrit71Data(data);
    };

    const handleCrit72Data = (data) => {
        setCrit72Data(data);
    };

    const handleCrit73Data = (data) => {
        setCrit73Data(data);
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

            for (const key in crit71Data) {
                formdata.append(key, crit71Data[key]);
            }

            for (const key in crit72Data) {
                formdata.append(key, crit72Data[key]);
            }

            for (const key in crit73Data) {
                formdata.append(key, crit73Data[key]);
            }


            console.log(formdata);

            const response = await axios.post("https://naacserver.onrender.com/criteria7/submit", formdata);
            console.log(response.data);
            alert("Criteria 7 submitted!");
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
        <div className="criteria7">
            <div className="crit7-head">
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
            <div className="crit7">
                <Criteria71 onCrit71Data={handleCrit71Data} />
                <Criteria72 onCrit72Data={handleCrit72Data} />
                <Criteria73 onCrit73Data={handleCrit73Data} />
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


export default Criteria7;