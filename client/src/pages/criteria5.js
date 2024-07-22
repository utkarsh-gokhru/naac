import React , {useState} from "react";
import Criteria51 from "../components/c-5-1";
import Criteria52 from "../components/c-5-2";
import Criteria53 from "../components/c-5-3";
import Criteria54 from "../components/c-5-4";
import Popup from "../components/popup";
import naacLogo from '../naac_logo.png';
import axios from 'axios';

const Criteria5 = () => {

    const [crit51Data, setCrit51Data] = useState(null);
    const [crit52Data, setCrit52Data] = useState(null);
    const [crit53Data, setCrit53Data] = useState(null);
    const [crit54Data, setCrit54Data] = useState(null);
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

    const handleCrit54Data = (data) => {
        setCrit54Data(data);
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

        for (const key in crit54Data) {
            formdata.append(key, crit54Data[key]);
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
                <Criteria54 onCrit54Data={handleCrit54Data}/>
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
