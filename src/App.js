import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import HomePage from "./api/pages/HomePage";
import AppointmentsList from "./api/pages/AppointmentsList";
function App() {
  return (
<Router>
      <Link to='/about'>AppointmentsList</Link>

      <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/about' element={<AppointmentsList/>} />
    
      </Routes>
      </Router>
  );
}

export default App;
