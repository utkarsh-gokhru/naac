import React , {useState} from "react";
import Criteria31 from "../components/c-3-1";
import Criteria32 from "../components/c-3-2";
import Criteria33 from "../components/c-3-3";
import Criteria35 from "../components/c-3-5";
import Criteria36 from "../components/c-3-6";
import Criteria37 from "../components/c-3-7";

const Criteria3 = () => {

    const [crit31Data, setCrit31Data] = useState(null);
    const [crit32Data, setCrit32Data] = useState(null);
    const [crit33Data, setCrit33Data] = useState(null);
    const [crit35Data, setCrit35Data] = useState(null);
    const [crit36Data, setCrit36Data] = useState(null);
    const [crit37Data, setCrit37Data] = useState(null);
    const department = localStorage.getItem('department');
    const academicYear = localStorage.getItem('academicYear');
    const [showPopup, setShowPopup] = useState(false);

    const handleCrit31Data = (data) => {
        setCrit31Data(data);
        console.log(crit31Data);
    };

    const handleCrit32Data = (data) => {
        setCrit32Data(data);
    };

    const handleCrit33Data = (data) => {
        setCrit33Data(data);
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

    return(
        <div className="criteria3">
            <Criteria31 onCrit31Data={handleCrit31Data}/>
            <Criteria32 onCrit32Data={handleCrit32Data}/>
            <Criteria33 onCrit33Data={handleCrit33Data}/>
            <Criteria35 onCrit35Data={handleCrit35Data}/>
            <Criteria36 onCrit36Data={handleCrit36Data}/>
            <Criteria37 onCrit37Data={handleCrit37Data}/>
        </div>
    );
}

export default Criteria3;