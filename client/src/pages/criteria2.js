import React, { useState } from 'react'
import "../css/criteria2.css";
import Criteria21 from "../components/c-2-1";
import Criteria22 from "../components/c-2-2";
import Criteria23 from "../components/c-2-3";
import Criteria24 from "../components/c-2-4";
import Criteria25 from "../components/c-2-5";
import Criteria26 from "../components/c-2-6";
import Criteria27 from "../components/c-2-7";
import naacLogo from '../naac_logo.png';
import axios from "axios";
import Popup from "../components/popup";

const Criteria2 = () => {
  const [crit21Data, setcrit21Data] = useState(null);
  const [crit22Data, setcrit22Data] = useState(null);
  const [crit23Data, setcrit23Data] = useState(null);
  const [crit25Data, setcrit25Data] = useState(null);
  const [crit24Data, setcrit24Data] = useState(null);
  const [crit26Data, setcrit26Data] = useState(null);
  const [crit27Data, setcrit27Data] = useState(null);
  const department = localStorage.getItem('department');
  const academicYear = localStorage.getItem('academicYear');
  const [showPopup, setShowPopup] = useState(false);

  const handleCrit21Data = (data) => {
    setcrit21Data(data);
  };

  const handleCrit22Data = (data) => {
    setcrit22Data(data);
  };

  const handleCrit23Data = (data) => {
    setcrit23Data(data);
  };

  const handleCrit24Data = (data) => {
    setcrit24Data(data);
  };

  const handleCrit25Data = (data) => {
    setcrit25Data(data);
  };

  const handleCrit26Data = (data) => {
    setcrit26Data(data);
  };

  const handleCrit27Data = (data) => {
    setcrit27Data(data);
  };

  const validateFields = () => {
    return (
      crit21Data.no_of_seats &&
      crit21Data.file2_1_1_1 &&
      crit21Data.file2_1_1_2 &&
      crit21Data.students_reserved_cat &&
      crit21Data.file2_1_2_1 &&
      crit21Data.file2_1_2_2 &&
      crit22Data.learning_assessment &&
      crit22Data.file2_2_1_1 &&
      crit22Data.link2_2_1_2 &&
      crit22Data.no_of_students &&
      crit22Data.no_of_teachers &&
      crit22Data.file2_2_2 &&
      crit23Data.learning_exp &&
      crit23Data.file2_3_1 &&
      crit23Data.effect_teach_learn &&
      crit23Data.file2_3_2 &&
      crit23Data.no_of_mentors &&
      crit23Data.file2_3_3 &&
      crit24Data.full_time_teachers &&
      crit24Data.file2_4_1_1 &&
      crit24Data.file2_4_1_2 &&
      crit24Data.full_time_teachers_phd_etc &&
      crit24Data.file2_4_2_1 &&
      crit24Data.file2_4_2_2 &&
      crit24Data.total_exp &&
      crit24Data.file2_4_3_1 &&
      crit24Data.file2_4_3_2 &&
      crit24Data.award_rec_teachers &&
      crit24Data.file2_4_4_1 &&
      crit24Data.file2_4_4_2 &&
      crit25Data.no_of_days &&
      crit25Data.no_of_days_yearwise &&
      crit25Data.file2_5_1_1 &&
      crit25Data.file2_5_1_2 &&
      crit25Data.no_of_student_grievances &&
      crit25Data.file2_5_2 &&
      crit25Data.it_integration &&
      crit25Data.file2_5_3 &&
      crit25Data.status_of_automation &&
      crit25Data.file2_5_4_1 &&
      crit25Data.file2_5_4_2 &&
      crit26Data.learning_outcomes &&
      crit26Data.file2_6_1 &&
      crit26Data.attainment_prog_outcomes &&
      crit26Data.file2_6_2 &&
      crit26Data.final_year_students_passed &&
      crit26Data.final_year_students_appeared &&
      crit26Data.file2_6_3_2_1 &&
      crit26Data.file2_6_3_2_2 &&
      crit27Data.sss_web_link
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateFields()) {
      alert("Please fill all the fields before submitting.");
      return;
    }
    setShowPopup(true);
  };

  const handlePopupOk = async () => {

    try {
      const formdata = new FormData();
      formdata.append('department', department)
      formdata.append('academicYear', academicYear);
      for (const key in crit21Data) {
        formdata.append(key, crit21Data[key]);
      }

      for (const key in crit22Data) {
        formdata.append(key, crit22Data[key]);
      }

      for (const key in crit23Data) {
        formdata.append(key, crit23Data[key]);
      }

      for (const key in crit24Data) {
        formdata.append(key, crit24Data[key]);
      }

      for (const key in crit25Data) {
        formdata.append(key, crit25Data[key]);
      }

      for (const key in crit26Data) {
        formdata.append(key, crit26Data[key]);
      }

      for (const key in crit27Data) {
        formdata.append(key, crit27Data[key]);
      }

      const response = await axios.post("https://naacserver.onrender.com/data/criteria2/submit", formdata);
      console.log(response.data);
      alert("Criteria 2 submitted!");
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
    <div className="Criteria2">
      <div className='crit2-head'>
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
      </div>

      <div className="crit2">
        <Criteria21 onCrit21Data={handleCrit21Data} />
        <Criteria22 onCrit22Data={handleCrit22Data} />
        <Criteria23 onCrit23Data={handleCrit23Data} />
        <Criteria24 onCrit24Data={handleCrit24Data} />
        <Criteria25 onCrit25Data={handleCrit25Data} />
        <Criteria26 onCrit26Data={handleCrit26Data} />
        <Criteria27 onCrit27Data={handleCrit27Data} />
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
    </div>
  )
}

export default Criteria2;
