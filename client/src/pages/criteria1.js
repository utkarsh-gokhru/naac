import React from "react";
import '../css/criteria1.css';
import Criteria11 from "../components/c-1-1";
import Criteria12 from "../components/c-1-2";
import Criteria13 from "../components/c-1-3";
import Criteria14 from "../components/c-1-4";


const Criteria1 = () => {
    return(
        <div className="criteria1">
            <div className="yearly_status_rep">
                <p>Yearly Status Report - Part B</p>
                <p>Academic Year to which AQAR has to be submitted: </p>
            </div>
            <div className="crit1">
                <h2>Criterion 1 - Curricular Aspects</h2>
                <Criteria11 />
                <Criteria12 />
                <Criteria13 />
                <Criteria14 />
            </div>
        </div>
    )
}

export default Criteria1;
