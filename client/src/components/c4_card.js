import React, { useEffect, useState } from 'react';
import '../css/c1_card.css';
import CircularProgressBar from './circular-progress';
import { useNavigate } from 'react-router-dom';

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
        alert('Criteria 3 has been submitted!');
      }
    }
  }

  return (
    <div className="card" onClick={handleClick}>
      <div className="card-content">
        <div className="progress-container">
          <CircularProgressBar progress={60} />
          <h2 className="card-title">Criteria 4</h2>
        </div>
        <p className="progress-text">{`60% Complete`}</p>
      </div>
    </div>
  );
};

export default CardC4;
