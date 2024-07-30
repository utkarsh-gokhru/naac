import React, { useEffect, useState } from 'react';
import '../css/c1_card.css';
import CircularProgressBar from './circular-progress';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CardEP = () => {

  const totalFields = 23;
  const [fieldCount, setFieldCount] = useState(0);
  const department = localStorage.getItem('department');
  const academicYear = localStorage.getItem('academicYear');
  const admin = localStorage.getItem('admin');

  const navigate = useNavigate();
  const progress = ((fieldCount / totalFields) * 100).toFixed(2);

  const handleClick = () => {
    if (admin) {
      navigate('/admin/extended-profile');
    } else {
      if (progress < 100) {
        navigate('/extended-profile');
      } else {
        alert('Extended profile has been submitted!');
      }
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://naacserver.onrender.com/epData/fetchEP?department=${department}&academicYear=${academicYear}`);
      const data = response.data.data;

      if (data) {
        let count = 0;
    
        if (data.ep1) {
            count += data.ep1.programmes ? 1 : 0;
            count += data.ep1.file1_1 ? 1 : 0;
            count += data.ep1.departments ? 1 : 0;
        }
    
        if (data.ep2) {
            count += data.ep2.students ? 1 : 0;
            count += data.ep2.file2_1 ? 1 : 0;
            count += data.ep2.outgoing_students ? 1 : 0;
            count += data.ep2.file2_2 ? 1 : 0;
            count += data.ep2.students_appeared_in_university_exam ? 1 : 0;
            count += data.ep2.file2_3 ? 1 : 0;
            count += data.ep2.reval_applications ? 1 : 0;
        }
    
        if (data.ep3) {
            count += data.ep3.courses_in_all_programmes ? 1 : 0;
            count += data.ep3.file3_1 ? 1 : 0;
            count += data.ep3.full_time_teachers ? 1 : 0;
            count += data.ep3.file3_2 ? 1 : 0;
            count += data.ep3.sanctioned_posts ? 1 : 0;
            count += data.ep3.file3_3 ? 1 : 0;
        }
    
        if (data.ep4) {
            count += data.ep4.eligible_admission_applications ? 1 : 0;
            count += data.ep4.file4_1 ? 1 : 0;
            count += data.ep4.reserved_category_seats ? 1 : 0;
            count += data.ep4.file4_2 ? 1 : 0;
            count += data.ep4.classrooms_and_seminar_halls ? 1 : 0;
            count += data.ep4.total_computers ? 1 : 0;
            count += data.ep4.total_expenditure ? 1 : 0;
        }
        setFieldCount(count);
        console.log(count);
    }
    
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="card" onClick={handleClick}>
      <div className="card-content">
        <div className="progress-container">
          <CircularProgressBar progress={progress} />
          <h2 className="card-title">Extended Profile</h2>
        </div>
        <p className="progress-text">{`${progress}% Complete`}</p>
      </div>
    </div>
  );
};

export default CardEP;
