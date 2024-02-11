import React, { useEffect, useState } from 'react';
import '../css/c1_card.css';
import CircularProgressBar from './cicular-progress';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CardC3 = () => {

  const totalFields = 56;
  const [fieldCount, setFieldCount] = useState(0);
  const department = localStorage.getItem('department');
  const academicYear = localStorage.getItem('academicYear');
  const admin = localStorage.getItem('admin');

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://naacserver.onrender.com/data/fetchC3?department=${department}&academicYear=${academicYear}`);
      const data = response.data.data;

      if (data) {
        let count = 0;
    
        if(data.criteria31){
          count += data.criteria31.researchFacilities ? 1 : 0;
          count += data.criteria31.file3_1_1 ? 1 : 0;
          count += data.criteria31.seedMoney ? 1 : 0;
          count += data.criteria31.file3_1_2_1 ? 1 : 0;
          count += data.criteria31.file3_1_2_2 ? 1 : 0;
          count += data.criteria31.teachersFellowship ? 1 : 0;
          count += data.criteria31.file3_1_3_1 ? 1 : 0;
          count += data.criteria31.file3_1_3_2 ? 1 : 0;
          count += data.criteria31.fellowsEnrolled ? 1 : 0;
          count += data.criteria31.file3_1_4_1 ? 1 : 0;
          count += data.criteria31.file3_1_4_2 ? 1 : 0;
          count += data.criteria31.feed_3_1_5_Type ? 1 : 0;
          count += data.criteria31.file3_1_5 ? 1 : 0;
          count += data.criteria31.departmentNo ? 1 : 0;
          count += data.criteria31.file3_1_6_1 ? 1 : 0;
          count += data.criteria31.file3_1_6_2 ? 1 : 0;
        }
    
        if(data.criteria32){
          count += data.criteria32.extraFunding ? 1 : 0;
          count += data.criteria32.file3_2_1_1 ? 1 : 0;
          count += data.criteria32.file3_2_1_2 ? 1 : 0;
          count += data.criteria32.grants ? 1 : 0;
          count += data.criteria32.file3_2_2_1 ? 1 : 0;
          count += data.criteria32.file3_2_2_2 ? 1 : 0;
          count += data.criteria32.teacherResearchProjects ? 1 : 0;
          count += data.criteria32.file3_2_3_1 ? 1 : 0;
          count += data.criteria32.file3_2_3_2 ? 1 : 0;
        }
    
        if(data.criteria33){
          count += data.criteria33.ecosystemText ? 1 : 0;
          count += data.criteria33.file3_3_1 ? 1 : 0;
          count += data.criteria33.seminars ? 1 : 0;
          count += data.criteria33.totalSeminars ? 1 : 0;
          count += data.criteria33.file3_3_2_1 ? 1 : 0;
          count += data.criteria33.file3_3_2_2 ? 1 : 0;
          count += data.criteria33.awards ? 1 : 0;
          count += data.criteria33.file3_3_3_1 ? 1 : 0;
          count += data.criteria33.file3_3_3_2 ? 1 : 0;
        }
    
        if(data.criteria35){
          count += data.criteria35.consultancyText ? 1 : 0;
          count += data.criteria35.consultancyRev ? 1 : 0;
          count += data.criteria35.file3_5_1 ? 1 : 0;
          count += data.criteria35.file3_5_2_1 ? 1 : 0;
          count += data.criteria35.file3_5_2_2 ? 1 : 0;
        }
    
        if(data.criteria36){
          count += data.criteria36.extensionActText ? 1 : 0;
          count += data.criteria36.file3_6_1 ? 1 : 0;
          count += data.criteria36.file3_6_2_1 ? 1 : 0;
          count += data.criteria36.file3_6_2_2 ? 1 : 0;
          count += data.criteria36.extActAwards ? 1 : 0;
          count += data.criteria36.outreachPrograms ? 1 : 0;
          count += data.criteria36.file3_6_3_1 ? 1 : 0;
          count += data.criteria36.file3_6_3_2 ? 1 : 0;
          count += data.criteria36.participatingStudents ? 1 : 0;
          count += data.criteria36.file3_6_4_1 ? 1 : 0;
          count += data.criteria36.file3_6_4_2 ? 1 : 0;
        }
    
        if(data.criteria37){
          count += data.criteria37.collAct ? 1 : 0;
          count += data.criteria37.file3_7_1_1 ? 1 : 0;
          count += data.criteria37.file3_7_1_2 ? 1 : 0;
          count += data.criteria37.functionalMOUs ? 1 : 0;
          count += data.criteria37.file3_7_2_1 ? 1 : 0;
          count += data.criteria37.file3_7_2_2 ? 1 : 0;
        }
    
        setFieldCount(count);
    }
    
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const handleClick = () => {
    if (department === admin) {
      navigate('/admin/criteria3');
    } else {
      if (progress < 100) {
        navigate('/criteria3');
      } else {
        alert('Criteria 3 has been submitted!');
      }
    }
  }

  const progress = ((fieldCount / totalFields) * 100).toFixed(2);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="card" onClick={handleClick}>
      <div className="card-content">
        <div className="progress-container">
          <CircularProgressBar progress={progress} />
          <h2 className="card-title">Criteria 3</h2>
        </div>
        <p className="progress-text">{`${progress}% Complete`}</p>
      </div>
    </div>
  );
};

export default CardC3;
