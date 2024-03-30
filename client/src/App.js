import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Criteria1 from "./pages/criteria1";
import Dashboard from "./pages/dashboard";
import AdminC1 from "./pages/adminC1";
import Criteria2 from "./pages/criteria2";
import AdminDash from "./pages/admin-dash";
import SectionPage from "./pages/sections";
import DummyForm from "./pages/dummyPage";
import Criteria3 from "./pages/criteria3";
import Criteria21 from "./components/c-2-1";
import Criteria4Form from "./pages/myCriteria4";
import Criteria6 from "./pages/criteria6";
import CriteriaForm from "./pages/hope";
import CriterionForm4 from "./pages/criteria4form"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/admin/:department/criterias" element={<Dashboard />} />
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
          {/* <Route path="/criteria4" element={<CriterionForm4 />} /> */}
          <Route path="/criteria6" element={<Criteria6 />} />
          <Route path="/hope" element={<CriteriaForm />} />
          <Route path="/dummy" element={<DummyForm />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
