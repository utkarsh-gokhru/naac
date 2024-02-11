import React, {useState} from 'react'
import "../css/criteria2.css";
// import Criteria21 from "../components/c-2-1";
// import Criteria22 from "../components/c-2-2";
// import Criteria23 from "../components/c-2-3";
// import Criteria24 from "../components/c-2-4";
// import Criteria25 from "../components/c-2-5";
// import Criteria26 from "../components/c-2-6";
// import Criteria27 from "../components/c-2-7";
import naacLogo from '../naac_logo.png';
import axios from "axios";
import Popup from "../components/popup";


const criteria2 = () => {
    // const [crit21Data, setcrit21Data] = useState(null);
//   const [crit22Data, setcrit22Data] = useState(null);
//   const [crit23Data, setcrit23Data] = useState(null);
//   const [crit24Data, setcrit24Data] = useState(null);
//   const [crit25Data, setcrit25Data] = useState(null);
//   const [crit26Data, setcrit26Data] = useState(null);
//   const [crit27Data, setcrit27Data] = useState(null);
  const department = localStorage.getItem('department');
  const academicYear = localStorage.getItem('academicYear');
//   const [showPopup, setShowPopup] = useState(false);

//   const handlecrit21Data = (data) => {
//     setcrit21Data(data);
//   };

//   const handlecrit22Data = (data) => {
//     setcrit22Data(data);
//   };

//   const handlecrit23Data = (data) => {
//     setcrit23Data(data);
//   };

//   const handlecrit24Data = (data) => {
//     setcrit24Data(data);
//   };

//   const handlecrit25Data = (data) => {
//     setcrit24Data(data);
//   };

//   const handlecrit26Data = (data) => {
//     setcrit24Data(data);
//   };

//   const handlecrit27Data = (data) => {
//     setcrit24Data(data);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     setShowPopup(true);
//   };

//   const handePopupOk = async () => {

//     try {
//       const formdata = new FormData();
//       formdata.append('department',department)
//       formdata.append('academicYear',academicYear);
//       for (const key in crit21Data) {
//         formdata.append(key, crit21Data[key]);
//       }

//       for (const key in crit22Data) {
//         formdata.append(key, crit22Data[key]);
//       }

//       for (const key in crit23Data) {
//         formdata.append(key, crit23Data[key]);
//       }

//       for (const key in crit24Data) {
//         formdata.append(key, crit24Data[key]);
//       }

//       for (const key in crit25Data) {
//         formdata.append(key, crit25Data[key]);
//       }

//       for (const key in crit26Data) {
//         formdata.append(key, crit26Data[key]);
//       }

//       for (const key in crit27Data) {
//         formdata.append(key, crit27Data[key]);
//       }

//       const response = await axios.post("https://naacserver.onrender.com/data/submit", formdata);
//       console.log(response.data); 
//       alert("Criteria 2 submitted!");
//     } catch (error) {
//       console.error(error);
//       alert("Submission failed. Please try again later.");
//     }
//     setShowPopup(false);
//   }

//   const handlePopupClose = () => {
//     setShowPopup(false);
//   }

  return (
    <div className="criteria2">
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

    <div className="crit2">
    <h2>CRITERION II - TEACHING-LEARNING AND EVALUATION</h2>
        {/* <Criteria21 oncrit21Data={handleCrit21Data} />
        <Criteria22 oncrit22Data={handleCrit22Data} />
        <Criteria23 oncrit23Data={handleCrit23Data} />
        <Criteria24 oncrit24Data={handleCrit24Data} />
        <Criteria25 onCrit25Data={handleCrit25Data} />
        <Criteria26 onCrit26Data={handlecrit26Data}/>
        <Criteria27 onCrit27Data={handlecrit27Data}/>
        <div className="button-container">
          <button onClick={handleSubmit} className="custom-button">Submit</button>
        </div>
        {showPopup && (
          <Popup 
          message='Once the data is submitted, it cannot be edited. Are you sure you want to submit the data?'
          onOk={handePopupOk}
          onClose={handlePopupClose}
          />
        )} */}
      </div>

    </div>
  )
}

export default criteria2