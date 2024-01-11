import React from "react";
import CardC1 from "../components/c1_card";
import CardC2 from "../components/c2_card";
import CardC3 from "../components/c3_card";
import CardC4 from "../components/c4_card";
import CardC5 from "../components/c5_card";
import CardC6 from "../components/c6_card";
import CardC7 from "../components/c7_card";
import '../css/dashboard.css';
import naacLogo from '../naac_logo.png';
import { useNavigate } from "react-router-dom";


const academicYear = localStorage.getItem('academicYear');
const Dashboard = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    }

    return (
        <div className="dashboard">
            <div className='logo-e'>
                <img src={naacLogo} alt='NAAC LOGO' />
                <div className='head'>

                    <h1 >University of Mumbai</h1>
                    <h3>AQAR Platform</h3>
                    <button onClick={handleLogout}>Logout</button>

                </div>
            </div>
            <h2 className="hhv">Dashboard</h2>
            <h3>Academic Year: {academicYear}</h3>

            <div className="criteria-cont">
                <CardC1 />
                <CardC2 />
                <CardC3 />
                <CardC4 />
                <CardC5 />
                <CardC6 />
                <CardC7 />
            </div>
        </div>
    )
}

export default Dashboard;
