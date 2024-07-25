import React, { useEffect, useState } from 'react';
import '../css/c1_card.css';
import CircularProgressBar from './circular-progress';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CardC7 = () => {

  const totalFields = 26;
  const [fieldCount, setFieldCount] = useState(0);
  const department = localStorage.getItem('department');
  const academicYear = localStorage.getItem('academicYear');
  const admin = localStorage.getItem('admin');

  const navigate = useNavigate();
  const progress = ((fieldCount / totalFields) * 100).toFixed(2);

  const handleClick = () => {
    if (admin) {
      navigate('/admin/criteria7');
    } else {
      if (progress < 100) {
        navigate('/criteria7');
      } else {
        alert('Criteria 7 has been submitted!');
      }
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://naacserver.onrender.com/fetchC7?department=${department}&academicYear=${academicYear}`);
      const data = response.data.data;

      if (data) {
        let count = 0;

        // Counting fields in criteria71
        if (data.criteria71) {
          count += data.criteria71.text7_1_1 ? 1 : 0;
          count += data.criteria71.file7_1_1 ? 1 : 0;
          count += data.criteria71.data7_1_2 || data.criteria71.data7_1_2 === 0 ? 1 : 0;
          count += data.criteria71.file7_1_2 ? 1 : 0;
          count += data.criteria71.text7_1_3 ? 1 : 0;
          count += data.criteria71.file7_1_3 ? 1 : 0;
          count += data.criteria71.data7_1_4 || data.criteria71.data7_1_4 === 0 ? 1 : 0;
          count += data.criteria71.file7_1_4 ? 1 : 0;
          count += data.criteria71.data7_1_5 || data.criteria71.data7_1_5 === 0 ? 1 : 0;
          count += data.criteria71.file7_1_5 ? 1 : 0;
          count += data.criteria71.data7_1_6 || data.criteria71.data7_1_6 === 0 ? 1 : 0;
          count += data.criteria71.file7_1_6 ? 1 : 0;
          count += data.criteria71.data7_1_7 || data.criteria71.data7_1_7 === 0 ? 1 : 0;
          count += data.criteria71.file7_1_7 ? 1 : 0;
          count += data.criteria71.data7_1_8 || data.criteria71.data7_1_8 === 0 ? 1 : 0;
          count += data.criteria71.file7_1_8 ? 1 : 0;
          count += data.criteria71.text7_1_9 ? 1 : 0;
          count += data.criteria71.data7_1_10 || data.criteria71.data7_1_10 === 0 ? 1 : 0;
          count += data.criteria71.file7_1_10 ? 1 : 0;
          count += data.criteria71.text7_1_11 ? 1 : 0;
          count += data.criteria71.file7_1_11 ? 1 : 0;
        }

        // Counting fields in criteria72
        if (data.criteria72) {
          count += data.criteria72.text7_2_1 ? 1 : 0;
        }

        // Counting fields in criteria73
        if (data.criteria73) {
          count += data.criteria73.text7_3_1 ? 1 : 0;
          count += data.criteria73.text7_3_2 ? 1 : 0;
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
          <h2 className="card-title">Criteria 7</h2>
        </div>
        <p className="progress-text">{`${progress}% Complete`}</p>
      </div>
    </div>
  );
};

export default CardC7;
