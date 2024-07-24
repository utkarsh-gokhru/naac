import React, { useEffect, useState } from 'react';
import '../css/c1_card.css';
import CircularProgressBar from './circular-progress';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CardC4 = () => {

  const totalFields = 95;
  const [fieldCount, setFieldCount] = useState(0);
  const department = localStorage.getItem('department');
  const academicYear = localStorage.getItem('academicYear');
  const admin = localStorage.getItem('admin');

  const navigate = useNavigate();
  const progress = ((fieldCount / totalFields) * 100).toFixed(2);

  const handleClick = () => {
    if (admin) {
      navigate('/admin/criteria4');
    } else {
      if (progress < 100) {
        navigate('/criteria4');
      } else {
        alert('Criteria 4 has been submitted!');
      }
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://naacserver.onrender.com/data/fetchC4?department=${department}&academicYear=${academicYear}`);
      const data = response.data.data;

      if (data) {
        let count = 0;

        if (data.criteria41) {
          count += data.criteria41.teaching_facilities ? 1 : 0;
          count += data.criteria41.file4_1_1 ? 1 : 0;
          count += data.criteria41.cultural_facilities ? 1 : 0;
          count += data.criteria41.file4_1_2 ? 1 : 0;
          count += data.criteria41.general_facilities ? 1 : 0;
          count += data.criteria41.file4_1_3 ? 1 : 0;
          count += data.criteria41.total_expenditure || data.criteria41.total_expenditure === 0 ? 1 : 0;
          count += data.criteria41.file4_1_4_1 ? 1 : 0;
          count += data.criteria41.file4_1_4_2 ? 1 : 0;
        }

        if (data.criteria42) {
          count += data.criteria42.automated_library ? 1 : 0;
          count += data.criteria42.file4_2_1 ? 1 : 0;
          count += data.criteria42.subscription ? 1 : 0;
          count += data.criteria42.file4_2_2 ? 1 : 0;
          count += data.criteria42.books_expenditure || data.criteria42.books_expenditure === 0 ? 1 : 0;
          count += data.criteria42.file4_2_3_1 ? 1 : 0;
          count += data.criteria42.file4_2_3_2 ? 1 : 0;
          count += data.criteria42.library_usage_per_day || data.criteria42.library_usage_per_day === 0 ? 1 : 0;
          count += data.criteria42.file4_2_4 ? 1 : 0;
        }

        if (data.criteria43) {
          count += data.criteria43.classrooms_and_seminarhalls || data.criteria43.classrooms_and_seminarhalls === 0 ? 1 : 0;
          count += data.criteria43.file4_3_1_1 ? 1 : 0;
          count += data.criteria43.file4_3_1_2 ? 1 : 0;
          count += data.criteria43.it_policy ? 1 : 0;
          count += data.criteria43.file4_3_2 ? 1 : 0;
          count += data.criteria43.number_of_students || data.criteria43.number_of_students === 0 ? 1 : 0;
          count += data.criteria43.number_of_computers || data.criteria43.number_of_computers === 0 ? 1 : 0;
          count += data.criteria43.bandwidth ? 1 : 0;
          count += data.criteria43.file4_3_4 ? 1 : 0;
          count += data.criteria43.e_content_facilities ? 1 : 0;
          count += data.criteria43.file4_3_5_1 ? 1 : 0;
          count += data.criteria43.file4_3_5_2 ? 1 : 0;
        }

        if (data.criteria44) {
          count += data.criteria44.physical_facilities_expenditure || data.criteria44.physical_facilities_expenditure === 0 ? 1 : 0;
          count += data.criteria44.file4_4_1_1 ? 1 : 0;
          count += data.criteria44.file4_4_1_2 ? 1 : 0;
          count += data.criteria44.established_systems ? 1 : 0;
          count += data.criteria44.file4_4_2 ? 1 : 0;
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

  return (
    <div className="card" onClick={handleClick}>
      <div className="card-content">
        <div className="progress-container">
          <CircularProgressBar progress={progress} />
          <h2 className="card-title">Criteria 4</h2>
        </div>
        <p className="progress-text">{`${progress}% Complete`}</p>
      </div>
    </div>
  );
};

export default CardC4;
