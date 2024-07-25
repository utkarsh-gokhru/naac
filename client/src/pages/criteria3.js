import React , {useState} from "react";
import Criteria31 from "../components/c-3-1";
import Criteria32 from "../components/c-3-2";
import Criteria33 from "../components/c-3-3";
import Criteria34 from "../components/c-3-4";
import Criteria35 from "../components/c-3-5";
import Criteria36 from "../components/c-3-6";
import Criteria37 from "../components/c-3-7";
import Popup from "../components/popup";
import naacLogo from '../naac_logo.png';
import axios from 'axios';

const Criteria3 = () => {

    const [crit31Data, setCrit31Data] = useState(null);
    const [crit32Data, setCrit32Data] = useState(null);
    const [crit33Data, setCrit33Data] = useState(null);
    const [crit34Data, setCrit34Data] = useState(null);
    const [crit35Data, setCrit35Data] = useState(null);
    const [crit36Data, setCrit36Data] = useState(null);
    const [crit37Data, setCrit37Data] = useState(null);
    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');
    const [showPopup, setShowPopup] = useState(false);

    const handleCrit31Data = (data) => {
        setCrit31Data(data);
    };

    const handleCrit32Data = (data) => {
        setCrit32Data(data);
    };

    const handleCrit33Data = (data) => {
        setCrit33Data(data);
    };

    const handleCrit34Data = (data) => {
        setCrit34Data(data);
    };

    const handleCrit35Data = (data) => {
        setCrit35Data(data);
    };

    const handleCrit36Data = (data) => {
        setCrit36Data(data);
    };

    const handleCrit37Data = (data) => {
        setCrit37Data(data);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        setShowPopup(true);
    };
    
    const handePopupOk = async () => {

    try {
        const formdata = new FormData();
        formdata.append('department',department);
        formdata.append('academicYear',academicYear);

        for (const key in crit31Data) {
            formdata.append(key, crit31Data[key]);
        }

        for (const key in crit32Data) {
            formdata.append(key, crit32Data[key]);
        }

        for (const key in crit33Data) {
            formdata.append(key, crit33Data[key]);
        }

        for (const key in crit34Data) {
            formdata.append(key, crit34Data[key]);
        }

        for (const key in crit35Data) {
            formdata.append(key, crit35Data[key]);
        }

        for (const key in crit36Data) {
            formdata.append(key, crit36Data[key]);
        }

        for (const key in crit37Data) {
            formdata.append(key, crit37Data[key]);
        }

        console.log(formdata);

        // if (!crit31Data || !crit32Data || !crit33Data || !crit34Data || !crit35Data || !crit36Data || !crit37Data) {
        //     alert("Please fill in all the fields before submitting.");
        //     return;
        // }
    
        // // Check if any data is null or undefined
        // const allData = [crit31Data, crit32Data, crit33Data, crit34Data, crit35Data, crit36Data, crit37Data];
        // for (const data of allData) {
        //     for (const key in data) {
        //         console.log(data);
        //         if (data[key] === null || data[key] === undefined) {
        //             alert("Please fill in all the fields before submitting.");
        //             return;
        //         }
        //     }
        // }

        const response = await axios.post("https://naacserver.onrender.com/criteria3/submit", formdata);
        console.log(response.data); 
        alert("Criteria 3 submitted!");
    } catch (error) {
        console.error(error);
        alert("Submission failed. Please try again later.");
    }
    setShowPopup(false);
    }

    const handlePopupClose = () => {
    setShowPopup(false);
    }

    return(
        <div className="criteria3">
            <div className="crit3-head">
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
            <div className="crit3">
                <Criteria31 onCrit31Data={handleCrit31Data}/>
                <Criteria32 onCrit32Data={handleCrit32Data}/>
                <Criteria33 onCrit33Data={handleCrit33Data}/>
                <Criteria34 onCrit34Data={handleCrit34Data}/>
                <Criteria35 onCrit35Data={handleCrit35Data}/>
                <Criteria36 onCrit36Data={handleCrit36Data}/>
                <Criteria37 onCrit37Data={handleCrit37Data}/>
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

export default Criteria3;
