import React, { useState } from 'react';
import Card from '../components/cards';
import { useNavigate } from 'react-router-dom';
import '../css/admin.css';

const AdminDash = () => {
  const allDepartments = [
    'Engineering',
    'Law',
    'Medical',
    'Humanities',
    'Statistics',
    'Department 6',
    'Department 7',
    'Department 8',
    'Department 9',
    'Department 10',
    'Department 11',
    'Department 12',
    'Department 13',
    'Department 14',
    'Department 15',
    'Department 16',
    'Department 17',
    'Department 18',
    'Department 19',
    'Department 20',
    'Department 21',
    'Department 22',
    'Department 23',
    'Department 24',
    'Department 25',
    'Department 26',
    'Department 27',
    'Department 28',
    'Department 29',
    'Department 30',
  ];

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
