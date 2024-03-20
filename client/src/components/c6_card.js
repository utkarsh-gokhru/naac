import React, { useEffect, useState } from 'react';
import '../css/c1_card.css';
import CircularProgressBar from './circular-progress';

const CardC6 = () => {

  return (
    <div className="card">
      <div className="card-content">
        <div className="progress-container">
          <CircularProgressBar progress={17} />
          <h2 className="card-title">Criteria 6</h2>
        </div>
        <p className="progress-text">{`17% Complete`}</p>
      </div>
    </div>
  );
};

export default CardC6;
