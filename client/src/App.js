import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/login';
import Criteria1 from './pages/criteria1';
import Dashboard from './pages/dashboard';
import AdminC1 from './pages/adminC1';
import AdminDash from './pages/admin-dash';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>  
        <Route path='/' element = {< Login />} />
        <Route path='/criteria1' element = {< Criteria1 />} />
        <Route path='/dashboard' element = {< Dashboard />} />
        <Route path='/admin' element = {< AdminDash />} />
        <Route path='/admin/criterias' element = {< Dashboard />} />
        <Route path='/admin/criteria1' element = {< AdminC1 />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
