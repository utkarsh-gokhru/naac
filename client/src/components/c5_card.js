import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/c1_card.css';
import CircularProgressBar from './circular-progress';
import { useNavigate } from 'react-router-dom';

const CardC5 = () => {
  const totalFields = 33;
  const [fieldCount, setFieldCount] = useState(0);
  const department = localStorage.getItem('department');
  const academicYear = localStorage.getItem('academicYear');
  const admin = localStorage.getItem('admin');

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/data/fetchC5?department=${department}&academicYear=${academicYear}`);
      const data = response.data.data;

      if (data) {
        let count = 0;

        if (data.criteria51) {
          count += data.criteria51.scholarship_beneficiaries ? 1 : 0;
          count += data.criteria51.file5_1_1_1 ? 1 : 0;
          count += data.criteria51.file5_1_1_2 ? 1 : 0;
          count += data.criteria51.career_counsel_beneficiaries ? 1 : 0;
          count += data.criteria51.file5_1_2_1 ? 1 : 0;
          count += data.criteria51.file5_1_2_2 ? 1 : 0;
          count += data.criteria51.capacity_development_initiatives ? 1 : 0;
          count += data.criteria51.file5_1_3_1 ? 1 : 0;
          count += data.criteria51.file5_1_3_2 ? 1 : 0;
          count += data.criteria51.student_grievances_redressal ? 1 : 0;
          count += data.criteria51.file5_1_4 ? 1 : 0;
      }

      if (data.criteria52) {
          count += data.criteria52.students_qualified ? 1 : 0;
          count += data.criteria52.students_appeared ? 1 : 0;
          count += data.criteria52.file5_2_1_1 ? 1 : 0;
          count += data.criteria52.file5_2_1_2 ? 1 : 0;
          count += data.criteria52.placement_no ? 1 : 0;
          count += data.criteria52.file5_2_2_1 ? 1 : 0;
          count += data.criteria52.file5_2_2_2 ? 1 : 0;
          count += data.criteria52.higher_studies_students ? 1 : 0;
          count += data.criteria52.file5_2_3_1 ? 1 : 0;
          count += data.criteria52.file5_2_3_2 ? 1 : 0;
      }

      if (data.criteria53) {
          count += data.criteria53.awards_no ? 1 : 0;
          count += data.criteria53.file5_3_1_1 ? 1 : 0;
          count += data.criteria53.file5_3_1_2 ? 1 : 0;
          count += data.criteria53.student_council ? 1 : 0;
          count += data.criteria53.file5_3_2 ? 1 : 0;
          count += data.criteria53.events ? 1 : 0;
          count += data.criteria53.file5_3_3_1 ? 1 : 0;
          count += data.criteria53.file5_3_3_2 ? 1 : 0;
      }

      if (data.criteria54) {
          count += data.criteria54.alumni_chapters ? 1 : 0;
          count += data.criteria54.file5_4_1 ? 1 : 0;
          count += data.criteria54.alumni_contributions ? 1 : 0;
          count += data.criteria54.file5_4_2 ? 1 : 0;
      }

        setFieldCount(count);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 

  const progress = ((fieldCount / totalFields) * 100).toFixed(2);

  // Handle card click event
  const handleClick = () => {
    if (admin) {
      navigate('/admin/criteria5');
    } else {
      if (progress < 100) {
        navigate('/criteria5');
      } else {
        alert('Criteria 5 has been submitted!');
      }
    }
  }
  
  return (
    <div className="card" onClick={handleClick}>
      <div className="card-content">
        <div className="progress-container">
          <CircularProgressBar progress={progress} />
          <h2 className="card-title">Criteria 5</h2>
        </div>
        <p className="progress-text">{`${progress}% Complete`}</p>
      </div>
    </div>
  );
};

export default CardC5;
