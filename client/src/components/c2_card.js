import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/c1_card.css';
import { useNavigate } from 'react-router-dom';
import CircularProgressBar from './circular-progress';

const CardC2 = () => {

  const totalFields = 50;
  const [fieldCount, setFieldCount] = useState(0);
  const department = localStorage.getItem('department');
  const academicYear = localStorage.getItem('academicYear');
  const admin = localStorage.getItem('admin');

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/data/fetchC2?department=${department}&academicYear=${academicYear}`);
      const data = response.data.data;

      if (data) {
        let count = 0;

        // Criteria 21
        if (data.criteria21) {
          count += data.criteria21.no_of_seats ? 1 : 0;
          count += data.criteria21.file2_1_1_1 ? 1 : 0;
          count += data.criteria21.file2_1_1_2 ? 1 : 0;
          count += data.criteria21.students_reserved_cat ? 1 : 0;
          count += data.criteria21.file2_1_2_1 ? 1 : 0;
          count += data.criteria21.file2_1_2_2 ? 1 : 0;
        }

        // Criteria 22
        if (data.criteria22) {
          count += data.criteria22.learning_assessment ? 1 : 0;
          count += data.criteria22.file2_2_1_1 ? 1 : 0;
          count += data.criteria22.link2_2_1_2 ? 1 : 0;
          count += data.criteria22.no_of_students ? 1 : 0;
          count += data.criteria22.no_of_teachers ? 1 : 0;
          count += data.criteria22.file2_2_2 ? 1 : 0;
        }

        // Criteria 23
        if (data.criteria23) {
          count += data.criteria23.learning_exp ? 1 : 0;
          count += data.criteria23.file2_3_1 ? 1 : 0;
          count += data.criteria23.effect_teach_learn ? 1 : 0;
          count += data.criteria23.file2_3_2 ? 1 : 0;
          count += data.criteria23.no_of_mentors ? 1 : 0;
          count += data.criteria23.file2_3_3 ? 1 : 0;
        }

        // Criteria 24
        if (data.criteria24) {
          count += data.criteria24.full_time_teachers ? 1 : 0;
          count += data.criteria24.file2_4_1_1 ? 1 : 0;
          count += data.criteria24.file2_4_1_2 ? 1 : 0;
          count += data.criteria24.full_time_teachers_phd_etc ? 1 : 0;
          count += data.criteria24.file2_4_2_1 ? 1 : 0;
          count += data.criteria24.file2_4_2_2 ? 1 : 0;
          count += data.criteria24.total_exp ? 1 : 0;
          count += data.criteria24.file2_4_3_1 ? 1 : 0;
          count += data.criteria24.file2_4_3_2 ? 1 : 0;
          count += data.criteria24.award_rec_teachers ? 1 : 0;
          count += data.criteria24.file2_4_4_1 ? 1 : 0;
          count += data.criteria24.file2_4_4_2 ? 1 : 0;
        }

        // Criteria 25
        if (data.criteria25) {
          count += data.criteria25.no_of_days ? 1 : 0;
          count += data.criteria25.no_of_days_yearwise ? 1 : 0;
          count += data.criteria25.file2_5_1_1 ? 1 : 0;
          count += data.criteria25.file2_5_1_2 ? 1 : 0;
          count += data.criteria25.no_of_student_grievances ? 1 : 0;
          count += data.criteria25.file2_5_2 ? 1 : 0;
          count += data.criteria25.it_integration ? 1 : 0;
          count += data.criteria25.file2_5_3 ? 1 : 0;
          count += data.criteria25.status_of_automation ? 1 : 0;
          count += data.criteria25.file2_5_4_1 ? 1 : 0;
          count += data.criteria25.file2_5_4_2 ? 1 : 0;
        }

        // Criteria 26
        if (data.criteria26) {
          count += data.criteria26.learning_outcomes ? 1 : 0;
          count += data.criteria26.file2_6_1 ? 1 : 0;
          count += data.criteria26.attainment_prog_outcomes ? 1 : 0;
          count += data.criteria26.file2_6_2 ? 1 : 0;
          count += data.criteria26.final_year_students_passed ? 1 : 0;
          count += data.criteria26.final_year_students_appeared ? 1 : 0;
          count += data.criteria26.file2_6_3_2_1 ? 1 : 0;
          count += data.criteria26.file2_6_3_2_2 ? 1 : 0;
        }

        // Criteria 27
        if (data.criteria27) {
          count += data.criteria27.sss_web_link ? 1 : 0;
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

  const handleClick = () => {
    if (admin) {
      navigate('/admin/criteria2');
    } else {
      if (progress < 100) {
        navigate('/criteria2');
      } else {
        alert('Criteria 2 has been submitted!');
      }
    }
  }

  return (
    <div className="card" onClick={handleClick}>
      <div className="card-content">
        <div className="progress-container">
          <CircularProgressBar progress={progress} />
          <h2 className="card-title">Criteria 2</h2>
        </div>
        <p className="progress-text">{`${progress}% Complete`}</p>
      </div>
    </div>
  );
};

export default CardC2;
