import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import { useState } from 'react';
import StudentDetails from './StudentDetails';
import AdminPortal from './AdminPortal';
import SetPassword from './SetPassword';
import FeeDetails from './FeeDetails';
function App() {
  const [loggedIn,setLoggedIn] = useState(false);

  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/student/:id" element={<StudentDetails />} />
          <Route path="/admin/profile" element={<AdminPortal />} />
          <Route path="/set-password" element={<SetPassword />} />
        </Routes>
    </Router>
  )
}

export default App
