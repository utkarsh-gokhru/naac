import React from 'react';

const Card = ({ department, onClick }) => {
  return (
    <div className="admin-card" onClick={() => onClick(department)}>
      <h3>{department}</h3>
    </div>
  );
};

export default Card;