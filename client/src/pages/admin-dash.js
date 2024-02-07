import React, { useState } from 'react';
import Card from '../components/cards';
import { useNavigate } from 'react-router-dom';
import '../css/admin.css';
import naacLogo from '../naac_logo.png';

const AdminDash = () => {
  const allDepartments = [
    'Engineering',
    'Law',
    'Medical'
  ];

  for (let i = 4; i <= 60; i++) {
    allDepartments.push(`Department ${i}`);
  }

  const [departments, setDepartments] = useState(allDepartments);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const academicYear = localStorage.getItem('academicYear');
  const navigate = useNavigate();

  const handleCardClick = (department) => {
    setSelectedDepartment(department);
    localStorage.setItem('department', department);
    navigate('/admin/criterias');
  };

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filteredDepartments = allDepartments.filter((dept) =>
      dept.toLowerCase().includes(term)
    );
    setDepartments(filteredDepartments);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="admin-dash-container">
      <div className='logo-f'>
        <img src={naacLogo} alt='NAAC LOGO' />
      </div>
      <div className='head'>

        <h1>University of Mumbai</h1>
        <h3>AQAR Platform</h3>
      </div>
      <h2>Admin Dashboard</h2>
      <h3>Academic Year: {academicYear}</h3>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <div>
        <input
          type="text"
          placeholder="Search for a department"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="admin-card-container">
        {departments.map((department, index) => (
          <Card key={index} department={department} onClick={() => handleCardClick(department)} />
        ))}
      </div>
      {selectedDepartment && (
        <div>
          <h2>Selected Department: {selectedDepartment}</h2>
        </div>
      )}
    </div>
  );
};

export default AdminDash;
