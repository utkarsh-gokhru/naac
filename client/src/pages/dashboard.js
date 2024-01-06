import React from "react";
import CardC1 from "../components/c1_card";
import CardC2 from "../components/c2_card";
import CardC3 from "../components/c3_card";
import CardC4 from "../components/c4_card";
import CardC5 from "../components/c5_card";
import CardC6 from "../components/c6_card";
import CardC7 from "../components/c7_card";
import '../css/dashboard.css';

const Dashboard = () => {

    return(
        <div className="dashboard">
            <h2>Dashboard</h2>
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
