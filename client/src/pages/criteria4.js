import React , {useState} from "react";
import Criteria41 from "../components/c-4-1";
import Criteria42 from "../components/c-4-2";
import Criteria43 from "../components/c-4-3";
// import Criteria43 from "../components/c-4-3";
// import Criteria44 from "../components/c-4-4";
import Popup from "../components/popup";
import naacLogo from '../naac_logo.png';
import axios from 'axios';
import Criteria44 from "../components/c-4-4";

const Criteria4 = () => {

    const [crit41Data, setCrit41Data] = useState(null);
    const [crit42Data, setCrit42Data] = useState(null);
    const [crit43Data, setCrit43Data] = useState(null);
    const [crit44Data, setCrit44Data] = useState(null);
    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');
    const [showPopup, setShowPopup] = useState(false);

    const handleCrit41Data = (data) => {
        setCrit41Data(data);
    };

    const handleCrit42Data = (data) => {
        setCrit42Data(data);
    };

    const handleCrit43Data = (data) => {
        setCrit43Data(data);
    };

    const handleCrit44Data = (data) => {
        setCrit44Data(data);
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

        for (const key in crit41Data) {
            formdata.append(key, crit41Data[key]);
        }

        for (const key in crit42Data) {
            formdata.append(key, crit42Data[key]);
        }

        for (const key in crit43Data) {
            formdata.append(key, crit43Data[key]);
        }

        for (const key in crit44Data) {
            formdata.append(key, crit44Data[key]);
        }

        console.log(formdata);

        const response = await axios.post("http://localhost:5000/data/criteria4/submit", formdata);
        console.log(response.data); 
        alert("Criteria 4 submitted!");
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
        <div className="criteria4">
            <div className="crit4-head">
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
            <div className="crit4">
                <Criteria41 onCrit41Data={handleCrit41Data}/>
                <Criteria42 onCrit42Data={handleCrit42Data}/>
                <Criteria43 onCrit43Data={handleCrit43Data}/>
                <Criteria44 onCrit44Data={handleCrit44Data}/> 
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

export default Criteria4;

