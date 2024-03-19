import React , {useState} from "react";
import Criteria51 from "../components/c-5-1";
import Criteria52 from "../components/c-5-2";
import Criteria53 from "../components/c-5-3";
import Criteria55 from "../components/c-5-5";
import Criteria56 from "../components/c-5-6";
import Criteria57 from "../components/c-5-7";
import Popup from "../components/popup";
import naacLogo from '../naac_logo.png';
import axios from 'axios';

const criteria5 = () => {

    const [crit51Data, setCrit51Data] = useState(null);
    const [crit52Data, setCrit52Data] = useState(null);
    const [crit53Data, setCrit53Data] = useState(null);
    const [crit55Data, setCrit55Data] = useState(null);
    const [crit56Data, setCrit56Data] = useState(null);
    const [crit57Data, setCrit57Data] = useState(null);
    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');
    const [showPopup, setShowPopup] = useState(false);

    const handleCrit51Data = (data) => {
        setCrit51Data(data);
    };

    const handleCrit52Data = (data) => {
        setCrit52Data(data);
    };

    const handleCrit53Data = (data) => {
        setCrit53Data(data);
    };

    const handleCrit55Data = (data) => {
        setCrit55Data(data);
    };

    const handleCrit56Data = (data) => {
        setCrit56Data(data);
    };

    const handleCrit57Data = (data) => {
        setCrit57Data(data);
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

        for (const key in crit51Data) {
            formdata.append(key, crit51Data[key]);
        }

        for (const key in crit52Data) {
            formdata.append(key, crit52Data[key]);
        }

        for (const key in crit53Data) {
            formdata.append(key, crit53Data[key]);
        }

        for (const key in crit55Data) {
            formdata.append(key, crit55Data[key]);
        }

        for (const key in crit56Data) {
            formdata.append(key, crit56Data[key]);
        }

        for (const key in crit57Data) {
            formdata.append(key, crit57Data[key]);
        }

        console.log(formdata);

        const response = await axios.post("https://naacserver.onrender.com/data/criteria5/submit", formdata);
        console.log(response.data); 
        alert("Criteria 5 submitted!");
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
        <div className="criteria5">
            <div className="crit5-head">
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
            <div className="crit5">
                <Criteria51 onCrit51Data={handleCrit51Data}/>
                <Criteria52 onCrit52Data={handleCrit52Data}/>
                <Criteria53 onCrit53Data={handleCrit53Data}/>
                <Criteria55 onCrit55Data={handleCrit55Data}/>
                <Criteria56 onCrit56Data={handleCrit56Data}/>
                <Criteria57 onCrit57Data={handleCrit57Data}/>
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

export default Criteria5;
