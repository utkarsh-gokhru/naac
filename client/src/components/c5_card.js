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
      const response = await axios.get(`https://naacserver.onrender.com/data/fetchC5?department=${department}&academicYear=${academicYear}`);
      const data = response.data.data;

      if (data) {
        let count = 0;

        // Calculate the number of filled fields for Criteria 5
        if (data.criteria51) {
          const criteria51Fields = Object.values(data.criteria51);
          count += criteria51Fields.filter(field => field).length;
        }

        if (data.criteria52) {
          const criteria52Fields = Object.values(data.criteria52);
          count += criteria52Fields.filter(field => field).length;
        }

        if (data.criteria53) {
          const criteria53Fields = Object.values(data.criteria53);
          count += criteria53Fields.filter(field => field).length;
        }

        if (data.criteria54) {
          const criteria54Fields = Object.values(data.criteria54);
          count += criteria54Fields.filter(field => field).length;
        }

        // Set the field count state
        setFieldCount(count);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 

  // Calculate progress percentage
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
