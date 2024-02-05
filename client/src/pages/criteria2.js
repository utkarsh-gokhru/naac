import React, {useState} from 'react'
import "../css/criteria1.css";
const criteria2 = () => {


  return (
    <div className="criteria2">
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
    <div>
        <h2>CRITERION II - TEACHING-LEARNING AND EVALUATION</h2>
    </div>

    </div>
  )
}

export default criteria2