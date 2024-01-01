import React, { useState } from "react";
import "../css/criteria1.css";
import Criteria11 from "../components/c-1-1";
import Criteria12 from "../components/c-1-2";
import Criteria13 from "../components/c-1-3";
import Criteria14 from "../components/c-1-4";
import axios from "axios";

const Criteria1 = () => {
  const [crit12Data, setCrit12Data] = useState(null);
  const [crit13Data, setCrit13Data] = useState(null);
  const [crit14Data, setCrit14Data] = useState(null);
  const [crit11Data, setCrit11Data] = useState(null);

  const handleCrit11Data = (data) => {
    setCrit11Data(data);
  };

  const handleCrit12Data = (data) => {
    setCrit12Data(data);
  };

  const handleCrit13Data = (data) => {
    setCrit13Data(data);
  };

  const handleCrit14Data = (data) => {
    setCrit14Data(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formdata = new FormData();

      for (const key in crit11Data) {
        formdata.append(key, crit11Data[key]);
      }

      for (const key in crit12Data) {
        formdata.append(key, crit12Data[key]);
      }

      for (const key in crit13Data) {
        formdata.append(key, crit13Data[key]);
      }

      for (const key in crit14Data) {
        formdata.append(key, crit14Data[key]);
      }

      const response = await axios.post("http://localhost:5000/data/submit", formdata);
      console.log(response.data); 
    } catch (error) {
      console.error(error);
      alert("Submission failed. Please try again later.");
    }
  };

  return (
    <div className="criteria1">
      <div className="yearly_status_rep">
        <p>Yearly Status Report - Part B</p>
        <p>Academic Year to which AQAR has to be submitted: </p>
      </div>
      <div className="crit1">
        <h2>Criterion 1 - Curricular Aspects</h2>
        <Criteria11 onCrit11Data={handleCrit11Data} />
        <Criteria12 onCrit12Data={handleCrit12Data} />
        <Criteria13 onCrit13Data={handleCrit13Data} />
        <Criteria14 onCrit14Data={handleCrit14Data} />
        <div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Criteria1;
