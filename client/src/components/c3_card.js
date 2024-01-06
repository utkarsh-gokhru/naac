import React, { useEffect, useState } from 'react';
import '../css/c1_card.css';
import CircularProgressBar from './cicular-progress';

const CardC3 = () => {

  return (
    <div className="card">
      <div className="card-content">
        <div className="progress-container">
          <CircularProgressBar progress={25} />
          <h2 className="card-title">Criteria 3</h2>
        </div>
        <p className="progress-text">{`25% Complete`}</p>
      </div>
    </div>
  );
};

export default CardC3;
