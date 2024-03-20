import React, { useEffect, useState } from 'react';
import '../css/c1_card.css';
import CircularProgressBar from './circular-progress';

const CardC4 = () => {

  return (
    <div className="card">
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
