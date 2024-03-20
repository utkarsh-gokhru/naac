import React from 'react';
import '../css/circ.css';

const CircularProgressBar = ({ progress }) => {
  const radius = 150; 
  const strokeWidth = 20;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        className="progress-bar-background"
        stroke="#d6d6d6"
        strokeWidth={strokeWidth}
        fill="transparent"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        className="progress-bar"
        stroke="#52b788"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference + ' ' + circumference}
        style={{ strokeDashoffset }}
        fill="transparent"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        transform={`rotate(90 ${radius} ${radius})`}
      />
    </svg>
  );
};

export default CircularProgressBar;
