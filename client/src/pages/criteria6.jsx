import React, { useState } from "react";
import axios from "axios";
import naacLogo from '../naac_logo.png';
import "../css/criteria2.css";

const Criteria6 = () => {
    const department=localStorage.getItem('department')
const academicYear=localStorage.getItem('academicYear')

const [formData, setFormData] = useState({
    department: "",
    academicYear: "",
    questions: {}
  })
  return (
        <>
          <div className="criteria2">
    <div className='logo-e'>
              <img src={naacLogo} alt='NAAC LOGO' />
              <div className='head'>
                  <h1 >University of Mumbai</h1>
                  <h3>AQAR Platform</h3>
              </div>
          </div>
          </div>
    <div className="yearly_status_rep">
      <p>Yearly Status Report - Part B</p>
      <p>Academic Year to which AQAR has to be submitted: {academicYear || 'acedemic year'}</p>
      <p>Department: {department || 'Department'}</p>
    </div>
    <div>
    <div>
        <h1 className="text-center mt-3 text-xl text-semibold">
          Criterion 6-Governance,Leadership and Management
        </h1>
      </div>
    </div>
        </> 
  )
}

export default Criteria6