import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function AdminPortal() {
  const [verifiedStudents, setVerifiedStudents] = useState([]);
  const [pendingStudents, setPendingStudents] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [specialMenu, setSpecialMenu] = useState([]);
  const [view, setView] = useState('details');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedLeaveRequest, setSelectedLeaveRequest] = useState(null);

  useEffect(() => {
    fetchVerifiedStudents();
    fetchPendingStudents();
    fetchLeaveRequests();
    fetchSpecialMenu();
  }, []);

  const fetchVerifiedStudents = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/studentdetails');
      const data = await res.json();
      setVerifiedStudents(data);
    } catch (err) {
      console.error('Error fetching verified students:', err);
    }
  };

  const fetchPendingStudents = async () => {
    try {
      const res = await fetch('http://localhost:8080/studenttemp');
      const data = await res.json();
      setPendingStudents(data);
    } catch (err) {
      console.error('Error fetching pending students:', err);
    }
  };

  const fetchLeaveRequests = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/leave/pending');
      const data = await res.json();
      setLeaveRequests(data);
    } catch (err) {
      console.error('Error fetching leave requests:', err);
    }
  };

  const fetchSpecialMenu = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/menu/all');
      const data = await res.json();
      setSpecialMenu(data);
    } catch (err) {
      console.error('Error fetching special menu:', err);
    }
  };

  const approveStudent = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/adminportal/verify/${id}`, { method: 'POST' });
      if (res.ok) {
        alert('Student approved successfully!');
        fetchVerifiedStudents();
        fetchPendingStudents();
      } else {
        alert('Failed to approve student');
      }
    } catch (err) {
      alert('Error approving student.');
      console.error(err);
    }
  };

  const approveLeaveRequest = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/adminportal/leave/${id}/status?status=Approved`, {
        method: 'POST',
      });
      if (res.ok) {
        alert('Leave request approved successfully!');
        fetchLeaveRequests();
      } else {
        alert('Failed to approve leave request');
      }
    } catch (err) {
      alert('Error approving leave request.');
      console.error(err);
    }
  };

  const rejectLeaveRequest = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/adminportal/leave/${id}/status?status=Rejected`, {
        method: 'POST',
      });
      if (res.ok) {
        alert('Leave request rejected successfully!');
        fetchLeaveRequests();
      } else {
        alert('Failed to reject leave request');
      }
    } catch (err) {
      alert('Error rejecting leave request.');
      console.error(err);
    }
  };

  const renderStudentCard = (student, isPending = false) => (
    <div className="card shadow-sm rounded p-3 mb-3" key={student.id}>
      <div className="d-flex justify-content-between">
        <div>
          <h5>{student.name}</h5>
          <p className="mb-1">ID: {student.id}</p>
          <p className="mb-1">Email: {student.email}</p>
        </div>
        <div className="text-end">
          <Button variant="info" size="sm" onClick={() => {
            setSelectedStudent(student);
            setSelectedLeaveRequest(null);
            setShowModal(true);
          }}>
            View Details
          </Button>
          {isPending && (
            <Button variant="success" size="sm" className="ms-2" onClick={() => approveStudent(student.id)}>
              Approve
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  const renderLeaveRequestCard = (leaveRequest) => (
    <div className="card shadow-sm rounded p-3 mb-3" key={leaveRequest.leaveId}>
      <div className="d-flex justify-content-between">
        <div>
          <h5>{leaveRequest.studentName}</h5>
          <p className="mb-1">Leave ID: {leaveRequest.leaveId}</p>
          <p className="mb-1">Reason: {leaveRequest.reason}</p>
        </div>
        <div className="text-end">
          <Button variant="success" size="sm" onClick={() => approveLeaveRequest(leaveRequest.leaveId)}>
            Approve
          </Button>
          <Button variant="danger" size="sm" className="ms-2" onClick={() => rejectLeaveRequest(leaveRequest.leaveId)}>
            Reject
          </Button>
          <Button variant="info" size="sm" className="ms-2" onClick={() => {
            setSelectedLeaveRequest(leaveRequest);
            setSelectedStudent(null);
            setShowModal(true);
          }}>
            See Details
          </Button>
        </div>
      </div>
    </div>
  );

  const renderSpecialMenu = () => (
    <div>
      <h5 className="mb-3">Special Menu</h5>
      {specialMenu.length === 0 ? (
        <p>No special menu available yet.</p>
      ) : (
        specialMenu.map(menu => (
          <div key={menu.menu_id} className="card shadow-sm rounded p-3 mb-3">
            <h6>{menu.day.charAt(0).toUpperCase() + menu.day.slice(1)}</h6>
            <p><strong>Breakfast:</strong> {menu.breakfast}</p>
            <p><strong>Lunch:</strong> {menu.lunch}</p>
            <p><strong>Snacks:</strong> {menu.snacks}</p>
            <p><strong>Dinner:</strong> {menu.dinner}</p>
            <p><strong>Special Menu 1:</strong> {menu.specialMenu1} - Fee: {menu.special1Fee}</p>
            <p><strong>Special Menu 2:</strong> {menu.specialMenu2} - Fee: {menu.special2Fee}</p>
            <p><strong>Daily Rate:</strong> {menu.dailyRate}</p>
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="bg-dark text-white p-3" style={{ width: '250px', height: '100vh' }}>
        <h4 className="mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#8F87F1" className="bi bi-house-heart-fill me-3" viewBox="0 0 16 16">
            <path d="M7.293 1.5a1 1 0 0 1 1.414 0L11 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l2.354 2.353a.5.5 0 0 1-.708.707L8 2.207 1.354 8.853a.5.5 0 1 1-.708-.707z" />
            <path d="m14 9.293-6-6-6 6V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5zm-6-.811c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.691 0-5.018" />
          </svg> SmartStay
        </h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <button className="btn btn-outline-light w-100" onClick={() => setView('details')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-check-fill mx-1" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
  <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
</svg>Verified Students
            </button>
          </li>
          <li className="nav-item mb-2">
            <button className="btn btn-outline-light w-100" onClick={() => setView('pending')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill-exclamation mx-1" viewBox="0 0 16 16">
  <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
  <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-3.5-2a.5.5 0 0 0-.5.5v1.5a.5.5 0 0 0 1 0V11a.5.5 0 0 0-.5-.5m0 4a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/>
</svg>Pending Student
            </button>
          </li>
          <li className="nav-item mb-2">
            <button className="btn btn-outline-light w-100" onClick={() => setView('leaveRequests')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send-check-fill mx-1" viewBox="0 0 16 16">
  <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 1.59 2.498C8 14 8 13 8 12.5a4.5 4.5 0 0 1 5.026-4.47zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
  <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686"/>
</svg>Leave Requests
            </button>
          </li>
          <li className="nav-item mb-2">
            <button className="btn btn-outline-light w-100" onClick={() => setView('specialMenu')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-fork-knife mx-2" viewBox="0 0 16 16">
  <path d="M13 .5c0-.276-.226-.506-.498-.465-1.703.257-2.94 2.012-3 8.462a.5.5 0 0 0 .498.5c.56.01 1 .13 1 1.003v5.5a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5zM4.25 0a.25.25 0 0 1 .25.25v5.122a.128.128 0 0 0 .256.006l.233-5.14A.25.25 0 0 1 5.24 0h.522a.25.25 0 0 1 .25.238l.233 5.14a.128.128 0 0 0 .256-.006V.25A.25.25 0 0 1 6.75 0h.29a.5.5 0 0 1 .498.458l.423 5.07a1.69 1.69 0 0 1-1.059 1.711l-.053.022a.92.92 0 0 0-.58.884L6.47 15a.971.971 0 1 1-1.942 0l.202-6.855a.92.92 0 0 0-.58-.884l-.053-.022a1.69 1.69 0 0 1-1.059-1.712L3.462.458A.5.5 0 0 1 3.96 0z"/>
</svg>Menu Details
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content with Background */}
      <div
        className="p-4"
        style={{
          width: '100%',
          minHeight: '100vh',
          background: 'linear-gradient(to right, #f0f4ff, #ffffff)',
        }}
      >
        <h3 className="mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-person-circle mx-3" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
</svg>Admin Portal</h3>
        {view === 'details' && (
          <div>
            <h5 className="mb-3">Verified Students</h5>
            {verifiedStudents.map(student => renderStudentCard(student))}
          </div>
        )}
        {view === 'pending' && (
          <div>
            <h5 className="mb-3">Pending Students</h5>
            {pendingStudents.map(student => renderStudentCard(student, true))}
          </div>
        )}
        {view === 'leaveRequests' && (
          <div>
            <h5 className="mb-3">Leave Requests</h5>
            {leaveRequests.map(request => renderLeaveRequestCard(request))}
          </div>
        )}
        {view === 'specialMenu' && renderSpecialMenu()}
      </div>

      {/* Modal for Details */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-journal-check mx-3" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
  <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2"/>
  <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z"/>
</svg>Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedStudent && (
            <div>
              <p><strong>Name : </strong> {selectedStudent.name}</p>
              <p><strong>Email : </strong> {selectedStudent.email}</p>
              <p><strong>Contact : </strong> {selectedStudent.phone}</p>
              <p><strong>Room No : </strong> {selectedStudent.roomno}</p>
              <p><strong>Age : </strong> {selectedStudent.age}</p>
              <p><strong>Semester : </strong> {selectedStudent.sem}</p>
              <p><strong>Department : </strong> {selectedStudent.dept}</p>
              <p><strong>Block : </strong> {selectedStudent.block}</p>
            </div>
          )}
          {selectedLeaveRequest && (
            <div>
              <p><strong>Reason:</strong> {selectedLeaveRequest.reason}</p>
              <p><strong>Leave From Date:</strong> {selectedLeaveRequest.fromDate}</p>
              <p><strong>Leave To Date:</strong> {selectedLeaveRequest.toDate}</p>
              <p><strong>Status:</strong> {selectedLeaveRequest.status}</p>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AdminPortal;
