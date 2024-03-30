import React from 'react';

const Card = ({ department, onClick }) => {
  return (
    <div className="admin-card min-w-[300px]" onClick={() => onClick(department)}>
      <h3>{department}</h3>
    </div>
  );
};

export default Card;