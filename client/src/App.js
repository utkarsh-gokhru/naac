import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/login';
import Criteria1 from './pages/criteria1';
import Dashboard from './pages/dashboard';
import Criteria2 from './pages/criteria2';
import SectionPage from './pages/sections';
import Criteria3 from './pages/criteria3';
import Criteria5 from './pages/criteria5';
import Criteria4 from './pages/criteria4';
import Criteria6 from './pages/criteria6'
import Criteria7 from './pages/criteria7';
import ExtendedProfile from './pages/extended_profile';
import DownloadCri1 from './pages/download/criteria';


function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>  
        <Route path='/' element = {< Login />} />
        <Route path='/criteria1' element = {< Criteria1 />} />
        <Route path='/criteria2' element = {< Criteria2 />} />
        <Route path='/criteria3' element = {< Criteria3 />} />
        <Route path='/criteria4' element = {< Criteria4 />} />
        <Route path='/criteria5' element = {< Criteria5 />} />
        <Route path='/criteria6' element = {< Criteria6 />} />
        <Route path='/criteria7' element = {< Criteria7 />} />
        <Route path='/dashboard' element = {< Dashboard />} />
        <Route path='/admin/criterias' element = {< Dashboard />} />
        <Route path='/sections' element = {< SectionPage />} />
        <Route path='/extended-profile' element = {< ExtendedProfile />} />
        <Route path='/admin/criteria' element = {<DownloadCri1 />}/>
       
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
