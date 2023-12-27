import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/login';
import Criteria1 from './components/criteria1';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element = {< Login />} />
        <Route path='/criterias' element = {< Criteria1 />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
