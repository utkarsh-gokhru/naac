import React from 'react';
import '../css/sections.css';

const SectionPage = () => {
  const sections = [];

  for (let i = 1; i <= 7; i++) {
    sections.push(`Section ${i}`);
  }

  return (
    <div className="section-page">
      <h1>Sections</h1>
      <div className="section-cards">
        {sections.map(section => (
          <Card key={section} section={section} />
        ))}
      </div>
    </div>
  );
};

const Card = ({ section }) => {
  return (
    <div className="section-card">
      <h2>{section}</h2>
    </div>
  );
};

export default SectionPage;
