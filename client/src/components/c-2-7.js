import React, { useEffect } from 'react'
import { useState } from 'react';
import StyledTextArea from "./textArea";
import { saveAs } from 'file-saver';
import axios from "axios";

const Criteria27 = ({ onCrit27Data }) => {

  const department = localStorage.getItem('department');
  const academicYear = localStorage.getItem('academicYear');
  const [sss_web_link, setsss_web_link] = useState("");

  useEffect(() => {
    const crit27 = { sss_web_link };
    onCrit27Data(crit27);
  }, [sss_web_link]);

  return (
    <div className='c-2-7'>

      <br></br>
      <h3>2.7 Student Satisfaction Survey</h3>

      <h4>Student Satisfaction Survey (SSS) on overall institutional performance (Institution may design its own questionaire) (results and details need to be provided as a web link)</h4>
      <input
        type="string"
        id="sss_web_link"
        value={sss_web_link}
        onChange={(e) => setsss_web_link(e.target.value)}
      /><br />
    </div>
  )
}

export default Criteria27;
