import React, { useEffect, useState } from 'react';
import '../css/c1_card.css';
import CircularProgressBar from './cicular-progress';

const CardC5 = () => {

  return (
    <div className="card">
      <div className="card-content">
        <div className="progress-container">
          <CircularProgressBar progress={77} />
          <h2 className="card-title">Criteria 5</h2>
        </div>
        <p className="progress-text">{`77% Complete`}</p>
      </div>
    </div>
  );
};

export default CardC5;
