import React, { useState } from "react";
import axios from "axios";
import Popup from "../components/popup";
import naacLogo from '../naac_logo.png';
import EP1 from "../components/ep-1";
import EP2 from "../components/ep-2";
import EP3 from "../components/ep-3";
import EP4 from "../components/ep4";
import '../css/ep.css';

const ExtendedProfile = () => {

    const [ep1Data, setEp1Data] = useState(null);
    const [ep2Data, setEp2Data] = useState(null);
    const [ep3Data, setEp3Data] = useState(null);
    const [ep4Data, setEp4Data] = useState(null);
    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');
    const [showPopup, setShowPopup] = useState(false);

    const handleEp1Data = (data) => {
        setEp1Data(data);
    };

    const handleEp2Data = (data) => {
        setEp2Data(data);
    };

    const handleEp3Data = (data) => {
        setEp3Data(data);
    };

    const handleEp4Data = (data) => {
        setEp4Data(data);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
      
        // Validation check
        if (
          !ep1Data.programmes ||
          !ep1Data.file1_1 ||
          !ep1Data.departments ||
          !ep2Data.students ||
          !ep2Data.file2_1 ||
          !ep2Data.outgoing_students ||
          !ep2Data.file2_2 ||
          !ep2Data.students_appeared_in_university_exam ||
          !ep2Data.file2_3 ||
          !ep2Data.reval_applications ||
          !ep3Data.courses_in_all_programmes ||
          !ep3Data.file3_1 ||
          !ep3Data.full_time_teachers ||
          !ep3Data.file3_2 ||
          !ep3Data.sanctioned_posts ||
          !ep3Data.file3_3 ||
          !ep4Data.eligible_admission_applications ||
          !ep4Data.file4_1 ||
          !ep4Data.reserved_category_seats ||
          !ep4Data.file4_2 ||
          !ep4Data.classrooms_and_seminar_halls ||
          !ep4Data.total_computers ||
          !ep4Data.total_expenditure
        ) {
          alert("Please fill all the fields before submitting.");
          return;
        }
      
        setShowPopup(true);
      };      

    const handlePopupOk = async () => {
        try {
            const formdata = new FormData();
            formdata.append('department', department);
            formdata.append('academicYear', academicYear);

            for (const key in ep1Data) {
                formdata.append(key, ep1Data[key]);
            }

            for (const key in ep2Data) {
                formdata.append(key, ep2Data[key]);
            }

            for (const key in ep3Data) {
                formdata.append(key, ep3Data[key]);
            }

            for (const key in ep4Data) {
                formdata.append(key, ep4Data[key]);
            }

            const response = await axios.post("https://naacserver.onrender.com/epData/extended-profile/submit", formdata);
            console.log(response.data);
            alert("Data submitted successfully!");
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 400) {
                alert("Submission failed due to incomplete data. Please fill all the data and try again.");
            } else {
                alert("Submission failed. Please try again later.");
            }
        }
        setShowPopup(false);
    };

    const handlePopupClose = () => {
        setShowPopup(false);
    };

    return (
        <div className="extended-profile">
            <div className="ep-head">
                <div className='logo-e'>
                    <img src={naacLogo} alt='NAAC LOGO' />
                    <div className='head'>
                        <h1 >University of Mumbai</h1>
                        <h3>AQAR Platform</h3>
                    </div>
                </div>
                <div className="yearly_status_rep">
                    <p>Yearly Status Report - Extended Profile</p>
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
            <div className="EP">
                <EP1 onEP1Data={handleEp1Data} />
                <EP2 onEP2Data={handleEp2Data} />
                <EP3 onEP3Data={handleEp3Data} />
                <EP4 onEP4Data={handleEp4Data} />
            </div>
            <div className="button-container">
                <button onClick={handleSubmit} className="custom-button">Submit</button>
            </div>
            {showPopup && (
                <Popup
                    message='Once the data is submitted, it cannot be edited. Are you sure you want to submit the data?'
                    onOk={handlePopupOk}
                    onClose={handlePopupClose}
                />
            )}
        </div>
    )
}

export default ExtendedProfile;
