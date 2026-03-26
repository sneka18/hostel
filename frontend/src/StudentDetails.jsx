import React, { useState, useEffect } from 'react';
import MealSelectionModule from './MealSelectionModule';
import Leave from './Leave';
import FeeDetails from './FeeDetails';
function StudentDetails() {
  const studentId = localStorage.getItem('studentId');
  console.log(studentId);
  const [selected, setSelected] = useState('home');
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStudentData = async () => {
    setLoading(true);
    setError(null); // Reset error state on new fetch
    try {
      const response = await fetch(`http://localhost:8080/api/studentdetails/${studentId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();[6]
      setStudentData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selected === 'profile') {
      fetchStudentData();
    }
  }, [selected]); // Fetch data whenever the 'profile' section is selected

  const renderContent = () => {
    switch (selected) {
      case 'home':
        return (
          <div className="p-4 p-md-5 mb-4 rounded text-body-emphasis bg-body-secondary">
            <div className="col-lg-6 px-0">
              <h1 className="display-4 fst-italic">Seamless Hostel Management at Your Fingertips</h1>
              <p className="lead my-3">
                Multiple lines of text that form the lede, informing new readers quickly and efficiently.
              </p>
              {/* <p className="lead mb-0">
                <a href="#" className="text-body-emphasis fw-bold">Continue reading...</a>
              </p> */}
            </div>
          </div>
        );
      case 'profile':
        if (loading) {
          return <h2 className="p-4">Loading profile...</h2>;
        }
        if (error) {
          return <h2 className="p-4 text-danger">Error: {error}</h2>;
        }
        if (studentData) {
          return (
            <div className="bg-light py-5">
            <div className="container">
              <div className="card p-4 shadow-sm d-flex flex-row flex-wrap gap-4 justify-content-center align-items-start">
                {/* Left Section */}
                <div className="text-center" style={{ flex: "0 0 250px" }}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
                    alt="Avatar"
                    className="mb-3"
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                  <h4>{studentData.name}</h4>
                  <p className="text-muted mb-1">{studentData.email}</p>
                  <p className="text-muted">{studentData.phone}</p>
                  <div className="d-flex justify-content-center gap-2">
                    <button className="btn btn-dark">Follow</button>
                    <button className="btn btn-outline-dark">Message</button>
                  </div>
                </div>
      
                {/* Right Section */}
                <div style={{ flex: "1 1 400px", maxWidth: "600px" }}>
                  <h5>Email</h5>
                  <p>{studentData.email}</p>
                  <hr />
                  <h5>Age</h5>
                  <p>{studentData.age}</p>
                  <hr />
                  <h5>Department</h5>
                  <p>{studentData.dept}</p>
                  <hr />
                  <h5>Semester</h5>
                  <p>{studentData.sem}</p>
                  <hr />
                  <h5>Block</h5>
                  <p>{studentData.block}</p>
                  <hr />
                  <h5>Room No</h5>
                  <p>{studentData.roomno}</p>
                  <hr />
                  <button className="btn btn-dark text-white">Edit</button>
                </div>
              </div>
            </div>
          </div>
          );
        }
        return <h2 className="p-4">Profile not available</h2>;
      case 'fees':
        return <FeeDetails studentId={studentId} />
      case 'leave':
        return <Leave studentId={studentId} />
      case 'others':
        return <h2 className="p-4">Other Info</h2>;
        case 'meals':
          return  <MealSelectionModule studentId={studentId} />;
      default:
        return <h2 className="p-4">Welcome!</h2>;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style={{ width: '280px' }}>
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">

          <span className="fs-4"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-house-heart-fill mx-3" viewBox="0 0 16 16">
  <path d="M7.293 1.5a1 1 0 0 1 1.414 0L11 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l2.354 2.353a.5.5 0 0 1-.708.707L8 2.207 1.354 8.853a.5.5 0 1 1-.708-.707z"/>
  <path d="m14 9.293-6-6-6 6V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5zm-6-.811c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.691 0-5.018"/>
</svg>SmartStay</span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li><button className="nav-link text-start text-white" onClick={() => setSelected('home')}><i className="bi bi-house-door me-2"></i>Home</button></li>
          <li><button className="nav-link text-start text-white" onClick={() => setSelected('profile')}><i className="bi bi-speedometer2 me-2"></i>Profile</button></li>
          <li><button className="nav-link text-start text-white" onClick={() => setSelected('fees')}><i className="bi bi-table me-2"></i>Fees</button></li>
          <li><button className="nav-link text-start text-white" onClick={() => setSelected('leave')}><i className="bi bi-grid me-2"></i>Leave</button></li>
          <li><button className="nav-link text-start text-white" onClick={() => setSelected('others')}><i className="bi bi-people me-2"></i>Others</button></li>
          <li>
  <button 
    className="nav-link text-start text-white" 
    onClick={() => setSelected('meals')}
  >
    <i className="bi bi-egg-fried me-2"></i>Meals
  </button>
</li>
        </ul>
        <hr />
        <div className="dropdown">
          <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
            <strong>student</strong>
          </a>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
            <li><a className="dropdown-item" href="#">New project...</a></li>
            <li><a className="dropdown-item" href="#">Settings</a></li>
            <li><a className="dropdown-item" href="#">Profile</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">Sign out</a></li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 bg-light">
        {renderContent()}
      </div>
    </div>
  );
}

export default StudentDetails;
