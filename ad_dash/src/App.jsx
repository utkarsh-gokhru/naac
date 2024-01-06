import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard.jsx';
import About from './pages/About.jsx';
import Departments from './pages/Departments.jsx';
//import Analytics from './pages/Analytics.jsx';
//import Comment from './pages/Comment.jsx';
//import Product from './pages/Product.jsx';
//import ProductList from './pages/ProductList.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/Departments" element={<Departments />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;