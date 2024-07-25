import React, { useEffect, useState } from 'react';
import '../css/c1_card.css';
import CircularProgressBar from './circular-progress';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CardC6 = () => {

  const totalFields = 39;
  const [fieldCount, setFieldCount] = useState(0);
  const department = localStorage.getItem('department');
  const academicYear = localStorage.getItem('academicYear');
  const admin = localStorage.getItem('admin');

  const navigate = useNavigate();
  const progress = ((fieldCount / totalFields) * 100).toFixed(2);

  const handleClick = () => {
    if (admin) {
      navigate('/admin/criteria6');
    } else {
      if (progress < 100) {
        navigate('/criteria6');
      } else {
        alert('Criteria 6 has been submitted!');
      }
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://naacserver.onrender.com/data/fetchC6?department=${department}&academicYear=${academicYear}`);
      const data = response.data.data;

      if (data) {
        let count = 0;

        if (data.criteria61) {
          count += data.criteria61.text_6_1_1 ? 1 : 0;
          count += data.criteria61.file6_1_1 ? 1 : 0;
          count += data.criteria61.text_6_1_2 ? 1 : 0;
          count += data.criteria61.file6_1_2 ? 1 : 0;
        }

        if (data.criteria62) {
          count += data.criteria62.text_6_2_1 ? 1 : 0;
          count += data.criteria62.file6_2_1 ? 1 : 0;
          count += data.criteria62.text_6_2_2 ? 1 : 0;
          count += data.criteria62.file6_2_2 ? 1 : 0;
          count += data.criteria62.data_6_2_3 ? 1 : 0;
          count += data.criteria62.file6_2_3_1 ? 1 : 0;
          count += data.criteria62.file6_2_3_2 ? 1 : 0;
        }

        if (data.criteria63) {
          count += data.criteria63.text6_3_1 ? 1 : 0;
          count += data.criteria63.file6_3_1 ? 1 : 0;
          count += data.criteria63.data_6_3_2 ? 1 : 0;
          count += data.criteria63.file6_3_2_1 ? 1 : 0;
          count += data.criteria63.file6_3_2_2 ? 1 : 0;
          count += data.criteria63.data_6_3_3 ? 1 : 0;
          count += data.criteria63.file6_3_3_1 ? 1 : 0;
          count += data.criteria63.file6_3_3_2 ? 1 : 0;
          count += data.criteria63.data_6_3_4 ? 1 : 0;
          count += data.criteria63.file6_3_4_1 ? 1 : 0;
          count += data.criteria63.file6_3_4_2 ? 1 : 0;
        }

        if (data.criteria64) {
          count += data.criteria64.text_6_4_1 ? 1 : 0;
          count += data.criteria64.file6_4_1 ? 1 : 0;
          count += data.criteria64.data_6_4_2 ? 1 : 0;
          count += data.criteria64.file6_4_2_1 ? 1 : 0;
          count += data.criteria64.file6_4_2_2 ? 1 : 0;
          count += data.criteria64.data_6_4_3 ? 1 : 0;
          count += data.criteria64.file6_4_3_1 ? 1 : 0;
          count += data.criteria64.file6_4_3_2 ? 1 : 0;
          count += data.criteria64.text_6_4_4 ? 1 : 0;
          count += data.criteria64.file6_4_4 ? 1 : 0;
        }

        if (data.criteria65) {
          count += data.criteria65.text_6_5_1 ? 1 : 0;
          count += data.criteria65.file6_5_1 ? 1 : 0;
          count += data.criteria65.data_6_5_2 ? 1 : 0;
          count += data.criteria65.file6_5_2_1 ? 1 : 0;
          count += data.criteria65.file6_5_2_2 ? 1 : 0;
          count += data.criteria65.text_6_5_3 ? 1 : 0;
          count += data.criteria65.file6_5_3 ? 1 : 0;
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
          <h2 className="card-title">Criteria 6</h2>
        </div>
        <p className="progress-text">{`${progress}% Complete`}</p>
      </div>
    </div>
  );
};

export default CardC6;
