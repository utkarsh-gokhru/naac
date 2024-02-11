import React, { useState } from "react";
import "../css/criteria1.css";
import Criteria11 from "../components/c-1-1";
import Criteria12 from "../components/c-1-2";
import Criteria13 from "../components/c-1-3";
import Criteria14 from "../components/c-1-4";
import axios from "axios";
import Popup from "../components/popup";
import naacLogo from '../naac_logo.png';

const Criteria1 = () => {
  const [crit12Data, setCrit12Data] = useState(null);
  const [crit13Data, setCrit13Data] = useState(null);
  const [crit14Data, setCrit14Data] = useState(null);
  const [crit11Data, setCrit11Data] = useState(null);
  const department = localStorage.getItem('department');
  const academicYear = localStorage.getItem('academicYear');
  const [showPopup, setShowPopup] = useState(false);

  const handleCrit11Data = (data) => {
    setCrit11Data(data);
  };

  const handleCrit12Data = (data) => {
    setCrit12Data(data);
  };

  const handleCrit13Data = (data) => {
    setCrit13Data(data);
  };

  const handleCrit14Data = (data) => {
    setCrit14Data(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setShowPopup(true);
  };

  const handePopupOk = async () => {

    try {
      const formdata = new FormData();
      formdata.append('department',department)
      formdata.append('academicYear',academicYear);
      for (const key in crit11Data) {
        formdata.append(key, crit11Data[key]);
      }

      for (const key in crit12Data) {
        formdata.append(key, crit12Data[key]);
      }

      for (const key in crit13Data) {
        formdata.append(key, crit13Data[key]);
      }

      for (const key in crit14Data) {
        formdata.append(key, crit14Data[key]);
      }
      const response = await axios.post("https://naacserver.onrender.com/data/submit", formdata);
      console.log(response.data); 
      alert("Criteria 1 submitted!");
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
    <div className="criteria1">
      <div className="crit1-head">
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
      <div className="crit1">
        <h2>Criterion 1 - Curricular Aspects</h2>
        <Criteria11 onCrit11Data={handleCrit11Data} />
        <Criteria12 onCrit12Data={handleCrit12Data} />
        <Criteria13 onCrit13Data={handleCrit13Data} />
        <Criteria14 onCrit14Data={handleCrit14Data} />
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
};

export default Criteria1;
