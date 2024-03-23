import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Criteria1 from "./pages/criteria1";
import Dashboard from "./pages/dashboard";
import AdminC1 from "./pages/adminC1";
import Criteria2 from "./pages/criteria2";
import AdminDash from "./pages/admin-dash";
import SectionPage from "./pages/sections";
import Criteria3 from "./pages/criteria3";
import Criteria21 from "./components/c-2-1";
import Criteria4Form from "./pages/criteria4";
import Criteria6 from "./pages/criteria6";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/criteria1" element={<Criteria1 />} />
          <Route path="/criteria2" element={<Criteria2 />} />
          <Route path="/c-2-1" element={<Criteria21 />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/dashboard" element={<AdminDash />} />
          <Route path="/admin/criterias" element={<Dashboard />} />
          <Route path="/admin/criteria1" element={<AdminC1 />} />
          <Route path="/sections" element={<SectionPage />} />
          <Route path="/criteria3" element={<Criteria3 />} />
          <Route path="/criteria4" element={<Criteria4Form />} />
          <Route path="/criteria6" element={<Criteria6 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
