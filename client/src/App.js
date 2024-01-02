import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/login';
import Criteria1 from './pages/criteria1';
import Dashoard from './pages/dashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>  
        <Route path='/' element = {< Login />} />
        <Route path='/criteria1' element = {< Criteria1 />} />
        <Route path='/dashboard' element = {< Dashoard />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
